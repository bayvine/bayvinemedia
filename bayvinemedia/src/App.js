import Button from "./components/Button/Button"
import Navbar from "./components/Navbar/Navbar"
import About from "./sections/About/About"
import React, { useEffect } from "react"
import Landing from "./sections/Landing/Landing"

function App() {
	return (
		<>
			<Navbar />
			<Landing />
			<About />
		</>
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
