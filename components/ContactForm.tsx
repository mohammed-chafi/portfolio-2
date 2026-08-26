'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Check, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CONTACT } from '@/lib/site';

type Errors = Partial<Record<'name' | 'email' | 'message', string>>;

/**
 * The form composes a pre-filled email and hands it to the visitor's mail
 * client, so the site stays fully static and nothing is silently dropped.
 *
 * TODO: to receive submissions server-side instead, post to a route handler
 * (app/api/contact/route.ts) backed by Resend, Formspree or similar, and
 * replace the mailto handoff below.
 */
export function ContactForm() {
  const t = useTranslations('contact.form');
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const company = String(data.get('company') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    const nextErrors: Errors = {};
    if (!name) nextErrors.name = t('errorRequired');
    if (!email) nextErrors.email = t('errorRequired');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) nextErrors.email = t('errorEmail');
    if (!message) nextErrors.message = t('errorRequired');

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const subject = `${name}${company ? ` — ${company}` : ''}`;
    const body = [message, '', '—', name, company, email].filter(Boolean).join('\n');

    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="name" label={t('name')} error={errors.name}>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            placeholder={t('namePlaceholder')}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
        </Field>

        <Field id="email" label={t('email')} error={errors.email}>
          <Input
            id="email"
            name="email"
            type="email"
            dir="ltr"
            autoComplete="email"
            placeholder={t('emailPlaceholder')}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
        </Field>
      </div>

      <Field id="company" label={t('company')} hint={t('companyOptional')}>
        <Input
          id="company"
          name="company"
          autoComplete="organization"
          placeholder={t('companyPlaceholder')}
        />
      </Field>

      <Field id="message" label={t('message')} error={errors.message}>
        <Textarea
          id="message"
          name="message"
          rows={5}
          placeholder={t('messagePlaceholder')}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
      </Field>

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <Button type="submit">
          <Send />
          {t('submit')}
        </Button>

        <p aria-live="polite" className="text-meta text-ink-2">
          {sent ? (
            <span className="inline-flex items-center gap-1.5">
              <Check className="size-4 text-accent" aria-hidden />
              <span>
                <span className="font-medium text-ink">{t('successTitle')}</span> — {t('success')}
              </span>
            </span>
          ) : null}
        </p>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <Label htmlFor={id}>{label}</Label>
        {hint ? <span className="text-[12px] text-ink-3">{hint}</span> : null}
      </div>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-[12px] font-medium text-accent">
          {error}
        </p>
      ) : null}
    </div>
  );
}
