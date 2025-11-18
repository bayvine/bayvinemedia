import { repositoryName } from "@/prismicio";
import { components } from "@/slices";
import { createClient } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

export default async function Home() {
	const client = createClient(repositoryName)
  const page = await client.getSingle("home")
  

  return <SliceZone slices={page.data.slices} components={components} />
  
}
