const express = require('express');
const router = express.Router();
const emergencyBookingController = require('../controllers/emergency.controller');

router.post('/create', emergencyBookingController.createBooking);
router.get('/', emergencyBookingController.getAllBookings);
router.get('/:id', emergencyBookingController.getBookingById);
router.put('/status/:id', emergencyBookingController.updateBookingStatus);
router.delete('/:id', emergencyBookingController.deleteBooking);

module.exports = router;
