import {
  useCallback,
  useEffect,
  useRef,
  type ChangeEventHandler,
  type RefObject,
} from 'react';
import { useNavigate, useSubmit } from 'react-router-dom';
import type { CharacterFilter } from 'rickmortyapi';
import { useDebounce, useKey } from 'rooks';

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

const setRefValue = (inputRef: RefObject<HTMLInputElement>, value: string) => {
  if (inputRef.current) {
    // eslint-disable-next-line no-param-reassign
    inputRef.current.value = value;
  }
};

const useSearchContactForm = (filters: CharacterFilter) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setRefValue(nameRef, filters.name || '');
    setRefValue(statusRef, filters.status || '');
    setRefValue(genderRef, filters.gender || '');
  }, [filters]);

  useKey(
    '/',
    () => {
      nameRef.current?.focus();
      nameRef.current?.select();
    },
    { eventTypes: ['keyup'] }
  );

  const submit = useSubmit();
  const navigate = useNavigate();
  const debouncedSubmit: typeof submit = useDebounce(submit, 500);

  const onFormChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    event => debouncedSubmit(event.currentTarget.form),
    [debouncedSubmit]
  );

  const resetFilters = useCallback(() => {
    navigate(`?name=${nameRef.current?.value}`);
  }, [navigate]);

  const hasActiveFilter = !!(filters.status || filters.gender || filters.name);

  return {
    STATUSES,
    GENDERS,
    nameRef,
    statusRef,
    genderRef,
    resetFilters,
    onFormChange,
    hasActiveFilter,
  };
};

export default useSearchContactForm;
