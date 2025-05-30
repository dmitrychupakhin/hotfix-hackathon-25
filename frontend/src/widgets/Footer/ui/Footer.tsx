import { Box, Button, Divider, Stack, Typography, type SxProps } from '@mui/material'
import VkIcon from '@/shared/assets/icons/VK.svg?react'
import TelegramIcon from '@/shared/assets/icons/TG.svg?react'
import appBackground from '@/shared/assets/images/appBackground.jpg'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'

interface FooterProps {
  sx?: SxProps
}

const Footer = ({ sx }: FooterProps) => {
  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', ...sx }}>
      <Stack spacing={3} sx={theme => ({ px: 4, py: 3, backgroundColor: theme.palette.common.black })}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
          <Typography
            variant="h2"
            sx={theme => ({
              color: theme.palette.invertedSecondary.dark,
            })}
          >
            Выбирайте лучшее,
            {' '}
            <br />
            {' '}
            путешестуйте с комфортом
          </Typography>
          <Box>
            <Button size="medium" endIcon={<ArrowUpwardIcon />}>Вверх</Button>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
          <Stack spacing={2}>
            <Typography sx={theme => ({ color: theme.palette.invertedSecondary.dark })}>
              Проект разработан командой “Слобода” в рамках учебной и ислледовательской
              <br />
              деятельности. В общем всем спасибо, здесь еще куча чего можно написать и нужно
              <br />
              бы, но мне лень. Хочу спать, надоело это все!
            </Typography>
            <Stack spacing={1}>
              <Typography variant="body1" fontWeight={600} sx={theme => ({ color: theme.palette.invertedSecondary.dark })}>
                Наши контакты
              </Typography>
              <Stack direction="row" spacing={2}>
                <Box
                  sx={{
                    '&:hover': {
                      transform: 'scale(1.1)',
                      transition: 'transform 0.2s ease-in-out',
                    },
                    '&:active': {
                      transform: 'scale(0.9)',
                      transition: 'transform 0.2s ease-in-out',
                    },
                  }}
                >
                  <VkIcon width="32px" height="32px" cursor="pointer" />
                </Box>
                <Box
                  sx={{
                    '&:hover': {
                      transform: 'scale(1.1)',
                      transition: 'transform 0.2s ease-in-out',
                    },
                    '&:active': {
                      transform: 'scale(0.9)',
                      transition: 'transform 0.2s ease-in-out',
                    },
                  }}
                >
                  <TelegramIcon width="32px" height="32px" cursor="pointer" />
                </Box>
              </Stack>
            </Stack>
          </Stack>
          <Typography
            variant="h1"
            component="h2"
            fontSize="100px"
            sx={{
              backgroundImage: `url(${appBackground})`,
              backgroundSize: 'cover',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              fontWeight: 600,
              minHeight: '100px',
              display: 'inline-block',
              lineHeight: '100px',
            }}
          >
            SLOBODA <br /> SOFT
          </Typography>

        </Box>
        <Divider sx={theme => ({ borderColor: theme.palette.primary.main })} />
        <Stack direction="row" spacing={4}>
          <Typography
            variant="body2"
            fontWeight="600"
            sx={theme => ({ color: theme.palette.invertedSecondary.dark })}
          >
            © 2025 Эверест. Все права защищены
          </Typography>
          <Typography
            variant="body2"
            sx={theme => ({ color: theme.palette.invertedSecondary.dark })}
          >
            Политика конфиденциальности
          </Typography>
          <Typography
            variant="body2"
            sx={theme => ({ color: theme.palette.invertedSecondary.dark })}
          >
            Пользовательское соглашение
          </Typography>
        </Stack>
      </Stack>
    </Box>
  )
}

export default Footer
