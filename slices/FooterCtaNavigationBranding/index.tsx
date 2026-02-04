import { Content } from "@prismicio/client";
import {
  PrismicLink,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";
import { RxArrowTopRight } from "react-icons/rx";

import { createClient } from "@/prismicio";
import Section from "@/components/Section";
import Link from "next/link";
import { PrismicNextLink } from "@prismicio/next";
import CTAButton from "@/components/CTAButton";

/**
 * Props for `FooterCtaNavigationBranding`.
 */
export type FooterCtaNavigationBrandingProps =
  SliceComponentProps<Content.FooterCtaNavigationBrandingSlice>;

/**
 * Component for "FooterCtaNavigationBranding" Slices.
 */
const FooterCtaNavigationBranding = async ({
  slice,
}: FooterCtaNavigationBrandingProps) => {
  const client = createClient();
  const footerDoc = await client.getSingle("footer").catch(() => null);
  const isContactHref = (href?: string | null) =>
    typeof href === "string" && /\/contact(\/|$|\?|#)/.test(href);
  const ctaHref = slice.primary.cta_button.url ?? "#";
  const isContactLink = isContactHref(ctaHref);
  const navGroups = slice.primary.page_nav_links || [];
  const navMap = navGroups.reduce<
    Record<string, (typeof navGroups)[number]["nav_item"]>
  >((acc, section) => {
    acc[section.heading as string] = section.nav_item;
    return acc;
  }, {});

  const trademark = footerDoc?.data?.trademark || "Bayvine Digital";
	const ctaLabel = slice.primary.cta_button?.text;

  return (
		<Section
			className="relative isolate overflow-hidden mt-20"
			style={{
				backgroundImage: "url(/images/Footer-background.png)",
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
			data-slice-type={slice.slice_type}
			data-slice-variation={slice.variation}
		>
			<div className="relative z-50">
				{/* top */}
				<div className="mb-20 flex flex-col gap-10 lg:flex-row lg:gap-0 justify-between">
					<div>
						<h2 className="text-xl font-bold uppercase">
							{slice.primary.cta_heading}
						</h2>
						<div className="my-1">
							<PrismicRichText
								field={slice.primary.cta_text}
								components={{
									paragraph: ({ children }) => (
										<p className="text-2xl font-semibold">{children}</p>
									),
								}}
							/>
						</div>

					  {ctaLabel && (
							<Link
								href={ctaHref}
								target={isContactLink ? undefined : "_blank"}
								rel={isContactLink ? undefined : "noreferrer"}
								className="mt-4 w-fit inline-flex items-center"
							>
								<CTAButton className="w-full inline-flex gap-2 whitespace-nowrap">
									{ctaLabel} <RxArrowTopRight />
								</CTAButton>
							</Link>
						)}
					</div>
					<div className="flex gap-10">
						{Object.entries(navMap).map(([heading, items], key) => (
							<div key={key}>
								<h3 className="font-bold mb-2 text-lg">{heading}</h3>
								<ul className="flex flex-col gap-2">
									{items.map((i, key) => {
										const navIsContact = isContactHref(i.url ?? "");
                    return (
											<li key={key}>
												<PrismicNextLink
													className="hover:underline! text-lg"
													field={i}
													{...(navIsContact ? { target: "_self" } : {})}
												>
													{i.text}
												</PrismicNextLink>
											</li>
										)
									})}
								</ul>
							</div>
						))}
					</div>
				</div>

				{/* bottom */}
				<div>
					{/* top of bottom section */}
					<div className="flex flex-col gap-2 lg:flex-row md:gap-0 justify-between">
						<div className="flex items-center gap-4">
							{trademark}
							<PrismicNextLink
								className="hover:underline!"
								field={footerDoc?.data.privacy_policy}
								{...(isContactHref(footerDoc?.data.privacy_policy?.url)
									? { target: "_self" }
									: {})}
							>
								{footerDoc?.data.privacy_policy.text}
							</PrismicNextLink>
						</div>
						<div className="text-lg font-bold pr-4">
							<PrismicRichText field={slice.primary.motto} />
						</div>
					</div>
					{/* Bottom of bottom section */}
					<div>
						<img
							src={slice.primary.branding.url}
							className="w-full"
							draggable={false}
						/>
					</div>
				</div>
			</div>

			<div className="absolute z-0 bg-linear-to-b from-black w-full inset-0  h-full via-black/0 to-black/70" />
		</Section>
	)
};

export default FooterCtaNavigationBranding;
