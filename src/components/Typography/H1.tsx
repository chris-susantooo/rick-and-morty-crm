import { ComponentPropsWithRef, forwardRef } from 'react';
import { cn } from 'utils';

const H1 = forwardRef<HTMLHeadingElement, ComponentPropsWithRef<'h1'>>(
  ({ className, children, ...rest }, ref) => (
    <h1
      ref={ref}
      className={cn(
        'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
        className
      )}
      {...rest}
    >
      {children}
    </h1>
  )
);

export default H1;
