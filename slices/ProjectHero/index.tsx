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

      <Link
        href=""
        className="mt-12 shadow shadow-slate-50/40 drop-shadow-4xl group relative overflow-hidden duration-300 ease-in-out isolate rounded-2xl aspect-video flex items-end group"
      >
        <div className="z-50 py-10 px-10 w-full  flex flex-col">
        
            <div className="text-6xl font-black my-2">
              <PrismicRichText field={slice.primary.project_title} />
            </div>
            <div className="font-semibold">
              <PrismicRichText field={slice.primary.project_subtitle} />
            </div>

            <div className="my-4 flex items-center gap-4  flex-wrap">
              {slice.primary.project_tags.map((tag, index) => (
                <span
                  key={`${tag.tag}-${index}`}
                  className="flex shrink-0 items-center justify-center rounded-full bg-slate-50 px-5 py-1 font-semibold text-black"
                >
                  {tag.tag}
                </span>
              ))}
            </div>

            {/* <div className="text-lg">
              <PrismicRichText field={slice.primary.project_description} />
            </div> */}
         
        </div>

        <div className="h-full w-full absolute left-0 top-0">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 bg-linear-to-t from-black/75 via-black/50 to-transparent"
          />
          <video
            className="absolute inset-0 z-0 h-full w-full object-bottom object-cover"
            src={slice.primary.background_video?.url}
            autoPlay
            muted
            loop
            poster={slice.primary.mockup_image.url || ""}
          />
        </div>
      </Link>
    </Section>
  );
};

export default ProjectHero;
