import React, { useId } from "react"
import { PrismicRichText } from "@prismicio/react"
import clsx from "clsx"

/**
 * @typedef {import("@prismicio/client").Content.IntroSectionSlice} IntroSectionSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<IntroSectionSlice>} IntroSectionProps
 * @param { IntroSectionProps }
 */

const IntroSection = ({ slice }) => {
	const htmlSerializer = (type, element, text, children) => {
		if (type == "strong") {
			return (
				<div className="xl:flex xl:justify-between">
					<div className="inline-block overflow-y-hidden text-white opacity-100 text-7xl h-fit sm:text-9xl md:text-[20vw] lg:text-[15vw] xl:text-[150px]  ">
						<span className="inline-block text-transparent bg-gradient-to-r bg-clip-text from-purple-500 to-blue-600 animated-gradient">
							{text}
						</span>
					</div>
					<div className="hidden xl:block xl:max-w-sm xl:text-right xl:text-sm xl:pt-4">
						<PrismicRichText field={slice.primary.description} />
					</div>
				</div>
			)
		}
		if (type == "span") {
			return (
				<div className="inline-block w-full overflow-y-hidden text-4xl text-white opacity-100 h-fit sm:text-6xl sm:h-full md:text-[8vw] lg:text-[5vw] xl:text-[134px] xl:whitespace-nowrap">
					<span className="inline-block text-transparent bg-gradient-to-r bg-clip-text from-purple-500 to-blue-600 animated-gradient">
						{text}
					</span>
				</div>
			)
		}
	}

	return (
		<section className="px-5 text-white sm:px-10 md:px-14 lg:max-w-4xl lg:mx-auto lg:px-0 xl:max-w-6xl">
			<div className="hidden xl:flex xl:flex-col xl:pt-60">
				{/* title 1 with description next to it */}
				<div className="flex font-bold uppercase ">
					<PrismicRichText
						field={slice.primary.title}
						components={htmlSerializer}
					/>
				</div>
				{/* service list */}
				<ul className="flex px-2 py-5">
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
			<div className="flex flex-col xl:hidden">
				<div className="font-bold text-center uppercase pt-60 lg:self-center lg:pt-80">
					<PrismicRichText
						field={slice.primary.title}
						components={htmlSerializer}
					/>
				</div>
				<div
					className={clsx([
						"max-w-sm mx-auto mt-3 text-center text-md sm:text-xl sm:max-w-md lg:max-w-lg lg:text-lg",
						"description",
					])}
				>
					<PrismicRichText field={slice.primary.description} />
				</div>
				<div className="relative flex justify-center mt-56 -mx-5 overflow-x-hidden marquee sm:-mx-10 md:-mx-14 xl:hidden">
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
			<hr className="-mx-5 sm:-mx-10 md:-mx-14 lg:-mx-[50vw] full-width h-0.5 w-screen border-white/30 my-4 xl:mt-24" />
			<div className="flex justify-between information-tab">
				<span>{slice.primary.year}</span>
				<span>{slice.primary.cta}</span>
			</div>
		</section>
	)
}
export default IntroSection
