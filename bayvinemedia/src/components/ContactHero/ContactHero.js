import React from "react"
import "./ContactHero.scss"
import bridge from "../../media/bridge.webp"

const ContactHero = () => {
	return (
		<div className="contact-hero">
			<img src={bridge} alt="golden gate bridge" />
			<h1>Enough, let's chat!</h1>
		</div>
	)
}

export default ContactHero
