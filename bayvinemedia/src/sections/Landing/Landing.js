import React, { useEffect, useRef, useState } from "react"
import "./Landing.scss"
import purplehall from "../../media/purplehall.png"
import garage from "../../media/garage.png"
import Button from "../../components/Button/Button"
import Arrow from "../../components/Arrow/Arrow"
import gsap from "gsap"
import { Link } from "react-scroll"

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
		duration: 1,
		delay: 0.8,
		opacity: 0,
	})
}

const Landing = (props) => {
	let heading = useRef(null)
	let subheading = useRef(null)
	let imageOne = useRef(null)
	let imageTwo = useRef(null)
	const [offsetY, setOffSetY] = useState(0)

	const handleScroll = () => {
		if (window.pageYOffset < 800) {
			setOffSetY(window.pageYOffset)
		} else {
			setOffSetY(0)
		}
	}

	useEffect(() => {
		window.addEventListener("scroll", handleScroll)
		staggerText(heading, subheading)
		fromUpReveal(imageOne)
		fromUpReveal(imageTwo)

		return () => {
			window.removeEventListener("scroll", handleScroll)
		}
	}, [])

	return (
		<section className="landing">
			<div className="img-hover-zoom">
				<img
					ref={(el) => (imageOne = el)}
					className="landing-background-image"
					style={{
						transform: `translateY(-${offsetY * 0.5}px)`,
					}}
					src={purplehall}
					alt="purple hall"
				/>
			</div>

			<img
				ref={(el) => (imageTwo = el)}
				className="landing-garage-image"
				src={garage}
				alt="garage"
				style={{
					transform: `translateY(${offsetY * 0.1}px)`,
				}}
			/>
			<div className="landing-heading">
				<h1 ref={(el) => (heading = el)}>Bay Vine Media</h1>
				<p ref={(el) => (subheading = el)}>
					Inspiring quote about what impact I can deliver to your business.
				</p>
				<Link
					onMouseEnter={() => props.onCursor("hovered")}
					onMouseLeave={props.onCursor}
					to="contact"
					smooth={true}
					offset={-150}
					duration={600}
				>
					<Button
						landing={true}
						className={"green-gradient"}
						text={"HIRE ME"}
					/>
				</Link>
			</div>
			<Arrow offsetY={offsetY} />
		</section>
	)
}

export default Landing
