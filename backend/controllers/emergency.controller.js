const EmergencyBooking = require('../models/emergencyBookingModel');
const userModel = require('../models/userModel');
const { sendEmergencyEmail } = require('../utils/email');

// Create an Emergency Booking
exports.createBooking = async (req, res) => {
    try {
        const { useremail, vehicleId, latitude, longitude } = req.body;
        const booking = new EmergencyBooking({ useremail, vehicleId, latitude, longitude });
        await booking.save();

        const user=await userModel.find()

        user.map(async(use)=>{

            if (use.role=="serviceprovider") {
                
                await sendEmergencyEmail(use.email,booking)
            }

        })

       

        res.status(201).json({ message: 'Emergency booking created', booking });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all Emergency Bookings
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await EmergencyBooking.find().populate('vehicleId');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Booking by ID
exports.getBookingById = async (req, res) => {
    try {
        const booking = await EmergencyBooking.findById(req.params.id).populate('vehicleId');
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Booking Status
exports.updateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const booking = await EmergencyBooking.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        res.status(200).json({ message: 'Booking status updated', booking });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Booking
exports.deleteBooking = async (req, res) => {
    try {
        const booking = await EmergencyBooking.findByIdAndDelete(req.params.id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        res.status(200).json({ message: 'Booking deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
