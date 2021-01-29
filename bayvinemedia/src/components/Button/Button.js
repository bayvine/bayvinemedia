import React, { useEffect, useRef } from "react"
import "./Button.scss"
import gsap from "gsap"

export const showButton = (node1) => {
	gsap.from(node1, {
		duration: 0.8,
		opacity: 0,
		x: -100,
		delay: 1,
		ease: "power3.inOut",
	})
}

const Button = ({ clicked, className, text, landing }) => {
	let landingref = useRef(null)

	useEffect(() => {
		if (landing) {
			showButton(landingref)
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
