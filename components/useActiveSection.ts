'use client';

import { useEffect, useState } from 'react';

/**
 * Reports which anchor section currently occupies the reading band of the
 * viewport, so the header can show where the visitor is. Purely additive:
 * if IntersectionObserver is unavailable, nothing is highlighted.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // Band running from just under the header to the middle of the screen.
      { rootMargin: '-88px 0px -55% 0px', threshold: 0 }
    );

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
