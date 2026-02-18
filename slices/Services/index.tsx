"use client";

import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Image from "next/image";
import Section from "@/components/Section";
import { RxArrowTopRight } from "react-icons/rx";
import SectionTitle from "@/components/SectionTitle";
import {
  PHOTO_PLACEHOLDER_SRC,
  VIDEO_PLACEHOLDER_SRC,
} from "@/utils/mediaPlaceholders";

/**
 * Props for `Services`.
 */
export type ServicesProps = SliceComponentProps<Content.ServicesSlice>;
type ServiceItem = Content.ServicesSliceDefaultPrimaryServicesItem;

const VIDEO_FILE_PATTERN = /\.(mp4|webm|ogg|m4v|mov)(\?|#|$)/i;
const IMAGE_FILE_PATTERN =
  /\.(png|jpe?g|gif|webp|avif|bmp|svg|ico)(\?|#|$)/i;

const getServiceMediaType = (service: ServiceItem) => {
  if (!isFilled.linkToMedia(service.hover_image) || !service.hover_image.url) {
    return { isVideo: false, isImage: false, mediaUrl: undefined };
  }

  const kind = service.hover_image.kind?.toLowerCase() ?? "";
  const mediaUrl = service.hover_image.url;
  const isVideo = kind.startsWith("video/") || VIDEO_FILE_PATTERN.test(mediaUrl);
  const isImage = kind.startsWith("image/") || IMAGE_FILE_PATTERN.test(mediaUrl);

  return { isVideo, isImage, mediaUrl };
};

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
      id="services"
    >
      <SectionTitle
        title={slice.primary.title || ""}
        description={slice.primary.description}
      />

      <div className="mt-8 grid gap-5 md:hidden">
        {services.map((service, index) => {
          const isLinked = isFilled.link(service.link);
          const { isVideo, isImage, mediaUrl } = getServiceMediaType(service);

          const content = (
            <>
              {isVideo ? (
                <video
                  src={mediaUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  poster={VIDEO_PLACEHOLDER_SRC}
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
              ) : isImage ? (
                <Image
                  src={mediaUrl ?? PHOTO_PLACEHOLDER_SRC}
                  alt={service.hover_image.name ?? service.title ?? "Service"}
                  fill
                  unoptimized
                  sizes="100vw"
                  className="object-cover object-center"
                />
              ) : (
                <div
                  className="absolute inset-0 bg-center bg-cover"
                  style={{ backgroundImage: `url(${PHOTO_PLACEHOLDER_SRC})` }}
                />
              )}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/45 to-black/90"
              />
              <div className="absolute inset-0 z-10 flex flex-col justify-end gap-3 p-6">
                <h3 className="z-50 text-4xl sm:text-5xl font-semibold mb-0">
                  {service.title || "Service"}
                </h3>
                <div className="max-w-sm z-50 text-slate-100/90">
                  <PrismicRichText
                    field={service.service_description}
                    components={{
                      paragraph: ({ children }) => <p>{children}</p>,
                    }}
                  />
                </div>
                {isLinked ? (
                  <span className="z-50 inline-flex w-fit items-center gap-1 rounded-full border border-white/55 bg-black/25 px-3 py-1 text-xs font-semibold uppercase text-white backdrop-blur-[1px]">
                    View service
                    <RxArrowTopRight size={14} />
                  </span>
                ) : null}
              </div>
            </>
          );

          return isLinked ? (
            <PrismicNextLink
              key={`${service.title ?? "service"}-${index}`}
              href={`/services/${service.link.uid}`}
              className="group relative isolate block min-h-[340px] overflow-hidden rounded-lg bg-slate-900/60 shadow-lg ring-1 ring-white/30 transition-transform active:scale-[0.99]"
            >
              {content}
            </PrismicNextLink>
          ) : (
            <div
              key={`${service.title ?? "service"}-${index}`}
              className="group relative isolate min-h-[340px] overflow-hidden rounded-lg bg-slate-900/60 shadow-lg ring-1 ring-white/15"
            >
              {content}
            </div>
          );
        })}
      </div>

      <div className="mt-8 hidden md:block">
        {services.map((service, index) => {
          const isLinked = isFilled.link(service.link);
          const content = (
            <>
              <h3 className="z-50 text-4xl sm:text-5xl font-semibold mb-0 flex items-center group-hover:text-black group-active:text-black md:pr-6">
                <span className="mr-4 text-sm text-slate-50 group-hover:text-black group-active:text-black font-extralight w-0.5 h-0.5 flex items-center justify-center border rounded-full p-3">
                  {index + 1}
                </span>
                {service.title || "Service"}
              </h3>
              <div className="max-w-sm z-50 text-slate-100/90 group-hover:text-black group-active:text-black">
                <PrismicRichText
                  field={service.service_description}
                  components={{
                    paragraph: ({ children }) => <p>{children}</p>,
                  }}
                />
              </div>
              <RxArrowTopRight
                size={30}
                className="relative hidden z-50 group-hover:text-black lg:block mr-0 md:mr-8 self-end lg:self-auto justify-self-end group-hover:translate-x-0.5 group-hover:-translate-y-1 transition-all duration-300 group-active:text-black"
              />
            </>
          );

          return isLinked ? (
            <PrismicNextLink
              key={`${service.title ?? "service"}-${index}`}
              href={`/services/${service.link.uid}`}
              className="w-full border-t border-gray-500 px-4 py-10 sm:px-6 sm:py-12 transition-all duration-300 active:bg-slate-50 hover:bg-slate-50 group cursor-pointer grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)_auto] lg:items-center"
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
