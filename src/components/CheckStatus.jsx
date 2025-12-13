import React, { useState } from "react";

export default function CheckStatus() {
  const [registrationId, setRegistrationId] = useState("");
  const [registrationData, setRegistrationData] = useState(null);
  const [searched, setSearched] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = async () => {
    const id = registrationId.trim().toUpperCase();
    if (!id) return;

    let url = "";

    if (id.startsWith("CWEMP")) {
      url = `https://api.cwsearchway.com/api/registration/status/${id}`;
    } else if (id.startsWith("CWCON")) {
      url = `https://api.cwsearchway.com/api/contractor/status/${id}`;
    } else {
      alert("Invalid Registration ID");
      return;
    }

    try {
      const res = await fetch(url);
      const out = await res.json();

      if (out.success) {
        setRegistrationData(out.data);   // ✅ FIXED
        setNotFound(false);
      } else {
        setRegistrationData(null);
        setNotFound(true);
      }

      setSearched(true);
    } catch (err) {
      setNotFound(true);
      setSearched(true);
    }
  };

  const statusStyles = (status) => {
    if (status === "Accepted")
      return { icon: "✅", color: "text-emerald-600" };
    if (status === "Rejected")
      return { icon: "❌", color: "text-red-500" };
    if (status === "Completed")
      return { icon: "🎉", color: "text-blue-600" };
    return { icon: "⏳", color: "text-amber-500" };
  };

  return (
    <div className="min-h-screen px-6 pt-32 pb-12 bg-white">
      <div className="max-w-2xl mx-auto">

        {/* HEADER */}
        <div className="mb-10 text-center">
          <h2 className="text-5xl font-black text-slate-900">
            Track Application
          </h2>
          <p className="mt-2 text-slate-600">
            Enter your registration ID below.
          </p>
        </div>

        {/* SEARCH */}
        <div className="p-8 mb-8 bg-white border shadow-lg border-slate-300 rounded-2xl">
          <input
            type="text"
            value={registrationId}
            onChange={(e) => setRegistrationId(e.target.value.toUpperCase())}
            placeholder="CWEMP / CWCON ID"
            className="w-full px-6 py-4 mb-4 text-lg font-bold border bg-slate-100 border-slate-300 rounded-xl"
          />

          <button
            onClick={handleSearch}
            className="w-full py-4 font-bold text-white bg-slate-900 rounded-xl"
          >
            Track Application
          </button>
        </div>

        {/* RESULT FOUND */}
        {searched && registrationData && (
          <div className="p-10 bg-white border shadow-xl border-slate-300 rounded-3xl">

            <div className="mb-10 text-center">
              <div className="mb-4 text-8xl">
                {statusStyles(registrationData.status).icon}
              </div>

              <h3
                className={`text-4xl font-black ${statusStyles(registrationData.status).color}`}
              >
                {registrationData.status}
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Application Status
              </p>

              {/* REMARK (ALL STATES) */}
              {registrationData.remark && (
                <p className="mt-4 text-lg font-semibold bg-slate-100 p-3 rounded-xl">
                  📝 {registrationData.remark}
                </p>
              )}
            </div>

            {/* DETAILS */}
            <div className="p-8 space-y-4 border bg-slate-100 rounded-2xl border-slate-300">
              <div className="flex justify-between">
                <b>ID:</b> {registrationData.registrationId}
              </div>

              <div className="flex justify-between">
                <b>Name:</b>{" "}
                {registrationData.employeeName ||
                  registrationData.contractorName}
              </div>

              <div className="flex justify-between">
                <b>Email:</b> {registrationData.email}
              </div>

              <div className="flex justify-between">
                <b>Phone:</b>{" "}
                {registrationData.phone || registrationData.mobile}
              </div>

              <div className="flex justify-between">
                <b>Applied On:</b>{" "}
                {new Date(registrationData.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        )}

        {/* NOT FOUND */}
        {searched && notFound && (
          <div className="p-12 text-center bg-white border shadow-xl border-slate-300 rounded-3xl">
            <div className="mb-4 text-7xl">🔍</div>
            <h3 className="mb-2 text-3xl font-black text-slate-900">
              Not Found
            </h3>
            <p className="text-lg text-slate-600">
              Registration ID <b>{registrationId}</b> does not exist.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
