/** TAC SERVICE BOOKING APP HELP MODAL COMPONENT **/
/* This component represents the Help Modal that provides guidelines on using the service booking app. */

/* Importing the necessary dependencies */
import { closeHelpModal } from "../../redux/helpModalSlice";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";

const HelpModal = () => {
  /* Initializing Redux toolkit dispatch hook */
  const dispatch = useDispatch();

  /* Retrieving modal state from Redux toolkit store */
  const isHelpModalOpen = useSelector(
    (state) => state.helpModal.isHelpModalOpen
  );

  /* Function to close the help modal */
  const closeModal = () => {
    dispatch(closeHelpModal());
  };

  return (
    <section
      className={`modal-section${isHelpModalOpen ? "-visible" : "-hidden"}`}
    >
      <div className="help-modal-container">
        <div className="title-container">
          <h2 className="title">Help Menu</h2>
        </div>
        <span className="modal-close-btn">
          <CloseIcon className="icon close-icon" onClick={closeModal} />
        </span>
        <p>
          This app allows the service booking agent to schedule and track
          service bookings.
        </p>

        {/*Help Menu guidelines on how to initiate and schedule a service booking*/}
        <div className="title-container">
          <h4 className="help-modal-title">
            How to Schedule a Service Booking
          </h4>
        </div>
        <p>
          To schedule a new service booking in your app, follow these
          step-by-step guidelines:
        </p>
        <ol>
          <li>
            <strong>Initiate a New Booking:</strong> While on your Booking
            Dashboard, locate and click on the "Schedule Booking" option. This
            action will redirect you to the Schedule Booking Page.
          </li>
          <li>
            <strong>Provide Customer Details:</strong> On the Schedule Booking
            Page, you'll need to fill in essential customer details. These
            include the customer name, email address and contact number.
            Additionally, you'll need to fill in the customer's vehicle make,
            model and registration number.
          </li>
          <li>
            <strong>Select the Service Option:</strong> In the drop-down menu,
            select the specific service that needs to be delivered to the
            customer.
          </li>
          <li>
            <strong>Set Service Date and Time:</strong> Specify the date and
            time for the service appointment, that is the most convenient time
            for the customer.
          </li>
          <li>
            <strong>Additional Information:</strong> If there are any additional
            notes or special requirements related to the booking, include them
            in the designated section.
          </li>
          <li>
            <strong>Confirm Booking:</strong> After filling out all the required
            information, review your booking details to ensure accuracy. When
            you're satisfied with the information provided, click on the
            "CONFIRM BOOKING" button to confirm the booking.
          </li>
          <li>
            <strong>View Booking Confirmation:</strong> Once the booking is
            successfully scheduled, you will receive a confirmation message, and
            the new service booking will be reflected on your Booking Dashboard.
          </li>
          <li>
            <strong>Update Service Status:</strong> If applicable, update the
            service status to reflect the current progress as relayed by the
            maintenance team. (Refer to the Update Booking Section for detailed
            instructions on how to update a booking).
          </li>
        </ol>

        {/*Help Menu guidelines on how to update/edit an existing service booking*/}
        <div className="title-container">
          <h4 className="help-modal-title">How to Update a Service Booking</h4>
        </div>
        <p>
          To update an existing service booking, follow these step-by-step
          guidelines:
        </p>
        <ol>
          <li>
            <strong>Locate the Booking to Update:</strong> Scroll through your
            Booking Dashboard to find the specific booking you wish to update.
          </li>
          <li>
            <strong>Initiate Booking Update:</strong> In the booking display,
            navigate to the action items column for the booking you want to
            update. Click on the "Update" icon associated with the booking you
            want to update. This action will redirect you to the Update Booking
            Page.
          </li>
          <li>
            <strong>Review Pre-Populated Details:</strong> On the Update Booking
            Page, you'll find the existing booking details pre-populated for
            your reference.
          </li>
          <li>
            <strong>Update Service Status:</strong> Use the provided drop-down
            menu to modify the service status to reflect the current progress as
            relayed by the maintenance team.
          </li>
          <li>
            <strong>Update Customer Information:</strong> If needed, update the
            service status, customer's name, email address, and contact number.
            Additionally, modify the customer's vehicle make, model, and
            registration number, as required
          </li>
          <li>
            <strong>Update Service Details:</strong> If the service type needs
            to be changed, use the provided drop-down menu to select the
            appropriate service.
          </li>
          <li>
            <strong>Update Service Date and Time:</strong> Modify any changes to
            the service appointment date and time, ensuring it suits the
            customer's convenience.
          </li>
          <li>
            <strong>Additional Information:</strong> If there are any additional
            notes or special requirements related to the booking, include them
            in the designated section.
          </li>
          <li>
            <strong>Confirm Booking Update:</strong> After making the necessary
            updates, review the information to ensure accuracy. When you're
            satisfied with the information provided, click on the "UPDATE
            BOOKING" button to complete the booking update.
          </li>
          <li>
            <strong>View Updated Booking Confirmation:</strong> Once the booking
            is successfully updated, you will receive a confirmation message,
            and the updated service booking will be reflected on your Booking
            Dashboard.
          </li>
        </ol>

        {/*Help Menu guidelines on how to cancel a service booking*/}
        <div className="title-container">
          <h4 className="help-modal-title">How to Cancel a Service Booking</h4>
        </div>
        <p>
          To cancel a service booking, follow these step-by-step guidelines:
        </p>
        <ol>
          <li>
            <strong>Locate the Booking to Cancel:</strong> Scroll through your
            Booking Dashboard to find the specific booking you wish to cancel.
          </li>
          <li>
            <strong>Initiate Booking Cancellation:</strong> In the booking
            display, navigate to the action items column for the booking you
            want to cancel. Click on the "Cancel" icon associated with the
            booking you want to cancel.
          </li>
          <li>
            <strong>Confirmation Popup:</strong> Upon clicking the "Cancel"
            icon, a confirmation popup will appear with options:
            <ul>
              <li>
                <strong>Proceed with Cancellation:</strong> Click on "Proceed
                with Cancellation" to process the cancellation.
              </li>
              <li>
                <strong>Return to Dashboard:</strong> Click on "Return to
                Dashboard" to cancel the cancellation process and return to the
                Booking Dashboard.
              </li>
            </ul>
          </li>
          <li>
            <strong>View Booking Dashboard:</strong> Once the booking is
            successfully cancelled, you will receive a confirmation message, and
            the service booking will be removed from your Booking Dashboard.
          </li>
        </ol>

        {/*Help Menu guidelines on how to mark a service booking as complete*/}
        <div className="title-container">
          <h4 className="help-modal-title">
            How to Mark a Service Booking as Complete
          </h4>
        </div>
        <p>
          To mark a service booking as complete, follow these step-by-step
          guidelines:
        </p>
        <ol>
          <li>
            <strong>Locate the Booking to Mark as Complete:</strong> Scroll
            through your Booking Dashboard to find the specific booking you wish
            to mark as complete.
          </li>
          <li>
            <strong>Initiate Booking Completion:</strong> In the booking
            display, navigate to the action items column for the booking you
            want to mark as complete. Click on the "Complete" icon associated
            with the booking you want to mark as complete.
          </li>
          <li>
            <strong>View Booking Dashboard:</strong> Once the booking is
            successfully marked as completed, you will receive a confirmation
            message, and the service booking will be removed from your Booking
            Dashboard.
          </li>
        </ol>

        {/*Help Menu guidelines on how to search for a service booking*/}
        <div className="title-container">
          <h4 className="help-modal-title">
            How to Search for a Service Booking
          </h4>
        </div>
        <p>
          To quickly find a specific service booking, follow these guidelines:
        </p>
        <ol>
          <li>
            <strong>Locate the Search Bar:</strong> On the Booking Dashboard,
            locate the search bar at the top of the page.
          </li>
          <li>
            <strong>Enter Search Criteria:</strong> Type in relevant information
            such as Work Order No. into the search bar. Alternatively, you can
            paste the search query if you copied it from elsewhere.
          </li>
          <li>
            <strong>View Search Results:</strong> As you type or paste, the app
            will dynamically display matching results in real-time.
          </li>
        </ol>
      </div>
    </section>
  );
};

export default HelpModal;
