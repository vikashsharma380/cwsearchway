import React, { useState } from "react";

export default function CheckStatus() {
  const [registrationId, setRegistrationId] = useState("");
  const [registrationData, setRegistrationData] = useState(null);
  const [searched, setSearched] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!registrationId.trim()) return;

    try {
      const res = await fetch(
        `https://cwsearchway.onrender.com/api/registration/status/${registrationId}`
      );

      const data = await res.json();

      if (data.success) {
        setRegistrationData(data.data);
        setNotFound(false);
      } else {
        setRegistrationData(null);
        setNotFound(true);
      }

      setSearched(true);
    } catch (error) {
      console.error("Error:", error);
      setNotFound(true);
      setSearched(true);
    }
  };

  const statusStyles = (status) => {
    if (status === "Accepted") return { icon: "✅", color: "text-emerald-600" };
    if (status === "Rejected") return { icon: "❌", color: "text-red-500" };
    return { icon: "⏳", color: "text-amber-500" };
  };

  return (
    <div className="min-h-screen px-6 pt-32 pb-12 bg-white">
      <div className="max-w-2xl mx-auto">

        {/* HEADER */}
        <div className="mb-10 text-center">
          <h2 className="text-5xl font-black text-slate-900">Check Your Status</h2>
          <p className="mt-2 text-slate-600">Enter your registration ID below.</p>
        </div>

        {/* SEARCH */}
        <div className="p-8 mb-8 bg-white border shadow-lg border-slate-300 rounded-2xl">
          <input
            type="text"
            value={registrationId}
            onChange={(e) => setRegistrationId(e.target.value.toUpperCase())}
            placeholder="CW1234567890"
            className="w-full px-6 py-4 mb-4 text-lg font-bold border bg-slate-100 border-slate-300 rounded-xl text-slate-900 placeholder-slate-400"
          />

          <button
            onClick={handleSearch}
            className="w-full py-4 font-bold text-white bg-slate-900 rounded-xl hover:bg-slate-800"
          >
            Search Status
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
                className={`text-4xl font-black ${
                  statusStyles(registrationData.status).color
                }`}
              >
                {registrationData.status}
              </h3>

              <p className="mt-2 text-sm text-slate-500">Application Status</p>

              {/* ⭐ SHOW REJECTION REMARK HERE */}
              {registrationData.status === "Rejected" &&
                registrationData.remark && (
                  <p className="mt-4 text-lg font-semibold text-red-600 bg-red-50 p-3 rounded-xl">
                    ❗ Reason for Rejection: {registrationData.remark}
                  </p>
                )}
            </div>

            {/* DETAILS */}
            <div className="p-8 space-y-4 border bg-slate-100 rounded-2xl border-slate-300">
              {[
                { label: "🆔 ID", value: registrationData.registrationId },
                { label: "👤 Name", value: registrationData.employeeName },
                { label: "📧 Email", value: registrationData.email },
                { label: "📱 Phone", value: registrationData.phone },
                {
                  label: "📅 Applied On",
                  value: new Date(registrationData.timestamp).toLocaleString(),
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between py-3 border-b border-slate-300 last:border-0"
                >
                  <span className="font-bold text-slate-700">{item.label}:</span>
                  <span className="text-slate-900">{item.value}</span>
                </div>
              ))}
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
              Registration ID "
              <strong className="text-slate-800">{registrationId}</strong>" does
              not exist.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
