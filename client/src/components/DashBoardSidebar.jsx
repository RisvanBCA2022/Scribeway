import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { signOutSuccess } from "@/redux/user/userSlice";
import { CircleUserRound, LayoutDashboardIcon, LogOut, MessageCircleMore, Rss, Users } from "lucide-react";

const Sidebar = () => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [tab, setTab] = useState("");
  const location = useLocation(); // Hook to access the current URL
  const {currentUser}=useSelector((state)=>state.user)
  const dispatch = useDispatch();

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });

      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {}
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="w-full md:w-56 p-5 bg-slate-100 dark:bg-gray-900 md:min-h-screen lg:min-h-screen h-[100%]">
      <nav className="mt-10">
      {currentUser.isAdmin && (
           <Link
           to="/dashboard?tab=dashboard"
           className={`flex items-center px-4 py-2 mt-5 ${
             tab === "dashboard" ? "bg-gray-700 text-white" : "hover:bg-gray-600"
           } dark:text-gray-200 transition-colors duration-200 transform rounded-md`}
         >
           <LayoutDashboardIcon className="w-5 h-5" />
           <span className="mx-4 font-medium">Dashboard</span>
         </Link>
      )}
        <Link
          to="/dashboard?tab=profile"
          className={`flex items-center px-4 py-2 mt-5 ${
            tab === "profile" ? "bg-gray-700 text-white" : "hover:bg-gray-600"
          } dark:text-gray-200 transition-colors duration-200 transform rounded-md`}
        >
          <CircleUserRound className="w-5 h-5" />
          <span className="mx-4 font-medium">Profile</span>
        </Link>
        {currentUser.isAdmin && (
          <>
        <Link
          to="/dashboard?tab=posts"
          className={`flex items-center px-4 py-2 mt-5  ${
            tab === "posts" ? "bg-gray-700 text-white" : "hover:bg-gray-600"
          } dark:text-gray-200 transition-colors duration-200 transform rounded-md`}
        >
          <Rss className="w-5 h-5" />
          <span className="mx-4 font-medium">Posts</span>
        </Link>
        <Link
          to="/dashboard?tab=comments"
          className={`flex items-center px-4 py-2 mt-5  ${
            tab === "posts" ? "bg-gray-700 text-white" : "hover:bg-gray-600"
          } dark:text-gray-200 transition-colors duration-200 transform rounded-md`}
        >
          <MessageCircleMore className="w-5 h-5" />
          <span className="mx-4 font-medium">Comments</span>
        </Link>
          </>
        )}
             {currentUser.isAdmin && (
        <Link
          to="/dashboard?tab=users"
          className={`flex items-center px-4 py-2 mt-5  ${
            tab === "users" ? "bg-gray-700 text-white" : "hover:bg-gray-600"
          } dark:text-gray-200 transition-colors duration-200 transform rounded-md`}
        >
          <Users className="w-5 h-5" />
          <span className="mx-4 font-medium">Users</span>
        </Link>
        )}

        <div
          className="flex items-center px-4 py-2 mt-5 dark:text-gray-200 transition-colors duration-200 transform hover:bg-gray-600 rounded-md"
          href="#"
        >
          <LogOut className="w-5 h-5" />
          <span className="mx-4 font-medium" onClick={handleSignout}>
            Sign Out
          </span>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
