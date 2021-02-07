import React, { useState, useRef, useEffect } from "react"
import "./Menu.scss"
import sanfran from "../../media/menubackgroundsan.png"
import statue from "../../media/statue.jpg"
import beach from "../../media/beach.jpg"
import together from "../../media/together.jpg"
import gsap from "gsap"
import { Link } from "react-scroll"

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
	let line1 = useRef(null)
	let line2 = useRef(null)
	let line3 = useRef(null)
	let line4 = useRef(null)

	let [currentImage, setcurrentImage] = useState("")
	let [currentImageClass, setCurrentImageClass] = useState("")

	if (props.show) {
		attachedClasses = ["menu", "open"]
		attachedClasses1 = ["menu2", "open"]
	}

	const backgroundHandler = (image) => {
		setcurrentImage(image)
		// handleCity(imageSelector)
		setCurrentImageClass("kenburn")
	}

	useEffect(() => {
		if (props.show) {
			staggerText(line1, line2, line3, line4)
		}
	}, [props.show])

	const resetImage = () => {
		// handleCityOut(imageSelector)
		setCurrentImageClass("")
		setcurrentImage("")
	}

	return (
		<>
			<div className={attachedClasses.join(" ")}>
				<div className="menu-items">
					<ul>
						<li>
							<Link to="about" smooth={true} offset={-150} duration={600}>
								<h1
									ref={(el) => (line1 = el)}
									onMouseLeave={resetImage}
									onMouseOver={() => backgroundHandler(sanfran)}
									onClick={() => props.clicked()}
								>
									About
								</h1>
							</Link>
						</li>
						<li>
							<h1
								ref={(el) => (line2 = el)}
								onMouseLeave={resetImage}
								onMouseOver={() => backgroundHandler(statue)}
								onClick={props.clicked}
							>
								Services
							</h1>
						</li>
						<li>
							<h1
								ref={(el) => (line3 = el)}
								onMouseLeave={resetImage}
								onMouseOver={() => backgroundHandler(beach)}
								onClick={props.clicked}
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

				<img className={currentImageClass} src={currentImage} alt="" />
			</div>
			<div className={attachedClasses1.join(" ")}></div>
		</>
	)
}

export default Menu
