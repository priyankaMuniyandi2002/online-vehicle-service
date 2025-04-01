import { AppBar, Toolbar, Typography, Container, Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <AppBar position="static" color="primary" sx={{ marginTop: "auto", padding: 2 }}>
      <Container maxWidth="md">
        <Toolbar sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <Typography variant="h6" gutterBottom>
            Vehicle Service Booking
          </Typography>
          <Typography variant="body2" color="inherit">
            <FontAwesomeIcon icon={faCopyright} /> {new Date().getFullYear()} TAC Service. All rights reserved.
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
