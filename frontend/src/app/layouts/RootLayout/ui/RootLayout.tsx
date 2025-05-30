import { ThemeProvider } from '@/app/providers/ThemeProvider'
import { Outlet } from 'react-router'

const RootLayout = () => {
  return (
    <ThemeProvider>
      <Outlet />
    </ThemeProvider>
  )
}

export default RootLayout
