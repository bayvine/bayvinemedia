"use client";

import { useRef } from "react";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

type ProjectGalleryCarouselProps = {
  items: Content.ProjectDocumentDataGalleryItem[];
  heading?: string;
};

const ProjectGalleryCarousel = ({
  items,
  heading = "Page highlights",
}: ProjectGalleryCarouselProps) => {
  const trackRef = useRef<HTMLDivElement | null>(null);

  if (!items || items.length === 0) {
    return null;
  }

  const handleScroll = (direction: number) => {
    const node = trackRef.current;
    if (!node) return;
    const scrollAmount = Math.round(node.clientWidth * 0.85);
    node.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
  };

  return (
    <div className="mt-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h3 className="text-sm font-semibold uppercase tracking-[0.35em] text-white/70">
          {heading}
        </h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleScroll(-1)}
            aria-label="Scroll gallery backward"
            className="rounded-full border border-white/20 bg-black/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 transition hover:border-white/50 hover:text-white"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={() => handleScroll(1)}
            aria-label="Scroll gallery forward"
            className="rounded-full border border-white/20 bg-black/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 transition hover:border-white/50 hover:text-white"
          >
            Next
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="project-carousel-track mt-6 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-6"
      >
        {items.map((item, index) => {
          const caption = item.caption?.trim();
          return (
            <article
              key={`${item.image?.url ?? "page"}-${index}`}
              className="snap-center shrink-0 w-[82%] sm:w-[70%] lg:w-[55%]"
            >
              <div className="relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                {item.image?.url ? (
                  <PrismicNextImage
                    field={item.image}
                    fill
                    sizes="(max-width: 768px) 90vw, (max-width: 1200px) 70vw, 55vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm text-white/60">
                    No image
                  </div>
                )}
              </div>
              <div className="mt-3 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/60">
                <span>{`Page ${index + 1}`}</span>
                {caption ? (
                  <span className="text-white/80 normal-case tracking-normal text-sm font-semibold">
                    {caption}
                  </span>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectGalleryCarousel;
