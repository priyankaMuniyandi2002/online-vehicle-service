import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";

const HomeVehiclepages = () => {
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // Fetch vehicle data from the backend
    axios
      .get("http://localhost:8080/api/vehicles/view/")
      .then((response) => setVehicles(response.data))
      .catch((error) => console.error("Error fetching vehicles:", error));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10   " style={{padding:"50px",display:"flex",gap:"30px"}} >
      {vehicles?.map((vehicle) => (
        <motion.div
          key={vehicle._id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        
        >
          <Card className="rounded-lg shadow-lg overflow-hidden" sx={{ width: "300px" }}>
            <CardMedia
              component="img"
              height="140"
              sx={{ width: "100%", objectFit: "cover" }} // Ensure the image fits the card properly
              image={`http://localhost:8080/uploads/${vehicle.image.split("/")[2]}`}
              alt={`${vehicle.make} ${vehicle.model}`}
            />
            <CardContent className="p-4">
              <Typography variant="h6" className="font-semibold text-center text-lg">
                {vehicle.make} {vehicle.model}
              </Typography>
              <Typography className="text-gray-600 text-center text-sm mt-2">
                Registration: {vehicle.registrationNumber}
              </Typography>
              {/* <div className="flex justify-center mt-4" style={{display:"flex",gap:"20px"}}>
                <Button
                  variant="contained"
                  color="secondary"
                  className="rounded-lg px-4 py-2 text-white text-sm "
                  onClick={() => navigate(`/schedule-booking/${vehicle._id}`)}
                >
                  Book Service
                </Button>

                <Button
                  variant="contained"
                  color="info"
                  className="rounded-lg px-4 py-2 text-white text-sm"
                  onClick={() => navigate(`/emergencybooking/${vehicle._id}`)}
                >
                  Book Emergency 🚨 Service
                </Button>

                emergencybooking/

              </div> */}

               

            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default HomeVehiclepages;
