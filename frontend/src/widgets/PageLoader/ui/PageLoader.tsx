import { Box, CircularProgress } from '@mui/material'

const PageLoader = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'background.default',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        overflow: 'hidden',
      }}
    >
      <CircularProgress size="4rem" color="primary" />
    </Box>
  )
}
export default PageLoader
