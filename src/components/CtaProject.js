import { useIsomorphicLayoutEffect } from "@/helpers/useIsomorphicLayoutEffect"
import gsap from "gsap"
import React, { useRef, useState } from "react"

const CtaProject = () => {
	const head = useRef()
	const contentBox = useRef()
	const currentSection = useState(0)

	useIsomorphicLayoutEffect(() => {
		const sections = gsap.utils.toArray(".heading")
	}, [])

	const words = [
		"The digital landscape is growing",
		"Be part of it",
		"Ready to join the list?",
	]
	return (
		<div ref={head} className="flex justify-around h-screen">
			<section
				ref={contentBox}
				className="relative flex items-center justify-center w-full"
			>
				{words.map((item, index) => (
					<h2
						key={index}
						className="absolute flex items-center justify-center h-screen text-xl text-white heading"
					>
						{item}
					</h2>
				))}
			</section>
		</div>
	)
}

export default CtaProject
