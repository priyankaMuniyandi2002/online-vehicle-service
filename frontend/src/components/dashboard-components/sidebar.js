import { useState } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { Drawer, List, ListItem, ListItemText, IconButton } from "@mui/material";
import { Menu, DirectionsCar, ListAlt, Book, History } from "@mui/icons-material";

const menuItems = [
  { text: "My Vehicles List ", icon: <DirectionsCar />, path: "/my-vehicles" },
  { text: "My Vehicles", icon: <ListAlt />, path: "/my-vehicles-list" },
  { text: "Add Vehicles", icon: <ListAlt />, path: "/addvehicle" },
  { text: "My Bookings", icon: <Book />, path: "/my-bookings" },
  { text: "My History", icon: <History />, path: "/my-history" },
    
];

export default function AnimatedSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <IconButton onClick={() => setOpen(!open)}>
        <Menu fontSize="large" />
      </IconButton>
      <Drawer
        anchor="left"
        variant="persistent"
        open={open}
        onClose={() => setOpen(false)}
      >
        <motion.div
          initial={{ width: 160 }}
          animate={{ width: open ? 250 : 60 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="h-full bg-gray-900 text-black p-2"
        >
          <List>
            {menuItems.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1, x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <NavLink
                  to={item.path}
                  style={({ isActive }) => ({
                    textDecoration: "none",
                    color: isActive ? "#FFEB3B" : "black",
                    display: "flex",
                    alignItems: "center",
                    padding: "10px",
                    borderRadius: "5px",
                    backgroundColor: isActive ? "rgba(255, 235, 59, 0.2)" : "transparent",
                  })}
                >
                  <ListItem button onClick={() => setOpen(false)}>
                    {item.icon}
                    {open && <ListItemText primary={item.text} className="ml-2" />}
                  </ListItem>
                </NavLink>
              </motion.div>
            ))}
          </List>
        </motion.div>
      </Drawer>
    </div>
  );
}
