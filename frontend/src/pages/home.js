import React from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, CardMedia, Fade, Zoom, Stepper, Step, StepLabel, Slide } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Vehiclepages from '../components/vehicle/vehiclepage';

const features = [
  { title: 'Service Booking', description: 'Easily book services for your vehicle with just a few clicks.', image: 'service-booking.jpg' },
  { title: 'Real-Time Updates', description: 'Track the status of your service and get instant updates.', image: 'real-time.jpg' }
];

const steps = ['Choose Service', 'Select Date and Time','Service Confirmation'];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', height: '100%', overflowX: 'hidden' }}>

      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', pt: 5 }}>
        <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#3f51b5', mb: 2, animation: 'fadeIn 2s forwards' }}>
          Your Vehicle Service, Simplified
        </Typography>
        <Typography variant="h5" sx={{ color: '#555', mb: 3, animation: 'fadeIn 3s forwards' }}>
          Book, track, and manage services with just a few clicks.
        </Typography>
        <Button variant="contained" color="primary" sx={{ py: 2, px: 4 }} onClick={() => navigate('/book-service')}>
          Book a Service
        </Button>
      </Box>

      {/* Features Section */}
      <Box sx={{ pt: 5, pb: 5 }}>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 4 }}>
          Key Features
        </Typography>
        <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Fade in={true} timeout={1000}>
                <Card>
                  <CardMedia component="img" height="140" image={feature.image} alt={feature.title} />
                  <CardContent>
                    <Typography variant="h6">{feature.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Box>

  {/* Booking Process (How It Works) Section */}
  <Box sx={{ pt: 5, pb: 5 }}>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 4 }}>
         Our serviced Vehicles
        </Typography>
        <Vehiclepages/>
       
      </Box>

      {/* Booking Process (How It Works) Section */}
      <Box sx={{ pt: 5, pb: 5 }}>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 4 }}>
          How It Works
        </Typography>
        <Stepper activeStep={0} alternativeLabel>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {/* Booking Stats Section */}
      <Box sx={{ textAlign: 'center', pt: 5, pb: 5 }}>
        <Typography variant="h4">Live Booking Stats</Typography>
        <Grid container spacing={4} sx={{ justifyContent: 'center', pt: 3 }}>
          <Grid item xs={12} md={3}>
            <Fade in={true} timeout={1500}>
              <Box>
                <Typography variant="h4">300</Typography>
                <Typography variant="body1">Bookings Today</Typography>
              </Box>
            </Fade>
          </Grid>
          <Grid item xs={12} md={3}>
            <Fade in={true} timeout={1500}>
              <Box>
                <Typography variant="h4">5000</Typography>
                <Typography variant="body1">Total Customers</Typography>
              </Box>
            </Fade>
          </Grid>
        </Grid>
      </Box>

      {/* Customer Reviews Section */}
      <Box sx={{ pt: 5, pb: 5 }}>
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 4 }}>
          Customer Reviews
        </Typography>
        <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
          <Grid item xs={12} md={4}>
            <Fade in={true} timeout={1000}>
              <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                  <Typography variant="h6">John Doe</Typography>
                  <Typography variant="body2" color="textSecondary">“The service was excellent! Highly recommend.”</Typography>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
          <Grid item xs={12} md={4}>
            <Fade in={true} timeout={1200}>
              <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                  <Typography variant="h6">Jane Smith</Typography>
                  <Typography variant="body2" color="textSecondary">“Fast and reliable. I’ll be using this service again.”</Typography>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        </Grid>
      </Box>

      {/* Emergency Assistance Section */}
      <Box sx={{ textAlign: 'center', pt: 5, pb: 5 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>Need Emergency Assistance?</Typography>
        <Zoom in={true} timeout={1000}>
          <Button variant="contained" color="secondary" sx={{ py: 2, px: 4 }}>
            Call for Help
          </Button>
        </Zoom>
      </Box>

      {/* Footer Section */}
      <Box sx={{ textAlign: 'center', pt: 5, pb: 2 }}>
        <Typography variant="body2" color="textSecondary">
          © 2025 Vehicle Service Booking. All Rights Reserved.
        </Typography>
        <Box>
          <Button variant="text" color="primary">Contact Us</Button>
          <Button variant="text" color="primary">Privacy Policy</Button>
          <Button variant="text" color="primary">Terms of Service</Button>
        </Box>
      </Box>

    </Box>
  );
};

export default HomePage;
