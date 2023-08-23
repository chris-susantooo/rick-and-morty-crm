import dayjs from 'dayjs';
import {
  Activity,
  Bird,
  Cake,
  Contact2,
  LocateFixed,
  MapPin,
} from 'lucide-react';
import { HTMLProps, forwardRef, useMemo } from 'react';
import { type Character } from 'rickmortyapi';
import { cn } from 'utils';
import Card from './Card';
import { Muted, P } from './Typography';

interface ContactInfo
  extends Partial<
    Pick<Character, 'status' | 'gender' | 'species' | 'created'>
  > {
  location?: string;
  origin?: string;
}

interface Props extends HTMLProps<HTMLDivElement>, ContactInfo {}

const ContactPersonalInfo = forwardRef<HTMLElement, Props>(
  (
    { className, status, gender, species, location, origin, created, ...rest },
    ref
  ) => {
    const cards = useMemo(
      () => [
        {
          label: 'Status',
          value: status,
          Icon: Activity,
        },
        {
          label: 'Gender',
          value: gender,
          Icon: Contact2,
        },
        {
          label: 'Species',
          value: species,
          Icon: Bird,
        },
        {
          label: 'Location',
          value: location,
          Icon: LocateFixed,
        },
        {
          label: 'Origin',
          value: origin,
          Icon: MapPin,
        },
        {
          label: 'Created Date',
          value: dayjs(created).format('MMMM DD, YYYY'),
          Icon: Cake,
        },
      ],
      [created, gender, location, origin, species, status]
    );

    return (
      <section
        className={cn('flex flex-wrap gap-6 md:max-w-3xl', className)}
        ref={ref}
        {...rest}
      >
        {cards.map(({ Icon, label, value }) => (
          <Card className="flex w-full p-3 md:w-[240px]" key={label}>
            {Icon && <Icon size={24} className="me-2.5 mt-1 shrink-0" />}
            <div>
              <P>{label}</P>
              <Muted>{value}</Muted>
            </div>
          </Card>
        ))}
      </section>
    );
  }
);

export default ContactPersonalInfo;
