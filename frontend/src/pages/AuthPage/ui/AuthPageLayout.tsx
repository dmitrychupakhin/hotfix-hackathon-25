import { Box, Grid, useTheme } from '@mui/material'
import { AnimatePresence } from 'motion/react'
import { type ReactNode } from 'react'
import { useLocation, useOutlet } from 'react-router'
import { MotionBox } from '@/shared/ui/MotionBox'
import ImgCornerVector from '@/shared/assets/images/imgСornerVector.svg?react'
import ImgCornerVectorBlack from '@/shared/assets/images/imgCornerVectorBlack.svg?react'
import { PageWrapper } from '@/shared/ui/PageWrapper'

interface AuthPageLayoutProps {
  banner: ReactNode
}

const AuthPageLayout: React.FC<AuthPageLayoutProps> = ({ banner }) => {
  const theme = useTheme()

  const CornerImage = theme.palette.mode === 'dark' ? ImgCornerVectorBlack : ImgCornerVector

  const outlet = useOutlet()
  const location = useLocation()

  return (
    <Box>
      <CornerImage style={{
        position: 'absolute',
        top: -1,
        left: 0,
        width: '650px',
        height: 'auto',
      }}
      />
      <PageWrapper>
        <Grid
          container
          sx={{
            height: '100vh',
            width: '100vw',
            overflowX: 'hidden',
            position: 'relative',
          }}
        >
          <Grid
            size={{
              lg: 5,
              xl: 6,
            }}
            sx={{
              display: { xs: 'none', lg: 'flex' },
              justifyContent: 'center',
              alignItems: 'center',
            }}
            p={5}
          >
            <Box>{banner}</Box>
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 7,
              xl: 6,
            }}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
            p={5}
          >
            <AnimatePresence mode="wait" initial>
              <MotionBox
                key={location.pathname}
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  type: 'tween',
                  duration: 0.3,
                  ease: 'easeInOut',
                }}
              >
                {outlet}
              </MotionBox>
            </AnimatePresence>
          </Grid>

        </Grid>
      </PageWrapper>
    </Box>

  )
}

export default AuthPageLayout
