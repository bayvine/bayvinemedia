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
		delay: 0.3,
		ease: "power3.inOut",
		stagger: {
			amount: 0.3,
		},
	})
}

const Landing = () => {
	let heading = useRef(null)
	let subheading = useRef(null)

	useEffect(() => {
		staggerText(heading, subheading)
	}, [])
	return (
		<section className="landing">
			<img
				className="landing-background-image"
				src={purplehall}
				alt="purple hall"
			/>

			<img className="landing-garage-image" src={garage} alt="garage" />
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
