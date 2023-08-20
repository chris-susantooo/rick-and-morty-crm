import { InputHTMLAttributes, ReactNode, forwardRef, useId } from 'react';
import { cn } from 'utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  startAddon?: ReactNode;
  endAddon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, startAddon, endAddon, id: idOverride, ...props },
    ref
  ) => {
    const fallbackId = useId();
    const id = idOverride || fallbackId;

    return (
      <div className="relative">
        {startAddon && (
          <label
            htmlFor={id}
            className="absolute top-[50%] translate-y-[-50%] ltr:left-3 rtl:right-3"
          >
            {startAddon}
          </label>
        )}

        <input
          id={id}
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-[1.35rem] text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className,
            startAddon && `ps-10`,
            endAddon && 'pe-10'
          )}
          ref={ref}
          {...props}
        />

        {endAddon && (
          <label
            htmlFor={id}
            className="absolute top-[50%] translate-y-[-50%] ltr:right-3 rtl:left-3"
          >
            {endAddon}
          </label>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export default Input;
