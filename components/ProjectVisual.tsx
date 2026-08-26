'use client';

import { m } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { DURATION, EASE, stagger } from '@/lib/motion';

/**
 * Project visuals.
 *
 * No screenshots exist yet and stock "tech" imagery would say nothing, so each
 * project gets a drawn abstraction of what the system actually does: the
 * storefront's search and catalogue, the sensor trace crossing its alert
 * threshold, the weight readout and its printed ticket, the compliance matrix.
 *
 * Each one assembles itself when it scrolls into view, in the order the real
 * system works — the query lands before the results, the trace is drawn before
 * the alert fires. The motion is the explanation, which is why it earns its
 * place on an otherwise still page. Palette-only, inline, resolution
 * independent, and it plays once.
 *
 * TODO: replace with real screenshots once Mohammed provides them.
 */

const C = {
  line: '#E5E7EB',
  wash: '#F8FAFC',
  surface: '#FFFFFF',
  accent: '#1D4ED8',
  subtle: '#94A3B8',
} as const;

type VisualProps = { className?: string };

/*
 * No `initial` / `whileInView` here on purpose. Every visual is rendered inside
 * a Reveal wrapper, which is itself a motion element driving the same
 * hidden/visible labels — so the diagram inherits its parent's state and
 * assembles right after its card arrives. Declaring a second viewport trigger
 * on the child fights that inheritance and leaves the parts stuck hidden.
 */
const svgProps = {
  viewBox: '0 0 480 260',
  role: 'presentation',
  'aria-hidden': true,
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
};

/** Parts that simply appear. */
const partIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.base, ease: EASE.out } },
};

/** Parts that scale up from their own centre. */
const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.base, ease: EASE.out },
  },
};

/** A stroke drawing itself along its own length. */
const draw = (duration: number): Variants => ({
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration, ease: EASE.out }, opacity: { duration: 0.01 } },
  },
});

/** Catalogue + instant search — ITALBOX. */
function StorefrontVisual({ className }: VisualProps) {
  return (
    <m.svg {...svgProps} className={className} variants={stagger(0.08)}>
      <rect x="24" y="20" width="432" height="220" rx="8" fill={C.surface} stroke={C.line} />
      <path d="M24 48h432" stroke={C.line} />
      <rect x="40" y="30" width="120" height="8" rx="4" fill={C.line} />

      {/* The query is typed first. */}
      <m.g variants={partIn}>
        <rect x="40" y="66" width="200" height="28" rx="6" fill={C.wash} stroke={C.line} />
        <circle cx="57" cy="80" r="5" stroke={C.accent} strokeWidth="1.5" />
        <path d="M61 84l4 4" stroke={C.accent} strokeWidth="1.5" strokeLinecap="round" />
      </m.g>
      <m.rect
        x="72"
        y="76"
        width="64"
        height="8"
        rx="4"
        fill={C.subtle}
        style={{ originX: 0, transformBox: 'fill-box' }}
        variants={{
          hidden: { scaleX: 0 },
          visible: { scaleX: 1, transition: { duration: DURATION.base, ease: EASE.out } },
        }}
      />

      {/* Then the results land, and the match is marked. */}
      {[0, 1, 2, 3].map((i) => {
        const x = 40 + i * 104;
        const matched = i === 1;
        return (
          <m.g key={i} variants={popIn} style={{ originX: 0.5, originY: 0.5, transformBox: 'fill-box' }}>
            <rect
              x={x}
              y="114"
              width="88"
              height="96"
              rx="6"
              fill={matched ? C.surface : C.wash}
              stroke={matched ? C.accent : C.line}
            />
            <rect x={x + 12} y="128" width="64" height="44" rx="4" fill={C.line} />
            <rect x={x + 12} y="182" width="48" height="6" rx="3" fill={C.subtle} />
            <rect
              x={x + 12}
              y="194"
              width="28"
              height="6"
              rx="3"
              fill={matched ? C.accent : C.line}
            />
          </m.g>
        );
      })}
    </m.svg>
  );
}

/** Sensor trace crossing the alert threshold — MTS predictive maintenance. */
function PredictiveVisual({ className }: VisualProps) {
  return (
    <m.svg {...svgProps} className={className} variants={stagger(0.12)}>
      <rect x="24" y="20" width="432" height="220" rx="8" fill={C.surface} stroke={C.line} />

      {/* Plot frame */}
      <path d="M56 44v168h352" stroke={C.line} />
      {[76, 116, 156, 196].map((y) => (
        <path key={y} d={`M56 ${y}h352`} stroke={C.line} strokeDasharray="1 5" />
      ))}
      {[56, 120, 184, 248, 312, 376].map((x) => (
        <path key={x} d={`M${x} 212v6`} stroke={C.line} />
      ))}

      {/* The threshold is set before anything is measured. */}
      <m.path
        d="M56 88h352"
        stroke={C.accent}
        strokeDasharray="5 4"
        strokeWidth="1.25"
        variants={draw(0.5)}
      />
      <m.rect x="366" y="70" width="42" height="14" rx="3" fill={C.accent} variants={partIn} />

      {/* Then the machine is measured, and the drift is drawn. */}
      <m.path
        d="M56 176 L88 168 L120 174 L152 160 L184 166 L216 150 L248 154 L280 132 L312 138 L344 108"
        stroke={C.subtle}
        strokeWidth="1.75"
        strokeLinejoin="round"
        variants={draw(1.1)}
      />
      <m.path
        d="M344 108 L376 96 L408 62"
        stroke={C.accent}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        variants={draw(0.45)}
      />

      {/* The alert fires last. */}
      <m.g variants={popIn} style={{ originX: 0.5, originY: 0.5, transformBox: 'fill-box' }}>
        <circle cx="396" cy="80" r="9" fill={C.accent} opacity="0.12" />
        <circle cx="396" cy="80" r="3.5" fill={C.accent} />
      </m.g>
    </m.svg>
  );
}

/** Live weight readout and printed ticket — SENSGRP. */
function WeighingVisual({ className }: VisualProps) {
  return (
    <m.svg {...svgProps} className={className} variants={stagger(0.1)}>
      <rect x="24" y="20" width="432" height="220" rx="8" fill={C.surface} stroke={C.line} />

      {/* Load lands on the platform first. */}
      <m.g variants={partIn}>
        <path d="M48 196h224" stroke={C.line} strokeWidth="1.5" />
        <path d="M96 176h128v20H96z" fill={C.wash} stroke={C.line} />
        <path d="M72 196v14M248 196v14" stroke={C.line} />
      </m.g>

      {/* The reading settles. */}
      <m.g variants={partIn}>
        <rect x="48" y="48" width="248" height="96" rx="6" fill={C.wash} stroke={C.line} />
        <text
          x="68"
          y="106"
          fill={C.accent}
          fontFamily="var(--font-sans), system-ui, sans-serif"
          fontSize="38"
          fontWeight="600"
          letterSpacing="-0.02em"
        >
          1 248.6
        </text>
        <text
          x="238"
          y="106"
          fill={C.subtle}
          fontFamily="var(--font-sans), system-ui, sans-serif"
          fontSize="16"
          fontWeight="500"
        >
          kg
        </text>
        <rect x="68" y="120" width="52" height="6" rx="3" fill={C.line} />
      </m.g>

      {/* The PLC link carries it to the service. */}
      <m.path d="M172 144v22h84" stroke={C.line} strokeDasharray="4 4" variants={draw(0.5)} />
      <m.circle cx="172" cy="168" r="3" fill={C.accent} variants={popIn} style={{ originX: 0.5, originY: 0.5, transformBox: 'fill-box' }} />

      {/* And the ticket prints. */}
      <m.g
        variants={{
          hidden: { opacity: 0, y: -14 },
          visible: { opacity: 1, y: 0, transition: { duration: DURATION.mid, ease: EASE.out } },
        }}
      >
        <path
          d="M320 60h96v132l-12-8-12 8-12-8-12 8-12-8-12 8-12-8-12 8V60z"
          fill={C.wash}
          stroke={C.line}
        />
        <rect x="336" y="80" width="52" height="7" rx="3.5" fill={C.accent} />
        <rect x="336" y="98" width="64" height="6" rx="3" fill={C.line} />
        <rect x="336" y="112" width="44" height="6" rx="3" fill={C.line} />
        <rect x="336" y="126" width="58" height="6" rx="3" fill={C.line} />
      </m.g>
    </m.svg>
  );
}

/** Certification matrix with expiring entries — TE Connectivity. */
function ComplianceVisual({ className }: VisualProps) {
  const rows = [0, 1, 2, 3];
  const cols = [0, 1, 2, 3, 4, 5];
  // Certifications that have lapsed or are due — the point of the dashboard.
  const due = new Set(['1-4', '3-4', '0-5', '2-2']);

  return (
    <m.svg {...svgProps} className={className} variants={stagger(0.05)}>
      <rect x="24" y="20" width="432" height="220" rx="8" fill={C.surface} stroke={C.line} />

      {cols.map((c) => (
        <rect key={c} x={160 + c * 48} y="48" width="26" height="6" rx="3" fill={C.line} />
      ))}
      <path d="M48 66h384" stroke={C.line} />

      {/* Rows fill in one person at a time, then what is due is marked. */}
      {rows.map((r) => {
        const y = 86 + r * 38;
        return (
          <m.g key={r} variants={partIn}>
            <circle cx="60" cy={y + 8} r="7" fill={C.wash} stroke={C.line} />
            <rect x="78" y={y + 1} width="58" height="7" rx="3.5" fill={C.subtle} />
            <rect x="78" y={y + 13} width="38" height="6" rx="3" fill={C.line} />

            {cols.map((c) => {
              const isDue = due.has(`${r}-${c}`);
              return (
                <g key={c}>
                  <rect
                    x={160 + c * 48}
                    y={y}
                    width="26"
                    height="17"
                    rx="4"
                    fill={isDue ? C.surface : C.wash}
                    stroke={isDue ? C.accent : C.line}
                  />
                  {isDue ? (
                    <path
                      d={`M${168 + c * 48} ${y + 8.5}h10`}
                      stroke={C.accent}
                      strokeWidth="1.75"
                      strokeLinecap="round"
                    />
                  ) : (
                    <path
                      d={`M${168 + c * 48} ${y + 9}l3 3 5-6`}
                      stroke={C.subtle}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}
                </g>
              );
            })}
          </m.g>
        );
      })}
    </m.svg>
  );
}

const VISUALS = [StorefrontVisual, PredictiveVisual, WeighingVisual, ComplianceVisual];

export function ProjectVisual({ index, className }: { index: number; className?: string }) {
  const Visual = VISUALS[index % VISUALS.length];
  return <Visual className={className} />;
}
