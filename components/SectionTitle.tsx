import { RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import clsx from "clsx";

type SectionTitleProps = {
  titleClassName?: string;
  paragraphClassNames?: string;
  title?: RichTextField | string | null;
  description?: RichTextField | string | null;
  noUpperCase?: boolean;
};

const isRichTextField = (value: unknown): value is RichTextField =>
  Array.isArray(value);

const SectionTitle = ({
  description,
  titleClassName,
  title,
  noUpperCase,
  paragraphClassNames
}: SectionTitleProps) => {
  const titleClasses = clsx(
    "text-2xl font-bold sm:text-3xl",
    !noUpperCase && "uppercase",
    titleClassName
  );

  return (
    <div className="max-w-xl">
      {typeof title === "string" ? (
        <h2 className={titleClasses}>{title}</h2>
      ) : isRichTextField(title) ? (
        <PrismicRichText
          field={title}
          components={{
            heading1: ({ children }) => <h2 className={titleClasses}>{children}</h2>,
            heading2: ({ children }) => <h2 className={titleClasses}>{children}</h2>,
            heading3: ({ children }) => <h2 className={titleClasses}>{children}</h2>,
            paragraph: ({ children }) => <h2 className={titleClasses}>{children}</h2>,
          }}
        />
      ) : null}
      <div className={clsx(["my-1 max-w-lg", paragraphClassNames])}>
        {!description ? null : typeof description === "string" ? (
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
