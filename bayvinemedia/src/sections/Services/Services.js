import React, { useState } from "react"
import "./Services.scss"
import palmtree from "../../media/palm-tree.png"
import Service from "../../components/Service/Service"

// images
import s1 from "../../media/Group 16.png"
import s2 from "../../media/Group 17.png"
import s3 from "../../media/Group 18.png"
import s4 from "../../media/Group 19.png"

import video from "../../media/loopablemovie.mp4"

const Services = (props) => {
	let [imageClass, setimageClass] = useState(0)

	let handleImageIn = () => {
		setimageClass(1)
	}

	let handleImageOut = () => {
		setimageClass(0)
	}

	return (
		<section className="services">
			<h1>Tailored to your needs.</h1>
			<div className="services-block">
				<div
					className="images"
					onMouseEnter={handleImageIn}
					onMouseLeave={handleImageOut}
				>
					<video
						style={{
							opacity: imageClass,
							objectFit: "cover",
							width: "100%",
							height: "800px",
							borderRadius: "25px",
							transition: "all 0.8s ease-in-out",
						}}
						className="video"
						src={video}
						autoPlay
						muted
					/>
				</div>
				<div className="services-text-block">
					<Service
						onCursor={props.onCursor}
						image={s1}
						title="Digital Art"
						text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem erat, consequat viverra tempus et, porttitor id ante. Proin vel ante nec risus commodo dictum sit amet vel ex. Sed erat neque, efficitur at dignissim ac, tempus sit amet turpis."
					/>
					<Service
						onCursor={props.onCursor}
						image={s2}
						title="UX/UI"
						text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem erat, consequat viverra tempus et, porttitor id ante. Proin vel ante nec risus commodo dictum sit amet vel ex. Sed erat neque, efficitur at dignissim ac, tempus sit amet turpis."
					/>
					<Service
						image={s3}
						onCursor={props.onCursor}
						title="Responsive Web Solutions"
						text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem erat, consequat viverra tempus et, porttitor id ante. Proin vel ante nec risus commodo dictum sit amet vel ex. Sed erat neque, efficitur at dignissim ac, tempus sit amet turpis."
					/>
					<Service
						image={s4}
						onCursor={props.onCursor}
						title="Logo Design"
						text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem erat, consequat viverra tempus et, porttitor id ante. Proin vel ante nec risus commodo dictum sit amet vel ex. Sed erat neque, efficitur at dignissim ac, tempus sit amet turpis."
					/>
					{/* <Button className={"purple-gradient"} text={"READ MORE"} /> */}
				</div>
			</div>
		</section>
	)
}

export default Services
