import React, { useId, useRef } from "react"
import { PrismicRichText } from "@prismicio/react"
import Title from "@/components/Title"
import * as prismich from "@prismicio/helpers"
import gsap from "gsap"
import { useIsomorphicLayoutEffect } from "@/helpers/useIsomorphicLayoutEffect"
import ScrollForMore from "@/components/ScrollForMore"

/**
 * @typedef {import("@prismicio/client").Content.ServicesSectionSlice} ServicesSectionSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ServicesSectionSlice>} ServicesSectionProps
 * @param { ServicesSectionProps }
 */
const ServicesSection = ({ slice }) => {
	const title = prismich.asText(slice.primary.title)
	const description = prismich.asText(slice.primary.description)
	const subdescription = prismich.asText(slice.primary.sub_description)
	const serviceItems = slice.items

	return (
		<section className="my-4 ">
			<div>
				<Title
					title={title}
					description={description}
					subdescription={subdescription}
				/>
				<div className="relative flex items-baseline gap-4 px-5 overflow-scroll sm:px-10 scrollbar-hide service-carousel scroll-smooth sm:mt-5">
					{Array.isArray(serviceItems) &&
						serviceItems.length &&
						serviceItems.map((item, index) => {
							return (
								<div
									key={useId(item)}
									className="text-white rounded-xl bg-none  shrink-0 w-[360px] py-10 px-8 overflow-hidden h-[400px] border-slate-50/30 border-2"
								>
									<img
										src={item.icon.url}
										className="h-[35px]"
										alt={item.icon.alt}
									/>
									<span className="inline-block my-4 text-2xl font-bold">
										{item.title}
									</span>
									<PrismicRichText field={item.service_description} />
								</div>
							)
						})}
				</div>
				<div className="px-5 sm:px-10">
					<ScrollForMore target=".service-carousel" />
				</div>
			</div>
		</section>
	)
}

export default ServicesSection
