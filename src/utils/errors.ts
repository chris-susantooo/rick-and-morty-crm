/* eslint-disable max-classes-per-file */
import type { ApiResponse, Info } from 'rickmortyapi';

export class AppError extends Error {
  httpCode: number | undefined;

  constructor(httpCode: number | undefined, message: string) {
    super(message);
    this.httpCode = httpCode;
    this.name = 'AppError';
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(404, message);
    this.name = 'NotFoundError';
  }
}

export const withAppError = async <T extends Promise<ApiResponse<Info<any>>>>(
  invokedRickAndMortyApi: T
): Promise<Awaited<T>> => {
  const result = await invokedRickAndMortyApi;
  if (result.status === 404) {
    throw new NotFoundError(result.statusMessage);
  }
  if (result.status >= 400) {
    throw new AppError(result.status, result.statusMessage);
  }

  return result;
};
