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

type TermsAndConditionsData = {
  eyebrow?: KeyTextField;
  title?: KeyTextField;
  content?: RichTextField;
  slices?: PrismicSliceZone;
  meta_title?: KeyTextField;
  meta_description?: KeyTextField;
  meta_image?: ImageField;
};

const getTermsAndConditions = async () => {
  const client = await createClient(repositoryName);
  return client.getSingle("terms_and_conditions");
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getTermsAndConditions();
  const data = (page?.data ?? {}) as TermsAndConditionsData;

  return {
    title: data.meta_title || data.title || "Terms and Conditions",
    description:
      data.meta_description || "Terms and Conditions for Bayvine Digital Agency.",
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

export default async function TermsAndConditionsPage() {
  const page = await getTermsAndConditions();

  const data = page.data as TermsAndConditionsData;

  return (
    <main className="bg-black text-white">
      <LegalDocumentContent
        eyebrow={data.eyebrow}
        title={data.title}
        content={data.content}
        defaultEyebrow="Legal"
        defaultTitle="Terms and Conditions"
      />
      <SliceZone slices={data.slices ?? []} components={components} />
    </main>
  );
}
