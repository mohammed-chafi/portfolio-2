import { useTranslations } from 'next-intl';
import { Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';
import { ContactForm } from '@/components/ContactForm';
import { CalendlyEmbed } from '@/components/CalendlyEmbed';
import { CONTACT } from '@/lib/site';

export function ContactSection({ locale }: { locale: string }) {
  const t = useTranslations('contact');

  const channels = [
    { icon: Mail, label: t('email'), href: `mailto:${CONTACT.email}`, ltr: true },
    { icon: Phone, label: t('phone'), href: `tel:${CONTACT.phone}`, ltr: true },
    { icon: Linkedin, label: t('linkedin'), href: t('linkedinUrl'), ltr: true, external: true },
    { icon: MapPin, label: t('location'), href: undefined, ltr: false },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-pad">
      <div className="container-page">
        <SectionHeading
          headingId="contact-title"
          eyebrow={t('eyebrow')}
          title={t('title')}
          intro={t('intro')}
        />

        <div className="mt-10 grid gap-6 lg:mt-12 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <div className="flex h-full flex-col gap-6">
              {/* Direct channels first: some visitors will never open a calendar. */}
              <div className="rounded-card border border-line bg-surface p-6 shadow-sm">
                <p className="label-caps text-ink-3">{t('directLabel')}</p>
                <ul className="mt-4 space-y-3">
                  {channels.map((channel) => {
                    const Icon = channel.icon;
                    const content = (
                      <>
                        <Icon className="size-4 shrink-0 text-accent" strokeWidth={1.75} aria-hidden />
                        <span dir={channel.ltr ? 'ltr' : undefined} className="numeric">
                          {channel.label}
                        </span>
                      </>
                    );
                    return (
                      <li key={channel.label}>
                        {channel.href ? (
                          <a
                            href={channel.href}
                            {...(channel.external
                              ? { target: '_blank', rel: 'noopener noreferrer' }
                              : {})}
                            className="inline-flex items-center gap-2.5 rounded-[4px] text-[15px] text-ink-2 transition-colors duration-fast hover:text-accent"
                          >
                            {content}
                          </a>
                        ) : (
                          <span className="inline-flex items-center gap-2.5 text-[15px] text-ink-2">
                            {content}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="rounded-card border border-line bg-surface p-6 shadow-sm">
                <h3 className="text-[17px] font-semibold text-ink">{t('form.title')}</h3>
                <div className="mt-5">
                  <ContactForm />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div>
              <div className="mb-4">
                <h3 className="text-[17px] font-semibold text-ink">{t('calendly.title')}</h3>
                <p className="mt-1 text-meta font-medium text-accent">{t('calendly.subtitle')}</p>
                <p className="mt-2 max-w-measure text-[15px] leading-relaxed text-ink-2">
                  {t('calendly.description')}
                </p>
              </div>
              <CalendlyEmbed locale={locale} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
