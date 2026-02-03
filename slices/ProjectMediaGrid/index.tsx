import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import Section from "@/components/Section";

export type ProjectMediaGridProps =
  SliceComponentProps<Content.ProjectMediaGridSlice>;

const ProjectMediaGrid: FC<ProjectMediaGridProps> = ({ slice }) => {
  const items = slice.primary.items ?? [];

  if (!items.length) {
    return null;
  }

  return (
    <Section
      className="py-12"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {slice.primary.heading ? (
        <p className="mb-6 text-sm font-semibold uppercase tracking-[0.35em] text-white/60">
          {slice.primary.heading}
        </p>
      ) : null}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item, index) => {
          const hasVideo = isFilled.linkToMedia(item.video);
          const hasImage = Boolean(item.image?.url);
          return (
            <div
              key={`${item.caption ?? "media"}-${index}`}
              className="rounded-3xl border border-white/10 bg-white/5 p-3"
            >
              <div className="relative aspect-video overflow-hidden rounded-2xl bg-black/50">
                {hasVideo ? (
                  <video
                    src={item.video.url ?? undefined}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                  />
                ) : hasImage ? (
                  <PrismicNextImage
                    field={item.image}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm text-white/60">
                    No media
                  </div>
                )}
              </div>
              {item.caption ? (
                <p className="mt-3 text-sm font-semibold text-white/70">
                  {item.caption}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default ProjectMediaGrid;
