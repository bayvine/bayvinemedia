import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Section from "@/components/Section";
import ProjectGalleryCarousel from "@/components/ProjectGalleryCarousel";
import { createClient } from "@/prismicio";

type ProjectPageProps = {
  params: { uid: string };
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { uid } = await params;
  console.log(uid);
  const client = createClient();
  const page = await client.getByUID("project", uid).catch(() => notFound());

  console.log(page);

  const { data } = page;
  const hasVideo = isFilled.linkToMedia(data.hero_video);
  const hasPoster = Boolean(data.hero_poster?.url);
  const primaryLink = isFilled.link(data.primary_cta_link)
    ? data.primary_cta_link
    : null;
  const secondaryLink = isFilled.link(data.secondary_cta_link)
    ? data.secondary_cta_link
    : null;

  return (
    <main className="bg-black text-white">
      <section className="relative overflow-hidden pb-12 pt-20 sm:pt-28">
        <div className="absolute inset-0">
          {hasVideo ? (
            <video
              className="project-detail-media absolute inset-0 h-full w-full object-cover"
              src={data.hero_video.url ?? undefined}
              autoPlay
              muted
              loop
              playsInline
              poster={data.hero_poster.url || ""}
            />
          ) : hasPoster ? (
            <div className="project-detail-media absolute inset-0">
              <PrismicNextImage
                field={data.hero_poster}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="project-detail-media absolute inset-0 bg-slate-900" />
          )}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black"
          />
        </div>

        <Section className="relative z-10">
          <div className="max-w-3xl">
            <div className="project-detail-title">
              <PrismicRichText
                field={data.title}
                components={{
                  heading1: ({ children }) => (
                    <h1 className="text-4xl font-black uppercase leading-tight sm:text-5xl lg:text-6xl">
                      {children}
                    </h1>
                  ),
                }}
              />
            </div>
            <div className="project-detail-body mt-4 text-lg text-slate-100/90 sm:text-xl">
              <PrismicRichText
                field={data.subtitle}
                components={{
                  paragraph: ({ children }) => (
                    <p className="leading-relaxed">{children}</p>
                  ),
                }}
              />
            </div>
          </div>
        </Section>
      </section>

      <Section className="py-12">
        <div className="max-w-3xl text-base leading-relaxed text-slate-200 sm:text-lg">
          <PrismicRichText
            field={data.description}
            components={{
              paragraph: ({ children }) => <p className="mt-4">{children}</p>,
            }}
          />
        </div>

        <ProjectGalleryCarousel items={data.gallery} />
      </Section>

      <Section className="py-16">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-10">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold uppercase tracking-tight sm:text-3xl">
              {data.cta_heading || "Ready to bring your product to life?"}
            </h2>
            {isFilled.richText(data.cta_body) ? (
              <div className="mt-3 text-slate-200">
                <PrismicRichText
                  field={data.cta_body}
                  components={{
                    paragraph: ({ children }) => (
                      <p className="leading-relaxed">{children}</p>
                    ),
                  }}
                />
              </div>
            ) : (
              <p className="mt-3 text-slate-200">
                Tell us about your next launch or request a quick walkthrough.
              </p>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            {primaryLink ? (
              <PrismicNextLink
                field={primaryLink}
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-black transition hover:translate-y-[-2px]"
              >
                {data.primary_cta_label || "Contact us"}
              </PrismicNextLink>
            ) : (
              <Link
                href="/contact"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-black transition hover:translate-y-[-2px]"
              >
                Contact us
              </Link>
            )}

            {secondaryLink ? (
              <PrismicNextLink
                field={secondaryLink}
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white transition hover:border-white hover:text-white"
              >
                {data.secondary_cta_label || "Schedule a call"}
              </PrismicNextLink>
            ) : null}
          </div>
        </div>
      </Section>
    </main>
  );
}
