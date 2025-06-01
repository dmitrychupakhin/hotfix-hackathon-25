import { ROUTES } from '@/shared/const/routes'
import FormLoader from '@/shared/ui/FormLoader/FormLoader'
import PasswordField from '@/shared/ui/PasswordField/PasswordField'
import {
  alpha,
  Box,
  Button,
  Link as MuiLink,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { useAuthRegister } from '../api/AuthRegisterApi'
import type { AuthRegisterResponse, AuthRegisterSchema } from '../model/types/AuthRegisterSchema'
import { useTranslation } from 'react-i18next'

const AuthRegisterForm = () => {
  const { t } = useTranslation()
  const [formError, setFormError] = useState<string | null>(null)

  const { handleSubmit, control, setError, watch, clearErrors } = useForm<AuthRegisterSchema>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirm: '',
    },
  })

  const password = watch('password')

  const [authRegister, { isLoading }] = useAuthRegister()

  const navigate = useNavigate()

  const onSubmit = async (data: AuthRegisterSchema) => {
    try {
      setFormError(null)
      clearErrors()

      await authRegister(data).unwrap()
      navigate(ROUTES.AUTH_REGISTER_CONFIRM())
    }
    catch (err) {
      const { errors } = err as AuthRegisterResponse
      const { detail, ...fieldErrors } = errors

      if (detail) {
        setFormError(Array.isArray(detail) ? detail[0] : detail)
      }

      Object.entries(fieldErrors).forEach(([field, message]) => {
        setError(field as keyof AuthRegisterSchema, { type: 'server', message })
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
                color: theme.palette.mode === 'dark' ? theme.palette.invertedSecondary.dark : theme.palette.secondary.dark,
              })}
            >
              {t('Добро пожаловать!')}
            </Typography>
          </Box>
          <Typography variant="h4" fontWeight={600}>
            {t('Создайте учетную запись')}
          </Typography>
        </Stack>
        {formError && (
          <Typography variant="body2" color="error">
            {formError}
          </Typography>
        )}
        <Stack spacing={2}>
          <Controller
            name="username"
            control={control}
            rules={{
              required: t('Введите логин'),
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                variant="outlined"
                label={t('Логин')}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                variant="outlined"
                label={t('Почта')}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{
              required: t('Введите пароль'),
            }}
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
        </Stack>
        <Button type="submit" disabled={isLoading} variant="contained" color="primary">
          {t('Зарегистрироваться')}
        </Button>
        <Typography variant="body2" textAlign="end">
          {t('Уже есть учетная запись?')}
          <br />
          <MuiLink
            component={Link}
            to={ROUTES.AUTH_LOGIN()}
            variant="body2"
            sx={theme => ({
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.mode === 'dark' ? theme.palette.invertedSecondary.main : theme.palette.secondary.main,
            })}
          >
            {t('Войдите прямо сейчас')}
          </MuiLink>
        </Typography>
      </Stack>
    </Box>
  )
}

export default AuthRegisterForm
