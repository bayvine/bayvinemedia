import React from "react"
import "./Service.scss"

const Service = ({ image, title, text, onCursor }) => {
	const handleCursor = () => {
		if (title === "Digital Art") {
			onCursor("image-one")
		} else if (title === "UX/UI") {
			onCursor("image-two")
		} else if (title === "Responsive Web Solutions") {
			onCursor("image-three")
		} else if (title === "Logo Design") {
			onCursor("image-four")
		}
	}
	return (
		<div className="service">
			<img src={image} alt="service" />
			<div>
				<h3 onMouseEnter={handleCursor} onMouseLeave={onCursor}>
					{title}
				</h3>
				<p>{text}</p>
			</div>
		</div>
	)
}

export default Service
