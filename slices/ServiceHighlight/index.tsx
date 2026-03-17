import { FC } from "react";
import { Content, isFilled, type LinkToMediaField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import PrismicLink from "@/components/PrismicLink";
import Section from "@/components/Section";
import CTAButton from "@/components/CTAButton";
import SectionTitle from "@/components/SectionTitle";
import {
  PHOTO_PLACEHOLDER_SRC,
  VIDEO_PLACEHOLDER_SRC,
} from "@/utils/mediaPlaceholders";
import { isContactHref } from "@/utils/links";

export type ServiceHighlightProps =
  SliceComponentProps<Content.ServiceHighlightSlice>;

const ServiceHighlight: FC<ServiceHighlightProps> = ({ slice }) => {
  const hasCta = isFilled.link(slice.primary.cta_link);
  const videoField = (slice.primary as { video?: LinkToMediaField }).video;
  const hasVideo = videoField ? isFilled.linkToMedia(videoField) : false;
  const hasImage = Boolean(slice.primary.image?.url);

  return (
    <Section
      className="py-12"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionTitle
            title={slice.primary.heading}
            description={slice.primary.description}
          />
          {hasCta ? (
            <PrismicLink
              field={slice.primary.cta_link}
              {...(isContactHref(slice.primary.cta_link.url)
                ? { target: "_self" }
                : {})}
              className="mt-6 inline-flex w-fit"
            >
              <CTAButton as="span" className="">
                {slice.primary.cta_label || "Contact us"}
              </CTAButton>
            </PrismicLink>
          ) : null}
        </div>

        <div className="relative aspect-video overflow-hidden rounded-lg">
          {hasImage ? (
            <PrismicNextImage
              field={slice.primary.image}
              fallbackAlt=""
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          ) : null}
          {hasVideo ? (
            <video
              className="pointer-events-none absolute inset-0 z-10 h-full w-full object-contain"
              src={videoField.url ?? undefined}
              preload="metadata"
              autoPlay
              muted
              loop
              playsInline
              poster={VIDEO_PLACEHOLDER_SRC}
            />
          ) : null}
          {!hasImage && !hasVideo ? (
            <div
              className="absolute inset-0 bg-center bg-cover"
              style={{ backgroundImage: `url(${PHOTO_PLACEHOLDER_SRC})` }}
            />
          ) : null}
        </div>
      </div>
    </Section>
  );
};

export default ServiceHighlight;
