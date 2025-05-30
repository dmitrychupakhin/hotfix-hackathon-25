import '@mui/material/styles'
import type { CSSProperties } from 'react'
import type {
  Mixins as MuiMixins,
  MixinsOptions as MuiMixinsOptions,
} from '@mui/material/styles'

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

  interface Mixins extends MuiMixins {
    profileSidebar: CSSProperties
  }
  interface MixinsOptions extends MuiMixinsOptions {
    profileSidebar?: CSSProperties
  }
}
