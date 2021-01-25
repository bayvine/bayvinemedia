import React, { useState } from "react"
import "./Services.scss"
import palmtree from "../../media/palm-tree.png"
import Service from "../../components/Service/Service"
import Button from "../../components/Button/Button"

// images
import s1 from "../../media/Group 16.png"
import s2 from "../../media/Group 17.png"
import s3 from "../../media/Group 18.png"
import s4 from "../../media/Group 19.png"

const Services = () => {
	let [image, setimage] = useState(palmtree)

	let handleImage = (image) => {
		setimage(image)
	}

	return (
		<section className="services">
			<h1>Tailored to your needs.</h1>
			<div className="services-block">
				<div className="images">
					<img src={image} alt="visual of service" className="services-image" />
				</div>
				<div className="services-text-block">
					<Service
						image={s1}
						title="Digital Art"
						text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem erat, consequat viverra tempus et, porttitor id ante. Proin vel ante nec risus commodo dictum sit amet vel ex. Sed erat neque, efficitur at dignissim ac, tempus sit amet turpis."
					/>
					<Service
						image={s2}
						title="UX/UI"
						text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem erat, consequat viverra tempus et, porttitor id ante. Proin vel ante nec risus commodo dictum sit amet vel ex. Sed erat neque, efficitur at dignissim ac, tempus sit amet turpis."
					/>
					<Service
						image={s3}
						title="Responsive Web Solutions"
						text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem erat, consequat viverra tempus et, porttitor id ante. Proin vel ante nec risus commodo dictum sit amet vel ex. Sed erat neque, efficitur at dignissim ac, tempus sit amet turpis."
					/>
					<Service
						image={s4}
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
