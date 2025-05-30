import { Box } from '@mui/material'

interface PageWrapperProps {
  children: React.ReactNode
}

const PageWrapper = ({ children }: PageWrapperProps) => {
  return (
    <Box sx={{
      px: 4,
    }}
    >
      {children}
    </Box>
  )
}

export default PageWrapper
