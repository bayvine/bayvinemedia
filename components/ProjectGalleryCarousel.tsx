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
  heading = "Highlights",
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
        <h3 className="text-xl font-semibold ">
          {heading}
        </h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleScroll(-1)}
            aria-label="Scroll gallery backward"
            className="rounded-full border border-white/20 bg-black/40 px-4 py-2 text-xs font-semibold  transition hover:border-white/50 hover:text-white"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={() => handleScroll(1)}
            aria-label="Scroll gallery forward"
            className="rounded-full border border-white/20 bg-black/40 px-4 py-2 text-xs font-semibold  transition hover:border-white/50 hover:text-white"
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
        
          return (
            <article
              key={`${item.image?.url ?? "page"}-${index}`}
              className=""
            >
              <div className="snap-center relative overflow-hidden w-[500px] h-[500px] flex items-center justify-center">
                {item.image?.url ? (
                  <PrismicNextImage
                    field={item.image}
                    sizes="(max-width: 768px) 90vw, (max-width: 1200px) 70vw, 55vw"
                    className="object-contain w-full"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm text-white/60">
                   
                  </div>
                )}
              </div>
             
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectGalleryCarousel;
