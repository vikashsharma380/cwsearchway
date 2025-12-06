import React from "react";
import Register from "../components/Register";
import Footer from "../components/Footer";

export default function RegisterPage({ setCurrentPage }) {
  return (
    <>
      <Register setCurrentPage={setCurrentPage} />
      <Footer setCurrentPage={setCurrentPage} />
    </>
  );
}
