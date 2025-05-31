import { useLazyGetProfile } from '@/entities/Profile'
import { ROUTES } from '@/shared/const/routes'
import { useNavigate } from 'react-router'
import { useAuthLogin } from '../../api/AuthLoginApi'
import type { AuthLoginSchema } from '../../model/types/AuthLoginSchema'

export const useLogin = (redirectTo?: keyof typeof ROUTES) => {
  const [login, { isLoading: isLoginLoading }] = useAuthLogin()
  const [getProfile, { isLoading: isProfileInitLoading }] = useLazyGetProfile()
  const navigate = useNavigate()

  const loginAndGetProfile = async (data: AuthLoginSchema) => {
    await login(data).unwrap()
    await getProfile().unwrap()
    navigate(redirectTo ?? ROUTES.HOME())
  }

  const isLoading = isLoginLoading || isProfileInitLoading

  return { loginAndGetProfile, isLoading }
}
