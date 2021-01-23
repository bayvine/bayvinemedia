import React from "react"
import "./Button.scss"

const Button = ({ clicked, className, text }) => {
	return (
		<button onClick={clicked} className={className}>
			{text}
		</button>
	)
}

export default Button
