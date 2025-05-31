// import type { User } from '@/entities/Profile/model/types/User'
import type { User } from '@/entities/Profile/model/types/User'
import useLogout from '@/features/AuthLogout/lib/hooks/useLogout'
import { ROUTES } from '@/shared/const/routes'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import { Avatar, ButtonBase, Menu, MenuItem, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

interface UserMenuProps {
  user: User
}

const UserMenu = ({ user }: UserMenuProps) => {
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()

  const { logout, isLoading: isLoggingOut } = useLogout()

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleProfileClick = () => {
    handleClose()
    navigate(ROUTES.PROFILE())
  }

  const handleChangeEmailClick = () => {
    handleClose()
    navigate(ROUTES.AUTH_CHANGE_EMAIL())
  }

  const handleChangePasswordClick = () => {
    handleClose()
    navigate(ROUTES.AUTH_CHANGE_PASSWORD())
  }

  const handleLogout = async () => {
    try {
      await logout()
      handleClose()
    }
    catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <>
      <ButtonBase onClick={handleOpen}>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={theme => ({
            backgroundColor: theme.palette.background.default,
            borderRadius: theme.shape.borderRadius * 5,
            p: 1,
          })}
        >
          <Avatar
            sx={theme => ({
              border: `2px solid ${theme.palette.primary.main}`,
              width: 42,
              height: 42,
            })}
            variant="circular"
            src={user.photo}
          />
          <Stack spacing={0} alignItems="start">
            <Typography fontWeight="600" variant="body2">
              {user.lastName}
              {' '}
              {user.firstName}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={theme => ({ color: theme.palette.secondary.light })}
            >
              {user.isStaff && 'Модератор' }
              {user.isTeam && 'Команда' }
              {!user.isStaff && 'Пользователь' }
            </Typography>
          </Stack>
          <KeyboardArrowDownIcon color="secondary" />
        </Stack>
      </ButtonBase>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ gap: 1 }} onClick={handleProfileClick}>
          <AccountCircleOutlinedIcon />
          <Typography>{t('Профиль')}</Typography>
        </MenuItem>
        <MenuItem sx={{ gap: 1 }} onClick={handleChangeEmailClick}>
          <EmailOutlinedIcon />
          <Typography>{t('Смена почты')}</Typography>
        </MenuItem>
        <MenuItem sx={{ gap: 1 }} onClick={handleChangePasswordClick}>
          <KeyOutlinedIcon />
          <Typography>{t('Смена пароля')}</Typography>
        </MenuItem>
        <MenuItem sx={{ gap: 1 }} onClick={handleLogout} disabled={isLoggingOut}>
          <LogoutOutlinedIcon color="error" />
          <Typography color="error">{t('Выйти')}</Typography>
        </MenuItem>
      </Menu>
    </>
  )
}

export default UserMenu
