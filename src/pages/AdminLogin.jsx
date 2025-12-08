import React, { useState } from "react";

export default function AdminLogin({ setCurrentPage }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

 const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("https://cwsearchway.onrender.com/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: pass }),
    });

    const data = await res.json();

    if (!data.success) {
      setError(data.message);
      return;
    }

    // Save token
    localStorage.setItem("cw_admin_token", data.token);

    // Move to dashboard
    // Move to dashboard
setCurrentPage("admin-dashboard");

  } catch (error) {
    setError("Server error!");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-black text-center mb-6">Admin Login</h2>

        {error && <p className="text-red-600 text-center">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            className="w-full border px-4 py-3 rounded-lg"
            placeholder=""
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full border px-4 py-3 rounded-lg"
            placeholder=""
            onChange={(e) => setPass(e.target.value)}
          />

          <button
            type="submit"
            className="w-full py-3 bg-slate-900 text-white rounded-lg font-bold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
