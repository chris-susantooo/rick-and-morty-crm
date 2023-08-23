import Button from 'components/Button';
import ContactListItem from 'components/ContactListItem';
import Input from 'components/Input';
import List from 'components/List';
import PillSelect from 'components/PillSelect';
import { ScrollArea } from 'components/ScrollArea';
import { H2, H4, KBD, Muted, Small } from 'components/Typography';
import { useResponsive } from 'hooks';
import useContactList from 'hooks/useContactList';
import { Loader2, Search } from 'lucide-react';
import { HTMLProps, forwardRef, useEffect, useMemo } from 'react';
import {
  Form,
  NavLink,
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import type { Character, CharacterFilter } from 'rickmortyapi';
import { useIntersectionObserverRef } from 'rooks';
import { NotFoundError, cn } from 'utils';
import useContactForm from './useContactForm';

const ContactList = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
  ({ className, ...rest }, ref) => {
    const filters = useLoaderData() as CharacterFilter;

    const location = useLocation();
    const navigate = useNavigate();
    const { isMobile } = useResponsive();
    const { data, hasNextPage, isFetching, error, fetchNextPage } =
      useContactList(filters);
    const {
      nameRef,
      statusRef,
      genderRef,
      hasActiveFilter,
      resetFilters,
      onFormChange,
      STATUSES,
      GENDERS,
    } = useContactForm(filters);

    const contacts = useMemo(
      () => data?.pages?.map(groups => groups.data.results || [])?.flat() || [],
      [data?.pages]
    );

    const { id } = useParams();
    useEffect(() => {
      if (!id && !isMobile && !!contacts?.length) {
        const [firstContact] = contacts;
        navigate(`/contact/${firstContact.id}${location.search}`);
      }
    }, [contacts, id, isMobile, location.search, navigate]);

    const [contactsBottomRef] = useIntersectionObserverRef(
      entries => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    const spinner = (
      <Loader2 size={20} className="animate-spin text-muted-foreground" />
    );

    const inputIcon = isFetching ? (
      spinner
    ) : (
      <Search size={20} className="text-muted-foreground" />
    );

    const ContactsWrapper = isMobile ? 'div' : ScrollArea;

    return (
      <>
        <div
          ref={ref}
          className={cn(
            'flex h-full w-full flex-col bg-white pt-8 md:fixed md:w-[20rem] md:border-e md:border-e-gray-100 md:max-lg:h-[calc(100%-61px)]',
            className
          )}
          {...rest}
        >
          <H2 className="mx-6 mb-3">Contact</H2>

          <Form
            id="search-contact"
            role="search"
            className="mx-6 mb-3"
            action={location.pathname}
          >
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
                  type="button"
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

          {error instanceof NotFoundError && (
            <div className="mt-3 space-y-1 text-center">
              <H4>No one&apos;s here 😿</H4>
              <Muted>Try again with another search.</Muted>
            </div>
          )}

          {contacts.length > 0 && (
            <ContactsWrapper className="me-1 pe-5 ps-6">
              <List
                items={contacts}
                render={(item: Character, { Item }) => (
                  <NavLink
                    key={item.id}
                    to={`/contact/${item.id}${location.search}`}
                  >
                    {({ isActive }) => (
                      <Item className={cn(isActive && 'bg-gray-50')}>
                        <ContactListItem
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
              <div
                className="mb-4 mt-3 flex items-center justify-center gap-1.5 text-center"
                ref={contactsBottomRef}
              >
                {hasNextPage ? (
                  <>
                    {spinner}
                    <Muted>Loading...</Muted>
                  </>
                ) : (
                  <Muted>You&apos;ve reached the end! 🫡</Muted>
                )}
              </div>
            </ContactsWrapper>
          )}
        </div>
        <div className="hidden md:block md:min-w-[20rem]" />
      </>
    );
  }
);

export default ContactList;
