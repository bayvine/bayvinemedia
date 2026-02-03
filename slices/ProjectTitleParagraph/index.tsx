import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Section from "@/components/Section";

export type ProjectTitleParagraphProps =
  SliceComponentProps<Content.ProjectTitleParagraphSlice>;

const ProjectTitleParagraph: FC<ProjectTitleParagraphProps> = ({ slice }) => {
  return (
    <Section
      className="py-12"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="max-w-3xl">
        <PrismicRichText
          field={slice.primary.title}
          components={{
            heading2: ({ children }) => (
              <h2 className="text-2xl font-bold uppercase sm:text-3xl">
                {children}
              </h2>
            ),
          }}
        />
        <div className="mt-4 text-base text-slate-200 sm:text-lg">
          <PrismicRichText
            field={slice.primary.body}
            components={{
              paragraph: ({ children }) => <p className="mt-3">{children}</p>,
            }}
          />
        </div>
      </div>
    </Section>
  );
};

export default ProjectTitleParagraph;
