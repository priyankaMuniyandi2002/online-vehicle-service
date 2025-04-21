import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Rating,
  Snackbar,
  Alert,
  Paper,
  Card,
  CardContent,
  Divider,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const FeedbackForm = ({ bookingId, userId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch reviews on component mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {//
        const response = await axios.get(`http://localhost:8080/api/feedback/booking/${bookingId}`);
        setReviews(response.data);  // Assuming response.data is an array of reviews
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setLoading(false);
      }
    };

    fetchReviews();
  }, [bookingId]);

  // Submit feedback
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !comment) {
      return setSnack({
        open: true,
        message: "Please provide rating and comment.",
        severity: "warning",
      });
    }

    try {
      const res = await axios.post("http://localhost:8080/api/feedback/create", {
        bookingId,
        userId,
        rating,
        comment,
      });

      setSnack({ open: true, message: "Feedback submitted!", severity: "success" });
      setRating(0);
      setComment("");
    } catch (err) {
      setSnack({
        open: true,
        message: err?.response?.data?.error || "Submission failed",
        severity: "error",
      });
    }
  };

  return (
    <Paper elevation={4} sx={{ p: 4, maxWidth: 500, mx: "auto", mt: 4, borderRadius: 3 }}>
      <Typography variant="h5" mb={2} fontWeight="bold">
        Give Your Feedback
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Typography variant="body1" gutterBottom>
          Rating:
        </Typography>
        <Rating
          value={rating}
          onChange={(e, newValue) => setRating(newValue)}
          size="large"
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Write your comments"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          margin="normal"
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 2 }}
          fullWidth
        >
          Submit Feedback
        </Button>
      </Box>

      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={() => setSnack({ ...snack, open: false })}
      >
        <Alert onClose={() => setSnack({ ...snack, open: false })} severity={snack.severity}>
          {snack.message}
        </Alert>
      </Snackbar>

      {/* Reviews Section */}
      <Box mt={4}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Reviews:
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : reviews.length === 0 ? (
          <Typography>No reviews yet.</Typography>
        ) : (
          reviews.map((review, index) => (
            <Card key={index} sx={{ mb: 2, p: 2 }}>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <Rating value={review.rating} readOnly size="small" sx={{ mr: 2 }} />
                  <Typography variant="body2" color="textSecondary">
                    {review.userId} {/* You can replace userId with the actual user name if available */}
                  </Typography>
                </Box>
                <Typography variant="body1" mt={1}>
                  {review.comment}
                </Typography>
              </CardContent>
              <Divider />
            </Card>
          ))
        )}
      </Box>
    </Paper>
  );
};

export default FeedbackForm;
