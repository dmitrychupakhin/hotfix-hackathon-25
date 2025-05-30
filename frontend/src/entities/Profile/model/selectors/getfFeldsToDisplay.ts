import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import EmailIcon from '@mui/icons-material/Email'
import PhoneEnabledRoundedIcon from '@mui/icons-material/PhoneEnabledRounded'
import TelegramIcon from '@mui/icons-material/Telegram'
import VkIcon from '@/shared/assets/icons/VKButton.svg?react'

export const fieldsToDisplay = [
  {
    key: 'email',
    label: 'Email',
    Icon: EmailIcon,
  },
  {
    key: 'phone',
    label: 'Телефон',
    Icon: PhoneEnabledRoundedIcon,
  },
  {
    key: 'tg',
    label: 'Telegram',
    Icon: TelegramIcon,
  },
  {
    key: 'username',
    label: 'Имя пользователя',
    Icon: AccountCircleIcon,
  },
  {
    key: 'vkId',
    label: 'VK',
    Icon: VkIcon,
  },
]
