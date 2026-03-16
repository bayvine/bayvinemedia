import type { Metadata } from "next";
import type { Content } from "@prismicio/client";
import { createClient } from "@/prismicio";
import JsonLd from "@/components/JsonLd";
import { components } from "@/slices";
import { SliceZone } from "@prismicio/react";
import {
  buildMetadata,
  createSchemaGraph,
  getOrganizationSchema,
  getSeoSettings,
  getWebsiteSchema,
  type PageSeoFields,
} from "@/utils/seo";

type HomePageData = Content.HomeDocument["data"] & PageSeoFields;

// 1 day
export const revalidate = 86400;

const getHomePage = async () => {
  const client = createClient();
  return client.getSingle("home");
};

export async function generateMetadata(): Promise<Metadata> {
  const [page, seoSettingsDoc] = await Promise.all([
    getHomePage(),
    getSeoSettings(),
  ]);

  return buildMetadata({
    path: page.url || "/",
    pageSeo: page.data as HomePageData,
    seoSettings: seoSettingsDoc?.data,
    fallbackDescription:
      "Creative digital solutions for modern brands in Colorado Springs and across the USA.",
  });
}

export default async function Home() {
  const [page, seoSettingsDoc] = await Promise.all([
    getHomePage(),
    getSeoSettings(),
  ]);
  const seoGraph = createSchemaGraph([
    getOrganizationSchema(seoSettingsDoc?.data),
    getWebsiteSchema(seoSettingsDoc?.data),
  ]);

  return (
    <>
      <JsonLd data={seoGraph} />
      <SliceZone slices={page.data.slices} components={components} />
    </>
  );
}
