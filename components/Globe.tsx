"use client";

/**
 * Hand-rolled 3D globe: Fibonacci-sphere dot matrix + great-circle arcs,
 * projected orthographically on a plain 2D canvas. No three.js/cobe — this
 * project doesn't have them and isn't adding a WebGL dependency for one
 * decorative widget. Canvas conventions (refs, DPR-scaled backing store,
 * ResizeObserver on the element rather than window) follow CrowdCanvas.tsx.
 */
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

export interface GlobeMarker {
  lat: number;
  lng: number;
  label?: string;
}

export interface GlobeArc {
  from: [number, number];
  to: [number, number];
}

interface GlobeProps {
  className?: string;
  markers?: GlobeMarker[];
  arcs?: GlobeArc[];
  baseColor?: string;
  markerColor?: string;
  arcColor?: string;
  autoRotate?: boolean;
  interactive?: boolean;
}

type Vec3 = { x: number; y: number; z: number };

// Real trip geography, not placeholder dots — Delhi is the hub every route
// in this business actually starts from.
const DELHI: [number, number] = [28.61, 77.21];
const DEFAULT_MARKERS: GlobeMarker[] = [
  { lat: 28.61, lng: 77.21, label: "Delhi" },
  { lat: 31.55, lng: 77.32, label: "Jibhi" },
  { lat: 30.07, lng: 80.24, label: "Munsiyari" },
  { lat: 32.24, lng: 77.19, label: "Manali" },
  { lat: 33.47, lng: 76.89, label: "Zanskar" },
  { lat: 31.42, lng: 78.26, label: "Sangla" },
  { lat: 32.23, lng: 78.07, label: "Spiti" },
  { lat: 32.12, lng: 77.17, label: "Naggar" },
  { lat: 29.84, lng: 80.54, label: "Darchula" },
];
const DEFAULT_ARCS: GlobeArc[] = DEFAULT_MARKERS.filter((m) => m.label !== "Delhi").map((m) => ({
  from: DELHI,
  to: [m.lat, m.lng] as [number, number],
}));

// Dot density must stay constant across render sizes, not the dot count — a
// fixed POINT_COUNT reads fine at one size and turns into a dust cloud at
// another. ~110px^2 per dot lands around 9-11px spacing between neighbors.
const DOT_SPACING_AREA = 110;
const MIN_POINTS = 1500;
const MAX_POINTS = 14000;
const DOT_SIZE = 2; // px, drawn as a rect
const DOT_BUCKETS = 6; // quantized shade levels — batches fillStyle per bucket instead of per dot
const MAX_DPR = 2;
const MAX_TILT = 0.55; // radians either side of REST_PITCH the drag can reach
const REST_PITCH = -0.18; // slight downward tilt so the northern routes read clearly

// Arc animation cycle, seconds: draw in, hold complete, fade, gap before next lap.
const ARC_DRAW = 1.5;
const ARC_HOLD = 0.6;
const ARC_FADE = 0.7;
const ARC_GAP = 0.9;
const ARC_CYCLE = ARC_DRAW + ARC_HOLD + ARC_FADE + ARC_GAP;
const ARC_SEGMENTS = 48;
const ARC_BULGE = 0.32; // how far arcs lift off the sphere surface at their midpoint

function hexToRgb(hex: string) {
  const n = parseInt(hex.replace("#", ""), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function lerpColor(a: string, b: string, t: number) {
  const ca = hexToRgb(a);
  const cb = hexToRgb(b);
  return `${Math.round(ca.r + (cb.r - ca.r) * t)}, ${Math.round(ca.g + (cb.g - ca.g) * t)}, ${Math.round(ca.b + (cb.b - ca.b) * t)}`;
}

function normalize(v: Vec3): Vec3 {
  const len = Math.hypot(v.x, v.y, v.z) || 1;
  return { x: v.x / len, y: v.y / len, z: v.z / len };
}

// y = north pole, matching auto-rotation around the polar axis.
function latLngToVec3(lat: number, lng: number): Vec3 {
  const latRad = (lat * Math.PI) / 180;
  const lngRad = (lng * Math.PI) / 180;
  return {
    x: Math.cos(latRad) * Math.cos(lngRad),
    y: Math.sin(latRad),
    z: Math.cos(latRad) * Math.sin(lngRad),
  };
}

function slerp(a: Vec3, b: Vec3, t: number): Vec3 {
  const dot = Math.max(-1, Math.min(1, a.x * b.x + a.y * b.y + a.z * b.z));
  const theta = Math.acos(dot) * t;
  const relX = b.x - a.x * dot;
  const relY = b.y - a.y * dot;
  const relZ = b.z - a.z * dot;
  const relLen = Math.hypot(relX, relY, relZ) || 1;
  const rx = relX / relLen;
  const ry = relY / relLen;
  const rz = relZ / relLen;
  return {
    x: a.x * Math.cos(theta) + rx * Math.sin(theta),
    y: a.y * Math.cos(theta) + ry * Math.sin(theta),
    z: a.z * Math.cos(theta) + rz * Math.sin(theta),
  };
}

function rotate(p: Vec3, yaw: number, pitch: number): Vec3 {
  const x1 = p.x * Math.cos(yaw) + p.z * Math.sin(yaw);
  const z1 = -p.x * Math.sin(yaw) + p.z * Math.cos(yaw);
  const y2 = p.y * Math.cos(pitch) - z1 * Math.sin(pitch);
  const z2 = p.y * Math.sin(pitch) + z1 * Math.cos(pitch);
  return { x: x1, y: y2, z: z2 };
}

// Even coverage with no pole clustering — the standard trick for "dots on a
// ball" without importing a sphere-sampling library for it.
function fibonacciSphere(count: number): Vec3[] {
  const points: Vec3[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * i;
    points.push({ x: Math.cos(theta) * radiusAtY, y, z: Math.sin(theta) * radiusAtY });
  }
  return points;
}

export function Globe({
  className,
  markers = DEFAULT_MARKERS,
  arcs = DEFAULT_ARCS,
  baseColor = "#7fb0cd", // glacier
  markerColor = "#e8562b", // alpenglow
  arcColor,
  autoRotate = true,
  interactive = true,
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const ctx = canvasEl.getContext("2d");
    if (!ctx) return;
    // Nested closures below (render/resize/handlers) don't get TS's null-narrowing
    // from the guards above, so rebind to definitely-non-null locals once here.
    const canvas = canvasEl;
    const g = ctx;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = reducedMotionQuery.matches;

    // Regenerated by resize() once the actual render radius is known.
    let points: Vec3[] = [];
    // Reused across frames so batching dots by shade doesn't allocate 6 new
    // arrays every tick — only cleared and refilled.
    const buckets: { x: number; y: number }[][] = Array.from({ length: DOT_BUCKETS }, () => []);
    const markerVecs = markers.map((m) => ({ ...m, vec: latLngToVec3(m.lat, m.lng) }));
    // Precompute unit vectors once; slerp interpolates these per frame, not per-arc setup.
    const arcData = arcs.map((a, i) => ({
      from: latLngToVec3(a.from[0], a.from[1]),
      to: latLngToVec3(a.to[0], a.to[1]),
      delay: (i / Math.max(arcs.length, 1)) * ARC_CYCLE, // stagger so arcs don't fire in lockstep
    }));

    // Light arrives top-right per the site's global shading rule (see
    // globals.css) — bias dot brightness the same way so the globe reads as
    // lit by the same sun as the rest of the page.
    const LIGHT_DIR = normalize({ x: 0.55, y: 0.5, z: 0.67 });
    const baseRgb = hexToRgb(baseColor);
    const haloColor = "#f5a14c"; // dawn
    const haloRgb = hexToRgb(haloColor);
    const arcRgb = arcColor ? hexToRgb(arcColor) : null;

    let width = 0;
    let height = 0;
    let cx = 0;
    let cy = 0;
    let radius = 0;

    const state = {
      yaw: 0,
      pitch: REST_PITCH,
      yawVelocity: autoRotate ? 0.12 : 0, // rad/s, seeds the initial spin
      dragging: false,
      lastX: 0,
      lastY: 0,
    };

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = width / 2;
      cy = height / 2;
      radius = Math.min(width, height) * 0.43;
      const targetCount = Math.round((4 * Math.PI * radius * radius) / DOT_SPACING_AREA);
      points = fibonacciSphere(Math.max(MIN_POINTS, Math.min(MAX_POINTS, targetCount)));
      if (reducedMotion) render(0);
    };

    function render(elapsed: number) {
      g.clearRect(0, 0, width, height);
      if (width === 0 || height === 0) return;

      // Dot-matrix sphere: back-facing points (z < 0 after rotation) are
      // culled outright rather than dimmed to near-zero — at 2200 points,
      // drawing invisible dots wastes half the frame's fillRect calls.
      for (const p of points) {
        const r = rotate(p, state.yaw, state.pitch);
        if (r.z <= 0) continue;
        const intensity = Math.max(0, r.x * LIGHT_DIR.x + r.y * LIGHT_DIR.y + r.z * LIGHT_DIR.z);
        const alpha = 0.12 + 0.55 * r.z;
        const brightness = 0.4 + 0.6 * intensity;
        const sx = cx + r.x * radius;
        const sy = cy - r.y * radius;
        g.fillStyle = `rgba(${Math.round(baseRgb.r * brightness)}, ${Math.round(baseRgb.g * brightness)}, ${Math.round(baseRgb.b * brightness)}, ${alpha})`;
        g.fillRect(sx - 0.75, sy - 0.75, 1.5, 1.5);
      }

      // Arcs: slerp between the two unit vectors, lift by a sine bulge so
      // they read as flight paths over the surface instead of chords
      // through the sphere.
      for (const arc of arcData) {
        const localT = reducedMotion ? ARC_DRAW : (elapsed + arc.delay) % ARC_CYCLE;
        let reveal = 1;
        let opacity = 1;
        if (!reducedMotion) {
          if (localT < ARC_DRAW) {
            reveal = localT / ARC_DRAW;
          } else if (localT < ARC_DRAW + ARC_HOLD) {
            reveal = 1;
          } else if (localT < ARC_DRAW + ARC_HOLD + ARC_FADE) {
            reveal = 1;
            opacity = 1 - (localT - ARC_DRAW - ARC_HOLD) / ARC_FADE;
          } else {
            continue; // gap between laps
          }
        }
        if (reveal <= 0 || opacity <= 0) continue;

        g.beginPath();
        let penDown = false;
        let firstPt: { x: number; y: number } | null = null;
        let lastPt: { x: number; y: number } | null = null;
        const steps = Math.max(2, Math.round(ARC_SEGMENTS * reveal));
        for (let i = 0; i <= steps; i++) {
          const t = (i / ARC_SEGMENTS) * reveal;
          const mid = slerp(arc.from, arc.to, t);
          const lift = 1 + ARC_BULGE * Math.sin(Math.PI * t);
          const lifted = { x: mid.x * lift, y: mid.y * lift, z: mid.z * lift };
          const r = rotate(normalize(lifted), state.yaw, state.pitch);
          const visible = r.z > -0.02;
          const sx = cx + r.x * radius * lift;
          const sy = cy - r.y * radius * lift;
          if (visible) {
            if (!penDown) {
              g.moveTo(sx, sy);
              penDown = true;
              firstPt = { x: sx, y: sy };
            } else {
              g.lineTo(sx, sy);
            }
            lastPt = { x: sx, y: sy };
          } else {
            penDown = false;
          }
        }
        if (!firstPt || !lastPt) continue;
        if (arcRgb) {
          g.strokeStyle = `rgba(${arcRgb.r}, ${arcRgb.g}, ${arcRgb.b}, ${opacity})`;
        } else {
          const gradient = g.createLinearGradient(firstPt.x, firstPt.y, lastPt.x, lastPt.y);
          gradient.addColorStop(0, `rgba(${lerpColor(haloColor, markerColor, 0)}, ${opacity})`);
          gradient.addColorStop(1, `rgba(${lerpColor(haloColor, markerColor, 1)}, ${opacity})`);
          g.strokeStyle = gradient;
        }
        g.lineWidth = 1.4;
        g.lineCap = "round";
        g.stroke();
      }

      // Markers: solid dot + a sonar-style expanding ring, only on the
      // visible hemisphere.
      for (let i = 0; i < markerVecs.length; i++) {
        const m = markerVecs[i];
        const r = rotate(m.vec, state.yaw, state.pitch);
        if (r.z <= 0) continue;
        const sx = cx + r.x * radius;
        const sy = cy - r.y * radius;

        const pingT = reducedMotion ? 0 : ((elapsed * 0.5 + i * 0.35) % 1);
        const ringRadius = 3 + pingT * 10;
        g.beginPath();
        g.arc(sx, sy, ringRadius, 0, Math.PI * 2);
        g.strokeStyle = `rgba(${haloRgb.r}, ${haloRgb.g}, ${haloRgb.b}, ${(1 - pingT) * 0.5})`;
        g.lineWidth = 1;
        g.stroke();

        g.beginPath();
        g.arc(sx, sy, 2.6, 0, Math.PI * 2);
        g.fillStyle = markerColor;
        g.fill();
      }
    }

    // --- interaction: drag to spin, inertia decays back into auto-rotate ---
    const DRAG_SENSITIVITY = 0.006;
    const DAMPING = 0.94;

    function onPointerDown(e: PointerEvent) {
      if (reducedMotion) return;
      state.dragging = true;
      state.lastX = e.clientX;
      state.lastY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
    }
    function onPointerMove(e: PointerEvent) {
      if (!state.dragging) return;
      const dx = e.clientX - state.lastX;
      const dy = e.clientY - state.lastY;
      state.lastX = e.clientX;
      state.lastY = e.clientY;
      state.yaw += dx * DRAG_SENSITIVITY;
      state.pitch = Math.max(
        REST_PITCH - MAX_TILT,
        Math.min(REST_PITCH + MAX_TILT, state.pitch + dy * DRAG_SENSITIVITY),
      );
      state.yawVelocity = dx * DRAG_SENSITIVITY * 6; // seeds inertia on release
    }
    function onPointerUp(e: PointerEvent) {
      state.dragging = false;
      if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
    }

    if (interactive && !reducedMotion) {
      canvas.style.touchAction = "none";
      canvas.addEventListener("pointerdown", onPointerDown);
      canvas.addEventListener("pointermove", onPointerMove);
      canvas.addEventListener("pointerup", onPointerUp);
      canvas.addEventListener("pointercancel", onPointerUp);
    }

    // --- main loop ---
    let rafId = 0;
    let lastTime = performance.now();
    const start = lastTime;

    function frame(now: number) {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;
      if (!state.dragging) {
        state.yawVelocity *= DAMPING;
        if (Math.abs(state.yawVelocity) < 0.001) state.yawVelocity = 0;
        state.yaw += state.yawVelocity * dt * 60;
        if (autoRotate && Math.abs(state.yawVelocity) < 0.02) {
          state.yaw += 0.12 * dt;
        }
        state.pitch += (REST_PITCH - state.pitch) * Math.min(1, dt * 3);
      }
      render((now - start) / 1000);
      rafId = requestAnimationFrame(frame);
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    if (reducedMotion) {
      render(0);
    } else {
      rafId = requestAnimationFrame(frame);
    }

    const onReducedMotionChange = (e: MediaQueryListEvent) => {
      reducedMotion = e.matches;
      if (reducedMotion) {
        cancelAnimationFrame(rafId);
        state.dragging = false;
        render(0);
      } else {
        lastTime = performance.now();
        rafId = requestAnimationFrame(frame);
      }
    };
    reducedMotionQuery.addEventListener("change", onReducedMotionChange);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      reducedMotionQuery.removeEventListener("change", onReducedMotionChange);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
    };
    // Props intentionally form the effect's dependency array — a prop change
    // rebuilds sphere/arc data rather than patching it in place, which is
    // fine because Globe is a decorative background, not a hot-reload target.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markers, arcs, baseColor, markerColor, arcColor, autoRotate, interactive]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("h-full w-full", className)}
    />
  );
}
