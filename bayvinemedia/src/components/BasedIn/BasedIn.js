import React from "react"
import "./BasedIn.scss"
import rotterdam from "../../media/rotterdam.png"
import sanfran from "../../media/san-fran.png"

const BasedIn = () => {
	return (
		<div className="based-in">
			<div className="san-francisco-picture">
				<img src={sanfran} alt="san francisco" />
			</div>
			<div className="rotterdam-picture-with-text">
				<div>
					<span>Based in</span>
					<h1>Bay Area.</h1>
					<h1>Rotterdam.</h1>
				</div>
				<img src={rotterdam} alt="rotterdam" />
			</div>
		</div>
	)
}

export default BasedIn
