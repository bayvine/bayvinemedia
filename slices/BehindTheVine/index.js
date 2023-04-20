import React from "react"
import { PrismicLink, PrismicRichText } from "@prismicio/react"
import * as prismicH from "@prismicio/helpers"
import ArrowUpRight from "@/components/ArrowUpRight"
import useIsMobile from "@/helpers/useIsMobile"

/**
 * @typedef {import("@prismicio/client").Content.BehindTheVineSlice} BehindTheVineSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<BehindTheVineSlice>} BehindTheVineProps
 * @param { BehindTheVineProps }
 */
const BehindTheVine = ({ slice }) => {
	const isMobile = useIsMobile()

	return (
		<section className="relative text-white py-14 2xl:my-20">
			<div className="relative z-10 px-5 sm:px-10 md:px-14 lg:max-w-4xl lg:mx-auto lg:px-0 2xl:max-w-screen-2xl 2xl:px-20">
				<h3 className="text-4xl font-bold">
					{prismicH.asText(slice.primary.title)}
				</h3>
				<p className="mt-4 lg:max-w-2xl">
					{prismicH.asText(slice.primary.description)}
				</p>
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
				className="absolute top-0 left-0 hidden object-cover w-full h-full 2xl:block "
			/>
		</section>
	)
}

export default BehindTheVine
