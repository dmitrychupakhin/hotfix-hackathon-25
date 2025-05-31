import { useDispatch } from 'react-redux'
import { profileApi, useGetTeam } from '../api/ProfileApi'
import ProfileSmallCardList from './ProfileSmallCardList'
import { useRemoveTeammate } from '@/features/RemoveTeammate'

interface ProfileTeamProps {
  isEdit: boolean
  setIsEdit: (isEdit: boolean) => void
}

const ProfileTeam = ({ isEdit, setIsEdit }: ProfileTeamProps) => {
  const { data: team } = useGetTeam()

  const [removeTeammate] = useRemoveTeammate()
  const dispatch = useDispatch()

  const handleRemoveTeammate = (id: string) => {
    removeTeammate({ id })
    dispatch(profileApi.util.invalidateTags(['Team']))
  }

  return <ProfileSmallCardList data={team || []} isEdit={isEdit} setIsEdit={setIsEdit} handleRemove={handleRemoveTeammate} />
}

export default ProfileTeam
