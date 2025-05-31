import { useGetTeam } from '../api/ProfileApi'
import ProfileSmallCardList from './ProfileSmallCardList'

interface ProfileTeamProps {
  isEdit: boolean
  setIsEdit: (isEdit: boolean) => void
}

const ProfileTeam = ({ isEdit, setIsEdit }: ProfileTeamProps) => {
  const { data: team } = useGetTeam()

  return <ProfileSmallCardList data={team || []} isEdit={isEdit} setIsEdit={setIsEdit} />
}

export default ProfileTeam
