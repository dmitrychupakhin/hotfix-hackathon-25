import { ROUTES } from '@/shared/const/routes'
import FormLoader from '@/shared/ui/FormLoader/FormLoader'
import { alpha, Box, Button, Link as MuiLink, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { useAuthResetPassword } from '../api/authResetPasswordApi'
import type {
  AuthResetPasswordResponse,
  AuthResetPasswordSchema,
} from '../model/types/authResetPasswordSchema'
import { useTranslation } from 'react-i18next'

const AuthResetPasswordForm = () => {
  const { t } = useTranslation()
  const [formError, setFormError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { handleSubmit, control, setError, clearErrors } = useForm<AuthResetPasswordSchema>({
    defaultValues: {
      email: '',
    },
  })

  const [resetPassword, { isLoading }] = useAuthResetPassword()

  const onSubmit = async (data: AuthResetPasswordSchema) => {
    try {
      setFormError(null)
      clearErrors()

      await resetPassword(data).unwrap()

      navigate(ROUTES.AUTH_RESET_PASSWORD_CONFIRM())
    }
    catch (err) {
      const { errors } = err as AuthResetPasswordResponse
      const { detail, ...fieldErrors } = errors

      if (detail) {
        setFormError(Array.isArray(detail) ? detail[0] : detail)
      }

      Object.entries(fieldErrors).forEach(([field, message]) => {
        setError(field as keyof AuthResetPasswordSchema, { type: 'server', message })
      })
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={theme => ({
        display: 'flex',
        position: 'relative',
        width: '400px',
        maxWidth: '400px',
        p: 4,
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${alpha(theme.palette.grey[100], 0.1)}`,
        borderRadius: 2,
        overflow: 'hidden',
      })}
    >
      {isLoading && <FormLoader />}
      <Stack spacing={2} width="100%">
        <Stack spacing={1}>
          <Box>
            <Typography
              variant="h6"
              component="span"
              sx={theme => ({
                backgroundColor: theme.palette.primary.light,
              })}
            >
              {t('Сброс пароля')}
            </Typography>
          </Box>
          <Typography variant="h4" fontWeight={600}>
            {t('Введите вашу электронную почту')}
          </Typography>
        </Stack>
        {formError && (
          <Typography variant="body2" color="error">
            {formError}
          </Typography>
        )}
        <Controller
          name="email"
          control={control}
          rules={{
            required: t('Введите почту'),
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: t('Некорректный email адрес'),
            },
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              fullWidth
              variant="outlined"
              label={t('Электронная почта')}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Button type="submit" disabled={isLoading} variant="contained" color="primary">
          {t('Сбросить пароль')}
        </Button>
        <Typography variant="body2" textAlign="end">
          <MuiLink
            component={Link}
            to={ROUTES.AUTH_LOGIN()}
            variant="body2"
            sx={theme => ({
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.mode === 'dark' ? theme.palette.invertedSecondary.main : theme.palette.secondary.main,
            })}
          >
            {t('Назад к авторизации')}
          </MuiLink>
        </Typography>
      </Stack>
    </Box>
  )
}
export default AuthResetPasswordForm
