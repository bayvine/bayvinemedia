import { FC } from "react";
import {
  isFilled,
  type ImageField,
  type KeyTextField,
  type LinkToMediaField,
  type RichTextField,
} from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import Section from "@/components/Section";
import Tag from "@/components/Tag";

type DetailHeroProps = {
  title: RichTextField;
  subtitle?: RichTextField;
  description?: RichTextField;
  eyebrow?: KeyTextField;
  tags?: string[];
  backgroundImage: ImageField;
  backgroundVideo: LinkToMediaField;
  dataSliceType?: string;
  dataSliceVariation?: string;
};

const DetailHero: FC<DetailHeroProps> = ({
  title,
  subtitle,
  description,
  eyebrow,
  tags,
  backgroundImage,
  backgroundVideo,
  dataSliceType,
  dataSliceVariation,
}) => {
  const hasVideo = isFilled.linkToMedia(backgroundVideo);
  const hasImage = Boolean(backgroundImage?.url);
  const hasSubtitle = isFilled.richText(subtitle);
  const hasDescription = isFilled.richText(description);
  const cleanTags = (tags ?? []).filter((tag): tag is string => Boolean(tag));

  return (
    <section
      className="relative overflow-hidden pb-12 pt-24 sm:pt-32"
      data-slice-type={dataSliceType}
      data-slice-variation={dataSliceVariation}
    >
      <div className="absolute inset-0">
        {hasVideo ? (
          <video
            className="project-detail-media absolute inset-0 h-full w-full object-cover"
            src={backgroundVideo.url ?? undefined}
            autoPlay
            muted
            loop
            playsInline
            poster={backgroundImage?.url || ""}
          />
        ) : hasImage ? (
          <div className="project-detail-media absolute inset-0">
            <PrismicNextImage
              field={backgroundImage}
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

      <Section className="relative z-10 flex min-h-[340px] items-end">
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="text-lg font-semibold uppercase mb-2">
              {eyebrow}
            </p>
          ) : null}
          <div className="project-detail-title">
            <PrismicRichText
              field={title}
              components={{
                heading1: ({ children }) => (
                  <h1 className="text-4xl font-black uppercase sm:text-5xl lg:text-6xl">
                    {children}
                  </h1>
                ),
              }}
            />
          </div>

          {hasSubtitle ? (
            <div className="project-detail-body text-lg sm:text-xl">
              <PrismicRichText
                field={subtitle}
                components={{
                  paragraph: ({ children }) => (
                    <p className="mt-2 font-semibold text-slate-100">
                      {children}
                    </p>
                  ),
                }}
              />
            </div>
          ) : null}

          {hasDescription ? (
            <div className="project-detail-body text-lg sm:text-xl">
              <PrismicRichText
                field={description}
                components={{
                  paragraph: ({ children }) => (
                    <p className="mt-2 font-semibold text-slate-100">
                      {children}
                    </p>
                  ),
                }}
              />
            </div>
          ) : null}

          {cleanTags.length ? (
            <div className="my-4 flex items-center gap-4 flex-wrap">
              {cleanTags.map((tag, index) => (
                <Tag key={`${tag}-${index}`}>{tag}</Tag>
              ))}
            </div>
          ) : null}
        </div>
      </Section>
    </section>
  );
};

export default DetailHero;
