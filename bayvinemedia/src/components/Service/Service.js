import React from "react"
import "./Service.scss"

const Service = ({ image, title, text }) => {
	return (
		<div className="service">
			<img src={image} alt="service" />
			<div>
				<h3>{title}</h3>
				<p>{text}</p>
			</div>
		</div>
	)
}

export default Service
