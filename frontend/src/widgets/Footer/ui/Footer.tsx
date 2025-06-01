import { Box, Button, Divider, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import VkIcon from '@/shared/assets/icons/VK.svg?react'
import TelegramIcon from '@/shared/assets/icons/TG.svg?react'
import profileBackground from '@/shared/assets/images/profileBackground.png'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const isSmallScreen = useMediaQuery('(max-width:800px)')

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
      <Stack spacing={3} sx={{ px: 4, py: 3, backgroundColor: theme.palette.common.black }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
          <Typography
            variant="h2"
            sx={{
              color: theme.palette.mode === 'dark'
                ? theme.palette.secondary.dark
                : theme.palette.invertedSecondary.dark,
            }}
          >
            {t('Воплощайте свою идею в')}
            ,
            {' '}
            <br />
            {t('цифровую реальность!')}
          </Typography>
          <Box>
            <Button
              size="medium"
              endIcon={<ArrowUpwardIcon />}
              sx={{
                color: theme.palette.mode === 'dark'
                  ? theme.palette.invertedSecondary.dark
                  : theme.palette.secondary.dark,
              }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              {t('Вверх')}
            </Button>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Stack spacing={2}>
            <Typography
              sx={{
                color: theme.palette.mode === 'dark'
                  ? theme.palette.secondary.dark
                  : theme.palette.invertedSecondary.dark,
              }}
            >
              {t('Проект разработан командой “Слобода” в рамках учебной и ислледовательской')}
              <br />
              {t('деятельности. Этот проект — результат командной работы, экспериментов и')}
              <br />
              {t('желания сделать IT ближе к людям.')}
            </Typography>
            <Stack spacing={1}>
              <Typography
                variant="body1"
                fontWeight={600}
                sx={{
                  color: theme.palette.mode === 'dark'
                    ? theme.palette.secondary.dark
                    : theme.palette.invertedSecondary.dark,
                }}
              >
                {t('Наши контакты')}
              </Typography>
              <Stack direction="row" spacing={2}>
                <Box
                  sx={{
                    '&:hover': { transform: 'scale(1.1)', transition: 'transform 0.2s ease-in-out' },
                    '&:active': { transform: 'scale(0.9)', transition: 'transform 0.2s ease-in-out' },
                  }}
                >
                  <VkIcon width="32px" height="32px" cursor="pointer" />
                </Box>
                <Box
                  sx={{
                    '&:hover': { transform: 'scale(1.1)', transition: 'transform 0.2s ease-in-out' },
                    '&:active': { transform: 'scale(0.9)', transition: 'transform 0.2s ease-in-out' },
                  }}
                >
                  <TelegramIcon width="32px" height="32px" cursor="pointer" />
                </Box>
              </Stack>
            </Stack>
          </Stack>

          {/* Только для экранов шире 800px */}
          {!isSmallScreen && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}
            >
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
                  lineHeight: '100px',
                  textAlign: 'center',
                }}
              >
                {t('SLOBODA')}
                <br />
                {t('SOFT')}
              </Typography>
            </Box>
          )}
        </Box>

        <Divider sx={{ borderColor: theme.palette.primary.main }} />

        <Stack direction="row" spacing={4} flexWrap="wrap">
          <Typography
            variant="body2"
            fontWeight="600"
            sx={{
              color: theme.palette.mode === 'dark'
                ? theme.palette.secondary.dark
                : theme.palette.invertedSecondary.dark,
            }}
          >
            {t('© 2025 SLOBODA. Все права защищены')}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.mode === 'dark'
                ? theme.palette.secondary.dark
                : theme.palette.invertedSecondary.dark,
            }}
          >
            {t('Политика конфиденциальности')}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.mode === 'dark'
                ? theme.palette.secondary.dark
                : theme.palette.invertedSecondary.dark,
            }}
          >
            {t('Пользовательское соглашение')}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  )
}

export default Footer
