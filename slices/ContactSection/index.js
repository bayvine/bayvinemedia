import React, { useState } from "react"
import { PrismicLink, PrismicRichText } from "@prismicio/react"
import * as prismicH from "@prismicio/helpers"
import Title from "@/components/Title"
import { useIsomorphicLayoutEffect } from "@/helpers/useIsomorphicLayoutEffect"

/**
 * @typedef {import("@prismicio/client").Content.ContactSectionSlice} ContactSectionSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ContactSectionSlice>} ContactSectionProps
 * @param { ContactSectionProps }
 */
const ContactSection = ({ slice }) => {
	const title = prismicH.asText(slice.primary.title)
	const description = slice.primary.description

	useIsomorphicLayoutEffect(() => {
		wipeForm()
		wipeErrors()
	}, [])

	const [name, setName] = useState("")
	const [nameErr, setNameErr] = useState("")
	const [email, setEmail] = useState("")
	const [emailErr, setEmailErr] = useState("")
	const [phoneNumber, setPhoneNumber] = useState("")
	const [budget, setBudget] = useState("Select your budget")
	const [message, setMessage] = useState("")

	const [loading, setLoading] = useState(false)

	const [formSuccess, setFormSuccess] = useState(false)

	const OPTIONS = [
		"$1,000 - $3,000",
		"$3,000 - $5,000",
		"$5,000 - $10,000",
		"$10,000 >",
	]

	const wipeForm = () => {
		setName("")
		setEmail("")
		setPhoneNumber("")
		setBudget("Select your budget")
		setMessage("")
	}

	const wipeErrors = () => {
		setNameErr("")
		setEmailErr("")
	}

	const validateForm = () => {
		if (!name) {
			setNameErr("Please provide a valid name!")
		}

		if (!email) {
			setEmailErr("Please provide a valid email")
		}

		if (email && !email.includes("@")) {
			setEmailErr("Please provied a valid email")
		}

		if (email && email.includes("@") && name) {
			return true
		} else {
			return false
		}
	}

	function encode(data) {
		return Object.keys(data)
			.map(
				(key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
			)
			.join("&")
	}

	const handleFormSubmission = (e) => {
		console.log(name, email, phoneNumber, budget, message)
		e.preventDefault()
		setLoading(true)
		const isValid = validateForm()
		console.log(
			encode({
				"form-name": "contact",
				name: name,
				email: email,
				phone: phoneNumber,
				budget: budget,
				message: message,
			})
		)

		if (isValid) {
			fetch("/", {
				method: "POST",
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				body: encode({
					"form-name": "contact",
					name: name,
					email: email,
					phone: phoneNumber,
					budget: budget,
					message: message,
				}),
			})
				.then(() => {
					wipeErrors()
					setLoading(false)
					setFormSuccess(true)
					wipeForm()
					console.log("Form successfully submitted")
				})
				.catch((error) => {
					setLoading(false)
				})
		}

		setLoading(false)
	}

	return (
		<section className="text-white lg:max-w-4xl lg:mx-auto lg:px-0 ">
			<Title title={title} />
			<div className="px-5 sm:px-10 md:px-14 lg:px-0">
				<PrismicRichText
					field={description}
					className="underline"
					components={{
						hyperlink: (props) => (
							<PrismicLink
								className="underline"
								{...props}
								href={props.node.data.url}
							>
								{props.text}
							</PrismicLink>
						),
					}}
				/>
			</div>

			{formSuccess ? (
				<div className="px-5 my-8 text-left text-green-500 text-md sm:px-10 md:px-14">
					Thank you for your submission! We'll get back to you as soon as
					possible.
				</div>
			) : loading ? (
				<div>Submitting...</div>
			) : (
				<form
					className="grid grid-cols-1 px-5 text-black sm:px-10 md:px-14 lg:px-0 lg:grid-cols-2 lg:gap-8"
					onSubmit={handleFormSubmission}
					name="contact"
					method="POST"
					data-netlify="true"
				>
					<input
						type="hidden"
						name="subject"
						value="Inquiry from Bayvine website!"
					/>
					<input type="hidden" name="Bayvine" value="contact" />
					{/* First row */}
					<div className="">
						{/* First name, not required */}
						<div className="flex flex-col mt-4">
							<label className="pb-2 text-white">Name*:</label>
							<input
								name="name"
								type="text"
								placeholder="John Doe..."
								required
								onInput={(e) => setName(e.target.value)}
								className="px-3 py-3 text-white bg-transparent border rounded-md"
							></input>
							{nameErr && (
								<div className="py-0 mt-1 text-sm text-red-400">
									Please provide a name!
								</div>
							)}
						</div>
						{/* Email, required */}
						<div className="flex flex-col mt-4">
							<label className="pb-2 text-white">Email*:</label>
							<input
								placeholder="John@doe.com..."
								type="email"
								name="email"
								required
								onInput={(e) => setEmail(e.target.value)}
								className="px-3 py-3 text-white bg-transparent border rounded-md"
							></input>
							{emailErr && (
								<div className="py-0 mt-1 text-sm text-red-400">
									Please provide a valid email!
								</div>
							)}
						</div>
					</div>
					{/* Second row */}
					<div className="">
						{/* Phone number, not required */}
						<div className="flex flex-col mt-4">
							<label className="pb-2 text-white">Phone:</label>
							<input
								name="phonenumber"
								onInput={(e) => setPhoneNumber(e.target.value)}
								type="text"
								placeholder="(408)-123-4567"
								className="px-3 py-3 text-white bg-transparent border rounded-md"
							></input>
						</div>
						{/* Project budget, not required */}
						<div className="flex flex-col mt-4">
							<label className="pb-2 text-white">Project budget:</label>
							<select
								name="budget"
								onInput={(e) => setBudget(e.target.value)}
								value={budget}
								className="px-3 py-3 text-white bg-transparent border rounded-md"
							>
								<option disabled value={"Select your budget"}>
									Select your budget
								</option>
								{OPTIONS.map((item, index) => (
									<option key={index}>{item}</option>
								))}
							</select>
						</div>
					</div>
					{/* Third row */}
					<div className="lg:col-span-2">
						{/* Tell us about the project */}
						<div className="flex flex-col mt-4 lg:mt-0 ">
							<label className="pb-2 text-white">
								Tell us about your project:
							</label>
							<textarea
								name="message"
								onInput={(e) => setMessage(e.target.value)}
								placeholder="Mobile application, Social Media, Multiple Page Website..."
								className="px-3 py-3 text-white bg-transparent border rounded-md lg:h-[250px]"
							></textarea>
						</div>
					</div>
					{/* Fourth row */}
					<div className="mt-6 lg:mt-0 lg:col-span-2">
						{/* Submit button */}
						<div className="w-full">
							<button className="w-full px-8 py-2 uppercase bg-white rounded-md text-bold">
								<div className="flex items-center justify-center font-black text-center text-black 2xl:text-xl">
									Submit
								</div>
							</button>
						</div>
					</div>
				</form>
			)}
		</section>
	)
}

export default ContactSection
