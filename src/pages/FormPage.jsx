import React from "react";
import Footer from "../components/Footer";
import Register from "../components/Register";
import ContractorRegister from "../components/contractor";

export default function FormPage({ setCurrentPage }) {
  return (
    <>
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">

      <h1 className="text-3xl font-bold mb-6">Select Registration Type</h1>

      {/* Candidate Button */}
      <button
        onClick={() => setCurrentPage("register")}
        className="px-8 py-3 bg-blue-600 text-white rounded-xl text-lg mb-4 hover:bg-blue-700 transition"
      >
        Candidate Registration
      </button>

      {/* Contractor Button */}
      <button
        onClick={() => setCurrentPage("contractor")}
        
        className="px-8 py-3 bg-green-600 text-white rounded-xl text-lg hover:bg-green-700 transition"
      >
        Contractor Registration

      </button>
    </div>


    <Footer setCurrentPage={setCurrentPage} />
    </>
    
  );
}
