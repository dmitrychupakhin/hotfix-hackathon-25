import { Avatar, Box, Button, Stack, Typography } from '@mui/material'
import type { User } from '../model/types/User'
import CodeOffRoundedIcon from '@mui/icons-material/CodeOffRounded'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getProfileDataIsStaff, getProfileDataIsTeam } from '../model/selectors/getProfileData'

interface ProfileSmallCardItemProps {
  data: User
  isEdit: boolean
  handleRemove: (id: string) => void
}

const ProfileSmallCardItem = ({ data, isEdit, handleRemove }: ProfileSmallCardItemProps) => {
  const isStaff = useSelector(getProfileDataIsStaff)
  const isTeam = useSelector(getProfileDataIsTeam)

  const { t } = useTranslation()
  return (
    <Box sx={theme => ({
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: 3,
      p: 2,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
    })}
    >
      <Stack
        spacing={2}
        direction="row"
      >
        <Avatar src={data.photo} variant="rounded" sx={{ width: '90px', height: '90px', borderRadius: 3 }} />
        <Stack sx={{ width: '100%' }} spacing={1}>
          <Typography
            variant="body1"
            fontWeight={600}
            sx={theme => ({
              backgroundColor: 'primary.light',
              lineHeight: 2,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 1,
              color: theme.palette.mode === 'dark' ? theme.palette.invertedSecondary.dark : theme.palette.secondary.dark,
            })}
          >
            {
              isStaff && (
                <>
                  <CodeOffRoundedIcon />
                  {t('Тимлид')}
                </>
              )
            }
            {
              isTeam && (
                <>
                  <CodeOffRoundedIcon />
                  {t(data.role)}
                </>
              )
            }
          </Typography>
          <Typography variant="body1" fontWeight={600}>
            {data.lastName}
            {' '}
            {data.firstName}
            {' '}
            {data.middleName}
          </Typography>
        </Stack>
      </Stack>
      {isEdit && (
        <Stack direction="row" spacing={1}>
          <Button fullWidth variant="contained" color="secondary" size="small" endIcon={<DeleteForeverRoundedIcon />} onClick={() => handleRemove(data.id)}>
            {t('Удалить')}
          </Button>
          {
            isTeam && (
              <Button fullWidth variant="contained" color="primary" size="small" endIcon={<EditRoundedIcon />}>
                {t('Редактировать')}
              </Button>
            )
          }
        </Stack>
      )}
    </Box>
  )
}

export default ProfileSmallCardItem
