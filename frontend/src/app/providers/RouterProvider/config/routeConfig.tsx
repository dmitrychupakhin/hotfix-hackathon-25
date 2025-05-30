import { AppLayout } from '@/app/layouts/AppLayout'
import { RootLayout } from '@/app/layouts/RootLayout'
import { Home } from '@/pages/Home'
import type { AppRouteObject } from '../types/router'
import { AppBackgroundLayout } from '@/app/layouts/AppBackgroundLayout'
import backgroundLight from '@/shared/assets/images/appBackground.jpg'

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
            ],
          },
        ],
      },
    ],
  },
]
