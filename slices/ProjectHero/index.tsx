import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Section from "@/components/Section";
import { PrismicNextLink } from "@prismicio/next";
import { RxArrowTopRight } from "react-icons/rx";
import Tag from "@/components/Tag";
import SectionTitle from "@/components/SectionTitle";
import { VIDEO_PLACEHOLDER_SRC } from "@/utils/mediaPlaceholders";

/**
 * Props for `ProjectHero`.
 */
export type ProjectHeroProps = SliceComponentProps<Content.ProjectHeroSlice>;

/**
 * Component for "ProjectHero" Slices.
 */
const ProjectHero: FC<ProjectHeroProps> = ({ slice }) => {
  const projectHref = slice.primary.project_link?.uid
    ? `/projects/${slice.primary.project_link.uid}`
    : "#";

  const cardContent = (
    <>
      <div className="z-20 pt-40 px-4 lg:p-10 w-full flex flex-col">
        
        <PrismicRichText
          field={slice.primary.project_title}
          components={{
            heading1: ({ children }) => (
              <h3 className="text-4xl font-black uppercase sm:text-5xl lg:text-6xl">
                {children}
              </h3>
            ),
          }}
        />
        <PrismicRichText
          field={slice.primary.project_subtitle}
          components={{
            paragraph: ({ children }) => (
              <p className="mt-1 text-lg">{children}</p>
            ),
          }}
        />

        <div className="my-4 flex items-center gap-4 flex-wrap">
          {slice.primary.project_tags.map((tag, index) => (
            <Tag key={`${tag.tag}-${index}`}>{tag.tag}</Tag>
          ))}
        </div>
      </div>

      <div className="h-full w-full group-hover:blur-md group-active:blur-md absolute left-0 top-0">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 bg-linear-to-t from-black/75 via-black/50 to-transparent"
        />
        <video
          className="pointer-events-none absolute inset-0 z-0 h-full w-full object-bottom object-cover transition-transform duration-500 ease-out group-hover:scale-[1.1] group-active:scale-[1.1]"
          src={slice.primary.background_video?.url}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          poster={VIDEO_PLACEHOLDER_SRC}
        />
      </div>

      <span className="pointer-events-none absolute right-6 top-6 lg:top-auto lg:bottom-6 z-30 inline-flex items-center justify-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-bold uppercase text-black opacity-100 transition duration-300 md:translate-y-2 md:opacity-0 
      md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-visible:translate-y-0 md:group-focus-visible:opacity-100">
        Click to view more
        <RxArrowTopRight strokeWidth={0.5} />
      </span>
    </>
  );

  return (
    <Section
      id="work"
      className="py-12"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <SectionTitle
        title={"Our latest work"}
        description={"Businesses who joined the digital revolution"}
      />

      <PrismicNextLink
        href={projectHref}
        // field={slice.primary.project_link}
        aria-label="View project details"
        className="mt-8  group relative overflow-hidden duration-300 ease-in-out isolate lg:rounded-lg aspect-3/4 lg:aspect-video flex items-end focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80"
      >
        {cardContent}
      </PrismicNextLink>
    </Section>
  );
};

export default ProjectHero;
