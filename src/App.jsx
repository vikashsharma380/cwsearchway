import React, { useState } from "react";

import Navbar from "./components/Navbar";

import HomePage from "./pages/Home.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import StatusPage from "./pages/StatusPage.jsx";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const pages = {
    home: <HomePage setCurrentPage={setCurrentPage} />,
    about: <AboutPage setCurrentPage={setCurrentPage} />,
    services: <ServicesPage setCurrentPage={setCurrentPage} />,
    register: <RegisterPage setCurrentPage={setCurrentPage} />,
    status: <StatusPage setCurrentPage={setCurrentPage} />,
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {pages[currentPage]}
    </div>
  );
}
