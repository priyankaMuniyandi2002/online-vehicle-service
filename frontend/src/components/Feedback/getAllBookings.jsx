import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";

const AllFeedBackBookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });

  // Fetch bookings from API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/feedback/all");
        setBookings(response.data);
        setFilteredBookings(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Filter bookings based on the search term
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = bookings.filter(
      (booking) =>
        booking.userId.toLowerCase().includes(value) || booking.bookingId.toLowerCase().includes(value)
    );
    setFilteredBookings(filtered);
  };

  // Generate PDF from filtered bookings
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Bookings Report", 20, 20);

    let yPosition = 30;
    filteredBookings.forEach((booking, index) => {
      doc.setFontSize(12);
      doc.text(`Booking ID: ${booking.bookingId}`, 20, yPosition);
      doc.text(`User: ${booking.userId}`, 20, yPosition + 10);
      doc.text(`Rating: ${booking.rating}`, 20, yPosition + 20);
      doc.text(`Comment: ${booking.comment}`, 20, yPosition + 30);
      yPosition += 40;
      if (yPosition > 260) {
        doc.addPage();
        yPosition = 20;
      }
    });

    doc.save("bookings_report.pdf");
  };

  // Export to Excel from filtered bookings
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredBookings);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Bookings");
    XLSX.writeFile(workbook, "bookings_report.xlsx");
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        All Bookings
      </Typography>

      {/* Search Bar */}
      <TextField
        label="Search Bookings"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearch}
        sx={{ mb: 3 }}
      />

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Button variant="contained" color="primary" onClick={generatePDF}>
          Download PDF
        </Button>
        <Button variant="contained" color="secondary" onClick={exportToExcel}>
          Export to Excel
        </Button>
      </Box>

      {/* Bookings Cards */}
      {loading ? (
        <CircularProgress />
      ) : filteredBookings.length === 0 ? (
        <Typography>No bookings found.</Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredBookings.map((booking) => (
            <Grid item xs={12} sm={6} md={4} key={booking._id}>
              <Card sx={{ padding: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Booking ID: {booking.bookingId}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    User: {booking.userId}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Rating: {booking.rating}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Comment: {booking.comment}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Snackbar for messages */}
      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={() => setSnack({ ...snack, open: false })}
      >
        <Alert onClose={() => setSnack({ ...snack, open: false })} severity={snack.severity}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AllFeedBackBookingPage;
