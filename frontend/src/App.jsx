import React from "react";
import { Routes, Route } from "react-router-dom";

// import MainContent from "./components/MainContent";
import HeroSection from "./components/HeroSection";
import HomePage from "./components/HomePage";
import StylizePage from "./components/StylizePage";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

const App = () => {
  return (

      <div className="App min-h-screen bg-black text-white">

        <Routes>
          <Route path="/" element={
            <>
              <Navigation />
              <HomePage />
              <Footer />
            </>
          } />

          <Route path="/stylize" element={
            <>
              <Navigation />
              <StylizePage />
              <Footer />
              
            </>
          } />

        </Routes>
      </div>
    
  );
}

export default App;
