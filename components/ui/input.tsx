import * as React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        'h-11 w-full rounded-control border border-line bg-surface px-3.5 text-[15px] text-ink transition-colors duration-fast',
        'placeholder:text-ink-3 hover:border-ink-3/60 focus:border-accent',
        'aria-[invalid=true]:border-accent',
        className
      )}
      {...props}
    />
  )
);
Input.displayName = 'Input';

export { Input };
