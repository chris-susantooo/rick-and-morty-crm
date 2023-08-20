import { ComponentPropsWithRef, forwardRef } from 'react';
import { cn } from 'utils';
import Muted from './Muted';

const KBD = forwardRef<HTMLElement, ComponentPropsWithRef<'kbd'>>(
  ({ className, children, ...rest }, ref) => (
    <kbd
      ref={ref}
      className={cn(
        'flex select-none rounded-[0.25rem] border border-gray-200 px-1.5',
        className
      )}
      {...rest}
    >
      <Muted>{children}</Muted>
    </kbd>
  )
);

export default KBD;
