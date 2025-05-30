import { appTheme } from '@/shared/config/theme'
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material'
import type { FC, ReactNode } from 'react'

interface ThemeProviderProps {
  children: ReactNode
}

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  return (
    <MuiThemeProvider noSsr theme={appTheme} defaultMode="light" disableTransitionOnChange>
      <CssBaseline enableColorScheme />
      {children}
    </MuiThemeProvider>
  )
}

export default ThemeProvider
