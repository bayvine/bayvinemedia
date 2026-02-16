import { SliceZone } from "@prismicio/react";
import { notFound } from "next/navigation";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

type ProjectPageProps = {
  params: { uid: string };
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { uid } = await params;

  if (!uid) {
    notFound();
  }

  const client = createClient();
  const project = await client.getByUID("project", uid).catch(() => notFound());


  return (
    <main className="bg-black text-white">
      <SliceZone slices={project.data.slices} components={components} />
    </main>
  );
}
