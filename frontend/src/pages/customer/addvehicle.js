import React, { useState } from 'react';
import { TextField, Button, Grid, Box, Typography, Avatar } from '@mui/material';

const AddVehicleForm = () => {
  const [vehicleData, setVehicleData] = useState({
    useremail: '',
    make: '',
    model: '',
    registrationNumber: '',
    image: null, // Initialize as null for image file
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleData({ ...vehicleData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setVehicleData({ ...vehicleData, image: file }); // Store the file itself
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the FormData object
    const formData = new FormData();
    formData.append('useremail', vehicleData.useremail);
    formData.append('make', vehicleData.make);
    formData.append('model', vehicleData.model);
    formData.append('registrationNumber', vehicleData.registrationNumber);

    // If there's an image, append it
    if (vehicleData.image) {
      formData.append('image', vehicleData.image);
    }

    // Now, you can send the formData to your API
    // Example: Using fetch to submit the form data to an endpoint
    fetch('http://localhost:8080/api/vehicles/add', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <Box sx={{ padding: '20px', background: 'background.default', borderRadius: '10px', boxShadow: 5, marginTop: '30px', width: '60%', margin: 'auto' }}>
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '20px', color: 'primary.main' }}>
        Add a New Vehicle
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="User Email"
              variant="outlined"
              name="useremail"
              value={vehicleData.useremail}
              onChange={handleChange}
              sx={{ marginBottom: '15px' }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Make"
              variant="outlined"
              name="make"
              value={vehicleData.make}
              onChange={handleChange}
              required
              sx={{ marginBottom: '15px' }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Model"
              variant="outlined"
              name="model"
              value={vehicleData.model}
              onChange={handleChange}
              required
              sx={{ marginBottom: '15px' }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Registration Number"
              variant="outlined"
              name="registrationNumber"
              value={vehicleData.registrationNumber}
              onChange={handleChange}
              required
              sx={{ marginBottom: '15px' }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <input
              accept="image/*"
              type="file"
              id="image-upload"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
            <label htmlFor="image-upload">
              <Button variant="contained" component="span" fullWidth>
                Upload Vehicle Image
              </Button>
            </label>
          </Grid>

          {vehicleData.image && (
            <Grid item xs={12} sx={{ marginBottom: '15px' }}>
              <Avatar src={URL.createObjectURL(vehicleData.image)} sx={{ width: '100px', height: '100px', borderRadius: '50%', margin: '10px 0', objectFit: 'cover' }} />
            </Grid>
          )}

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                marginTop: '20px',
                backgroundColor: 'primary.main',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              }}
            >
              Add Vehicle
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddVehicleForm;
