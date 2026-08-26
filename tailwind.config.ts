import type { Config } from 'tailwindcss';

/**
 * Design system — locked to the brief.
 * One accent (deep blue), light mode only, no gradients, no extra hues.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#FAFAFA',        // page background
        surface: '#FFFFFF',       // cards
        wash: '#F8FAFC',          // card hover / inset panels
        line: '#E5E7EB',          // borders, rules
        ink: '#0F172A',           // primary text
        'ink-2': '#475569',       // secondary text
        // Brief specifies #94A3B8 for tertiary text, but that is 2.46:1 on the
        // page background — below the WCAG AA floor the brief also requires.
        // Moved one step down the same slate ramp: 4.56:1, same visual role.
        'ink-3': '#64748B',       // captions, tick labels
        // #94A3B8 kept for non-text marks only (illustration strokes).
        'ink-faint': '#94A3B8',
        accent: '#1D4ED8',        // CTA, links, active icons
        'accent-strong': '#1E40AF', // hover
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-arabic)', 'var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Fluid where the brief gives a desktop/mobile range.
        display: ['clamp(1.875rem, 1.15rem + 3.1vw, 3.5rem)', { lineHeight: '1.08', letterSpacing: '-0.02em', fontWeight: '700' }],
        section: ['clamp(1.5rem, 1.18rem + 1.05vw, 2.125rem)', { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '600' }],
        lead: ['1.0625rem', { lineHeight: '1.7' }],
        body: ['1rem', { lineHeight: '1.65' }],
        meta: ['0.8125rem', { lineHeight: '1.5' }],
        tick: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.09em' }],
      },
      maxWidth: {
        container: '1200px',
        measure: '68ch',
      },
      borderRadius: {
        card: '12px',
        control: '8px',
      },
      boxShadow: {
        // Deliberately shallow — no colored or heavy drops.
        sm: '0 1px 2px 0 rgb(15 23 42 / 0.04), 0 1px 3px 0 rgb(15 23 42 / 0.05)',
        md: '0 2px 4px -1px rgb(15 23 42 / 0.05), 0 8px 20px -6px rgb(15 23 42 / 0.10)',
      },
      keyframes: {
        /* Hero entrance. CSS-driven so above-the-fold content can never be
           left hidden by a JS animation that fails to start. */
        rise: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'none' },
        },
        'word-up': {
          from: { transform: 'translateY(110%)' },
          to: { transform: 'translateY(0)' },
        },
        'draw-x': {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
      },
      animation: {
        rise: 'rise 550ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'word-up': 'word-up 550ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'draw-x': 'draw-x 900ms cubic-bezier(0.16, 1, 0.3, 1) both',
      },
      transitionDuration: {
        fast: '150ms',
        card: '200ms',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
