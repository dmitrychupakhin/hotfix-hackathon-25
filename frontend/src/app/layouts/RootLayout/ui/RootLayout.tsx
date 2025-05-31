import { StoreProvider } from '@/app/providers/StoreProvider'
import { ThemeProvider } from '@/app/providers/ThemeProvider'
import GlobalLoadingProvider from '@/app/providers/GlobalLoadingProvider/ui/GlobalLoaderProvider'
import { Outlet } from 'react-router'
import { LogoutWatcher } from '@/features/AuthLogout'

const RootLayout = () => {
  return (
    <ThemeProvider>
      <StoreProvider>
        <GlobalLoadingProvider>
          <LogoutWatcher />
          <Outlet />
        </GlobalLoadingProvider>
      </StoreProvider>
    </ThemeProvider>
  )
}

export default RootLayout
