import React from "react"
import { PrismicRichText } from "@prismicio/react"
import * as prismich from "@prismicio/helpers"
import Title from "@/components/Title"

/**
 * @typedef {import("@prismicio/client").Content.TestimonialSectionSlice} TestimonialSectionSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<TestimonialSectionSlice>} TestimonialSectionProps
 * @param { TestimonialSectionProps }
 */
const TestimonialSection = ({ slice }) => {
	const title = prismich.asText(slice.primary.title)

	return (
		<section className="testmonial-section lg:max-w-4xl lg:mx-auto lg:px-0 ">
			<Title title={title} className="justify-center text-center" />
			<div className="relative flex items-baseline gap-4 px-5 mx-auto overflow-scroll xl:justify-center scrollbar-hide service-carousel scroll-smooth sm:px-10 md:px-14 full-bleed">
				{Array.isArray(slice.items) &&
					slice.items.length &&
					slice.items.map((item, index) => {
						const title = prismich.asText(item.title)
						const author = item.author
						const photo = item.photo
						const testim = item.testimonial
						return (
							<TestimonialCard
								key={index}
								photo={photo}
								title={title}
								author={author}
								testimonial={testim}
							/>
						)
					})}
			</div>
		</section>
	)
}

const TestimonialCard = ({ photo, title, author, testimonial }) => {
	return (
		<div className="text-white bg-[#0C0E1D] py-6 px-5 rounded-lg shrink-0">
			{/* top row */}
			<div className="flex gap-4">
				<div className="w-16 h-16 bg-white rounded-lg aspect-square">
					<img
						src={photo.url || ""}
						alt={photo.alt || ""}
						className="w-full h-full rounded-lg aspect-square"
					/>
				</div>
				<div className="flex flex-col">
					<span className="text-lg font-bold">{title}</span>
					<span className="text-sm text-gray-400">{author}</span>
				</div>
			</div>
			<div className="max-w-xs mt-5">
				<PrismicRichText field={testimonial} />
			</div>
		</div>
	)
}
export default TestimonialSection
