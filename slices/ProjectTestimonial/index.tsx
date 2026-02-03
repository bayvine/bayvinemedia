import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import Section from "@/components/Section";

export type ProjectTestimonialProps =
  SliceComponentProps<Content.ProjectTestimonialSlice>;

const ProjectTestimonial: FC<ProjectTestimonialProps> = ({ slice }) => {
  const authorMeta = [slice.primary.author_title, slice.primary.author_company]
    .filter(Boolean)
    .join(" • ");

  return (
    <Section
      className="py-12"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-10">
        <div className="text-xl font-semibold leading-relaxed text-white sm:text-2xl">
          <PrismicRichText
            field={slice.primary.quote}
            components={{
              paragraph: ({ children }) => <p>“{children}”</p>,
            }}
          />
        </div>
        <div className="mt-6 flex items-center gap-4">
          {slice.primary.author_image?.url ? (
            <div className="relative h-14 w-14 overflow-hidden rounded-full border border-white/10">
              <PrismicNextImage
                field={slice.primary.author_image}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
          ) : null}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
              {slice.primary.author_name || "Client"}
            </p>
            {authorMeta ? (
              <p className="text-sm text-white/60">{authorMeta}</p>
            ) : null}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ProjectTestimonial;
