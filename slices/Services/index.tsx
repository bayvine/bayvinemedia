"use client";

import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Section from "@/components/Section";
import { RxArrowTopRight } from "react-icons/rx";

/**
 * Props for `Services`.
 */
export type ServicesProps = SliceComponentProps<Content.ServicesSlice>;

/**
 * Component for "Services" Slices.
 */
const Services: FC<ServicesProps> = ({ slice }) => {
  const services = slice.primary.services ?? [];

  return (
    <Section
      className="py-12"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div>
        <h2 className="text-2xl font-bold uppercase">
          {slice.primary.title || "Our services"}
        </h2>
        <div className="max-w-lg my-1 text-slate-200">
          <PrismicRichText
            field={slice.primary.description}
            components={{
              paragraph: ({ children }) => (
                <p className="text-base sm:text-lg">{children}</p>
              ),
            }}
          />
        </div>
      </div>

      <div className="my-12">
        {services.map((service, index) => {
          console.log(service.link)
          const isLinked = isFilled.link(service.link);
          const content = (
            <>
              <h3 className="z-50 text-4xl sm:text-5xl font-semibold mb-0 flex items-center group-hover:text-black md:pr-6">
                <span className="mr-4 text-sm text-slate-50 group-hover:text-black font-extralight w-0.5 h-0.5 flex items-center justify-center border rounded-full p-3">
                  {index + 1}
                </span>
                {service.title || "Service"}
              </h3>
              <div className="max-w-sm z-50 text-slate-100/90 group-hover:text-black">
                <PrismicRichText
                  field={service.service_description}
                  components={{
                    paragraph: ({ children }) => <p>{children}</p>,
                  }}
                />
              </div>
              <RxArrowTopRight
                size={30}
                className="relative z-50 group-hover:text-black mr-0 md:mr-8 self-end lg:self-auto justify-self-end group-hover:translate-x-0.5 group-hover:-translate-y-1 transition-all duration-300"
              />
            </>
          );

          return isLinked ? (
            <PrismicNextLink
              key={`${service.title ?? "service"}-${index}`}
              href={`/services/${service.link.uid}`}
              className="w-full border-t border-gray-500 px-4 py-10 sm:px-6 sm:py-12 transition-all duration-300 hover:bg-slate-50 group cursor-pointer grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)_auto] lg:items-center"
            >
              {content}
            </PrismicNextLink>
          ) : (
            <div
              key={`${service.title ?? "service"}-${index}`}
              className="w-full border-t border-gray-500 px-4 py-10 sm:px-6 sm:py-12 transition-all duration-300 hover:bg-slate-50 group grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)_auto] lg:items-center"
            >
              {content}
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default Services;
