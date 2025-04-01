// routes/vehicleRoutes.js
const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicle.controller');
const upload = require('../utils/fileupload');



router.post('/add',upload.single("image"), vehicleController.addVehicle);
router.put('/edit/:id', vehicleController.editVehicle);
router.get('/view', vehicleController.getVehicles);
router.get('/view/:email', vehicleController.getVehiclesuser);
router.get('/view/buyid/:id', vehicleController.getVehiclebyid);
router.delete('/:id', vehicleController.deletevehicle);

module.exports = router;