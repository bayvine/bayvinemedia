import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Section from "@/components/Section";
import Link from "next/link";

/**
 * Props for `ProjectHero`.
 */
export type ProjectHeroProps = SliceComponentProps<Content.ProjectHeroSlice>;

/**
 * Component for "ProjectHero" Slices.
 */
const ProjectHero: FC<ProjectHeroProps> = ({ slice }) => {
  return (
		<Section
			className="py-12"
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			<div className="max-w-xl text-slate-200">
				<h2 className="text-2xl font-bold uppercase sm:text-3xl">
					Our latest work
				</h2>
				<div className="my-1 max-w-lg">
					<p>Businesses who joined the digital revolution</p>
				</div>
			</div>

			<Link href="" className="mt-12 inline-block w-full group relative overflow-hidden hover:-translate-y-1 transition-all duration-300 ease-in-out isolate py-30 rounded-2xl px-12">
				<div className="z-50 relative flex items-center justify-center gap-20 w-full flex-col lg:flex-row">
					<div className="">
						<div className="text-5xl font-black max-w-4xl my-2">
							<PrismicRichText field={slice.primary.project_title} />
						</div>
						<div className="font-semibold">
							<PrismicRichText field={slice.primary.project_subtitle} />
						</div>

						<div className="my-4 flex items-center gap-4 flex-wrap">
							{slice.primary.project_tags.map((tag, index) => (
								<span
									key={`${tag.tag}-${index}`}
									className="flex shrink-0 items-center justify-center rounded-full bg-slate-50 px-5 py-1 font-semibold text-black"
								>
									{tag.tag}
								</span>
							))}
						</div>

						<div className="text-lg">
							<PrismicRichText field={slice.primary.project_description} />
						</div>
          </div>
          <div className="">
            
            <img src={slice.primary.mockup_device.url} draggable={false} className="lg:w-[600px]"/>
          </div>
				</div>
				<div
					aria-hidden
					className="pointer-events-none absolute inset-0 z-10 bg-linear-to-tr from-black/80 via-black/50 to-transparent"
				/>
				<img
					draggable={false}
					src={slice.primary.mockup_image.url}
					className="absolute inset-0 z-0 h-full w-full object-cover object-bottom"
					alt={slice.primary.mockup_image.alt || ""}
				/>
			</Link>
		</Section>
	)
};

export default ProjectHero;
