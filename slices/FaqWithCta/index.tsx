"use client";

import { FC, useState } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Section from "@/components/Section";
import clsx from "clsx";
import { RxArrowTopRight, RxChevronDown } from "react-icons/rx";
import Link from "next/link";
import { Icon } from "@/components/icons/Icon";
import CTAButton from "@/components/CTAButton";
import SectionTitle from "@/components/SectionTitle";
import CardText from "@/components/CardText";
import { VIDEO_PLACEHOLDER_SRC } from "@/utils/mediaPlaceholders";

/**
 * Props for `FaqWithCta`.
 */
export type FaqWithCtaProps = SliceComponentProps<Content.FaqWithCtaSlice>;

type FaqItemProps = {
  item: Content.FaqWithCtaSliceDefaultPrimaryFaqsItem;
  isOpen: boolean;
  onToggle: () => void;
};

const FaqItem: FC<FaqItemProps> = ({ item, isOpen, onToggle }) => {
  return (
    <article className="py-5 sm:py-6 border-t border-slate-50">
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 text-left cursor-pointer"
      >

        <CardText title={item.question} />
      
        <span
          className={clsx(
            "grid h-9 w-9 place-items-center cursor-pointer text-white transition-all duration-300",
            isOpen && "rotate-180 ",
          )}
        >
          <RxChevronDown size={22} />
        </span>
      </button>

      <div
        className={clsx(
          "grid transition-all duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden mt-2">
          <CardText description={item.answer} />
         
        </div>
      </div>
    </article>
  );
};

type CtaCardProps = {
  primary: Content.FaqWithCtaSliceDefaultPrimary;
};

const CtaCard: FC<CtaCardProps> = ({ primary }) => {
  const hasMedia = isFilled.linkToMedia(primary.cta_media);
  const mediaUrl = hasMedia ? primary.cta_media.url : null;
  const hasCtaLink = isFilled.link(primary.cta_button);
  const ctaHref = hasCtaLink ? (primary.cta_button.url ?? "#") : null;
  const isContactLink =
    typeof ctaHref === "string" && /\/contact(\/|$|\?|#)/.test(ctaHref);
  const ctaLabel = primary.cta_button?.text || "Schedule free intro chat";

  return (
    <aside className="relative isolate overflow-hidden bg-slate-900/60 shrink-0 h-[600px] min-h-[600px]">
      {mediaUrl ? (
        <video
          src={mediaUrl}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          poster={VIDEO_PLACEHOLDER_SRC}
          className="pointer-events-none absolute rounded-lg inset-0 h-full w-full object-cover"
        />
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${VIDEO_PLACEHOLDER_SRC})` }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/90" />

      <div className="relative flex h-full flex-col justify-between gap-6 p-8">
        <div className="flex items-center gap-1 text-sm font-semibold text-white/80">
          <span className="flex h-11 w-11 items-center justify-center ">
            <Icon
              name="logo"
              size="32"
              aria-label="Bayvine Digital Agency logo"
            />
          </span>
          <span className="text-base font-bold">Bayvine Digital Agency</span>
        </div>

        <div className="space-y-3">

          <SectionTitle noUpperCase title={primary.cta_title}  description={primary.cta_description}/>
        
          {hasCtaLink ? (
            <Link
              href={ctaHref}
              target={isContactLink ? undefined : "_blank"}
              rel={isContactLink ? undefined : "noreferrer"}
              className="mt-4 w-fit inline-flex items-center"
            >
              <CTAButton className="w-full inline-flex gap-2 whitespace-nowrap">
                {ctaLabel} <RxArrowTopRight />
              </CTAButton>
            </Link>
          ) : null}
        </div>
      </div>
    </aside>
  );
};

/**
 * Component for "FaqWithCta" Slices.
 */
const FaqWithCta: FC<FaqWithCtaProps> = ({ slice }) => {
  const faqs = slice.primary.faqs || [];
  const [openIndex, setOpenIndex] = useState<number | null>(
    faqs.length ? 0 : null,
  );

  return (
    <Section
      id="faq"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-16 lg:py-24"
    >
      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.95fr] xl:gap-16 h-full">
        <div className="space-y-8">
          <SectionTitle
            title={slice.primary.section_title as string}
            description={slice.primary.section_subtitle}
          />

          <div className="">
            {faqs.length ? (
              faqs.map((item, index) => (
                <FaqItem
                  key={`${item.question || "faq"}-${index}`}
                  item={item}
                  isOpen={openIndex === index}
                  onToggle={() =>
                    setOpenIndex((current) =>
                      current === index ? null : index,
                    )
                  }
                />
              ))
            ) : (
              <p className="py-6 text-sm text-slate-300">
                No FAQs have been added yet.
              </p>
            )}
          </div>
        </div>

        <CtaCard primary={slice.primary} />
      </div>
    </Section>
  );
};

export default FaqWithCta;
