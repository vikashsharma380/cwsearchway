import React from "react";
import logoImage from "../assets/logo.png";

export default function Navbar({ currentPage, setCurrentPage }) {
  const linkBase = "text-sm font-medium px-3 py-2 rounded-full transition-all";
  const active = "bg-gradient-to-r from-cyan-600 to-emerald-600 text-white";
  const inactive = "text-slate-600 hover:bg-slate-100";

  return (
    <nav className="fixed z-50 flex items-center w-full h-20 border-b bg-white/50 backdrop-blur-lg border-slate-200">
      <div className="flex items-center justify-between w-full px-6 mx-auto max-w-7xl">
        {/* LOGO */}
        <button
          onClick={() => setCurrentPage("home")}
          className="flex items-center gap-3"
        >
          <img
            src={logoImage}
            alt="CWSearchWay"
            className="object-contain h-24 w-25"
          />
        </button>

        {/* NAV LINKS */}
        <div className="hidden gap-2 lg:flex">
          <button
            onClick={() => setCurrentPage("home")}
            className={`${linkBase} ${
              currentPage === "home" ? active : inactive
            }`}
          >
            Home
          </button>

          <button
            onClick={() => setCurrentPage("about")}
            className={`${linkBase} ${
              currentPage === "about" ? active : inactive
            }`}
          >
            About
          </button>

          <button
            onClick={() => setCurrentPage("services")}
            className={`${linkBase} ${
              currentPage === "services" ? active : inactive
            }`}
          >
            Services
          </button>

          <button
            onClick={() => setCurrentPage("status")}
            className={`${linkBase} ${
              currentPage === "status" ? active : inactive
            }`}
          >
            Status
          </button>
        </div>

        {/* LOGIN + REGISTER BUTTONS */}
        <div className="flex items-center gap-3">
          {/* LOGIN → OPEN ADMIN DASHBOARD */}
          <button
            onClick={() => setCurrentPage("admin")}
            className="px-6 py-2.5 border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-100 transition"
          >
            Login
          </button>

          {/* REGISTER */}
          <button
            onClick={() => setCurrentPage("register")}
            className="px-6 py-2.5 bg-slate-900 text-white font-bold rounded-xl hover:scale-105 transition"
          >
            Register
          </button>
        </div>
      </div>
    </nav>
  );
}
