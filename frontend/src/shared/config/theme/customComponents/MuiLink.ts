import type { Components, Theme } from '@mui/material'

const MuiLink: Components<Theme>['MuiLink'] = {
  defaultProps: {
    underline: 'none',
  },
  styleOverrides: {
    root: ({ theme }) => ({
      position: 'relative',
      textDecoration: 'none',
      width: 'fit-content',
      color: theme.palette.text.primary,
      cursor: 'pointer',
    }),
  },

  variants: [
    {
      props: { color: 'primary' },
      style: ({ theme }) => ({
        'color': theme.palette.primary.main,
        '&:hover': {
          color: theme.palette.primary.dark,
        },
        '&:active': {
          color: theme.palette.primary.dark,
        },
        '&[aria-disabled="true"]': {
          pointerEvents: 'none',
          color: theme.palette.primary.light,
        },
      }),
    },
    {
      props: { color: 'secondary' },
      style: ({ theme }) => ({
        'color': theme.palette.secondary.main,
        '&:hover': {
          color: theme.palette.primary.dark,
        },
        '&:active': {
          color: theme.palette.primary.dark,
        },
        '&[aria-disabled="true"]': {
          pointerEvents: 'none',
          color: theme.palette.secondary.light,
        },
      }),
    },
  ],
}

export default MuiLink
