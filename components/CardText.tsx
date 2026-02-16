import { RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import clsx from "clsx";

type CardTextProps = {
  className?: string;
  title?: string;
  description?: RichTextField | string;
  noUpperCase?: boolean;
};

const CardText = ({ description, title, noUpperCase }: CardTextProps) => {
  return (
    <div className="max-w-xl">
      {(!title && null) || (
        <h3
          className={clsx([
            "text-xl font-bold uppercase sm:text-2xl",
            !noUpperCase && "uppercase",
          ])}
        >
          {title}
        </h3>
      )}

      {description ? (
        <div className="my-1 max-w-lg">
          {typeof description === "string" ? (
            <p>{description}</p>
          ) : (
            <PrismicRichText
              field={description}
              components={{
                paragraph: ({ children }) => <p>{children}</p>,
              }}
            />
          )}
        </div>
      ) : null}
    </div>
  );
};

export default CardText;
