import { HTMLProps, ReactNode, forwardRef } from 'react';
import { cn } from 'utils';

interface RenderOptions {
  index: number;
  Item: typeof Item;
}

interface Props extends HTMLProps<HTMLUListElement> {
  items: any[];
  render: (item: any, { index, Item }: RenderOptions) => ReactNode;
}

const Item = forwardRef<HTMLLIElement, HTMLProps<HTMLLIElement>>(
  ({ className, children, ...rest }, ref) => (
    <li
      ref={ref}
      className={cn(
        'flex cursor-pointer rounded-sm p-3 transition-colors hover:bg-gray-100',
        className
      )}
      {...rest}
    >
      {children}
    </li>
  )
);

const List = forwardRef<HTMLUListElement, Props>(
  ({ items, render, ...rest }, ref) => (
    <ul className="flex flex-col gap-1" {...rest} ref={ref}>
      {items.map((item, index) => render(item, { index, Item }))}
    </ul>
  )
);

export default List;
