// AppRoutes.tsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'
import { publicRoutes } from '../routes/publicRoutes'
import { adminRoutes } from '../routes/adminRoutes'
import { managerRoutes } from '../routes/managerRoutes'
import { useAuth } from '../context/AuthContext'

export default function AppRoutes() {
  const { user } = useAuth()
  const isAdmin = user?.role === "admin"
  const isManager = user?.role === "manager"

  return (
    <Routes>
      {/* Public Routes */}
      {publicRoutes.map((route) => (
        <Route 
          key={route.path} 
          path={route.path} 
          element={route.element} 
        />
      ))}

      {/* Protected Routes */}
      <Route element={<MainLayout />}>
        {isAdmin && adminRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element}>
            {route.children?.map((childRoute) => (
              <Route
                key={childRoute.path || 'index'}
                index={childRoute.index}
                path={childRoute.path}
                element={childRoute.element}
              />
            ))}
          </Route>
        ))}

        {isManager && managerRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element}>
            {route.children?.map((childRoute) => (
              <Route
                key={childRoute.path || 'index'}
                index={childRoute.index}
                path={childRoute.path}
                element={childRoute.element}
              />
            ))}
          </Route>
        ))}
      </Route>
    </Routes>
  )
}