// controllers/vehicleController.js
const Vehicle = require('../models/vehicle');

// Add Vehicle
exports.addVehicle = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send("No file uploaded.");
          }

        const {useremail, make, model, registrationNumber } = req.body;
        const vehicle = new Vehicle({ useremail,make, model, registrationNumber ,image: `/uploads/${req.file.filename}`});
        await vehicle.save();
        res.status(201).json(vehicle);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Edit Vehicle
exports.editVehicle = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedVehicle = await Vehicle.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedVehicle);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// View Vehicles
exports.getVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// View Vehicles
exports.getVehiclesuser = async (req, res) => {
    try {
        const vehicles = await Vehicle.find({useremail:req.params.email});
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getVehiclebyid = async (req, res) => {
    try {
        const vehicles = await Vehicle.findById(req.params.id);
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// delete Vehicles
exports.deletevehicle = async (req, res) => {
    try {
        const vehicles = await Vehicle.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"deleted sucessfully"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};