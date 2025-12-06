import React from "react";
import CheckStatus from "../components/CheckStatus";
import Footer from "../components/Footer";

export default function StatusPage({ setCurrentPage }) {
  return (
    <>
      <CheckStatus />
      <Footer setCurrentPage={setCurrentPage} />
    </>
  );
}
