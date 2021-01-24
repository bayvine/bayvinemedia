import React, { useEffect } from "react"
import "./Navbar.scss"

const Navbar = () => {
	let userHasScrolled = false

	let [attribute, setattribute] = React.useState("")

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

	React.useEffect(() => {
		window.addEventListener("scroll", (e) => handleScroll(e))
	}, [])

	return (
		<nav className={attribute}>
			{/* logo */}
			<div className="logo"></div>
			{/* hamburger menu */}
			<div className="hamburger-menu">
				<span></span>
				<span></span>
				<span></span>
			</div>
		</nav>
	)
}

export default Navbar
