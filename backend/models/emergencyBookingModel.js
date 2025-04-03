const mongoose = require('mongoose');

const EmergencyBookingSchema = new mongoose.Schema({
    useremail: { type: String, required: true },
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Accepted', 'Completed', 'Cancelled'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('EmergencyBooking', EmergencyBookingSchema);
