import { ProfileCard, type User } from '@/entities/Profile'
import EditebleProfileData from './EditebleProfileData'
import { useState } from 'react'
import ProfileLogo from '@/features/AuthChangePhoto/ui/ProflieLogo'

interface EditebleProfileCardProps {
  user: User
}

const EditebleProfileCard = ({ user }: EditebleProfileCardProps) => {
  if (!user) {
    return null
  }

  const [isEdit, setIsEdit] = useState(false)

  return <ProfileCard user={user} EditebleProfileLogo={<ProfileLogo user={user} />} isEdit={isEdit} setIsEdit={setIsEdit} EditebleProfileData={<EditebleProfileData user={user} isEdit={isEdit} setIsEdit={setIsEdit} />} />
}

export default EditebleProfileCard
