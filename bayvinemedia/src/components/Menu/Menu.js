import React, { useState } from "react"
import "./Menu.scss"
import sanfran from "../../media/menubackgroundsan.png"
import statue from "../../media/statue.jpg"
import beach from "../../media/beach.jpg"
import together from "../../media/together.jpg"

const Menu = (props) => {
	let attachedClasses = ["menu", "closed"]
	let attachedClasses1 = ["menu2", "closed"]
	let attachedClasses2 = ["menu3", "closed"]
	let imageClass = ""

	let [currentImage, setcurrentImage] = useState("")

	if (props.show) {
		attachedClasses = ["menu", "open"]
		attachedClasses1 = ["menu2", "open"]
		attachedClasses2 = ["menu3", "open"]
	}

	const backgroundHandler = (image) => {
		setcurrentImage(image)
		imageClass = "kenburn"
	}

	const resetImage = () => {
		imageClass = ""
		setcurrentImage("")
	}

	return (
		<>
			<div className={attachedClasses.join(" ")}>
				<div className="menu-items">
					<ul>
						<li>
							<h1
								onMouseLeave={resetImage}
								onMouseOver={() => backgroundHandler(sanfran)}
							>
								About
							</h1>
						</li>
						<li>
							<h1
								onMouseLeave={resetImage}
								onMouseOver={() => backgroundHandler(statue)}
							>
								Services
							</h1>
						</li>
						<li>
							<h1
								onMouseLeave={resetImage}
								onMouseOver={() => backgroundHandler(beach)}
							>
								Reviews
							</h1>
						</li>
						<li>
							<h1
								onMouseLeave={resetImage}
								onMouseOver={() => backgroundHandler(together)}
							>
								Contact Me
							</h1>
						</li>
					</ul>
				</div>

				<img className={imageClass} src={currentImage} />
			</div>
			<div className={attachedClasses1.join(" ")}></div>
			<div className={attachedClasses2.join(" ")}></div>
		</>
	)
}

export default Menu
