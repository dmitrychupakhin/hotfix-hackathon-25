import { Box } from '@mui/material'

interface PageWrapperProps {
  children: React.ReactNode
  headerPadding?: boolean
  xPadding?: boolean
}

const PageWrapper = ({ children, headerPadding = false, xPadding = false }: PageWrapperProps) => {
  return (
    <Box sx={theme => ({
      boxSizing: 'border-box',
      pt: headerPadding ? `${theme.mixins.toolbar.minHeight}px` : 0,
      px: xPadding ? 4 : 0,
      width: '100%',
    })}
    >
      {children}
    </Box>
  )
}

export default PageWrapper
