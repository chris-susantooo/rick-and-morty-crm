import { ComponentPropsWithRef, forwardRef } from 'react';
import { cn } from 'utils';

const H3 = forwardRef<HTMLHeadingElement, ComponentPropsWithRef<'h3'>>(
  ({ className, children, ...rest }, ref) => (
    <h3
      ref={ref}
      className={cn(
        'scroll-m-20 text-2xl font-semibold tracking-tight',
        className
      )}
      {...rest}
    >
      {children}
    </h3>
  )
);

export default H3;
