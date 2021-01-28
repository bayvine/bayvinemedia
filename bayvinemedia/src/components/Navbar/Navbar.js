import React, { useEffect } from "react"
import Menu from "../Menu/Menu"
import "./Navbar.scss"

const Navbar = (props) => {
	let userHasScrolled = false
	let classes = "hamburger-menu"

	let [attribute, setattribute] = React.useState("")
	let [handler, setHandler] = React.useState(false)

	function handleScroll(e) {
		if (window.scrollY > 100) {
			userHasScrolled = true
		} else {
			userHasScrolled = false
		}

		if (userHasScrolled) {
			setattribute("scrolled")
		} else {
			setattribute("")
		}
	}

	if (handler) {
		classes = "hamburger-menu hamburger-close"
	}

	function hamburgerHandler() {
		props.clicked()
		setHandler((prevstate) => !prevstate)
	}

	React.useEffect(() => {
		window.addEventListener("scroll", (e) => handleScroll(e))
	}, [])

	return (
		<>
			<nav className={attribute}>
				{/* logo */}
				<div className="logo"></div>

				{/* hamburger menu */}
				<div className={classes} onClick={hamburgerHandler}>
					<span></span>
					<span></span>
					<span></span>
				</div>
			</nav>
		</>
	)
}

export default Navbar
