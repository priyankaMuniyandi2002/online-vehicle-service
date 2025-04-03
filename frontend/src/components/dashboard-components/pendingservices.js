import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchBookings } from "../../redux/bookingsSlice";
import { openHelpModal } from "../../redux/helpModalSlice";
import { useAuthContext } from "../../hooks/useAuthContext";
import { toast } from "react-toastify";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tooltip, IconButton, TextField, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faInfoCircle, faFilePdf, faFileExcel } from "@fortawesome/free-solid-svg-icons";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";

const Pendingservices = () => {
  const { user } = useAuthContext();
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.bookings.bookingsList);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const response = await fetch("/api/bookings/all", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const json = await response.json();
        if (response.ok) {
          dispatch(fetchBookings(json.bookings));
        }
      };
      fetchData();
    }
  }, [user, dispatch]);

  const filteredBookings = bookings.filter(booking=>booking.status=="IN-PROGRESS").filter((booking) =>
    Object.values(booking).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      ));

  

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Booking List", 20, 10);
  
    let yPos = 20;
    const cardHeight = 40; // Height of each card
    const cardWidth = 180; // Width of the card
    const startX = 15; // Start X position
    const gap = 10; // Space between cards
  
    filteredBookings.forEach((booking, index) => {
      yPos += gap; // Space between cards
  
      // Draw card border
      doc.rect(startX, yPos, cardWidth, cardHeight);
  
      // Booking details inside the card
      doc.setFontSize(10);
      doc.text(`ID: ${booking._id}`, startX + 5, yPos + 7);
      doc.text(`Status: ${booking.status}`, startX + 5, yPos + 14);
      doc.text(`Customer: ${booking.customerFirstName} ${booking.customerLastName}`, startX + 5, yPos + 21);
      doc.text(`Email: ${booking.customerEmail}`, startX + 5, yPos + 28);
      doc.text(`Contact: ${booking.customerContactNumber}`, startX + 5, yPos + 35);
      doc.text(`Vehicle: ${booking.vehicleMake} ${booking.vehicleModel}`, startX + 100, yPos + 14);
      doc.text(`Service: ${booking.serviceOption}`, startX + 100, yPos + 21);
      doc.text(`Date: ${booking.bookingDate}`, startX + 100, yPos + 28);
  
      yPos += cardHeight; // Move to next card position
    });
  
    doc.save("Bookings.pdf");
  };
  
  
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredBookings);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Bookings");
    XLSX.writeFile(wb, "bookings.xlsx");
  };

  return (
    <section className="dashboard-display-section">
      <div className="title-container">
        <h2 className="title">Pending Booking </h2>
      </div>
      <div className="nav-link-container">
        <TextField
          label="Search Bookings"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <Button variant="contained" color="primary" onClick={exportToPDF}>
          <FontAwesomeIcon icon={faFilePdf} /> Export PDF
        </Button>
        <Button variant="contained" color="success" onClick={exportToExcel} style={{ marginLeft: "10px" }}>
          <FontAwesomeIcon icon={faFileExcel} /> Export Excel
        </Button>
      </div>
      <br/>
      <div className="dashboard-display-container">
        {filteredBookings.length === 0 ? (
          <p>No matching bookings found!</p>
        ) : (
          <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2, overflow: "hidden" }}>
            <Table>
              <TableHead sx={{ backgroundColor: "#1976d2" }}>
                <TableRow>
                  {["ID", "Status", "Customer Name", "Email", "Contact", "Vehicle", "Service", "Date", "Actions"].map((head) => (
                    <TableCell key={head} sx={{ color: "white", fontWeight: "bold" }}>{head}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking._id} sx={{ transition: "0.3s", "&:hover": { backgroundColor: "#f5f5f5" } }}>
                    <TableCell>{booking._id}</TableCell>
                    <TableCell>{booking.status}</TableCell>
                    <TableCell>{booking.customerFirstName} {booking.customerLastName}</TableCell>
                    <TableCell>{booking.customerEmail}</TableCell>
                    <TableCell>{booking.customerContactNumber}</TableCell>
                    <TableCell>{booking.vehicleMake} {booking.vehicleModel}</TableCell>
                    <TableCell>{booking.serviceOption}</TableCell>
                    <TableCell>{booking.bookingDate}</TableCell>
                    <TableCell>
                      <Tooltip title="Cancel" arrow>
                        <IconButton color="error">
                          <CloseIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Update" arrow>
                        <Link to={`/update-booking/${booking._id}`}>
                          <IconButton color="primary">
                            <EditIcon />
                          </IconButton>
                        </Link>
                      </Tooltip>
                      <Tooltip title="Complete" arrow>
                        <IconButton color="success">
                          <DoneIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </section>
  );
};

export default Pendingservices;



