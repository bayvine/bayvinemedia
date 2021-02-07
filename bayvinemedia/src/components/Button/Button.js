import React, { useEffect, useRef } from "react"
import "./Button.scss"
import gsap from "gsap"

export const showButton = (node1) => {}

const Button = ({ clicked, className, text, landing }) => {
	let landingref = useRef(null)

	useEffect(() => {
		if (landing) {
			gsap.from(landingref, {
				autoAlpha: 0,
				duration: 0.8,
				opacity: 0,
				x: -100,
				delay: 1,
			})
		}
	}, [landing])

	return (
		<button
			ref={(el) => (landingref = el)}
			onClick={clicked}
			className={className}
		>
			{text}
		</button>
	)
}

export default Button
