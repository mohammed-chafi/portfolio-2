import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowDown, CalendarDays } from "lucide-react";
import { SplitWords } from "@/components/SplitWords";
import { Button } from "@/components/ui/button";

/*
 * Two-column hero: the claim on the reading side, a portrait on the other.
 *
 * The layout follows the reference the client supplied, but the trust strip
 * under the copy carries real, checkable signals — the engineering degree and
 * the three client logos — rather than the star ratings and review scores the
 * reference used, which would have to be invented here.
 *
 * Entirely CSS-animated: nothing above the fold waits on JavaScript.
 */
export function Hero() {
  const t = useTranslations("hero");

  return (
    <section
      id="top"
      aria-labelledby="hero-headline"
      className="relative pb-12 pt-10 lg:pb-16 lg:pt-14"
    >
      <div className="container-page w-full">
        {/*
          Identity strip — the header block of a drawing sheet, so it rules the
          full width of the sheet rather than sitting inside one column. That is
          also what gives it room to stay on a single line: inside the 7/12
          column it had to wrap.
        */}
        <div
          className="flex animate-rise flex-col gap-1.5 border-b border-line pb-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
          style={{ animationDelay: "80ms" }}
        >
          <p className="label-caps whitespace-nowrap text-ink">
            {t("name")}
            <span aria-hidden className="mx-2 text-line">
              —
            </span>
            <span className="text-ink-2">{t("role")}</span>
          </p>
          <p className="label-caps flex items-center gap-2 text-ink-3">
            <span className="numeric whitespace-nowrap">{t("location")}</span>
            <span
              aria-hidden
              className="block size-1.5 shrink-0 rounded-full bg-accent"
            />
            <span className="whitespace-nowrap sm:hidden">
              {t("availabilityShort")}
            </span>
            <span className="hidden whitespace-nowrap sm:inline">
              {t("availability")}
            </span>
          </p>
        </div>

        <div className="mt-8 grid items-center gap-10 lg:mt-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h1
              id="hero-headline"
              className="max-w-full text-pretty text-display text-ink lg:max-w-[19ch]"
            >
              <SplitWords text={t("headline")} baseDelay={200} />
            </h1>

            <p
              className="mt-5 max-w-measure animate-rise text-lead text-ink-2"
              style={{ animationDelay: "480ms" }}
            >
              {t("subline")}
            </p>

            <div
              className="mt-7 flex animate-rise flex-col gap-3 sm:flex-row sm:items-center"
              style={{ animationDelay: "580ms" }}
            >
              <Button asChild size="lg">
                <a href="#projects">
                  {t("ctaProjects")}
                  <ArrowDown />
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

          <div
            className="flex animate-rise justify-center lg:col-span-5"
            style={{ animationDelay: "320ms" }}
          >
            {/*
              Standing figure, cut out so it sits directly on the page rather
              than in a panel. Sized by height, not width: at roughly 1:3 the
              full-body crop would otherwise tower over the column.
              TODO: replace with Mohammed's photograph once supplied.
            */}
            <Image
              src="/images/hero-engineer.png"
              alt={t("figureAlt")}
              width={602}
              height={1857}
              priority
              sizes="(min-width: 1024px) 220px, 180px"
              className="h-[340px] w-auto sm:h-[420px] lg:h-[540px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
