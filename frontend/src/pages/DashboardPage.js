/** TAC SERVICE BOOKING APP DASHBOARD PAGE **/

import Navbar from "../components/navbar-components/Navbar";
// import DashBoard from "../components/dashboard-components/Dashboard";

import HelpModal from "../components/modal-components/HelpModal";
import DeleteConfirmModal from "../components/modal-components/DeleteConfirmModal";
import UserDashboard from "../components/dashboard-components/Dashboard";

const DashboardPage = () => {
  return (
    <div className="app-page">
      {/* <Navbar /> */}
      <UserDashboard />
      <HelpModal />
      <DeleteConfirmModal />
  
    </div>
  );
};

export default DashboardPage;
