import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import Section from "@/components/Section";
import SectionTitle from "@/components/SectionTitle";
import { PHOTO_PLACEHOLDER_SRC } from "@/utils/mediaPlaceholders";

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
      <div className="flex flex-col items-center justify-center mx-auto w-full">
        <div className="text-3xl uppercase text-center font-bold sm:text-4xl">
          <PrismicRichText
            field={slice.primary.quote}
            components={{
              paragraph: ({ children }) => <p>“{children}”</p>,
            }}
          />
        </div>
        <div className="mt-6 flex flex-col justify-center items-center gap-2">
          {slice.primary.author_image?.url ? (
            <div className="relative h-14 w-14 overflow-hidden rounded-full border border-white">
              <PrismicNextImage
                field={slice.primary.author_image}
                fill
                sizes="56px"
                className="bg-center bg-cover object-cover"
                style={{ backgroundImage: `url(${PHOTO_PLACEHOLDER_SRC})` }}
                loading="lazy"
              />
            </div>
          ) : null}
          <div className="text-center">
            <SectionTitle title={slice.primary.author_name || ""} description={authorMeta} />
          
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ProjectTestimonial;
