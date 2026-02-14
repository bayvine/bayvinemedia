import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Section from "@/components/Section";

export type ProjectDoubleColumnTextProps =
  SliceComponentProps<Content.ProjectDoubleColumnTextSlice>;

const ProjectDoubleColumnText: FC<ProjectDoubleColumnTextProps> = ({ slice }) => {
  const details = slice.primary.details ?? [];

  return (
    <Section
      className="py-12"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="grid gap-20 lg:grid-cols-[1.2fr_0.8fr] items-center">
        <div>
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
          <div className="mt-4 text-base sm:text-lg">
            <PrismicRichText
              field={slice.primary.body}
              components={{
                paragraph: ({ children }) => <p className="mt-3">{children}</p>,
              }}
            />
          </div>
        </div>
        <div className="">
          <ul className="space-y-4">
            {details.map((detail, index) => (
              <li
                key={`${detail.label ?? "detail"}-${index}`}
                className="flex items-start justify-between gap-4 border-b border-white pb-4 last:border-b-0 last:pb-0"
              >
                <span>{detail.label || "Detail"}</span>
                <span className="text-right font-semibold">
                  {detail.value || "-"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
};

export default ProjectDoubleColumnText;
