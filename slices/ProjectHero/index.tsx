import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Section from "@/components/Section";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { RxArrowTopRight } from "react-icons/rx";
import Tag from "@/components/Tag";
import { createClient } from "@/prismicio";

/**
 * Props for `ProjectHero`.
 */
export type ProjectHeroProps = SliceComponentProps<Content.ProjectHeroSlice>;

/**
 * Component for "ProjectHero" Slices.
 */
const ProjectHero = async ({ slice }: ProjectHeroProps) => {
  const projectLink = slice.primary.project_link;
  const hasProjectLink = isFilled.contentRelationship(projectLink);
  const client = createClient();
  const project = hasProjectLink
    ? await client.getByID(projectLink.id).catch(() => null)
    : null;

  const projectSlices = project?.data?.slices ?? [];
  const detailSlice = projectSlices.find(
    (item) => item.slice_type === "project_detail_hero"
  ) as Content.ProjectDetailHeroSlice | undefined;

  const titleField = detailSlice?.primary?.title ?? slice.primary.project_title;
  const subtitleField =
    detailSlice?.primary?.description ?? slice.primary.project_subtitle;
  const tagItems =
    detailSlice?.primary?.tags ?? slice.primary.project_tags ?? [];
  const tags = tagItems
    .map((item) => item.tag)
    .filter((tag): tag is string => Boolean(tag));
  const backgroundVideo =
    detailSlice?.primary?.background_video ?? slice.primary.background_video;
  const backgroundImage =
    detailSlice?.primary?.background_image ?? slice.primary.mockup_image;
  const hasVideo = isFilled.linkToMedia(backgroundVideo);
  const hasImage = Boolean(backgroundImage?.url);
  const projectTitleText = titleField
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
      <div className="z-20 py-2 px-4 lg:p-10 w-full flex flex-col">
        <PrismicRichText
          field={titleField}
          components={{
            heading1: ({ children }) => (
              <h3 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl uppercase">
                {children}
              </h3>
            ),
          }}
        />
        <PrismicRichText
          field={subtitleField}
          components={{
            paragraph: ({ children }) => (
              <p className="mt-2 font-semibold text-slate-100">{children}</p>
            ),
          }}
        />

        <div className="my-4 flex items-center gap-4 flex-wrap">
          {tags.map((tag, index) => (
            <Tag key={`${tag}-${index}`}>{tag}</Tag>
          ))}
        </div>

           <span className="z-50 inline-flex w-fit items-center gap-1 rounded-full border border-white/50 lg:hidden px-3 py-1 text-md font-semibold uppercase text-white">
                    View project
                    <RxArrowTopRight size={20} />
                  </span>
      </div>

      <div className="h-full w-full group-hover:blur-md absolute left-0 top-0">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 bg-linear-to-t from-black/75 via-black/50 to-transparent"
        />
        {hasVideo ? (
          <video
            className="absolute inset-0 z-0 h-full w-full object-bottom object-cover transition-transform duration-500 ease-out group-hover:scale-[1.1]"
            src={backgroundVideo.url ?? undefined}
            autoPlay
            muted
            loop
            playsInline
            poster={backgroundImage?.url || ""}
          />
        ) : hasImage ? (
          <PrismicNextImage
            field={backgroundImage}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="absolute inset-0 z-0 h-full w-full object-bottom object-cover transition-transform duration-500 ease-out group-hover:scale-[1.1]"
          />
        ) : null}
      </div>

    
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

      <PrismicNextLink
        field={projectLink}
        href={project?.url || fallbackHref}
        aria-label="View project details"
        className="mt-12  group relative overflow-hidden duration-300 ease-in-out isolate rounded-lg aspect-3/4 lg:aspect-video flex items-end focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80"
      >
        {cardContent}
      </PrismicNextLink>
    </Section>
  );
};

export default ProjectHero;
