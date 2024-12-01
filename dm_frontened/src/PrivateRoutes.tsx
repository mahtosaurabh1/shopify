import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoutes() {
    const authToken=localStorage.getItem("userinfo")
  return (
    authToken?<Outlet/>:<Navigate to='/login'/>
  )
}

export default PrivateRoutes