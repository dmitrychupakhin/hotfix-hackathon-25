import { Grid } from '@mui/material'
import type { User } from '../model/types/User'
import ProfileSmallCardItem from './ProfileSmallCardItem'

interface ProfileSmallCardListProps {
  data: User[]
  isEdit: boolean
  setIsEdit: (isEdit: boolean) => void
  handleRemove: (id: string) => void
}

const ProfileSmallCardList = ({ data, isEdit, handleRemove }: ProfileSmallCardListProps) => {
  return (
    <Grid container spacing={2}>
      {data.map(item => (
        <Grid size={4}>
          <ProfileSmallCardItem data={item} isEdit={isEdit} handleRemove={handleRemove} />
        </Grid>
      ))}
    </Grid>
  )
}

export default ProfileSmallCardList
