import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  MessageCircle,
  Mail,
  BarChart2,
  Cable,
  Activity,
  User,
  UsersRound,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Settings,
  MessageSquareText
} from 'lucide-react';

const NavItem: React.FC<{
  icon: React.ElementType;
  label: string;
  to: string;
  badge?: string;
  isCollapsed: boolean;
}> = ({ icon: Icon, label, to, badge, isCollapsed }) => (
  <NavLink
    to={to}
    className={({ isActive }) => `relative flex items-center px-4 py-2 text-dark-gray hover:bg-gray-100 mx-3 rounded-[8px] font-semibold ${isActive ? 'bg-white before:absolute before:left-[-13px] before:top-0 before:h-full before:w-1 before:bg-accent before:rounded-r-full border-[1px] border-gray-400' : ''}`}
  >
    <Icon className="size-[18px] shrink-0" />
    {!isCollapsed && <span className="flex-1 ml-3 text-sm">{label}</span>}
    {badge && !isCollapsed && (
      <span className="ml-auto rounded-md bg-gray/10 border-[.5px] border-gray-400 shadow-sm px-2 py-0.5 text-xs">
        {badge}
      </span>
    )}
  </NavLink>
);

const NavSection: React.FC<{
  title: string;
  items: Array<{ icon: React.ElementType; label: string; to: string; badge?: string }>;
  isCollapsed: boolean;
}> = ({ title, items, isCollapsed }) => (
  <div className="py-3 border-b border-gray-300">
    {!isCollapsed && <h2 className="px-4 mb-2 text-[13px] font-medium text-gray-blue">{title}</h2>}
    <nav className='relative'>
      {items.map((item) => (
        <NavItem key={item.label} {...item} isCollapsed={isCollapsed} />
      ))}
    </nav>
    {title === 'SETTINGS' && (
      <div className="flex items-center gap-3 p-2 mx-4 mt-2 border border-gray-300 rounded-[10px] bg-white">
        <div className="bg-gray-400 rounded-md size-8"></div>
        {!isCollapsed && (
          <div className="flex items-center justify-between flex-1">
            <span className='block'>Jhon Doe</span>
            <button className="">
              <LogOut className="text-accent size-5" />
            </button>
          </div>
        )}
      </div>
    )}
  </div>
);

const Sidebar: React.FC<{
  isMobileOpen: boolean;
  setIsMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isMobileOpen, setIsMobileOpen, isCollapsed, setIsCollapsed }) => {
  const mainMenuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', to: '/' },
    { icon: Package, label: 'Products', to: '/products' },
    { icon: ShoppingCart, label: 'Order', to: '/order' },
    { icon: Users, label: 'Customers', to: '/customers' },
    { icon: MessageCircle, label: 'Chat', to: '/chat', badge: '22' },
  ];

  const otherItems = [
    { icon: Mail, label: 'Email', to: '/email' },
    { icon: BarChart2, label: 'Analytics', to: '/analytics' },
    { icon: Cable, label: 'Integration', to: '/integration' },
    { icon: Activity, label: 'Performance', to: '/performance' },
  ];

  const accountItems = [
    { icon: User, label: 'Account', to: '/account' },
    { icon: UsersRound, label: 'Members', to: '/members' },
  ];

  const bottomItems = [
    { icon: Settings, label: 'Settings', to: '/settings' },
    { icon: MessageSquareText, label: 'Feedback', to: '/feedback' },
  ];

  return (
    <aside
      className={`inset-y-0 z-50 flex ${isCollapsed ? 'w-0 lg:w-20' : 'w-64 lg:w-64'} rounded-tr-[20px] rounded-br-[20px] flex-col transition-all duration-300 ease-in-out lg:relative lg:translate-x-0 ${isMobileOpen ? 'translate-x-0' : 'w-0 -translate-x-full'} lg:translate-x-0`}
    >
      <div className={`max-h-screen overflow-auto thin-scrollbar sticky top-0 left-0 w-full`}>
        <div className="flex border-[1px] border-gray-400 rounded-[12px] m-2 items-center justify-between border-b p-3 mx-4">
          {!isCollapsed && <span className="text-xl font-semibold">LOGO</span>}
          <button onClick={() => setIsCollapsed(!isCollapsed)} className="hidden lg:block">
            {isCollapsed ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
          </button>
          <button onClick={() => setIsMobileOpen(false)} className="lg:hidden">
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>
        <div className="">
          <NavSection title="MAIN MENU" items={mainMenuItems} isCollapsed={isCollapsed} />
          <NavSection title="OTHER" items={otherItems} isCollapsed={isCollapsed} />
          <NavSection title="ACCOUNT" items={accountItems} isCollapsed={isCollapsed} />
        </div>
        <div className="py-3">
          <NavSection title="SETTINGS" items={bottomItems} isCollapsed={isCollapsed} />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
