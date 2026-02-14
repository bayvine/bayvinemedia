import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
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
        <h2 className="text-xs font-semibold uppercase tracking-[0.5em] text-white/60">
          {slice.primary.heading || "Is this for you?"}
        </h2>
      </div>

      {slice.primary.for_you_heading ? (
        <p className="mt-3 text-sm font-semibold uppercase tracking-[0.3em] text-white/50">
          {slice.primary.for_you_heading}
        </p>
      ) : null}

      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {forYou.map((item, index) => (
          <div
            key={`for-${index}`}
            className="flex min-h-[180px] flex-col gap-4 rounded-lg border border-white/10 bg-blue-950/50 p-6 backdrop-blur"
          >
            <span className="flex w-30 aspect-video items-center justify-center  ">
              {item.icon?.url ? (
                <PrismicNextImage
                  field={item.icon}
                  className="h-full w-full"
                />
              ) : (
                <RxCheck className="text-2xl" />
              )}
            </span>
            <p className="text-base text-white/80 sm:text-lg">
              {item.text || "Benefit"}
            </p>
          </div>
        ))}
      </div>

      <div className="my-10 h-px w-full bg-white/10" />

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.5em] text-white/60">
          {slice.primary.not_for_you_heading ||
            "When this might not be the right fit"}
        </p>
        <p className="mt-2 text-sm text-white/60">
          {slice.primary.not_for_you_intro ||
            "This might not be the right fit if:"}
        </p>
        <ul className="mt-6 space-y-4">
          {notForYou.map((item, index) => (
            <li
              key={`not-${index}`}
              className="flex items-start gap-4 text-white/85"
            >
              <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white/70">
                <RxCross2 />
              </span>
              <span className="text-base sm:text-lg">
                {item.text || "Constraint"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
};

export default ServiceFit;
