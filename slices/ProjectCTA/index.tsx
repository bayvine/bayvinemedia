import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import Section from "@/components/Section";
import CTAButton from "@/components/CTAButton";
import SectionTitle from "@/components/SectionTitle";

export type ProjectCTAProps = SliceComponentProps<Content.ProjectCtaSlice>;

const ProjectCTA: FC<ProjectCTAProps> = ({ slice }) => {
  const primaryLink = isFilled.link(slice.primary.primary_cta_link)
    ? slice.primary.primary_cta_link
    : null;
  const secondaryLink = isFilled.link(slice.primary.secondary_cta_link)
    ? slice.primary.secondary_cta_link
    : null;
  const hasBackground = isFilled.linkToMedia(slice.primary.background);
  const isContactHref = (href?: string | null) =>
    typeof href === "string" && /\/contact(\/|$|\?|#)/.test(href);

  return (
    <Section
      className="py-16"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div
        className="relative isolate overflow-hidden rounded-lg p-8 pt-15 lg:px-15 lg:pb-15 lg:pt-20"
        style={
          hasBackground && slice.primary.background.url
            ? {
                backgroundImage: `url(${slice.primary.background.url})`,
                backgroundSize: "cover",
                backgroundPosition: "top",
              }
            : undefined
        }
      >
        {hasBackground ? (
          <div
            className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/30 via-black/55 to-black/90"
            aria-hidden
          />
        ) : null}
        <div className="relative z-10">

          <SectionTitle title={slice.primary.heading} description={slice.primary.body}/>
        
          <div className="mt-4 flex flex-wrap gap-4">
            {primaryLink && (
              <PrismicNextLink
                field={primaryLink}
                {...(isContactHref(primaryLink.url) ? { target: "_self" } : {})}
              >
                <CTAButton>
                  {slice.primary.primary_cta_label || "Contact us"}
                </CTAButton>
              </PrismicNextLink>
            )}

            {secondaryLink ? (
              <PrismicNextLink
                field={secondaryLink}
                {...(isContactHref(secondaryLink.url) ? { target: "_self" } : {})}
                className="rounded-full border border-white py-3 px-8 font-semibold uppercase text-white transition "
              >
                {slice.primary.secondary_cta_label || "Schedule a call"}
              </PrismicNextLink>
            ) : null}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ProjectCTA;
