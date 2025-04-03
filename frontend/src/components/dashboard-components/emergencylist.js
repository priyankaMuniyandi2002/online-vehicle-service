import React, { useState, useEffect } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { Delete, Edit, LocationOn, FileDownload } from "@mui/icons-material";
import * as XLSX from "xlsx";
import { motion } from "framer-motion";
import axios from "axios";

const EmergencyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  const statusOptions = ["Pending", "Accepted", "Completed", "Cancelled"];

  useEffect(() => {
    axios.get("http://localhost:8080/api/emergency-bookings")
      .then(response => setBookings(response.data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/emergency-bookings/${id}`)
      .then(() => setBookings(bookings.filter(booking => booking._id !== id)))
      .catch(error => console.error("Error deleting:", error));
  };

  const handleEdit = (booking) => {
    setCurrentBooking(booking);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentBooking(null);
  };

  const handleUpdate = () => {
    
    console.log(currentBooking);
    
    axios.put(`http://localhost:8080/api/emergency-bookings/status/${currentBooking._id}`, currentBooking)
      .then(response => {
        setBookings(bookings.map(booking => booking._id === response.data._id ? response.data : booking));
        handleClose();
      })
      .catch(error => console.error("Error updating:", error));
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(bookings);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Emergency Bookings");
    XLSX.writeFile(workbook, "EmergencyBookings.xlsx");
  };

  return (
    <motion.div className="container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
      <Typography variant="h4" gutterBottom>Emergency Bookings</Typography>
      <TextField label="Search" variant="outlined" fullWidth onChange={(e) => setSearch(e.target.value.toLowerCase())} style={{ marginBottom: "10px" }} />
      <Button variant="contained" color="primary" onClick={exportToExcel} startIcon={<FileDownload />}>Export to Excel</Button>
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Vehicle</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.filter(booking => booking.useremail.toLowerCase().includes(search)).map((booking) => (
              <TableRow key={booking._id}>
                <TableCell>{booking.useremail}</TableCell>
                <TableCell>{booking.vehicleId.make} - {booking.vehicleId.model}</TableCell>
                <TableCell>{booking.status}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => window.open(`https://www.google.com/maps?q=${booking.latitude},${booking.longitude}`, "_blank")}>
                    <LocationOn />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleEdit(booking)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(booking._id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Booking Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Booking</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel>Status</InputLabel>
            <Select
              value={currentBooking?.status || ""}
              onChange={(e) => setCurrentBooking({ ...currentBooking, status: e.target.value })}
            >
              {statusOptions.map((status) => (
                <MenuItem key={status} value={status}>{status}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleUpdate} color="primary">Update</Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
};

export default EmergencyBookings;
