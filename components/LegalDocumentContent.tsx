import {
  isFilled,
  type KeyTextField,
  type RichTextField,
} from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import Section from "@/components/Section";
import Eyebrow from "@/components/Eyebrow";

type LegalDocumentContentProps = {
  eyebrow?: KeyTextField;
  title?: KeyTextField;
  content?: RichTextField;
  defaultEyebrow: string;
  defaultTitle: string;
};

const LegalDocumentContent = ({
  eyebrow,
  title,
  content,
  defaultEyebrow,
  defaultTitle,
}: LegalDocumentContentProps) => {
  return (
    <Section className="pt-50 pb-16">
      <div className="mx-auto w-full">
        <Eyebrow className="mb-5">{eyebrow || defaultEyebrow}</Eyebrow>
        <h1 className="text-3xl font-black uppercase sm:text-5xl">
          {title || defaultTitle}
        </h1>

        <div className="mt-12 text-base text-slate-100/90 sm:text-lg">
          {isFilled.richText(content) ? (
            <PrismicRichText
              field={content}
              components={{
                heading2: ({ children }) => (
                  <h2 className="mt-10 text-2xl font-bold uppercase sm:text-3xl">
                    {children}
                  </h2>
                ),
                heading3: ({ children }) => (
                  <h3 className="mt-8 text-xl font-bold uppercase sm:text-2xl">
                    {children}
                  </h3>
                ),
                paragraph: ({ children }) => (
                  <p className="mt-4">{children}</p>
                ),
                list: ({ children }) => (
                  <ul className="mt-4 list-disc space-y-2 pl-6">{children}</ul>
                ),
                oList: ({ children }) => (
                  <ol className="mt-4 list-decimal space-y-2 pl-6">{children}</ol>
                ),
              }}
            />
          ) : (
            <p className="mt-4 text-slate-200">
              Content coming soon.
            </p>
          )}
        </div>
      </div>
    </Section>
  );
};

export default LegalDocumentContent;
