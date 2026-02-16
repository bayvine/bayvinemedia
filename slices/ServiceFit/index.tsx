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
        {slice.primary.for_you_heading ? (
        <p className="text-2xl font-bold uppercase sm:text-3xl">
          {slice.primary.for_you_heading}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center justify-between my-1 max-w-lg">
        <h2 className="text-base sm:text-lg">
          {slice.primary.heading || "Is this for you?"}
        </h2>
      </div>

    

      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {forYou.map((item, index) => (
          <div
            key={`for-${index}`}
            className="flex min-h-[180px] flex-col rounded-lg  bg-[#0C0E1D] p-8 backdrop-blur"
          >
            <span className="flex w-12 aspect-video items-center justify-center mb-3">
              {item.icon?.url ? (
                <PrismicNextImage
                  field={item.icon}
                  className="h-full w-full"
                />
              ) : (
                <RxCheck className="text-3xl" />
              )}
            </span>
            <p className="text-lg font-bold">
              {item.text || "Benefit"}
            </p>
            
              <p className="text-lg">
                {item.description || ""}
              </p>
   
          </div>
        ))}
      </div>

      <div className="my-10 h-px w-full bg-white" />

      <div>
        <p className="text-lg font-bold">
          {slice.primary.not_for_you_heading ||
            "When this might not be the right fit"}
        </p>
        <p className="mt-2 text-lg">
          {slice.primary.not_for_you_intro ||
            "This might not be the right fit if:"}
        </p>
        <ul className="mt-6 space-y-4">
          {notForYou.map((item, index) => (
            <li
              key={`not-${index}`}
              className="flex items-center gap-4 "
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-400/40 ">
                <RxCross2 />
              </span>
              <span className="text-lg font-medium">
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
