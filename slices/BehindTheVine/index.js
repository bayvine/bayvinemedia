import React from "react"
import { PrismicLink, PrismicRichText } from "@prismicio/react"
import * as prismicH from "@prismicio/helpers"
import ArrowUpRight from "@/components/ArrowUpRight"

/**
 * @typedef {import("@prismicio/client").Content.BehindTheVineSlice} BehindTheVineSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<BehindTheVineSlice>} BehindTheVineProps
 * @param { BehindTheVineProps }
 */
const BehindTheVine = ({ slice }) => {
	return (
		<section className="relative py-24 my-5 text-white">
			<div className="relative z-10 px-5">
				<h3 className="text-4xl font-bold">
					{prismicH.asText(slice.primary.title)}
				</h3>
				<p className="mt-4">{prismicH.asText(slice.primary.description)}</p>
				<div className="mt-8">
					<button className="px-8 py-2 uppercase bg-white rounded-md text-bold">
						<PrismicLink
							href={slice.primary.link.url}
							className="flex items-center font-black text-black"
						>
							Visit site <ArrowUpRight />
						</PrismicLink>
					</button>
				</div>
			</div>
			<img
				src={slice.primary.background_image.url}
				className="absolute top-0 left-0 object-cover w-full h-full "
			/>
		</section>
	)
}

export default BehindTheVine
