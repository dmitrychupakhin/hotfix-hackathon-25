import { createTheme } from '@mui/material'
import { colorSchemes } from './config/colorConfig/colorSchemes'
import { typography } from './config/typography/typography'
import MuiButton from './customComponents/MuiButton'
import MuiButtonBase from './customComponents/MuiButtonBase'
import MuiLink from './customComponents/MuiLink'
import MuiInputBase from './customComponents/MuiInputBase'
import { MuiInputLabel, MuiOutlinedInput } from './customComponents/MuiOutlinedInput'
import MuiCheckbox from './customComponents/MuiCheckbox'
import MuiFormControlLabel from './customComponents/MuiFormControlLabel'
import MuiMenu from './customComponents/MuiMenu'
import MuiMenuItem from './customComponents/MuiMenuItem'

const appTheme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        mode: 'light',
        ...colorSchemes.light,
      },
    },
    dark: {
      palette: {
        mode: 'dark',
        ...colorSchemes.dark,
      },
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0px 10px 15px 0px rgba(0, 0, 0, 0.05), 0px 4px 15px 0px rgba(0, 0, 0, 0.02)',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '',
  ],
  typography,
  components: {
    MuiButtonBase,
    MuiButton,
    MuiLink,

    MuiInputBase,
    MuiInputLabel,
    MuiOutlinedInput,
    MuiCheckbox,

    MuiFormControlLabel,

    MuiMenu,
    MuiMenuItem,
  },
  mixins: {
    toolbar: {
      minHeight: 70,
    },
  },
})

export default appTheme
