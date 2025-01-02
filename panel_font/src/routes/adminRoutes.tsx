import { RouteConfig } from './types/routes'
import AnalyticsDashboard from '../features/admin/components/AnalyticsDashboard'
import AdminProfilePage from '../pages/AdminProfilePage'
import Dashboard from '../pages/Dashboard'
import { Outlet } from 'react-router-dom'
import DiscoverPage from '@/pages/DiscoverPage'
import CardManager from '@/pages/CardManager'
import WebsiteDetails from '@/pages/WebsiteDetails'

{/* <Route path="/website/:title" element={<WebsiteDetails />} /> */}

export const adminRoutes: RouteConfig[] = [
  {
    path: "admin/dashboard",
    element: <Outlet />, // Changed to Outlet component
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: "analytics",
        element: <AnalyticsDashboard />
      },
      {
        path: "profile",
        element: <AdminProfilePage />
      },
      {
        path: "discover",
        element: <DiscoverPage />
      },
      {
        path: "web-account",
        element: <CardManager />
      },
      {
        path:"website/:title",
        element:<WebsiteDetails />
      },
      {
        path: ":name",
        element: <Dashboard />
      }
    ]
  }
]