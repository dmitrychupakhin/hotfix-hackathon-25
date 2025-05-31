import { Box } from '@mui/material'

interface ProfileWrapperProps {
  children: React.ReactNode
}

const ProfileWrapper = ({ children }: ProfileWrapperProps) => {
  return (
    <Box sx={theme => ({
      ml: `${theme.mixins.profileSidebar.minWidth}px`,
    })}
    >
      {children}
    </Box>
  )
}

export default ProfileWrapper
