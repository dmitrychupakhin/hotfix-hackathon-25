import { Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

const AuthBanner = () => {
  const { t } = useTranslation()
  return (
    <Stack spacing={2}>
      <Typography
        variant="h1"
        fontWeight={600}
        component="h2"
        sx={theme => ({
          color: theme.palette.invertedSecondary.dark,
        })}
      >
        {t('Здесь начинается путь от идеи к рабочему решению.')}
      </Typography>
    </Stack>
  )
}

export default AuthBanner
