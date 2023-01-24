import React, { useId } from "react"
import { PrismicRichText, PrismicText } from "@prismicio/react"

/**
 * @typedef {import("@prismicio/client").Content.IntroSectionSlice} IntroSectionSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<IntroSectionSlice>} IntroSectionProps
 * @param { IntroSectionProps }
 */

const htmlSerializer = (type, element, text, children) => {
	if (type == "strong") {
		return <span className="text-7xl animated-gradient">{text}</span>
	}
	if (type == "span") {
		return <p className="text-4xl animated-gradient">{text}</p>
	}
}

const IntroSection = ({ slice }) => {
	console.log(slice)
	return (
		<section className="px-5 text-white">
			<div className="flex flex-col">
				<div className="pt-56 font-bold text-center uppercase">
					<PrismicRichText
						field={slice.primary.title}
						components={htmlSerializer}
					/>
				</div>
				<div className="mt-2 text-center">
					<PrismicText field={slice.primary.description} />
				</div>

				<ul className="flex mt-56">
					{Array.isArray(slice.items) &&
						slice.items.length &&
						slice.items.slice(0, 2) &&
						slice.items.map((item, index) => {
							return (
								<li className="text-xs whitespace-pre" key={useId()}>
									{index !== slice.items.length - 1
										? `${item.service}  •  `
										: item.service}
								</li>
							)
						})}
				</ul>
			</div>
			<hr className="-mx-5 h-0.5 w-screen border-white/30 my-8" />
		</section>
	)
}
export default IntroSection
