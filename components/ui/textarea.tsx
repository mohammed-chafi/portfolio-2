import * as React from 'react';
import { cn } from '@/lib/utils';

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      'min-h-[132px] w-full resize-y rounded-control border border-line bg-surface px-3.5 py-3 text-[15px] leading-relaxed text-ink transition-colors duration-fast',
      'placeholder:text-ink-3 hover:border-ink-3/60 focus:border-accent',
      'aria-[invalid=true]:border-accent',
      className
    )}
    {...props}
  />
));
Textarea.displayName = 'Textarea';

export { Textarea };
