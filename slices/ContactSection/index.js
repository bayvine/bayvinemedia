import React from "react"
import { PrismicLink, PrismicRichText } from "@prismicio/react"
import * as prismicH from "@prismicio/helpers"
import Title from "@/components/Title"

/**
 * @typedef {import("@prismicio/client").Content.ContactSectionSlice} ContactSectionSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ContactSectionSlice>} ContactSectionProps
 * @param { ContactSectionProps }
 */
const ContactSection = ({ slice }) => {
	const title = prismicH.asText(slice.primary.title)
	const description = slice.primary.description

	const htmlSerializer = (type, element, text, children) => {}

	return (
		<section className="text-white">
			<Title title={title} />
			<div className="px-5">
				<PrismicRichText field={description} className="underline" />
			</div>
		</section>
	)
}

export default ContactSection
