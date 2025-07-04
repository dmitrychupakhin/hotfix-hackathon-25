import { useTranslation } from 'react-i18next'

export const useProfileOrderFormTasks = (): string[] => {
  const { t } = useTranslation()
  return [
    t('Регестрируйся'),
    t('Подробно опиши свою идею проекта'),
    t('Менеджер получит её. Обратной дороги уже нет.'),
    t('Рассчитаем время и сложность проекта'),
    t('Лучшие разработчики уже начали творить'),
    t('Следите за прогрессом выполнения'),
    t('Можно выдохнуть — у вас теперь есть продукт'),
  ]
}
