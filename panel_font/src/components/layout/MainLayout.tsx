import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  LogOut,
  Menu,
} from 'lucide-react';
import Sidebar from './Sidebar'; // Import the new Sidebar component
import { Button } from "@/components/common/ui/button"
import { Bell } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/common/ui/popover"
import NotificationsCard from '../common/NotificationsCard/NotificationsCard';
import { useAuth } from '@/context/AuthContext';


const MainLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false)
  const { logout } = useAuth();
  return (
    <div className="flex min-h-screen bg-[#ececec56]">
      <Sidebar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />
      <div className="flex-1">
        <header className="flex  h-20 rounded-bl-[32px] ml-3 justify-between  items-center bg-light-gray px-4">
          <div>
          <button onClick={() => setIsMobileOpen(true)} className="mr-4 lg:hidden">
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold">Dashboard</h1>
          </div>
          <div className='flex justify-end'>
         
         
         
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative"
                aria-label="Open notifications"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-purple-500 text-[11px] text-white flex items-center justify-center">
                  4
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="end">
              <NotificationsCard />
            </PopoverContent>
          </Popover>
          <button
            onClick={() => {
              logout();
              
            }}
            className="w-full text-left px-4 py-2 text-sm text-error-light dark:text-error-dark hover:bg-error-light/10 dark:hover:bg-error-dark/10 flex items-center"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </button>
        
      
          </div>
        </header>
        <main className="m-4 bg-light-gray/40 p-4 rounded-[20px] min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;