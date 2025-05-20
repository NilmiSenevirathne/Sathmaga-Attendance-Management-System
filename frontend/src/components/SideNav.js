import React, { useState} from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import EventIcon from "@mui/icons-material/Event";
import SettingsIcon from "@mui/icons-material/Settings";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../images/sathmagalogo.png";
import { useNavigate } from "react-router-dom";


// Import Google Font Roboto Slab via CSS or link in index.html for better class title font
// Example: <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap" rel="stylesheet" />

const Sidebar = ({ user = {},clearUser, currentTab = "Dashboard", onLogout }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState(currentTab);
  const navigate = useNavigate();


  const toggleSidebar = () => setIsOpen((prev) => !prev);

  const role = user?.role || "Unknown";
  const drawerWidth = isOpen ? 280 : 70;

    const handleLogout = () => {
    localStorage.removeItem("user"); 
    clearUser?.(); 
    navigate("/login");
  };


  const renderTabs = () => {
    switch (role) {
      case "Admin":
        return [
          { text: "Dashboard", icon: <DashboardIcon /> },
          { text: "Manage Users", icon: <GroupIcon /> },
          { text: "Attendance Records", icon: <EventIcon /> },
          { text: "Settings", icon: <SettingsIcon /> },
        ];
      case "AttendanceMarker":
        return [
          { text: "Dashboard", icon: <DashboardIcon /> },
          { text: "Mark Attendance", icon: <EventIcon /> },
          { text: "Reports", icon: <GroupIcon /> },
        ];
      case "Teacher":
        return [
          { text: "My Timetable", icon: <DashboardIcon /> },
          { text: "Attendance Report", icon: <EventIcon /> },
        ];
      default:
        return [{ text: "Home", icon: <DashboardIcon /> }];
    }
  };

  const handleTabClick = (tabText) => {
    setActiveTab(tabText);
    // Optional: You can add navigation logic here, e.g., react-router navigation
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          backgroundColor: "#822f2f", // Darker blue for elegance
          color: "#fff",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRight: "none",
          boxShadow: "2px 0 8px rgba(0,0,0,0.15)",
        },
      }}
    >
      <Box>
        {/* Toggle Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: isOpen ? "flex-end" : "center",
            p: 1,
          }}
        >
          <IconButton
            onClick={toggleSidebar}
            aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
            sx={{
              color: "#fff",
              transition: "transform 0.3s",
              "&:hover": {
                transform: "scale(1.2)",
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Box>

        {/* Logo and Title */}
        {isOpen && (
          <Box sx={{ textAlign: "center", px: 2, mb: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1.5,
              }}
            >
              <img
                src={logo}
                alt="Logo"
                style={{ height: 45, width: 45, borderRadius: 8 }}
              />
              <Typography
                variant="h6"
                fontWeight="700"
                sx={{
                  fontFamily: "'Roboto Slab', serif",
                  letterSpacing: 1.2,
                  userSelect: "none",
                }}
              >
                සත්මග අධ්‍යාපන ආයතනය
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{ mt: 1, opacity: 0.85, userSelect: "none" }}
            >
              <strong>{role}</strong>
            </Typography>
            <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.3)" }} />
          </Box>
        )}

        {/* Tabs */}
        <List>
          {renderTabs().map((tab, index) => {
            const isActive = activeTab === tab.text;
            return (
              <Tooltip
                key={index}
                title={!isOpen ? tab.text : ""}
                placement="right"
                arrow
                
              >
                <ListItem
                  button
                  onClick={() => handleTabClick(tab.text)}
                  sx={{
                    px: 3,
                    mb: 0.5,
                    borderRadius: 1.5,
                    bgcolor: isActive
                      ? "rgba(255, 255, 255, 0.2)"
                      : "transparent",
                    color: isActive ? "#fff" : "rgba(255,255,255,0.85)",
                    transition: "background-color 0.3s, color 0.3s",
                    "&:hover": {
                      bgcolor: "rgba(255, 255, 255, 0.15)",
                      color: "#fff",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isActive ? "#fff" : "rgba(255,255,255,0.7)",
                      minWidth: 40,
                    }}
                  >
                    {tab.icon}
                  </ListItemIcon>
                  {isOpen && <ListItemText primary={tab.text} />}
                </ListItem>
              </Tooltip>
            );
          })}
        </List>
      </Box>

      {/* Logout Button */}
      <Box sx={{ p: 2 }}>
        <Button
          variant="outlined"
          startIcon={<LogoutIcon />}
          fullWidth
          onClick={() => {
            if (handleLogout) handleLogout();
            else alert("Logout clicked! Implement logout logic.");
          }}
          sx={{
            color: "#fff",
            borderColor: "rgba(255,255,255,0.7)",
            textTransform: "none",
            fontWeight: "bold",
            fontSize: 16,
            "&:hover": {
              borderColor: "#fff",
              backgroundColor: "rgba(255,255,255,0.1)",
            },
          }}
        >
          {isOpen ? "Logout" : ""}
        </Button>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
