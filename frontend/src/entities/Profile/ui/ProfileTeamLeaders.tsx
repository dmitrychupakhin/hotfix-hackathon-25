import { useGetTeamLeaders } from '../api/ProfileApi'
import ProfileSmallCardList from './ProfileSmallCardList'

interface ProfileTeamLeadersProps {
  isEdit: boolean
  setIsEdit: (isEdit: boolean) => void
}

const ProfileTeamLeaders = ({ isEdit, setIsEdit }: ProfileTeamLeadersProps) => {
  const { data: teamLeaders } = useGetTeamLeaders()

  return <ProfileSmallCardList data={teamLeaders || []} isEdit={isEdit} setIsEdit={setIsEdit} />
}

export default ProfileTeamLeaders
