import React, { useEffect, useRef } from "react"
import "./Landing.scss"
import purplehall from "../../media/purplehall.png"
import garage from "../../media/garage.png"
import Button from "../../components/Button/Button"
import Arrow from "../../components/Arrow/Arrow"
import gsap from "gsap"

export const staggerText = (node1, node2) => {
	gsap.from([node1, node2], {
		duration: 0.8,
		opacity: 0,
		y: 100,
		ease: "power3.in",
		stagger: {
			amount: 0.3,
		},
	})
}

export const fromUpReveal = (node1) => {
	gsap.from(node1, {
		duration: 0.3,
		y: -100,
		opacity: 0,
		ease: "power2.in",
	})
}

const Landing = () => {
	let heading = useRef(null)
	let subheading = useRef(null)
	let imageOne = useRef(null)
	let imageTwo = useRef(null)

	useEffect(() => {
		staggerText(heading, subheading)
		fromUpReveal(imageOne)
		fromUpReveal(imageTwo)
	}, [])
	return (
		<section className="landing">
			<div class="img-hover-zoom">
				<img
					ref={(el) => (imageOne = el)}
					className="landing-background-image"
					src={purplehall}
					alt="purple hall"
				/>
			</div>

			<img
				ref={(el) => (imageTwo = el)}
				className="landing-garage-image"
				src={garage}
				alt="garage"
			/>
			<div className="landing-heading">
				<h1 ref={(el) => (heading = el)}>Bay Vine Media</h1>
				<p ref={(el) => (subheading = el)}>
					Inspiring quote about what impact I can deliver to your business.
				</p>
				<Button landing={true} className={"green-gradient"} text={"HIRE ME"} />
			</div>
			<Arrow />
		</section>
	)
}

export default Landing
