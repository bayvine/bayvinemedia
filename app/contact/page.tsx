import type { Metadata } from "next";
import type { Content } from "@prismicio/client";
import { createClient } from "@/prismicio";
import JsonLd from "@/components/JsonLd";
import { components } from "@/slices";
import { SliceZone } from "@prismicio/react";
import {
  buildMetadata,
  createSchemaGraph,
  getBreadcrumbSchema,
  getOrganizationSchema,
  getSeoSettings,
  type PageSeoFields,
} from "@/utils/seo";

type ContactPageData = Content.ContactDocument["data"] & PageSeoFields;

export const revalidate = 7776000; // 90 days

const getContactPage = async () => {
  const client = createClient();
  return client.getSingle("contact");
};

export async function generateMetadata(): Promise<Metadata> {
  const [page, seoSettingsDoc] = await Promise.all([
    getContactPage(),
    getSeoSettings(),
  ]);

  return buildMetadata({
    path: page.url || "/contact",
    pageSeo: page.data as ContactPageData,
    seoSettings: seoSettingsDoc?.data,
    fallbackTitle: "Contact",
    fallbackDescription:
      "Contact Bayvine Digital to discuss web design, development, branding, SEO, and digital strategy.",
  });
}

export default async function ContactPage() {
  const [page, seoSettingsDoc] = await Promise.all([
    getContactPage(),
    getSeoSettings(),
  ]);
  const seoGraph = createSchemaGraph([
    getOrganizationSchema(seoSettingsDoc?.data),
    getBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Contact", url: page.url || "/contact" },
    ]),
  ]);

  return (
    <main className="bg-black text-white">
      <JsonLd data={seoGraph} />
      <SliceZone slices={page.data.slices} components={components} />
    </main>
  );
}
