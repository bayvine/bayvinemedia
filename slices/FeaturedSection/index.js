import React, { useId, useRef } from "react"
import { PrismicLink, PrismicRichText, PrismicText } from "@prismicio/react"
import { useIsomorphicLayoutEffect } from "@/helpers/useIsomorphicLayoutEffect"
import gsap, { Expo, Power2 } from "gsap"
import Title from "@/components/Title"
import Image from "next/image"
import Link from "next/link"
import useIsMobile from "@/helpers/useIsMobile"
import ArrowUpRight from "@/components/ArrowUpRight"
import CtaProject from "@/components/CtaProject"

/**
 * @typedef {import("@prismicio/client").Content.FeaturedSectionSlice} FeaturedSectionSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<FeaturedSectionSlice>} FeaturedSectionProps
 * @param { FeaturedSectionProps }
 */
const FeaturedSection = ({ slice }) => {
	const isMobile = useIsMobile()
	const Element = isMobile ? "article" : PrismicLink

	useIsomorphicLayoutEffect(() => {}, [])

	return (
		<section className="mt-10 lg:max-w-4xl lg:mx-auto lg:px-0 2xl:max-w-screen-2xl 2xl:px-5">
			<Title
				title={<PrismicText field={slice.primary.title} />}
				description={<PrismicText field={slice.primary.description} />}
			/>
			<div className="px-5 mt-5 sm:px-10 md:px-14 md:mx-auto lg:px-0 lg:grid lg:grid-cols-2 2xl:mt-0 lg:gap-10 ">
				{Array.isArray(slice.items) &&
					slice.items.length &&
					slice.items.map((item, index) => {
						return (
							<div key={index} className="max-w-md md:max-w-full">
								<div className="h-[450px] overflow-hidden aspect-square w-full">
									<Image
										src={item.image.url}
										alt={item.image.alt}
										className={`project-image-${index} object-cover h-full`}
										height={item.image.dimensions.height}
										width={item.image.dimensions.width}
									/>
								</div>
								<div className="w-full text-white py-7">
									<p className="mb-1 text-2xl font-bold uppercase 2xl:text-3xl">
										<PrismicText field={item.title} />
									</p>
									<div className="mt-2 text-sm font-light 2xl:text-lg">
										{item.services_done}
									</div>
									<div className="flex gap-2 mt-4 font-bold text-black whitespace-pre ">
										<PrismicLink href={item.link.url} className="font-black ">
											<button className="flex items-center px-8 py-2 uppercase bg-white rounded-md text-bold 2xl:text-xl">
												Visit site <ArrowUpRight />
											</button>
										</PrismicLink>
									</div>
								</div>
							</div>
						)
					})}
			</div>
		</section>
	)
}

export default FeaturedSection
