import type { Theme, Components } from '@mui/material/styles';

const MuiFormControlLabel: Components<Theme>['MuiFormControlLabel'] = {
    styleOverrides: {
      root: {
        margin: 0,
      },
      label: ({ theme }) => ({
        marginLeft: theme.spacing(1),
      }),
    },
  }

export default MuiFormControlLabel;
