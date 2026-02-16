import { FC } from "react";
import { asText, Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Section from "@/components/Section";
import SectionTitle from "@/components/SectionTitle";

export type ProjectTitleParagraphProps =
  SliceComponentProps<Content.ProjectTitleParagraphSlice>;

const ProjectTitleParagraph: FC<ProjectTitleParagraphProps> = ({ slice }) => {
  return (
    <Section
      className="py-12"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <SectionTitle
        title={asText(slice.primary.title)}
        description={slice.primary.body}
      />
    </Section>
  );
};

export default ProjectTitleParagraph;
