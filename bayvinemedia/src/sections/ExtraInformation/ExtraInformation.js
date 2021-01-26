import React from "react"
import "./ExtraInformation.scss"
import LevelUp from "../../components/LevelUp/LevelUp"
import BasedIn from "../../components/BasedIn/BasedIn"

const ExtraInformation = () => {
	return (
		<section className="extra">
			{/*level up card */}
			<LevelUp />
			{/* Based in..? */}
			<BasedIn />
		</section>
	)
}

export default ExtraInformation
