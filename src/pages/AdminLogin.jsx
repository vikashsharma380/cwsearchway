import React, { useState } from "react";

export default function AdminLogin({ setCurrentPage }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // FIXED ADMIN CREDENTIALS
    if (email === "admin@cwsearchway.com" && pass === "admin123") {
      localStorage.setItem("cw_admin_login", "true");
      setCurrentPage("admin-dashboard");
    } else {
      setError("Invalid Email or Password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-black text-center mb-6">Admin Login</h2>

        <form onSubmit={handleLogin} className="space-y-5">

          {error && <p className="text-red-600 text-center">{error}</p>}

          <div>
            <label className="text-slate-600 text-sm font-semibold">Email</label>
            <input
              type="email"
              className="w-full border px-4 py-3 rounded-lg mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@cwsearchway.com"
            />
          </div>

          <div>
            <label className="text-slate-600 text-sm font-semibold">Password</label>
            <input
              type="password"
              className="w-full border px-4 py-3 rounded-lg mt-1"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Enter Password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
