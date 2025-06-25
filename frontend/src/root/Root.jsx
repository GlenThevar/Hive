import { Outlet, useLocation, Navigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useAppContext } from "../context/AppProvider";

const Root = () => {
  const location = useLocation();
  const {LoggedIn} = useAppContext();

  // Define paths that should NOT have scrolling, including dynamic /chat/{anynumber} paths
  const noScrollRoutes = ["/chat"];

  const isChatRoute = /^\/chat\/\d+$/.test(location.pathname);
  const isScrollable = !(
    noScrollRoutes.includes(location.pathname) || isChatRoute
  );

  return (
    <div className="flex flex-col h-screen">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <div className="sm:w-12 md:w-20 lg:w-80">
          <Sidebar />
        </div>
        <div
          className={`flex-1 h-full ${
            isScrollable
              ? "overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
              : "overflow-hidden"
          }`}
        >
          <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default Root;
