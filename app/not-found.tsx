import Link from 'next/link';
import { routing } from '@/lib/routing';
import './globals.css';

/**
 * Root-level fallback for paths the locale middleware could not match.
 * It sits outside [locale], so it renders its own document shell.
 */
export default function RootNotFound() {
  return (
    <html lang={routing.defaultLocale} dir="ltr">
      <body>
        <main className="flex min-h-screen items-center justify-center px-6">
          <div className="max-w-measure">
            <p className="eyebrow">404</p>
            <h1 className="mt-4 text-section text-ink">Page introuvable</h1>
            <p className="mt-3 text-lead text-ink-2">
              Cette adresse n’existe pas. Retournez à l’accueil du portfolio.
            </p>
            <p className="mt-6">
              <Link
                href={`/${routing.defaultLocale}`}
                className="inline-flex h-11 items-center rounded-control bg-accent px-5 text-sm font-medium text-white transition-colors duration-fast hover:bg-accent-strong"
              >
                Retour à l’accueil
              </Link>
            </p>
          </div>
        </main>
      </body>
    </html>
  );
}
