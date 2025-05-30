import { ROUTES } from '@/shared/const/routes';

const getPagesWithBackgroundZoom = (): string[] => {
  return [
    ROUTES.AUTH_LOGIN(),
    ROUTES.AUTH_REGISTER(),
    ROUTES.AUTH_REGISTER_CONFIRM(),
    ROUTES.AUTH_CHANGE_EMAIL(),
    ROUTES.AUTH_CHANGE_EMAIL_CONFIRM(),
    ROUTES.AUTH_CHANGE_PASSWORD(),
    ROUTES.AUTH_RESET_PASSWORD(),
    ROUTES.AUTH_RESET_PASSWORD_CONFIRM(),
  ];
};
export default getPagesWithBackgroundZoom;
