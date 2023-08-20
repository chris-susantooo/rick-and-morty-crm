import { QueryClient, useIsFetching } from '@tanstack/react-query';
import Input from 'components/Input';
import { H2, H4, KBD, Muted, Small } from 'components/Typography';
import useContactList, { contactListQuery } from 'hooks/useContactList';
import {
  ChangeEventHandler,
  HTMLProps,
  forwardRef,
  useEffect,
  useRef,
} from 'react';
import {
  type LoaderFunction,
  Form,
  useSubmit,
  useNavigate,
  NavLink,
  useLocation,
} from 'react-router-dom';
import type { Character, CharacterFilter } from 'rickmortyapi';
import { useDebounce, useKey } from 'rooks';
import List from 'components/List';
import ContactItem from 'components/ContactItem';
import { ScrollArea } from 'components/ScrollArea';
import { Loader2, Search } from 'lucide-react';
import PillSelect from 'components/PillSelect';
import Button from 'components/Button';
import { cn } from 'utils';

export const loader =
  (queryClient: QueryClient): LoaderFunction =>
  async ({ request }) => {
    const { searchParams } = new URL(request.url);

    const name = searchParams.get('name');
    const gender = searchParams.get('gender');
    const status = searchParams.get('status');
    const q: CharacterFilter = {
      ...(name && { name }),
      ...(gender && { gender }),
      ...(status && { status }),
      page: 1,
    };
    await queryClient.ensureQueryData(contactListQuery(q));

    return q;
  };

const ContactList = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
  ({ className, ...rest }, ref) => {
    const { filters, STATUSES, GENDERS, data } = useContactList();
    const isFetching = useIsFetching(['contacts', 'list']) > 0;

    const nameRef = useRef<HTMLInputElement>(null);
    const statusRef = useRef<HTMLInputElement>(null);
    const genderRef = useRef<HTMLInputElement>(null);

    const submit = useSubmit();
    const debouncedSubmit = useDebounce(submit, 500);

    const onFormChange: ChangeEventHandler<HTMLInputElement> = event =>
      debouncedSubmit(event.currentTarget.form);

    const location = useLocation();
    const navigate = useNavigate();
    const resetFilters = () => {
      navigate('/contact');
    };

    useKey(
      '/',
      () => {
        nameRef.current?.focus();
        nameRef.current?.setSelectionRange(0, nameRef.current.value.length);
      },
      { eventTypes: ['keyup'] }
    );

    useEffect(() => {
      if (nameRef.current) {
        nameRef.current.value = filters.name || '';
      }
      if (statusRef.current) {
        statusRef.current.value = filters.status || '';
      }
      if (genderRef.current) {
        genderRef.current.value = filters.gender || '';
      }
    }, [filters]);

    const inputIcon = isFetching ? (
      <Loader2 size={20} className="animate-spin text-muted-foreground" />
    ) : (
      <Search size={20} className="text-muted-foreground" />
    );

    const contacts = data?.data?.results;
    const isNotFound = data?.status === 404;
    const hasActiveFilter = !!(
      filters.status ||
      filters.gender ||
      filters.name
    );

    return (
      <div
        ref={ref}
        className={cn(
          'flex h-full w-full flex-col pt-8 md:fixed md:w-[20rem] md:border-e md:border-e-gray-100 md:max-lg:h-[calc(100%-61px)]',
          className
        )}
        {...rest}
      >
        <H2 className="mx-6 mb-3">Contact</H2>

        <Form id="search-contact" role="search" className="mx-6 mb-3">
          <Input
            name="name"
            ref={nameRef}
            placeholder="Search Characters"
            startAddon={inputIcon}
            endAddon={<KBD>/</KBD>}
            defaultValue={filters.name}
            onChange={onFormChange}
          />
          <div className="mt-3 flex justify-between">
            <div className="flex gap-1">
              <PillSelect
                name="status"
                items={STATUSES}
                inputRef={statusRef}
                defaultValue={filters.status}
                placeholder="Status"
                onChange={onFormChange}
              />
              <PillSelect
                name="gender"
                items={GENDERS}
                inputRef={genderRef}
                defaultValue={filters.gender}
                placeholder="Gender"
                onChange={onFormChange}
              />
            </div>
            {hasActiveFilter && (
              <Button
                variant="link"
                size="xs"
                className="items-center pe-0"
                onClick={resetFilters}
              >
                <Small>Reset</Small>
              </Button>
            )}
          </div>
        </Form>

        {isNotFound && (
          <div className="mt-3 space-y-1 text-center">
            <H4>No one&apos;s here 😿</H4>
            <Muted>Try again with another search.</Muted>
          </div>
        )}

        {contacts && contacts.length > 0 && (
          <ScrollArea className="me-1 overflow-visible pe-5 ps-6 md:overflow-y-auto">
            <List
              items={contacts}
              render={(item: Character, { Item }) => (
                <NavLink
                  key={item.id}
                  to={`/contact/${item.id}${location.search}`}
                >
                  {({ isActive }) => (
                    <Item className={cn(isActive && 'bg-gray-50')}>
                      <ContactItem
                        avatarSrc={item.image}
                        name={item.name}
                        active={isActive}
                        species={item.species}
                      />
                    </Item>
                  )}
                </NavLink>
              )}
            />
          </ScrollArea>
        )}
      </div>
    );
  }
);

export default ContactList;
