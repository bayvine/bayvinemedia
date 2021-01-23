import React from "react"
import "./Landing.scss"
import purplehall from "../../media/purplehall.png"
import garage from "../../media/garage.png"
import Button from "../../components/Button/Button"
import Arrow from "../../components/Arrow/Arrow"

const Landing = () => {
	return (
		<section className="landing">
			<img
				className="landing-background-image"
				src={purplehall}
				alt="purple hall"
			/>

			<img className="landing-garage-image" src={garage} alt="garage" />
			<div className="landing-heading">
				<h1>Bay Vine Media</h1>
				<p>Inspiring quote about what impact I can deliver to your business.</p>
				<Button className={"green-gradient"} text={"HIRE ME"} />
			</div>
			<Arrow />
		</section>
	)
}

export default Landing
