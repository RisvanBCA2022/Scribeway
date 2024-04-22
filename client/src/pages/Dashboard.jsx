import DashBoardProfile from "@/components/DashBoardProfile";
import DashBoardSidebar from "@/components/DashBoardSidebar";
import DashboardAnalytics from "@/components/DashboardAnalytics";
import DashboardComments from "@/components/DashboardComments";
import DashboardPosts from "@/components/DashboardPosts";
import Dashboardusers from "@/components/Dashboardusers";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    setTab(tabFromUrl || "");
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col sm:flex-row ">
      <div className="md:w-56">
        <DashBoardSidebar />
      </div>
      {tab === "profile" && <DashBoardProfile />}

      {tab === "posts" && <DashboardPosts />}

      {tab === "users" && <Dashboardusers />}

      {tab === "comments" && <DashboardComments />}

      {tab === "dashboard" && <DashboardAnalytics />}

    </div>
  );
};

export default Dashboard;
