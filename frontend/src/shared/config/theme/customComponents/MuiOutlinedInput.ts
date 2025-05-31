import {
  type Components,
  inputLabelClasses,
  outlinedInputClasses,
  type Theme,
} from '@mui/material'

export const MuiOutlinedInput: Components<Theme>['MuiOutlinedInput'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      [`& .${outlinedInputClasses.notchedOutline}`]: {
        border: `1px solid ${theme.palette.inputDivider}`,
      },

      [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
        borderColor: theme.palette.secondary.main,
      },

      [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
        borderColor: theme.palette.secondary.main,
        // опционально: можно увеличить ширину рамки
        // borderWidth: 2,
      },

      transition: theme.transitions.create('border-color', {
        duration: 120,
      }),
    }),

    notchedOutline: ({ theme }) => ({
      borderRadius: theme.shape.borderRadius * 2,
    }),

    input: ({ theme }) => ({
      '::placeholder': {
        fontSize: theme.typography.body2.fontSize,
        fontWeight: 500,
        opacity: 1,
        color: theme.palette.grey[500],
      },
    }),
  },
}

export const MuiInputLabel: Components<Theme>['MuiInputLabel'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      color: theme.palette.grey[500],

      [`&.${inputLabelClasses.outlined}.${inputLabelClasses.shrink}:not(.Mui-focused)`]: {
        color: theme.palette.grey[500],
      },

      [`&.${inputLabelClasses.outlined}.${inputLabelClasses.shrink}.Mui-focused`]: {
        color: theme.palette.secondary.main,
      },
    }),
  },
}
