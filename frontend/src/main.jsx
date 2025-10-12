// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'



// createRoot(document.getElementById('root')).render(
//   <StrictMode>

//       <App />

//   </StrictMode>
// );



import React from "react";
import ReactDOM from "react-dom/client";
import { HeroUIProvider } from "@heroui/react";
import { BrowserRouter as Router } from "react-router-dom"; // ✅ import Router
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <HeroUIProvider>
        <App />
      </HeroUIProvider>
    </Router>
  </React.StrictMode>
);