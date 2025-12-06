import React from "react";
import logoImage from "../assets/logo.png";

export default function Navbar({ currentPage, setCurrentPage }) {
  const linkBase =
    "text-sm font-medium px-3 py-2 rounded-full transition-colors";
  const active = "text-slate-900 bg-slate-100";
  const inactive = "text-slate-500 hover:text-slate-900 hover:bg-slate-100";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b bg-white/80 backdrop-blur border-slate-200">
      <nav className="flex items-center justify-between h-16 max-w-6xl gap-6 px-4 mx-auto lg:px-0">
        {/* SAME POSITION — JUST DATA CHANGED */}
        <button
          onClick={() => setCurrentPage("home")}
          className="flex items-center gap-2"
        >
          {/* LOGO SAME PLACE, JUST BIGGER */}
          <img
            src={logoImage}
            alt="Logo"
            className="object-contain w-10 h-10 rounded-full"
          />

          {/* NAME CHANGED */}
          <span className="text-lg font-semibold text-slate-900">
            CWSearchWay
          </span>
        </button>

        {/* SAME POSITION — ONLY LINK NAMES CHANGED */}
        <div className="items-center hidden gap-1 md:flex">
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

        {/* SAME SPOT — JUST BUTTON TEXT CHANGED */}
        <div>
          <button
            onClick={() => setCurrentPage("register")}
            className="px-4 py-2 text-sm font-semibold text-white rounded-full bg-slate-900 hover:bg-slate-800"
          >
            Register
          </button>
        </div>
      </nav>
    </header>
  );
}
