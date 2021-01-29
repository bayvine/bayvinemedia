import Navbar from "./components/Navbar/Navbar"
import About from "./sections/About/About"
import React, { useEffect, useState, useRef } from "react"
import Landing from "./sections/Landing/Landing"
import Services from "./sections/Services/Services"
import Reviews from "./sections/Reviews/Reviews"
import ExtraInformation from "./sections/ExtraInformation/ExtraInformation"
import Contact from "./sections/Contact/Contact"
import Menu from "./components/Menu/Menu"
import LoadingScreen from "./sections/LoadingScreen/LoadingScreen"
import gsap from "gsap"

export const reveal = (node) => {
	gsap.from(node, {
		duration: 1,
		opacity: 0,
	})
}
function App() {
	let [menu, setMenu] = React.useState(false)
	let restOfPage = useRef(null)
	let application = (
		<div ref={(el) => (restOfPage = el)} className="the-whole-app">
			<Menu show={menu} clicked={handleMenu} />
			<Navbar clicked={handleMenu} />
			<Landing />
			<About />
			<Services />
			<Reviews />
			<ExtraInformation />
			<Contact />
			<footer>Designed and Developed with ♡ by Bay Vine Media 2021 ©</footer>
		</div>
	)

	const [shouldIntroExist, setShouldIntroExist] = useState(true)

	useEffect(() => {
		setTimeout(() => {
			setShouldIntroExist(false)
			reveal(restOfPage.current)
		}, 5000)
	}, [shouldIntroExist])

	function handleMenu() {
		setMenu((prevstate) => !prevstate)
	}

	return shouldIntroExist ? <LoadingScreen /> : application
}

export default App

/* 
		<Button className={"green-gradient"} text={"HIRE ME"} />
			<Button className={"yellow-gradient"} text={"CASES"} />
			<Button className={"pink-gradient"} text={"SERVICES"} />
			<Button className={"purple-gradient"} text={"LET'S CHAT"} />
			<Button className={"blue-gradient"} text={"LET'S CHAT"} />
			<Button className={"pink-gradient"} text={"SEE CASES"} />

*/
