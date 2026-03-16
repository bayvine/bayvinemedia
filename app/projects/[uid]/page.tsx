import type { Metadata } from "next";
import {
  asText,
  type Content,
  type ImageField,
  type RichTextField,
} from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import {
  buildMetadata,
  createSchemaGraph,
  getBreadcrumbSchema,
  getOrganizationSchema,
  getProjectSchema,
  getSeoSettings,
  type PageSeoFields,
} from "@/utils/seo";

type ProjectPageProps = {
  params: { uid: string };
};

type ProjectPageData = Content.ProjectDocument["data"] & PageSeoFields;

type ProjectHeroPrimary = {
  title?: RichTextField;
  description?: RichTextField;
  background_image?: ImageField;
};

// 1 day
export const revalidate = 86400;

const getProject = async (uid: string) => {
  const client = createClient();
  return client.getByUID<Content.ProjectDocument>("project", uid).catch(() => null);
};

const getProjectSeoContent = (project: Content.ProjectDocument) => {
  const heroSlice = project.data.slices.find(
    (slice) => slice.slice_type === "project_detail_hero",
  );
  const heroPrimary = (heroSlice?.primary ?? {}) as ProjectHeroPrimary;
  const title = asText(heroPrimary.title ?? []) || project.uid || "Project";
  const description = asText(heroPrimary.description ?? []);
  const image = heroPrimary.background_image?.url || null;

  return { title, description, image };
};

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { uid } = await params;

  if (!uid) {
    notFound();
  }

  const [project, seoSettingsDoc] = await Promise.all([
    getProject(uid),
    getSeoSettings(),
  ]);

  if (!project) {
    notFound();
  }

  const seoContent = getProjectSeoContent(project);

  return buildMetadata({
    path: project.url || `/projects/${uid}`,
    pageSeo: project.data as ProjectPageData,
    seoSettings: seoSettingsDoc?.data,
    fallbackTitle: seoContent.title,
    fallbackDescription: seoContent.description,
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { uid } = await params;

  if (!uid) {
    notFound();
  }

  const [project, seoSettingsDoc] = await Promise.all([
    getProject(uid),
    getSeoSettings(),
  ]);

  if (!project) {
    notFound();
  }

  const seoContent = getProjectSeoContent(project);
  const pageUrl = project.url || `/projects/${uid}`;
  const seoGraph = createSchemaGraph([
    getOrganizationSchema(seoSettingsDoc?.data),
    getBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: seoContent.title, url: pageUrl },
    ]),
    getProjectSchema({
      name: seoContent.title,
      description: seoContent.description,
      path: pageUrl,
      image: seoContent.image,
    }),
  ]);

  return (
    <main className="bg-black text-white">
      <JsonLd data={seoGraph} />
      <SliceZone slices={project.data.slices} components={components} />
    </main>
  );
}
