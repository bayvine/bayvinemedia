import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import DetailHero from "@/components/DetailHero";

export type ServiceHeroProps = SliceComponentProps<Content.ServiceHeroSlice>;

const ServiceHero: FC<ServiceHeroProps> = ({ slice }) => {
  const tags = (slice.primary.tags ?? [])
    .map((tag) => tag.tag?.trim())
    .filter((tag): tag is string => Boolean(tag));

  return (
    <DetailHero
      eyebrow={slice.primary.eyebrow}
      title={slice.primary.title}
      subtitle={slice.primary.subtitle}
      description={slice.primary.description}
      tags={tags}
      backgroundImage={slice.primary.background_image}
      backgroundVideo={slice.primary.background_video}
      dataSliceType={slice.slice_type}
      dataSliceVariation={slice.variation}
    />
  );
};

export default ServiceHero;
