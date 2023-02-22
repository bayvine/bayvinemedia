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
		<section>
			<Title
				title={title}
				description={description}
				subdescription={subdescription}
			/>
			{Array.isArray(roadmapItems) &&
				roadmapItems.length &&
				roadmapItems.map((item, index) => {
					return (
						<div key={useId()} className="px-5 mb-5 text-white">
							<h3 className="text-xl font-bold ">
								<PrismicRichText field={item.step_title} />
							</h3>
							<div className="max-w-xs mt-2">
								<PrismicRichText field={item.step_description} />
							</div>
						</div>
					)
				})}
		</section>
	)
}

export default RoadmapSection
