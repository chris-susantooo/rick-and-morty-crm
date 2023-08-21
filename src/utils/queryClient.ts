import { QueryCache, QueryClient } from '@tanstack/react-query';
import { generalErrorToast } from 'hooks/useToast';
import { NotFoundError } from './errors';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
      retry(failureCount, error) {
        return !(error instanceof NotFoundError) && failureCount < 3;
      },
    },
  },
  queryCache: new QueryCache({
    onError: generalErrorToast,
  }),
});

export default queryClient;
