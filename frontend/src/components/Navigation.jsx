
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const AppLogo = () => {
  return (
    <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/10">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="4" width="16" height="16" rx="2" stroke="white" strokeWidth="1.5" />
        <rect x="8" y="8" width="8" height="8" rx="2" stroke="white" strokeWidth="1.5" />
      </svg>
    </div>
  );
};

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Stylize", path: "/stylize" },
  ];

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-6xl px-4">
      
      <div className="flex items-center justify-between 
        bg-white/5 backdrop-blur-xl 
        border border-white/10 
        rounded-2xl px-4 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
      >
        
        {/* LEFT LOGO */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <AppLogo />
          <p className="text-white font-medium tracking-wide">
            Image Stylizer
          </p>
        </div>

        {/* CENTER NAV */}
        <div className="relative hidden sm:flex items-center bg-black/40 border border-white/10 rounded-full p-1">

          {menuItems.map((item, idx) => {
            const isActive = location.pathname === item.path;

            return (
              <div
                key={idx}
                onClick={() => navigate(item.path)}
                className={`relative px-5 py-2 rounded-full cursor-pointer text-sm transition ${
                  isActive ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full border border-white/10"
                  />
                )}

                <span className="relative z-10">{item.label}</span>
              </div>
            );
          })}
        </div>

        {/* RIGHT CTA */}
        <div className="hidden sm:block">
          <button
            onClick={() => navigate("/stylize")}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm hover:scale-105 transition"
          >
            Try Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navigation;