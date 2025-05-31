import { alpha, Box, CircularProgress } from '@mui/material'

const FormLoader = () => {
  return (
    <Box
      sx={theme => ({
        opacity: 1,
        pointerEvents: 1,
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backdropFilter: 'blur(2px)',
        zIndex: 200,
        backgroundColor: alpha(theme.palette.background.default, 0.5),
      })}
    >
      <CircularProgress size={40} />
    </Box>
  )
}

export default FormLoader
