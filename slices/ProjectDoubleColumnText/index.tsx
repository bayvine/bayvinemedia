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
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
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
          <div className="mt-4 text-base text-slate-200 sm:text-lg">
            <PrismicRichText
              field={slice.primary.body}
              components={{
                paragraph: ({ children }) => <p className="mt-3">{children}</p>,
              }}
            />
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <ul className="space-y-4">
            {details.map((detail, index) => (
              <li
                key={`${detail.label ?? "detail"}-${index}`}
                className="flex items-start justify-between gap-4 border-b border-white/10 pb-4 text-sm uppercase tracking-[0.18em] text-white/70 last:border-b-0 last:pb-0"
              >
                <span>{detail.label || "Detail"}</span>
                <span className="text-right text-white/90 normal-case tracking-normal text-base font-semibold">
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
