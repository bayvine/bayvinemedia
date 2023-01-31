import React, { useRef } from "react"
import { PrismicRichText, PrismicText } from "@prismicio/react"
import { useIsomorphicLayoutEffect } from "@/helpers/useIsomorphicLayoutEffect"
import gsap, { Expo, Power2 } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)
/**
 * @typedef {import("@prismicio/client").Content.FeaturedSectionSlice} FeaturedSectionSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<FeaturedSectionSlice>} FeaturedSectionProps
 * @param { FeaturedSectionProps }
 */
const Title = ({ title, description, trigger }) => {
	const root = useRef()

	useIsomorphicLayoutEffect(() => {
		let ctx = gsap.context(() => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: trigger,
					start: "center bottom",
				},
			})
			tl.from([".title-description", ".title-title"], {
				y: 50,
				ease: Expo.easeOut,
				stagger: {
					amount: 0.25,
				},
			})
		}, root)

		return () => ctx.revert()
	}, [])

	return (
		<div ref={root}>
			<div className="title-wrapper">
				<div className="relative z-10 px-5 py-8 text-white">
					<div className="overflow-y-hidden h-fit">
						<span className="inline-block text-md title-description">
							{description}
						</span>
					</div>
					<div className="overflow-y-hidden h-fit">
						<h2 className="mt-2 text-xl font-semibold title-title">{title}</h2>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Title
