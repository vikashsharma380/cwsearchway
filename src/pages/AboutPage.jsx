import React from "react";
import About from "../components/About";
import Footer from "../components/Footer";

export default function AboutPage({ setCurrentPage }) {
  return (
    <>
      <About />
      <Footer setCurrentPage={setCurrentPage} />
    </>
  );
}
