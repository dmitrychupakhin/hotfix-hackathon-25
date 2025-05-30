
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined'
import { Box, Button, Typography } from '@mui/material'
import ImgCornerVector from '@/shared/assets/images/imgСornerVector.svg?react'

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
      <ImgCornerVector
        style={{
          position: 'absolute',
          bottom: -1,
          right: 0,
          width: '650px',
          height: 'auto',
          transform: 'rotate(180deg)',
        }}
      />

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
