import { AppBackgroundLayout } from '@/app/layouts/AppBackgroundLayout'
import { AppLayout } from '@/app/layouts/AppLayout'
import { RootLayout } from '@/app/layouts/RootLayout'
import { AuthConfirmRegisterForm } from '@/features/AuthConfirmRegister'
import { AuthLoginForm } from '@/features/AuthLogin'
import { AuthRegisterForm } from '@/features/AuthRegister'
import { AuthBanner, AuthPageLayout } from '@/pages/AuthPage'
import { Home } from '@/pages/Home'
import { ProfileCard, ProfileOrderForm } from '@/pages/ProfilePage'
import ProfileLayout from '@/pages/ProfilePage/ui/ProfileLayout'
import backgroundLight from '@/shared/assets/images/appBackground.jpg'
import { ROUTES } from '@/shared/const/routes'
import { Navigate } from 'react-router'
import type { AppRouteObject } from '../types/router'
import { AuthConfirmChangeEmailForm } from '@/features/AuthConfirmChangeEmail'
import { AuthChangeEmailForm } from '@/features/AuthChangeEmail'
import { AuthConfirmResetPasswordForm } from '@/features/AuthConfirmResetPassword'
import { AuthResetPasswordForm } from '@/features/AuthResetPassword'
import { AuthChangePasswordForm } from '@/features/AuthChangePassword'
import ProfileActiveTasks from '@/pages/ProfilePage/ui/ProfileActiveTasks'

export const routeConfig: AppRouteObject[] = [
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <AppLayout />,
        children: [
          {
            path: '/',
            element: <AppBackgroundLayout backgroundDark={backgroundLight} backgroundLight={backgroundLight} />,
            children: [
              {
                path: '/',
                element: <Home />,
              },
              {
                path: ROUTES.AUTH(),
                element: <AuthPageLayout banner={<AuthBanner />} />,
                children: [
                  {
                    index: true,
                    element: <Navigate to={ROUTES.AUTH_LOGIN()} replace />,
                  },
                  {
                    path: ROUTES.AUTH_LOGIN(),
                    element: <AuthLoginForm />,
                    redirectIfAuth: true,
                  },
                  {
                    path: ROUTES.AUTH_REGISTER(),
                    element: <AuthRegisterForm />,
                    redirectIfAuth: true,
                  },
                  {
                    path: ROUTES.AUTH_REGISTER_CONFIRM(),
                    element: <AuthConfirmRegisterForm />,
                    redirectIfAuth: true,
                  },
                  {
                    path: ROUTES.AUTH_CHANGE_EMAIL(),
                    element: <AuthChangeEmailForm />,
                    authOnly: true,
                  },
                  {
                    path: ROUTES.AUTH_RESET_PASSWORD(),
                    element: <AuthResetPasswordForm />,
                    redirectIfAuth: true,
                  },
                  {
                    path: ROUTES.AUTH_RESET_PASSWORD_CONFIRM(),
                    element: <AuthConfirmResetPasswordForm />,
                    redirectIfAuth: true,
                  },
                  {
                    path: ROUTES.AUTH_CHANGE_EMAIL_CONFIRM(),
                    element: <AuthConfirmChangeEmailForm />,
                    authOnly: true,
                  },
                  {
                    path: ROUTES.AUTH_CHANGE_PASSWORD(),
                    element: <AuthChangePasswordForm />,
                    authOnly: true,
                  },
                ],
              },
            ],
          },
          {
            path: ROUTES.PROFILE(),
            element: <ProfileLayout />,
            authOnly: true,
            children: [
              {
                path: ROUTES.PROFILE(),
                element: <ProfileCard />,
              },
              {
                path: ROUTES.PROFILE_ORDER(),
                element: <ProfileOrderForm />,
              },
              {
                path: ROUTES.PROFILE_ACTIVE_TASKS(),
                element: <ProfileActiveTasks />,
              },
            ],
          },
        ],
      },
    ],
  },
]
