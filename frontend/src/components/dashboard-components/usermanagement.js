import React, { useState, useEffect } from "react";
import { TextField, MenuItem, Select, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/getallusers")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user._id !== id));
  };

  const filteredUsers = users.filter((user) =>
    user.firstName.toLowerCase().includes(search.toLowerCase()) &&
    (roleFilter ? user.role === roleFilter : true)
  );

  return (
    <div style={{ padding: "24px", maxWidth: "800px", margin: "auto" }}>
      <h1 style={{ marginBottom: "16px" }}>User Management</h1>
      <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
        <TextField
          label="Search by name"
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          displayEmpty
          fullWidth
        >
          <MenuItem value="">All Roles</MenuItem>
          <MenuItem value="customer">Customer</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </Select>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.firstName} {user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => handleDelete(user._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserManagement;
