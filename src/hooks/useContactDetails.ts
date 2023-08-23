import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { ApiResponse, Character, getCharacter } from 'rickmortyapi';
import { withAppError, type AppError } from 'utils';

type GetCharacterResponse = ApiResponse<Character>;

export const contactDetailsQuery = (
  id: string
): UseQueryOptions<GetCharacterResponse, AppError> => ({
  queryKey: ['contacts', 'details', id],
  queryFn: () => withAppError(getCharacter(+id)),
});

const useContactDetails = (id: string) => useQuery(contactDetailsQuery(id));

export default useContactDetails;
