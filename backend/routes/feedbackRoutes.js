const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');


router.post('/create', feedbackController.createFeedback);
router.get('/all', feedbackController.getAllFeedbacks);
router.get('/booking/:bookingId', feedbackController.getFeedbackByBooking);

module.exports = router;
