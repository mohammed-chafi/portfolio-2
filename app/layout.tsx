import type { ReactNode } from 'react';

/**
 * Pass-through root. The real document shell lives in app/[locale]/layout.tsx
 * so that `lang` and `dir` can follow the active locale; this file exists only
 * so that the locale-less 404 has a root layout to attach to.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
