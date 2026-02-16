import { RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import clsx from "clsx";

type SectionTitleProps = {
  titleClassName?: string;
  title?: string;
  description?: RichTextField | string;
  noUpperCase?: boolean;
};

const SectionTitle = ({ description, titleClassName, title, noUpperCase }: SectionTitleProps) => {
  return (
    <div className="max-w-xl">
      <h2 className={clsx(["text-2xl font-bold sm:text-3xl"],  !noUpperCase && 'uppercase', titleClassName)}>{title}</h2>
      <div className="my-1 max-w-lg">
        {(!description && null) || typeof description === "string" ? (
          <p className="text-lg">{description}</p>
        ) : (
          <PrismicRichText
            field={description}
            components={{
              paragraph: ({ children }) => (
                <p className="text-lg">
                  {children}
                </p>
              ),
            }}
          />
        )}
      </div>
    </div>
  );
};

export default SectionTitle;
