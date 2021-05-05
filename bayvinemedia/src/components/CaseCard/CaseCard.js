import React from "react"
import "./CaseCard.scss"
import testImage from "../../media/statue.webp"
import Arrow from "../../components/Arrow/Arrow"

const CaseCard = () => {
	return (
		<div
			className="case-card"
			style={{ background: `url(${testImage}) center/cover` }}
		>
			<div className="case-card-footer">
				<h1>Company</h1>
				<h1>What did this case do and provide for someone</h1>
			</div>
		</div>
	)
}

export default CaseCard
