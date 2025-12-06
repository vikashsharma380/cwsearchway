import React, { useEffect, useState } from "react";

export default function AdminDashboard({ setCurrentPage }) {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);

  // Fetch all registrations
  const loadData = async () => {
    const res = await fetch("http://localhost:5000/api/admin/all");
    const json = await res.json();
    if (json.success) setData(json.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  // DELETE user from DB
  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    await fetch(`http://localhost:5000/api/admin/delete/${id}`, {
      method: "DELETE",
    });

    loadData();
  };

  // UPDATE status
  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:5000/api/admin/update-status/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    loadData();
  };

  // ANALYTICS
  const total = data.length;
  const accepted = data.filter((u) => u.status === "Accepted").length;
  const rejected = data.filter((u) => u.status === "Rejected").length;
  const pending = data.filter((u) => u.status === "Pending").length;

  return (
    <div className="min-h-screen p-6 bg-slate-50">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-black">Admin Dashboard</h1>

        <button
          onClick={() => setCurrentPage("home")}
          className="px-6 py-2 text-white bg-red-600 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">
        <div className="p-6 bg-white border shadow rounded-xl">
          <h3>Total Registrations</h3>
          <p className="text-3xl font-bold">{total}</p>
        </div>

        <div className="p-6 bg-white border shadow rounded-xl">
          <h3>Accepted</h3>
          <p className="text-3xl font-bold text-green-600">{accepted}</p>
        </div>

        <div className="p-6 bg-white border shadow rounded-xl">
          <h3>Rejected</h3>
          <p className="text-3xl font-bold text-red-600">{rejected}</p>
        </div>

        <div className="p-6 bg-white border shadow rounded-xl">
          <h3>Pending</h3>
          <p className="text-3xl font-bold text-yellow-600">{pending}</p>
        </div>
      </div>

      {/* MAIN TABLE */}
      <div className="p-6 bg-white border shadow-xl rounded-2xl">
        <h2 className="mb-4 text-xl font-bold">All Applicants</h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b bg-slate-100">
                <th className="p-3 text-left">Reg ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr key={item._id} className="border-b hover:bg-slate-50">
                  <td className="p-3">{item.registrationId}</td>
                  <td className="p-3">{item.fullName}</td>
                  <td className="p-3">{item.email}</td>
                  <td className="p-3">{item.phone}</td>

                  <td className="p-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-full ${
                        item.status === "Accepted"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => setSelected(item)}
                      className="px-4 py-2 text-sm text-white bg-slate-900 rounded-lg"
                    >
                      View
                    </button>

                    <button
                      onClick={() => updateStatus(item._id, "Accepted")}
                      className="px-4 py-2 text-sm text-white bg-green-600 rounded-lg"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() => updateStatus(item._id, "Rejected")}
                      className="px-4 py-2 text-sm text-white bg-yellow-600 rounded-lg"
                    >
                      Reject
                    </button>

                    <button
                      onClick={() => deleteUser(item._id)}
                      className="px-4 py-2 text-sm text-white bg-red-600 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {total === 0 && (
                <tr>
                  <td className="p-4 text-center text-slate-500" colSpan={6}>
                    No applicants found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAILS POPUP */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-2xl w-full max-w-xl border shadow-xl">
            <h3 className="text-xl font-bold mb-4">Applicant Details</h3>

            <div className="space-y-1">
              <p><b>Name:</b> {selected.fullName}</p>
              <p><b>Email:</b> {selected.email}</p>
              <p><b>Phone:</b> {selected.phone}</p>
              <p><b>Status:</b> {selected.status}</p>
              <p><b>Address:</b> {selected.address}</p>

              <h4 className="mt-3 font-semibold">Education</h4>
              <ul className="ml-5 list-disc">
                <li>10th: {selected.edu10Percent}% ({selected.edu10Year})</li>
                <li>12th: {selected.edu12Percent}% ({selected.edu12Year})</li>
                <li>Graduation: {selected.gradPercent}% ({selected.gradYear})</li>
              </ul>

              <p><b>Experience:</b> {selected.experience}</p>
            </div>

            <button
              onClick={() => setSelected(null)}
              className="w-full py-2 mt-6 text-white bg-slate-900 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
