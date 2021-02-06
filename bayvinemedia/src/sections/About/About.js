import React, { useEffect, useRef } from "react"
import Button from "../../components/Button/Button"
import "./About.scss"
import { ScrollTrigger } from "gsap/all"
import gsap from "gsap"

// when mouse hovers in this block, make it black;

const About = (props) => {
	gsap.registerPlugin(ScrollTrigger)
	let aboutBlock = useRef(null)
	let aboutText = useRef(null)
	let aboutProfile = useRef(null)

	useEffect(() => {
		if (aboutBlock) {
			gsap.from(aboutBlock, {
				scrollTrigger: {
					trigger: aboutBlock,
					start: "top center",
					toggleActions: "play none none none",
				},
				opacity: 0,
				duration: 0.8,
				x: 200,
			})

			gsap.from(
				[
					aboutText.childNodes[0],
					aboutText.childNodes[1],
					aboutText.childNodes[2],
				],
				{
					scrollTrigger: {
						trigger: aboutBlock,
						start: "top center",
						toggleActions: "play none none none",
					},
					opacity: 0,
					stagger: 0.2,
					y: 50,
				}
			)

			gsap.from([aboutProfile.childNodes[0], aboutProfile.childNodes[1]], {
				scrollTrigger: {
					trigger: aboutBlock,
					start: "top center",
					toggleActions: "play none none none",
				},
				opacity: 0,
				delay: 6,
				x: -100,
				duration: 0.8,
			})
		}
	}, [])

	return (
		<section className="about">
			<div
				onMouseEnter={() => props.onCursor("contrast")}
				onMouseLeave={props.onCursor}
				ref={(el) => (aboutBlock = el)}
				className="about-me-block"
			>
				<div ref={(el) => (aboutText = el)} className="about-me-text">
					<h3>Hey there,</h3>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem
						erat, consequat viverra tempus et, porttitor id ante. Proin vel ante
						nec risus commodo dictum sit amet vel ex. Sed erat neque, efficitur
						at dignissim ac, tempus sit amet turpis. Sed accumsan tempor lacus.
						Class aptent taciti sociosqu ad litora torquent per conubia nostra,
						per inceptos himenaeos. Sed in venenatis arcu.
					</p>
					<div
						onMouseEnter={() => props.onCursor("hovered-contrast")}
						onMouseLeave={() => props.onCursor("contrast")}
						className="about-text-buttons"
					>
						<Button className={"yellow-gradient"} text={"CASES"} />
						<Button className={"pink-gradient"} text={"SERVICES"} />
					</div>
				</div>
				<div ref={(el) => (aboutProfile = el)} className="about-profile">
					<div className="about-image"></div>
					<div className="about-links">
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default About
