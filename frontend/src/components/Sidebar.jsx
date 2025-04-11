/* eslint-disable */
import { Link, useLocation } from "react-router-dom";
import { menuItems } from "../data/sidebarMenuItem.js";
import { useActiveAccount } from "thirdweb/react";



const Sidebar = () => {
  const location = useLocation();
  const activeAccount = useActiveAccount();
  const _user = activeAccount?.address;

  return (
    <div
      className="bg-base-100 text-base-content h-full py-4 sm:pr-0  sm:pl-0 md:p-4 border-base-300 border-r-2
     w-12 md:w-20 lg:w-80 flex flex-col items-center"
    >
      <nav className="flex flex-col gap-1 p-2 w-full">
        {menuItems.map(
          ({ label, icon: Icon, filledIcon: FilledIcon, path }, index) => (
            <Link
              to={path == "/profile"? `/profile/${_user}`:path}
              key={index}
              className={`flex items-center p-3 rounded-lg cursor-pointer hover:bg-base-200 w-full
                      lg:justify-start justify-center hover:border-1 hover:border-base-300`}
            >
              <span className="lg:mr-4">
                {location.pathname === path ? <FilledIcon /> : <Icon />}
              </span>
              <p className="font-secondary font-medium hidden lg:block">
                {label}
              </p>
            </Link>
          )
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
