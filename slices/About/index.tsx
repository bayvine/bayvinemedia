"use client"

import { FC } from "react"
import { Content, isFilled } from "@prismicio/client"
import { PrismicRichText, SliceComponentProps } from "@prismicio/react"
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
			className="relative w-full"
		>
			
			{isFilled.linkToMedia(slice.primary.background_video) && (
				<div className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden">
					<div className="absolute inset-0">
						<motion.video
							autoPlay
							playsInline
							muted
							loop
							className="h-full w-full object-cover"
						>
							<source
								src={slice.primary.background_video.url}
								type="video/mp4"
							/>
						</motion.video>
					</div>
					<div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black/80" />
					<motion.div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 py-16 text-center">
						<span className="inline-flex text-lg items-center justify-center rounded-full px-6 py-2 border">
							<PrismicRichText field={slice.primary.title} />
						</span>
						
						<div className="mt-6 max-w-4xl text-3xl  uppercase sm:text-4xl md:text-5xl">
							<PrismicRichText field={slice.primary.subtitle} />
						</div>
					</motion.div>
				</div>
			)}
		</section>
	)
}

export default About
