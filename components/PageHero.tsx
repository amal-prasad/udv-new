import Image from "next/image";

import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";
import { PHOTO_SCRIM } from "@/components/TripCard";
import { blurFor } from "@/lib/images";

/** Photo header for inner pages: gives the fixed navbar a dark ground and
 *  holds the breadcrumb, the page's one h1 and its intro line. */
export function PageHero({
  photo,
  alt = "",
  crumbs,
  eyebrow,
  title,
  children,
}: {
  photo: string;
  alt?: string;
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="relative flex min-h-[60svh] items-end overflow-hidden bg-night">
      <Image
        src={photo}
        alt={alt}
        fill
        loading="eager"
        fetchPriority="high"
        sizes="100vw"
        placeholder="blur"
        blurDataURL={blurFor(photo)}
        className="object-cover"
      />
      <div className="absolute inset-0" style={{ backgroundImage: PHOTO_SCRIM }} />
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-4 px-6 pb-12 pt-32 md:px-10">
        <Breadcrumbs items={crumbs} />
        {eyebrow && (
          <p className="text-[0.7rem] uppercase tracking-[0.18em] text-dawn">{eyebrow}</p>
        )}
        <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-paper md:text-6xl">
          {title}
        </h1>
        {children}
      </div>
    </header>
  );
}
