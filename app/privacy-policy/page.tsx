import type { Metadata } from "next";
import {
  createClient,
  type ImageField,
  type KeyTextField,
  type RichTextField,
  type SliceZone as PrismicSliceZone,
} from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { notFound } from "next/navigation";
import LegalDocumentContent from "@/components/LegalDocumentContent";
import { repositoryName } from "@/prismicio";
import { components } from "@/slices";

type PrivacyPolicyData = {
  eyebrow?: KeyTextField;
  title?: KeyTextField;
  content?: RichTextField;
  slices?: PrismicSliceZone;
  meta_title?: KeyTextField;
  meta_description?: KeyTextField;
  meta_image?: ImageField;
};

const getPrivacyPolicy = async () => {
  const client = createClient(repositoryName);
  return client.getSingle("privacy_policy").catch(() => null);
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPrivacyPolicy();
  const data = (page?.data ?? {}) as PrivacyPolicyData;

  return {
    title: data.meta_title || data.title || "Bayvine Digital • Privacy Policy",
    description:
      data.meta_description || "Privacy Policy for Bayvine Digital Agency.",
    openGraph: data.meta_image?.url
      ? {
          images: [
            {
              url: data.meta_image.url,
            },
          ],
        }
      : undefined,
  };
}

export default async function PrivacyPolicyPage() {
  const page = await getPrivacyPolicy();

  if (!page) {
    notFound();
  }

  const data = page.data as PrivacyPolicyData;

  return (
    <main className="bg-black text-white">
      <LegalDocumentContent
        eyebrow={data.eyebrow}
        title={data.title}
        content={data.content}
        defaultEyebrow="Legal"
        defaultTitle="Privacy Policy"
      />
      <SliceZone slices={data.slices ?? []} components={components} />
    </main>
  );
}
