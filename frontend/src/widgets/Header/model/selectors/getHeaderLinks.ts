import type { HeaderLink } from '../types/Header'

export const getHeaderLinks = (): HeaderLink[] => {
  return [
    {
      title: 'Главная',
      path: '/',
    },
    {
      title: 'Мероприятия',
      path: '/events',
    },
    {
      title: 'О нас',
      path: '/about',
    },
  ]
}
