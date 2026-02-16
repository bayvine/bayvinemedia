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
import Eyebrow from "@/components/Eyebrow";
import { PHOTO_PLACEHOLDER_SRC, VIDEO_PLACEHOLDER_SRC } from "@/utils/mediaPlaceholders";

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
            className="project-detail-media pointer-events-none absolute inset-0 h-full w-full bg-center bg-cover object-cover"
            src={backgroundVideo.url ?? undefined}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            tabIndex={-1}
            poster={VIDEO_PLACEHOLDER_SRC}
            style={{ backgroundImage: `url(${VIDEO_PLACEHOLDER_SRC})` }}
          />
        ) : hasImage ? (
          <div className="project-detail-media absolute inset-0">
            <PrismicNextImage
              field={backgroundImage}
              fill
              sizes="100vw"
              loading="eager"
              className="bg-center bg-cover object-cover"
              style={{ backgroundImage: `url(${PHOTO_PLACEHOLDER_SRC})` }}
            />
          </div>
        ) : (
          <div
            className="project-detail-media absolute inset-0 bg-slate-900 bg-center bg-cover"
            style={{ backgroundImage: `url(${PHOTO_PLACEHOLDER_SRC})` }}
          />
        )}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/70 to-black"
        />
      </div>

      <Section className="relative z-10 flex min-h-[340px] items-end">
        <div className="max-w-3xl">
          {eyebrow ? (
            <Eyebrow className="mb-4">{eyebrow}</Eyebrow>
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

          {hasDescription ? (
            <div className="project-detail-body">
              <PrismicRichText
                field={description}
                components={{
                  paragraph: ({ children }) => (
                    <p className="text-base mt-1 leading-relaxed sm:text-lg">
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
