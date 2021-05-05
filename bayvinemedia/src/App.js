import React, { useEffect, useState, useRef, Suspense } from "react"
import gsap from "gsap"
import {
	useGlobalStateContext,
	useGlobalDispatchContext,
} from "./context/globalContext"
import ReactGA from "react-ga"
import Cases from "./sections/Cases/Cases"

// LAZY LOADED COMP
const Navbar = React.lazy(() => import("./components/Navbar/Navbar"))
const LoadingScreen = React.lazy(() =>
	import("./sections/LoadingScreen/LoadingScreen")
)
const About = React.lazy(() => import("./sections/About/About"))
const Landing = React.lazy(() => import("./sections/Landing/Landing"))
const Services = React.lazy(() => import("./sections/Services/Services"))
const Reviews = React.lazy(() => import("./sections/Reviews/Reviews"))
const ExtraInformation = React.lazy(() =>
	import("./sections/ExtraInformation/ExtraInformation")
)
const Contact = React.lazy(() => import("./sections/Contact/Contact"))
const Menu = React.lazy(() => import("./components/Menu/Menu"))
const CustomCursor = React.lazy(() =>
	import("./components/Cursor/CustomCursor")
)
const Footer = React.lazy(() => import("./components/Footer/Footer"))

export const reveal = (node) => {
	gsap.from(node, {
		duration: 1,
		opacity: 0,
	})
}
function App() {
	ReactGA.initialize(`${process.env.REACT_APP_TRACKING_URL}`)
	ReactGA.pageview("/")
	let [menu, setMenu] = React.useState(false)
	let [hamburger, setHamburger] = React.useState(true)
	let restOfPage = useRef(null)
	const [shouldIntroExist, setShouldIntroExist] = useState(true)

	useEffect(() => {
		setTimeout(() => {
			if (restOfPage) {
				gsap.from(restOfPage.current, {
					duration: 1,
					delay: 2,
					opacity: 0,
				})
				reveal(restOfPage.current)
			}
			setShouldIntroExist(false)
		}, 5000)
	}, [])

	const handleMenu = React.useCallback(() => {
		setMenu((prevstate) => !prevstate)
		setHamburger((prevstate) => !prevstate)
	}, [])

	const { cursorStyles } = useGlobalStateContext()
	const dispatch = useGlobalDispatchContext()

	const onCursor = React.useCallback(
		(cursorType) => {
			cursorType = (cursorStyles.includes(cursorType) && cursorType) || false
			dispatch({ type: "CURSOR_TYPE", cursorType: cursorType })
		},
		[cursorStyles, dispatch]
	)

	let application = (
		<div ref={(el) => (restOfPage = el)} className="the-whole-app">
			<Suspense fallback={<div>Loading...</div>}>
				<CustomCursor />
			</Suspense>

			<Suspense fallback={<div>Loading...</div>}>
				<Navbar show={hamburger} clicked={handleMenu} onCursor={onCursor} />
			</Suspense>

			<Suspense fallback={<div>Loading...</div>}>
				<Menu show={menu} clicked={handleMenu} />
			</Suspense>

			<Suspense fallback={<div>Loading...</div>}>
				<Landing onCursor={onCursor} />
			</Suspense>

			<Suspense fallback={<div>Loading...</div>}>
				<About onCursor={onCursor} />
			</Suspense>

			<Suspense fallback={<div>Loading...</div>}>
				<Services onCursor={onCursor} />
			</Suspense>

			<Suspense fallback={<div>Loading...</div>}>
				<Cases onCursor={onCursor} />
			</Suspense>

			<Suspense fallback={<div>Loading...</div>}>
				<Reviews />
			</Suspense>

			<Suspense fallback={<div>Loading...</div>}>
				<ExtraInformation />
			</Suspense>

			<Suspense fallback={<div>Loading...</div>}>
				<Contact />
			</Suspense>

			<Suspense fallback={<div>Loading...</div>}>
				<Footer />
			</Suspense>
		</div>
	)

	return (
		<>
			{shouldIntroExist ? (
				<Suspense fallback={<div>Loading...</div>}>
					<LoadingScreen />
				</Suspense>
			) : (
				application
			)}
		</>
	)
}

export default React.memo(App)

/* 
		<Button className={"green-gradient"} text={"HIRE ME"} />
			<Button className={"yellow-gradient"} text={"CASES"} />
			<Button className={"pink-gradient"} text={"SERVICES"} />
			<Button className={"purple-gradient"} text={"LET'S CHAT"} />
			<Button className={"blue-gradient"} text={"LET'S CHAT"} />
			<Button className={"pink-gradient"} text={"SEE CASES"} />

*/
