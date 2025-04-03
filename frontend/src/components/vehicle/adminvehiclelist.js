import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminVehicleTable = () => {
  const [vehicles, setVehicles] = useState([]);
  const [open, setOpen] = useState(false);
  const [editVehicle, setEditVehicle] = useState(null);

  const user=JSON.parse(localStorage.getItem("user"))
  const navigate=useNavigate()


  // Fetch vehicles from the backend
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/vehicles/view/'); // Backend URL
        console.log(response.data);
        
        setVehicles(response.data);
      } catch (error) {
        console.error("Error fetching vehicles", error);
      }
    };
    fetchVehicles();
  }, []);

  const handleDelete = async (vehicleId) => {
    try {
      await axios.delete(`http://localhost:8080/api/vehicles/${vehicleId}`);
      setVehicles(vehicles.filter((vehicle) => vehicle._id !== vehicleId)); // Remove deleted vehicle from UI
    } catch (error) {
      console.error("Error deleting vehicle", error);
    }
  };

  const handleEdit = (vehicle) => {
    setEditVehicle(vehicle);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditVehicle(null);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8080/api/vehicles/edit/${editVehicle._id}`, editVehicle);
      setVehicles(
        vehicles.map((vehicle) =>
          vehicle._id === editVehicle._id ? editVehicle : vehicle
        )
      );
      handleClose();
    } catch (error) {
      console.error("Error updating vehicle", error);

    }
  };

  const handleInputChange = (e) => {
    setEditVehicle({ ...editVehicle, [e.target.name]: e.target.value });
  };

  const handleBookService = (vehicleId) => {
    // Implement service booking logic here (you can send a request to the backend)
    
    // /schedule-booking/:id
    navigate(`/schedule-booking/${vehicleId}`)
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
            <TableCell>user email</TableCell>
              <TableCell>Make</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Registration Number</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicles?.map((vehicle) => (
              <TableRow key={vehicle._id}>
                <TableCell>{vehicle.useremail}</TableCell>
                <TableCell>{vehicle.make}</TableCell>
                <TableCell>{vehicle.model}</TableCell>
                <TableCell>{vehicle.registrationNumber}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(vehicle)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(vehicle._id)}
                    style={{ marginLeft: 10 }}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleBookService(vehicle._id)}
                    style={{ marginLeft: 10 }}
                  >
                    Book Service
                  </Button>
                </TableCell>    
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Vehicle</DialogTitle>
        <DialogContent>
          <TextField
            label="Make"
            name="make"
            value={editVehicle?.make || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Model"
            name="model"
            value={editVehicle?.model || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Registration Number"
            name="registrationNumber"
            value={editVehicle?.registrationNumber || ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminVehicleTable;   
