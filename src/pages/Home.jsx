import React from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import WhyChooseUs from "../components/WhyChooseUs";
import Footer from "../components/Footer";


export default function HomePage({ setCurrentPage }) {
  return (
    <>
      <Hero setCurrentPage={setCurrentPage} />
      <About setCurrentPage={setCurrentPage} />
      <Services />
      <WhyChooseUs />
      <Footer setCurrentPage={setCurrentPage} />
    </>
  );
}
