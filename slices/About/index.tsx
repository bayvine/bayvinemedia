"use client"

import { FC, Fragment } from "react"
import { asText, Content, isFilled } from "@prismicio/client"
import { PrismicRichText, SliceComponentProps } from "@prismicio/react"
import { motion } from "framer-motion"
import Image from "next/image"
import Eyebrow from "@/components/Eyebrow"
import { VIDEO_PLACEHOLDER_SRC } from "@/utils/mediaPlaceholders"
import Section from "@/components/Section"

/**
 * Props for `About`.
 */
export type AboutProps = SliceComponentProps<Content.AboutSlice>

const PHOTO_PLACEHOLDER_TOKEN = "[PHOTO]"
const FOUNDER_LABEL = "Brainilio Rodrigues, Founder"

/**
 * Component for "About" Slices.
 */
const About: FC<AboutProps> = ({ slice }) => {
	const eyebrowText = asText(slice.primary.title)
	const firstPhoto = slice.primary.photos[0]?.city
	const founderPhoto = isFilled.linkToMedia(firstPhoto) ? firstPhoto : null
	const founderPhotoUrl = founderPhoto?.url ?? null
	const founderPhotoAlt = founderPhoto?.name || "Founder portrait"

	return (
		<Section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
			className="relative w-full rounded-lg"
			id="about"
		>
			<div className="rounded-lg relative flex min-h-[50svh] lg:min-h-[60svh] w-full items-center justify-center overflow-hidden">
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
						className="pointer-events-none h-full w-full object-cover"
					>
						<source src={'images/about-us.mp4'} type="video/mp4" />
					</motion.video>
				</div>
				<div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/60 to-black/90" />
				<motion.div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center px-6 py-16">
					{eyebrowText ? <Eyebrow>{eyebrowText}</Eyebrow> : null}

					<div className="mt-6 max-w-4xl text-2xl sm:text-4xl md:text-3xl">
						<PrismicRichText
							field={slice.primary.subtitle}
							components={{
								paragraph: ({ node, children, key }) => {
									const text = node.text || ""

									if (!text.includes(PHOTO_PLACEHOLDER_TOKEN)) {
										return <p key={key}>{children}</p>
									}

									const parts = text.split(PHOTO_PLACEHOLDER_TOKEN)

									if (!founderPhotoUrl) {
										return <p key={key}>{parts.join("")}</p>
									}

									return (
										<p key={key} className="whitespace-pre-wrap">
											{parts.map((part, index) => {
												const isLastPart = index === parts.length - 1

												return (
													<Fragment key={`${key}-photo-part-${index}`}>
														{part}
														{isLastPart ? null : (
															<span className="mx-auto mt-10 block w-fit text-center align-middle">
																<span className="relative mx-auto block h-28 w-28 overflow-hidden rounded-full shadow-lg">
																	<Image
																		src={founderPhotoUrl}
																		alt={founderPhotoAlt}
																		fill
																		
																		unoptimized
																		sizes="500px"
																		className="object-cover object-center grayscale-25 scale-150"
																	/>
																</span>
																<span className="mt-2 block text-sm opacity-90 italic font-medium">
																	{FOUNDER_LABEL}
																</span>
															</span>
														)}
													</Fragment>
												)
											})}
										</p>
									)
								},
							}}
						/>
					</div>
				</motion.div>
			</div>
		</Section>
	)
}

export default About
