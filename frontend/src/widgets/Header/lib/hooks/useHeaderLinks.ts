import { ROUTES } from '@/shared/const/routes'
import type { HeaderLink } from '../../model/types/Header'
import { useTranslation } from 'react-i18next'

export const useHeaderLinks = (): HeaderLink[] => {
  const { t } = useTranslation()
  return [
    {
      title: t('Главная'),
      path: ROUTES.HOME(),
    },
    {
      title: t('Наши работы'),
      path: '/projects',
    },
    {
      title: t('О нас'),
      path: '/about',
    },
  ]
}
