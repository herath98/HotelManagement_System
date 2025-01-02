import { RouteConfig } from './types/routes'
import Dashboard from '../pages/Dashboard'
import { Outlet } from 'react-router-dom'

export const managerRoutes: RouteConfig[] = [
  {
    path: "dashboard",
    element: <Outlet />,  // Added element here
    children: [
      {
        index: true,
        element: <Dashboard />
      }
    ]
  }
]