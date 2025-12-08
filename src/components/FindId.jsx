import React, { useState } from "react";

export default function FindId({ setCurrentPage }) {
  const [form, setForm] = useState({
    employeeName: "",
    phone: "",
    email: "",
    dob: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(
      "https://cwsearchway.onrender.com/api/registration/find-id",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      setResult(data.registrationId);
    } else {
      setResult("NOT_FOUND");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-6 pt-28 bg-white">
      <div className="max-w-xl w-full p-8 bg-white shadow-xl rounded-2xl border border-slate-200">

        <h2 className="text-3xl font-bold text-center mb-6">
          Find Your Registration ID
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="font-semibold">Full Name</label>
            <input
              type="text"
              name="employeeName"
              value={form.employeeName}
              onChange={handleChange}
              className="w-full p-3 border mt-1 rounded-xl bg-slate-100"
              required
            />
          </div>

          <div>
            <label className="font-semibold">Mobile Number</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full p-3 border mt-1 rounded-xl bg-slate-100"
              required
            />
          </div>

          <div>
            <label className="font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border mt-1 rounded-xl bg-slate-100"
              required
            />
          </div>

          <div>
            <label className="font-semibold">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              className="w-full p-3 border mt-1 rounded-xl bg-slate-100"
              required
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:scale-105 transition"
          >
            {loading ? "Searching..." : "Find My Registration ID"}
          </button>
        </form>

        {/* RESULT BOX */}
        {result && (
          <div className="mt-6 p-4 rounded-xl border bg-slate-50 text-center">
            {result === "NOT_FOUND" ? (
              <p className="text-red-600 font-semibold">
                ❌ No matching registration found!
              </p>
            ) : (
              <>
                <p className="text-green-700 text-lg font-semibold">
                  ✅ Your Registration ID:
                </p>
                <p className="text-3xl font-black text-cyan-600 mt-1">
                  {result}
                </p>
              </>
            )}
          </div>
        )}

        <button
          onClick={() => setCurrentPage("home")}
          className="w-full mt-6 py-3 bg-slate-200 rounded-xl text-slate-700 font-semibold hover:bg-slate-300"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
