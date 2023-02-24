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
	const [budget, setBudget] = useState("SELECT YOUR BUDGET")
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
		setBudget("SELECT YOUR BUDGET")
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
			<form>
				{/* First row */}
				<div>
					{/* First name, not required */}
					<div>
						<label>Your name:</label>

						<input type="text"></input>
					</div>
					{/* Email, required */}
					<div></div>
				</div>
				{/* Second row */}
				<div>
					{/* Phone number, not required */}
					<div></div>
					{/* Project budget, not required */}
					<div></div>
				</div>
				{/* Third row */}
				<div>
					{/* Tell us about the project */}
					<div></div>
				</div>
				{/* Fourth row */}
				<div>
					{/* Submit button */}
					<div></div>
				</div>
			</form>
		</section>
	)
}

export default ContactSection
