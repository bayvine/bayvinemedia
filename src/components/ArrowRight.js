import clsx from "clsx"
import React from "react"

const ArrowRight = ({ className }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className={clsx(["w-6 h-6", className])}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
			/>
		</svg>
	)
}

export default ArrowRight
