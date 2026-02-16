import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import DetailHero from "@/components/DetailHero";

export type ProjectDetailHeroProps =
  SliceComponentProps<Content.ProjectDetailHeroSlice>;

const ProjectDetailHero: FC<ProjectDetailHeroProps> = ({ slice }) => {
  const tags = (slice.primary.tags ?? [])
    .map((tag) => tag.tag?.trim())
    .filter((tag): tag is string => Boolean(tag));

  return (
    <DetailHero
      title={slice.primary.title}
      eyebrow={"Project"}
      description={slice.primary.description}
      tags={tags}
      backgroundImage={slice.primary.background_image}
      backgroundVideo={slice.primary.background_video}
      dataSliceType={slice.slice_type}
      dataSliceVariation={slice.variation}
    />
  );
};

export default ProjectDetailHero;
