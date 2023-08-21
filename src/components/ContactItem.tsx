import { HTMLProps, forwardRef } from 'react';
import { cn } from 'utils';
import { Muted, P } from './Typography';

interface Props extends HTMLProps<HTMLDivElement> {
  avatarSrc: string;
  name: string;
  species: string;
  active?: boolean;
}

const ContactItem = forwardRef<HTMLDivElement, Props>(
  ({ className, active, avatarSrc, name, species, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center gap-4', className)}
      {...rest}
    >
      <img
        src={avatarSrc}
        alt={name}
        className="h-16 w-16 shrink-0 rounded-full bg-gray-200"
      />
      <div className="space-y-1">
        <P className={cn(active && 'font-semibold')}>{name}</P>
        <Muted>{species}</Muted>
      </div>
    </div>
  )
);

export default ContactItem;
