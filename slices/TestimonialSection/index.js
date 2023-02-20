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
	console.log(slice)
	const title = prismich.asText(slice.primary.title)

	return (
		<section className="testmonial-section">
			<Title title={title} trigger=".testimonial-section" />
		</section>
	)
}

export default TestimonialSection
