import React from 'react'
import { IconButton, InputAdornment, TextField, type TextFieldProps } from '@mui/material'
import { usePasswordToggle } from '@/shared/lib/hooks/usePasswordToggle'
import { t } from 'i18next'

const PasswordField: React.FC<TextFieldProps> = (props) => {
  const { type, icon, toggleVisibility } = usePasswordToggle()

  return (
    <TextField
      {...props}
      type={type}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label={type === 'password' ? t('Показать пароль') : t('Скрыть пароль')}
                onClick={toggleVisibility}
                edge="end"
                sx={{
                  'border': 'none',
                  'background': 'none',
                  '&:hover': {
                    background: 'none',
                    color: 'primary.dark',
                  },
                  '&:active': {
                    background: 'none',
                    color: 'primary.darker',
                  },
                }}
              >
                {icon}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  )
}

export default PasswordField
