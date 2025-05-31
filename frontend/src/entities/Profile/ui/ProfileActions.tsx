import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import { Box, Divider, Menu, MenuItem, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import KeyRoundedIcon from '@mui/icons-material/KeyRounded'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { ROUTES } from '@/shared/const/routes'

interface ProfileActionsProps {
  setIsEdit: (isEdit: boolean) => void
}

const ProfileActions = ({ setIsEdit }: ProfileActionsProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const goToEditProfile = () => {
    handleClose()
    setIsEdit(true)
  }

  const goToChangePassword = () => {
    handleClose()
    navigate(ROUTES.AUTH_CHANGE_PASSWORD())
  }

  const goToChangeEmail = () => {
    handleClose()
    navigate(ROUTES.AUTH_CHANGE_EMAIL())
  }

  return (
    <>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          cursor: 'pointer',
          borderRadius: 1,
          p: 1,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={handleClick}
        role="button"
        aria-label="Открыть меню действий"
        tabIndex={0}
      >
        <Box sx={{
          'cursor': 'pointer',
          'backgroundColor': 'primary.main',
          'borderRadius': 1,
          'p': 1,
          'display': 'inline-flex',
          'alignItems': 'center',
          'justifyContent': 'center',
          '&:hover': {
            backgroundColor: 'primary.main',
          },
        }}
        >
          <AccountCircleRoundedIcon />
        </Box>
        <Typography variant="body1" fontWeight={600}>Действия с аккаунтом</Typography>
        <KeyboardArrowDownIcon color="secondary" />
      </Stack>
      <Divider orientation="horizontal" flexItem />

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <MenuItem sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }} onClick={goToEditProfile}>
          Редактировать профиль
          <EditRoundedIcon />
        </MenuItem>
        <MenuItem sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }} onClick={goToChangePassword}>
          Сменить пароль
          <KeyRoundedIcon />
        </MenuItem>
        <MenuItem sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }} onClick={goToChangeEmail}>
          Сменить email
          <EmailRoundedIcon />
        </MenuItem>
      </Menu>
    </>
  )
}

export default ProfileActions
