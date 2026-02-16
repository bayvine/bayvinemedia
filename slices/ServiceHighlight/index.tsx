import { FC } from "react";
import { Content, isFilled, type LinkToMediaField } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Section from "@/components/Section";
import CTAButton from "@/components/CTAButton";
import SectionTitle from "@/components/SectionTitle";

export type ServiceHighlightProps =
  SliceComponentProps<Content.ServiceHighlightSlice>;

const ServiceHighlight: FC<ServiceHighlightProps> = ({ slice }) => {
  const hasCta = isFilled.link(slice.primary.cta_link);
  const videoField = (slice.primary as { video?: LinkToMediaField }).video;
  const hasVideo = videoField ? isFilled.linkToMedia(videoField) : false;
  const hasImage = Boolean(slice.primary.image?.url);
  const isContactHref = (href?: string | null) =>
    typeof href === "string" && /\/contact(\/|$|\?|#)/.test(href);

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
            <PrismicNextLink
              field={slice.primary.cta_link}
              {...(isContactHref(slice.primary.cta_link.url)
                ? { target: "_self" }
                : {})}
              className="mt-6 inline-flex w-fit"
            >
              <CTAButton className="">
                {slice.primary.cta_label || "Contact us"}
              </CTAButton>
            </PrismicNextLink>
          ) : null}
        </div>

        <div className="relative aspect-video overflow-hidden">
          {hasImage ? (
            <PrismicNextImage
              alt="HELLO"
              field={slice.primary.image}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain"
            />
          ) : null}
          {hasVideo ? (
            <video
              className="absolute inset-0 z-10 h-full w-full object-contain rounded-lg"
              src={videoField.url ?? undefined}
              preload="metadata"
              autoPlay
              muted
              loop
              playsInline
              poster={
                hasImage ? (slice.primary.image.url ?? undefined) : undefined
              }
            />
          ) : null}
          {!hasImage && !hasVideo && null}
        </div>
      </div>
    </Section>
  );
};

export default ServiceHighlight;
