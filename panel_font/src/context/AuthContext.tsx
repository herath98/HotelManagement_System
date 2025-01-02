import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { User } from '../types/auth';
import Cookies from 'js-cookie';
import useFetch from '../hooks/useFetch';
import AdvancedLoading from '../components/common/loading/AdvancedLoading';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  logout: () => void;
  isLoading: boolean;
  updateUser: (userData: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const isMountedRef = useRef(false);

  const accessToken = Cookies.get('accessToken');

  const { data, loading, error, responseCode, fetchData } = useFetch('/user/check', {
    method: 'GET',
    accessToken,
    silent: true,
  });

  const updateUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    Cookies.remove('accessToken');
    setUser(null);
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const redirectToDashboard = (userRole: string) => {
    if (userRole === "admin") {
      window.location.href = '/admin/dashboard';
    } else if (userRole === "manager") {
      window.location.href = '/manager/category';
    }
  };

  console.log(user);

  // Authentication check and route protection
  useEffect(() => {
    const publicRoutes = [
      '/signup',
      '/forget-password',
      '/reset-password',
      '/access',
      '/account/activate/:id/:code',
    ];

    const isPublicRoute = publicRoutes.some(route => {
      if (route.includes(':')) {
        const baseRoute = route.split('/:')[0];
        return location.pathname.startsWith(baseRoute);
      }
      return route === location.pathname;
    });

    // Special handling for root path
    if (location.pathname === '/' && accessToken && user) {
      redirectToDashboard(user.role as string);
      return;
    }

    // Handle other routes
    if (!accessToken && !isPublicRoute && location.pathname !== '/') {
      window.location.href = '/';
    } else if (!isMountedRef.current && accessToken) {
      fetchData();
      isMountedRef.current = true;
    } else {
      setIsCheckingAuth(false);
    }
  }, [accessToken, user, location.pathname]);

  useEffect(() => {
    if (data) {
      if (String(responseCode) === '401' || String(responseCode) === '403' || data.status === false) {
        Cookies.remove('accessToken');
        setUser(null);
        window.location.href = '/';
      } else if (data.status === true || data.code === 200) {
        const userData = data.data;
        updateUser(userData);
        
        // Redirect from root or login path to appropriate dashboard
        if (location.pathname === '/' || location.pathname === '/login') {
          redirectToDashboard(userData.role);
        }
      }
    } else if (error) {
      Cookies.remove('accessToken');
      setUser(null);
      window.location.href = '/';
    }
    setIsCheckingAuth(false);
  }, [data, error, responseCode]);
  

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        logout,
        isLoading: isCheckingAuth || loading,
        updateUser
      }}
    >
      {isCheckingAuth ? (
        <div className="flex items-center justify-center min-h-screen">
          <AdvancedLoading size="lg" />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}