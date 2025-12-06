import React from "react";
import Services from "../components/Services";
import Footer from "../components/Footer";

export default function ServicesPage({ setCurrentPage }) {
  return (
    <>
      <Services />
      <Footer setCurrentPage={setCurrentPage} />
    </>
  );
}
