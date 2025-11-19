import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, PrismicText, SliceComponentProps } from "@prismicio/react";
import Section from "@/components/Section";
import CTAButton from "@/components/CTAButton";
import { GlitchText } from "@/components/GlichText";

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
		<div className="relative isolate pb-40 lg:pb-56">
			<Section
				data-slice-type={slice.slice_type}
				data-slice-variation={slice.variation}
				className="min-h-screen 2xl:min-h-[1000px] flex items-center pb-36 lg:pb-48 pt-18"
			>
				<div className="">
					<div className="flex flex-col items-center justify-center text-center">
						<div className="font-black 
						text-[40px]
						lg:text-[90px] leading-12 lg:leading-23 uppercase">
							<PrismicRichText field={slice.primary.title}></PrismicRichText>
							<GlitchText words={array} />{" "}
						</div>

						<p className="font-medium text-md lg:text-2xl text-center lg:w-[650px] my-5">
							<PrismicText field={slice.primary.subtitle} />
						</p>
					</div>

					<div className="flex items-center gap-4 justify-center">
						<button className="transition-all ease-in border-2 cursor-pointer bg-white text-black border-white  text-md lg:text-lg font-black uppercase rounded-lg hover:rounded-4xl py-4 px-8">
							Schedule Free Consultation
						</button>
					</div>
				</div>
			</Section>

			{isFilled.linkToMedia(slice.primary.banner) && (
        <div className="pointer-events-auto absolute inset-x-0 
        bottom-[7rem]
        sm:bottom-[-12rem] lg:bottom-[-5rem] 2xl:bottom-[-20rem] flex justify-center ">
					<div className="w-[95vw] overflow-hidden rounded-lg backdrop-blur">
						<video
							autoPlay
							playsInline
							muted
							loop
							className="w-full h-[260px] sm:h-[500px] 2xl:h-[800px] object-cover"
						>
							<source src={slice.primary.banner.url} type="video/mp4" />
						</video>
					</div>
				</div>
			)}
		</div>
	)
};

export default Hero;
