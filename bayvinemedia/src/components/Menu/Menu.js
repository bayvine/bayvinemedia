import React, { useState } from "react"
import "./Menu.scss"

const Menu = (props) => {
	let attachedClasses = ["menu", "closed"]
	let attachedClasses1 = ["menu2", "closed"]
	let attachedClasses2 = ["menu3", "closed"]

	let [currentImage, setcurrentImage] = useState("")

	if (props.show) {
		attachedClasses = ["menu", "open"]
		attachedClasses1 = ["menu2", "open"]
		attachedClasses2 = ["menu3", "open"]
	}

	return (
		<>
			<div className={attachedClasses.join(" ")}>
				<div className="menu-items">
					<ul>
						<li>
							<h1>About</h1>
						</li>
						<li>
							<h1>Services</h1>
						</li>
						<li>
							<h1>Reviews</h1>
						</li>
						<li>
							<h1>Contact Me</h1>
						</li>
					</ul>
				</div>
			</div>
			<div className={attachedClasses1.join(" ")}></div>
			<div className={attachedClasses2.join(" ")}></div>
		</>
	)
}

export default Menu
