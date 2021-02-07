import React from "react"
import "./Form.scss"

const Form = () => {
	const formHandler = (e) => {
		e.preventDefault()
	}
	return (
		<div className="form">
			<h1>Contact</h1>
			<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </span>
			<form name="contact" method="post" data-netlify="true">
				<input type="hidden" name="form-name" value="contact" />
				<div>
					<label htmlFor="name">Name</label>
					<input name="name" type="text" />
				</div>

				<div>
					<label htmlFor="email">Email</label>
					<input name="email" type="email" />
				</div>

				<div>
					<label htmlFor="organisation">Organisation</label>
					<input name="organisation" type="text" />
				</div>

				<div>
					<label htmlFor="phone">Phone</label>
					<input name="phone" type="tel" />
				</div>

				<div>
					<label htmlFor="message">Message</label>
					<textarea></textarea>
				</div>

				<button type="submit" onClick={(e) => formHandler(e)}>
					S E N D
				</button>
			</form>
		</div>
	)
}

export default Form
