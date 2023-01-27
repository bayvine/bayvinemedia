import React, { useRef } from "react"
import { PrismicText } from "@prismicio/react"
import Image from "next/image"
import { useIsomorphicLayoutEffect } from "@/helpers/useIsomorphicLayoutEffect"
import gsap, { Expo, Power2 } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

/**
 * @typedef {import("@prismicio/client").Content.AboutSectionSlice} AboutSectionSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<AboutSectionSlice>} AboutSectionProps
 * @param { AboutSectionProps }
 */
const AboutSection = ({ slice }) => {
	const root = useRef()

	useIsomorphicLayoutEffect(() => {
		let ctx = gsap.context(() => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: ".about-section",
					start: "top 250px",
				},
			})

			tl.to(".overlay", {
				duration: 0.6,
				delay: 0.4,
				height: 0,
				ease: Power2.easeInOut,
			})
				.to(".about-image", {
					scale: 1.15,
					delay: -0.35,
					duration: 1.2,
					ease: Expo.easeOut,
				})
				.from(".about-title", {
					y: 35,
					delay: -0.45,
				})
				.from(".about-description", {
					opacity: 0,
					y: 10,
					delay: -0.15,
				})
		}, root)

		return () => ctx.revert()
	}, [])

	return (
		<section ref={root} className="mt-20 overflow-hidden about-section">
			<div className="relative w-full h-full text-white">
				<div className="relative z-10 px-5 py-14">
					<div className="overflow-y-hidden h-fit">
						<h2 className="text-md about-title">
							<PrismicText field={slice.primary.title} />
						</h2>
					</div>
					<p className="mt-2 text-xl font-semibold about-description">
						<PrismicText field={slice.primary.description} />
					</p>
				</div>

				<div className="w-full h-full overflow-y-hidden">
					<Image
						src={slice.primary.background.url}
						className="absolute top-0 left-0 z-0 object-cover w-full h-full opacity-50 about-image"
						alt={slice.primary.background.alt}
						width={slice.primary.background.dimensions.width}
						height={slice.primary.background.dimensions.height}
					/>
					<div className="absolute top-0 left-0 z-10 w-full h-full bg-black overlay"></div>
				</div>
			</div>
		</section>
	)
}
export default AboutSection
