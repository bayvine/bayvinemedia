import React, { useEffect, useRef } from "react"
import ReviewCard from "../../components/ReviewCard/ReviewCard"
import "./Reviews.scss"
import { ScrollTrigger } from "gsap/all"
import gsap from "gsap"

const Reviews = () => {
	gsap.registerPlugin(ScrollTrigger)

	let backgroundCharacters = useRef(null)
	let title = useRef(null)
	let cards = useRef(null)

	useEffect(() => {
		gsap.from([backgroundCharacters.childNodes[0]], {
			scrollTrigger: {
				trigger: backgroundCharacters,
				start: "top center",
				scrub: true,
				toggleActions: "play none none none",
			},
			opacity: 0,
			delay: 6,
			x: 100,
			stagger: 0.5,
			duration: 0.8,
		})

		gsap.from([backgroundCharacters.childNodes[1]], {
			scrollTrigger: {
				trigger: backgroundCharacters,
				start: "top center",
				scrub: true,
				toggleActions: "play none none none",
			},
			opacity: 0,
			delay: 6,
			x: -100,
			stagger: 0.5,
			duration: 0.8,
		})

		gsap.from([backgroundCharacters.childNodes[2]], {
			scrollTrigger: {
				trigger: backgroundCharacters,
				start: "top center",
				scrub: true,
				toggleActions: "play none none none",
			},
			opacity: 0,
			delay: 6,
			x: 300,
			stagger: 0.5,
			duration: 0.8,
		})

		gsap.from(title, {
			scrollTrigger: {
				trigger: title,
				start: "top center",
				toggleActions: "play none none none",
			},
			opacity: 0,
			duration: 2,
		})

		gsap.from(
			[
				cards.childNodes[0],
				cards.childNodes[1],
				cards.childNodes[2],
				cards.childNodes[3],
			],
			{
				scrollTrigger: {
					trigger: cards,
					start: "top center",
					toggleActions: "play none none none",
				},
				opacity: 0,
				delay: 6,
				y: 500,
				stagger: 0.2,
				duration: 0.8,
			}
		)
	}, [])

	return (
		<section className="reviews">
			<div className="reviews-heading" ref={(el) => (title = el)}>
				<h1>Trusted and loved</h1>
				<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
			</div>
			<div className="reviews-cards" ref={(el) => (cards = el)}>
				<ReviewCard color="orange" />
				<ReviewCard color="blue" />
				<ReviewCard color="green" />
			</div>
			<div
				ref={(el) => (backgroundCharacters = el)}
				className="background-letters"
			>
				<h1 className="background">USER CENTERED</h1>
				<h1 className="background">CREATIVITY</h1>
				<h1 className="background">EMPATHY</h1>
			</div>
		</section>
	)
}

export default Reviews
