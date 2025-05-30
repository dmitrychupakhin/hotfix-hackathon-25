import { AppLayout } from '@/app/layouts/AppLayout'
import { RootLayout } from '@/app/layouts/RootLayout'
import { Home } from '@/pages/Home'
import type { AppRouteObject } from '../types/router'
import { AppBackgroundLayout } from '@/app/layouts/AppBackgroundLayout'
import backgroundLight from '@/shared/assets/images/appBackground.jpg'
import { ROUTES } from '@/shared/const/routes'
import { AuthPageLayout } from '@/pages/AuthPage'
import { Navigate } from 'react-router'
import { AuthLoginForm } from '@/features/AuthLogin'
import { AuthBanner } from '@/pages/AuthPage'

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
                  // {
                  //   path: ROUTES.AUTH_REGISTER(),
                  //   element: <AuthRegisterForm />,
                  //   redirectIfAuth: true,
                  // },
                  // {
                  //   path: ROUTES.AUTH_REGISTER_CONFIRM(),
                  //   element: <AuthConfirmRegisterForm />,
                  //   redirectIfAuth: true,
                  // },
                  // {
                  //   path: ROUTES.AUTH_CHANGE_EMAIL(),
                  //   element: <AuthChangeEmailForm />,
                  //   authOnly: true,
                  // },
                  // {
                  //   path: ROUTES.AUTH_RESET_PASSWORD(),
                  //   element: <AuthResetPasswordForm />,
                  //   redirectIfAuth: true,
                  // },
                  // {
                  //   path: ROUTES.AUTH_RESET_PASSWORD_CONFIRM(),
                  //   element: <AuthConfirmResetPasswordForm />,
                  //   redirectIfAuth: true,
                  // },
                  // {
                  //   path: ROUTES.AUTH_CHANGE_EMAIL_CONFIRM(),
                  //   element: <AuthConfirmChangeEmailForm />,
                  //   authOnly: true,
                  // },
                  // {
                  //   path: ROUTES.AUTH_CHANGE_PASSWORD(),
                  //   element: <AuthChangePasswordForm />,
                  //   authOnly: true,
                  // },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]
