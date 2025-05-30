import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { Button } from '@mui/material'
import { Link } from 'react-router'

const AuthSection = () => {
  return (
    <>
      <Button
        component={Link}
        to="/register"
        size="small"
        variant="contained"
        color="secondary"
      >
        Зарегистрироваться
      </Button>
      <Button
        component={Link}
        to="/login"
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
