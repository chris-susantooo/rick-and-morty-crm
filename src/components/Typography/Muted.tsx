import { ComponentPropsWithRef, forwardRef } from 'react';
import { cn } from 'utils';

const Muted = forwardRef<HTMLHeadingElement, ComponentPropsWithRef<'p'>>(
  ({ className, children, ...rest }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-muted-foreground', className)}
      {...rest}
    >
      {children}
    </p>
  )
);

export default Muted;
