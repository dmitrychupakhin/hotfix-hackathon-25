import { useLazyGetProfile } from '@/entities/Profile/api/ProfileApi'
import type { User } from '@/entities/Profile/model/types/User'
import { useAuthChangePhoto } from '@/features/AuthChangePhoto/api/authChangePhotoApi'
// import { useNotification } from '@/shared/lib/hooks/useNotification'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import { Avatar, Box, Stack, Typography } from '@mui/material'
import type { ChangeEvent, FC } from 'react'
import { useRef, useState } from 'react'

export interface ProfileLogoProps {
  user: User
}

const ProfileLogo: FC<ProfileLogoProps> = ({ user }) => {
  const [getProfile] = useLazyGetProfile()
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [, setIsHovered] = useState(false)
  const [authChangePhoto] = useAuthChangePhoto()
  //   const { showNotification } = useNotification()

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('photo', file)

    try {
      await authChangePhoto(formData).unwrap()
      await getProfile().unwrap()
    //   showNotification('Фото успешно обновлено', 'success')
    }
    catch (error) {
    //   showNotification('Ошибка при загрузке фото', 'error')
    }
  }

  return (
    <Stack gap={1}>
      <Box
        sx={{
          'position': 'relative',
          'transform': 'translateY(50%)',
          'width': '100%',
          'maxWidth': '150px',
          'height': 'auto',
          'borderRadius': '50%',
          'overflow': 'hidden',
          'aspectRatio': '1 / 1',
          'cursor': 'pointer',
          '&:hover .overlay': {
            opacity: 1,
          },
        }}
        onClick={handleAvatarClick}
      >
        <Avatar
          src={user?.photo}
          sx={{
            width: '100%',
            height: '100%',
            aspectRatio: '1 / 1',
          }}
        />
        <Box
          className="overlay"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            color: '#fff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: 0,
            transition: 'opacity 0.3s',
          }}
        >
          <CameraAltIcon fontSize="large" />
        </Box>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </Box>

    </Stack>
  )
}

export default ProfileLogo
