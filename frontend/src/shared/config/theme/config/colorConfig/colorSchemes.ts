import type { PaletteOptions } from '@mui/material/styles'
import { error, contentDark, success, primary, warning, gray, secondary, inputDevider, devider, domLight, domDark, paperBackgroundLight, contentLight, paperBackgroundDark } from './colors'

export const colorSchemes: {
  light: PaletteOptions
  dark: PaletteOptions
} = {
  light: {
    common: {
      black: '#161616',
      green: secondary[200],
    },
    primary: {
      light: primary[200],
      main: primary[400],
      dark: primary[600],
    },
    secondary: {
      light: contentDark[200],
      main: contentDark[400],
      dark: contentDark[600],
    },
    invertedSecondary: {
      light: contentLight[200],
      main: contentLight[400],
      dark: contentLight[600],
    },
    info: {
      light: contentDark[200],
      main: contentDark[400],
      dark: contentDark[600],
    },
    warning: {
      light: warning[100],
      main: warning[400],
      dark: warning[600],
    },
    error: {
      light: error[100],
      main: error[400],
      dark: error[600],
    },
    success: {
      light: success[100],
      main: success[400],
      dark: success[600],
    },
    grey: {
      ...gray,
    },
    divider: devider,
    inputDivider: inputDevider,
    background: {
      default: domLight,
      paper: paperBackgroundLight,
    },
    text: {
      primary: contentDark[400],
      secondary: contentDark[600],
      disabled: contentDark[100],
    },
  },
  dark: {
    primary: {
      light: primary[200],
      main: primary[400],
      dark: primary[600],
    },
    secondary: {
      light: secondary[200],
      main: secondary[400],
      dark: secondary[600],
    },
    invertedSecondary: {
      light: contentLight[200],
      main: contentLight[400],
      dark: contentLight[600],
    },
    info: {
      light: contentLight[200],
      main: contentLight[400],
      dark: contentLight[600],
    },
    warning: {
      light: warning[100],
      main: warning[400],
      dark: warning[600],
    },
    error: {
      light: error[100],
      main: error[400],
      dark: error[600],
    },
    success: {
      light: success[100],
      main: success[400],
      dark: success[600],
    },
    grey: {
      ...gray,
    },
    divider: devider,
    inputDivider: inputDevider,
    background: {
      default: domDark,
      paper: paperBackgroundDark,
    },
    text: {
      primary: contentLight[400],
      secondary: contentLight[600],
      disabled: contentLight[100],
    },
  },
}
