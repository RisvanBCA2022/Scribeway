import { CheckCheck,CheckIcon, CircleUserRound, Columns2, LogOut, X } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Sidebar = () => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
      <div className="w-full md:w-56 p-5 bg-slate-100 dark:bg-gray-900 md:min-h-screen lg:min-h-screen h-96">
        <nav className="mt-10">
          <Link
          to='/dashboard?tab=profile'
            className="flex items-center px-4 py-2 mt-5 dark:text-gray-200 transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600"
            href="#"
          >
            <CircleUserRound className="w-5 h-5" />
            <span className="mx-4 font-medium">Profile</span>
          </Link>
          <a
            className="flex items-center px-4 py-2 mt-5 dark:text-gray-200 transition-colors duration-200 transform hover:bg-gray-600 rounded-md"
            href="#"
          >
            <LogOut className="w-5 h-5" />
            <span className="mx-4 font-medium">Sign Out</span>
          </a>
        </nav>
      </div>
      
   
  );
};

export default Sidebar;
