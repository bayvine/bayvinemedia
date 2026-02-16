import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import Section from "@/components/Section";
import {
  PHOTO_PLACEHOLDER_SRC,
  VIDEO_PLACEHOLDER_SRC,
} from "@/utils/mediaPlaceholders";

export type ProjectMediaGridProps =
  SliceComponentProps<Content.ProjectMediaGridSlice>;

const ProjectMediaGrid: FC<ProjectMediaGridProps> = ({ slice }) => {
  const items = slice.primary.items ?? [];
  const totalItems = items.length;

  if (!items.length) {
    return null;
  }

  const shouldSpanFull = (index: number) => {
    if (totalItems === 1) return true;
    if (totalItems === 2) return false;

    const remainder = totalItems % 3;
    if (remainder === 2 && index >= totalItems - 2) {
      return false;
    }

    return index % 3 === 0;
  };

  return (
    <Section
      className="py-12"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {slice.primary.heading ? (
        <p className="mb-6 text-sm font-semibold">
          {slice.primary.heading}
        </p>
      ) : null}
      <div className="grid gap-6 sm:grid-cols-2">
        {items.map((item, index) => {
          const hasVideo = isFilled.linkToMedia(item.video);
          const hasImage = Boolean(item.image?.url);
          const spanFull = shouldSpanFull(index);
          return (
            <div
              key={`${item.caption ?? "media"}-${index}`}
              className={`rounded-3xl  p-3 ${
                spanFull ? "sm:col-span-2" : ""
              }`}
            >
              <div className="relative aspect-video overflow-hidden rounded-lg">
                {hasVideo ? (
                  <video
                    src={item.video.url ?? undefined}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    poster={VIDEO_PLACEHOLDER_SRC}
                    className="h-full w-full bg-center bg-cover object-cover"
                    style={{ backgroundImage: `url(${VIDEO_PLACEHOLDER_SRC})` }}
                  />
                ) : hasImage ? (
                  <PrismicNextImage
                    field={item.image}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="bg-center bg-cover object-cover"
                    style={{ backgroundImage: `url(${PHOTO_PLACEHOLDER_SRC})` }}
                  />
                ) : (
                  <div
                    className="h-full w-full bg-center bg-cover"
                    style={{ backgroundImage: `url(${PHOTO_PLACEHOLDER_SRC})` }}
                  />
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
