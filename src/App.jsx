import React, { useState, useEffect } from "react";

import Navbar from "./components/Navbar";

import HomePage from "./pages/Home.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import StatusPage from "./pages/StatusPage.jsx";

import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin.jsx";
import FindId from "./components/FindId.jsx";
import FormPage from "./pages/FormPage.jsx";
import Contractor from "./components/contractor.jsx";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  // 🔥 Refresh ke baad admin logged-in check
  useEffect(() => {
    const token = localStorage.getItem("cw_admin_token");
    if (token) {
      setCurrentPage("admin-dashboard");
    }
  }, []);

  const pages = {
    home: <HomePage setCurrentPage={setCurrentPage} />,
    about: <AboutPage setCurrentPage={setCurrentPage} />,
    services: <ServicesPage setCurrentPage={setCurrentPage} />,
    register: <RegisterPage setCurrentPage={setCurrentPage} />,
    status: <StatusPage setCurrentPage={setCurrentPage} />,

    // ➤ DIRECT COMPONENT — NO PAGE FILE
    contractor: <Contractor setCurrentPage={setCurrentPage} />,
    admin: <AdminLogin setCurrentPage={setCurrentPage} />,
    "admin-dashboard": <AdminDashboard setCurrentPage={setCurrentPage} />,
    findId: <FindId setCurrentPage={setCurrentPage} />,
    form: <FormPage setCurrentPage={setCurrentPage} />,
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {currentPage !== "admin-dashboard" && (
        <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      )}

      {pages[currentPage]}
    </div>
  );
}
