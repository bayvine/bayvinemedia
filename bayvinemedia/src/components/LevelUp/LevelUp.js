import React, { useEffect, useRef } from "react"
import Button from "../Button/Button"
// import image from "../../media/phones.png"
import { ScrollTrigger } from "gsap/all"
import gsap from "gsap"

const LevelUp = () => {
	gsap.registerPlugin(ScrollTrigger)
	let block = useRef(null)
	useEffect(() => {
		gsap.from(block, {
			scrollTrigger: {
				trigger: block,
				start: "top center",
				toggleActions: "play none none none",
			},
			opacity: 0,
			x: 200,
			duration: 1,
		})
	}, [])
	return (
		<div ref={(el) => (block = el)} className="level-up-today">
			<div className="level-up-box">
				<div className="level-up-text">
					<h1>Level up today!</h1>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem
						erat, consequat viverra tempus et, porttitor id ante. Proin vel ante
						nec risus commodo dictum sit amet vel ex. Sed erat neque, efficitur
						at dignissim ac, tempus sit amet turpis.{" "}
					</p>
				</div>
				<div className="level-up-buttons">
					<Button className={"blue-gradient"} text={"LET'S CHAT"} />
					<Button className={"pink-gradient"} text={"SEE CASES"} />
				</div>
			</div>
			<div className="level-up-image"></div>
		</div>
	)
}

export default LevelUp
