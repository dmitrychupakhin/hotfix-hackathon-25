import { useRemoveTeamlead } from '@/features/RemoveTeamlead/api/removeTeamleadApi'
import { profileApi, useGetTeamLeaders } from '../api/ProfileApi'
import ProfileSmallCardList from './ProfileSmallCardList'
import { useDispatch } from 'react-redux'

interface ProfileTeamLeadersProps {
  isEdit: boolean
  setIsEdit: (isEdit: boolean) => void
}

const ProfileTeamLeaders = ({ isEdit, setIsEdit }: ProfileTeamLeadersProps) => {
  const { data: teamLeaders } = useGetTeamLeaders()

  const [removeTeamlead] = useRemoveTeamlead()
  const dispatch = useDispatch()

  const handleRemoveTeamlead = (id: string) => {
    removeTeamlead({ id })
    dispatch(profileApi.util.invalidateTags(['TeamLeaders']))
  }

  return <ProfileSmallCardList data={teamLeaders || []} isEdit={isEdit} setIsEdit={setIsEdit} handleRemove={handleRemoveTeamlead} />
}

export default ProfileTeamLeaders
