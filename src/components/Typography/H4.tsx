import { ComponentPropsWithRef, forwardRef } from 'react';
import { cn } from 'utils';

const H4 = forwardRef<HTMLHeadingElement, ComponentPropsWithRef<'h4'>>(
  ({ className, children, ...rest }, ref) => (
    <h4
      ref={ref}
      className={cn(
        'scroll-m-20 text-xl font-semibold tracking-tight',
        className
      )}
      {...rest}
    >
      {children}
    </h4>
  )
);

export default H4;
