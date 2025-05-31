import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import { PageWrapper } from '@/shared/ui/PageWrapper'
import QuoteIcon from '@/shared/assets/images/quotes.svg?react'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import StarIcon from '@/shared/assets/images/star.svg?react'
import notebookImage from '@/shared/assets/images/notbook.png'

const HomeAbout = () => {
  return (
    <PageWrapper xPadding>
      <Grid
        container
        spacing={3}
      >
        <Grid
          size={12}
          sx={theme => ({
            backgroundColor: theme.palette.common.black,
            borderRadius: 3,
            gap: 2,
            display: 'flex',
          })}
        >
          <Grid
            spacing={3}
            container
            sx={{
              height: '350px',
              maxHeight: '350px',
              p: 3,
              alignItems: 'stretch',
            }}
          >
            <Grid size={8}>
              <Stack spacing={2}>
                <Typography variant="h3" sx={theme => ({ color: theme.palette.invertedSecondary.dark, fontWeight: 600 })}>
                  <Typography component="span" variant="h3" sx={theme => ({ color: theme.palette.primary.main })}>
                    SlobodaSoft
                  </Typography>
                  — превращаем
                  {' '}
                  <Typography component="span" variant="h3" sx={theme => ({ color: theme.palette.primary.main })}>
                    IT-идеи
                  </Typography>
                  {' '}
                  в
                  {' '}
                  <Typography component="span" variant="h3" sx={theme => ({ color: theme.palette.primary.main })}>проекты</Typography>
                  , которые реально работают.
                </Typography>
                <Typography variant="h4" sx={theme => ({ color: theme.palette.invertedSecondary.main, fontWeight: 400 })}>
                  Мы знаем, как сложно бывает запустить IT-проект: с чего начать, сколько это займёт времени, каких людей подключить, какие технологии выбрать. Всё звучит сложно — и мы тут, чтобы это упростить.
                </Typography>
              </Stack>
            </Grid>
            <Grid size={4} sx={{ height: '100%' }}>
              <Box
                component="img"
                sx={{
                  height: '100%',
                  width: '100%',
                  borderRadius: 2,
                  objectFit: 'cover',
                  display: 'block',
                }}
                src={notebookImage}
              />
            </Grid>
          </Grid>

        </Grid>
        <Grid
          size={6}
          sx={theme => ({
            backgroundColor: theme.palette.common.green,
            height: '350px',
            borderRadius: 3,
            p: 3,
          })}
        >
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
          }}
          >
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
            >
              <Typography
                variant="h2"
                sx={theme => ({
                  color: theme.palette.invertedSecondary.dark,
                  fontWeight: 600,
                })}
              >
                Про нашу нейросеть
              </Typography>
              <QuoteIcon style={{
                width: 42,
                height: 42,
              }}
              />
            </Box>
            <Typography variant="h5" sx={theme => ({ color: theme.palette.invertedSecondary.main, fontWeight: 400 })}>
              Данную модель разработал лучший студент всея матушки России - Сашка Пахомов Сашка Пахомов Сашка Пахомов Сашка Пахомов Сашка Пахомов . В разработку вкладывались любовь, дорбота и трепетное отношение к осуществлюяемому делу. Сашка породил сие творение на свет для благих дел.
            </Typography>
          </Box>
        </Grid>
        <Grid
          size={6}
          sx={theme => ({
            backgroundColor: theme.palette.primary.main,
            height: '350px',
            borderRadius: 3,
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            gap: 2,
          })}
        >
          <Box sx={{
            'position': 'absolute',
            'right': 0,
            'bottom': 0,
            'p': 2,
            'animation': 'rotate 4s linear infinite',
            'transformOrigin': 'center',
            '@keyframes rotate': {
              '0%': {
                transform: 'rotate(0deg)',
              },
              '100%': {
                transform: 'rotate(360deg)',
              },
            },
          }}
          >
            <StarIcon style={{ width: '48px', height: '48px' }} />
          </Box>
          <Typography variant="h1" component="h2">+10</Typography>
          <Typography variant="h5">Интересных мест, которые вы можетет найти в “Инетересном”</Typography>
          <Box>
            <Button
              variant="contained"
              color="secondary"
              endIcon={<SendOutlinedIcon />}
            >
              В интересное
            </Button>
          </Box>
        </Grid>
      </Grid>
    </PageWrapper>
  )
}

export default HomeAbout
