import type { User } from '@/entities/Profile'
import { Grid } from '@mui/material'
import type { FC } from 'react'
import { fieldsToDisplay } from '../model/selectors/getfFeldsToDisplay'
import ProfileDataItem from './ProfileDataItem'

interface ProfileDataProps {
  user: User
}

const ProfileData: FC<ProfileDataProps> = ({ user }) => {
  return (
    <Grid container spacing={2}>
      {fieldsToDisplay.map(({ key, label, Icon }) => {
        const value = user[key as keyof User]

        return (
          <Grid size={3} key={key}>
            <ProfileDataItem label={label} value={value ? String(value) : '—'} Icon={Icon} />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default ProfileData
