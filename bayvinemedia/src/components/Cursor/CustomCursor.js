import React, { useEffect, useState } from "react"
import Cursor from "./Cursor"

// Context
import {
	useGlobalDispatchContext,
	useGlobalStateContext,
} from "../../context/globalContext"

const CustomCursor = () => {
	const { cursorType } = useGlobalStateContext()

	const [mousePos, setMousePos] = useState({
		x: 400,
		y: 400,
	})

	const onMouseMove = (event) => {
		const { pageX: x, pageY: y } = event
		setMousePos({ x, y })
	}

	useEffect(() => {
		document.addEventListener("mousemove", onMouseMove)

		return () => {
			document.addEventListener("mousemove", onMouseMove)
		}
	}, [])

	return (
		<>
			<Cursor
				current={`${!!cursorType ? "hovered" : ""} ${cursorType}`}
				position={mousePos}
			/>
		</>
	)
}

export default CustomCursor
