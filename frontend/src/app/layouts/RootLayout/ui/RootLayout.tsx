import GlobalLoadingProvider from '@/app/providers/GlobalLoadingProvider/ui/GlobalLoaderProvider'
import { StoreProvider } from '@/app/providers/StoreProvider'
import { ThemeProvider } from '@/app/providers/ThemeProvider'
import { LogoutWatcher } from '@/features/AuthLogout'
import { Outlet } from 'react-router'

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
