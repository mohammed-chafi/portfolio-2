import { Fragment } from 'react';

/**
 * Reveals a line of text word by word, each rising from behind its own box.
 *
 * Driven by CSS rather than JS: this is above-the-fold content, and a CSS
 * animation always runs. A script-driven entrance that fails to start would
 * leave the headline invisible, which is not a trade worth making for a hero.
 *
 * Splitting on spaces is safe in Arabic: the script joins letters *within* a
 * word, never across a space, so the shaping is untouched. Real spaces are left
 * between the masks rather than inside them, so the headline still wraps
 * naturally at any width. The mask carries padding for descenders and cancels
 * it with a negative margin, so the line box is unchanged.
 */
export function SplitWords({ text, baseDelay = 0 }: { text: string; baseDelay?: number }) {
  const words = text.split(' ');

  return (
    <>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="inline-block overflow-hidden pb-[0.22em] -mb-[0.22em] align-bottom">
            <span
              className="inline-block animate-word-up"
              style={{ animationDelay: `${baseDelay + i * 35}ms` }}
            >
              {word}
            </span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </>
  );
}
