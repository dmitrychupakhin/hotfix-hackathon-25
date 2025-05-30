import { useLazyGetProfile } from '@/entities/Profile';
import { ROUTES } from '@/shared/const/routes';
import FormLoader from '@/shared/ui/FormLoader/FormLoader';
import { alpha, Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useAuthConfirmChangeEmail } from '../api/authConfirmChangeEmailApi';
import type {
  AuthConfirmChangeEmailResponse,
  AuthConfirmChangeEmailSchema,
} from '../model/types/AuthConfirmChangeEmail';

const AuthConfirmChangeEmailForm = () => {
  const [formError, setFormError] = useState<string | null>(null);

  const { handleSubmit, control, setError, clearErrors } = useForm<AuthConfirmChangeEmailSchema>({
    defaultValues: {
      code: '',
    },
  });

  const [getProfile, { isLoading: isGetProfileLoading }] = useLazyGetProfile();
  const [authConfirmChangeEmail, { isLoading }] = useAuthConfirmChangeEmail();
  const navigate = useNavigate();

  const onSubmit = async (data: AuthConfirmChangeEmailSchema) => {
    try {
      setFormError(null);
      clearErrors();

      await authConfirmChangeEmail(data).unwrap();
      await getProfile().unwrap();
      navigate(ROUTES.MAIN());
    } catch (err) {
      const { errors } = err as AuthConfirmChangeEmailResponse;
      const { detail, ...fieldErrors } = errors;
      if (detail) {
        setFormError(Array.isArray(detail) ? detail[0] : detail);
      }

      Object.entries(fieldErrors).forEach(([field, message]) => {
        setError(field as keyof AuthConfirmChangeEmailSchema, { type: 'server', message });
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
        backgroundColor: `${alpha(theme.palette.background.default, 0.5)}`,
        border: `1px solid ${alpha(theme.palette.grey[100], 0.1)}`,
        borderRadius: 2,
        overflow: 'hidden',
      })}
    >
      {(isLoading || isGetProfileLoading) && <FormLoader />}
      <Stack spacing={2} width="100%">
        <Stack spacing={1}>
          <Typography variant="h6" fontWeight="bold" color="primary">
            Подтверждение почты
          </Typography>
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
export default AuthConfirmChangeEmailForm;
