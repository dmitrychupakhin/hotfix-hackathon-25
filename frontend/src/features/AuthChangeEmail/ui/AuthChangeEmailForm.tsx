import { ROUTES } from '@/shared/const/routes'
import FormLoader from '@/shared/ui/FormLoader/FormLoader'
import { alpha, Box, Button, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { useAuthChangeEmail } from '../api/authChangeEmailApi'
import { useTranslation } from 'react-i18next'
import type {
  AuthChangeEmailResponse,
  AuthChangeEmailSchema,
} from '../model/types/authChangeEmailSchema'

const AuthChangeEmailForm = () => {
  const { t } = useTranslation()
  const [formError, setFormError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { handleSubmit, control, setError, clearErrors } = useForm<AuthChangeEmailSchema>({
    defaultValues: {
      email: '',
    },
  })

  const [changeEmail, { isLoading }] = useAuthChangeEmail()

  const onSubmit = async (data: AuthChangeEmailSchema) => {
    try {
      setFormError(null)
      clearErrors()

      await changeEmail(data).unwrap()

      navigate(ROUTES.AUTH_CHANGE_EMAIL_CONFIRM())
    }
    catch (err) {
      const { errors } = err as AuthChangeEmailResponse
      const { detail, ...fieldErrors } = errors

      if (detail) {
        setFormError(Array.isArray(detail) ? detail[0] : detail)
      }

      Object.entries(fieldErrors).forEach(([field, message]) => {
        setError(field as keyof AuthChangeEmailSchema, { type: 'server', message })
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
              {t('Изменение почты')}
            </Typography>
          </Box>
          <Typography variant="h4" fontWeight={600}>
            {t('Введите новый адрес электронной почты')}
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
              label={t('Новая почта')}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Button type="submit" disabled={isLoading} variant="contained" color="primary">
          {t('Изменить')}
        </Button>
      </Stack>
    </Box>
  )
}
export default AuthChangeEmailForm
