import { ROUTES } from '@/shared/const/routes'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded'
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded'
import type { ProfileSidebarItem } from '../types/ProfileSidebar'

export const getProfileSidebarItems = (isStaff: boolean | undefined, isTeam: boolean | undefined): ProfileSidebarItem[] => {
  if (isStaff) {
    return [
      {
        Icon: AccountCircleOutlinedIcon,
        path: ROUTES.PROFILE(),
      },
      {
        Icon: AssignmentRoundedIcon,
        path: ROUTES.PROFILE_ACTIVE_TASKS(),
      },
    ]
  }
  else if (isTeam) {
    return [
      {
        Icon: AccountCircleOutlinedIcon,
        path: ROUTES.PROFILE(),
      },
      {
        Icon: AssignmentRoundedIcon,
        path: ROUTES.PROFILE_ACTIVE_TASKS(),
      },
    ]
  }
  else {
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
}
