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
		if (!nameErr) setNameErr("Please provide a valid name!")
		if (!emailErr) setEmailErr("Please provide a valid email")
		if (emailErr && !emailErr.includes("@"))
			setEmailErr("Please provied a valid email")
	}

	return (
		<section className="text-white">
			<Title title={title} />
			<div className="px-5">
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
			<form className="grid grid-cols-1 px-5 text-black">
				{/* First row */}
				<div className="mt-5">
					{/* First name, not required */}
					<div className="flex flex-col">
						<label className="text-white">Name:</label>
						<input type="text"></input>
						<div>Error name</div>
					</div>
					{/* Email, required */}
					<div className="flex flex-col">
						<label className="text-white">Email:</label>
						<input type="email"></input>
						<div>Error email</div>
					</div>
				</div>
				{/* Second row */}
				<div className="">
					{/* Phone number, not required */}
					<div className="flex flex-col">
						<label className="text-white">Phone:</label>
						<input type="text"></input>
					</div>
					{/* Project budget, not required */}
					<div className="flex flex-col">
						<label className="text-white">Project budget:</label>
						<select>
							<option selected={budget == "Select your budget"}>
								Select your budget
							</option>
							{OPTIONS.map((item, index) => (
								<option key={index}>{item}</option>
							))}
						</select>
					</div>
				</div>
				{/* Third row */}
				<div className="mt-5">
					{/* Tell us about the project */}
					<div className="flex flex-col">
						<label className="text-white">Tell us about your project:</label>
						<textarea></textarea>
					</div>
				</div>
				{/* Fourth row */}
				<div className="mt-5">
					{/* Submit button */}
					<div className="w-full">
						<button className="w-full px-8 py-2 uppercase bg-white rounded-md text-bold">
							<div className="flex items-center justify-center font-black text-center text-black">
								Submit
							</div>
						</button>
					</div>
				</div>
			</form>
		</section>
	)
}

export default ContactSection
