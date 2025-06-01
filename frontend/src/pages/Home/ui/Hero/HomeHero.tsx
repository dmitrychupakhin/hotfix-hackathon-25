import { Box, Button, Typography, useTheme, useMediaQuery } from '@mui/material'
import ImgCornerVector from '@/shared/assets/images/imgСornerVector.svg?react'
import ImgCornerVectorBlack from '@/shared/assets/images/imgCornerVectorBlack.svg?react'
import { AnimatePresence } from 'motion/react'
import { MotionBox } from '@/shared/ui/MotionBox'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { ROUTES } from '@/shared/const/routes'
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined'

const HomeHero = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const theme = useTheme()

  const isXs = useMediaQuery('(max-width:600px)')
  const hideStats = useMediaQuery('(max-width:490px)')

  const CornerImage =
    theme.palette.mode === 'dark' ? ImgCornerVectorBlack : ImgCornerVector

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <CornerImage
        style={{
          position: 'absolute',
          top: -1,
          left: 0,
          width: '650px',
          height: 'auto',
        }}
      />

      <AnimatePresence>
        {!hideStats && (
          <MotionBox
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 10 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: '650px',
              height: 'auto',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                zIndex: 2,
                p: 4,
                maxWidth: '100%',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 2,
                  rowGap: 1,
                  alignItems: 'center',
                }}
              >
                {[
                  { count: 5, label: t('Сотрудников') },
                  { count: 3, label: t('Проекта') },
                  { count: 0, label: t('Багов') },
                ].map(({ count, label }) => (
                  <Box
                    key={label}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      minWidth: '120px',
                    }}
                  >
                    <Box
                      sx={{
                        borderRadius: '50%',
                        backgroundColor: 'primary.main',
                        aspectRatio: 1,
                        height: '42px',
                        width: '42px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 600,
                        color:
                          theme.palette.mode === 'dark'
                            ? theme.palette.invertedSecondary.main
                            : theme.palette.secondary.main,
                      }}
                    >
                      {count}
                    </Box>
                    <Typography fontWeight={600}>{label}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
            <CornerImage style={{ transform: 'rotate(180deg)' }} />
          </MotionBox>
        )}
      </AnimatePresence>

      <Box
        sx={{
          maxWidth: '70%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: theme.typography.fontWeightMedium,
            color:
              theme.palette.mode === 'dark'
                ? theme.palette.secondary.dark
                : theme.palette.invertedSecondary.dark,
          }}
        >
          {t('SLOBODASOFT — превращаем идеи в цифровые решения')}
        </Typography>

        {!isXs && (
          <Typography
            variant="h4"
            sx={{
              fontWeight: theme.typography.fontWeightLight,
              color:
                theme.palette.mode === 'dark'
                  ? theme.palette.secondary.main
                  : theme.palette.invertedSecondary.main,
            }}
          >
            {t('IT не должен быть сложным. Просто начни — мы подскажем, что дальше.')}
          </Typography>
        )}

        <Button
          sx={{
            color:
              theme.palette.mode === 'dark'
                ? theme.palette.invertedSecondary.main
                : theme.palette.secondary.main,
          }}
          variant="contained"
          endIcon={<RocketLaunchOutlinedIcon />}
          onClick={() => navigate(ROUTES.PROFILE_ORDER())}
        >
          {t('Подать заявку')}
        </Button>
      </Box>
    </Box>
  )
}

export default HomeHero
