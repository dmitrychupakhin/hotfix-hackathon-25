import { ROUTES } from '@/shared/const/routes';
import FormLoader from '@/shared/ui/FormLoader/FormLoader';
import { alpha, Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useAuthConfirmRegister } from '../api/AuthConfirmRegisterApi';
import type {
  AuthConfirmRegisterResponse,
  AuthConfirmRegisterSchema,
} from '../model/types/AuthConfirmRegisterSchema';

const AuthConfirmRegisterform = () => {
  const [formError, setFormError] = useState<string | null>(null);

  const { handleSubmit, control, setError, clearErrors } = useForm<AuthConfirmRegisterSchema>({
    defaultValues: {
      code: '',
    },
  });

  const [authConfirmRegister, { isLoading }] = useAuthConfirmRegister();
  const navigate = useNavigate();

  const onSubmit = async (data: AuthConfirmRegisterSchema) => {
    try {
      setFormError(null);
      clearErrors();

      await authConfirmRegister(data).unwrap();
      navigate(ROUTES.AUTH_LOGIN());
    } catch (err) {
      const { errors } = err as AuthConfirmRegisterResponse;
      const { detail, ...fieldErrors } = errors;
      if (detail) {
        setFormError(Array.isArray(detail) ? detail[0] : detail);
      }

      Object.entries(fieldErrors).forEach(([field, message]) => {
        setError(field as keyof AuthConfirmRegisterSchema, { type: 'server', message });
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
      {isLoading && <FormLoader />}
      <Stack spacing={2} width="100%">
        <Stack spacing={1}>
          <Box>
            <Typography variant="h6" component="span" sx={(theme) => ({
              backgroundColor: theme.palette.primary.light,
            })}>
              Подтверждение регистрации
            </Typography>
          </Box>
          <Typography variant="h4" fontWeight={600}>
            Код подтверждения отправлен на почту
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
          rules={{ required: 'Введите пароль' }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              fullWidth
              variant="outlined"
              label="Код подтверждения"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <Button type="submit" disabled={isLoading} variant="contained" color="primary">
          Отправить
        </Button>
      </Stack>
    </Box>
  );
};
export default AuthConfirmRegisterform;
