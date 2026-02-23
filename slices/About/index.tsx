"use client"

import { FC, Fragment } from "react"
import { asText, Content, isFilled } from "@prismicio/client"
import { SliceComponentProps } from "@prismicio/react"
import { motion, useReducedMotion } from "framer-motion"
import { IconType } from "react-icons"
import {
	FaBolt,
	FaBullhorn,
	FaCode,
	FaCompass,
	FaPenNib,
	FaRocket,
	FaWandMagicSparkles,
} from "react-icons/fa6"
import Eyebrow from "@/components/Eyebrow"
import { VIDEO_PLACEHOLDER_SRC } from "@/utils/mediaPlaceholders"
import Section from "@/components/Section"

/**
 * Props for `About`.
 */
export type AboutProps = SliceComponentProps<Content.AboutSlice>

const PHOTO_PLACEHOLDER_TOKEN = "[PHOTO]"
const ABOUT_VIDEO_FALLBACK = "/images/about-us.mp4"

type KeywordIconConfig = {
	icon: IconType
	className: string
}

const KEYWORD_ICON_MAP: Record<string, KeywordIconConfig> = {
	strategy: { icon: FaCompass, className: "text-cyan-200" },
	strategic: { icon: FaCompass, className: "text-cyan-200" },
	design: { icon: FaPenNib, className: "text-pink-200" },
	branding: { icon: FaPenNib, className: "text-pink-200" },
	brand: { icon: FaPenNib, className: "text-pink-200" },
	creative: { icon: FaWandMagicSparkles, className: "text-amber-200" },
	creativity: { icon: FaWandMagicSparkles, className: "text-amber-200" },
	digital: { icon: FaBolt, className: "text-yellow-200" },
	growth: { icon: FaRocket, className: "text-violet-200" },
	scale: { icon: FaRocket, className: "text-violet-200" },
	scaling: { icon: FaRocket, className: "text-violet-200" },
	launch: { icon: FaRocket, className: "text-violet-200" },
	web: { icon: FaCode, className: "text-emerald-200" },
	website: { icon: FaCode, className: "text-emerald-200" },
	product: { icon: FaCode, className: "text-emerald-200" },
	content: { icon: FaBullhorn, className: "text-orange-200" },
	marketing: { icon: FaBullhorn, className: "text-orange-200" },
}

const normalizeWord = (word: string) =>
	word.toLowerCase().replace(/^[^a-z0-9]+|[^a-z0-9]+$/g, "")

const resolveKeywordIcon = (word: string) => {
	const normalizedWord = normalizeWord(word)

	if (!normalizedWord) return null
	if (KEYWORD_ICON_MAP[normalizedWord]) return KEYWORD_ICON_MAP[normalizedWord]

	if (normalizedWord.endsWith("s")) {
		return KEYWORD_ICON_MAP[normalizedWord.slice(0, -1)] ?? null
	}

	return null
}

/**
 * Component for "About" Slices.
 */
const About: FC<AboutProps> = ({ slice }) => {
	const eyebrowText = asText(slice.primary.title)
	const shouldReduceMotion = useReducedMotion()
	const aboutCopy =
		asText(slice.primary.subtitle).replaceAll(PHOTO_PLACEHOLDER_TOKEN, "").trim() ||
		"Creative digital work built to drive meaningful growth."
	const words = aboutCopy
		.split(/\s+/)
		.map((word) => word.trim())
		.filter(Boolean)
	const backgroundVideoUrl = isFilled.linkToMedia(slice.primary.background_video)
		? slice.primary.background_video.url
		: ABOUT_VIDEO_FALLBACK

	return (
		<Section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
			className="relative w-full rounded-lg"
			id="about"
		>
			<div className="relative flex min-h-[56svh] w-full items-center justify-center overflow-hidden rounded-lg px-6 py-20 lg:min-h-[68svh] sm:px-10">
				<div className="absolute inset-0">
					<video
						autoPlay
						playsInline
						muted
						loop
						preload="metadata"
						aria-hidden="true"
						tabIndex={-1}
						poster={VIDEO_PLACEHOLDER_SRC}
						className="pointer-events-none h-full w-full object-cover"
						src={backgroundVideoUrl ?? ABOUT_VIDEO_FALLBACK}
					>
						<source src={backgroundVideoUrl ?? ABOUT_VIDEO_FALLBACK} type="video/mp4" />
					</video>
				</div>
				<div className="absolute inset-0 bg-linear-to-b from-black/35 via-black/68 to-black/92" />
				<motion.div
					initial={shouldReduceMotion ? undefined : { opacity: 0, y: 14 }}
					whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
					transition={{ duration: 0.7, ease: "easeOut" }}
					viewport={{ once: true, amount: 0.2 }}
					className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-2 py-8 text-center"
				>
					{eyebrowText ? <Eyebrow>{eyebrowText}</Eyebrow> : null}

					<p className="mt-8 max-w-5xl text-4xl font-black leading-[1.02] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl xl:text-7xl">
						{words.map((word, index) => {
							const iconConfig = resolveKeywordIcon(word)
							const Icon = iconConfig?.icon
							const hasIcon = Boolean(Icon)

							return (
								<Fragment key={`about-word-${index}`}>
									<span>{word}</span>
									{hasIcon ? (
										<motion.span
											aria-hidden="true"
											className={`mx-[0.22em] inline-flex translate-y-[-0.05em] items-center justify-center rounded-full border border-white/45 bg-black/45 p-[0.2em] text-[0.52em] shadow-[0_0_24px_rgba(255,255,255,0.16)] ${iconConfig?.className || ""}`}
											animate={
												shouldReduceMotion
													? undefined
													: {
															y: [0, -3, 0],
															rotate: [0, -4, 3, 0],
															scale: [1, 1.05, 1],
														}
											}
											transition={
												shouldReduceMotion
													? undefined
													: {
															duration: 3.4,
															delay: (index % 6) * 0.18,
															ease: "easeInOut",
															repeat: Infinity,
														}
											}
										>
											{Icon ? <Icon /> : null}
										</motion.span>
									) : null}
									{index < words.length - 1 ? " " : null}
								</Fragment>
							)
						})}
					</p>
				</motion.div>
			</div>
		</Section>
	)
}

export default About
