import React, { useId, useRef } from "react"
import { PrismicRichText } from "@prismicio/react"
import * as prismich from "@prismicio/helpers"
import Title from "@/components/Title"
import Image from "next/image"
import { useIsomorphicLayoutEffect } from "@/helpers/useIsomorphicLayoutEffect"

/**
 * @typedef {import("@prismicio/client").Content.ToolkitSectionSlice} ToolkitSectionSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ToolkitSectionSlice>} ToolkitSectionProps
 * @param { ToolkitSectionProps }
 */
const ToolkitSection = ({ slice }) => {
	const root = useRef()
	const title = prismich.asText(slice.primary.title)
	const description = prismich.asText(slice.primary.description)
	const subdescription = prismich.asText(slice.primary.sub_description)
	const halfIndex = slice.items.length / 2
	const rowOne = slice.items.slice(0, halfIndex)
	const rowTwo = slice.items.slice(halfIndex, slice.items.length)

	useIsomorphicLayoutEffect(() => {
		document.getScroll = function () {
			if (window.pageYOffset != undefined) {
				return [pageXOffset, pageYOffset]
			} else {
				var sx,
					sy,
					d = document,
					r = d.documentElement,
					b = d.body
				sx = r.scrollLeft || b.scrollLeft || 0
				sy = r.scrollTop || b.scrollTop || 0

				console.log(sx)
				return [sx, sy]
			}
		}
	}, [])
	return (
		<section
			className="toolkit-section"
			ref={root}
			onScroll={(e) => console.log(e)}
		>
			<Title
				title={title}
				description={description}
				subdescription={subdescription}
				trigger=".toolkit-section"
			/>

			<div className="grid grid-cols-10 gap-3 px-5 overflow-x-scroll technology-wrapper w-max">
				{Array.isArray(rowOne) &&
					rowOne.length &&
					rowOne.map((tech, index) => {
						return (
							<div
								key={useId()}
								className="shrink-0 flex bg-[#0C0E1D] -translate-x-10 h-[150px] w-[150px] items-center justify-center  rounded-lg  aspect-square"
							>
								<Image
									className=" shrink-0"
									src={tech.tech.url}
									alt={tech.tech.alt}
									width={tech.tech.dimensions.width}
									height={tech.tech.dimensions.height}
								/>
							</div>
						)
					})}

				{Array.isArray(rowTwo) &&
					rowTwo.length &&
					rowTwo.map((tech, index) => {
						return (
							<div
								key={useId()}
								className="shrink-0 bg-[#0C0E1D] flex -translate-x-32 h-[150px] w-[150px] items-center justify-center  rounded-lg  aspect-square"
							>
								<Image
									className=" shrink-0"
									src={tech.tech.url}
									alt={tech.tech.alt}
									width={tech.tech.dimensions.width}
									height={tech.tech.dimensions.height}
								/>
							</div>
						)
					})}
			</div>
		</section>
	)
}

export default ToolkitSection