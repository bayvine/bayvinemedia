import React, { useEffect, useRef } from "react"
import "./Navbar.scss"
import gsap from "gsap"

const Navbar = (props) => {
	let userHasScrolled = false
	let classes = "hamburger-menu"
	let navigation = useRef(null)
	let [attribute, setattribute] = React.useState("")
	let [handler, setHandler] = React.useState(false)

	const reveal = (node) => {
		gsap.from([node], {
			y: -100,
			delay: 0.2,
			opacity: 0,
			duration: 1,
			ease: "expo.out",
		})
	}

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
		if (navigation.current) {
			reveal(navigation.current)
		}
	}, [])

	//onCursor
	return (
		<nav ref={navigation} className={attribute}>
			{/* logo */}
			<div
				className="logo"
				onMouseEnter={() => props.onCursor("hovered")}
				onMouseLeave={props.onCursor}
			></div>

			{/* hamburger menu */}
			<div
				className={classes}
				onMouseEnter={() => props.onCursor("hovered")}
				onMouseLeave={props.onCursor}
				onClick={hamburgerHandler}
			>
				<span></span>
				<span></span>
				<span></span>
			</div>
		</nav>
	)
}

export default Navbar
