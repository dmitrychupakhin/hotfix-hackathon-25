import { StoreProvider } from '@/app/providers/StoreProvider'
import { ThemeProvider } from '@/app/providers/ThemeProvider'
import GlobalLoadingProvider from '@/app/providers/GlobalLoadingProvider/ui/GlobalLoaderProvider'
import { Outlet } from 'react-router'
import { LogoutWatcher } from '@/features/AuthLogout'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const RootLayout = () => {
  return (
    <ThemeProvider>
      <StoreProvider>
        <GlobalLoadingProvider>
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
          <LogoutWatcher />
          <Outlet />
          {/* </LocalizationProvider> */}
        </GlobalLoadingProvider>
      </StoreProvider>
    </ThemeProvider>
  )
}

export default RootLayout
