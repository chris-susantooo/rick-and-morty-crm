import type { QueryClient } from '@tanstack/react-query';
import { contactDetailsQuery } from 'hooks/useContactDetails';
import type { LoaderFunction } from 'react-router-dom';

const loader =
  (queryClient: QueryClient): LoaderFunction =>
  async ({ params }) => {
    await queryClient.prefetchQuery(contactDetailsQuery(params.id as string));
    return params;
  };

export default loader;
