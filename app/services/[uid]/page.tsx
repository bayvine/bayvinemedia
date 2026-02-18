import { Content } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { notFound } from "next/navigation";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

type ServicePageProps = {
  params: { uid: string };
};

// 1 day
export const revalidate = 86400;

export default async function ServicePage({ params }: ServicePageProps) {
  const { uid } = await params;

  if (!uid) {
    notFound();
  }

  const client = createClient();
  const service = await client
    .getByUID<Content.ServiceDocument>("service", uid)
    .catch(() => null);

  if (!service) {
    notFound();
  }

  return (
    <main className="bg-black text-white">
      <SliceZone slices={service.data.slices} components={components} />
    </main>
  );
}
