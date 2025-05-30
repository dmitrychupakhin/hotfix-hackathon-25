import { useLazyGetProfile } from '@/entities/Profile'
import { ROUTES } from '@/shared/const/routes'
import * as VKIDSDK from '@vkid/sdk'
import { useNavigate } from 'react-router'
import { useAuthVkLogin } from '../../api/AuthVkLoginApi'
import { vkidSdkExchangeCode } from '../utils/vkidSdkExchangeCode'

export const useVkLogin = () => {
  const [vkLogin, { isLoading: isVkLoginLoading }] = useAuthVkLogin()
  const [getProfile, { isLoading: isProfileInitLoading }] = useLazyGetProfile()
  const navigate = useNavigate()

  const vkLoginAndGetProfile = async (
    redirectTo?: ReturnType<(typeof ROUTES)[keyof typeof ROUTES]> | null,
  ) => {
    try {
      // @ts-ignore

      const { code, device_id } = await VKIDSDK.Auth.login()
      const vkExchangeCode = await vkidSdkExchangeCode(code, device_id)
      // @ts-ignore
      await vkLogin({ access_token: vkExchangeCode.access_token }).unwrap()
      await getProfile().unwrap()
      if (redirectTo) {
        navigate(redirectTo)
      }
    }
    catch (error) {
      console.error('Ошибка авторизации VK:', error)
      throw error
    }
  }

  const isLoading = isVkLoginLoading || isProfileInitLoading

  return { vkLoginAndGetProfile, isLoading }
}
