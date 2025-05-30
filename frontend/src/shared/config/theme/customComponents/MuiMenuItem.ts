import type { Components, Theme } from '@mui/material';
import { menuItemClasses } from '@mui/material';

const MuiMenuItem: Components<Theme>['MuiMenuItem'] = {
  defaultProps: {
    disableRipple: true,
  },
  styleOverrides: {
    root: ({ theme }) => ({
      borderRadius: theme.shape.borderRadius * 2,
      backgroundColor: 'transparent',
      padding: '8px 16px',
      [`&.${menuItemClasses.focusVisible}`]: {
        backgroundColor: 'transparent',
      },
      [`&.${menuItemClasses.selected}`]: {
        [`&.${menuItemClasses.focusVisible}`]: {
          backgroundColor: 'transparent',
        },
      },
    }),
  },
}

export default MuiMenuItem;
