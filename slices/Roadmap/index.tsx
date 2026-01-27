"use client";

import React, { FC, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import Section from "@/components/Section";

type RoadmapItem = Content.RoadmapSliceDefaultPrimaryRoadmapItem;

type Props = {
  items: RoadmapItem[];
  navbarHeight?: number; // px
};

const clamp = (v: number) => Math.max(0, Math.min(1, v));

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const RoadMapCard: FC<{
  item: RoadmapItem;
  t: any; // MotionValue<number> 0..1 collapse progress for this card
}> = ({ item, t }) => {
  // Heights
  const cardH = useTransform(t, (v) => `${lerp(400, 150, clamp(v))}px`); // overall card height
  const mediaH = useTransform(t, (v) => `${lerp(320, 100, clamp(v))}px`); // video height (your ask)

  // “Snap” description (not progressive): stays visible until ~70%, then disappears.
  const descOpacity = useTransform(t, [0, 0.68, 0.69, 1], [1, 1, 0, 0]);
  const descScaleY = useTransform(t, [0, 0.68, 0.69, 1], [1, 1, 0, 0]);

  return (
    <motion.article
      // IMPORTANT: remove overflow-hidden here (it can cause weird clipping in sticky stacks)
      className="border-t border-white py-6 md:py-8"
      style={{ height: cardH }}
    >
      <div className="flex h-full flex-col gap-4 lg:flex-row md:items-start lg:gap-6">
        <div className="min-w-0 flex-1">
          <h3 className="text-xl font-bold uppercase leading-tight text-white sm:text-2xl">
            {item.title || "Untitled step"}
          </h3>

          <motion.div
            className="mt-3 origin-top overflow-hidden"
            style={{ opacity: descOpacity, scaleY: descScaleY }}
          >
            <div className="space-y-3 text-sm leading-relaxed text-slate-200 sm:text-base">
              <PrismicRichText
                field={item.description}
                components={{
                  paragraph: ({ children }) => <p className="leading-relaxed">{children}</p>,
                }}
              />
            </div>
          </motion.div>
        </div>

        {item.media?.url ? (
          <motion.div
            className="relative mt-4 w-full overflow-hidden rounded-2xl bg-slate-900/40 shadow-lg md:mt-0 md:w-[360px] lg:w-[520px] xl:w-[620px]"
            style={{ height: mediaH }}
          >
            <video
              src={item.media.url}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover object-center"
            />
          </motion.div>
        ) : null}
      </div>
    </motion.article>
  );
};

const RoadmapCardStatic: FC<{ item: RoadmapItem }> = ({ item }) => {
  return (
    <article className="border-t border-white py-6">
      <div className="flex flex-col gap-4">
        <div className="min-w-0">
          <h3 className="text-xl font-bold uppercase leading-tight text-white sm:text-2xl">
            {item.title || "Untitled step"}
          </h3>
          <div className="mt-3">
            <div className="space-y-3 text-sm leading-relaxed text-slate-200 sm:text-base">
              <PrismicRichText
                field={item.description}
                components={{
                  paragraph: ({ children }) => <p className="leading-relaxed">{children}</p>,
                }}
              />
            </div>
          </div>
        </div>

        {item.media?.url ? (
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-900/40 shadow-lg">
            <video
              src={item.media.url}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover object-center"
            />
          </div>
        ) : null}
      </div>
    </article>
  );
};

export const StickyRoadmapStack: FC<Props> = ({ items, navbarHeight = 20 }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Scroll progress for THIS section only
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const n = Math.max(1, items.length);

  // This creates the “you can’t leave until all collapse” runway
  // Tune multiplier if you want more/less scroll time per card
  const sectionMinH = `${Math.max(140, n * 90)}vh`;

  return (
    <div ref={sectionRef} className="relative my-12" style={{ minHeight: sectionMinH }}>
      {/* ONE sticky wrapper for the whole stack (like dpdk) */}
      <div className="sticky" style={{ top: navbarHeight  }}>
        <div className="h-fit">
          {items.map((item, i) => {
            // Each card collapses in its own slice of the scroll timeline.
            // Card i collapses during [i/n, (i+1)/n]
            const start = i / n;
            const end = (i + 1) / n;

            const t = useTransform(scrollYProgress, (p) => {
              if (p <= start) return 0;
              if (p >= end) return 1;
              return (p - start) / (end - start);
            });

            return <RoadMapCard key={`${item.title ?? "step"}-${i}`} item={item} t={t} />;
          })}
        </div>
      </div>
    </div>
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
      className="py-12"
    >
      <div className="max-w-xl text-slate-200">
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

      <div className="mt-8 md:hidden">
        {roadmapItems.map((item, i) => (
          <RoadmapCardStatic key={`${item.title ?? "step"}-${i}`} item={item} />
        ))}
      </div>

      <div className="hidden md:block">
        <StickyRoadmapStack items={roadmapItems} />
      </div>
    </Section>
  );
};

export default Roadmap;
