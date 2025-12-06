import React from "react";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

export default function HomePage({ setCurrentPage }) {
  return (
    <>
      <Hero setCurrentPage={setCurrentPage} />
      <Footer />
    </>
  );
}
