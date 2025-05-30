import { createBrowserRouter, RouterProvider as RouterRouterProvider } from 'react-router'
import { routeConfig } from '../config/routeConfig'
import renderRouteWithWrapper from '../lib/renderRouteWithWrapper'

export const RouterProvider = () => {
  const routes = routeConfig.map(renderRouteWithWrapper)
  const router = createBrowserRouter(routes)

  return <RouterRouterProvider router={router} />
}

export default RouterProvider
