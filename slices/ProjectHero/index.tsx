import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Section from "@/components/Section";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";

/**
 * Props for `ProjectHero`.
 */
export type ProjectHeroProps = SliceComponentProps<Content.ProjectHeroSlice>;

/**
 * Component for "ProjectHero" Slices.
 */
const ProjectHero: FC<ProjectHeroProps> = ({ slice }) => {
  const projectLink = slice.primary.project_link;
  const hasProjectLink = isFilled.link(projectLink);
  console.log("project", projectLink)
  const projectTitleText = slice.primary.project_title
    ?.map((block) => ("text" in block ? block.text : ""))
    .join(" ")
    .trim();
  const fallbackHref = projectTitleText
    ? `/projects/${projectTitleText
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")}`
    : "#";

  const cardContent = (
    <>
      <div className="z-20 py-10 px-10 w-full flex flex-col">
        <PrismicRichText
          field={slice.primary.project_title}
          components={{
            heading1: ({ children }) => (
              <h3 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                {children}
              </h3>
            ),
          }}
        />
        <PrismicRichText
          field={slice.primary.project_subtitle}
          components={{
            paragraph: ({ children }) => (
              <p className="mt-2 font-semibold text-slate-100/90">{children}</p>
            ),
          }}
        />

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
      </div>

      <div className="h-full w-full group-hover:blur-md absolute left-0 top-0">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 bg-linear-to-t from-black/75 via-black/50 to-transparent"
        />
        <video
          className="absolute inset-0 z-0 h-full w-full object-bottom object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          src={slice.primary.background_video?.url}
          autoPlay
          muted
          loop
          playsInline
          poster={slice.primary.mockup_image.url || ""}
        />
      </div>

      <span className="pointer-events-none absolute right-6 top-6 z-30 inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/40 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-white/90 opacity-100 transition duration-300 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-visible:translate-y-0 md:group-focus-visible:opacity-100">
        Click to view more
        <span className="text-base">-&gt;</span>
      </span>
    </>
  );

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

      {hasProjectLink ? (
        <PrismicNextLink
          href={`/projects/${slice.primary.project_link.uid}`}
          field={slice.primary.project_link}
          aria-label="View project details"
          className="mt-12 shadow shadow-slate-50/40 drop-shadow-4xl group relative overflow-hidden duration-300 ease-in-out isolate rounded-2xl aspect-video flex items-end border border-white/10 transition hover:-translate-y-1 hover:shadow-slate-50/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80"
        >
          {cardContent}
        </PrismicNextLink>
      ) : (
        <Link
          href={fallbackHref}
          aria-label="View project details"
          className="mt-12 shadow shadow-slate-50/40 drop-shadow-4xl group relative overflow-hidden duration-300 ease-in-out isolate rounded-2xl aspect-video flex group items-end border border-white/10 transition hover:-translate-y-1 hover:shadow-slate-50/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80"
        >
          {cardContent}
        </Link>
      )}
    </Section>
  );
};

export default ProjectHero;
