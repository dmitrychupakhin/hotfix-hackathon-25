import { VkLoginButton } from '@/features/AuthVkLogin'
import { useVkLogin } from '@/features/AuthVkLogin/lib/hooks/useVkLogin'
import type { AuthVkLoginResponse } from '@/features/AuthVkLogin/model/types/AuthVkLoginSchema'
import { ROUTES } from '@/shared/const/routes'
import FormLoader from '@/shared/ui/FormLoader/FormLoader'
import PasswordField from '@/shared/ui/PasswordField/PasswordField'
import {
  alpha,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Link as MuiLink,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { useLogin } from '../lib/hooks/useLogin'
import type { AuthLoginResponse, AuthLoginSchema } from '../model/types/AuthLoginSchema'
import { useTranslation } from 'react-i18next'

const AuthLoginForm = () => {
  const { t } = useTranslation()
  const [formError, setFormError] = useState<string | null>(null)

  const { handleSubmit, control, setError, clearErrors } = useForm<AuthLoginSchema>({
    defaultValues: {
      username: '',
      password: '',
      rememberMe: false,
    },
  })

  const { loginAndGetProfile, isLoading: isLoginLoading } = useLogin()

  const { vkLoginAndGetProfile, isLoading: isVkLoginLoading } = useVkLogin()

  const handleVkLogin = async () => {
    try {
      await vkLoginAndGetProfile()
    }
    catch (error) {
      const { errors } = error as AuthVkLoginResponse
      const { detail } = errors

      if (detail) {
        setFormError(Array.isArray(detail) ? detail[0] : detail)
      }
    }
  }

  const onSubmit = async (data: AuthLoginSchema) => {
    try {
      setFormError(null)
      clearErrors()

      await loginAndGetProfile(data)
    }
    catch (err) {
      const { errors } = err as AuthLoginResponse
      const { detail, ...fieldErrors } = errors

      if (detail) {
        setFormError(Array.isArray(detail) ? detail[0] : detail)
      }

      Object.entries(fieldErrors).forEach(([field, message]) => {
        setError(field as keyof AuthLoginSchema, { type: 'server', message })
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
      {(isLoginLoading || isVkLoginLoading) && <FormLoader />}
      <Stack spacing={2} width="100%">
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
              {t('С возвращением!')}
            </Typography>
          </Box>
          <Typography variant="h4" fontWeight={600}>
            {t('Войдите в аккаунт')}
          </Typography>
        </Stack>
        {formError && (
          <Typography variant="body2" color="error">
            {formError}
          </Typography>
        )}
        <Controller
          name="username"
          control={control}
          rules={{
            required: t('Введите логин или почту'),
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              fullWidth
              variant="outlined"
              label={t('Логин или почта')}
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
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Controller
            name="rememberMe"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} disableRipple />}
                label={t('Запомнить меня')}
                labelPlacement="end"
                slotProps={{
                  typography: {
                    variant: 'body2',
                  },
                }}
              />
            )}
          />
          <MuiLink component={Link} color="secondary" to={ROUTES.AUTH_RESET_PASSWORD()} variant="body2">
            {t('Забыли пароль?')}
          </MuiLink>
        </Box>
        <Button type="submit" disabled={isLoginLoading} variant="contained" color="primary">
          {t('Войти')}
        </Button>
        <Divider
          sx={theme => ({
            'color': theme.palette.secondary.main,
            '&::before, &::after': {
              borderColor: theme.palette.secondary.main,
            },
          })}
          textAlign="center"
        >
          {t('ИЛИ')}
        </Divider>
        <VkLoginButton
          title={t('Войти через VK-ID')}
          handleVkLogin={handleVkLogin}
          disabled={isVkLoginLoading}
        />
        <Typography variant="body2" textAlign="end">
          {t('Нет аккаунта?')}
          {' '}
          <MuiLink
            component={Link}
            to={ROUTES.AUTH_REGISTER()}
            variant="body2"
            sx={theme => ({
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.mode === 'dark' ? theme.palette.invertedSecondary.main : theme.palette.secondary.main,
            })}
          >
            {t('Зарегистрироваться')}
          </MuiLink>
        </Typography>
      </Stack>
    </Box>
  )
}
export default AuthLoginForm
