import { ROUTES } from '@/shared/const/routes'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { Box, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

const AuthSection = () => {
  const { t } = useTranslation()
  return (
    <Box sx={{ display: 'flex', gap: 1, p: 1 }}>
      <Button
        component={Link}
        to={ROUTES.AUTH_REGISTER()}
        size="small"
        variant="contained"
        color="secondary"
      >
         {t('Зарегистрироваться')}
      </Button>
      <Button
        component={Link}
        to={ROUTES.AUTH_LOGIN()}
        endIcon={<ExitToAppIcon />}
        size="small"
        variant="contained"
        color="primary"
      >
         {t('Войти')}
      </Button>
    </Box>
  )
}

export default AuthSection
