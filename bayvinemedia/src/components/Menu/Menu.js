import React from "react"
import "./Menu.scss"

const Menu = (props) => {
	let attachedClasses = ["menu", "closed"]

	if (props.show) {
		attachedClasses = ["menu", "open"]
	}

	return (
		<div className={attachedClasses.join(" ")}>
			<div onClick={props.clicked}>hi</div>
		</div>
	)
}

export default Menu
