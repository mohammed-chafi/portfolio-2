import { useTranslations } from 'next-intl';
import { ArrowUp, Linkedin, Mail, Phone } from 'lucide-react';
import { SECTIONS, CONTACT } from '@/lib/site';

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tHero = useTranslations('hero');
  const tContact = useTranslations('contact');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-page py-12 lg:py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="flex items-center gap-2.5 text-[15px] font-semibold text-ink">
              <span aria-hidden className="block h-4 w-[2px] bg-accent" />
              {tHero('name')}
            </p>
            <p className="mt-3 max-w-[36ch] text-[15px] leading-relaxed text-ink-2">
              {t('tagline')}
            </p>
            <p className="numeric mt-3 text-meta text-ink-3">{tHero('location')}</p>
          </div>

          <nav aria-label={t('navLabel')} className="md:col-span-4">
            <p className="label-caps text-ink-3">{t('navLabel')}</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {SECTIONS.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="text-[15px] text-ink-2 transition-colors duration-fast hover:text-accent"
                  >
                    {tNav(id)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="label-caps text-ink-3">{t('contactLabel')}</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="inline-flex items-center gap-2 text-[15px] text-ink-2 transition-colors duration-fast hover:text-accent"
                >
                  <Mail className="size-4 shrink-0 text-accent" strokeWidth={1.75} aria-hidden />
                  <span dir="ltr">{tContact('email')}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="inline-flex items-center gap-2 text-[15px] text-ink-2 transition-colors duration-fast hover:text-accent"
                >
                  <Phone className="size-4 shrink-0 text-accent" strokeWidth={1.75} aria-hidden />
                  <span dir="ltr" className="numeric">
                    {tContact('phone')}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={tContact('linkedinUrl')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[15px] text-ink-2 transition-colors duration-fast hover:text-accent"
                >
                  <Linkedin className="size-4 shrink-0 text-accent" strokeWidth={1.75} aria-hidden />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="numeric text-meta text-ink-3">
            © {year} {tHero('name')}. {t('rights')}
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 rounded-[4px] text-meta font-medium text-ink-2 transition-colors duration-fast hover:text-accent"
          >
            {t('backToTop')}
            <ArrowUp className="size-4" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
