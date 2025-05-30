import { ROUTES } from '@/shared/const/routes'
import type { HeaderLink } from '../types/Header'

export const getHeaderLinks = (): HeaderLink[] => {
  return [
    {
      title: 'Главная',
      path: ROUTES.HOME(),
    },
    {
      title: 'Наши работы',
      path: '/projects',
    },
    {
      title: 'О нас',
      path: '/about',
    },
  ]
}
