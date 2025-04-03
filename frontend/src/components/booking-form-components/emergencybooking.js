import React, { useState, useEffect } from "react";
import { Box, Button, TextField, CircularProgress, Typography, Paper } from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import { useParams } from "react-router-dom";

// Animation Variants
const formVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const EmergencyBookingForm = () => {
    const user=JSON.parse(localStorage.getItem("user"))

    const {id}=useParams()

  const [formData, setFormData] = useState({
    useremail: user.email,
    vehicleId: id,
    latitude: "",
    longitude: "",
  });

  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);

  // Function to fetch user's location
  const getLocation = () => {
    setLocationLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }));
          setLocationLoading(false);
        },
        (error) => {
          console.error("Error fetching location:", error);
          setLocationLoading(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      setLocationLoading(false);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/api/emergency-bookings/create", formData);
      alert("Booking Created Successfully!");
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Failed to create booking.");
      setLoading(false);
    }
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={formVariants}>
      <Paper elevation={4} sx={{ maxWidth: 400, margin: "auto", padding: 3, mt: 5, borderRadius: 3 }}>
        <Typography variant="h5" textAlign="center" gutterBottom>
          🚨 Emergency Booking 🚗
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="useremail"
            fullWidth
            margin="normal"
            value={formData.useremail}
            
            onChange={handleChange}
            required
          />
          <TextField
            label="Vehicle ID"
            name="vehicleId"
            fullWidth
            margin="normal"
            value={formData.vehicleId}
            onChange={handleChange}
            required
          />

          {/* Location Input Fields */}
          <Box sx={{ display: "flex", gap: 2, alignItems: "center", marginTop: 2 }}>
            <TextField
              label="Latitude"
              name="latitude"
              fullWidth
              value={formData.latitude}
              onChange={handleChange}
              required
              disabled
            />
            <TextField
              label="Longitude"
              name="longitude"
              fullWidth
              value={formData.longitude}
              onChange={handleChange}
              required
              disabled
            />
            <Button variant="contained" onClick={getLocation} sx={{ whiteSpace: "nowrap" }}>
              {locationLoading ? <CircularProgress size={24} color="inherit" /> : "📍 Get Location"}
            </Button>
          </Box>

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              bgcolor: "red",
              "&:hover": { bgcolor: "darkred" },
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "🚨 Book Now"}
          </Button>
        </form>
      </Paper>
    </motion.div>
  );
};

export default EmergencyBookingForm;
