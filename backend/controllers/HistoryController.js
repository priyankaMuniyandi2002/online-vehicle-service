const Booking = require('../models/bookingModel');
const EmergencyBooking = require('../models/emergencyBookingModel');

// Get history of regular bookings by userId
const getBookingHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await Booking.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching booking history', error });
  }
};

// Get history of emergency bookings by useremail
const getEmergencyBookingHistory = async (req, res) => {
  try {
    const { useremail } = req.params;
    const emergencyBookings = await EmergencyBooking.find({ useremail }).sort({ createdAt: -1 });
    res.status(200).json(emergencyBookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching emergency booking history', error });
  }
};

module.exports = { getBookingHistory, getEmergencyBookingHistory };
