import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Section from "@/components/Section";

export type ServiceHeroProps = SliceComponentProps<Content.ServiceHeroSlice>;

const ServiceHero: FC<ServiceHeroProps> = ({ slice }) => {
  const hasVideo = isFilled.linkToMedia(slice.primary.background_video);
  const hasImage = Boolean(slice.primary.background_image?.url);
  const tags = slice.primary.tags ?? [];

  return (
    <section
      className="relative overflow-hidden pb-12 pt-24 sm:pt-32"
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
          className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/70 to-black"
        />
      </div>

      <Section className="relative z-10 h-[300px]">
        <div className="max-w-3xl">
          {slice.primary.eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-white/60">
              {slice.primary.eyebrow}
            </p>
          ) : null}
          <div className="project-detail-title">
            <PrismicRichText
              field={slice.primary.title}
              components={{
                heading1: ({ children }) => (
                  <h1 className="mt-3 text-4xl font-black uppercase leading-tight sm:text-5xl lg:text-6xl">
                    {children}
                  </h1>
                ),
              }}
            />
          </div>
          <div className="project-detail-body mt-4 text-lg text-slate-100/90 sm:text-xl">
            <PrismicRichText
              field={slice.primary.subtitle}
              components={{
                paragraph: ({ children }) => <p>{children}</p>,
              }}
            />
          </div>
          <div className="mt-4 text-base text-slate-200 sm:text-lg">
            <PrismicRichText
              field={slice.primary.description}
              components={{
                paragraph: ({ children }) => <p>{children}</p>,
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

export default ServiceHero;
