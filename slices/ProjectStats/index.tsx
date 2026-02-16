import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import Image from "next/image";
import Section from "@/components/Section";
import SectionTitle from "@/components/SectionTitle";
import { PHOTO_PLACEHOLDER_SRC } from "@/utils/mediaPlaceholders";

export type ProjectStatsProps = SliceComponentProps<Content.ProjectStatsSlice>;

const ProjectStats: FC<ProjectStatsProps> = ({ slice }) => {
  const stats = slice.primary.stats?.slice(0, 3) ?? [];

  if (!stats.length) {
    return null;
  }

  return (
    <Section
      className="py-6"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {slice.primary.heading ? (
        <SectionTitle title={slice.primary.heading} />
      ) : null}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
        {stats.map((stat, index) => {
          const hasIcon = isFilled.image(stat.icon);
          return (
            <div
              key={`${stat.value ?? "stat"}-${index}`}
              className="rounded-lg border border-emerald-300/30 bg-white/2 p-6"
            >
              <div className="flex h-12 w-12 items-center justify-center mb-2">
                {hasIcon ? (
                  <PrismicNextImage
                    field={stat.icon}
                    width={40}
                    height={40}
                    className="h-10 w-10 bg-center bg-cover object-contain "
                    style={{ backgroundImage: `url(${PHOTO_PLACEHOLDER_SRC})` }}
                    loading="lazy"
                  />
                ) : (
                  <Image
                    src="/icon-logo.svg"
                    alt="Bayvine logo"
                    width={40}
                    height={40}
                    className="h-10 w-10 object-contain"
                  />
                )}
              </div>

              <SectionTitle title={stat.value} description={stat.description} noUpperCase titleClassName="text-emerald-300" />
            
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default ProjectStats;
