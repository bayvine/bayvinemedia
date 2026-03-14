import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import {
  PHOTO_PLACEHOLDER_SRC,
  VIDEO_PLACEHOLDER_SRC,
} from "@/utils/mediaPlaceholders";
import Section from "@/components/Section";

export type ProjectSingleMediaProps =
  SliceComponentProps<Content.ProjectSingleMediaSlice>;

const ProjectSingleMedia: FC<ProjectSingleMediaProps> = ({ slice }) => {
  const hasVideo = isFilled.linkToMedia(slice.primary.video);
  const hasImage = Boolean(slice.primary.image?.url);
  const mediaClassName = "h-full w-full origin-center object-cover scale-[1.02] transform-gpu";

  return (
    <Section
    
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="relative">
        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-[#0C0E1D]">
          {hasVideo ? (
            <video
              src={slice.primary.video.url ?? undefined}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster={VIDEO_PLACEHOLDER_SRC}
              className={mediaClassName}
            />
          ) : hasImage ? (
            <PrismicNextImage
              field={slice.primary.image}
              fallbackAlt=""
              fill
              sizes="100vw"
              className={mediaClassName}
            />
          ) : (
            <div
              className={mediaClassName + " bg-center bg-cover"}
              style={{ backgroundImage: `url(${PHOTO_PLACEHOLDER_SRC})` }}
            />
          )}
        </div>
      </div>
      {slice.primary.caption ? (
        <div className="mx-auto mt-4 w-full px-6 text-sm font-semibold uppercase tracking-[0.2em] text-white/50 sm:px-10 lg:px-16">
          {slice.primary.caption}
        </div>
      ) : null}
    </Section>
  );
};

export default ProjectSingleMedia;
