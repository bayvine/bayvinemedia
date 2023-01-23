import "@/styles/globals.css"
import { PrismicProvider } from "@prismicio/react"
import { PrismicPreview } from "@prismicio/next"
import { repositoryName } from "../../prismicio"
import Link from "next/link"

export default function App({ Component, pageProps }) {
	return (
		<PrismicProvider internalLinkComponent={(props) => <Link {...props} />}>
			<PrismicPreview repositoryName={repositoryName}>
				<Component {...pageProps} />
			</PrismicPreview>
		</PrismicProvider>
	)
}
