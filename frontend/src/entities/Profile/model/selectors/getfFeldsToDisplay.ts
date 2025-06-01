import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import EmailIcon from '@mui/icons-material/Email'
import PhoneEnabledRoundedIcon from '@mui/icons-material/PhoneEnabledRounded'
import TelegramIcon from '@mui/icons-material/Telegram'
import VkIcon from '@/shared/assets/icons/VKButton.svg?react'
import { useTranslation } from 'react-i18next'

export const useFieldsToDisplay = () => {
  const { t } = useTranslation()

  return [
    {
      key: 'email',
      label: t('Email'),
      Icon: EmailIcon,
    },
    {
      key: 'phone',
      label: t('Телефон'),
      Icon: PhoneEnabledRoundedIcon,
    },
    {
      key: 'tg',
      label: t('Telegram'),
      Icon: TelegramIcon,
    },
    {
      key: 'username',
      label: t('Имя пользователя'),
      Icon: AccountCircleIcon,
    },
    {
      key: 'vkId',
      label: t('VK'),
      Icon: VkIcon,
    },
  ]
}
