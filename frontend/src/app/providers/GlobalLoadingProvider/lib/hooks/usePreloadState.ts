import { loadingHooks } from './useLoadingHooks';

export const usePreloadState = () => {
  const loadingStates = loadingHooks.map(({ hook, getIsLoading }) => {
    const result = hook();
    return getIsLoading(result);
  });

  const isFetching = loadingStates.some((isLoading) => isLoading);

  return {
    isFetching,
  };
};
