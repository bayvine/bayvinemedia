import React, { useEffect, useRef, useState } from "react"
import "./Services.scss"
import palmtree from "../../media/palm-tree.webp"
import Service from "../../components/Service/Service"
import { ScrollTrigger } from "gsap/all"
import gsap from "gsap"

// images
import s1 from "../../media/Group 16.webp"
import s2 from "../../media/Group 17.webp"
import s3 from "../../media/Group 18.webp"
import s4 from "../../media/Group 19.webp"

const Services = (props) => {
	gsap.registerPlugin(ScrollTrigger)

	let services = useRef(null)
	let title = useRef(null)
	let theImage = useRef(null)

	useEffect(() => {
		gsap.from(
			[
				services.childNodes[0],
				services.childNodes[1],
				services.childNodes[2],
				services.childNodes[3],
			],
			{
				scrollTrigger: {
					trigger: services,
					start: "top center",
					toggleActions: "play none none none",
				},
				opacity: 0,
				delay: 6,
				x: 100,
				stagger: 0.5,
				duration: 0.8,
			}
		)

		gsap.from(title, {
			scrollTrigger: {
				trigger: title,
				start: "top center",
				toggleActions: "play none none none",
			},
			opacity: 0,
			duration: 0.8,
		})

		gsap.from(theImage, {
			scrollTrigger: {
				trigger: theImage,
				start: "top center",
				toggleActions: "play none none none",
			},
			opacity: 0,
			y: 200,
			duration: 0.8,
		})
	}, [])

	return (
		<section className="services">
			<h1 ref={(el) => (title = el)}>Tailored to your needs.</h1>
			<div ref={(el) => (theImage = el)} className="services-block">
				<div className="images"></div>
				<div className="services-text-block" ref={(el) => (services = el)}>
					<Service
						onCursor={props.onCursor}
						image={s1}
						title="Digital Art"
						text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem erat, consequat viverra tempus et, porttitor id ante. Proin vel ante nec risus commodo dictum sit amet vel ex. Sed erat neque, efficitur at dignissim ac, tempus sit amet turpis."
					/>
					<Service
						onCursor={props.onCursor}
						image={s2}
						title="UX/UI"
						text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem erat, consequat viverra tempus et, porttitor id ante. Proin vel ante nec risus commodo dictum sit amet vel ex. Sed erat neque, efficitur at dignissim ac, tempus sit amet turpis."
					/>
					<Service
						image={s3}
						onCursor={props.onCursor}
						title="Responsive Web Solutions"
						text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem erat, consequat viverra tempus et, porttitor id ante. Proin vel ante nec risus commodo dictum sit amet vel ex. Sed erat neque, efficitur at dignissim ac, tempus sit amet turpis."
					/>
					<Service
						image={s4}
						onCursor={props.onCursor}
						title="Logo Design"
						text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem erat, consequat viverra tempus et, porttitor id ante. Proin vel ante nec risus commodo dictum sit amet vel ex. Sed erat neque, efficitur at dignissim ac, tempus sit amet turpis."
					/>
				</div>
			</div>
		</section>
	)
}

export default Services
