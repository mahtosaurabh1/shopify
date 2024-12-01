import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Appheader from './shared-component/app-header';
import { Box } from '@mui/material';



const MainLayout = () => {
  return (
    <div>
    <Appheader />
    <Box sx={{backgroundColor:'#EAE4DD',height:'90.7vh',width:'80hw'}}>
      <Outlet />
    </Box>
  </div>
  );
};

export default MainLayout;
