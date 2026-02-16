"use client"

import { FC } from "react"
import { asText, Content, isFilled } from "@prismicio/client"
import { PrismicRichText, SliceComponentProps } from "@prismicio/react"
import { motion } from "framer-motion"
import Eyebrow from "@/components/Eyebrow"
import { VIDEO_PLACEHOLDER_SRC } from "@/utils/mediaPlaceholders"

/**
 * Props for `About`.
 */
export type AboutProps = SliceComponentProps<Content.AboutSlice>

/**
 * Component for "About" Slices.
 */
const About: FC<AboutProps> = ({ slice }) => {
	const eyebrowText = asText(slice.primary.title)

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
							preload="metadata"
							aria-hidden="true"
							tabIndex={-1}
							poster={VIDEO_PLACEHOLDER_SRC}
							className="pointer-events-none h-full w-full bg-center bg-cover object-cover"
							style={{ backgroundImage: `url(${VIDEO_PLACEHOLDER_SRC})` }}
						>
							<source
								src={slice.primary.background_video.url}
								type="video/mp4"
							/>
						</motion.video>
					</div>
					<div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black/80" />
					<motion.div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 py-16 text-center">
						{eyebrowText ? (
							<Eyebrow>{eyebrowText}</Eyebrow>
						) : null}
						
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
