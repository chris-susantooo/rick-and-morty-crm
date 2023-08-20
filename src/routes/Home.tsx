import Page from 'components/Page';
import { H1, Muted, P } from 'components/Typography';
import { FC } from 'react';

const Index: FC = () => (
  <Page title="Home" className="h-full w-full items-center justify-center">
    <H1 className="mb-1.5">Welcome!</H1>
    <P>
      Click <strong>Contact</strong> on the navigation menu to start.
    </P>
    <Muted>
      v{import.meta.env.VITE_APP_VERSION} - {import.meta.env.VITE_COMMIT_HASH}
    </Muted>
  </Page>
);

export default Index;
