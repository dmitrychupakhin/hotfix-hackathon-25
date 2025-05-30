import { ROUTES } from '@/shared/const/routes'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { Button } from '@mui/material'
import { Link } from 'react-router'

const AuthSection = () => {
  return (
    <>
      <Button
        component={Link}
        to={ROUTES.AUTH_REGISTER()}
        size="small"
        variant="contained"
        color="secondary"
      >
        Зарегистрироваться
      </Button>
      <Button
        component={Link}
        to={ROUTES.AUTH_LOGIN()}
        endIcon={<ExitToAppIcon />}
        size="small"
        variant="contained"
        color="primary"
      >
        Войти
      </Button>
    </>
  )
}

export default AuthSection
