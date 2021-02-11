import React, { useEffect, useRef } from "react"
import "./BasedIn.scss"
import rotterdam from "../../media/rotterdam.webp"
import sanfran from "../../media/san-fran.webp"
import { ScrollTrigger } from "gsap/all"
import gsap from "gsap"

const BasedIn = () => {
	gsap.registerPlugin(ScrollTrigger)

	let ImageOne = useRef(null)
	let ImageTwo = useRef(null)
	let text = useRef(null)

	useEffect(() => {
		gsap.from([text.childNodes[0], text.childNodes[1], text.childNodes[2]], {
			scrollTrigger: {
				trigger: text,
				start: "top center",
				toggleActions: "play none none none",
			},
			opacity: 0,

			y: 500,
			stagger: 0.6,
			duration: 1,
		})

		gsap.from(ImageOne, {
			scrollTrigger: {
				trigger: ImageOne,
				start: "top center",
				toggleActions: "play none none none",
			},
			opacity: 0,
			x: -500,
			duration: 1.2,
		})

		gsap.from(ImageTwo, {
			scrollTrigger: {
				trigger: ImageOne,
				start: "top center",
				toggleActions: "play none none none",
			},
			opacity: 0,
			x: 600,
			duration: 0.8,
		})
	}, [])

	return (
		<div className="based-in">
			<div className="san-francisco-picture">
				<img ref={(el) => (ImageOne = el)} src={sanfran} alt="san francisco" />
			</div>
			<div className="rotterdam-picture-with-text">
				<div ref={(el) => (text = el)}>
					<span>Based in</span>
					<h1>Bay Area.</h1>
					<h1>Rotterdam.</h1>
				</div>
				<img ref={(el) => (ImageTwo = el)} src={rotterdam} alt="rotterdam" />
			</div>
		</div>
	)
}

export default BasedIn
