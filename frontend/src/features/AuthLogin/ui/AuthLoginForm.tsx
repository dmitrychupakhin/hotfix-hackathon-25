import { VkLoginButton } from '@/features/AuthVkLogin';
import { useVkLogin } from '@/features/AuthVkLogin/lib/hooks/useVkLogin';
import type { AuthVkLoginResponse } from '@/features/AuthVkLogin/model/types/AuthVkLoginSchema';
import { ROUTES } from '@/shared/const/routes';
import FormLoader from '@/shared/ui/FormLoader/FormLoader';
import PasswordField from '@/shared/ui/PasswordField/PasswordField';
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
} from '@mui/material';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { useLogin } from '../lib/hooks/useLogin';
import type { AuthLoginResponse, AuthLoginSchema } from '../model/types/AuthLoginSchema';

const AuthLoginForm = () => {
  const [formError, setFormError] = useState<string | null>(null);

  const { handleSubmit, control, setError, clearErrors } = useForm<AuthLoginSchema>({
    defaultValues: {
      personalId: '',
      password: '',
      rememberMe: false,
    },
  });

  const { loginAndGetProfile, isLoading: isLoginLoading } = useLogin();

  const { vkLoginAndGetProfile, isLoading: isVkLoginLoading } = useVkLogin();

  const handleVkLogin = async () => {
    try {
      await vkLoginAndGetProfile();
    } catch (error) {
      const { errors } = error as AuthVkLoginResponse;
      const { detail } = errors;

      if (detail) {
        setFormError(Array.isArray(detail) ? detail[0] : detail);
      }
    }
  };

  const onSubmit = async (data: AuthLoginSchema) => {
    try {
      setFormError(null);
      clearErrors();

      await loginAndGetProfile(data);
    } catch (err) {
      const { errors } = err as AuthLoginResponse;
      const { detail, ...fieldErrors } = errors;

      if (detail) {
        setFormError(Array.isArray(detail) ? detail[0] : detail);
      }

      Object.entries(fieldErrors).forEach(([field, message]) => {
        setError(field as keyof AuthLoginSchema, { type: 'server', message });
      });
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={(theme) => ({
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
          <Typography variant="h6" fontWeight="bold" color="primary">
            С возвращением!
          </Typography>
          <Typography variant="h4" fontWeight={600}>
            Войдите в аккаунт
          </Typography>
        </Stack>
        {formError && (
          <Typography variant="body2" color="error">
            {formError}
          </Typography>
        )}
        <Controller
          name="personalId"
          control={control}
          rules={{
            required: 'Введите логин',
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              fullWidth
              variant="outlined"
              label="Логин"
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
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Controller
            name="rememberMe"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} disableRipple />}
                label="Запомнить меня"
                labelPlacement="end"
                slotProps={{
                  typography: {
                    variant: 'body2',
                  },
                }}
              />
            )}
          />
          <MuiLink component={Link} to={ROUTES.AUTH_RESET_PASSWORD()} variant="body2">
            Забыли пароль?
          </MuiLink>
        </Box>
        <Button type="submit" disabled={isLoginLoading} variant="contained" color="primary">
          Войти
        </Button>
        <Divider
          sx={(theme) => ({
            color: theme.palette.primary.main,
            '&::before, &::after': {
              borderColor: theme.palette.primary.main,
            },
          })}
          textAlign="center"
        >
          ИЛИ
        </Divider>
        <VkLoginButton
          title="Войти через VK-ID"
          handleVkLogin={handleVkLogin}
          disabled={isVkLoginLoading}
        />
        <Typography variant="body2" textAlign="end">
          Нет аккаунта?{' '}
          <MuiLink component={Link} to={ROUTES.AUTH_REGISTER()} variant="body2">
            Зарегестрироваться
          </MuiLink>
        </Typography>
      </Stack>
    </Box>
  );
};
export default AuthLoginForm;
