import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import LandingPage from "./pages/LandingPage";
import CreateAccPage from "./pages/CreateAccPage";
import ScheduleBookingPage from "./pages/ScheduleBookingPage";
import UpdateBookingPage from "./pages/UpdateBookingPage";
import DashboardPage from "./pages/DashboardPage";
import AdminDashboardPage from "./pages/AdminDashboard";
import Notification from "./components/Notifications/Notification";
import TechnicianCreateAcc from "./components/auth-form-components/technicianregister";
import ServiceproCreateAcc from "./components/auth-form-components/serviceprovidercreate";
import AddVehicleForm from "./pages/customer/addvehicle";
import VehicleTable from "./components/vehicle/vehicletable";
import Navbar from "./components/navbar-components/Navbar";
import Footer from "./components/footer-components/Footer";
import Dashboardforuser from "./components/dashboard-components/new/dashboard";
import Vehiclepages from "./components/vehicle/vehiclepage";
import HomePage from "./pages/home";
import EmergencyBookingForm from "./components/booking-form-components/emergencybooking";
import CarInsuranceChecker from "./components/insurance/Carinsurence";

export default function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <br/>
        <Routes>
          {/* Public Routes */}
          {/* HomePage */}
          <Route path="/" element={<HomePage />} />
          <Route path="/create-account" element={<CreateAccPage />} />
          <Route path="/serviceprovider/create-account" element={<ServiceproCreateAcc />} />
          <Route path="/login" element={<LandingPage />} />

          {/* Customer Routes */}
          {user && (
            <>
              <Route path="/my-bookings" element={<DashboardPage />} />
              <Route path="/addvehicle" element={<AddVehicleForm />} />
              <Route path="/my-vehicles-list" element={<Vehiclepages />} />
              {/* Vehiclepages //my-vehicles-list */}
              <Route path="/my-vehicles" element={<VehicleTable />} />
              {/* EmergencyBookingForm */}
              <Route path="/emergencybooking/:id" element={<EmergencyBookingForm />} />
              <Route path="/schedule-booking/:id" element={<ScheduleBookingPage />} />
              <Route path="/update-booking/:id" element={<UpdateBookingPage />} />
              <Route path="/notification" element={<Notification />} />
              <Route path="/dashboard" element={<Dashboardforuser />} />
              {/* Dashboardforuser */}
            </>
          )}
{/* EmergencyBookings          Admin Routes */}
          {user && <Route path="/admin/dashboard" element={<AdminDashboardPage />} />}

          
          <Route path="/CarInsuranceChecker" element={<CarInsuranceChecker />} />
        </Routes>
        <Footer  />
      </BrowserRouter>
    </div>
  );
}
