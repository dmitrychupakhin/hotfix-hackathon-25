import { AppLayout } from '@/app/layouts/AppLayout'
import { RootLayout } from '@/app/layouts/RootLayout'
import { Home } from '@/pages/Home'
import type { AppRouteObject } from '../types/router'

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
            element: <Home />,
          },
        ],
      },
    ],
  },
]
