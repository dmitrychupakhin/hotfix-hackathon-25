// import { getProfileData } from '@/entities/Profile'
import { ROUTES } from '@/shared/const/routes'
// import { useAppSelector } from '@/shared/lib/hooks/useAppSelector'
import type { ReactNode } from 'react'
import { Navigate } from 'react-router'

interface RequireAuthProps {
  children: ReactNode
}

export const RequireAuth = ({ children }: RequireAuthProps) => {
  // const { data: user, isLoading, isUninitialized } = useAppSelector(getProfileData)
  const isLoading = false
  const isUninitialized = false
  const user = null

  if (isLoading || isUninitialized) return null
  if (!user) return <Navigate to={ROUTES.AUTH_LOGIN()} replace />

  return children
}
