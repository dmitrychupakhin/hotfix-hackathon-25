// import { getProfileData } from '@/entities/Profile'
import { ROUTES } from '@/shared/const/routes'
import type { ReactNode } from 'react'
import { Navigate } from 'react-router'

interface RedirectIfAuthProps {
  children: ReactNode
}

export const RedirectIfAuth = ({ children }: RedirectIfAuthProps) => {
  // const { data: user, isLoading, isUninitialized } = useSelector(getProfileData)
  const isLoading = false
  const isUninitialized = false
  const user = null

  if (isLoading || isUninitialized) return null
  if (user) return <Navigate to={ROUTES.MAIN()} replace />

  return children
}
