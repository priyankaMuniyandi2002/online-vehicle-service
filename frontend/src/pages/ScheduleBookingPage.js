/** TAC SERVICE BOOKING APP SCHEDULE BOOKING PAGE **/

import Navbar from "../components/navbar-components/Navbar";
import ScheduleBookingForm from "../components/booking-form-components/ScheduleBookingForm";
import Footer from "../components/footer-components/Footer";
import HelpModal from "../components/modal-components/HelpModal";

const ScheduleBookingPage = () => {
  return (
    <div className="app-page">
   
      <ScheduleBookingForm />
      <HelpModal />
    
    </div>
  );
};

export default ScheduleBookingPage;
