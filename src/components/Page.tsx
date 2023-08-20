import { HTMLProps, forwardRef, useEffect } from 'react';
import { cn } from 'utils';

interface Props extends HTMLProps<HTMLDivElement> {
  title?: string;
}

const Page = forwardRef<HTMLDivElement, Props>(
  ({ className, title, children, ...rest }, ref) => {
    useEffect(() => {
      if (title) {
        document.title = `${title} | Rick and Morty`;
      }
    }, [title]);

    return (
      <main
        className={cn(
          'flex h-[calc(100%-61px)] w-full flex-col lg:ms-64 lg:h-full',
          className
        )}
        ref={ref}
        {...rest}
      >
        {children}
      </main>
    );
  }
);

export default Page;
