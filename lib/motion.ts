import type { Transition, Variants } from 'framer-motion';

/**
 * Motion system.
 *
 * Every animation on the site draws its easing and duration from here, so the
 * whole page moves with one hand. Entrances use an expo-out curve: fast at the
 * start, long settle — it reads as precise rather than bouncy, which suits an
 * engineering portfolio. Nothing animates a layout property; transform and
 * opacity only, so none of this costs a reflow.
 */

export const EASE = {
  /** Entrances. Quick departure, long settle. */
  out: [0.16, 1, 0.3, 1],
  /** Reversible states (accordions, rotations). */
  inOut: [0.65, 0, 0.35, 1],
  /** Small UI feedback. */
  standard: [0.4, 0, 0.2, 1],
} as const;

export const DURATION = {
  fast: 0.15,
  base: 0.35,
  mid: 0.55,
  slow: 0.9,
} as const;

/** How far an element travels on entrance. Small on purpose. */
export const TRAVEL = 14;

export const transition = {
  entrance: { duration: DURATION.mid, ease: EASE.out },
  quick: { duration: DURATION.base, ease: EASE.out },
  feedback: { duration: DURATION.fast, ease: EASE.standard },
} satisfies Record<string, Transition>;

/** Shared viewport trigger: fire once, slightly before the element is centred. */
export const VIEWPORT = { once: true, margin: '-12% 0px -8% 0px' } as const;

/** Parent that releases its children in sequence. */
export const stagger = (staggerChildren = 0.07, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

/** The default entrance: rise and fade. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: TRAVEL },
  visible: { opacity: 1, y: 0, transition: transition.entrance },
};

/** Cards settle in from very slightly small — reads as arriving, not sliding. */
export const cardIn: Variants = {
  hidden: { opacity: 0, y: TRAVEL, scale: 0.985 },
  visible: { opacity: 1, y: 0, scale: 1, transition: transition.entrance },
};

/** A rule or spine drawing itself from its inline start. */
export const drawX: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: DURATION.slow, ease: EASE.out } },
};

export const drawY: Variants = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: DURATION.slow, ease: EASE.out } },
};

/** Words in the hero headline, revealed from behind their own line box. */
export const wordUp: Variants = {
  hidden: { y: '110%' },
  visible: { y: '0%', transition: { duration: DURATION.mid, ease: EASE.out } },
};

/** A node landing on the timeline spine. */
export const dotIn: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: DURATION.base, ease: EASE.out } },
};

/** A tick appearing on a scale. */
export const tickIn: Variants = {
  hidden: { opacity: 0, y: 4 },
  visible: { opacity: 1, y: 0, transition: transition.quick },
};

/** Shared hover/press feedback for buttons and card links. */
export const press = {
  whileHover: { y: -1 },
  whileTap: { scale: 0.985 },
  transition: transition.feedback,
} as const;
