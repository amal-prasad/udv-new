// Plain module (no "use client") so server and client components can both
// import these values.
export const SITE = {
  name: "Untouch Destination",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://udv-new.vercel.app",
  whatsappNumber: "918800888489",
  email: "untouchdestination001@gmail.com",
  instagramHandle: "@untouchdestination",
  instagramUrl: "https://instagram.com/untouchdestination",
  // TODO: business address pending from client (docs/owner-todo.md).
} as const;
