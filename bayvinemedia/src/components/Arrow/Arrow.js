import React from "react"
import arrow from "../../media/arrow-down.png"
import "./Arrow.scss"

const Arrow = () => {
	return (
		<img className="arrow-down" draggable="false" src={arrow} alt="arrow" />
	)
}

export default Arrow
