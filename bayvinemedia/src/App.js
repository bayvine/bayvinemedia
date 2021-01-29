import Button from "./components/Button/Button"
import Navbar from "./components/Navbar/Navbar"
import About from "./sections/About/About"
import React, { useEffect, useState } from "react"
import Landing from "./sections/Landing/Landing"
import Services from "./sections/Services/Services"
import Reviews from "./sections/Reviews/Reviews"
import ExtraInformation from "./sections/ExtraInformation/ExtraInformation"
import Contact from "./sections/Contact/Contact"
import Menu from "./components/Menu/Menu"
import LoadingScreen from "./sections/LoadingScreen/LoadingScreen"

function App() {
	let [menu, setMenu] = React.useState(false)

	const [shouldIntroExist, setShouldIntroExist] = useState(true)

	useEffect(() => {
		setTimeout(() => {
			setShouldIntroExist(false)
		}, 5000)
	}, shouldIntroExist)

	function handleMenu() {
		setMenu((prevstate) => !prevstate)
	}

	return shouldIntroExist ? (
		<LoadingScreen />
	) : (
		<div className="the-whole-app">
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
