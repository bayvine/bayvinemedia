import React, { useState } from "react"
import "./Form.scss"
import Success from "../../media/success.gif"
import Fail from "../../media/fail.gif"
import FormLoader from "../FormLoader/FormLoader"

function encode(data) {
	return Object.keys(data)
		.map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
		.join("&")
}

const Form = () => {
	const [loader, setLoader] = useState(false)
	const [success, setSuccess] = useState(false)
	const [fail, setFail] = useState(false)
	const [showForm, setShowFarm] = useState(true)
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		organization: "",
		phone: "",
		message: "",
	})

	const formHandler = (e) => {
		setSuccess(false)
		setFail(false)
		setLoader(true)
		setShowFarm(false)

		fetch("/", {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: encode({ "form-name": "contact", ...formData }),
		})
			.then(() => {
				setFail(false)
				setLoader(false)
				setSuccess(true)
				setShowFarm(false)
			})
			.catch(() => {
				setLoader(false)
				setSuccess(false)
				setFail(true)
				setShowFarm(false)
			})

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

	let form = (
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
				<textarea name="message" onChange={(event) => setForm(event, true)} />
			</div>

			<input name="bot-field" type="hidden" onChange={setForm} />

			<button type="submit" onClick={formHandler}>
				S E N D
			</button>
		</form>
	)

	return (
		<div className="form">
			<h1>Contact</h1>
			<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </span>

			{fail ? (
				<div className="fail-form">
					<h2>Huh! Something went wrong.</h2>
					<span
						onClick={() => {
							setFail(false)
							setShowFarm(true)
						}}
					>
						Try again maybe?
					</span>

					<img
						height="500"
						width="500"
						src={Fail}
						className="form-fail-image"
						alt="fail"
					/>
				</div>
			) : null}
			{success ? (
				<div className="success-form">
					<h2>Yay! Your submission has been sent.</h2>
					<span>
						I hope to respond in less than 24 hours, you can also contact me
						through social media!
					</span>
					<img src={Success} className="form-success-image" alt="success" />
				</div>
			) : null}
			{loader ? <FormLoader /> : null}
			{showForm ? form : null}
		</div>
	)
}

export default Form
