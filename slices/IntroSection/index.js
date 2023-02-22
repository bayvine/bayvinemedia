import React, { useEffect, useId, useRef } from "react"
import { PrismicRichText } from "@prismicio/react"
import gsap from "gsap"
import { useIsomorphicLayoutEffect } from "@/helpers/useIsomorphicLayoutEffect"
import clsx from "clsx"

/**
 * @typedef {import("@prismicio/client").Content.IntroSectionSlice} IntroSectionSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<IntroSectionSlice>} IntroSectionProps
 * @param { IntroSectionProps }
 */

const IntroSection = ({ slice }) => {
	const htmlSerializer = (type, element, text, children) => {
		if (type == "strong") {
			return (
				<div className="inline-block overflow-y-hidden text-white opacity-100 text-7xl h-fit ">
					<span className="inline-block text-transparent bg-gradient-to-r bg-clip-text from-purple-500 to-blue-600 animated-gradient">
						{text}
					</span>
				</div>
			)
		}
		if (type == "span") {
			return (
				<div className="inline-block overflow-y-hidden text-4xl text-white opacity-100 h-fit ">
					<span className="inline-block text-transparent bg-gradient-to-r bg-clip-text from-purple-500 to-blue-600 animated-gradient">
						{text}
					</span>
				</div>
			)
		}
	}

	return (
		<section className="px-5 text-white">
			<div className="flex flex-col">
				<div className="font-bold text-center uppercase pt-60">
					<PrismicRichText
						field={slice.primary.title}
						components={htmlSerializer}
					/>
				</div>
				<div
					className={clsx([
						"max-w-sm mx-auto mt-3 text-center text-md",
						"description",
					])}
				>
					<PrismicRichText field={slice.primary.description} />
				</div>

				<div className="relative flex justify-center mt-56 overflow-x-hidden marquee">
					<ul className="flex px-2 animate-marquee whitespace-nowrap">
						{Array.isArray(slice.items) &&
							slice.items.length &&
							slice.items.slice(0, 2) &&
							slice.items.map((item, index) => {
								return (
									<li className="whitespace-pre text-md" key={useId()}>
										{index !== slice.items.length - 1
											? `${item.service}  •  `
											: item.service}
									</li>
								)
							})}
					</ul>
					<div></div>
					<ul className="absolute top-0 flex px-2 animate-marquee2 whitespace-nowrap">
						{Array.isArray(slice.items) &&
							slice.items.length &&
							slice.items.slice(0, 2) &&
							slice.items.map((item, index) => {
								return (
									<li className="whitespace-pre text-md" key={useId()}>
										{index !== slice.items.length - 1
											? `${item.service}  •  `
											: item.service}
									</li>
								)
							})}
					</ul>
				</div>
			</div>
			<hr className="-mx-5 h-0.5 w-screen border-white/30 my-4 cross-line" />
			<div className="flex justify-between information-tab">
				<span>{slice.primary.year}</span>
				<span>{slice.primary.cta}</span>
			</div>
		</section>
	)
}
export default IntroSection
