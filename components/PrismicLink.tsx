import type { ComponentProps } from "react";
import { type LinkField } from "@prismicio/client";
import { PrismicNextLink as BasePrismicNextLink } from "@prismicio/next";
import { getPrismicHref, normalizeHref } from "@/utils/links";

type BasePrismicLinkProps = ComponentProps<typeof BasePrismicNextLink>;
type PrismicLinkProps = Omit<BasePrismicLinkProps, "href"> & {
  href?: BasePrismicLinkProps["href"] | string | null;
  field?: LinkField | null;
};

const PrismicLink = ({ field, href, ...props }: PrismicLinkProps) => {
  const normalizedHref =
    typeof href === "string"
      ? normalizeHref(href)
      : href ?? getPrismicHref(field);

  return (
    <BasePrismicNextLink
      field={field}
      href={normalizedHref ?? href}
      {...props}
    />
  );
};

export default PrismicLink;
