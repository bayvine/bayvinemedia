import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Section from "@/components/Section";
import SectionTitle from "@/components/SectionTitle";
import CardText from "@/components/CardText";

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

      <SectionTitle title={slice.primary.heading || ""} />
      

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {steps.map((step, index) => (
          <div
            key={`${step.title ?? "step"}-${index}`}
            className="rounded-lg bg-[#0C0E1D] p-6"
          >
            <p className="text-sm font-semibold uppercase mb-2">
              Step {index + 1}
            </p>

            <CardText title={step.title} description={step.description} />
          
          </div>
        ))}
      </div>
    </Section>
  );
};

export default ServiceProcess;
