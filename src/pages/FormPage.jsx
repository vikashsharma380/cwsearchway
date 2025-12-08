import React from "react";
import Footer from "../components/Footer";

export default function FormPage({ setCurrentPage }) {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-slate-100 to-slate-200">
        <div className="w-full max-w-md p-10 text-center bg-white border shadow-xl rounded-3xl border-slate-200">
          <h1 className="mb-6 text-3xl font-extrabold text-slate-800">
            Select Registration Type
          </h1>

          <p className="mb-10 text-sm text-slate-600">
            Please choose the type of registration you want to continue with.
          </p>

          {/* Candidate Button */}
          <button
            onClick={() => setCurrentPage("register")}
            className="w-full py-3 mb-4 text-lg font-semibold text-white transition-all duration-200 bg-blue-600 shadow-sm rounded-xl hover:bg-blue-700 hover:shadow-md"
          >
            Candidate Registration Form
          </button>

          {/* Contractor Button */}
          <button
            onClick={() => setCurrentPage("contractor")}
            className="w-full py-3 text-lg font-semibold text-white transition-all duration-200 bg-green-600 shadow-sm rounded-xl hover:bg-green-700 hover:shadow-md"
          >
            Contractor Registration Form
          </button>
        </div>
      </div>

      <Footer setCurrentPage={setCurrentPage} />
    </>
  );
}
