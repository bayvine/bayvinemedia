import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Section from "@/components/Section";

export type ServiceProcessProps =
  SliceComponentProps<Content.ServiceProcessSlice>;

const ServiceProcess: FC<ServiceProcessProps> = ({ slice }) => {
  const steps = slice.primary.steps ?? [];

  if (!steps.length) {
    return null;
  }

  return (
    <Section
      className="py-12"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold uppercase sm:text-3xl">
          {slice.primary.heading || "How it works"}
        </h2>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {steps.map((step, index) => (
          <div
            key={`${step.title ?? "step"}-${index}`}
            className="rounded-lg bg-[#0C0E1D] p-6"
          >
            <p className="text-md font-semibold uppercase text-white">
              Step {index + 1}
            </p>
            <h3 className="mt-3 text-2xl font-bold uppercase">
              {step.title || "Step title"}
            </h3>
            <div className="mt-3 text-lg">
              <PrismicRichText
                field={step.description}
                components={{
                  paragraph: ({ children }) => <p>{children}</p>,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default ServiceProcess;
