import Page from 'components/Page';
import { useResponsive } from 'hooks';
import { FC } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import ContactList from './List';

const Contact: FC = () => {
  const { isMobile } = useResponsive();
  const { id: contactId } = useParams();

  const isTabletOrAbove = !isMobile;
  const isContactListOnMobile = isMobile && !contactId;
  const shouldRenderContactList = isTabletOrAbove || isContactListOnMobile;

  return (
    <Page className="flex-row" {...(!contactId && { title: 'Contact' })}>
      {shouldRenderContactList && <ContactList />}
      <Outlet />
    </Page>
  );
};

export default Contact;
