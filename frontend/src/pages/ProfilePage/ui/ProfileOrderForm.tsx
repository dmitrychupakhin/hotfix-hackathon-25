import OrderForm from '@/features/OrderForm/ui/OrderForm'
import { Box, Grid, ListItemText, ListItem, Stack, Typography } from '@mui/material'
import { useProfileOrderFormTasks } from '../model/selectors/getProfileOrderFormTasks'
import { useTranslation } from 'react-i18next'

const ProfileOrderForm = () => {
  const { t } = useTranslation()
  const tasks = useProfileOrderFormTasks()
  return (
    <Stack spacing={2}>
      <Typography variant="h2" component="h1" textAlign="center" sx={{ px: 20 }}>
        {t('От черновика до ')}
        {' '}
        <Typography
          variant="h2"
          component="span"
          sx={theme => ({ backgroundColor: 'primary.light',
            color: theme.palette.mode === 'dark' ? theme.palette.invertedSecondary.dark : theme.palette.secondary.dark,
          })}
        >
          {t('готового продукта')}
        </Typography>
      </Typography>
      <Grid container spacing={2}>
        <Grid size={8}>
          <OrderForm />
        </Grid>
        <Grid size={4}>
          <Stack spacing={2}>
            <Box sx={theme => ({ backgroundColor: 'primary.main', height: '100%', p: 2, borderRadius: 3,
              color: theme.palette.mode === 'dark' ? theme.palette.invertedSecondary.dark : theme.palette.secondary.dark,
            })}
            >
              <Typography variant="body2" component="h2">{t('Ваша задача — дать нам чёткое техническое задание и быть на связи для согласований. Остальное — наша забота: дизайн, разработка, запуск. Мы на связи 24/7 и всегда готовы обсудить любые вопросы.')}</Typography>
            </Box>
            <Stack spacing={1} sx={{ backgroundColor: 'common.green', height: '100%', p: 2, borderRadius: 3, position: 'relative' }}>
              <Box
                sx={{
                  position: 'absolute',
                  top: 32,
                  bottom: 16,
                  left: 26,
                  width: '3px',
                  bgcolor: 'primary.main',
                  zIndex: 0,
                }}
              />
              {tasks.map((task, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemText
                    primary={(
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography
                          variant="body2"
                          component="span"
                          fontWeight={600}
                          sx={theme => ({
                            backgroundColor: 'primary.main',
                            p: 1,
                            borderRadius: '50%',
                            width: 24,
                            height: 24,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: theme.palette.mode === 'dark' ? theme.palette.invertedSecondary.dark : theme.palette.secondary.dark,
                          })}
                        >
                          {`${index + 1}`}
                        </Typography>
                        <Typography
                          variant="body2"
                          component="span"
                          fontWeight={500}
                          sx={theme => ({
                            color: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.invertedSecondary.main,
                            ml: 1,
                          })}
                        >
                          {`${task}`}
                        </Typography>
                      </Box>
                    )}
                  />
                </ListItem>
              ))}
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  )
}

export default ProfileOrderForm
