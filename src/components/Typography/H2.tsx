import { ComponentPropsWithRef, forwardRef } from 'react';
import { cn } from 'utils';

const H2 = forwardRef<HTMLHeadingElement, ComponentPropsWithRef<'h2'>>(
  ({ className, children, ...rest }, ref) => (
    <h2
      ref={ref}
      className={cn(
        'scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0',
        className
      )}
      {...rest}
    >
      {children}
    </h2>
  )
);

export default H2;
