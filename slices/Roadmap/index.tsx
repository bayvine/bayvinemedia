"use client";

import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Section from "@/components/Section";

/**
 * Props for `Roadmap`.
 */
export type RoadmapProps = SliceComponentProps<Content.RoadmapSlice>;

type RoadmapItemProps = {
  item: Content.RoadmapSliceDefaultPrimaryRoadmapItem;
};

const RoadMapItem: FC<RoadmapItemProps> = ({ item }) => {
  return (
    <article className="overflow-hidden border-t border-white py-6 md:py-8">
      <div className="flex h-full flex-col gap-4 lg:flex-row md:items-start lg:gap-6">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold uppercase leading-tight text-white sm:text-2xl">
              {item.title || "Untitled step"}
            </h3>
          </div>

          <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-200 sm:text-base">
            <PrismicRichText
              field={item.description}
              components={{
                paragraph: ({ children }) => (
                  <p className="leading-relaxed">{children}</p>
                ),
              }}
            />
          </div>
        </div>

        {item.media?.url ? (
          <div className="relative mt-4 aspect-video w-full overflow-hidden rounded-2xl bg-slate-900/40 shadow-lg md:mt-0 md:w-[360px] lg:w-[520px] xl:w-[620px]">
            <video
              src={item.media.url}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
            />
          </div>
        ) : null}
      </div>
    </article>
  );
};

/**
 * Component for "Roadmap" Slices.
 */
const Roadmap: FC<RoadmapProps> = ({ slice }) => {
  const roadmapItems = [...slice.primary.roadmap];

  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="mt-3 max-w-xl text-slate-200">
        <h2 className="text-2xl font-bold uppercase sm:text-3xl">{slice.primary.title}</h2>
        <div className="my-1 max-w-lg">
          <PrismicRichText
            field={slice.primary.subtitel}
            components={{
              paragraph: ({ children }) => (
                <p className="text-base leading-relaxed sm:text-lg">{children}</p>
              ),
            }}
          />
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-5 sm:mt-12">
        {roadmapItems.map((item, index) => (
          <RoadMapItem
            key={`${item.title ?? "step"}-${index}`}
            item={item}
          />
        ))}
      </div>
    </Section>
  );
};

export default Roadmap;
