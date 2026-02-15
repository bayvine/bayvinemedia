import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import Section from "@/components/Section";
import CTAButton from "@/components/CTAButton";

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
        className="relative isolate overflow-hidden rounded-lg px-25 py-20"
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
            className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/20 via-black/55 to-black/70"
            aria-hidden
          />
        ) : null}
        <div className="relative z-10">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold uppercase ">
              {slice.primary.heading || "Ready to bring your product to life?"}
            </h2>
            {isFilled.richText(slice.primary.body) ? (
              <div className="mt-3">
                <PrismicRichText
                  field={slice.primary.body}
                  components={{
                    paragraph: ({ children }) => (
                      <p className="text-2xl">{children}</p>
                    ),
                  }}
                />
              </div>
            ) : (
              <p className="mt-3">
                Tell us about your next launch or request a quick walkthrough.
              </p>
            )}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            {primaryLink ? (
              <PrismicNextLink
                field={primaryLink}
                {...(isContactHref(primaryLink.url) ? { target: "_self" } : {})}
              >
                <CTAButton>
                  {" "}
                  {slice.primary.primary_cta_label || "Contact us"}
                </CTAButton>
              </PrismicNextLink>
            ) : (
              <Link
                href="/contact"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-black transition hover:translate-y-[-2px]"
              >
                Contact us
              </Link>
            )}

            {secondaryLink ? (
              <PrismicNextLink
                field={secondaryLink}
                {...(isContactHref(secondaryLink.url) ? { target: "_self" } : {})}
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white transition hover:border-white hover:text-white"
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
