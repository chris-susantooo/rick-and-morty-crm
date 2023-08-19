import { ComponentPropsWithRef, forwardRef } from 'react';
import { cn } from 'utils';

const P = forwardRef<HTMLParagraphElement, ComponentPropsWithRef<'p'>>(
  ({ className, children, ...rest }, ref) => (
    <p
      ref={ref}
      className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}
      {...rest}
    >
      {children}
    </p>
  )
);

export default P;
