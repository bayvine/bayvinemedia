import React from "react"
import ReviewCard from "../../components/ReviewCard/ReviewCard"
import "./Reviews.scss"

const Reviews = () => {
	return (
		<section className="reviews">
			<div className="reviews-heading">
				<h1>Trusted and loved</h1>
				<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
			</div>
			<div className="reviews-cards">
				<ReviewCard color="orange" />
				<ReviewCard color="blue" />
				<ReviewCard color="green" />
			</div>
			<div className="background-letters">
				<h1 className="background">USER CENTERED</h1>
				<h1 className="background">CREATIVITY</h1>
				<h1 className="background">EMPATHY</h1>
			</div>
		</section>
	)
}

export default Reviews
