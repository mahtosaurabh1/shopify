import { Box, Paper } from "@mui/material";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { DashboardHeader } from "./dashoard-header";

export const Layout = () => {
  return (
    <Box sx={{ display: "flex", position: "relative",mt:'.2rem' }}>
      <Paper sx={{display:'flex',flexDirection:'column',height:'27rem',width:'12rem'}}>
          <NavLink to={"/dashboard"} style={{width:'200px',textAlign:'center',textDecoration:'none',color:'rgba(0,0,0,0.8)',fontSize:'1.2rem',marginBottom:'1rem'}}>Dashboard</NavLink>
          <NavLink to={"/tbuy"} style={{width:'200px',textAlign:'center',textDecoration:'none',color:'rgba(0,0,0,0.8)',fontSize:'1.2rem',marginBottom:'1rem'}}>Total Buy</NavLink>
          <NavLink to={"/tsell"} style={{width:'200px',textAlign:'center',textDecoration:'none',color:'rgba(0,0,0,0.8)',fontSize:'1.2rem',marginBottom:'1rem'}}>Total Sell</NavLink>
          <NavLink to={"/stock"} style={{width:'200px',textAlign:'center',textDecoration:'none',color:'rgba(0,0,0,0.8)',fontSize:'1.2rem',marginBottom:'1rem'}}>Stock</NavLink>
          <NavLink to={"/product"} style={{width:'200px',textAlign:'center',textDecoration:'none',color:'rgba(0,0,0,0.8)',fontSize:'1.2rem',marginBottom:'1rem'}}>Product</NavLink>
          <NavLink to={"/expenses"} style={{width:'200px',textAlign:'center',textDecoration:'none',color:'rgba(0,0,0,0.8)',fontSize:'1.2rem',marginBottom:'1rem'}}>Expenses</NavLink>
          <NavLink to={"/calculations"} style={{width:'200px',textAlign:'center',textDecoration:'none',color:'rgba(0,0,0,0.8)',fontSize:'1.2rem',marginBottom:'1rem'}}>Calculations</NavLink>
      </Paper>
      <Box>
        <DashboardHeader/>
        <Outlet />
      </Box>
    </Box>
  );
};
