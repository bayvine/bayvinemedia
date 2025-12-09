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

function InfiniteScrollComponent({ items }) {
  const scrollVariants = {
    animate: {
      x: ["0%", "-100%"], // Adjust based on content width
      transition: {
        repeat: Infinity,
        ease: "linear",
        duration: 20, // Adjust duration as needed
      },
    },
  };
  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex flex-nowrap"
        animate={{
			x: ["0%", "-100%"],
			transition: {
				repeat: Infinity,
				ease: "linear",
				duration: 20,
			},	
		}}
		
      >
        {/* Render your items */}
        {items.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
        {/* Duplicate items for seamless loop */}
        {items.map((item, index) => (
          <div key={`duplicate-${index}`}>{item}</div>
        ))}
      </motion.div>
    </div>
  );
}

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
        hasBlub
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="min-h-screen 2xl:min-h-[1000px] flex items-center rounded-b-4xl py-12"
      >
        <div className="">
          <div className="flex flex-col items-center justify-center text-center">
            <div
              className="font-black text-8xl 
						 leading-12 lg:leading-23 uppercase"
            >
              <PrismicRichText field={slice.primary.title}></PrismicRichText>
              <GlitchText words={array} />{" "}
            </div>

            <p className="lg:text-lg text-center lg:w-[650px] my-4">
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
