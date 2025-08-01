import React, { useEffect, useState } from "react";
import axios from "axios";
 // import "../css/App.css"; 
 import Navbar from "../components/navbar"; // Link the CSS file here
import Favorite from "../components/saved";
//import "../css/App.css"; // Import the CSS file for styling
import Home from "../components/home";
import SearchResult from "../components/search";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";

function App() {
  

  return (
    <>
      <Navbar />
      <main className="app-container">
        <Routes>
          {/* Add more routes as needed */}
          <Route path="/home" element={<Home />} />
          <Route path="/favorites" element={<Favorite />} />
          <Route path="/search" element={<SearchResult />} />
          {/* Add a default route or redirect if needed */}
        </Routes>
      </main >
    </>
  );
}



export default App;
