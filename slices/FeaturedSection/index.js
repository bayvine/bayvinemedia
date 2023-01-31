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
	const root = useRef()

	const getClasses = () => {
		const elementsToLoopThrough = []

		slice.items.map((item, _) =>
			elementsToLoopThrough.push(`.project-image-${_}`)
		)

		return elementsToLoopThrough
	}
	useIsomorphicLayoutEffect(() => {
		let ctx = gsap.context(() => {
			gsap.fromTo(
				[...getClasses()],
				{
					opacity: 0,
					scale: 1,
					stagger: {
						amount: 0.04,
					},
				},
				{
					opacity: 1,
					scale: 1.2,
					delay: 0.8,
					scrollTrigger: {
						trigger: ".project-wrapper",
						start: "top center",
					},
				}
			)

			gsap.from(".project-text ", {
				opacity: 0,
				delay: 1.4,
				scrollTrigger: {
					trigger: ".project-wrapper",
					start: "top center",
				},
			})
		}, root)

		return () => ctx.revert()
	}, [])

	console.log(slice)

	return (
		<section ref={root}>
			<Title
				trigger=".project-wrapper"
				title={<PrismicText field={slice.primary.title} />}
				description={<PrismicText field={slice.primary.description} />}
			/>
			<div className="px-5 mb-5 project-wrapper">
				{Array.isArray(slice.items) &&
					slice.items.length &&
					slice.items.map((item, _) => {
						return (
							<Element
								href={item.link.url}
								key={useId}
								className="relative aspect-[380/450] min-h-auto pt-20 flex pb-4 rounded-md px-4 group "
							>
								<div className="relative z-50 self-end overflow-hidden text-white project-text h-fit ">
									<p className="mb-1 text-2xl font-bold uppercase">
										<PrismicText field={item.title} />
									</p>
									<p className="relative font-medium transition-all duration-300 ease-linear opacity-1 max-h-72 text-md lg:max-h-0 lg:opacity-0 group-hover:opacity-100 group-hover:max-h-72">
										<PrismicText field={item.description} />
									</p>
									<div className="mt-2 text-sm font-light">
										{item.services_done}
									</div>

									<div className="flex gap-2 my-4 font-bold text-black whitespace-pre">
										{/* <PrismicLink href={item.link.url}>
											<button className="px-8 py-2 uppercase bg-white rounded-md text-bold">
												<span className="flex items-center font-black">
													Visit site <ArrowUpRight />
												</span>
											</button>
										</PrismicLink> */}
										{/* <button className="px-4 py-2 uppercase bg-white rounded-md text-bold">
											<div className="font-black">Casestudy</div>
										</button> */}
									</div>
								</div>
								<div className="absolute top-0 left-0 rounded-md overflow-hidden aspect-[380/450] opacity-30 h-full w-full">
									<Image
										className={`project-image-${_} h-full object-cover`}
										src={item.image.url}
										alt={item.image.alt}
										height={item.image.dimensions.height}
										width={item.image.dimensions.width}
									/>
								</div>
							</Element>
						)
					})}
			</div>
			<CtaProject />
		</section>
	)
}

export default FeaturedSection
