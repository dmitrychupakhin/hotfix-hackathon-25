import type { Components, Theme } from '@mui/material'

const MuiInputBase: Components<Theme>['MuiInputBase'] = {
  styleOverrides: {
    root: {
      border: 'none',
    },
    input: ({ theme }) => ({
      '&::placeholder': {
        opacity: 0.7,
        color: theme.palette.grey[500],
      },
    }),
  },
}
export default MuiInputBase
