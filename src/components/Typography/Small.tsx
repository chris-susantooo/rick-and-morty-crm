import { ComponentPropsWithRef, forwardRef } from 'react';
import { cn } from 'utils';

const Small = forwardRef<HTMLElement, ComponentPropsWithRef<'small'>>(
  ({ className, children, ...rest }, ref) => (
    <small
      ref={ref}
      className={cn('text-sm font-medium leading-none', className)}
      {...rest}
    >
      {children}
    </small>
  )
);

export default Small;
