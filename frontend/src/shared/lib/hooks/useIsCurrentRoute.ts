import { useLocation } from 'react-router';

export const useIsCurrentRoute = (routes: string[]) => {
  const { pathname } = useLocation();
  return routes.includes(pathname);
};
