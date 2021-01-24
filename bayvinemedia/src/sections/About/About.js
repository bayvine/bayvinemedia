import React from "react"
import Button from "../../components/Button/Button"
import "./About.scss"

const About = () => {
	return (
		<section className="about">
			<div className="about-me-block">
				<div className="about-me-text">
					<h3>Hey there,</h3>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem
						erat, consequat viverra tempus et, porttitor id ante. Proin vel ante
						nec risus commodo dictum sit amet vel ex. Sed erat neque, efficitur
						at dignissim ac, tempus sit amet turpis. Sed accumsan tempor lacus.
						Class aptent taciti sociosqu ad litora torquent per conubia nostra,
						per inceptos himenaeos. Sed in venenatis arcu.
					</p>
					<div className="about-text-buttons">
						<Button className={"yellow-gradient"} text={"CASES"} />
						<Button className={"pink-gradient"} text={"SERVICES"} />
					</div>
				</div>
				<div className="about-profile">
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
