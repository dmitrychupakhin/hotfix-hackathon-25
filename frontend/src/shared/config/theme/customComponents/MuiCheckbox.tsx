import { alpha, type Components, type Theme } from '@mui/material';
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';

const MuiCheckbox: Components<Theme>['MuiCheckbox'] = {
    defaultProps: {
        disableRipple: true,
        icon: <CheckBoxOutlineBlankRoundedIcon sx={{ color: 'hsla(210, 0%, 0%, 0.0)' }} />,
        checkedIcon: <CheckRoundedIcon sx={{ height: 14, width: 14 }} />,
        indeterminateIcon: <RemoveRoundedIcon sx={{ height: 14, width: 14 }} />,
    },
    styleOverrides: {
        root: ({ theme }) => ({
            height: 16,
            width: 16,
            borderRadius: 5,
            border: '1px solid ',
            borderColor: theme.palette.inputDivider,
            // boxShadow: '0 0 0 1.5px hsla(210, 0%, 0%, 0.04) inset',
            // backgroundColor: alpha(theme.palette.background.default, 0.5),
            backgroundColor: alpha(theme.palette.background.default, 0.5),
            transition: 'border-color, background-color, 120ms ease-in',
            '&:hover': {
                borderColor: theme.palette.secondary.dark,
            },
            '&:active': {
                borderColor: theme.palette.secondary.dark,
            },
            '&.Mui-focusVisible': {
                outline: `3px solid ${alpha(theme.palette.secondary.main, 0.5)}`,
                outlineOffset: '2px',
                borderColor: theme.palette.secondary.main,
            },
            '&.Mui-checked': {
                color: theme.palette.secondary.main,
                backgroundColor: theme.palette.primary.main,
                borderColor: theme.palette.secondary.main,
                boxShadow: `none`,
                '&:hover': {
                    backgroundColor: theme.palette.primary.dark,
                },
                '&:active': {
                    backgroundColor: theme.palette.secondary.dark,
                    borderColor: theme.palette.secondary.dark,
                },
            },
            ...theme.applyStyles('dark', {
                // boxShadow: '0 0 0 1.5px hsl(210, 0%, 0%) inset',
                backgroundColor: alpha(theme.palette.background.default, 0.5),
                '&:hover': {
                    borderColor: theme.palette.secondary.main,
                },
                '&.Mui-focusVisible': {
                    borderColor: theme.palette.secondary.main,
                    // outline: `3px solid ${alpha(theme.palette.primary.main, 0.5)}`,
                    outlineOffset: '2px',
                },
            }),
        }),
    },
}

export default MuiCheckbox;
