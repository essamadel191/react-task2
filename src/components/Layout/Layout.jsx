import React from 'react';
import Navbar from '../Navbar/Navbar';
import FooterComponent from '../FooterComponent/FooterComponent';
import { Outlet } from 'react-router-dom';
import "./Layout.style.css";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main body (navbar + content) */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-1 p-4 bg-[#f4f2ee]">
          <Outlet /> {/* Child routes will render here */}
        </main>
      </div>

      {/* Footer */}
      <FooterComponent />
    </div>
  );
};

export default Layout;
