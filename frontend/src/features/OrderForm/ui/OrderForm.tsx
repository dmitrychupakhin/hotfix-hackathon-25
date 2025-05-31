import { Box, Button, Stack, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { useOrderForm } from '../api/orderFormApi'
import type { OrderFormSchema } from '../model/types/OrderFormSchema'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import SendRoundedIcon from '@mui/icons-material/SendRounded'

const OrderForm = () => {
  const [orderForm, { isLoading, error }] = useOrderForm()

  const { handleSubmit, control, setError, clearErrors } = useForm<OrderFormSchema>({
    defaultValues: {
      title: '',
      description: '',
    },
  })

  const onSubmit = (data: OrderFormSchema) => {
    try {
      orderForm(data).unwrap()
    }
    catch (error) {
      console.error(error)
    }
  }

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      spacing={2}
      sx={theme => ({
        display: 'flex',
        position: 'relative',
        width: '100%',
        height: '100%',
        maxHeight: '100%',
        p: 4,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: theme.shadows[1],
      })}
    >
      <Controller
        name="title"
        control={control}
        rules={{
          required: 'Введите тему проекта',
        }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            fullWidth
            variant="outlined"
            label="Тема проекта"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        rules={{
          required: 'Введите описание',
        }}
        render={({ field, fieldState }) => (
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <TextField
              {...field}
              multiline
              fullWidth
              variant="outlined"
              label="Задание"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              InputProps={{
                sx: { height: '100%', alignItems: 'start' },
              }}
              InputLabelProps={{ shrink: true }}
              sx={{ flex: 1 }}
            />
          </Box>
        )}
      />
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'end' }}>
        <Button variant="outlined" color="secondary" endIcon={<DeleteOutlineRoundedIcon />}>Очистить</Button>
        <Button variant="contained" color="secondary" endIcon={<SendRoundedIcon />} type="submit">Отправить</Button>
      </Box>
    </Stack>
  )
}

export default OrderForm
