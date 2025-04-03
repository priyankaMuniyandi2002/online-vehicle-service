import { AppBar, Toolbar, Button, IconButton, Typography, Avatar, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useLogOut } from "../../hooks/useLogOut";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { logOut } = useLogOut();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
          <FontAwesomeIcon icon={faCar} style={{ marginRight: 8 }} /> TAC Service
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>

        {
          user ? <>
            <Button color="inherit" component={Link} to={user.role==="customer"?`/dashboard`:"/admin/dashboard"}>Dashboard</Button>
            <Button color="inherit" component={Link} to="/my-vehicles">My Vehicle List</Button>
            <Button color="inherit" component={Link} to="/my-bookings">My Bookings</Button>
            <Button color="inherit" component={Link} to="/service-history">My Service History</Button>
          </> : null
          
        }

        {!user ? (
          <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/create-account">Register</Button>
          </>
        ) : (
          <>
          {
            user?<>
                  <IconButton onClick={handleMenuOpen} color="inherit">
                  <Avatar>{user?.firstName.charAt(0)}</Avatar>
                </IconButton>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                  <MenuItem disabled>{user.firstName} {user.lastName}</MenuItem>
                  <MenuItem onClick={() => { logOut(); handleMenuClose(); }}>
                    <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: 8 }} /> Log Out
                  </MenuItem>
                </Menu>
            </>:null
          }
          </> 
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
