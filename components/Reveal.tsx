'use client';

import { m } from 'framer-motion';
import type { Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { VIEWPORT, fadeUp, stagger } from '@/lib/motion';

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'li' | 'section' | 'ul' | 'ol';
  /** Variant to animate with. Defaults to the standard rise-and-fade. */
  variants?: Variants;
  /** Hold the entrance back by this many seconds. */
  delay?: number;
};

/**
 * Single-element entrance. Fires once, when the element reaches the reading
 * band of the viewport. Reduced motion is handled globally by MotionProvider.
 */
export function Reveal({
  children,
  className,
  as = 'div',
  variants = fadeUp,
  delay = 0,
}: RevealProps) {
  const Tag = m[as];

  return (
    <Tag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </Tag>
  );
}

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'ul' | 'ol' | 'section';
  /** Gap between each child's entrance, in seconds. */
  step?: number;
  delay?: number;
};

/**
 * Parent that releases its children in sequence. Children must be `RevealItem`
 * (or any motion element carrying the matching variants) — the stagger is
 * driven by variant propagation, not by per-item delay maths, so the rhythm
 * stays correct however many items a section has.
 */
export function RevealGroup({
  children,
  className,
  as = 'div',
  step = 0.07,
  delay = 0,
}: RevealGroupProps) {
  const Tag = m[as];

  return (
    <Tag
      className={className}
      variants={stagger(step, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {children}
    </Tag>
  );
}

/** A child of RevealGroup. Inherits its timing from the parent's stagger. */
export function RevealItem({
  children,
  className,
  as = 'div',
  variants = fadeUp,
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'li';
  variants?: Variants;
}) {
  const Tag = m[as];
  return (
    <Tag className={className} variants={variants}>
      {children}
    </Tag>
  );
}
