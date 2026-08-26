'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Menu, X, CalendarDays } from 'lucide-react';
import { HEADER_NAV, SECTIONS } from '@/lib/site';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useActiveSection } from '@/components/useActiveSection';
import { Button } from '@/components/ui/button';
import { DURATION, EASE, stagger, fadeUp } from '@/lib/motion';
import { cn } from '@/lib/utils';

export function Header({ locale }: { locale: string }) {
  const t = useTranslations('nav');
  const tHero = useTranslations('hero');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(SECTIONS);

  /*
   * Read progress along the bottom edge of the header — the same measurement
   * idea as the hero scale, applied to the document: a hairline that fills as
   * you move through the page.
   */
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const ratio = max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0;

      // Written straight to the transform: scrolling is already a continuous
      // gesture, so there is nothing for an animation to interpolate, and this
      // keeps the hottest handler on the page free of springs and re-renders.
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${ratio})`;
      }
      setScrolled(doc.scrollTop > 8);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    // The document grows as sections reveal, which changes the denominator.
    const observer = new ResizeObserver(onScroll);
    observer.observe(document.body);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      observer.disconnect();
    };
  }, []);

  // Close the mobile panel on Escape and lock the page behind it.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 h-[var(--header-h)] border-b bg-canvas/85 backdrop-blur-md transition-colors duration-fast',
        scrolled ? 'border-line' : 'border-transparent'
      )}
    >
      <div className="container-page flex h-full items-center justify-between gap-6">
        <a
          href="#top"
          className="group/mark flex shrink-0 items-center gap-2.5 text-[15px] font-semibold tracking-[-0.01em] text-ink"
        >
          {/* The mark's tick grows on hover — same vocabulary as the hero scale. */}
          <span
            aria-hidden
            className="block h-4 w-[2px] origin-center scale-y-100 bg-accent transition-transform duration-card ease-out group-hover/mark:scale-y-125"
          />
          {tHero('name')}
        </a>

        <nav aria-label={t('primaryNav')} className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {HEADER_NAV.map((id) => {
              const isActive = active === id;
              return (
                <li key={id} className="relative">
                  <a
                    href={`#${id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'block py-1 text-[14px] transition-colors duration-fast',
                      isActive ? 'font-medium text-ink' : 'text-ink-2 hover:text-ink'
                    )}
                  >
                    {t(id)}
                  </a>
                  {/* Active marker: a tick under the current section. */}
                  <m.span
                    aria-hidden
                    className="absolute inset-x-0 -bottom-0.5 block h-px origin-left bg-accent rtl:origin-right"
                    initial={false}
                    animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                    transition={{ duration: DURATION.base, ease: EASE.out }}
                  />
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-4">
          <LanguageSwitcher currentLocale={locale} />

          <Button asChild size="sm" className="hidden md:inline-flex">
            <a href="#contact">{t('book')}</a>
          </Button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? t('closeMenu') : t('openMenu')}
            className="-me-1 flex h-9 w-9 items-center justify-center rounded-control text-ink transition-colors duration-fast hover:bg-wash lg:hidden"
          >
            <AnimatePresence initial={false} mode="wait">
              <m.span
                key={menuOpen ? 'close' : 'open'}
                initial={{ opacity: 0, rotate: menuOpen ? -90 : 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: menuOpen ? 90 : -90 }}
                transition={{ duration: DURATION.fast, ease: EASE.standard }}
                className="flex"
              >
                {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </m.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Read progress. Sits on the header's own bottom edge. */}
      <div
        ref={progressRef}
        aria-hidden
        style={{ transform: 'scaleX(0)' }}
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-accent will-change-transform rtl:origin-right"
      />

      <AnimatePresence>
        {menuOpen ? (
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: DURATION.base, ease: EASE.out }}
            className="fixed inset-x-0 top-[var(--header-h)] z-50 max-h-[calc(100dvh-var(--header-h))] overflow-y-auto border-b border-line bg-canvas lg:hidden"
          >
            <m.nav
              className="container-page py-4"
              variants={stagger(0.045, 0.05)}
              initial="hidden"
              animate="visible"
            >
              <ul className="flex flex-col">
                {SECTIONS.map((id) => (
                  <m.li key={id} variants={fadeUp} className="border-b border-line/70 last:border-b-0">
                    <a
                      href={`#${id}`}
                      onClick={() => setMenuOpen(false)}
                      className="block py-3.5 text-[15px] text-ink-2 transition-colors duration-fast hover:text-ink"
                    >
                      {t(id)}
                    </a>
                  </m.li>
                ))}
              </ul>
              <m.div variants={fadeUp}>
                <Button asChild size="md" className="mt-5 w-full">
                  <a href="#contact" onClick={() => setMenuOpen(false)}>
                    <CalendarDays />
                    {t('book')}
                  </a>
                </Button>
              </m.div>
            </m.nav>
          </m.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
