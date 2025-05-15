// src/components/Header.js
import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" , alignItems: 'center'}}>        
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 5, fontWeight: 'bold' }}>
          Sathmaga Attendance Management System
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
