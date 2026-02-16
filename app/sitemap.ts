import type { MetadataRoute } from "next";
import { type Content } from "@prismicio/client";
import { createClient } from "@/prismicio";

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(
  /\/$/,
  ""
);

const toAbsoluteUrl = (path: string) =>
  `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;

const toDate = (value?: string | null) => (value ? new Date(value) : new Date());

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const client = createClient();

  const [
    homeDoc,
    contactDoc,
    privacyPolicyDoc,
    termsDoc,
    projects,
    services,
  ] = await Promise.all([
    client.getSingle("home").catch(() => null),
    client.getSingle("contact").catch(() => null),
    client.getSingle("privacy_policy").catch(() => null),
    client.getSingle("terms_and_conditions").catch(() => null),
    client.getAllByType<Content.ProjectDocument>("project").catch(() => []),
    client.getAllByType<Content.ServiceDocument>("service").catch(() => []),
  ]);

  const routes: MetadataRoute.Sitemap = [];

  if (homeDoc) {
    routes.push({
      url: toAbsoluteUrl(homeDoc.url || "/"),
      lastModified: toDate(homeDoc.last_publication_date),
      changeFrequency: "weekly",
      priority: 1,
    });
  }

  if (contactDoc) {
    routes.push({
      url: toAbsoluteUrl(contactDoc.url || "/contact"),
      lastModified: toDate(contactDoc.last_publication_date),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  if (privacyPolicyDoc) {
    routes.push({
      url: toAbsoluteUrl(privacyPolicyDoc.url || "/privacy-policy"),
      lastModified: toDate(privacyPolicyDoc.last_publication_date),
      changeFrequency: "yearly",
      priority: 0.3,
    });
  }

  if (termsDoc) {
    routes.push({
      url: toAbsoluteUrl(termsDoc.url || "/terms-and-conditions"),
      lastModified: toDate(termsDoc.last_publication_date),
      changeFrequency: "yearly",
      priority: 0.3,
    });
  }

  for (const project of projects) {
    if (!project.url) continue;

    routes.push({
      url: toAbsoluteUrl(project.url),
      lastModified: toDate(project.last_publication_date),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const service of services) {
    if (!service.url) continue;

    routes.push({
      url: toAbsoluteUrl(service.url),
      lastModified: toDate(service.last_publication_date),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  return routes;
}
