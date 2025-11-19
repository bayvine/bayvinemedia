import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, PrismicText, SliceComponentProps } from "@prismicio/react";
import Section from "@/components/Section";
import CTAButton from "@/components/CTAButton";
import { GlitchText } from "@/components/GlichText";
import { RxArrowTopRight } from "react-icons/rx";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
	const array = slice.primary.title_action.map((text) => text.action as string)

	return (
		<div className="relative isolate">
			<Section
				hasBlub
				data-slice-type={slice.slice_type}
				data-slice-variation={slice.variation}
				className="min-h-screen 2xl:min-h-[1000px] flex items-center"
			>
				<div className="">
					<div className="flex flex-col items-center justify-center text-center">
						<div className="font-black text-8xl 
						 leading-12 lg:leading-23 uppercase">
							<PrismicRichText field={slice.primary.title}></PrismicRichText>
							<GlitchText words={array} />{" "}
						</div>

						<p className="lg:text-lg text-center lg:w-[650px] my-4">
							<PrismicText field={slice.primary.subtitle} />
						</p>
					</div>

					<div className="flex items-center gap-4 justify-center my-2">
					<CTAButton>
						<span className="flex gap-1 items-center">{slice.primary.call_to_action_label} <RxArrowTopRight strokeWidth={0.5}/></span>
					</CTAButton>
					
					</div>
				</div>
			</Section>

			{/* {isFilled.linkToMedia(slice.primary.banner) && (
        <div className="pointer-events-auto absolute inset-x-0 
        bottom-[8rem]
        sm:bottom-[-12rem] lg:bottom-[-5rem] 2xl:bottom-[-20rem] flex justify-center ">
					<div className="w-full  overflow-hidden rounded-lg backdrop-blur">
						<video
							autoPlay
							playsInline
							muted
							loop
							className="w-full h-[600px] object-cover position-bottom"
						>
							<source src={slice.primary.banner.url} type="video/mp4" />
						</video>
					</div>
				</div>
			)}  */}
		</div>
	)
};

export default Hero;
