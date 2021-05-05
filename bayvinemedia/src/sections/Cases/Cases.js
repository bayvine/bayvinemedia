import React, { useEffect, useRef, useState } from "react"
import arrow from "../../media/arrow-down.png"
import CaseCard from "../../components/CaseCard/CaseCard"
import "./Cases.scss"
import { ScrollTrigger } from "gsap/all"
import gsap from "gsap"

gsap.registerPlugin(ScrollTrigger)

const Cases = (props) => {
	let containerToScroll = useRef()
	let bayCases = useRef(null)
	let text = useRef(null)
	let images = useRef(null)

	let pos = {
		left: 0,
		x: 0,
	}
	// const [pos, setPos] = useState({
	// 	left: 0,
	// 	x: 0,
	// })

	useEffect(() => {
		gsap.from(images.current, {
			scrollTrigger: {
				trigger: bayCases.current,
				start: "top center",
				toggleActions: "play none none none",
			},
			opacity: 0,
			x: -100,
			duration: 1,
		})

		gsap.from(text.current, {
			scrollTrigger: {
				trigger: bayCases.current,
				start: "top center",
				toggleActions: "play none none none",
			},
			opacity: 0,
			delay: 1,
			duration: 3,
		})

		// gsap.from(text, {
		// 	scrollTrigger: {
		// 		trigger: text,
		// 		start: "top center",
		// 		toggleActions: "play none none none",
		// 	},
		// 	opacity: 0,
		// 	duration: 0.8,
		// })

		if (containerToScroll && containerToScroll.current) {
			containerToScroll.current.addEventListener("mousedown", mouseDownHandler)

			return function cleanup() {
				containerToScroll.current.removeEventListener(
					"mousedown",
					mouseDownHandler
				)
			}
		}
	}, [])

	const mouseDownHandler = (e) => {
		pos = {
			left: containerToScroll.current.scrollLeft,
			x: e.clientX,
		}

		document.addEventListener("mousemove", moveHandler)
		document.addEventListener("mouseup", moveOutHandler)
	}
	const moveHandler = (e) => {
		containerToScroll.current.style.cursor = "grabbing"
		containerToScroll.current.style.userSelect = "none"
		const dx = e.clientX - pos.x
		containerToScroll.current.scrollLeft = pos.left - dx
	}

	const moveOutHandler = (e) => {
		containerToScroll.current.style.cursor = "grab"
		containerToScroll.current.style.removeProperty("user-select")
		document.removeEventListener("mousemove", moveHandler)
		document.removeEventListener("mouseup", moveOutHandler)
	}

	const moveImagesRight = () => {
		containerToScroll.current.scrollLeft += 400
	}

	const moveImagesLeft = () => {
		containerToScroll.current.scrollLeft -= 400
	}
	return (
		<section className="bay-cases">
			<div className="bay-cases-text" ref={bayCases}>
				<div className="bay-cases-text-container" ref={text}>
					<h1>A fine selection of client cases</h1>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem
						erat, consequat viverra tempus et, porttitor id ante. Proin vel ante
						nec risus commodo dictum sit amet vel ex. Sed erat neque, efficitur
						at dignissim ac, tempus sit amet turpis. Sed erat neque, efficitur
						at dignissim ac, tempus sit amet turpis. Sed erat neque, efficitur
						at dignissim ac, tempus sit amet turpis. Lorem ipsum dolor sit amet,
						consectetur adipiscing elit. Sed lorem erat, consequat viverra
						tempus et, porttitor id ante. Proin vel ante nec risus commodo
						dictum sit amet vel ex. Sed erat neque, efficitur at dignissim ac,
						tempus sit amet turpis. Sed erat neque, efficitur at dignissim ac,
						tempus sit amet turpis. Lorem ipsum dolor sit amet, consectetur
						adipiscing elit. Sed lorem erat, consequat viverra tempus et,
						porttitor id ante. Proin vel ante nec risus commodo dictum sit amet
						vel ex. Sed erat neque, efficitur at dignissim ac, tempus sit amet
						turpis. Sed erat neque, efficitur at dignissim ac, tempus sit amet
						turpis.
					</p>
				</div>
			</div>
			<div className="bay-cases-cases" ref={containerToScroll}>
				<div className="scrollable" ref={images}>
					<CaseCard />
					<CaseCard />
					<CaseCard />
					<CaseCard />
				</div>
			</div>
			<div
				className="arrows"
				onMouseEnter={() => props.onCursor("hovered")}
				onMouseLeave={() => props.onCursor("")}
			>
				<img
					role="button"
					width="30"
					alt=""
					onClick={moveImagesLeft}
					src={arrow}
				></img>
				<img
					role="button"
					width="30"
					alt=""
					onClick={moveImagesRight}
					src={arrow}
				></img>
			</div>
		</section>
	)
}

export default Cases
