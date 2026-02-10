import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'
import { Offline } from "react-detect-offline";

export default function Layout() {
  return <>
    <Navbar />
    <div className="container">
      <Outlet></Outlet>
    </div>
    <div>
      <Offline> <div className="network">
        <i className="fas fa-wifi"></i> you are offline (surprise!)</div> </Offline>
    </div>
  </>
}
