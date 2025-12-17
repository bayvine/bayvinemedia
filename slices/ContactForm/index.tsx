import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Section from "@/components/Section";
import { PrismicNextLink } from "@prismicio/next";

/**
 * Props for `ContactForm`.
 */
export type ContactFormProps = SliceComponentProps<Content.ContactFormSlice>;

/**
 * Component for "ContactForm" Slices.
 */
const ContactForm: FC<ContactFormProps> = ({ slice }) => {
  return (
		<Section
			className="relative isolate overflow-hidden min-h-[500px] flex items-end pb-10"
			style={{
				backgroundImage: `url(${slice.primary.hero_background.url})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			<div className="relative z-50 flex lg:flex-row lg:justify-between gap-2">
				<div>
					<PrismicRichText
						components={{
							heading1: ({ children }) => (
								<h1 className="text-4xl font-semibold">{children}</h1>
							),
						}}
						field={slice.primary.heading}
					></PrismicRichText>
					<PrismicNextLink field={slice.primary.questions_link}>
						<span className="hover:underline text-lg font-medium">
							{slice.primary.questions_link.text}
						</span>
					</PrismicNextLink>
				</div>
				<div>
					<PrismicRichText
						field={slice.primary.subheading}
						components={{
							heading3: ({ children }) => (
								<h3 className="text-md font-semibold">{children}</h3>
							),
						}}
          />
          
				</div>
			</div>
			<div className="absolute z-0 bg-linear-to-b from-black w-full inset-0  h-full  to-black/20" />
		</Section>
	)
};

export default ContactForm;
