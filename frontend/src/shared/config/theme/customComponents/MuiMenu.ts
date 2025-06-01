import type { Components, Theme } from '@mui/material'
import { buttonBaseClasses, dividerClasses } from '@mui/material'
import { primary } from '../config/colorConfig/colors'

const MuiMenu: Components<Theme>['MuiMenu'] = {
  defaultProps: {
    disableScrollLock: true,
  },
  styleOverrides: {
    list: () => ({
      gap: 0,
      [`& .${dividerClasses.root}`]: {
        margin: '0 -8px',
      },
    }),
    paper: ({ theme }) => ({
      padding: theme.shape.borderRadius,
      marginTop: '18px',
      borderRadius: theme.shape.borderRadius * 2,
      background: 'transparent',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[1],
      [`& .${buttonBaseClasses.root}`]: {
        '&.Mui-selected': {
          'backgroundColor': 'transparent',
          'color': theme.palette.primary.dark,
          '&:hover': {
            backgroundColor: primary[200],
          },
        },
        '&:hover': {
          backgroundColor: primary[200],
          color: theme.palette.secondary.main,
        },
        '&:active': {
          backgroundColor: primary[300],
          color: theme.palette.secondary.main,
        },
      },
      ...theme.applyStyles('dark', {
        [`& .${buttonBaseClasses.root}`]: {
          '&.Mui-selected': {
            'backgroundColor': 'transparent',
            'color': theme.palette.primary.dark,
            '&:hover': {
              backgroundColor: primary[200],
            },
          },
          '&:hover': {
            backgroundColor: primary[200],
            color: theme.palette.invertedSecondary.main,
          },
          '&:active': {
            backgroundColor: primary[300],
            color: theme.palette.invertedSecondary.dark,
          },
        },
        boxShadow:
            'hsla(220, 30%, 5%, 0.7) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.8) 0px 8px 16px -5px',
      }),
    }),
  },
}

export default MuiMenu
