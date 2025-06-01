import { Suspense } from 'react'
import type { RouteObject } from 'react-router'
import { GlobalLoader } from '@/shared/lib/components/GlobalLoader'
import type { AppRouteObject } from '../types/router'
import { RequireAuth } from '../ui/RequireAuth'
import { RedirectIfAuth } from '../ui/RedirectIfAuth'

const wrapComponent = (
  node: React.ReactNode,
  {
    authOnly,
    redirectIfAuth,
    skeleton,
  }: Pick<AppRouteObject, 'authOnly' | 'redirectIfAuth' | 'skeleton'>,
) => {
  const withSuspense = <Suspense fallback={skeleton || <GlobalLoader />}>{node}</Suspense>
  const withAuth = authOnly ? <RequireAuth>{withSuspense}</RequireAuth> : withSuspense
  return redirectIfAuth ? <RedirectIfAuth>{withAuth}</RedirectIfAuth> : withAuth
}

const renderRouteWithWrapper = (route: AppRouteObject): RouteObject => {
  const { authOnly, redirectIfAuth, Component, element, children, index, skeleton, ...rest }
    = route

  if (Component) {
    return {
      ...rest,
      Component: () => wrapComponent(<Component />, { authOnly, redirectIfAuth, skeleton }),
      children: children?.map(renderRouteWithWrapper),
    }
  }

  const ElementWrapper = () => element
  const WrappedElement = () =>
    wrapComponent(<ElementWrapper />, { authOnly, redirectIfAuth, skeleton })

  return {
    ...rest,
    ...(index
      ? { index, Component: WrappedElement }
      : { Component: WrappedElement, children: children?.map(renderRouteWithWrapper) }),
  }
}

export default renderRouteWithWrapper
