"use client";

import { FC, useRef } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Section from "@/components/Section";
import { motion } from "framer-motion";

/**
 * Props for `About`.
 */
export type AboutProps = SliceComponentProps<Content.AboutSlice>;

/**
 * Component for "About" Slices.
 */
const About: FC<AboutProps> = ({ slice }) => {
  const scrollRef = useRef(null);

  return (
    <Section
      ref={scrollRef}
      hasBlub={false}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className=" text-white h-screen py-20 "
    >
      {isFilled.linkToMedia(slice.primary.background_video) && (
        <div
          className="pointer-events-auto
       flex justify-center items-center"
        >
          <div className="w-[1200px] overflow-hidden rounded-lg backdrop-blur isolate">
            <motion.video
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 10 }}
              viewport={{ root: scrollRef }}
              autoPlay
              playsInline
              muted
              loop
              className="object-cover position-bottom"
            >
              <source
                src={slice.primary.background_video.url}
                type="video/mp4"
              />
            </motion.video>
            <motion.div   initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 10 }}
              viewport={{ root: scrollRef }} className="bg-linear-30 bg-black/50 absolute left-0 top-0 w-full h-full z-50  flex items-center justify-center flex-col">
              <span className="text-lg min-w-4 flex items-center justify-center overflow-hidden px-6 py-1 border rounded-full">
                <PrismicRichText field={slice.primary.title} />
              </span>
              <div className="text-justify max-w-2xl text-4xl shrink-0 mt-3">
                <PrismicRichText field={slice.primary.subtitle} />
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </Section>
  );
};

export default About;
