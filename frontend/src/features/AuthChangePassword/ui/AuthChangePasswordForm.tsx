import { ROUTES } from '@/shared/const/routes'
import FormLoader from '@/shared/ui/FormLoader/FormLoader'
import PasswordField from '@/shared/ui/PasswordField/PasswordField'
import { alpha, Box, Button, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { useAuthChangePassword } from '../api/authChangePasswordApi'
import type {
  AuthChangePasswordResponse,
  AuthChangePasswordSchema,
} from '../model/types/authChangePasswordSchema'
import { useTranslation } from 'react-i18next'

const AuthChangePasswordForm = () => {
  const { t } = useTranslation()
  const [formError, setFormError] = useState<string | null>(null)

  const { handleSubmit, control, setError, watch, clearErrors } = useForm<AuthChangePasswordSchema>(
    {
      defaultValues: {
        oldPassword: '',
        password: '',
        confirm: '',
      },
    },
  )

  const password = watch('password')

  const [authChangePassword, { isLoading }] = useAuthChangePassword()

  const navigate = useNavigate()

  const onSubmit = async (data: AuthChangePasswordSchema) => {
    console.log(data)
    try {
      setFormError(null)
      clearErrors()

      await authChangePassword(data).unwrap()
      navigate(ROUTES.AUTH_REGISTER_CONFIRM())
    }
    catch (err) {
      const { errors } = err as AuthChangePasswordResponse
      const { detail, ...fieldErrors } = errors

      if (detail) {
        setFormError(Array.isArray(detail) ? detail[0] : detail)
      }

      Object.entries(fieldErrors).forEach(([field, message]) => {
        setError(field as keyof AuthChangePasswordSchema, { type: 'server', message })
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
              {t('Изменение пароля')}
            </Typography>
          </Box>
          <Typography variant="h4" fontWeight={600}>
            {t('Введите новый пароль')}
          </Typography>
        </Stack>
        {formError && (
          <Typography variant="body2" color="error">
            {formError}
          </Typography>
        )}

        <Controller
          name="oldPassword"
          control={control}
          rules={{ required: t('Введите старый пароль')}}
          render={({ field, fieldState }) => (
            <PasswordField
              {...field}
              fullWidth
              variant="outlined"
              label={t('Старый пароль')}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: t('Введите пароль') }}
          render={({ field, fieldState }) => (
            <PasswordField
              {...field}
              fullWidth
              variant="outlined"
              label={t('Пароль')}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="confirm"
          control={control}
          rules={{
            required: t('Подтвердите пароль'),
            validate: value => value === password || t('Пароли не совпадают'),
          }}
          render={({ field, fieldState }) => (
            <PasswordField
              {...field}
              fullWidth
              variant="outlined"
              label={t('Подтверждение пароля')}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Button type="submit" disabled={isLoading} variant="contained" color="primary">
          {t('Поменять пароль')}
        </Button>
      </Stack>
    </Box>
  )
}

export default AuthChangePasswordForm
