import React from "react"

const ReviewCard = ({ color }) => {
	return (
		<>
			<div className={`review-card ${color}`}>
				<div className="picture"></div>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem
					erat, consequat viverra tempus et, porttitor id ante. Proin vel ante
					nec risus commodo dictum sit amet vel ex.
				</p>
				<span>Jane Doe</span>
				<span>Role</span>
			</div>
		</>
	)
}

export default ReviewCard
