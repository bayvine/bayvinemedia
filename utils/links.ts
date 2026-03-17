import { asLink, type LinkField } from "@prismicio/client";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[0-9().\-\s]+$/;
const DOMAIN_PATTERN =
  /^(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)+(?:[/?#:][^\s]*)?$/i;
const HAS_SCHEME_PATTERN = /^[a-z][a-z\d+\-.]*:/i;

export const normalizeHref = (href?: string | null) => {
  if (!href) {
    return null;
  }

  const trimmedHref = href.trim();

  if (!trimmedHref) {
    return null;
  }

  if (
    trimmedHref.startsWith("/") ||
    trimmedHref.startsWith("#") ||
    trimmedHref.startsWith("?") ||
    trimmedHref.startsWith("./") ||
    trimmedHref.startsWith("../") ||
    trimmedHref.startsWith("//") ||
    HAS_SCHEME_PATTERN.test(trimmedHref)
  ) {
    return trimmedHref;
  }

  if (EMAIL_PATTERN.test(trimmedHref)) {
    return `mailto:${trimmedHref}`;
  }

  if (PHONE_PATTERN.test(trimmedHref)) {
    const normalizedPhone = trimmedHref.replace(/[^\d+]/g, "");
    return normalizedPhone ? `tel:${normalizedPhone}` : null;
  }

  if (DOMAIN_PATTERN.test(trimmedHref)) {
    return `https://${trimmedHref}`;
  }

  return `/${trimmedHref.replace(/^\/+/, "")}`;
};

export const getPrismicHref = (field?: LinkField | null) => {
  if (!field) {
    return null;
  }

  const href =
    asLink(field) ||
    ("url" in field && typeof field.url === "string" ? field.url : null);

  return normalizeHref(href);
};

export const isContactHref = (href?: string | null) => {
  const normalizedHref = normalizeHref(href);

  return (
    typeof normalizedHref === "string" &&
    /^(?:https?:\/\/[^/]+)?\/contact(\/|$|\?|#)/.test(normalizedHref)
  );
};
