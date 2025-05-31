import { PageWrapper } from '@/shared/ui/PageWrapper'
import { Box } from '@mui/material'
import { Outlet } from 'react-router'
import ProfileSidebar from './ProfileSidebar'
import ProfileWrapper from './ProfileWrapper'

const ProfileLayout = () => {
  return (
    <Box sx={{ display: 'flex', position: 'relative', width: '100%', height: '100vh', maxHeight: '100vh' }}>
      <PageWrapper headerPadding xPadding>
        <Box sx={{
          position: 'fixed',
          height: '100%',
          alignItems: 'center',
          top: '50%',
          width: '50px',
        }}
        >
          <ProfileSidebar />
        </Box>
        <ProfileWrapper>
          <Outlet />
        </ProfileWrapper>
      </PageWrapper>
    </Box>
  )
}

export default ProfileLayout
