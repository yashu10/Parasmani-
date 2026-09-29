import { CONTACT } from "./content";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "") ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
  "http://localhost:3000"
).replace(/\/$/, "");

/** Indexing stays OFF until the site is on its final domain: set NEXT_PUBLIC_ALLOW_INDEXING=1 there. */
export const ALLOW_INDEXING = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "1";

export const SITE_NAME = "Parasmani Engineering Pvt. Ltd.";

export function pageMeta(path: string, title: string, description: string, image = "/images/U.jpg") {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | PEPL`,
      description,
      url: path,
      siteName: SITE_NAME,
      type: "website" as const,
      locale: "en_IN",
      images: [{ url: image, width: 1400, height: 933, alt: title }],
    },
    twitter: { card: "summary_large_image" as const, title: `${title} | PEPL`, description, images: [image] },
  };
}

export const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: SITE_NAME,
      alternateName: "PEPL",
      url: SITE_URL,
      logo: `${SITE_URL}/images/pepl-logo.png`,
      email: CONTACT.email,
      telephone: CONTACT.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: CONTACT.street,
        addressLocality: CONTACT.locality,
        addressRegion: CONTACT.region,
        postalCode: CONTACT.postalCode,
        addressCountry: "IN",
      },
      contactPoint: [{ "@type": "ContactPoint", telephone: CONTACT.phone, email: CONTACT.email, contactType: "sales", areaServed: "IN", availableLanguage: ["en", "hi", "gu"] }],
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#works`,
      name: SITE_NAME,
      description: "Heavy steel fabrication and fabrication engineering works.",
      url: SITE_URL,
      image: `${SITE_URL}/images/U.jpg`,
      telephone: CONTACT.phone,
      email: CONTACT.email,
      parentOrganization: { "@id": `${SITE_URL}/#org` },
      address: {
        "@type": "PostalAddress",
        streetAddress: CONTACT.street,
        addressLocality: CONTACT.locality,
        addressRegion: CONTACT.region,
        postalCode: CONTACT.postalCode,
        addressCountry: "IN",
      },
    },
  ],
};
