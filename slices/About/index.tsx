"use client"

import { FC, useRef } from "react"
import { Content, isFilled } from "@prismicio/client"
import { PrismicRichText, SliceComponentProps } from "@prismicio/react"
import Section from "@/components/Section"
import { motion } from "framer-motion"

/**
 * Props for `About`.
 */
export type AboutProps = SliceComponentProps<Content.AboutSlice>

/**
 * Component for "About" Slices.
 */
const About: FC<AboutProps> = ({ slice }) => {
	return (
		<section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
			className="py-12"
		>
			{isFilled.linkToMedia(slice.primary.background_video) && (
				<div
					className="pointer-events-auto
       flex justify-center items-center"
				>
					<div className="w-full overflow-hidden backdrop-blur isolate">
						<motion.video
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
						<motion.div className="bg-linear-30 bg-black/75 absolute left-0 top-0 w-full h-full z-50  flex items-center justify-center flex-col">
							<span className="text-lg min-w-4 flex items-center justify-center overflow-hidden px-6 py-1 border rounded-full">
								<PrismicRichText field={slice.primary.title} />
							</span>
							<div className="text-center max-w-2xl text-4xl shrink-0 mt-5 uppercase">
								<PrismicRichText field={slice.primary.subtitle} />
							</div>
						</motion.div>
					</div>
				</div>
			)}
		</section>
	)
}

export default About
