import React, { useEffect, useRef } from "react"
import arrow from "../../media/arrow-down.png"
import "./Arrow.scss"
import gsap from "gsap"
import { Link } from "react-scroll"

const reveal = (node) => {
	gsap.from([node], {
		opacity: 0,
		delay: 1,
		y: -100,
		duration: 0.4,
	})
}

const text = (node) => {
	gsap.from(node, {
		opacity: 0,
		delay: 1.2,
		x: 0.1,
		duration: 0.2,
	})
}

const Arrow = (props) => {
	let reference = useRef(null)
	let letters = useRef(null)

	useEffect(() => {
		if (reference) {
			gsap.from([reference], {
				opacity: 0,
				delay: 1,
				y: -100,
				duration: 0.4,
			})

			gsap.from(letters, {
				opacity: 0,
				delay: 1.2,
				x: 0.1,
				duration: 0.2,
			})
			// reveal(reference)
			// text(letters)
		}
	}, [])

	const handleArrowIn = () => {
		gsap.to([reference], {
			y: 20,
		})
	}

	const handleArrowOut = () => {
		gsap.to([reference], {
			y: 0,
		})
	}
	return (
		<Link to="about" smooth={true} offset={-150} duration={600}>
			<div
				style={{
					transform: `translateY(-${props.offsetY * 0.4}px)`,
				}}
				className="arrow"
			>
				<img
					onMouseEnter={handleArrowIn}
					onMouseLeave={handleArrowOut}
					ref={(el) => (reference = el)}
					className="arrow-down"
					draggable="false"
					src={arrow}
					alt="arrow"
				/>
				<span ref={(el) => (letters = el)}>READ MORE</span>
			</div>
		</Link>
	)
}

export default Arrow
