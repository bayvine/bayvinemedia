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
	return (
		<section className="px-5 text-white">
			<div className="flex flex-col">
				<div className="flex flex-col justify-center pt-56 font-bold text-center uppercase">
					<PrismicRichText
						field={slice.primary.title}
						components={htmlSerializer}
					/>
				</div>
				<div className="mt-2 text-center">
					<PrismicText field={slice.primary.description} />
				</div>

				<div className="relative flex justify-center mt-56 overflow-x-hidden">
					<ul className="flex px-2 animate-marquee whitespace-nowrap">
						{Array.isArray(slice.items) &&
							slice.items.length &&
							slice.items.slice(0, 2) &&
							slice.items.map((item, index) => {
								return (
									<li className="whitespace-pre text-md" key={useId()}>
										{index !== slice.items.length - 1
											? `${item.service}  •  `
											: item.service}
									</li>
								)
							})}
					</ul>
					<div></div>
					<ul className="absolute top-0 flex px-2 animate-marquee2 whitespace-nowrap">
						{Array.isArray(slice.items) &&
							slice.items.length &&
							slice.items.slice(0, 2) &&
							slice.items.map((item, index) => {
								return (
									<li className="whitespace-pre text-md" key={useId()}>
										{index !== slice.items.length - 1
											? `${item.service}  •  `
											: item.service}
									</li>
								)
							})}
					</ul>
				</div>
			</div>
			<hr className="-mx-5 h-0.5 w-screen border-white/30 my-4" />
			<div className="flex justify-between">
				<span>{slice.primary.year}</span>
				<span>{slice.primary.cta}</span>
			</div>
		</section>
	)
}
export default IntroSection
