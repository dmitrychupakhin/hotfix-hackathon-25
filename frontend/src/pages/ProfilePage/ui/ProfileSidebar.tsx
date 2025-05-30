import { Stack } from '@mui/material'
import { useLocation, useNavigate } from 'react-router'
import { getProfileSidebarItems } from '../model/selectors/getProfileSidebarItems'
import ProfileSidebarItem from './ProfileSidebarItem'

const ProfileSidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const sidebarItems = getProfileSidebarItems()

  return (
    <Stack
      spacing={3}
      sx={theme => ({
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[1],
        borderRadius: theme.shape.borderRadius * 5,
        p: 1,
      })}
    >
      {sidebarItems.map(item => (
        <ProfileSidebarItem
          key={item.path}
          Icon={item.Icon}
          active={location.pathname === item.path}
          onClick={() => {
            navigate(item.path)
          }}
        />
      ))}
    </Stack>
  )
}

export default ProfileSidebar
