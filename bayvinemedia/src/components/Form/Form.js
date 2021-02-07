import React, { useState } from "react"
import "./Form.scss"

const Form = () => {
	const [loader, setLoader] = useState(false)
	const [success, setSuccess] = useState(false)

	const formHandler = (e) => {
		setLoader(true)
		e.preventDefault()
		console.log("Submit form.")
	}

	return (
		<div className="form">
			<h1>Contact</h1>
			<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </span>

			{loader ? (
				<span>Sending form...</span>
			) : (
				<form
					name="contact"
					method="post"
					netlify
					netlify-honeybot="bot-field"
					onSubmit="submit"
				>
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

					<button type="submit">S E N D</button>
				</form>
			)}
		</div>
	)
}

export default Form
