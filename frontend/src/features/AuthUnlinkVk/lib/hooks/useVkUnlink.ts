import { useLazyGetProfile } from '@/entities/Profile'
// import { useNotification } from '@/shared/lib/hooks/useNotification'
import { useAuthUnlinkVk } from '../../api/authUnlinkVkApi'

export const useVkUnlink = () => {
  const [unlinkVk, { isLoading: isUnlinkVkLoading }] = useAuthUnlinkVk()
  const [getProfile, { isLoading: isProfileInitLoading }] = useLazyGetProfile()
  // const { showNotification } = useNotification()

  const handleUnlinkVk = async () => {
    try {
      await unlinkVk().unwrap()
      await getProfile().unwrap()
      // showNotification('Вы успешно отвязали VK', 'success')
    }
    catch (error) {
      // showNotification('Ошибка при отвязке VK', 'error')
    }
  }

  const isLoading = isUnlinkVkLoading || isProfileInitLoading

  return { handleUnlinkVk, isLoading }
}
