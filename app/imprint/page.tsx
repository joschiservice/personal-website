import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/app/components/system/Container";
import { trimInside } from "@/helpers";
import { getRequestDictionary } from "@/app/i18n/getDictionary";
import { localeAlternates, localeHref } from "@/app/i18n/config";
import { siteConfig } from "@/app/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, dictionary } = await getRequestDictionary();
  const canonical = localeHref(locale, "/imprint");
  return {
    title: dictionary.imprint.title,
    description: dictionary.imprint.metadataDescription,
    alternates: { canonical, languages: localeAlternates("/imprint") },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: `${dictionary.imprint.title} · ${siteConfig.name}`,
      description: dictionary.imprint.metadataDescription,
      url: canonical,
    },
  };
}

export default async function Imprint() {
  const { dictionary } = await getRequestDictionary();
  const copy = dictionary.imprint;
  const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE;
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

  return (
    <div className="legal-page">
      <Container>
        <p className="system-label">{copy.label}</p>
        <h1>{copy.title}</h1>
        <div className="legal-page__grid">
          <section>
            <h2>01</h2>
            <p>
              {copy.intro}<br />
              {copy.operator}: Joschua Haß
            </p>
          </section>
          <section>
            <h2>02 / {copy.contactTitle}</h2>
            <p>
              {phone ? (
                <>{copy.phone}: <Link href={`tel:${trimInside(phone)}`}>{phone}</Link><br /></>
              ) : null}
              {email ? (
                <>{copy.email}: <Link href={`mailto:${email}`}>{email}</Link><br /></>
              ) : null}
              {copy.addressLines.map((line) => (
                <span key={line} className="block">{line}</span>
              ))}
            </p>
          </section>
          <section>
            <h2>03 / {copy.copyrightTitle}</h2>
            <p>{copy.copyrightBody}</p>
          </section>
        </div>
      </Container>
    </div>
  );
}
