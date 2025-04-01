const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
    useremail:{type: String},
    make: { type: String, required: true },
    model: { type: String, required: true },
    image:{ type: String,},
    registrationNumber: { type: String, required: true, unique: true }
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', VehicleSchema);