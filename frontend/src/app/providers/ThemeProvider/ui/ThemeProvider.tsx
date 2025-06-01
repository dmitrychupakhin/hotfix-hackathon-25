// ThemeProvider.tsx
import { appTheme } from '@/shared/config/theme'
import {
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
  GlobalStyles,
} from '@mui/material'
import type { Theme } from '@mui/material'
import type { FC, ReactNode } from 'react'

interface ThemeProviderProps {
  children: ReactNode
}

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  return (
    <MuiThemeProvider theme={appTheme}>
      <CssBaseline enableColorScheme />
      <GlobalStyles
        styles={(theme: Theme) => ({
          ':root': {
            '--gantt-text-color': theme.palette.text.primary,
            '--gantt-alternate-text-color': theme.palette.text.secondary,
            '--gantt-background-color': theme.palette.background.paper,
            '--gantt-alternate-background-color': theme.palette.action.hover,
            '--gantt-border-color': theme.palette.divider,
            '--gantt-handle-color': theme.palette.action.disabled,
            '--gantt-expander-color': theme.palette.text.secondary,
            '--gantt-task-background': theme.palette.primary.main,
            '--gantt-task-background-selected': theme.palette.primary.dark,
            '--gantt-task-progress': theme.palette.secondary.main,
            '--gantt-task-progress-selected': theme.palette.secondary.dark,
          },
        })}
      />
      {children}
    </MuiThemeProvider>
  )
}

export default ThemeProvider
