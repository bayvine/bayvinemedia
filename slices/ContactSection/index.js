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

	// const htmlSerializer = (type, element, text, children) => {
	//   return {
	//     hyperlink: ()
	//   }
	// }

	return (
		<section className="text-white">
			<Title title={title} />
			<div className="px-5">
				<PrismicRichText
					field={description}
					className="underline"
					components={{
						hyperlink: (props) => (
							<PrismicLink
								className="underline"
								{...props}
								href={props.node.data.url}
							>
								{props.text}
							</PrismicLink>
						),
					}}
				/>
			</div>
			<form>
				{/* First row */}
				<div>
					{/* First name, not required */}
					<div></div>
					{/* Email, required */}
					<div></div>
				</div>
				{/* Second row */}
				<div>
					{/* Phone number, not required */}
					<div></div>
					{/* Project budget, not required */}
					<div></div>
				</div>
				{/* Third row */}
				<div>
					{/* Tell us about the project */}
					<div></div>
				</div>
				{/* Fourth row */}
				<div>
					{/* Submit button */}
					<div></div>
				</div>
			</form>
		</section>
	)
}

export default ContactSection
