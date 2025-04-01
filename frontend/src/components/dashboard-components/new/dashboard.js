import React from "react";
import AnimatedSidebar from "../sidebar";
import { motion } from "framer-motion";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { Book, Build } from "@mui/icons-material";

export default function DashboardForUser() {
  // Example counts (Replace with dynamic data)
  const bookingCount = 12;
  const vehicleServiceCount = 8;

  return (
    <div className="flex h-screen bg-gradient-to-r from-gray-100 to-blue-100 ">
      {/* Sidebar */}
      <AnimatedSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 " style={{marginLeft:"260px",padding:"100px 100px 500px "}}>
        <Typography variant="h4" className="mb-4 font-bold text-gray-800">
          User Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* Booking Count Card */}
          <Grid item xs={12} sm={6} md={4}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="shadow-lg rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 text-black">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Book fontSize="large" className="text-white mb-2" />
                  <Typography variant="h5" className="font-semibold">
                    My Bookings
                  </Typography>
                  <Typography variant="h4" className="font-bold">
                    {bookingCount}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Vehicle Service Count Card */}
          <Grid item xs={12} sm={6} md={4}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="shadow-lg rounded-2xl bg-gradient-to-r from-green-500 to-teal-500 text-black">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Build fontSize="large" className="text-white mb-2" />
                  <Typography variant="h5" className="font-semibold">
                    Vehicle Services
                  </Typography>
                  <Typography variant="h4" className="font-bold">
                    {vehicleServiceCount}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

      </div>
    </div>
  );
}