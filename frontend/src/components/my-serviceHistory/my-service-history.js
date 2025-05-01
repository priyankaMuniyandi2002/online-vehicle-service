import React, { useEffect, useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  CircularProgress,
  Slide,
} from "@mui/material";
import { LocationOn, DirectionsCar } from "@mui/icons-material";
import axios from "axios";

const statusColor = {
  Pending: "warning",
  Completed: "success",
  COMPLETED: "success",
};

const ServiceHistory = () => {
  const [tab, setTab] = useState(0);
  const [emergencyHistory, setEmergencyHistory] = useState([]);
  const [serviceHistory, setServiceHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const user=JSON.parse(localStorage.getItem("user"))
  console.log(user);
  

  const email = user.email; // You can make this dynamic if needed
  const userId = user._id; // Same here

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [emergencyRes, serviceRes] = await Promise.all([
          axios.get(`http://localhost:8080/api/history/emergency-history/${email}`),
          axios.get(`http://localhost:8080/api/history/history/${userId}`),
        ]);
        setEmergencyHistory(emergencyRes.data);
        setServiceHistory(serviceRes.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching history:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderEmergency = () =>
    emergencyHistory.map((item, index) => (
      <Slide direction="up" in={true} mountOnEnter unmountOnExit key={item._id}>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 3,
              transition: "transform 0.3s",
              "&:hover": { transform: "scale(1.02)" },
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <LocationOn fontSize="small" /> Location
              </Typography>
              <Typography variant="body2">
                Latitude: {item.latitude} <br />
                Longitude: {item.longitude}
              </Typography>
              <Chip
                label={item.status}
                color={statusColor[item.status] || "default"}
                sx={{ mt: 1 }}
              />
              <Typography variant="caption" display="block" mt={2}>
                Created: {new Date(item.createdAt).toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Slide>
    ));

  const renderService = () =>
    serviceHistory.map((item) => (
      <Slide direction="up" in={true} mountOnEnter unmountOnExit key={item._id}>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 3,
              transition: "transform 0.3s",
              "&:hover": { transform: "scale(1.02)" },
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <DirectionsCar fontSize="small" /> {item.vehicleMake} ({item.vehicleModel})
              </Typography>
              <Typography variant="body2">
                Reg. No: {item.vehicleReg} <br />
                Service: {item.serviceOption}
              </Typography>
              <Chip
                label={item.status}
                color={statusColor[item.status] || "default"}
                sx={{ mt: 1 }}
              />
              <Typography variant="caption" display="block" mt={2}>
                Booking Date: {item.bookingDate}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Slide>
    ));

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Service History
      </Typography>
      <Tabs value={tab} onChange={(e, val) => setTab(val)} centered>
        <Tab label="Emergency History" />
        <Tab label="Service History" />
      </Tabs>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3} mt={2}>
          {tab === 0 ? renderEmergency() : renderService()}
        </Grid>
      )}
    </Box>
  );
};

export default ServiceHistory;
