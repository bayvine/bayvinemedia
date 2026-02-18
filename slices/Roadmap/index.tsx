"use client"

import React, { FC, useRef } from "react"
import {
	type MotionValue,
	motion,
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

type RoadmapItem = Content.RoadmapSliceDefaultPrimaryRoadmapItem

type Props = {
	items: RoadmapItem[]
	navbarHeight?: number // px
}

const clamp = (v: number) => Math.max(0, Math.min(1, v))

const lerp = (a: number, b: number, t: number) => a + (b - a) * t

const VIDEO_FILE_PATTERN = /\.(mp4|webm|ogg|m4v|mov)(\?|#|$)/i
const IMAGE_FILE_PATTERN = /\.(png|jpe?g|gif|webp|avif|bmp|svg|ico)(\?|#|$)/i

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
	const cardH = useTransform(t, (v) => `${lerp(400, 150, clamp(v))}px`) // overall card height
	const mediaH = useTransform(t, (v) => `${lerp(320, 100, clamp(v))}px`) // video height (your ask)
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
						className="origin-top overflow-hidden"
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

const RoadmapMobileCtaCard: FC<{
	primary: Content.RoadmapSliceDefaultPrimary
}> = ({ primary }) => {
	const hasCtaLink = isFilled.link(primary.cta_link)
	const hasCtaTitle = isFilled.richText(primary.cta_title)
	const hasBackgroundMedia = isFilled.linkToMedia(primary.background_cta)
	const backgroundUrl = hasBackgroundMedia
		? primary.background_cta.url
		: undefined
	const { isVideo, isImage } = getMediaType(
		backgroundUrl,
		primary.background_cta?.kind,
	)
	const isContactHref = (href?: string | null) =>
		typeof href === "string" && /\/contact(\/|$|\?|#)/.test(href)
	const ctaTitle = hasCtaTitle
		? primary.cta_title
		: "Confident yet? Let's partner up."
	const ctaLabel = primary.cta_label || primary.cta_link.text || "Contact us"

	return (
		<article className="h-full">
			<div className="relative isolate h-full min-h-[340px] w-full overflow-hidden rounded-lg bg-slate-900/60 shadow-lg ring-1 ring-white/20">
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
				className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/45 to-black/90"
			/>

			<div className="absolute inset-0 z-10 flex flex-col justify-end p-6">
				<SectionTitle noUpperCase title={ctaTitle} />
				{hasCtaLink ? (
					<PrismicNextLink
						field={primary.cta_link}
						{...(isContactHref(primary.cta_link.url)
							? { target: "_self" }
							: {})}
						className="mt-4 inline-flex w-fit"
					>
						<CTAButton as="span">
							{ctaLabel}
						</CTAButton>
					</PrismicNextLink>
				) : (
					<Link href="/contact" className="mt-4 inline-flex w-fit">
						<CTAButton as="span">{ctaLabel}</CTAButton>
					</Link>
					)}
				</div>
			</div>
		</article>
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
	const finalOffsetY = -Math.min(stackDepth * 12, 72)
	const finalScale = Math.max(0.9, 1 - stackDepth * 0.02)
	const finalOpacity = Math.max(0.45, 1 - stackDepth * 0.12)

	const t = useTransform(progress, (p) => {
		if (p <= start) return 0
		if (p >= end) return 1
		return (p - start) / (end - start)
	})

	const opacity = useTransform(t, (v) => {
		const p = clamp(v)
		if (isFirstCard && p <= 0.12) return 1
		if (p <= 0.12) return lerp(0, 1, p / 0.12)
		return lerp(1, finalOpacity, (p - 0.12) / 0.88)
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
	const finalOffsetY = -Math.min(stackDepth * 12, 72)
	const finalScale = Math.max(0.9, 1 - stackDepth * 0.02)
	const finalOpacity = Math.max(0.45, 1 - stackDepth * 0.12)

	const t = useTransform(progress, (p) => {
		if (p <= start) return 0
		if (p >= end) return 1
		return (p - start) / (end - start)
	})

	const opacity = useTransform(t, (v) => {
		const p = clamp(v)
		if (p <= 0.12) return lerp(0, 1, p / 0.12)
		return lerp(1, finalOpacity, (p - 0.12) / 0.88)
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
	const sectionRef = useRef<HTMLDivElement | null>(null)

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end end"],
	})

	const n = Math.max(1, items.length)
	const totalCards = n + 1
	const sectionMinH = `${Math.max(120, totalCards * 84)}vh`
	const stickyTop = Math.max(navbarHeight + 8, 56)
	const stickyHeight = `calc(100svh - ${stickyTop}px)`
	const introEnd = 0.22
	const headingOpacity = useTransform(scrollYProgress, [0, 0.1, introEnd], [1, 1, 0])
	const headingY = useTransform(scrollYProgress, [0, introEnd], [0, -24])
	const cardIntroY = useTransform(scrollYProgress, [0, introEnd], [-40, 0])
	const stackProgress = useTransform(scrollYProgress, (p) => {
		if (p <= introEnd) return 0
		return clamp((p - introEnd) / (1 - introEnd))
	})

	return (
		<div
			ref={sectionRef}
			className="relative"
			style={{ minHeight: sectionMinH }}
		>
				<div className="sticky" style={{ top: stickyTop, height: stickyHeight }}>
					<div className="relative h-full">
					<motion.div
						className="pointer-events-none absolute inset-x-0 top-0 z-20"
						style={{ opacity: headingOpacity, y: headingY }}
					>
						<SectionTitle
							title={title || ""}
							description={description}
						/>
					</motion.div>
					<div className="flex h-full items-center">
						<motion.div className="w-full" style={{ y: cardIntroY }}>
							<div className="relative h-[64vh] max-h-[460px] min-h-[340px] w-full">
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
			</div>
			)
		}

export const StickyRoadmapStack: FC<Props> = ({ items, navbarHeight = 20 }) => {
	const sectionRef = useRef<HTMLDivElement | null>(null)

	// Scroll progress for THIS section only
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end end"],
	})

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
			</div>
		</Section>
	)
}

export default Roadmap
