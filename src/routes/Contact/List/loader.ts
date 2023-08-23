import { QueryClient } from '@tanstack/react-query';
import { contactListQuery } from 'hooks/useContactList';
import { LoaderFunction } from 'react-router-dom';
import { CharacterFilter } from 'rickmortyapi';

const loader =
  (queryClient: QueryClient): LoaderFunction =>
  async ({ request }) => {
    const { searchParams } = new URL(request.url);

    const name = searchParams.get('name');
    const gender = searchParams.get('gender');
    const status = searchParams.get('status');
    const filters: CharacterFilter = {
      ...(name && { name }),
      ...(gender && { gender }),
      ...(status && { status }),
    };
    await queryClient.prefetchInfiniteQuery(contactListQuery(filters));

    return filters;
  };

export default loader;
