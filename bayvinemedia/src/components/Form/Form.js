import React from "react"
import "./Form.scss"

const Form = () => {
	return (
		<div className="form">
			<h1>Contact</h1>
			<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </span>
			<form>
				<div>
					<label for="name">Name</label>
					<input name="name" type="text" />
				</div>

				<div>
					<label for="email">Email</label>
					<input name="email" type="email" />
				</div>

				<div>
					<label for="organisation">Organisation</label>
					<input name="organisation" type="text" />
				</div>

				<div>
					<label for="phone">Phone</label>
					<input name="phone" type="tel" />
				</div>

				<div>
					<label for="message">Message</label>

					<textarea></textarea>
				</div>

				<button type="submit">S E N D</button>
			</form>
		</div>
	)
}

export default Form
