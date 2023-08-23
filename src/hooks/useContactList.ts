import {
  useInfiniteQuery,
  useIsFetching,
  type UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import { getCharacters, type CharacterFilter } from 'rickmortyapi';
import { withAppError, type AppError } from 'utils';

type GetCharactersResponse = Awaited<ReturnType<typeof getCharacters>>;

export const contactListQuery = (
  filters: CharacterFilter
): UseInfiniteQueryOptions<GetCharactersResponse, AppError> => ({
  queryKey: ['contacts', 'list', filters],
  queryFn: ({ pageParam }) =>
    withAppError(getCharacters({ ...filters, page: pageParam || 1 })),
  getNextPageParam: lastPage => {
    const nextUrl = lastPage.data.info?.next;
    if (!nextUrl) return undefined;

    const { searchParams } = new URL(nextUrl);
    const page = searchParams.get('page');
    if (page === null) return undefined;

    return +page;
  },
});

const useContactList = (filters: CharacterFilter) => {
  const result = useInfiniteQuery(contactListQuery(filters));
  const isFetching = useIsFetching(['contacts', 'list']) > 0;

  return {
    ...result,
    filters,
    isFetching,
  };
};

export default useContactList;
