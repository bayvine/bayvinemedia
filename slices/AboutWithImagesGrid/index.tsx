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
			hasBlub={false}
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			<div className="flex items-center justify-center flex-col">
				<span className="text-lg min-w-4 flex items-center justify-center overflow-hidden px-6 py-1 border rounded-full">
					<PrismicRichText field={slice.primary.heading} />
				</span>
				<div className="text-center max-w-2xl text-lg shrink-0 mt-5">
					<PrismicRichText field={slice.primary.description} />
				</div>

				<div className="mt-8 flex gap-3 relative">
					{Array.isArray(slice.primary.cards) &&
						slice.primary.cards.length &&
						slice.primary.cards.map((item, index) => (
							<div key={index} className="overflow-hidden w-full rounded-lg">
                <img src={item.media.url} height={500} width={250} className="object-cover h-[300px]" />
                
							</div>
						))}
				</div>
			</div>
		</Section>
	)
};

export default AboutWithImagesGrid;
