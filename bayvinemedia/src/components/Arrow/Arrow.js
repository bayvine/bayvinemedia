import React from "react"
import arrow from "../../media/arrow-down.png"
import "./Arrow.scss"

const Arrow = () => {
	return (
		<div className="arrow">
			<img className="arrow-down" draggable="false" src={arrow} alt="arrow" />
			<span>READ MORE</span>
		</div>
	)
}

export default Arrow
