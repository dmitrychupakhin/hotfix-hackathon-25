import { ROUTES } from '@/shared/const/routes'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded'
import type { ProfileSidebarItem } from '../types/ProfileSidebar'
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded'

export const getProfileSidebarItems = (): ProfileSidebarItem[] => {
  return [
    {
      Icon: AccountCircleOutlinedIcon,
      path: ROUTES.PROFILE(),
    },
    {
      Icon: RocketLaunchRoundedIcon,
      path: ROUTES.PROFILE_ORDER(),
    },
    {
      Icon: AssignmentRoundedIcon,
      path: ROUTES.PROFILE_ACTIVE_TASKS(),
    },
  ]
}
