import React from 'react';
import { Footer, FooterBrand, FooterDivider, FooterCopyright } from "flowbite-react";
import LogoImg from "../../assets/logo-BfNap0Pe.png";

const FooterComponent = () => {
  return (
    <Footer container>
      <div className="w-full px-6 py-6 flex flex-col lg:flex-col items-center">
        {/* Top section: Logo left, Route right on large screens */}
        <div className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
          <FooterBrand
            href="https://flowbite.com"
            src={LogoImg}
            alt="Flowbite Logo"
            name="Flowbite"
          />
          <span
            className="text-blue-700 font-bold text-2xl mt-2 sm:mt-0"
            style={{ fontFamily: "'Pacifico', cursive" }}
          >
            Route
          </span>
        </div>

        {/* Divider */}
        <FooterDivider />

        {/* Copyright */}
        <div className="w-full text-center py-3">
          <FooterCopyright
            href="#"
            by="Essam Adel™. All Rights Reserved."
            year={2025}
            className="text-gray-700 text-sm"
          />
        </div>
      </div>
    </Footer>
  );
};

export default FooterComponent;
