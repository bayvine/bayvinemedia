import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Section from "@/components/Section";
import { PHOTO_PLACEHOLDER_SRC } from "@/utils/mediaPlaceholders";

export type RelatedProjectProps =
  SliceComponentProps<Content.RelatedProjectSlice>;

const RelatedProject: FC<RelatedProjectProps> = ({ slice }) => {
  const linkField = isFilled.link(slice.primary.project_link)
    ? slice.primary.project_link
    : isFilled.link(slice.primary.project)
      ? slice.primary.project
      : null;

  const title = slice.primary.project_title || slice.primary.project.uid || "";

  return (
    <Section
      className="py-12"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold uppercase sm:text-3xl">
          {slice.primary.heading || "Related project"}
        </h2>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div className="relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-black/40">
          {slice.primary.project_image?.url ? (
            <PrismicNextImage
              field={slice.primary.project_image}
              fallbackAlt=""
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
              loading="lazy"
            />
          ) : (
            <div
              className="h-full w-full bg-center bg-cover"
              style={{ backgroundImage: `url(${PHOTO_PLACEHOLDER_SRC})` }}
            />
          )}
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
            Case study
          </p>
          <h3 className="mt-3 text-3xl font-black uppercase">
            {title || "Project"}
          </h3>
          <div className="mt-4 text-base text-slate-200 sm:text-lg">
            <PrismicRichText
              field={slice.primary.project_description}
              components={{
                paragraph: ({ children }) => <p>{children}</p>,
              }}
            />
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {slice.primary.project_tags.map((tag, index) => (
              <span
                key={`${tag.tag}-${index}`}
                className="rounded-full border border-white/25 bg-black/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80"
              >
                {tag.tag}
              </span>
            ))}
          </div>
          {linkField ? (
            <PrismicNextLink
              field={linkField}
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80 transition hover:border-white hover:text-white"
            >
              View project
            </PrismicNextLink>
          ) : null}
        </div>
      </div>
    </Section>
  );
};

export default RelatedProject;
