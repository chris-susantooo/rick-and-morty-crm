import { useIsFetching, useQuery } from '@tanstack/react-query';
import { type CharacterFilter, getCharacters } from 'rickmortyapi';
import { withAppError } from 'utils';

export const contactListQuery = (q: CharacterFilter) => ({
  queryKey: ['contacts', 'list', q],
  queryFn: () => withAppError(getCharacters(q)),
});

const useContactList = (filters: CharacterFilter) => {
  const result = useQuery(contactListQuery(filters));
  const isFetching = useIsFetching(['contacts', 'list']) > 0;

  return {
    ...result,
    filters,
    isFetching,
  };
};

export default useContactList;
