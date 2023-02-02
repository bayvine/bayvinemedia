import React from "react"
import ArrowRight from "./ArrowRight"

const ScrollForMore = ({ className, target }) => {
	return (
		<button
			onClick={() => {
				const contentToScroll = document.querySelector(target)
				contentToScroll.scrollLeft += 250
			}}
			className="flex items-center gap-2 my-5 text-white opacity-30"
		>
			<span className="inline-block">Scroll for all our services</span>
			<ArrowRight />
		</button>
	)
}

export default ScrollForMore
