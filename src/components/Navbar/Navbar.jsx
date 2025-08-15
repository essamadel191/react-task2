import React, { useState } from "react";
import { Link } from "react-router-dom";
import {Sidebar,SidebarItem,SidebarItemGroup,SidebarItems
} from "flowbite-react";
import { GiMeal } from "react-icons/gi";
import logoImg from "../../assets/logo-BfNap0Pe.png";
import { HiMenu } from "react-icons/hi";
import "./Navbar.style.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isOpen && (
        <button
          className="fixed top-4 left-4 p-2 text-black rounded-md shadow-md lg:hidden z-50"
          onClick={() => setIsOpen(true)}
        >
          <HiMenu size={20} />
        </button>
      )}

      <div
        className={`
          fixed top-0 left-0 z-40 w-64 h-full shadow-none
          transform bg-white transition-transform duration-300 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:relative lg:translate-x-0 lg:h-auto
        `}
      >
        <Sidebar aria-label="Default sidebar example" className="h-full shadow-none">
          <SidebarItems>
            <SidebarItemGroup className="sidebarGroup">
              <SidebarItem>
                <img src={logoImg} alt="Logo" />
              </SidebarItem>
              <SidebarItem
                  className="sidebarItem active rounded-xl"
                  icon={() => <GiMeal className="text-white" />}
                  as={Link}       // <-- Use `as={Link}` to render it as a React Router link
                  to="/"          // <-- target route
                >
                  Meals
              </SidebarItem>
              <SidebarItem className="sidebarItem inactive rounded-xl" href="#" icon={GiMeal}>
                Ingredients
              </SidebarItem>
              <SidebarItem className="sidebarItem inactive rounded-xl" href="#" icon={GiMeal}>
                Area
              </SidebarItem>
            </SidebarItemGroup>
          </SidebarItems>
        </Sidebar>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-600/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;
