import { getProfileData } from '@/entities/Profile'
import EditebleProfileCard from '@/features/EditebleProfileCard/ui/EditebleProfileCard'
import { useSelector } from 'react-redux'

const ProfileCard = () => {
  const { data: user, isLoading, isUninitialized } = useSelector(getProfileData)
  if (!user) {
    return null
  }
  return <EditebleProfileCard user={user} />
}

export default ProfileCard
