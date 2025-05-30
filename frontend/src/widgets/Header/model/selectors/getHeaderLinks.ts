import type { HeaderLink } from '../types/Header'

export const getHeaderLinks = (): HeaderLink[] => {
  return [
    {
      title: 'Главная',
      path: '/',
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
