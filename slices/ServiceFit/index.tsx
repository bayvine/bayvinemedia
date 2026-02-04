import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { RxCheck, RxCross2 } from "react-icons/rx";
import Section from "@/components/Section";

export type ServiceFitProps = SliceComponentProps<Content.ServiceFitSlice>;

const ServiceFit: FC<ServiceFitProps> = ({ slice }) => {
  const forYou = slice.primary.for_you_items ?? [];
  const notForYou = slice.primary.not_for_you_items ?? [];

  return (
    <Section
      className="py-12"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-bold uppercase sm:text-3xl">
          {slice.primary.heading || "Is this service for you?"}
        </h2>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
            {slice.primary.for_you_heading || "Best for you if"}
          </p>
          <ul className="mt-6 space-y-4">
            {forYou.map((item, index) => (
              <li key={`for-${index}`} className="flex gap-3 text-white/90">
                <span className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                  <RxCheck />
                </span>
                <span className="text-base sm:text-lg">
                  {item.text || "Benefit"}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-rose-500/20 bg-rose-500/5 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-300">
            {slice.primary.not_for_you_heading || "Not a fit if"}
          </p>
          <ul className="mt-6 space-y-4">
            {notForYou.map((item, index) => (
              <li key={`not-${index}`} className="flex gap-3 text-white/90">
                <span className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-rose-500/20 text-rose-300">
                  <RxCross2 />
                </span>
                <span className="text-base sm:text-lg">
                  {item.text || "Constraint"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
};

export default ServiceFit;
