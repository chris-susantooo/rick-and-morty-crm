import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { getEpisode } from 'rickmortyapi';
import { withAppError } from 'utils';

const useEpisodes = (episodeUrls?: string[]) => {
  const ids = useMemo(
    () =>
      episodeUrls?.map(episodeUrl => {
        const urlParts = episodeUrl.split('/');
        const id = urlParts[urlParts.length - 1];
        return +id;
      }) || [],
    [episodeUrls]
  );

  const results = useQuery({
    queryKey: ['episodes', 'list', ids],
    queryFn: () => withAppError(getEpisode(ids)),
    select: ({ data, ...rest }) => ({
      ...rest,
      // getEpisode returns an object if a single id is passed
      data: Array.isArray(data) ? data : [data],
    }),
    enabled: ids.length > 0,
  });

  return results;
};

export default useEpisodes;
