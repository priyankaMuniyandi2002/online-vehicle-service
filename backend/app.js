/** TAC SERVICE BOOKING APP - BACKEND SERVER FILE **/

/* Require necessary files and modules into the server file. */
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const bp = require("body-parser");
const routes = require("./routes/routes");
const userLoginRoutes = require("./routes/user");
const vehicleRoutes=require("./routes/vehicle.route")
const emergencyBookingRoutes=require("./routes/emergency.route")
const path = require('path');
const { faker } = require('@faker-js/faker');
/* Setting up the App middleware. Note: helmet framework used to secure this expressJS back-end application. */
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
const corsOptions = {
  origin: 'http://localhost:3000', // allow only requests from this domain
};

app.use(cors(corsOptions))
// Middleware for images only
app.use('/uploads', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Allow requests from React frontend
  next();
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(morgan("dev"));
app.use(helmet());
app.use("/api/bookings", routes);
app.use("/api", userLoginRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/emergency-bookings', emergencyBookingRoutes);
app.use('/api/feedback/', require('./routes/feedbackRoutes'));
app.use('/api/history',require('./routes/historyRoutes'))

app.post('/api/dummy-data', (req, res) => {
  const { plateNumber } = req.body;

  // Optional: validate plate number
  if (!plateNumber) {
    return res.status(400).json({ success: false, message: 'Plate number is required' });
  }

  const insurance = {
    policyId: faker.string.uuid(),
    vehicleNumber: plateNumber,
    ownerName: faker.person.fullName(),
    vehicleType: faker.vehicle.type(),
    insuranceCompany: faker.company.name(),
    policyStartDate: faker.date.past().toString(),
    policyEndDate: faker.date.future().toString(),
    premiumAmount: faker.finance.amount(200, 1000, 2),
    claimStatus: faker.helpers.arrayElement(['Approved', 'Pending', 'Rejected']),
    createdAt: new Date().toISOString(),
    isActive: faker.datatype.boolean().toString(),
  };

  const response = {
    success: true,
    insurance,
    token: faker.string.alphanumeric(64),
  };

  res.json(response);
});



// /api/history/history/:userId
// /api/history/emergency-history/:useremail

/* dotenv package used to load environment variables from a .env file. */
const dotenv = require("dotenv").config();

/* connecting to the MongoDB bookingsDB */
const connectDB = require("../backend/dbs/db");
connectDB();

/* Staring the server - App server listening/running on port 8080. */
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});
