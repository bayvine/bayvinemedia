import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import Section from "@/components/Section";
import Tag from "@/components/Tag";

export type ProjectDetailHeroProps =
  SliceComponentProps<Content.ProjectDetailHeroSlice>;

const ProjectDetailHero: FC<ProjectDetailHeroProps> = ({ slice }) => {
  const hasVideo = isFilled.linkToMedia(slice.primary.background_video);
  const hasImage = Boolean(slice.primary.background_image?.url);

  console.log("hello");

  const tags = slice.primary.tags ?? [];

  return (
    <section
      className="relative overflow-hidden pb-12 pt-20 sm:pt-28 h-[600px]"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="absolute inset-0">
        {hasVideo ? (
          <video
            className="project-detail-media absolute inset-0 h-full w-full object-cover"
            src={slice.primary.background_video.url ?? undefined}
            autoPlay
            muted
            loop
            playsInline
            poster={slice.primary.background_image?.url || ""}
          />
        ) : hasImage ? (
          <div className="project-detail-media absolute inset-0">
            <PrismicNextImage
              field={slice.primary.background_image}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="project-detail-media absolute inset-0 bg-slate-900" />
        )}
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-b from-black/20 via-black/60 to-black"
        />
      </div>

      <Section className="relative z-10 w-full h-full flex items-end p-4 lg:p-10">
        <div className="max-w-3xl">
          <div className="project-detail-title">
            <PrismicRichText
              field={slice.primary.title}
              components={{
                heading1: ({ children }) => (
                  <h1 className="text-4xl font-black uppercase sm:text-5xl lg:text-6xl">
                    {children}
                  </h1>
                ),
              }}
            />
          </div>
          <div className="project-detail-body text-lg sm:text-xl">
            <PrismicRichText
              field={slice.primary.description}
              components={{
                paragraph: ({ children }) => (
                  <p className="mt-2 font-semibold text-slate-100">
                    {children}
                  </p>
                ),
              }}
            />
          </div>
          {tags.length ? (
            <div className="my-4 flex items-center gap-4 flex-wrap">
              {tags.map((tag, index) => (
                <Tag key={`${tag.tag}-${index}`}>{tag.tag}</Tag>
              ))}
            </div>
          ) : null}
        </div>
      </Section>
    </section>
  );
};

export default ProjectDetailHero;
