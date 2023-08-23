import { forwardRef, type HTMLProps } from 'react';
import { cn } from 'utils';
import { H2 } from './Typography';

interface Props extends HTMLProps<HTMLDivElement> {
  name?: string;
  avatarSrc?: string;
}

const ContactHeading = forwardRef<HTMLDivElement, Props>(
  ({ className, name, avatarSrc, ...rest }, ref) => (
    <div
      className={cn(
        'flex flex-col items-center gap-5 md:flex-row md:items-center md:justify-start',
        className
      )}
      ref={ref}
      {...rest}
    >
      <img
        src={avatarSrc}
        alt={name}
        className="h-32 w-32 shrink-0 rounded-full bg-gray-200 md:h-24 md:w-24"
      />
      <H2 className="text-center md:pb-0 md:text-start">{name}</H2>
    </div>
  )
);

export default ContactHeading;
