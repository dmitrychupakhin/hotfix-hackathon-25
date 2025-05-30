import { StoreProvider } from '@/app/providers/StoreProvider'
import { ThemeProvider } from '@/app/providers/ThemeProvider'
import { Outlet } from 'react-router'

const RootLayout = () => {
  return (
    <ThemeProvider>
      <StoreProvider>
        <Outlet />
      </StoreProvider>
    </ThemeProvider>
  )
}

export default RootLayout
