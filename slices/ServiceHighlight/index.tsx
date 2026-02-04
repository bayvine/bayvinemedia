import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Section from "@/components/Section";

export type ServiceHighlightProps =
  SliceComponentProps<Content.ServiceHighlightSlice>;

const ServiceHighlight: FC<ServiceHighlightProps> = ({ slice }) => {
  const hasCta = isFilled.link(slice.primary.cta_link);
  const isContactHref = (href?: string | null) =>
    typeof href === "string" && /\/contact(\/|$|\?|#)/.test(href);

  return (
    <Section
      className="py-12"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <PrismicRichText
            field={slice.primary.heading}
            components={{
              heading2: ({ children }) => (
                <h2 className="text-2xl font-bold uppercase sm:text-3xl">
                  {children}
                </h2>
              ),
            }}
          />
          <div className="mt-4 text-base text-slate-200 sm:text-lg">
            <PrismicRichText
              field={slice.primary.description}
              components={{
                paragraph: ({ children }) => <p className="mt-3">{children}</p>,
              }}
            />
          </div>
          {hasCta ? (
            <PrismicNextLink
              field={slice.primary.cta_link}
              {...(isContactHref(slice.primary.cta_link.url)
                ? { target: "_self" }
                : {})}
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-black transition hover:translate-y-[-2px]"
            >
              {slice.primary.cta_label || "Contact us"}
            </PrismicNextLink>
          ) : null}
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-white/5">
          {slice.primary.image?.url ? (
            <PrismicNextImage
              field={slice.primary.image}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-white/60">
              No image
            </div>
          )}
        </div>
      </div>
    </Section>
  );
};

export default ServiceHighlight;
