import React, { useState } from "react"
import "./Form.scss"

function encode(data) {
	return Object.keys(data)
		.map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
		.join("&")
}

const Form = () => {
	const [loader, setLoader] = useState(false)
	const [success, setSuccess] = useState(false)
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		organization: "",
		phone: "",
		message: "",
	})

	const formHandler = (e) => {
		fetch("/", {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: encode({ "form-name": "contact", ...formData }),
		})
			.then(() => alert("Success!"))
			.catch((error) => alert(error))

		e.preventDefault()
	}

	const setForm = (e, message) => {
		let name = e.target.name
		let value = e.target.value

		if (message) {
			setFormData({
				...formData,
				message: value,
			})
		} else {
			setFormData({
				...formData,
				[name]: value,
			})
		}
	}

	return (
		<div className="form">
			<h1>Contact</h1>
			<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </span>

			{loader ? (
				<span>Sending form...</span>
			) : (
				<form name="contact" method="POST" onSubmit={formHandler}>
					<input type="hidden" name="form-name" value="contact" />
					<div>
						<label htmlFor="name">Name</label>
						<input
							onChange={setForm}
							value={formData.name}
							name="name"
							type="text"
						/>
					</div>

					<div>
						<label htmlFor="email">Email</label>
						<input
							value={formData.email}
							onChange={setForm}
							name="email"
							type="email"
						/>
					</div>

					<div>
						<label htmlFor="organization">Organization</label>
						<input
							value={formData.organization}
							onChange={setForm}
							name="organization"
							type="text"
						/>
					</div>

					<div>
						<label htmlFor="phone">Phone</label>
						<input
							value={formData.phone}
							onChange={setForm}
							name="phone"
							type="tel"
						/>
					</div>

					<div>
						<label htmlFor="message">Message</label>
						<textarea
							name="message"
							onChange={(event) => setForm(event, true)}
						/>
					</div>

					<button type="submit" onClick={formHandler}>
						S E N D
					</button>
				</form>
			)}
		</div>
	)
}

export default Form
