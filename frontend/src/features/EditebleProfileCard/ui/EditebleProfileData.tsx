import type { User } from '@/entities/Profile'
import { useLazyGetProfile } from '@/entities/Profile'
import { useVkUnlink } from '@/features/AuthUnlinkVk/lib/hooks/useVkUnlink'
import VkUnlinkButton from '@/features/AuthUnlinkVk/ui/VkUnlinkButton'
import { useVkLogin, VkLoginButton } from '@/features/AuthVkLogin'
import type { AuthVkLoginResponse } from '@/features/AuthVkLogin/model/types/AuthVkLoginSchema'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import SendRoundedIcon from '@mui/icons-material/SendRounded'
import { Box, Button, Grid, Stack, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { useEditebleProfileCard } from '../api/editebleProfileCardApi'
import type { EditebleProfileCardResponse, EditebleProfileCardSchema } from '../model/EditebleProfileCard'

interface EditebleProfileDataProps {
  user: User
  isEdit: boolean
  setIsEdit: (isEdit: boolean) => void
}

const EditebleProfileData = ({ user, isEdit, setIsEdit }: EditebleProfileDataProps) => {
  const { handleSubmit, control, setError, clearErrors } = useForm<EditebleProfileCardSchema>({
    defaultValues: {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      middleName: user.middleName || '',
      phone: user.phone || '',
      tg: user.tg || '',
    },
  })

  const { vkLoginAndGetProfile, isLoading: isVkLoginLoading } = useVkLogin()
  const { handleUnlinkVk, isLoading: isUnlinkVkLoading } = useVkUnlink()
  const handleVkLogin = async () => {
    try {
      await vkLoginAndGetProfile()
    }
    catch (error) {
      const { errors } = error as AuthVkLoginResponse
      const { detail } = errors

      console.log(detail)
    }
  }

  const [editebleProfileCard, { isLoading: isEditebleProfileCardLoading }] = useEditebleProfileCard()
  const [getProfile] = useLazyGetProfile()

  const onSubmit = async (data: EditebleProfileCardSchema) => {
    console.log(data)

    try {
      clearErrors()

      await editebleProfileCard(data).unwrap()
      // await authConfirmChangeEmail(data).unwrap()
      await getProfile().unwrap()
      setIsEdit(false)
    }
    catch (err) {
      const { errors } = err as EditebleProfileCardResponse
      const { detail, ...fieldErrors } = errors
      if (detail) {
        // setFormError(Array.isArray(detail) ? detail[0] : detail)
      }

      Object.entries(fieldErrors).forEach(([field, message]) => {
        setError(field as keyof EditebleProfileCardSchema, { type: 'server', message })
      })
    }
  }

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      spacing={2}
    >
      <Grid container spacing={2}>
        <Grid size={3}>
          <Controller
            name="firstName"
            control={control}
            rules={{ required: 'Введите имя' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                color="secondary"
                variant="filled"
                label="Имя"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Grid>
        <Grid size={3}>
          <Controller
            name="lastName"
            control={control}
            rules={{ required: 'Введите фамилию' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                color="secondary"
                variant="filled"
                label="Фамилия"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Grid>
        <Grid size={3}>
          <Controller
            name="middleName"
            control={control}
            rules={{ required: 'Введите отчество' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                color="secondary"
                variant="filled"
                label="Отчество"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Grid>
        <Grid size={3}>
          <Controller
            name="phone"
            control={control}
            rules={{ required: 'Введите телефон' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                color="secondary"
                variant="filled"
                label="Телефон"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Grid>
        <Grid size={3}>
          <Controller
            name="tg"
            control={control}
            rules={{ required: 'Введите Telegram' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                color="secondary"
                variant="filled"
                label="Telegram"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Grid>
      </Grid>
      <Box>
        {
          user.vkId
            ? (
                <VkUnlinkButton
                  handleUnlinkVk={handleUnlinkVk}
                  title="Отвязать ВКонтакте"
                  disabled={isUnlinkVkLoading}
                />
              )
            : (
                <VkLoginButton
                  title="Связать с ВКонтакте"
                  handleVkLogin={handleVkLogin}
                  disabled={false}
                />
              )
        }
      </Box>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'end' }}>
        <Button variant="contained" color="secondary" onClick={() => setIsEdit(false)} endIcon={<CloseRoundedIcon />}>Отменить</Button>
        <Button variant="contained" color="primary" type="submit" endIcon={<SendRoundedIcon />}>Сохранить</Button>
      </Box>
    </Stack>
  )
}

export default EditebleProfileData
