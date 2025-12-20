import React from "react";
import logoImage from "../assets/logo.png";

export default function Navbar({ currentPage, setCurrentPage }) {
  const linkBase = "text-sm font-medium px-3 py-2 rounded-full transition-all";
  const active = "bg-black text-white shadow-md";
  const inactive = "text-slate-600 hover:bg-slate-100";
  const linkBase1 =
    "text-xl font-medium px-3 py-2 rounded-full transition-all font-semibold";

  const [openMenu, setOpenMenu] = React.useState(false);

  return (
    <>
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

          {/* NAV LINKS (DESKTOP ONLY) */}
          <div className="hidden gap-2 font-semibold lg:flex">
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

            {/* ✅ BLOGS ADDED */}
            <button
              onClick={() => setCurrentPage("blogs")}
              className={`${linkBase} ${
                currentPage === "blogs" ? active : inactive
              }`}
            >
              Blogs
            </button>

            <button
              onClick={() => setCurrentPage("status")}
              className={`${linkBase} ${
                currentPage === "status" ? active : inactive
              }`}
            >
              Track Your Application
            </button>

            <button
              onClick={() => setCurrentPage("findId")}
              className={`${linkBase} ${
                currentPage === "findId" ? active : inactive
              }`}
            >
              Find Registration ID
            </button>

            <button
              onClick={() => setCurrentPage("form")}
              className={`${linkBase1} ${
                currentPage === "form" ? active : inactive
              }`}
            >
              Registration Form
            </button>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage("admin")}
              className="px-6 py-2.5 border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-100 transition"
            >
              Login
            </button>

            <button
              onClick={() => setOpenMenu(!openMenu)}
              className="px-3 py-2 lg:hidden text-slate-700"
            >
              {openMenu ? (
                <span className="text-3xl font-bold">✕</span>
              ) : (
                <span className="text-3xl font-bold">☰</span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {openMenu && (
        <div className="fixed z-40 w-full px-6 py-4 mt-20 space-y-3 bg-white border-t lg:hidden border-slate-200">
          <button
            onClick={() => {
              setCurrentPage("home");
              setOpenMenu(false);
            }}
            className="block w-full py-2 font-semibold text-left text-slate-700"
          >
            Home
          </button>

          <button
            onClick={() => {
              setCurrentPage("about");
              setOpenMenu(false);
            }}
            className="block w-full py-2 font-semibold text-left text-slate-700"
          >
            About
          </button>

          <button
            onClick={() => {
              setCurrentPage("services");
              setOpenMenu(false);
            }}
            className="block w-full py-2 font-semibold text-left text-slate-700"
          >
            Services
          </button>

          {/* ✅ BLOGS ADDED */}
          <button
            onClick={() => {
              setCurrentPage("blogs");
              setOpenMenu(false);
            }}
            className="block w-full py-2 font-semibold text-left text-slate-700"
          >
            Blogs
          </button>

          <button
            onClick={() => {
              setCurrentPage("status");
              setOpenMenu(false);
            }}
            className="block w-full py-2 font-semibold text-left text-slate-700"
          >
            Track Your Application
          </button>

          <button
            onClick={() => {
              setCurrentPage("findId");
              setOpenMenu(false);
            }}
            className="block w-full py-2 font-semibold text-left text-slate-700"
          >
            Find Registration ID
          </button>

          <button
            onClick={() => {
              setCurrentPage("form");
              setOpenMenu(false);
            }}
            className="block w-full py-2 font-semibold text-left text-slate-700"
          >
            Registration Form
          </button>
        </div>
      )}
    </>
  );
}
