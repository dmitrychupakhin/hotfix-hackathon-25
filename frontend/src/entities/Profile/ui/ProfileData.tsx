import type { User } from '@/entities/Profile'
import { Box } from '@mui/material'
import type { FC } from 'react'
import { useFieldsToDisplay } from '../model/selectors/getfFeldsToDisplay'
import ProfileDataItem from './ProfileDataItem'

interface ProfileDataProps {
  user: User
}

const ProfileData: FC<ProfileDataProps> = ({ user }) => {
  const fields = useFieldsToDisplay()

  return (
    <Box
      sx={{
        display: 'grid',
        gap: 2,
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        width: '100%',
      }}
    >
      {fields.map(({ key, label, Icon }) => {
        const value = user[key as keyof User]
        return (
          <Box key={key}>
            <ProfileDataItem
              label={label}
              value={value ? String(value) : '—'}
              Icon={Icon}
            />
          </Box>
        )
      })}
    </Box>
  )
}

export default ProfileData
