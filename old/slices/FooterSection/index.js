import React from "react"
import { PrismicLink, PrismicRichText } from "@prismicio/react"

/**
 * @typedef {import("@prismicio/client").Content.FooterSectionSlice} FooterSectionSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<FooterSectionSlice>} FooterSectionProps
 * @param { FooterSectionProps }
 */
const FooterSection = ({ slice }) => {
	const title = slice.primary.title
	return (
		<section className="px-5 py-8 text-sm text-white opacity-50 lg:mt-20 xl:text-center">
			<PrismicRichText
				field={title}
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
		</section>
	)
}

export default FooterSection
