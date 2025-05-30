import '@mui/material/styles'

declare module '@mui/material/styles' {
  interface CommonColors {
    green?: string
  }
  interface Palette {
    invertedSecondary: {
      light: string
      main: string
      dark: string
    }
    inputDivider: string
  }
  interface PaletteOptions {
    invertedSecondary?: {
      light?: string
      main?: string
      dark?: string
    }
    inputDivider?: string
  }
}
