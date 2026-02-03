import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import Section from "@/components/Section";

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
          className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black"
        />
      </div>

      <Section className="relative z-10 w-full h-full flex items-end p-10">
        <div className="max-w-3xl">
          <div className="project-detail-title">
            <PrismicRichText
            field={slice.primary.title}
            components={{
              heading1: ({ children }) => (
                <h1 className="text-4xl font-black uppercase leading-tight sm:text-5xl lg:text-6xl">
                  {children}
                </h1>
              ),
            }}
            />
          </div>
          <div className="project-detail-body mt-4 text-lg text-slate-100/90 sm:text-xl">
            <PrismicRichText
              field={slice.primary.description}
              components={{
                paragraph: ({ children }) => <p className="">{children}</p>,
              }}
            />
          </div>
          {tags.length ? (
            <div className="mt-6 flex flex-wrap gap-3">
              {tags.map((tag, index) => (
                <span
                  key={`${tag.tag}-${index}`}
                  className="rounded-full border border-white/25 bg-black/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80"
                >
                  {tag.tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </Section>
    </section>
  );
};

export default ProjectDetailHero;
