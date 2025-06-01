import { type User } from '@/entities/Profile'
import backgroundLight from '@/shared/assets/images/profileBackground.png'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material'
import ProfileActions from './ProfileActions'
import ProfileData from './ProfileData'
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded'
import ProfileTeamLeaders from './ProfileTeamLeaders'
import { useState } from 'react'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import AddTeamleadModal from '@/features/AddTeamlead/ui/AddTeamleadModal'
import ProfileTeam from './ProfileTeam'
import AddTeammateModal from '@/features/AddTeammate/ui/AddTeammateModal'
import { useTranslation } from 'react-i18next'

interface ProfileCardProps {
  user: User
  isEdit: boolean
  setIsEdit: (isEdit: boolean) => void
  EditebleProfileData: React.ReactNode
  EditebleProfileLogo: React.ReactNode
}

const ProfileCard = ({ user, EditebleProfileData, isEdit, setIsEdit, EditebleProfileLogo }: ProfileCardProps) => {
  const { t } = useTranslation()
  const [isEditTeamLeaders, setIsEditTeamLeaders] = useState(false)
  const [addTeamleadOpen, setAddTeamleadOpen] = useState(false)
  const [addTeammateOpen, setAddTeammateOpen] = useState(false)
  return (
    <Grid
      container
      sx={({
        width: '100%',
        height: '100%',
        backgroundImage: `url(${backgroundLight})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
        borderRadius: 3,
      })}
    >
      <Grid size={12} sx={{ px: 4 }}>
        {EditebleProfileLogo}
      </Grid>
      <Grid
        size={12}
        sx={theme => ({
          backgroundColor: theme.palette.background.paper,
          borderRadius: 3,
          boxShadow: theme.shadows[1],
        })}
      >
        <Box sx={{ px: 4, py: 2, marginLeft: '150px', display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ pl: 4 }}>
            <Typography variant="h5" fontWeight={400} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {user?.firstName}
              {' '}
              {user?.lastName}
              {' '}
              {user?.middleName}
            </Typography>
            <Typography
              variant="body2"
              sx={theme => ({ color: theme.palette.secondary.light })}
            >
              {user.isStaff
                ? t('Модератор')
                : user.isTeam
                  ? t('Команда')
                  : t('Пользователь')}
            </Typography>
          </Box>
          <Box>
            {!isEdit && <ProfileActions setIsEdit={setIsEdit} />}
          </Box>
        </Box>
        <Typography variant="h6" fontWeight={600} sx={{ px: 4, py: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <AccountCircleRoundedIcon />
          {t('Личная информация')}
        </Typography>
        <Divider />
        <Box sx={{ p: 4 }}>
          {!isEdit && (user && <ProfileData user={user} />)}
          {isEdit && (user && EditebleProfileData)}
        </Box>
        {user.isStaff && (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 4, py: 2 }}>
              <Typography variant="h6" fontWeight={600} sx={{ px: 4, py: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <PeopleAltRoundedIcon />
                {t('Тимлиды команд')}
              </Typography>
              <Stack direction="row" spacing={1}>
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={() => setIsEditTeamLeaders(!isEditTeamLeaders)}
                  endIcon={<EditRoundedIcon />}
                >
                  {isEditTeamLeaders ? t('Закрыть') : t('Редактировать')}
                </Button>
                <Button variant="contained" color="primary" size="small" endIcon={<AddRoundedIcon />} onClick={() => setAddTeamleadOpen(true)}>
                  {t('Добавить')}
                </Button>
              </Stack>
            </Box>
            <Divider />
            <Box sx={{ p: 4 }}>
              <ProfileTeamLeaders isEdit={isEditTeamLeaders} setIsEdit={setIsEditTeamLeaders} />
            </Box>
          </>
        )}
        {
          user.isTeam && (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 4, py: 2 }}>
                <Typography variant="h6" fontWeight={600} sx={{ px: 4, py: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PeopleAltRoundedIcon />
                  {t('Состав команды')}
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    onClick={() => setIsEditTeamLeaders(!isEditTeamLeaders)}
                    endIcon={<EditRoundedIcon />}
                  >
                    {isEditTeamLeaders ? t('Закрыть') : t('Редактировать')}
                  </Button>
                  <Button variant="contained" color="primary" size="small" endIcon={<AddRoundedIcon />} onClick={() => setAddTeammateOpen(true)}>
                    {t('Добавить')}
                  </Button>
                </Stack>
              </Box>
              <Divider />
              <Box sx={{ p: 4 }}>
                <ProfileTeam isEdit={isEditTeamLeaders} setIsEdit={setIsEditTeamLeaders} />
              </Box>
            </>
          )
        }
      </Grid>
      <AddTeamleadModal
        open={addTeamleadOpen}
        handleClose={() => {
          setAddTeamleadOpen(false)
        }}
      />
      <AddTeammateModal
        open={addTeammateOpen}
        handleClose={() => {
          setAddTeammateOpen(false)
        }}
      />
    </Grid>
  )
}

export default ProfileCard
