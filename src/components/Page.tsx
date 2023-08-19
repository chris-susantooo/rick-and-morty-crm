import { HTMLProps, forwardRef, useEffect } from 'react';
import { cn } from 'utils';

interface Props extends HTMLProps<HTMLDivElement> {
  title: string;
}

const Page = forwardRef<HTMLDivElement, Props>(
  ({ className, title, children, ...rest }, ref) => {
    useEffect(() => {
      document.title = `${title} | Rick and Morty`;
    }, [title]);

    return (
      <div
        className={cn('flex flex-col lg:ms-64', className)}
        ref={ref}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

export default Page;
