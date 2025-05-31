import { createTheme } from '@mui/material'
import type { TypographyVariantsOptions } from '@mui/material/styles'
import '@fontsource/golos-text/400.css'
import '@fontsource/golos-text/500.css'
import '@fontsource/golos-text/600.css'
import '@fontsource/golos-text/800.css'

const defaultTheme = createTheme()

export const typography: TypographyVariantsOptions = {
  fontFamily: '"Golos Text", sans-serif',
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 800,

  h1: {
    fontSize: defaultTheme.typography.pxToRem(48),
    lineHeight: defaultTheme.typography.pxToRem(56),
    fontWeight: 600,
  },
  h2: {
    fontSize: defaultTheme.typography.pxToRem(36),
    lineHeight: defaultTheme.typography.pxToRem(44),
    fontWeight: 600,
  },
  h3: {
    fontSize: defaultTheme.typography.pxToRem(32),
    lineHeight: defaultTheme.typography.pxToRem(40),
    fontWeight: 600,
  },
  h4: {
    fontSize: defaultTheme.typography.pxToRem(28),
    lineHeight: defaultTheme.typography.pxToRem(36),
    fontWeight: 600,
  },
  h5: {
    fontSize: defaultTheme.typography.pxToRem(24),
    lineHeight: defaultTheme.typography.pxToRem(32),
    fontWeight: 600,
  },
  h6: {
    fontSize: defaultTheme.typography.pxToRem(20),
    lineHeight: defaultTheme.typography.pxToRem(28),
    fontWeight: 600,
  },
  body1: {
    fontSize: defaultTheme.typography.pxToRem(18),
    lineHeight: defaultTheme.typography.pxToRem(28),
    fontWeight: 400,
  },
  body2: {
    fontSize: defaultTheme.typography.pxToRem(16),
    lineHeight: defaultTheme.typography.pxToRem(24),
    fontWeight: 400,
  },
  subtitle1: {
    fontSize: defaultTheme.typography.pxToRem(12),
    lineHeight: defaultTheme.typography.pxToRem(16),
    fontWeight: 500,
  },
  subtitle2: {
    fontSize: defaultTheme.typography.pxToRem(10),
    lineHeight: defaultTheme.typography.pxToRem(12),
    fontWeight: 500,
  },
  caption: {
    fontSize: defaultTheme.typography.pxToRem(12),
    fontWeight: 400,
  },
}
