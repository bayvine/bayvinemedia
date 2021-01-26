import React from "react"
import "./Form.scss"

const Form = () => {
	return (
		<div className="form">
			<h1>Contact</h1>
			<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </span>
			<form>
				<label for="name">Name</label>
				<input name="name" type="text" />
				<label for="email">Email</label>
				<input name="email" type="email" />
				<label for="organisation">Organisation</label>
				<input name="organisation" type="text" />
				<label for="phone">Phone</label>
				<input name="phone" type="tel" />
				<label for="message">Message</label>
				<input name="message" type="textarea" />
				<button type="submit">S E N D</button>
			</form>
		</div>
	)
}

export default Form
