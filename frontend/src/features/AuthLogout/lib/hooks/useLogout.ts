import { profileApi } from '@/entities/Profile';
import type { User } from '@/entities/Profile/model/types/User';
import { ROUTES } from '@/shared/const/routes';
// import { useGlobalLoader } from '@/shared/lib/hooks/useGlobalLoader';
import { useNavigate } from 'react-router';
import { useAuthLogout } from '../../api/AuthLogoutApi';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';

const useLogout = (redirectTo?: keyof typeof ROUTES) => {
  // const { showLoader, hideLoader } = useGlobalLoader();
  const showLoader = () => {
    console.log('showLoader');
  };
  const hideLoader = () => {
    console.log('hideLoader');
  };

  const [logoutTrigger, { isLoading }] = useAuthLogout();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const logout = async () => {
    try {
      showLoader();

      await logoutTrigger().unwrap();

      dispatch(
        profileApi.util.updateQueryData('getProfile', undefined, () => null as unknown as User),
      );

      navigate(redirectTo ?? ROUTES.AUTH_LOGIN());
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      hideLoader();
    }
  };

  return { isLoading, logout };
};

export default useLogout;
