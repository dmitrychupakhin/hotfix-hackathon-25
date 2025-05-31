import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import { PageWrapper } from '@/shared/ui/PageWrapper'
import QuoteIcon from '@/shared/assets/images/quotes.svg?react'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import StarIcon from '@/shared/assets/images/star.svg?react'
import notebookImage from '@/shared/assets/images/nootbook.svg'
import { MotionBox } from '@/shared/ui/MotionBox'
import { useTranslation } from 'react-i18next'

const HomeAbout = () => {
  const { t } = useTranslation()
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
              alignItems: 'stretch',
            }}
          >
            <Grid size={8}>
              <Stack spacing={2} p={3}>
                <Typography variant="h3" sx={theme => ({ color: theme.palette.invertedSecondary.dark, fontWeight: 600 })}>
                  <Typography component="span" variant="h3" sx={theme => ({ color: theme.palette.primary.main })}>
                    SlobodaSoft
                  </Typography>
                  {t('— превращаем')}
                  {' '}
                  <Typography component="span" variant="h3" sx={theme => ({ color: theme.palette.primary.main })}>
                    {t('IT-идеи')}
                  </Typography>
                  {' '}
                  {t('в')}
                  {' '}
                  <Typography component="span" variant="h3" sx={theme => ({ color: theme.palette.primary.main })}>{t('проекты')}</Typography>
                  {t(', которые реально работают.')}
                </Typography>
                <Typography variant="h4" sx={theme => ({ color: theme.palette.invertedSecondary.main, fontWeight: 400 })}>
                  <Typography component="span" variant="h4" sx={theme => ({ color: theme.palette.primary.main })}>
                    {t('Мы знаем, как сложно')}
                  </Typography>
                  {t(' бывает запустить IT-проект: с чего начать, сколько это займёт времени, каких людей подключить, какие технологии выбрать. Всё звучит сложно — и ')}
                  <Typography component="span" variant="h4" sx={theme => ({ color: theme.palette.primary.main })}>
                    {t('мы тут, чтобы это упростить.')}
                  </Typography>
                </Typography>
              </Stack>
            </Grid>
            <Grid size={4} sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MotionBox

                animate={{
                  rotate: [-1.5, 1.5, -1.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Box
                  component="img"
                  sx={{
                    height: 'auto',
                    maxHeight: '100%',
                    width: 'auto',
                    maxWidth: '100%',
                    borderRadius: 2,
                    objectFit: 'cover',
                    display: 'block',
                  }}
                  src={notebookImage}
                />
              </MotionBox>
            </Grid>
          </Grid>

        </Grid>
        <Grid
          size={6}
          sx={theme => ({
            backgroundColor: theme.palette.common.green,
            borderRadius: 3,
            p: 3,
            height: '100%',
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
                {t('Наш сервис — это не просто форма “оставьте заявку и мы перезвоним”')}
              </Typography>
              <QuoteIcon style={{
                width: 100,
                height: 80,

              }}
              />
            </Box>
            <Typography variant="h5" sx={theme => ({ color: theme.palette.invertedSecondary.main, fontWeight: 400 })}>
              {t('Мы на лету оцениваем вашу идею, подсказываем, сколько времени понадобится на реализацию, какой стек технологий выбрать, и кто из команды возьмется за реализацию прямо сейчас.')}
            </Typography>
            <Typography variant="h5" sx={theme => ({ color: theme.palette.invertedSecondary.main, fontWeight: 400 })}>
              {t('Наш сервис помогает не тратить недели на подготовку к разработке, а сразу двигаться к сути')}
            </Typography>
          </Box>
        </Grid>
        <Grid
          size={6}
          sx={theme => ({
            backgroundColor: theme.palette.primary.main,

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
          <Typography variant="h5">{t('Успешных проектов, которые мы создали по идеям наших заказчиков')}</Typography>
          <Box>
            <Button
              variant="contained"
              color="secondary"
              endIcon={<SendOutlinedIcon />}
            >
              {t('К проектам')}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </PageWrapper>
  )
}

export default HomeAbout
