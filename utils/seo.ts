import type { Metadata } from "next";
import {
  type ImageField,
  type KeyTextField,
} from "@prismicio/client";
import { createClient } from "@/prismicio";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://bayvine.digital"
).replace(/\/$/, "");
export const htmlLang = "en-US";
export const openGraphLocale = "en_US";

export const absoluteUrl = (path?: string | null) => {
  if (!path) {
    return siteUrl;
  }

  if (/^https?:\/\//.test(path)) {
    return path;
  }

  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
};

export type SeoSettingsData = {
  site_name?: KeyTextField;
  business_name?: KeyTextField;
  legal_name?: KeyTextField;
  logo?: ImageField;
  business_phone?: KeyTextField;
  business_email?: KeyTextField;
  default_meta_title?: KeyTextField;
  default_meta_description?: KeyTextField;
  default_meta_image?: ImageField;
  use_local_business_schema?: boolean;
  street_address?: KeyTextField;
  address_locality?: KeyTextField;
  address_region?: KeyTextField;
  postal_code?: KeyTextField;
  address_country?: KeyTextField;
  latitude?: KeyTextField;
  longitude?: KeyTextField;
  price_range?: KeyTextField;
  service_areas?: Array<{
    area?: KeyTextField;
  }>;
  social_profiles?: Array<{
    url?: KeyTextField;
  }>;
};

export type PageSeoFields = {
  meta_title?: KeyTextField;
  meta_description?: KeyTextField;
  meta_image?: ImageField;
  canonical_url?: KeyTextField;
  noindex?: boolean;
};

type MetadataInput = {
  path?: string | null;
  pageSeo?: PageSeoFields | null;
  seoSettings?: SeoSettingsData | null;
  fallbackTitle?: string | null;
  fallbackDescription?: string | null;
};

type SchemaNode = Record<string, unknown>;

export const getSeoSettings = async () => {
  const client = createClient();
  return client.getSingle("seo_settings").catch(() => null);
};

export const getSiteName = (seoSettings?: SeoSettingsData | null) =>
  seoSettings?.site_name ||
  seoSettings?.business_name ||
  "Bayvine Digital";

export const getPageTitle = (
  seoSettings: SeoSettingsData | null | undefined,
  pageTitle?: string | null,
) => {
  const siteName = getSiteName(seoSettings);

  if (!pageTitle) {
    return seoSettings?.default_meta_title || siteName;
  }

  if (pageTitle.includes(siteName)) {
    return pageTitle;
  }

  return `${pageTitle} | ${siteName}`;
};

const getRobots = (noindex?: boolean) =>
  noindex
    ? {
        index: false,
        follow: false,
        googleBot: {
          index: false,
          follow: false,
        },
      }
    : undefined;

export const buildMetadata = ({
  path,
  pageSeo,
  seoSettings,
  fallbackTitle,
  fallbackDescription,
}: MetadataInput): Metadata => {
  const title = getPageTitle(
    seoSettings,
    pageSeo?.meta_title || fallbackTitle || undefined,
  );
  const description =
    pageSeo?.meta_description ||
    fallbackDescription ||
    seoSettings?.default_meta_description ||
    undefined;
  const image = pageSeo?.meta_image?.url || seoSettings?.default_meta_image?.url;
  const canonical = pageSeo?.canonical_url
    ? absoluteUrl(pageSeo.canonical_url)
    : path
      ? absoluteUrl(path)
      : undefined;
  const noindex = pageSeo?.noindex;

  return {
    title,
    description,
    alternates: canonical
      ? {
          canonical,
        }
      : undefined,
    robots: getRobots(noindex),
    openGraph: {
      title,
      description,
      url: path ? absoluteUrl(path) : undefined,
      siteName: getSiteName(seoSettings),
      type: "website",
      locale: openGraphLocale,
      images: image
        ? [
            {
              url: absoluteUrl(image),
            },
          ]
        : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images: image ? [absoluteUrl(image)] : undefined,
    },
  };
};

export const getOrganizationSchema = (
  seoSettings?: SeoSettingsData | null,
): SchemaNode | null => {
  if (!seoSettings) {
    return null;
  }

  const name = seoSettings.business_name || seoSettings.site_name;

  if (!name) {
    return null;
  }

  const hasAddress =
    Boolean(seoSettings.street_address) &&
    Boolean(seoSettings.address_locality) &&
    Boolean(seoSettings.address_region) &&
    Boolean(seoSettings.address_country);
  const useLocalBusiness =
    Boolean(seoSettings.use_local_business_schema) && hasAddress;
  const schemaType = useLocalBusiness ? "ProfessionalService" : "Organization";
  const socialProfiles =
    seoSettings.social_profiles
      ?.map((item) => item.url)
      .filter((url): url is string => Boolean(url)) ?? [];
  const serviceAreas =
    seoSettings.service_areas
      ?.map((item) => item.area)
      .filter((area): area is string => Boolean(area)) ?? [];

  const latitude = seoSettings.latitude ? Number(seoSettings.latitude) : null;
  const longitude = seoSettings.longitude ? Number(seoSettings.longitude) : null;

  return {
    "@id": absoluteUrl("/#organization"),
    "@type": schemaType,
    name,
    legalName: seoSettings.legal_name || undefined,
    url: siteUrl,
    logo: seoSettings.logo?.url ? absoluteUrl(seoSettings.logo.url) : undefined,
    image: seoSettings.default_meta_image?.url
      ? absoluteUrl(seoSettings.default_meta_image.url)
      : undefined,
    telephone: seoSettings.business_phone || undefined,
    email: seoSettings.business_email || undefined,
    priceRange: seoSettings.price_range || undefined,
    sameAs: socialProfiles.length ? socialProfiles : undefined,
    areaServed: serviceAreas.length ? serviceAreas : undefined,
    address: useLocalBusiness
      ? {
          "@type": "PostalAddress",
          streetAddress: seoSettings.street_address,
          addressLocality: seoSettings.address_locality,
          addressRegion: seoSettings.address_region,
          postalCode: seoSettings.postal_code || undefined,
          addressCountry: seoSettings.address_country,
        }
      : undefined,
    geo:
      useLocalBusiness && Number.isFinite(latitude) && Number.isFinite(longitude)
        ? {
            "@type": "GeoCoordinates",
            latitude,
            longitude,
          }
        : undefined,
  };
};

export const getWebsiteSchema = (
  seoSettings?: SeoSettingsData | null,
): SchemaNode | null => {
  const siteName = getSiteName(seoSettings);

  return {
    "@id": absoluteUrl("/#website"),
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    publisher: {
      "@id": absoluteUrl("/#organization"),
    },
  };
};

export const getBreadcrumbSchema = (
  items: Array<{ name: string; url: string }>,
): SchemaNode | null => {
  if (!items.length) {
    return null;
  }

  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
};

export const getServiceSchema = ({
  name,
  description,
  path,
  seoSettings,
  image,
}: {
  name: string;
  description?: string | null;
  path: string;
  seoSettings?: SeoSettingsData | null;
  image?: string | null;
}): SchemaNode | null => {
  if (!name) {
    return null;
  }

  const serviceAreas =
    seoSettings?.service_areas
      ?.map((item) => item.area)
      .filter((area): area is string => Boolean(area)) ?? [];

  return {
    "@type": "Service",
    name,
    serviceType: name,
    description: description || undefined,
    url: absoluteUrl(path),
    image: image ? absoluteUrl(image) : undefined,
    provider: {
      "@id": absoluteUrl("/#organization"),
    },
    mainEntityOfPage: absoluteUrl(path),
    areaServed: serviceAreas.length ? serviceAreas : undefined,
  };
};

export const getProjectSchema = ({
  name,
  description,
  path,
  image,
}: {
  name: string;
  description?: string | null;
  path: string;
  image?: string | null;
}): SchemaNode | null => {
  if (!name) {
    return null;
  }

  return {
    "@type": "CreativeWork",
    name,
    description: description || undefined,
    url: absoluteUrl(path),
    image: image ? absoluteUrl(image) : undefined,
    publisher: {
      "@id": absoluteUrl("/#organization"),
    },
    mainEntityOfPage: absoluteUrl(path),
  };
};

export const createSchemaGraph = (
  nodes: Array<SchemaNode | null | undefined>,
): Record<string, unknown> | null => {
  const graph = nodes.filter((node): node is SchemaNode => Boolean(node));

  if (!graph.length) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
};
