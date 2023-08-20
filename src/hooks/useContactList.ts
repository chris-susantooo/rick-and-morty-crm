import { useQuery } from '@tanstack/react-query';
import { useLoaderData } from 'react-router-dom';
import { CharacterFilter, getCharacters } from 'rickmortyapi';

export const contactListQuery = (q: CharacterFilter) => ({
  queryKey: ['contacts', 'list', q],
  queryFn: () => getCharacters(q),
});

const STATUSES = [
  { label: 'Alive', value: 'alive' },
  { label: 'Dead', value: 'dead' },
  { label: 'Unknown', value: 'unknown' },
];

const GENDERS = [
  { label: 'Female', value: 'female' },
  { label: 'Male', value: 'male' },
  { label: 'Genderless', value: 'genderless' },
  { label: 'Unknown', value: 'unknown' },
];

const useContactList = () => {
  const filters = useLoaderData() as CharacterFilter;
  const result = useQuery(contactListQuery(filters));
  return { filters, STATUSES, GENDERS, ...result };
};

export default useContactList;
