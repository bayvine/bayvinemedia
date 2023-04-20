import React, { useRef } from "react"
import { PrismicRichText, PrismicText } from "@prismicio/react"
import { useIsomorphicLayoutEffect } from "@/helpers/useIsomorphicLayoutEffect"
import gsap, { Expo, Power2 } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import clsx from "clsx"
gsap.registerPlugin(ScrollTrigger)
/**
 * @typedef {import("@prismicio/client").Content.FeaturedSectionSlice} FeaturedSectionSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<FeaturedSectionSlice>} FeaturedSectionProps
 * @param { FeaturedSectionProps }
 */
const Title = ({ title, description, trigger, subdescription, className }) => {
	useIsomorphicLayoutEffect(() => {}, [])
	return (
		<div className={clsx([className])}>
			<div>
				<div className="relative z-10 px-5 py-4 text-white sm:px-10 md:px-14 lg:px-0 xl:py-12">
					{description && (
						<div className="overflow-y-hidden h-fit ">
							<span className="inline-block text-md 2xl:text-lg">
								{description}
							</span>
						</div>
					)}
					{title && (
						<div className="overflow-y-hidden h-fit 2xl:h-full">
							<h2 className="mt-2 text-xl font-semibold xl:text-4xl 2xl:mt-0 ">
								{title}
							</h2>
						</div>
					)}
					{subdescription && (
						<div className="overflow-y-hidden h-fit 2xl:text-lg 2xl:max-w-xl">
							<p className="mt-2 text-md">{subdescription}</p>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default Title
