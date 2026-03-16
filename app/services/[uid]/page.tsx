import type { Metadata } from "next";
import { asText, type ImageField, type RichTextField } from "@prismicio/client";
import { Content } from "@prismicio/client";
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
  getSeoSettings,
  getServiceSchema,
  type PageSeoFields,
} from "@/utils/seo";

type ServicePageProps = {
  params: { uid: string };
};

type ServicePageData = Content.ServiceDocument["data"] & PageSeoFields;

type ServiceHeroPrimary = {
  title?: RichTextField;
  description?: RichTextField;
  background_image?: ImageField;
};

// 1 day
export const revalidate = 86400;

const getService = async (uid: string) => {
  const client = createClient();
  return client
    .getByUID<Content.ServiceDocument>("service", uid)
    .catch(() => null);
};

const getServiceSeoContent = (service: Content.ServiceDocument) => {
  const heroSlice = service.data.slices.find(
    (slice) => slice.slice_type === "service_hero",
  );
  const heroPrimary = (heroSlice?.primary ?? {}) as ServiceHeroPrimary;
  const title = asText(heroPrimary.title ?? []) || service.uid || "Service";
  const description = asText(heroPrimary.description ?? []);
  const image = heroPrimary.background_image?.url || null;

  return { title, description, image };
};

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { uid } = await params;

  if (!uid) {
    notFound();
  }

  const [service, seoSettingsDoc] = await Promise.all([
    getService(uid),
    getSeoSettings(),
  ]);

  if (!service) {
    notFound();
  }

  const seoContent = getServiceSeoContent(service);

  return buildMetadata({
    path: service.url || `/services/${uid}`,
    pageSeo: service.data as ServicePageData,
    seoSettings: seoSettingsDoc?.data,
    fallbackTitle: seoContent.title,
    fallbackDescription: seoContent.description,
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { uid } = await params;

  if (!uid) {
    notFound();
  }

  const [service, seoSettingsDoc] = await Promise.all([
    getService(uid),
    getSeoSettings(),
  ]);

  if (!service) {
    notFound();
  }

  const seoContent = getServiceSeoContent(service);
  const pageUrl = service.url || `/services/${uid}`;
  const seoGraph = createSchemaGraph([
    getOrganizationSchema(seoSettingsDoc?.data),
    getBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: seoContent.title, url: pageUrl },
    ]),
    getServiceSchema({
      name: seoContent.title,
      description: seoContent.description,
      path: pageUrl,
      seoSettings: seoSettingsDoc?.data,
      image: seoContent.image,
    }),
  ]);

  return (
    <main className="bg-black text-white">
      <JsonLd data={seoGraph} />
      <SliceZone slices={service.data.slices} components={components} />
    </main>
  );
}
