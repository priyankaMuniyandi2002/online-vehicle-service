const express = require('express');
const router = express.Router();
const { getBookingHistory, getEmergencyBookingHistory } = require('../controllers/HistoryController');

// Route for normal service booking history
router.get('/history/:userId', getBookingHistory);

// Route for emergency service booking history
router.get('/emergency-history/:useremail', getEmergencyBookingHistory);

module.exports = router;
