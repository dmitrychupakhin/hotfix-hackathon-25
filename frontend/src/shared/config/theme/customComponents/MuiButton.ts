import type { Components, Theme } from '@mui/material'

const MuiButton: Components<Theme>['MuiButton'] = {
  defaultProps: {
    // disableRipple: true,
    variant: 'contained',
    color: 'primary',
    size: 'medium',
  },
  styleOverrides: {
    root: {
      boxShadow: 'none',
      textTransform: 'none',
    },
  },
  variants: [
    {
      props: { size: 'large' },
      style: ({ theme }) => ({
        padding: '16px 32px',
        borderRadius: theme.shape.borderRadius * 100,
        fontSize: theme.typography.h6.fontSize,
        fontWeight: 600,
      }),
    },
    {
      props: { size: 'medium' },
      style: ({ theme }) => ({
        padding: '12px 24px',
        borderRadius: theme.shape.borderRadius * 100,
        fontSize: theme.typography.body2.fontSize,
        fontWeight: 600,
      }),
    },
    {
      props: { size: 'small' },
      style: ({ theme }) => ({
        padding: '8px 16px',
        borderRadius: theme.shape.borderRadius * 100,
        fontSize: theme.typography.subtitle1.fontSize,
        fontWeight: 600,
      }),
    },

    // Primary contained
    {
      props: { color: 'primary', variant: 'contained' },
      style: ({ theme }) => ({
        'color': theme.palette.secondary.dark,
        'backgroundColor': theme.palette.primary.main,
        '&:hover': {
          backgroundImage: 'none',
          backgroundColor: theme.palette.primary.dark,
          boxShadow: 'none',
        },
        '&:active': {
          backgroundColor: theme.palette.primary.dark,
        },
      }),
    },
    // // Secondary contained
    {
      props: { color: 'secondary', variant: 'contained' },
      style: ({ theme }) => ({
        'color': theme.palette.invertedSecondary.dark,
        'backgroundColor': theme.palette.secondary.dark,
        '&:hover': {
          backgroundImage: 'none',
          backgroundColor: theme.palette.secondary.main,
          boxShadow: 'none',
        },
        '&:active': {
          backgroundColor: theme.palette.secondary.main,
        },
        // ...(theme.applyStyles?.('dark', {
        //   color: contentDark[400],
        // }) || {}),
      }),
    },
    // // Outlined
    // {
    //   props: { variant: 'outlined' },
    //   style: ({ theme }) => ({
    //     'color': theme.palette.primary.main,
    //     'border': '2px solid',
    //     'borderColor': theme.palette.primary.main,
    //     'backgroundColor': 'transparent',
    //     '&:hover': {
    //       color: contentLight[400],
    //       backgroundImage: 'none',
    //       backgroundColor: theme.palette.primary.dark,
    //       borderColor: theme.palette.primary.dark,
    //     },
    //     '&:active': {
    //       backgroundColor: theme.palette.primary.darker,
    //       borderColor: theme.palette.primary.darker,
    //     },
    //   }),
    // },
    // // Secondary outlined
    // {
    //   props: { color: 'secondary', variant: 'outlined' },
    //   style: ({ theme }) => ({
    //     'color': theme.palette.secondary.main,
    //     'border': '2px solid',
    //     'borderColor': theme.palette.secondary.main,
    //     'backgroundColor': 'transparent',
    //     '&:hover': {
    //       color: contentLight[400],
    //       backgroundImage: 'none',
    //       backgroundColor: theme.palette.secondary.dark,
    //       borderColor: theme.palette.secondary.dark,
    //     },
    //     '&:active': {
    //       backgroundColor: theme.palette.secondary.darker,
    //       borderColor: theme.palette.secondary.darker,
    //     },
    //     ...(theme.applyStyles?.('dark', {
    //       '&:hover': {
    //         color: contentDark[400],
    //         backgroundColor: theme.palette.secondary.dark,
    //         borderColor: theme.palette.secondary.dark,
    //       },
    //       '&:active': {
    //         color: contentDark[400],
    //         backgroundColor: theme.palette.secondary.darker,
    //         borderColor: theme.palette.secondary.darker,
    //       },
    //     }) || {}),
    //   }),
    // },
    // // Text button

    // // todo
    // {
    //   props: { variant: 'text' },
    //   style: ({ theme }) => ({
    //     'color': accent[600],
    //     '&:hover': {
    //       backgroundColor: accent[100],
    //     },
    //     '&:active': {
    //       backgroundColor: accent[200],
    //     },
    //     ...(theme.applyStyles?.('dark', {
    //       'color': accent[600],
    //       '&:hover': {
    //         backgroundColor: accent[600],
    //       },
    //       '&:active': {
    //         backgroundColor: alpha(accent[600], 0.7),
    //       },
    //     }) || {}),
    //   }),
    // },
    // // Secondary text button
    // {
    //   props: { color: 'secondary', variant: 'text' },
    //   style: ({ theme }) => ({
    //     'color': accent[600],
    //     '&:hover': {
    //       backgroundColor: alpha(accent[100], 0.5),
    //     },
    //     '&:active': {
    //       backgroundColor: alpha(accent[200], 0.7),
    //     },
    //     ...(theme.applyStyles?.('dark', {
    //       'color': accent[100],
    //       '&:hover': {
    //         backgroundColor: alpha(accent[600], 0.5),
    //       },
    //       '&:active': {
    //         backgroundColor: alpha(accent[600], 0.3),
    //       },
    //     }) || {}),
    //   }),
    // },
  ],
}

export default MuiButton
