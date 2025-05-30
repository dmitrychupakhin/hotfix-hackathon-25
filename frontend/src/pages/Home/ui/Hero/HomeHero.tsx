import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined'
import { Box, Button, Stack, Typography } from '@mui/material'
import ImgCornerVector from '@/shared/assets/images/imgСornerVector.svg?react'
import { AnimatePresence } from 'motion/react'
import { MotionBox } from '@/shared/ui/MotionBox'

const HomeHero = () => {
  return (
    <Box sx={{
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    }}
    >
      <ImgCornerVector style={{
        position: 'absolute',
        top: -1,
        left: 0,
        width: '650px',
        height: 'auto',
      }}
      />
      <AnimatePresence>
        <MotionBox
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 10 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '650px',
            height: 'auto',
          }}
        >
          <Box sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            zIndex: 2,
            p: 4,
          }}
          >
            <Stack spacing={2} direction="row" alignItems="center">
              <Stack spacing={1} direction="row" alignItems="center">
                <Box sx={{
                  borderRadius: '50%',
                  backgroundColor: 'primary.main',
                  aspectRatio: 1,
                  height: '42px',
                  width: '42px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600,
                }}
                >
                  5
                </Box>
                <Typography fontWeight={600}>Сотрудников</Typography>
              </Stack>
              <Stack spacing={1} direction="row" alignItems="center">
                <Box sx={{
                  borderRadius: '50%',
                  backgroundColor: 'primary.main',
                  aspectRatio: 1,
                  height: '42px',
                  width: '42px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600,
                }}
                >
                  3
                </Box>
                <Typography fontWeight={600}>Проекта</Typography>
              </Stack>
              <Stack spacing={1} direction="row" alignItems="center">
                <Box sx={{
                  borderRadius: '50%',
                  backgroundColor: 'primary.main',
                  aspectRatio: 1,
                  height: '42px',
                  width: '42px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600,
                }}
                >
                  120
                </Box>
                <Typography fontWeight={600}>Багов</Typography>
              </Stack>
            </Stack>
          </Box>
          <ImgCornerVector style={{
            transform: 'rotate(180deg)',
          }}
          />
        </MotionBox>
      </AnimatePresence>

      <Box
        sx={{
          maxWidth: '70%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h1"
          sx={theme => ({
            fontWeight: theme.typography.fontWeightMedium,
            color: theme.palette.invertedSecondary.dark,
          })}
        >
          SLOBODASOFT — превращаем идеи в эффективные цифровые решения
        </Typography>
        <Typography
          variant="h4"
          sx={theme => ({
            fontWeight: theme.typography.fontWeightLight,
            color: theme.palette.invertedSecondary.main,
          })}
        >
          Мы не просто делаем WEB, мы даем ему характер!
        </Typography>
        <Button variant="contained" endIcon={<RocketLaunchOutlinedIcon />}>Подать заявку</Button>
      </Box>
    </Box>
  )
}

export default HomeHero
