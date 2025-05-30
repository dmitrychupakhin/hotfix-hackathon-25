import { ROUTES } from '@/shared/const/routes'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined'
import type { ProfileSidebarItem } from '../types/ProfileSidebar'

export const getProfileSidebarItems = (): ProfileSidebarItem[] => {
  return [
    {
      Icon: AccountCircleOutlinedIcon,
      path: ROUTES.PROFILE(),
    },
    {
      Icon: EmojiEventsOutlinedIcon,
      path: ROUTES.PROFILE_ACTIVE_EVENTS(),
    },
  ]
}
