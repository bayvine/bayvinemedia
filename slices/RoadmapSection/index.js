import React, { useId, useRef } from "react"
import * as prismich from "@prismicio/helpers"
import Title from "@/components/Title"
import { PrismicRichText } from "@prismicio/react"
/**
 * @typedef {import("@prismicio/client").Content.RoadmapSectionSlice} RoadmapSectionSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<RoadmapSectionSlice>} RoadmapSectionProps
 * @param { RoadmapSectionProps }
 */
const RoadmapSection = ({ slice }) => {
	const title = prismich.asText(slice.primary.title)
	const description = prismich.asText(slice.primary.description)
	const subdescription = prismich.asText(slice.primary.sub_description)
	const roadmapItems = slice.items

	return (
		<section className="sm:mt-5 lg:max-w-4xl lg:mx-auto lg:px-0 2xl:max-w-screen-2xl 2xl:px-5">
			<Title
				title={title}
				description={description}
				subdescription={subdescription}
			/>
			<div className="sm:mt-5 sm:px-10 sm:grid sm:grid-cols-2 sm:gap-5 md:px-14 lg:px-0 lg:grid-cols-3">
				{Array.isArray(roadmapItems) &&
					roadmapItems.length &&
					roadmapItems.map((item, index) => {
						return (
							<div
								key={useId()}
								className="px-5 mb-5 text-white sm:bg-[#0C0E1D]  sm:max-w-md sm:px-4 sm:py-7 sm:rounded-lg"
							>
								<h3 className="text-xl font-bold ">
									<PrismicRichText field={item.step_title} />
								</h3>
								<div className="max-w-xs mt-2">
									<PrismicRichText field={item.step_description} />
								</div>
							</div>
						)
					})}
			</div>
		</section>
	)
}

export default RoadmapSection
