import React, { useState } from "react";

export default function CheckStatus() {
  const [registrationId, setRegistrationId] = useState("");
  const [registrationData, setRegistrationData] = useState(null);
  const [searched, setSearched] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();

    const registrations = JSON.parse(
      localStorage.getItem("cwsearchway_registrations") || "{}"
    );

    const data = registrations[registrationId];

    if (data) {
      setRegistrationData(data);
      setNotFound(false);
    } else {
      setRegistrationData(null);
      setNotFound(true);
    }

    setSearched(true);
  };

  const getStatusStyles = (status) => {
    if (status === "Accepted")
      return { icon: "✅", color: "from-emerald-500 to-teal-500" };
    if (status === "Rejected")
      return { icon: "❌", color: "from-orange-500 to-red-500" };
    return { icon: "⏳", color: "from-amber-500 to-orange-500" };
  };

  return (
    <div className="min-h-screen px-6 pt-32 pb-12 bg-gradient-to-br from-slate-950 via-cyan-950/10 to-slate-950">
      <div className="max-w-2xl mx-auto">
        {/* HEADER */}
        <div className="mb-8 space-y-4 text-center">
          <h2 className="text-5xl font-black text-white">Check Your Status</h2>
          <p className="text-slate-300">Enter your registration ID</p>
        </div>

        {/* SEARCH BOX */}
        <div className="p-8 mb-8 transition-all border bg-gradient-to-br from-slate-900/60 to-slate-950/60 backdrop-blur-2xl border-slate-700/50 rounded-3xl sm:p-12 hover:border-cyan-400/30">
          <input
            type="text"
            value={registrationId}
            onChange={(e) => setRegistrationId(e.target.value.toUpperCase())}
            placeholder="CW1234567890"
            className="w-full px-6 py-4 mb-4 text-lg font-bold text-white transition-all border bg-slate-800/50 border-slate-600/50 rounded-xl focus:border-cyan-400 focus:outline-none placeholder-slate-500"
          />

          <button
            onClick={handleSearch}
            className="w-full py-4 font-black text-white transition-all bg-gradient-to-r from-cyan-600 to-emerald-600 rounded-xl hover:shadow-2xl hover:shadow-cyan-500/30"
          >
            Search Status
          </button>
        </div>

        {/* -------------------- STATUS FOUND -------------------- */}

        {searched && !notFound && registrationData && (
          <div className="p-8 border bg-gradient-to-br from-slate-900/60 to-slate-950/60 backdrop-blur-2xl border-cyan-400/30 rounded-3xl sm:p-12">
            {/* STATUS ICON */}
            <div className="mb-10 text-center">
              <div className="mb-6 text-8xl animate-bounce">
                {getStatusStyles(registrationData.status).icon}
              </div>

              <h3
                className={`text-4xl font-black bg-gradient-to-r ${
                  getStatusStyles(registrationData.status).color
                } bg-clip-text text-transparent`}
              >
                {registrationData.status}
              </h3>

              <p className="mt-2 text-sm text-slate-400">Application Status</p>
            </div>

            {/* DETAILS */}
            <div className="p-8 space-y-4 border bg-slate-800/30 rounded-2xl border-slate-700/50">
              {[
                { label: "🆔 ID", value: registrationData.registrationId },
                { label: "👤 Name", value: registrationData.fullName },
                { label: "📧 Email", value: registrationData.email },
                { label: "💼 Role", value: registrationData.jobRole },
                { label: "📅 Applied", value: registrationData.timestamp },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between py-3 border-b border-slate-700 last:border-0"
                >
                  <span className="font-bold text-slate-300">
                    {item.label}:
                  </span>

                  <span className="text-slate-200">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* -------------------- NOT FOUND -------------------- */}

        {searched && notFound && (
          <div className="p-12 text-center border bg-gradient-to-br from-slate-900/60 to-slate-950/60 backdrop-blur-2xl border-slate-700/50 rounded-3xl">
            <div className="mb-6 text-7xl">🔍</div>

            <h3 className="mb-3 text-3xl font-black text-white">Not Found</h3>

            <p className="text-lg text-slate-400">
              ID "<strong className="text-slate-300">{registrationId}</strong>"
              not found. Try again.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
