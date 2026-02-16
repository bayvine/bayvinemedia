"use client";

import { FC } from "react";
import { Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import Section from "@/components/Section";
import CTAButton from "@/components/CTAButton";
import { GlitchText } from "@/components/GlichText";
import { RxArrowTopRight } from "react-icons/rx";
import { motion } from "framer-motion";


/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  const array = slice.primary.title_action.map((text) => text.action as string);

  return (

      <Section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="flex items-center rounded-b-4xl pb-20 pt-40 sm:pt-36 lg:pt-52"
      >
        <div className="">
          <div className="flex flex-col items-center justify-center text-center">
            <div
              className="font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight sm:leading-[1.05] lg:leading-[1.1] tracking-normal sm:tracking-tight lg:tracking-[-0.04em] uppercase"
            >
              <PrismicRichText field={slice.primary.title}></PrismicRichText>
              <span className="inline-block">
                <GlitchText words={array} />
              </span>{" "}
            </div>

            <p className="text-sm sm:text-base lg:text-lg text-center max-w-[650px] my-4">
              <PrismicText field={slice.primary.subtitle} />
            </p>
          </div>

          <div className="flex items-center gap-4 justify-center my-2">
            <CTAButton>
              <span className="flex gap-1 items-center">
                {slice.primary.call_to_action_label}{" "}
                <RxArrowTopRight strokeWidth={0.5} />
              </span>
            </CTAButton>
          </div>

          {/* <InfiniteScrollComponent
            items={["hi", "hqwe", "qweklqwj", "askdljq"]}
          /> */}
        </div>
      </Section>

  );
};

export default Hero;
