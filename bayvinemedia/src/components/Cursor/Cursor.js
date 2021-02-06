import React, { useEffect, useRef } from "react"
import "./Cursor.scss"

const Cursor = ({ position, current }) => {
	let currentPosition = useRef(null)

	useEffect(() => {
		currentPosition.current.style.left = `${position.x}px`
		currentPosition.current.style.top = `${position.y}px`
	}, [position])

	return <div ref={currentPosition} className={current}></div>
}

export default Cursor
