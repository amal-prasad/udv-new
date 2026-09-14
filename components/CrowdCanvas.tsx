"use client";

/**
 * Sprite-sheet crowd, ported from Skiper39/zadvorsky. Slices a grid atlas of
 * individual people (PEEPS_SPRITE: 15 cols x 7 rows of 240x324 cutouts, see
 * lib/images.ts) and walks them back and forth along the bottom of the
 * canvas with GSAP timelines, driven by the shared gsap.ticker so it stays
 * on the same clock as Lenis (components/SmoothScroll.tsx).
 */
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

interface CrowdCanvasProps {
  src: string;
  /** Cells across the sheet (columns). */
  cols?: number;
  /** Cells down the sheet (rows). */
  rows?: number;
  /** Draw scale applied to each peep's cell — the sheet's 324px-tall cells
   *  are giant against the band, this shrinks them to crowd size. */
  scale?: number;
}

type Peep = {
  image: HTMLImageElement;
  rect: number[];
  width: number;
  height: number;
  x: number;
  y: number;
  anchorY: number;
  scaleX: number;
  walk: gsap.core.Timeline | null;
  setRect: (rect: number[]) => void;
  render: (ctx: CanvasRenderingContext2D) => void;
};

export function CrowdCanvas({ src, cols = 15, rows = 7, scale = 0.55 }: CrowdCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const randomRange = (min: number, max: number) => min + Math.random() * (max - min);
    const randomIndex = (arr: unknown[]) => (randomRange(0, arr.length) | 0);
    const removeFromArray = <T,>(arr: T[], i: number) => arr.splice(i, 1)[0];
    const removeItemFromArray = <T,>(arr: T[], item: T) => removeFromArray(arr, arr.indexOf(item));
    const removeRandomFromArray = <T,>(arr: T[]) => removeFromArray(arr, randomIndex(arr));
    const getRandomFromArray = <T,>(arr: T[]) => arr[randomIndex(arr)];

    // Depth-jitter and bob are Y-axis quantities sized against the peep's
    // own (scaled) height, so they stay proportional at any scale.
    const resetPeep = ({ stage, peep }: { stage: { width: number; height: number }; peep: Peep }) => {
      const direction = Math.random() > 0.5 ? 1 : -1;
      const offsetY = (100 - 250 * gsap.parseEase("power2.in")(Math.random())) * scale;
      const startY = stage.height - peep.height + offsetY;
      let startX: number;
      let endX: number;
      if (direction === 1) {
        startX = -peep.width;
        endX = stage.width;
        peep.scaleX = 1;
      } else {
        startX = stage.width + peep.width;
        endX = 0;
        peep.scaleX = -1;
      }
      peep.x = startX;
      peep.y = startY;
      peep.anchorY = startY;
      return { startY, endX };
    };

    const normalWalk = ({ peep, props }: { peep: Peep; props: { startY: number; endX: number } }) => {
      const { startY, endX } = props;
      const xDuration = 10;
      const yDuration = 0.25;
      const tl = gsap.timeline();
      tl.timeScale(randomRange(0.5, 1.5));
      tl.to(peep, { duration: xDuration, x: endX, ease: "none" }, 0);
      tl.to(peep, { duration: yDuration, repeat: xDuration / yDuration, yoyo: true, y: startY - 10 * scale }, 0);
      return tl;
    };

    const createPeep = ({ image, rect }: { image: HTMLImageElement; rect: number[] }): Peep => {
      const peep: Peep = {
        image,
        rect: [],
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        anchorY: 0,
        scaleX: 1,
        walk: null,
        setRect(r) {
          peep.rect = r;
          peep.width = r[2] * scale;
          peep.height = r[3] * scale;
        },
        render(context) {
          context.save();
          context.translate(peep.x, peep.y);
          context.scale(peep.scaleX, 1);
          context.drawImage(
            peep.image,
            peep.rect[0], peep.rect[1], peep.rect[2], peep.rect[3],
            0, 0, peep.width, peep.height
          );
          context.restore();
        },
      };
      peep.setRect(rect);
      return peep;
    };

    const img = document.createElement("img");
    const stage = { width: 0, height: 0 };
    let lastWidth = 0;
    const allPeeps: Peep[] = [];
    const availablePeeps: Peep[] = [];
    const crowd: Peep[] = [];

    const createPeeps = () => {
      const { naturalWidth: width, naturalHeight: height } = img;
      const total = cols * rows;
      const rectWidth = width / cols;
      const rectHeight = height / rows;
      for (let i = 0; i < total; i++) {
        allPeeps.push(
          createPeep({
            image: img,
            rect: [(i % cols) * rectWidth, ((i / cols) | 0) * rectHeight, rectWidth, rectHeight],
          })
        );
      }
    };

    const removePeepFromCrowd = (peep: Peep) => {
      removeItemFromArray(crowd, peep);
      availablePeeps.push(peep);
    };

    const addPeepToCrowd = () => {
      const peep = removeRandomFromArray(availablePeeps);
      const walk = getRandomFromArray([normalWalk])({
        peep,
        props: resetPeep({ peep, stage }),
      }).eventCallback("onComplete", () => {
        removePeepFromCrowd(peep);
        addPeepToCrowd();
      });
      peep.walk = walk;
      crowd.push(peep);
      crowd.sort((a, b) => a.anchorY - b.anchorY);
    };

    const initCrowd = () => {
      // 105 peeps (15x7), each with its own GSAP timeline and canvas draw
      // call, is heavy on low-end phones. Cap concurrent crowd size below
      // 768px instead of thinning the sprite grid itself.
      const cap = window.innerWidth < 768 ? Math.ceil(allPeeps.length / 3) : allPeeps.length;
      let added = 0;
      while (availablePeeps.length && added < cap) {
        addPeepToCrowd();
        added++;
      }
    };

    // prefers-reduced-motion: stand a static crowd along the ground line and
    // render one frame. No timelines, no ticker.
    const placeStatic = () => {
      crowd.length = 0;
      availablePeeps.length = 0;
      availablePeeps.push(...allPeeps);
      const count = Math.min(allPeeps.length, window.innerWidth < 768 ? 6 : 12);
      const slot = stage.width / count;
      for (let i = 0; i < count; i++) {
        const peep = removeRandomFromArray(availablePeeps);
        peep.scaleX = Math.random() > 0.5 ? 1 : -1;
        peep.x = slot * i + slot / 2 - peep.width / 2 + randomRange(-slot * 0.15, slot * 0.15);
        peep.y = stage.height - peep.height;
        peep.anchorY = peep.y;
        crowd.push(peep);
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(devicePixelRatio, devicePixelRatio);
      crowd.forEach((peep) => peep.render(ctx));
      ctx.restore();
    };

    const resize = () => {
      const widthChanged = canvas.clientWidth !== lastWidth;
      lastWidth = canvas.clientWidth;
      stage.width = canvas.clientWidth;
      stage.height = canvas.clientHeight;
      canvas.width = stage.width * devicePixelRatio;
      canvas.height = stage.height * devicePixelRatio;
      // Mobile browsers fire resize when the URL bar hides/shows on scroll —
      // that's a height-only change, not a real layout shift. Don't reset
      // the whole crowd for it, or the walk restarts every time someone
      // scrolls the page. The canvas backing store still needs a fresh
      // frame though, since resizing it just wiped the bitmap.
      if (!widthChanged && crowd.length) {
        if (reducedMotion) render();
        return;
      }
      if (reducedMotion) {
        placeStatic();
        render();
        return;
      }
      crowd.forEach((peep) => peep.walk?.kill());
      crowd.length = 0;
      availablePeeps.length = 0;
      availablePeeps.push(...allPeeps);
      initCrowd();
    };

    img.onload = () => {
      createPeeps();
      resize();
      if (!reducedMotion) gsap.ticker.add(render);
    };
    // A 404 or broken sprite must not leave the section stuck mid-setup —
    // just leave the canvas empty instead of throwing.
    img.onerror = () => {
      console.error(`CrowdCanvas: failed to load sprite at ${src}`);
    };
    img.src = src;

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      gsap.ticker.remove(render);
      crowd.forEach((peep) => peep.walk?.kill());
    };
  }, [src, cols, rows, scale]);

  return <canvas ref={canvasRef} className="absolute bottom-0 h-full w-full" />;
}
