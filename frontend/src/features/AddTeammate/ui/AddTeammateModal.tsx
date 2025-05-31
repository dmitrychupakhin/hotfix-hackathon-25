import { TeamRole } from '@/entities/Profile/model/types/User'
import type { AuthLoginResponse } from '@/features/AuthLogin/model/types/AuthLoginSchema'
import FormLoader from '@/shared/ui/FormLoader/FormLoader'
import ImagePicker from '@/shared/ui/ImagePicker/ImagePicker'
import { Box, Button, Divider, Grid, MenuItem, Modal, Paper, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useAddTeamlead } from '../api/addTeammateApi'
import type { AddTeammateSchema } from '../model/types/AddTeammateSchema'

interface AddTeamleadModalProps {
  open: boolean
  handleClose: () => void
}

const AddTeamleadModal = ({ open, handleClose }: AddTeamleadModalProps) => {
  const [formError, setFormError] = useState<string | null>(null)
  const [addTeammate, { isLoading }] = useAddTeamlead()

  const { control, handleSubmit, reset, clearErrors, setError } = useForm<AddTeammateSchema>({
    defaultValues: {
      firstName: '',
      lastName: '',
      middleName: '',
      photo: null,
      role: TeamRole.FRONTEND,
      stack: '',
      password: '',
      confirm: '',
    },
  })

  const onSubmit = async (data: AddTeammateSchema) => {
    try {
      setFormError(null)
      clearErrors()
      await addTeammate(data).unwrap()
      handleClose()
    }
    catch (err) {
      const { errors } = err as AuthLoginResponse
      const { detail, ...fieldErrors } = errors

      if (detail) {
        setFormError(Array.isArray(detail) ? detail[0] : detail)
      }

      Object.entries(fieldErrors).forEach(([field, message]) => {
        setError(field as keyof AddTeammateSchema, { type: 'server', message })
      })
    }
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          outline: 'none',
        }}
      >
        <Paper sx={{ p: 4, borderRadius: 3, position: 'relative' }}>
          {isLoading && <FormLoader />}
          <Stack spacing={2}>
            <Typography variant="h6" fontWeight={600}>
              Добавить разработчика
            </Typography>
            <Divider />
            {formError && (
              <Typography variant="body2" color="error">
                {formError}
              </Typography>
            )}
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={1}>
                <Grid size={4} sx={{ maxHeight: '150px' }}>
                  <Controller
                    name="photo"
                    control={control}
                    render={({ field }) => (
                      <ImagePicker
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </Grid>
                <Grid size={4}>
                  <Stack spacing={1}>
                    <Controller
                      name="firstName"
                      control={control}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          label="Имя"
                          fullWidth
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                        />
                      )}
                    />
                    <Controller
                      name="middleName"
                      control={control}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          label="Отчество"
                          fullWidth
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
                          label="Email"
                          fullWidth
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                        />
                      )}
                    />
                    <Controller
                      name="password"
                      control={control}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          label="Пароль"
                          fullWidth
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                        />
                      )}
                    />

                  </Stack>
                </Grid>
                <Grid size={4}>
                  <Stack spacing={1}>
                    <Controller
                      name="lastName"
                      control={control}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          label="Фамилия"
                          fullWidth
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                        />
                      )}
                    />
                    <Controller
                      name="username"
                      control={control}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          label="Логин"
                          fullWidth
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                        />
                      )}
                    />
                    <Controller
                      name="role"
                      control={control}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          select
                          label="Роль"
                          fullWidth
                          required
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                        >
                          {Object.values(TeamRole).map(role => (
                            <MenuItem key={role} value={role}>
                              {role}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    />
                    <Controller
                      name="confirm"
                      control={control}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          label="Подтверждение пароля"
                          fullWidth
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                        />
                      )}
                    />

                  </Stack>
                </Grid>
                <Grid size={4} />
                <Grid size={8}>
                  <Controller
                    name="stack"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        label="Стек технологий"
                        fullWidth
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
                <Button
                  color="secondary"
                  onClick={() => {
                    reset()
                    handleClose()
                  }}
                >
                  Отмена
                </Button>
                <Button type="submit" variant="contained">
                  Сохранить
                </Button>
              </Box>
            </Box>
          </Stack>
        </Paper>
      </Box>
    </Modal>
  )
}

export default AddTeamleadModal
