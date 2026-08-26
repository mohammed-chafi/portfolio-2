import { useTranslations } from "next-intl";
import { ArrowDown, CalendarDays } from "lucide-react";
import { RangeRule } from "@/components/RangeRule";
import { SplitWords } from "@/components/SplitWords";
import { Button } from "@/components/ui/button";

/*
 * The hero entrance is one orchestrated sequence — the strip sets the frame,
 * the headline lands word by word, then the supporting copy and the actions
 * follow — and it is built entirely in CSS. Nothing above the fold depends on
 * JavaScript to become visible.
 */
export function Hero() {
  const t = useTranslations("hero");

  return (
    <section
      id="top"
      aria-labelledby="hero-headline"
      className="relative flex min-h-[calc(100svh-var(--header-h))] flex-col justify-center pb-12 pt-14 lg:pb-16 lg:pt-20"
    >
      <div className="container-page w-full">
        {/* Identity strip — reads like the header block of a drawing sheet. */}
        <div
          className="flex animate-rise flex-col gap-2 border-b border-line pb-4 sm:flex-row sm:items-baseline sm:justify-between"
          style={{ animationDelay: "80ms" }}
        >
          <p className="label-caps text-ink">
            {t("name")}
            <span aria-hidden className="mx-2 text-line">
              —
            </span>
            <span className="text-ink-2">{t("role")}</span>
          </p>
          <p className="label-caps flex items-center gap-2 text-ink-3">
            <span
              aria-hidden
              className="block size-1.5 shrink-0 rounded-full bg-accent"
            />
            {/* The full phrase does not fit a phone; the short form carries the same signal. */}
            <span className="whitespace-nowrap sm:hidden">
              {t("availabilityShort")}
            </span>
            <span className="hidden sm:inline">{t("availability")}</span>
          </p>
        </div>

        <h1
          id="hero-headline"
          className="mt-8 max-w-full text-pretty text-display text-ink sm:max-w-[26ch] lg:mt-10 lg:max-w-[30ch]"
        >
          <SplitWords text={t("headline")} baseDelay={200} />
        </h1>

        <p
          className="mt-6 max-w-measure animate-rise text-lead text-ink-2"
          style={{ animationDelay: "480ms" }}
        >
          {t("subline")}
        </p>

        <div
          className="mt-8 flex animate-rise flex-col gap-3 sm:flex-row sm:items-center lg:mt-10"
          style={{ animationDelay: "580ms" }}
        >
          <Button asChild size="lg">
            <a href="#projects">
              {t("ctaProjects")}
              <ArrowDown className="transition-transform duration-fast group-hover/btn:translate-y-0.5" />
            </a>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <a href="#contact">
              <CalendarDays />
              {t("ctaBook")}
            </a>
          </Button>
        </div>
      </div>

      <div className="container-page mt-14 w-full lg:mt-20">
        <RangeRule />
      </div>
    </section>
  );
}
