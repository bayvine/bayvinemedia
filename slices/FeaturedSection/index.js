import React, { useId, useRef } from "react"
import { PrismicRichText, PrismicText } from "@prismicio/react"
import { useIsomorphicLayoutEffect } from "@/helpers/useIsomorphicLayoutEffect"
import gsap, { Expo, Power2 } from "gsap"
import Title from "@/components/Title"
import Image from "next/image"

/**
 * @typedef {import("@prismicio/client").Content.FeaturedSectionSlice} FeaturedSectionSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<FeaturedSectionSlice>} FeaturedSectionProps
 * @param { FeaturedSectionProps }
 */
const FeaturedSection = ({ slice }) => {
	const root = useRef()

	useIsomorphicLayoutEffect(() => {
		let ctx = gsap.context(() => {
			gsap.fromTo(
				".project-image-0",
				{
					opacity: 0,
					scale: 1,
				},
				{
					opacity: 1,
					scale: 1.2,
					delay: 0.8,
					autoAlpha: 1,
					scrollTrigger: {
						trigger: ".project-wrapper",
					},
				}
			)
		}, root)

		return () => ctx.revert()
	}, [])

	console.log(slice)

	return (
		<section ref={root}>
			<Title
				title={<PrismicText field={slice.primary.title} />}
				description={<PrismicText field={slice.primary.description} />}
			/>
			<div className="px-5 project-wrapper">
				{Array.isArray(slice.items) &&
					slice.items.length &&
					slice.items.map((item, _) => {
						return (
							<div
								key={useId}
								className="relative aspect-[380/450] flex pb-4 px-5 group"
							>
								<div className="relative z-50 grid self-end overflow-hidden text-white h-fit">
									<p className="text-2xl font-bold uppercase">
										<PrismicText field={item.title} />
									</p>
									<p className="relative font-medium transition-all duration-500 ease-out max-h-0 text-md group-hover:max-h-72">
										<PrismicText field={item.description} />
									</p>
								</div>
								<div className="absolute top-0 left-0 inline-block overflow-hidden aspect-[380/450] opacity-30">
									<Image
										className={` project-image-${_} h-full object-cover group-hover:scale-100`}
										src={item.image.url}
										alt={item.image.alt}
										height={item.image.dimensions.height}
										width={item.image.dimensions.width}
									/>
								</div>
							</div>
						)
					})}
			</div>
		</section>
	)
}

export default FeaturedSection
