
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from "@heroui/react";
import { useNavigate, useLocation } from "react-router-dom";

// ✅ Logo similar style to ACME but adapted for Image Stylizer
const AppLogo = () => {
  return (

<svg
  xmlns="http://www.w3.org/2000/svg"
  width="36"
  height="36"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="1.5"
  strokeLinecap="round"
  strokeLinejoin="round"
>
  {/*<!-- Outer square -->*/}
  <rect x="4" y="4" width="16" height="16" rx="1" ry="1" />

  {/*<!-- Inner square -->*/}
  <rect x="8" y="8" width="8" height="8" rx="1" ry="1" />

  {/*<!-- Dotted connecting lines (outer → inner vertices) -->*/}
  <line x1="4" y1="4" x2="8" y2="8" strokeDasharray="2 2" />
  <line x1="20" y1="4" x2="16" y2="8" strokeDasharray="2 2" />
  <line x1="4" y1="20" x2="8" y2="16" strokeDasharray="2 2" />
  <line x1="20" y1="20" x2="16" y2="16" strokeDasharray="2 2" />
</svg>

  );
};

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Stylize", path: "/stylize" },
  ];

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="xl"
      className="fixed top-0 py-1.5 left-0 w-full z-50 
                 bg-black/40 backdrop-blur-xl 
                 border-b border-white/10 shadow-lg"
    >
      {/* Left: Logo (do not grow) */}
      <NavbarContent justify="start" className="flex-none">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden text-white"
        />
        <NavbarBrand
          onClick={() => navigate("/")}
          className="cursor-pointer flex items-center gap-2"
        >
          <AppLogo />
          <p className="font-bold text-white text-lg">Image Stylizer</p>
        </NavbarBrand>
      </NavbarContent>






      <NavbarContent
        justify="center"
        className="hidden sm:flex absolute left-1/2 -translate-x-1/2 gap-12"
      >
        {menuItems.map((item, idx) => {
          const isActive = location.pathname === item.path;
          return (
            <NavbarItem key={idx} isActive={isActive}>
              <Link
                className={`cursor-pointer transition-colors text-lg ${
                  isActive
                    ? "text-[#29B3CF] font-semibold border-b-2 border-[#29B3CF] pb-1"
                    : "text-white hover:text-[#29B3CF]"
                }`}
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </Link>
            </NavbarItem>
          );
        })}
      </NavbarContent>




      {/* Right slot left empty on desktop (so center can truly center).
          Mobile menu (drawer) */}
      <NavbarMenu>
        {menuItems.map((item, idx) => {
          const isActive = location.pathname === item.path;
          return (
            <NavbarMenuItem key={idx}>
              <Link
                className={`w-full cursor-pointer text-lg ${
                  isActive ? "text-[#FF6B6B] font-semibold" : "text-white"
                }`}
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate(item.path);
                }}
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          );
        })}
      </NavbarMenu>
    </Navbar>
  );
};

export default Navigation;