const Feedback = require('../models/FeedbackModel');
const Booking = require('../models/bookingModel');

const moment = require('moment');

exports.createFeedback = async (req, res) => {
  const { bookingId, rating, comment, userId } = req.body;

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }


    // Safely parse the date string using moment
    const parsedDate = moment(booking.bookingDate, "dddd, MMMM D, YYYY HH:mmA");
    
    if (!parsedDate.isValid()) {
      return res.status(400).json({ error: "Invalid booking date format" });
    }

    const newFeedback = new Feedback({
      bookingId,
      userId,
      rating,
      comment,
      serviceDate: parsedDate.toDate(),
    });

    const savedFeedback = await newFeedback.save();
    res.status(201).json(savedFeedback);
  } catch (error) {
    console.error("Error creating feedback:", error);
    res.status(500).json({ error: error.message });
  }
};


exports.getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
    res.status(200).json(feedbacks); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFeedbackByBooking = async (req, res) => {
  const { bookingId } = req.params;
  try {
    const feedback = await Feedback.find({ bookingId })
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
