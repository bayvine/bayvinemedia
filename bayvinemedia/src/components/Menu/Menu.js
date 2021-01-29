import React, { useState, useRef, useEffect } from "react"
import "./Menu.scss"
import sanfran from "../../media/menubackgroundsan.png"
import statue from "../../media/statue.jpg"
import beach from "../../media/beach.jpg"
import together from "../../media/together.jpg"
import gsap from "gsap"

export const staggerText = (node1, node2, node3, node4) => {
	gsap.from([node1, node2, node3, node4], {
		duration: 0.8,
		opacity: 0,
		y: 100,
		delay: 0.3,
		ease: "power3.inOut",
		stagger: {
			amount: 0.3,
		},
	})
}

const Menu = (props) => {
	let attachedClasses = ["menu", "closed"]
	let attachedClasses1 = ["menu2", "closed"]
	let attachedClasses2 = ["menu3", "closed"]
	let mainmenu = useRef(null)
	let mainmenubackground = useRef(null)
	let line1 = useRef(null)
	let line2 = useRef(null)
	let line3 = useRef(null)
	let line4 = useRef(null)

	let imageClass = ""

	let [currentImage, setcurrentImage] = useState("")

	if (props.show) {
		attachedClasses = ["menu", "open"]
		attachedClasses1 = ["menu2", "open"]
	}

	const backgroundHandler = (image) => {
		setcurrentImage(image)
		// handleCity(imageSelector)
		imageClass = "kenburn"

		console.log(imageClass)
	}

	useEffect(() => {
		if (props.show) {
			staggerText(line1, line2, line3, line4)
		}
		console.log("hi")
	}, [props])

	const resetImage = () => {
		imageClass = ""
		// handleCityOut(imageSelector)
		setcurrentImage("")
		console.log(imageClass)
	}

	return (
		<>
			<div ref={(el) => (mainmenu = el)} className={attachedClasses.join(" ")}>
				<div className="menu-items">
					<ul>
						<li>
							<h1
								ref={(el) => (line1 = el)}
								onMouseLeave={resetImage}
								onMouseOver={() => backgroundHandler(sanfran)}
							>
								About
							</h1>
						</li>
						<li>
							<h1
								ref={(el) => (line2 = el)}
								onMouseLeave={resetImage}
								onMouseOver={() => backgroundHandler(statue)}
							>
								Services
							</h1>
						</li>
						<li>
							<h1
								ref={(el) => (line3 = el)}
								onMouseLeave={resetImage}
								onMouseOver={() => backgroundHandler(beach)}
							>
								Reviews
							</h1>
						</li>
						<li>
							<h1
								ref={(el) => (line4 = el)}
								onMouseLeave={resetImage}
								onMouseOver={() => backgroundHandler(together)}
							>
								Contact Me
							</h1>
						</li>
					</ul>
				</div>

				<img className={imageClass} src={currentImage} alt="" />
			</div>
			<div
				ref={(el) => (mainmenubackground = el)}
				className={attachedClasses1.join(" ")}
			></div>
		</>
	)
}

export default Menu
