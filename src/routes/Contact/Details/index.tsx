import Button from 'components/Button';
import ContactHeading from 'components/ContactHeading';
import ContactPersonalInfo from 'components/ContactPersonalInfo';
import Page from 'components/Page';
import { useEpisodes, useResponsive } from 'hooks';
import useContactDetails from 'hooks/useContactDetails';
import { ChevronLeft } from 'lucide-react';
import { FC } from 'react';
import { Link, useLoaderData, useLocation } from 'react-router-dom';
import { DataTable } from './Episodes/DataTable';
import { columns } from './Episodes/columns';

const ContactDetails: FC = () => {
  const { id } = useLoaderData() as { id: string };
  const { isMobile } = useResponsive();
  const location = useLocation();

  const { data: contactDetailsData } = useContactDetails(id);

  const contact = contactDetailsData?.data;
  const episodeUrls = contact?.episode;

  const { data: episodesData, isLoading } = useEpisodes(episodeUrls);
  const episodes = episodesData?.data || [];

  return (
    <Page
      data-testid="contact-details-page"
      title={contact?.name}
      className="container max-w-full md:ms-0 md:pt-8 lg:ms-0"
    >
      {isMobile && (
        <Link className="my-2" to={`/contact${location.search}`}>
          <Button variant="link" className="gap-1 px-0">
            <ChevronLeft size={20} />
            Back
          </Button>
        </Link>
      )}

      <ContactHeading name={contact?.name} avatarSrc={contact?.image} />

      <h4 className="mb-4 mt-8 text-xl">Personal Info</h4>
      <ContactPersonalInfo
        data-testid="contact-personal-info"
        status={contact?.status}
        gender={contact?.gender}
        species={contact?.species}
        location={contact?.location?.name}
        origin={contact?.origin?.name}
        created={contact?.created}
      />

      <h4 className="mb-4 mt-8 text-xl">Episodes</h4>
      <DataTable columns={columns} data={episodes} loading={isLoading} />

      <div className="h-8 shrink-0" />
    </Page>
  );
};

export default ContactDetails;
