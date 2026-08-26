'use client';

import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Motion runtime for the whole site.
 *
 * `LazyMotion` with the `domAnimation` feature set ships variants, whileInView
 * and the hover/tap gestures while leaving out drag and layout projection,
 * which nothing here uses — roughly half the bundle of the full `motion` build.
 * Components import `m` rather than `motion` to stay inside that budget.
 *
 * `reducedMotion="user"` makes every transform animation on the site collapse
 * to its final state when the visitor asks for reduced motion, without each
 * component having to check.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
