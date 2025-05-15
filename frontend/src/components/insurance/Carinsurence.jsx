import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Alert,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import { motion } from 'framer-motion';

// Reusable Detail component
const Detail = ({ label, value }) => (
  <Box>
    <Typography variant="body2" color="text.secondary" fontWeight={600}>
      {label}
    </Typography>
    <Typography variant="body1">{value}</Typography>
  </Box>
);

const CarInsuranceChecker = () => {
  const [plateNumber, setPlateNumber] = useState('');
  const [insuranceDetails, setInsuranceDetails] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setPlateNumber(e.target.value.toUpperCase());
  };

  const handleSubmit = async () => {
    if (!plateNumber) {
      alert('Please enter a valid plate number.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/dummy-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plateNumber }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const data = await response.json();
      setInsuranceDetails(data.insurance);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch insurance details.');
      setInsuranceDetails(null);
    }
  };

  return (
    <Box
      sx={{
        padding: 4,
        background: 'linear-gradient(135deg, #fceabb, #f8b500)',
        minHeight: '100vh',
        fontFamily: 'Arial',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <Typography variant="h4" color="primary.contrastText" gutterBottom>
          🚗 Car Insurance Checker
        </Typography>
      </motion.div>

      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.4 }}>
        <Box display="flex" gap={2} mb={3}>
          <TextField
            label="Plate Number"
            variant="outlined"
            value={plateNumber}
            onChange={handleInputChange}
            placeholder="e.g., RC79JTC"
            sx={{ backgroundColor: 'white', borderRadius: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ paddingX: 4 }}
          >
            Check
          </Button>
        </Box>
      </motion.div>

      {error && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Alert severity="error" sx={{ mb: 2, width: '100%', maxWidth: 500 }}>
            {error}
          </Alert>
        </motion.div>
      )}

      {insuranceDetails && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card
            sx={{
              maxWidth: 700,
              background: 'linear-gradient(135deg, #ffffff, #fff3e0)',
              boxShadow: 6,
              borderRadius: 4,
              p: 3,
              mt: 2,
            }}
          >
            <CardContent>
              <Typography variant="h5" color="secondary" gutterBottom>
                🎉 Insurance Details
              </Typography>

              <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={2} mt={2}>
                <Detail label="🆔 Policy ID" value={insuranceDetails.policyId} />
                <Detail label="🚘 Plate Number" value={insuranceDetails.vehicleNumber} />
                <Detail label="👤 Owner" value={insuranceDetails.ownerName} />
                <Detail label="🚗 Vehicle Type" value={insuranceDetails.vehicleType} />
                <Detail label="🏢 Company" value={insuranceDetails.insuranceCompany} />
                <Detail label="📅 Start Date" value={insuranceDetails.policyStartDate} />
                <Detail label="📅 End Date" value={insuranceDetails.policyEndDate} />
                <Detail label="💰 Premium" value={`₹${insuranceDetails.premiumAmount}`} />
                <Detail label="📋 Claim Status" value={insuranceDetails.claimStatus} />
                <Detail
                  label="✅ Active"
                  value={
                    insuranceDetails.isActive === "true"
                      ? <strong style={{ color: 'green' }}>Yes</strong>
                      : <strong style={{ color: 'red' }}>No</strong>
                  }
                />
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </Box>
  );
};

export default CarInsuranceChecker;
