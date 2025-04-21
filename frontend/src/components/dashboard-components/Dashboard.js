import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchBookings } from "../../redux/bookingsSlice";
import { openHelpModal } from "../../redux/helpModalSlice";
import { openDcModal } from "../../redux/deleteConfirmModalSlice";
import { useAuthContext } from "../../hooks/useAuthContext";
import { v4 as uuidv4 } from "uuid";
import columnDisplayHeadings from "../sub-component-files/displayHeadings";
import { toast } from "react-toastify";
import FeedbackForm from "../Feedback/FeedbackForm"; // ✅ Import your form

import {
  Container,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import { AddCircle, Info, Delete, Edit } from "@mui/icons-material";

const UserDashboard = () => {
  const { user } = useAuthContext();
  console.log("user", user.email);
  
  const { firstName, lastName, _id: userId } = user;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResultEmpty, setSearchResultEmpty] = useState(false);
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.bookings.bookingsList);

  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const showModal = () => dispatch(openHelpModal());
  const showDeleteConfirmModal = (id) => dispatch(openDcModal(id));

  const handleFeedbackClick = (bookingId) => {
    setSelectedBookingId(bookingId);
    setShowFeedback(true);
  };

  const statusClass = (status) => {
    switch (status) {
      case "SCHEDULED":
        return "#4CAF50";
      case "IN-PROGRESS":
        return "#FF9800";
      case "ON-HOLD":
        return "#F44336";
      case "WAITING FOR PARTS":
        return "#2196F3";
      default:
        return "#9E9E9E";
    }
  };

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const response = await fetch("/api/bookings", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const json = await response.json();
        if (response.ok) {
          let bookingsResponse = json.bookings;
          if (searchTerm) {
            const refinedSearchTerm = searchTerm.toLowerCase().trim();
            const searchItems = refinedSearchTerm.split(/\s+/).filter(Boolean);
            if (searchItems.length > 0) {
              const filteredData = bookingsResponse.filter((booking) =>
                searchItems.every((searchItem) =>
                  Object.values(booking)
                    .filter((value) => typeof value === "string")
                    .some((value) => value.toLowerCase().includes(searchItem))
                )
              );
              setSearchResultEmpty(filteredData.length === 0);
              dispatch(fetchBookings(filteredData));
            } else {
              setSearchResultEmpty(false);
              dispatch(fetchBookings(bookingsResponse));
            }
          } else {
            setSearchResultEmpty(false);
            dispatch(fetchBookings(bookingsResponse));
          }
        }
      };
      fetchData();
    }
  }, [user, dispatch, searchTerm]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Customer Booking Dashboard
      </Typography>

      <Button
        variant="contained"
        startIcon={<AddCircle />}
        component={Link}
        to="/addvehicle"
        sx={{ mr: 2 }}
      >
        Add vehicle
      </Button>
      <Button variant="outlined" startIcon={<Info />} onClick={showModal}>
        Help
      </Button>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search Booking"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ my: 2 }}
      />

      {searchResultEmpty ? (
        <Typography variant="h6" color="error">
          No matching bookings found!
        </Typography>
      ) : bookings.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          No Bookings Scheduled!
        </Typography>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                {columnDisplayHeadings.map((heading) => (
                  <TableCell key={uuidv4()}>{heading}</TableCell>
                ))}
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={uuidv4()}>
                  <TableCell>{booking._id}</TableCell>
                  <TableCell>
                    <span
                      style={{
                        padding: "5px 10px",
                        borderRadius: "4px",
                        backgroundColor: statusClass(booking.status),
                        color: "#fff",
                        fontWeight: "bold",
                      }}
                    >
                      {booking.status}
                    </span>
                  </TableCell>
                  <TableCell>{booking.customerFirstName}</TableCell>
                  <TableCell>{booking.customerLastName}</TableCell>
                  <TableCell>{booking.customerEmail}</TableCell>
                  <TableCell>{booking.customerContactNumber}</TableCell>
                  <TableCell>{booking.vehicleMake}</TableCell>
                  <TableCell>{booking.vehicleModel}</TableCell>
                  <TableCell>{booking.vehicleReg}</TableCell>
                  <TableCell>{booking.serviceOption}</TableCell>
                  <TableCell>{booking.bookingDate}</TableCell>
                  <TableCell>{booking.addInfo}</TableCell>
                  <TableCell>
                    {firstName} {lastName}
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Cancel">
                      <IconButton
                        onClick={() => showDeleteConfirmModal(booking._id)}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Give Feedback">
                      <IconButton
                        onClick={() => handleFeedbackClick(booking._id)}
                        color="primary"
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {showFeedback && selectedBookingId && (
        <FeedbackForm bookingId={selectedBookingId} userId={user.email} />
      )}
    </Container>
  );
};

export default UserDashboard;
