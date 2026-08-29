import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Chrome that reads as "a website", so a screenshot inside it needs no caption
 * to be understood as one.
 *
 * It also does the cropping the design depends on: the viewport below the bar
 * is a fixed aspect ratio with `object-top`, so any screenshot — whatever its
 * height, whatever OS chrome was captured around it — lands on the same
 * baseline as its neighbours and shows the top of the page.
 */
export function BrowserFrame({
  domain,
  children,
  className,
}: {
  domain?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      dir="ltr"
      className={cn(
        'w-full overflow-hidden rounded-[10px] border border-line bg-surface',
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-line bg-wash px-3 py-2">
        <span aria-hidden className="flex gap-1.5">
          <span className="block size-2 rounded-full border border-line bg-surface" />
          <span className="block size-2 rounded-full border border-line bg-surface" />
          <span className="block size-2 rounded-full border border-line bg-surface" />
        </span>
        {domain ? (
          <span className="ms-1 flex-1 truncate rounded-[4px] border border-line bg-surface px-2 py-0.5 text-center text-[10px] font-medium text-ink-3">
            {domain}
          </span>
        ) : null}
      </div>
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-wash">{children}</div>
    </div>
  );
}
