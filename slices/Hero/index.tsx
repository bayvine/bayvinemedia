import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, PrismicText, SliceComponentProps } from "@prismicio/react";
import Section from "@/components/Section";
import CTAButton from "@/components/CTAButton";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
const htmlSerializer = (type, element, text, children) => {
		if (type == "strong") {
			return (
				<div className="flex justify-between items-center">
					<div className="overflow-y-hidden text-white opacity-100 text-7xl h-fit sm:text-9xl md:text-[20vw] lg:text-[15vw] xl:text-[150px] 2xl:text-[200px] ">
						<div className="-translate-x-[14px] text-transparent bg-linear-to-r bg-clip-text from-[#B06F44] to-[#37958C] animated-gradient">
							{text}
						</div>
					</div>
					{/* <CTAButton className="hidden xl:flex" /> */}
				</div>
			)
		}
		if (type == "span") {
			return (
				<div className="w-full -translate-x-[13px] overflow-y-hidden text-4xl text-white opacity-100 h-fit sm:text-6xl sm:h-full md:text-[8vw] lg:text-[5vw] xl:text-[134px] xl:whitespace-nowrap 2xl:text-[174px]">
					<div className=" text-transparent  bg-linear-to-r bg-clip-text from-[#B06F44] to-[#37958C] animated-gradient">
						{text}
					</div>
				</div>
			)
		}
  }
  
  return (
		<Section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			<div className="flex font-bold uppercase cursor-default">
				<PrismicRichText
          field={slice.primary.title}
          
					components={htmlSerializer}
				/>
			</div>
			<span>
				<PrismicText field={slice.primary.subtitle} />
			</span>
		</Section>
	)
};

export default Hero;
