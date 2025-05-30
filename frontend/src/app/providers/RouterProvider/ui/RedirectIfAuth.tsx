// import { getProfileData } from '@/entities/Profile'
import { getProfileData } from '@/entities/Profile'
import { ROUTES } from '@/shared/const/routes'
import type { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

interface RedirectIfAuthProps {
  children: ReactNode
}

export const RedirectIfAuth = ({ children }: RedirectIfAuthProps) => {
  const { data: user, isLoading, isUninitialized } = useSelector(getProfileData)

  if (isLoading || isUninitialized) return null
  if (user) return <Navigate to={ROUTES.HOME()} replace />

  return children
}
