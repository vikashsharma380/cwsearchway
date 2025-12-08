import React from "react";
import Footer from "../components/Footer";

export default function FormPage({ setCurrentPage }) {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center px-4">

        <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-md text-center border border-slate-200">

          <h1 className="text-3xl font-extrabold text-slate-800 mb-6">
            Select Registration Type
          </h1>

          <p className="text-slate-600 mb-10 text-sm">
            Please choose the type of registration you want to continue with.
          </p>

          {/* Candidate Button */}
          <button
            onClick={() => setCurrentPage("register")}
            className="w-full py-3 mb-4 bg-blue-600 text-white text-lg rounded-xl font-semibold shadow-sm hover:bg-blue-700 hover:shadow-md transition-all duration-200"
          >
            Candidate Registration Form 
          </button>

          {/* Contractor Button */}
          <button
            onClick={() => setCurrentPage("contractor")}
            className="w-full py-3 bg-green-600 text-white text-lg rounded-xl font-semibold shadow-sm hover:bg-green-700 hover:shadow-md transition-all duration-200"
          >
            Contractor Registration Form
          </button>

        </div>
      </div>

      <Footer setCurrentPage={setCurrentPage} />
    </>
  );
}
