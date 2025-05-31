import { getProfileData } from '@/entities/Profile'
import { useEffect } from 'react'
import useLogout from '../lib/hooks/useLogout'
import { getIsLoggedOut } from '../model/selectors/getIsLoggedOut'
import { setIsLoggedOut } from '../model/slice/logoutSlice'
import { useDispatch, useSelector } from 'react-redux'

export const LogoutWatcher = () => {
  const dispatch = useDispatch()
  const isLoggedOut = useSelector(getIsLoggedOut)
  const { logout } = useLogout()
  const { data: isDataInitialized } = useSelector(getProfileData)

  useEffect(() => {
    if (isLoggedOut) {
      dispatch(setIsLoggedOut(false))
    }

    if (isLoggedOut && isDataInitialized) {
      logout()
      dispatch(setIsLoggedOut(false))
    }
  }, [isLoggedOut, logout, dispatch, isDataInitialized])

  return null
}
