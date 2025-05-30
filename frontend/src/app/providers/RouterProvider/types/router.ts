import type { RouteObject } from 'react-router'

export interface AppRouteObject extends Omit<RouteObject, 'children'> {
  authOnly?: boolean
  redirectIfAuth?: boolean
  children?: AppRouteObject[]
  skeleton?: React.ReactNode
}
