import { ROUTES } from '@/shared/const/routes'
import FormLoader from '@/shared/ui/FormLoader/FormLoader'
import PasswordField from '@/shared/ui/PasswordField/PasswordField'
import { alpha, Box, Button, Link as MuiLink, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { useAuthConfirmResetPassword } from '../api/authConfirmResetPasswordApi'
import type {
  AuthConfirmResetPasswordResponse,
  AuthConfirmResetPasswordSchema,
} from '../model/types/authConfirmResetPasswordSchema'

const AuthConfirmResetPasswordForm = () => {
  const [formError, setFormError] = useState<string | null>(null)

  const { handleSubmit, control, setError, watch, clearErrors }
    = useForm<AuthConfirmResetPasswordSchema>({
      defaultValues: {
        code: '',
        password: '',
        confirm: '',
      },
    })

  const password = watch('password')

  const [authConfirmResetPassword, { isLoading }] = useAuthConfirmResetPassword()

  const navigate = useNavigate()

  const onSubmit = async (data: AuthConfirmResetPasswordSchema) => {
    console.log(data)
    try {
      setFormError(null)
      clearErrors()

      await authConfirmResetPassword(data).unwrap()
      navigate(ROUTES.AUTH_LOGIN())
    }
    catch (err) {
      const { errors } = err as AuthConfirmResetPasswordResponse
      const { detail, ...fieldErrors } = errors

      if (detail) {
        setFormError(Array.isArray(detail) ? detail[0] : detail)
      }

      Object.entries(fieldErrors).forEach(([field, message]) => {
        setError(field as keyof AuthConfirmResetPasswordSchema, { type: 'server', message })
      })
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={theme => ({
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${alpha(theme.palette.grey[100], 0.1)}`,
        borderRadius: 2,
        width: '400px',
        maxWidth: '400px',
        p: 4,
      })}
    >
      {isLoading && <FormLoader />}
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Stack spacing={1}>
          <Box>
            <Typography
              variant="h6"
              component="span"
              sx={theme => ({
                backgroundColor: theme.palette.primary.light,
              })}
            >
              Изменение пароля
            </Typography>
          </Box>
          <Typography variant="h4" fontWeight={600}>
            Введите новый пароль
          </Typography>
        </Stack>
        {formError && (
          <Typography variant="body2" color="error">
            {formError}
          </Typography>
        )}

        <Controller
          name="code"
          control={control}
          rules={{ required: 'Введите код' }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              fullWidth
              variant="outlined"
              label="Код"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: 'Введите пароль' }}
          render={({ field, fieldState }) => (
            <PasswordField
              {...field}
              fullWidth
              variant="outlined"
              label="Пароль"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="confirm"
          control={control}
          rules={{
            required: 'Подтвердите пароль',
            validate: value => value === password || 'Пароли не совпадают',
          }}
          render={({ field, fieldState }) => (
            <PasswordField
              {...field}
              fullWidth
              variant="outlined"
              label="Подтверждение пароля"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Button type="submit" disabled={isLoading} variant="contained" color="primary">
          Поменять пароль
        </Button>
        <Typography variant="body2" textAlign="end">
          <MuiLink component={Link} to={ROUTES.AUTH_LOGIN()} variant="body2">
            Назад к авторизации
          </MuiLink>
        </Typography>
      </Stack>
    </Box>
  )
}

export default AuthConfirmResetPasswordForm
