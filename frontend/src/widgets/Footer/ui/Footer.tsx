import { Box, Button, Divider, Stack, Typography, type SxProps } from '@mui/material'
import VkIcon from '@/shared/assets/icons/VK.svg?react'
import TelegramIcon from '@/shared/assets/icons/TG.svg?react'
import profileBackground from '@/shared/assets/images/profileBackground.png'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { useTranslation } from 'react-i18next'

interface FooterProps {
  sx?: SxProps
}

const Footer = ({ sx }: FooterProps) => {
  const { t } = useTranslation()
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
            {t('Воплощайте свою идею в')},
            {' '}
            <br />
            {' '}
            {t('цифровую реальность!')}
          </Typography>
          <Box>
            <Button
              size="medium"
              endIcon={<ArrowUpwardIcon />}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              {t('Вверх')}
            </Button>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
          <Stack spacing={2}>
            <Typography sx={theme => ({ color: theme.palette.invertedSecondary.dark })}>
              {t('Проект разработан командой “Слобода” в рамках учебной и ислледовательской')}
              <br />
              {t('деятельности. Этот проект — результат командной работы, экспериментов и')}
              <br />
              {t('желания сделать IT ближе к людям.')}
            </Typography>
            <Stack spacing={1}>
              <Typography variant="body1" fontWeight={600} sx={theme => ({ color: theme.palette.invertedSecondary.dark })}>
                {t('Наши контакты')}
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
              backgroundImage: `url(${profileBackground})`,
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
            {t('SLOBODA')}
            {' '}
            <br />
            {' '}
            {t('SOFT')}
          </Typography>

        </Box>
        <Divider sx={theme => ({ borderColor: theme.palette.primary.main })} />
        <Stack direction="row" spacing={4}>
          <Typography
            variant="body2"
            fontWeight="600"
            sx={theme => ({ color: theme.palette.invertedSecondary.dark })}
          >
            {t('© 2025 SLOBODA. Все права защищены')}
          </Typography>
          <Typography
            variant="body2"
            sx={theme => ({ color: theme.palette.invertedSecondary.dark })}
          >
            {t('Политика конфиденциальности')}
          </Typography>
          <Typography
            variant="body2"
            sx={theme => ({ color: theme.palette.invertedSecondary.dark })}
          >
            {t('Пользовательское соглашение')}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  )
}

export default Footer
