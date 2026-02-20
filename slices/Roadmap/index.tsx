"use client"

import React, { FC, useEffect, useRef, useState } from "react"
import {
	type MotionValue,
	motion,
	useMotionValue,
	useScroll,
	useTransform,
} from "framer-motion"
import { Content, isFilled } from "@prismicio/client"
import { PrismicNextLink } from "@prismicio/next"
import Image from "next/image"
import Link from "next/link"
import Section from "@/components/Section"
import SectionTitle from "@/components/SectionTitle"
import CardText from "@/components/CardText"
import CTAButton from "@/components/CTAButton"
import {
	PHOTO_PLACEHOLDER_SRC,
	VIDEO_PLACEHOLDER_SRC,
} from "@/utils/mediaPlaceholders"
import ProjectHero from "../ProjectHero"
import { RxArrowTopRight } from "react-icons/rx"

type RoadmapItem = Content.RoadmapSliceDefaultPrimaryRoadmapItem

type Props = {
	items: RoadmapItem[]
	navbarHeight?: number // px
}

const clamp = (v: number) => Math.max(0, Math.min(1, v))

const lerp = (a: number, b: number, t: number) => a + (b - a) * t

const VIDEO_FILE_PATTERN = /\.(mp4|webm|ogg|m4v|mov)(\?|#|$)/i
const IMAGE_FILE_PATTERN = /\.(png|jpe?g|gif|webp|avif|bmp|svg|ico)(\?|#|$)/i
const SHORT_MOBILE_VIEWPORT_MEDIA_QUERY = "(max-width: 767px) and (max-height: 560px)"
const SHORT_DESKTOP_VIEWPORT_MEDIA_QUERY = "(min-width: 768px) and (max-height: 820px)"
const MOBILE_STACK_FADE_START = 0.82
const MOBILE_STACK_MIN_OPACITY = 0.88
const MOBILE_STACK_OPACITY_STEP = 0.03

const useMediaQuery = (query: string) => {
	const [matches, setMatches] = useState(false)

	useEffect(() => {
		if (typeof window === "undefined") return

		const mediaQueryList = window.matchMedia(query)
		const updateMatch = () => setMatches(mediaQueryList.matches)

		updateMatch()

		if (typeof mediaQueryList.addEventListener === "function") {
			mediaQueryList.addEventListener("change", updateMatch)

			return () => mediaQueryList.removeEventListener("change", updateMatch)
		}

		mediaQueryList.addListener(updateMatch)

		return () => mediaQueryList.removeListener(updateMatch)
	}, [query])

	return matches
}

const getRoadmapMediaType = (item: RoadmapItem) => {
	if (!isFilled.linkToMedia(item.media) || !item.media.url) {
		return { hasMedia: false, isVideo: false, isImage: false }
	}

	const kind = item.media.kind?.toLowerCase() ?? ""
	const url = item.media.url
	const isVideo = kind.startsWith("video/") || VIDEO_FILE_PATTERN.test(url)
	const isImage = kind.startsWith("image/") || IMAGE_FILE_PATTERN.test(url)

	return { hasMedia: true, isVideo, isImage }
}

const getMediaType = (url?: string | null, kind?: string | null) => {
	const cleanUrl = url ?? ""
	const cleanKind = kind?.toLowerCase() ?? ""
	const isVideo =
		cleanKind.startsWith("video/") || VIDEO_FILE_PATTERN.test(cleanUrl)
	const isImage =
		cleanKind.startsWith("image/") || IMAGE_FILE_PATTERN.test(cleanUrl)

	return { isVideo, isImage }
}

const RoadMapCard: FC<{
	item: RoadmapItem
	t: MotionValue<number> // 0..1 collapse progress for this card
}> = ({ item, t }) => {
	// Heights
	const cardH = useTransform(t, (v) => `${lerp(380, 135, clamp(v))}px`) // overall card height
	const mediaH = useTransform(t, (v) => `${lerp(300, 100, clamp(v))}px`) // video height (your ask)
	const mediaUrl = isFilled.linkToMedia(item.media) ? item.media.url : undefined
	const { hasMedia, isVideo, isImage } = getRoadmapMediaType(item)

	// “Snap” description (not progressive): stays visible until ~70%, then disappears.
	const descOpacity = useTransform(t, [0, 0.68, 0.69, 1], [1, 1, 0, 0])
	const descScaleY = useTransform(t, [0, 0.68, 0.69, 1], [1, 1, 0, 0])

	return (
		<motion.article
			// IMPORTANT: remove overflow-hidden here (it can cause weird clipping in sticky stacks)
			className="border-t border-white py-6 md:py-8"
			style={{ height: cardH }}
		>
			<div className="flex h-full flex-col gap-4 lg:flex-row md:items-start lg:gap-6">
				<div className="min-w-0 flex-1">
					<CardText title={item.title} />

					<motion.div
						className="origin-top overflow-hidden text-lg font-semibold"
						style={{ opacity: descOpacity, scaleY: descScaleY }}
					>
						<CardText description={item.description} />
					</motion.div>
				</div>

				{hasMedia ? (
					<motion.div
						className="relative mt-4 w-full overflow-hidden rounded-lg bg-slate-900/40 shadow-lg md:mt-0 md:w-[360px] lg:w-[520px] xl:w-[620px]"
						style={{ height: mediaH }}
					>
						{isVideo ? (
							<video
								src={mediaUrl}
								autoPlay
								loop
								muted
								playsInline
								preload="metadata"
								poster={VIDEO_PLACEHOLDER_SRC}
								className="h-full w-full object-cover object-center"
							/>
						) : isImage ? (
							<Image
								src={mediaUrl ?? PHOTO_PLACEHOLDER_SRC}
								alt={item.media.name ?? ""}
								fill
								unoptimized
								sizes="(max-width: 768px) 100vw, (max-width: 1280px) 520px, 620px"
								className="object-cover object-center"
							/>
						) : (
							<div
								className="h-full w-full bg-center bg-cover"
								style={{ backgroundImage: `url(${PHOTO_PLACEHOLDER_SRC})` }}
							/>
						)}
					</motion.div>
				) : null}
			</div>
		</motion.article>
	)
}

const StickyRoadMapCard: FC<{
	item: RoadmapItem
	index: number
	total: number
	progress: MotionValue<number>
}> = ({ item, index, total, progress }) => {
	const start = index / total
	const end = (index + 1) / total

	const t = useTransform(progress, (p) => {
		if (p <= start) return 0
		if (p >= end) return 1
		return (p - start) / (end - start)
	})

	return <RoadMapCard item={item} t={t} />
}

const RoadmapCardStatic: FC<{ item: RoadmapItem }> = ({ item }) => {
	const mediaUrl = isFilled.linkToMedia(item.media) ? item.media.url : undefined
	const { isVideo, isImage } = getRoadmapMediaType(item)

	return (
		<article className="h-full">
			<div className="relative isolate h-full min-h-[340px] w-full overflow-hidden rounded-lg bg-slate-900/60 shadow-lg ring-1 ring-white/15">
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
						alt={item.media.name ?? ""}
						fill
						unoptimized
						sizes="100vw"
						className="object-cover object-center"
					/>
				) : (
					<div
						className="h-full w-full bg-center bg-cover"
						style={{ backgroundImage: `url(${PHOTO_PLACEHOLDER_SRC})` }}
					/>
				)}
				<div
					aria-hidden
					className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/45 to-black/90"
				/>
				<div className="absolute inset-0 z-10 flex items-end p-6">
					<div className="min-w-0">
						<CardText title={item.title} />

						<CardText description={item.description} />
					</div>
				</div>
			</div>
		</article>
	)
}

const CTA_TITLE = "Ready to move forward with clarity?"
const CTA_DESCRIPTION = "Whether you’re starting from scratch or refining what you already have, the first step is a simple conversation. We’ll learn about your business, your goals, and where you want to grow, and determine the right path forward together."
const CTA_LABEL = "Schedule a call"

const RoadmapMobileCtaCard: FC<{
	primary: Content.RoadmapSliceDefaultPrimary
}> = ({ primary }) => {
	const hasCtaLink = isFilled.link(primary.cta_link)
	const hasCtaTitle = isFilled.richText(primary.cta_title)
	const hasBackgroundMedia = isFilled.linkToMedia(primary.background_cta)
	const backgroundUrl = hasBackgroundMedia
		? primary.background_cta.url
		: "/images/cta-background.webp"
	const { isVideo, isImage } = getMediaType(
		backgroundUrl,
		primary.background_cta?.kind,
	)
	const isContactHref = (href?: string | null) =>
		typeof href === "string" && /\/contact(\/|$|\?|#)/.test(href)
	const ctaTitle = hasCtaTitle
		? primary.cta_title
		: "Ready to start your roadmap?"
	const ctaLabel = primary.cta_label || primary.cta_link.text || "Schedule free call"

	return (
		<article className="h-full">
			<div className="relative isolate h-full min-h-[340px] w-full overflow-hidden rounded-lg bg-slate-900/60 shadow-lg ">
			{isVideo ? (
				<video
					src={backgroundUrl}
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
					src={backgroundUrl ?? PHOTO_PLACEHOLDER_SRC}
					alt={primary.background_cta?.name ?? ""}
					fill
					unoptimized
					sizes="100vw"
					className="object-cover object-top"
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

			<div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-15 px-3">
					<SectionTitle noUpperCase title={CTA_TITLE} titleClassName="text-center"/>
					<p className="text-lg font-semibold text-center ">
						{CTA_DESCRIPTION}
				</p>	
				
				{hasCtaLink ? (
					<PrismicNextLink
						field={primary.cta_link}
						{...(isContactHref(primary.cta_link.url)
							? { target: "_self" }
							: {})}
						className="mt-4 inline-flex w-fit"
					>
						<CTAButton as="span">
							{CTA_LABEL}
						</CTAButton>
					</PrismicNextLink>
				) : (
					<Link href="/contact" className="mt-4 inline-flex w-fit">
						<CTAButton as="span">{CTA_LABEL} <RxArrowTopRight size={20} /></CTAButton>
					</Link>
					)}
				</div>
			</div>
		</article>
	)
}

const RoadmapDesktopCtaCard: FC<{
	primary: Content.RoadmapSliceDefaultPrimary
}> = ({ primary }) => {
	const hasCtaLink = isFilled.link(primary.cta_link)
	const hasCtaTitle = isFilled.richText(primary.cta_title)
	const hasBackgroundMedia = isFilled.linkToMedia(primary.background_cta)
	const backgroundUrl = hasBackgroundMedia
		? primary.background_cta.url
		: "/images/cta-background.webp"
	const { isVideo, isImage } = getMediaType(
		backgroundUrl,
		primary.background_cta?.kind,
	)
	const isContactHref = (href?: string | null) =>
		typeof href === "string" && /\/contact(\/|$|\?|#)/.test(href)
	const ctaTitle = hasCtaTitle
		? primary.cta_title
		: "Ready to start your roadmap?"
	const ctaLabel = primary.cta_label || primary.cta_link.text || "Schedule free call"

	return (
		<div className="relative isolate w-full overflow-hidden rounded-lg p-8 pt-10 lg:px-15 lg:pb-15 lg:pt-20">
			{isVideo ? (
				<video
					src={backgroundUrl}
					autoPlay
					loop
					muted
					playsInline
					preload="metadata"
					poster={VIDEO_PLACEHOLDER_SRC}
					className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
				/>
			) : isImage ? (
				<Image
					src={backgroundUrl ?? PHOTO_PLACEHOLDER_SRC}
					alt={primary.background_cta?.name ?? ""}
					fill
					unoptimized
					sizes="90vw"
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
				className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/30 via-black/55 to-black/90"
			/>

			<div className="relative z-10 max-w-full flex items-center flex-col text-center justify-center">
				<SectionTitle noUpperCase title={CTA_TITLE} titleClassName="text-center"/>
				<p className="text-xl text-center max-w-2xl font-semibold mt-1 ">
					{CTA_DESCRIPTION}

				</p>				{hasCtaLink ? (
					<PrismicNextLink
						field={primary.cta_link}
						{...(isContactHref(primary.cta_link.url)
							? { target: "_self" }
							: {})}
						className="mt-4 inline-flex w-fit"
					>
						<CTAButton as="span">{CTA_LABEL}   <RxArrowTopRight size={20} /></CTAButton>
						
					</PrismicNextLink>
				) : (
					<Link href="/contact" className="mt-4 inline-flex w-fit">
						<CTAButton as="span">{CTA_LABEL } <RxArrowTopRight size={20} /></CTAButton>
					</Link>
				)}
			</div>
		</div>
	)
}

const MobileRoadmapShuffleCard: FC<{
	item: RoadmapItem
	index: number
	total: number
	progress: MotionValue<number>
}> = ({ item, index, total, progress }) => {
	const start = index / total
	const end = (index + 1) / total
	const isFirstCard = index === 0
	const stackDepth = total - 1 - index
	const finalOffsetY = -Math.min(stackDepth * 10, 48)
	const finalScale = Math.max(0.9, 1 - stackDepth * 0.02)
	const finalOpacity = Math.max(
		MOBILE_STACK_MIN_OPACITY,
		1 - stackDepth * MOBILE_STACK_OPACITY_STEP,
	)

	const t = useTransform(progress, (p) => {
		if (p <= start) return 0
		if (p >= end) return 1
		return (p - start) / (end - start)
	})

	const opacity = useTransform(t, (v) => {
		const p = clamp(v)
		if (isFirstCard && p <= 0.12) return 1
		if (p <= 0.12) return lerp(0, 1, p / 0.12)
		if (p <= MOBILE_STACK_FADE_START) return 1
		return lerp(
			1,
			finalOpacity,
			(p - MOBILE_STACK_FADE_START) / (1 - MOBILE_STACK_FADE_START),
		)
	})
	const y = useTransform(t, (v) => {
		const p = clamp(v)
		if (isFirstCard && p <= 0.18) return 0
		if (p <= 0.18) return lerp(28, 0, p / 0.18)
		return lerp(0, finalOffsetY, (p - 0.18) / 0.82)
	})
	const scale = useTransform(t, (v) => {
		const p = clamp(v)
		if (isFirstCard && p <= 0.18) return 1
		if (p <= 0.18) return lerp(0.97, 1, p / 0.18)
		return lerp(1, finalScale, (p - 0.18) / 0.82)
	})

	return (
		<motion.div
			className="absolute inset-0"
			style={{ opacity, y, scale, zIndex: index + 1 }}
		>
			<RoadmapCardStatic item={item} />
		</motion.div>
	)
}

const MobileRoadmapShuffleCtaCard: FC<{
	primary: Content.RoadmapSliceDefaultPrimary
	index: number
	total: number
	progress: MotionValue<number>
}> = ({ primary, index, total, progress }) => {
	const start = index / total
	const end = (index + 1) / total
	const stackDepth = total - 1 - index
	const finalOffsetY = -Math.min(stackDepth * 10, 48)
	const finalScale = Math.max(0.9, 1 - stackDepth * 0.02)
	const finalOpacity = Math.max(
		MOBILE_STACK_MIN_OPACITY,
		1 - stackDepth * MOBILE_STACK_OPACITY_STEP,
	)

	const t = useTransform(progress, (p) => {
		if (p <= start) return 0
		if (p >= end) return 1
		return (p - start) / (end - start)
	})

	const opacity = useTransform(t, (v) => {
		const p = clamp(v)
		if (p <= 0.12) return lerp(0, 1, p / 0.12)
		if (p <= MOBILE_STACK_FADE_START) return 1
		return lerp(
			1,
			finalOpacity,
			(p - MOBILE_STACK_FADE_START) / (1 - MOBILE_STACK_FADE_START),
		)
	})
	const y = useTransform(t, (v) => {
		const p = clamp(v)
		if (p <= 0.18) return lerp(28, 0, p / 0.18)
		return lerp(0, finalOffsetY, (p - 0.18) / 0.82)
	})
	const scale = useTransform(t, (v) => {
		const p = clamp(v)
		if (p <= 0.18) return lerp(0.97, 1, p / 0.18)
		return lerp(1, finalScale, (p - 0.18) / 0.82)
	})

	return (
		<motion.div
			className="absolute inset-0"
			style={{ opacity, y, scale, zIndex: index + 1 }}
		>
			<RoadmapMobileCtaCard primary={primary} />
		</motion.div>
	)
}

const MobileRoadmapShuffleStack: FC<{
	items: RoadmapItem[]
	primary: Content.RoadmapSliceDefaultPrimary
	title?: Content.RoadmapSliceDefaultPrimary["title"]
	description?: Content.RoadmapSliceDefaultPrimary["subtitel"]
	navbarHeight?: number
}> = ({ items, primary, title, description, navbarHeight = 20 }) => {
	const stackRef = useRef<HTMLDivElement | null>(null)
	const isShortViewport = useMediaQuery(SHORT_MOBILE_VIEWPORT_MEDIA_QUERY)

	const { scrollYProgress } = useScroll({
		target: stackRef,
		offset: ["start center", "end end"],
	})

	const n = Math.max(1, items.length)
	const totalCards = n + 1
	const sectionMinH = `${Math.max(110, totalCards * 82)}vh`
	const stickyTop = Math.max(navbarHeight + 8, 56)
	const centeredStickyTop = `max(${stickyTop}px, calc(50svh - clamp(170px, 32svh, 230px)))`
	const stackProgress = useTransform(scrollYProgress, (p) => clamp(p))

	if (isShortViewport) {
		return (
			<div className="space-y-4">
				<SectionTitle title={title || ""} description={description} />
				<div className="space-y-3">
					{items.map((item, i) => (
						<RoadmapCardStatic key={`${item.title ?? "step"}-${i}`} item={item} />
					))}
					<RoadmapMobileCtaCard primary={primary} />
				</div>
			</div>
		)
	}

	return (
		<div>
			<SectionTitle title={title || ""} description={description} />
			<div
				ref={stackRef}
				className="relative mt-4"
				style={{ minHeight: sectionMinH }}
			>
				<div className="sticky" style={{ top: centeredStickyTop }}>
					<motion.div className="w-full">
						<div className="relative h-[64svh] max-h-[460px] min-h-[340px] w-full">
							{items.map((item, i) => (
								<MobileRoadmapShuffleCard
									key={`${item.title ?? "step"}-${i}`}
									item={item}
									index={i}
									total={totalCards}
									progress={stackProgress}
								/>
							))}
							<MobileRoadmapShuffleCtaCard
								primary={primary}
								index={n}
								total={totalCards}
								progress={stackProgress}
							/>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	)
}

export const StickyRoadmapStack: FC<Props> = ({ items, navbarHeight = 20 }) => {
	const sectionRef = useRef<HTMLDivElement | null>(null)
	const isShortViewport = useMediaQuery(SHORT_DESKTOP_VIEWPORT_MEDIA_QUERY)
	const staticCardProgress = useMotionValue(0)

	// Scroll progress for THIS section only
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end end"],
	})

	if (isShortViewport) {
		return (
			<div className="my-12">
				{items.map((item, i) => (
					<RoadMapCard
						key={`${item.title ?? "step"}-${i}`}
						item={item}
						t={staticCardProgress}
					/>
				))}
			</div>
		)
	}

	const n = Math.max(1, items.length)

	// This creates the “you can’t leave until all collapse” runway
	// Tune multiplier if you want more/less scroll time per card
	const sectionMinH = `${Math.max(140, n * 90)}vh`

	return (
		<div
			ref={sectionRef}
			className="relative my-12"
			style={{ minHeight: sectionMinH }}
		>
			{/* ONE sticky wrapper for the whole stack (like dpdk) */}
			<div className="sticky" style={{ top: navbarHeight }}>
				<div className="h-fit">
					{items.map((item, i) => (
						<StickyRoadMapCard
							key={`${item.title ?? "step"}-${i}`}
							item={item}
							index={i}
							total={n}
							progress={scrollYProgress}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

/**
 * Component for "Roadmap" Slices.
 */
const Roadmap: FC<RoadmapProps> = ({ slice }) => {
	const roadmapItems = [...slice.primary.roadmap]

	return (
		<Section
			id="roadmap"
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
			className="py-12"
		>
			<div className="hidden md:block">
				<SectionTitle
					title={slice.primary.title || ""}
					description={slice.primary.subtitel}
				/>
			</div>

			<div className="mt-4 md:hidden">
				{roadmapItems.length > 1 ? (
					<MobileRoadmapShuffleStack
						items={roadmapItems}
						primary={slice.primary}
						title={slice.primary.title || ""}
						description={slice.primary.subtitel}
					/>
				) : (
					<>
						<SectionTitle
							title={slice.primary.title || ""}
							description={slice.primary.subtitel}
						/>
						<div className="mt-3">
							{roadmapItems.map((item, i) => (
								<RoadmapCardStatic key={`${item.title ?? "step"}-${i}`} item={item} />
							))}
						</div>
					</>
				)}
				{roadmapItems.length <= 1 ? (
					<div className="mt-4">
						<RoadmapMobileCtaCard primary={slice.primary} />
					</div>
				) : null}
			</div>

			<div className="hidden md:block">
				<StickyRoadmapStack items={roadmapItems} />
				<div className="mt-8">
					<RoadmapDesktopCtaCard primary={slice.primary} />
				</div>
			</div>
		</Section>
	)
}

export default Roadmap
