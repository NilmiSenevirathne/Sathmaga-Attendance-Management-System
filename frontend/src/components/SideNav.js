// src/components/Sidebar.js
import React, { useState } from "react";
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
  Tooltip
} from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import EventIcon from '@mui/icons-material/Event';
import SettingsIcon from '@mui/icons-material/Settings';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Sidebar = ({ user = {} }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen((prev) => !prev);

  // const name = user ? `${user.fname} ${user.lname}` : "Guest";
  const role = user?.role || "Unknown";

  const drawerWidth = isOpen ? 250 : 70;

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
        return [
          { text: "Home", icon: <DashboardIcon /> }
        ];
    }
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          transition: 'width 0.3s ease-in-out',
          backgroundColor: '#1976a2',
          color: '#ffffff',
          overflowX: 'hidden',
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Toggle Button */}
        <Box sx={{ display: 'flex', justifyContent: isOpen ? 'flex-end' : 'center', p: 1 }}>
          <IconButton onClick={toggleSidebar}>
            {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Box>

        {/* Title and User Info */}
        {isOpen && (
          <Box sx={{ textAlign: 'center', px: 2 }}>
            <Typography variant="h6" fontWeight="bold">
              Sathmaga Institute
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {/* Logged in as: <strong>{name}</strong><br /> */}
              Role: <strong>{role}</strong>
            </Typography>
            <Divider sx={{ my: 2 }} />
          </Box>
        )}

        {/* Sidebar Tabs */}
        <List>
          {renderTabs().map((tab, index) => (
            <Tooltip key={index} title={!isOpen ? tab.text : ''} placement="right">
              <ListItem button>
                <ListItemIcon>{tab.icon}</ListItemIcon>
                {isOpen && <ListItemText primary={tab.text} />}
              </ListItem>
            </Tooltip>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
