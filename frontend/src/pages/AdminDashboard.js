import { useEffect, useState } from "react";
import { Drawer, List, ListItem, ListItemText, IconButton, Box, Grid, Paper, Typography } from "@mui/material";
import { Menu, People, DirectionsCar, Event, Report, Warning, CheckCircle, ManageAccounts, Home } from "@mui/icons-material";
import { motion } from "framer-motion";
import AdminVehicleTable from "../components/vehicle/adminvehiclelist";
import ServiceprioviderDashboard from "../components/dashboard-components/serviceproviderdashboard";
import { useSelector } from "react-redux";
import Pendingservices from "../components/dashboard-components/pendingservices";
import Completedservices from "../components/dashboard-components/completed";
import axios from "axios";
import UserManagement from "../components/dashboard-components/usermanagement";
import EmergencyBookings from "../components/dashboard-components/emergencylist";

const menuItems = [
  { text: "Main Page", icon: <Home />, color: "#FF5733" ,componet:<></> },
  { text: "Vehicles List", icon: <DirectionsCar />, color: "#3357FF",componet:<><AdminVehicleTable/></>  },
  { text: "All Bookings", icon: <Event />, color: "#FF33A1" ,componet:<><ServiceprioviderDashboard/></> },
  { text: "Pending Services", icon: <Report />, color: "#FFD700",componet:<><Pendingservices/></>  },
  { text: "Emergency Services", icon: <Warning />, color: "#A133FF",componet:<><EmergencyBookings/></>  },
  { text: "Completed Services", icon: <CheckCircle />, color: "#FF8800",componet:<><Completedservices/></>  },
  { text: "User Management", icon: <ManageAccounts />, color: "#00CCFF",componet:<><UserManagement/></>  },
];



const AdminDashboardPage = () => {


  const [selectedMenu, setSelectedMenu] = useState("Main Page");
  const [open, setOpen] = useState(false);

  const [dashboarddetails,setdashboarddetails]=useState()
  

  // http://localhost:8080/api/admin/dashboard



  useEffect(()=>{

    const fetchdata=async()=>{

      const {data}= await axios.get("http://localhost:8080/api/admin/dashboard")

      
      setdashboarddetails(data)


      

    }

    fetchdata()

  },[])

  const renderMainPage = () => (
    <Grid container spacing={1} sx={{ padding: "0px",height:"600px",display:"flex",gap:"80px" }}>
      {/* {menuItems.map((item, index) => ( */}
        {/* <Grid item xs={12} sm={6} md={4}  > */}
          <Paper sx={{ backgroundColor: menuItems[1].color, p: 3, textAlign: "center", color: "white",height:"300px" }}>
            {menuItems[1].icon}
            <Typography variant="h6">{"Total vehicles"} </Typography>
            <br/>
            <br/> <br/>
            <h1>{dashboarddetails?.vehiclescount}</h1>
          </Paper>  
        {/* </Grid> */}

        {/* <Grid item xs={12} sm={6} md={4} > */}
          <Paper sx={{ backgroundColor: menuItems[2].color, p: 3, textAlign: "center", color: "white",height:"300px" }}>
            {menuItems[2].icon}
            <Typography variant="h6">{"allbookings"} </Typography>
            <br/>
            <br/> <br/>
            <h1>{dashboarddetails?.allbookingcount}</h1>
          </Paper>
        {/* </Grid> */}

        {/* <Grid item xs={12} sm={6} md={4} > */}
          <Paper sx={{ backgroundColor: menuItems[3].color, p: 3, textAlign: "center", color: "white",height:"300px" }}>
            {menuItems[3].icon}
            <Typography variant="h6">{"completedservices"} {dashboarddetails?.completedservicescount}</Typography>
            <br/>
            <br/> <br/>
            <h1>{dashboarddetails?.completedservicescount}</h1>
          </Paper>
        {/* </Grid> */}

        {/* <Grid item xs={12} sm={6} md={4} > */}
          <Paper sx={{ backgroundColor: menuItems[5].color, p: 3, textAlign: "center", color: "white",height:"300px" }}>
            {menuItems[5].icon}
            <Typography variant="h6">{"pendingservices"} </Typography>
            <br/>
            <br/> <br/>
            <h1>{dashboarddetails?.pendingservicescount}</h1>
          </Paper>
        {/* </Grid> */}

        {/* <Grid item xs={12} sm={6} md={4} > */}
          <Paper sx={{ backgroundColor: menuItems[6].color, p: 3, textAlign: "center", color: "white",height:"300px" }}>
            {menuItems[6].icon}
            <Typography variant="h6">{"Total vehicles"} {dashboarddetails?.userscount}</Typography>
            <br/>
            <br/> <br/>
            <h1> {dashboarddetails?.userscount}</h1>
          </Paper>
        {/* </Grid> */}

       
      {/* ))} */}
    </Grid>
  );

  const renderContent = () => {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        {selectedMenu === "Main Page" ? (
          renderMainPage()
        ) : (
          <>
            {menuItems.filter(menu=>menu.text==selectedMenu)[0].componet}
            <p>Content for {selectedMenu} will be displayed here.</p>
          </>
       )}
      </motion.div>
    );
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer variant="permanent" sx={{ width: 250, flexShrink: 0, 
        "& .MuiDrawer-paper": { width: 250, boxSizing: "border-box", backgroundColor: "#1e293b", color: "white" }}}>
        <List>
          {menuItems.map((item) => (
            <ListItem 
              button 
              key={item.text} 
              onClick={() => setSelectedMenu(item.text)} 
              sx={{ "&:hover": { backgroundColor: "#64748b" },
                backgroundColor: selectedMenu === item.text ? "#475569" : "inherit" }}>
              {item.icon}
              <ListItemText primary={item.text} sx={{ marginLeft: 1 }} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <IconButton onClick={() => setOpen(!open)} sx={{ display: { sm: "none" } }}>
          <Menu />
        </IconButton>
        {renderContent()}
      </Box>
    </Box>
  );
};

export default AdminDashboardPage;
