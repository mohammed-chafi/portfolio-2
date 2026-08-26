import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { ExpertiseGrid } from '@/components/ExpertiseGrid';
import { Timeline } from '@/components/Timeline';
import { Projects } from '@/components/Projects';
import { ServicesGrid } from '@/components/ServicesGrid';
import { Education } from '@/components/Education';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { routing } from '@/lib/routing';
import { SITE_URL, CONTACT } from '@/lib/site';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'hero' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const tMeta = await getTranslations({ locale, namespace: 'meta' });

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: t('name'),
    jobTitle: t('role'),
    description: tMeta('description'),
    url: `${SITE_URL}/${locale}`,
    email: `mailto:${CONTACT.email}`,
    telephone: CONTACT.phone,
    image: `${SITE_URL}/${locale}/opengraph-image`,
    sameAs: [CONTACT.linkedin],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tanger',
      addressCountry: 'MA',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'EMSI — École Marocaine des Sciences de l’Ingénieur',
    },
    knowsAbout: [
      'Software Engineering',
      'ASP.NET Core',
      'Angular',
      'Spring Boot',
      'Next.js',
      'Machine Learning',
      'Data Engineering',
      'Business Intelligence',
      'Industrial IoT',
      'Predictive Maintenance',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      {/*
        Shown on `focus-visible`, not `focus`. Switching locale is a client-side
        navigation, and the App Router moves focus to the top of the new page —
        which lands on this link, the first focusable element. With `focus:` that
        made the skip link flash up on every language change. `focus-visible:`
        only fires for keyboard focus, so it still appears on Tab, where it is
        needed, and stays hidden when the router moves focus on its own.
      */}
      <a
        href="#main"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:start-4 focus-visible:top-4 focus-visible:z-[60] focus-visible:rounded-control focus-visible:bg-accent focus-visible:px-4 focus-visible:py-2.5 focus-visible:text-sm focus-visible:font-medium focus-visible:text-white"
      >
        {tNav('skipToContent')}
      </a>

      <Header locale={locale} />

      <main id="main" className="pt-[var(--header-h)]">
        <Hero />
        <About />
        <ExpertiseGrid />
        <Timeline />
        <Projects />
        <ServicesGrid />
        <Education />
        <ContactSection locale={locale} />
      </main>

      <Footer />
    </>
  );
}
