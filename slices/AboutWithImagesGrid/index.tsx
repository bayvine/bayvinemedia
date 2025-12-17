import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Section from "@/components/Section";

/**
 * Props for `AboutWithImagesGrid`.
 */
export type AboutWithImagesGridProps =
  SliceComponentProps<Content.AboutWithImagesGridSlice>;

/**
 * Component for "AboutWithImagesGrid" Slices.
 */
const AboutWithImagesGrid: FC<AboutWithImagesGridProps> = ({ slice }) => {
  return (
		<Section
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			<div className="flex justify-between items-center w-full flex-col lg:flex-row gap-5">
				<div className="">
					<span className="text-lg min-w-4 flex items-center max-w-fit justify-center overflow-hidden px-6 py-1 border rounded-full">
						<PrismicRichText field={slice.primary.heading} />
					</span>
					<div className="max-w-xl text-left text-lg mt-5">
						<PrismicRichText field={slice.primary.description} />
					</div>
				</div>

				<div className="flex relative justify-end">
					{Array.isArray(slice.primary.cards) &&
						slice.primary.cards.length &&
						slice.primary.cards.map((item, index) => (
							<div key={index} className="overflow-hidden h-[500px] rounded-lg">
								<img
									src={item.media.url}
									
									className="object-cover w-full h-full"
								/>
							</div>
						))}
				</div>
			</div>
		</Section>
	)
};

export default AboutWithImagesGrid;
