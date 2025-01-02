// publicRoutes.ts
import { RouteConfig } from './types/routes'
import LoginPage from '../pages/LoginPage'
import ForgotPassword from '../pages/ForgotPassword'
import OTPVerification from '../features/auth/components/OTPVerification'
import ResetPassword from '../features/auth/components/ResetPassword'
import AuthenticateAccount from '../pages/AuthenticateAccount'
import NotFound from '../pages/NotFoundPage'

export const publicRoutes: RouteConfig[] = [
  {
    path: "/",
    element: <LoginPage />
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />
  },
  {
    path: "/otp-verification",
    element: <OTPVerification />
  },
  {
    path: "/reset-password",
    element: <ResetPassword />
  },
  {
    path: "/authenticate-account",
    element: <AuthenticateAccount />
  },
  {
    path: "*",
    element: <NotFound />
  }
]
