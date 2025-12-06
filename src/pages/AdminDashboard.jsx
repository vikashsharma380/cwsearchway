import React, { useEffect, useState } from "react";

export default function AdminDashboard({ setCurrentPage }) {
  const [data, setData] = useState({});
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem("cwsearchway_registrations") || "{}"
    );
    setData(stored);
  }, []);

  // DELETE USER
  const deleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const copied = { ...data };
      delete copied[id];

      setData(copied);
      localStorage.setItem("cwsearchway_registrations", JSON.stringify(copied));
    }
  };

  // ANALYTICS
  const total = Object.keys(data).length;
  const completedPayments = Object.values(data).filter(
    (u) => u.payment === "Completed"
  ).length;
  const pendingPayments = Object.values(data).filter(
    (u) => u.payment !== "Completed"
  ).length;

  const accepted = Object.values(data).filter(
    (u) => u.status === "Accepted"
  ).length;
  const rejected = Object.values(data).filter(
    (u) => u.status === "Rejected"
  ).length;
  const pending = Object.values(data).filter(
    (u) => u.status === "Pending"
  ).length;

  const openDetails = (item) => setSelected(item);
  const closeDetails = () => setSelected(null);

  return (
    <div className="min-h-screen p-6 bg-slate-50">
      {/* TOP HEADER */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-black text-slate-900">Admin Dashboard</h1>

        <button
          onClick={() => setCurrentPage("home")}
          className="px-6 py-2 font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* ANALYTICS CARDS */}
      <div className="grid grid-cols-1 gap-6 mb-10 md:grid-cols-4">
        <div className="p-6 bg-white border shadow rounded-xl">
          <h3 className="text-sm text-slate-500">Total Registrations</h3>
          <p className="text-3xl font-bold">{total}</p>
        </div>

        <div className="p-6 bg-white border shadow rounded-xl">
          <h3 className="text-sm text-slate-500">Payments Completed</h3>
          <p className="text-3xl font-bold text-green-600">
            {completedPayments}
          </p>
        </div>

        <div className="p-6 bg-white border shadow rounded-xl">
          <h3 className="text-sm text-slate-500">Accepted</h3>
          <p className="text-3xl font-bold text-emerald-600">{accepted}</p>
        </div>

        <div className="p-6 bg-white border shadow rounded-xl">
          <h3 className="text-sm text-slate-500">Pending</h3>
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
                <th className="p-3">Payment</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {Object.values(data).map((item, index) => (
                <tr key={index} className="border-b hover:bg-slate-50">
                  <td className="p-3 font-semibold">{item.registrationId}</td>
                  <td className="p-3">{item.fullName}</td>

                  <td className="p-3 text-center">
                    <span
                      className={`px-3 py-1 text-sm rounded-full ${
                        item.payment === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.payment || "Unpaid"}
                    </span>
                  </td>

                  <td className="p-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-bold ${
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

                  <td className="p-3 space-x-2 text-right">
                    <button
                      onClick={() => openDetails(item)}
                      className="px-4 py-2 text-sm text-white rounded-lg bg-slate-900 hover:bg-slate-800"
                    >
                      View
                    </button>

                    <button
                      onClick={() => deleteUser(item.registrationId)}
                      className="px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {total === 0 && (
                <tr>
                  <td className="p-4 text-center text-slate-500" colSpan="6">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* VIEW DETAILS POPUP */}
      {selected && (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/40">
          <div className="w-full max-w-lg p-6 bg-white border shadow-xl rounded-2xl">
            <h3 className="mb-4 text-xl font-bold">Applicant Details</h3>

            <div className="space-y-1 text-sm">
              <p>
                <b>Name:</b> {selected.fullName}
              </p>
              <p>
                <b>Email:</b> {selected.email}
              </p>
              <p>
                <b>Phone:</b> {selected.phone}
              </p>
              <p>
                <b>Payment:</b> {selected.payment || "Unpaid"}
              </p>
              <p>
                <b>Status:</b> {selected.status}
              </p>
              <p>
                <b>District:</b> {selected.district}
              </p>
              <p>
                <b>Address:</b> {selected.address}
              </p>

              <h4 className="mt-3 font-semibold">Education</h4>
              <ul className="ml-4 list-disc">
                <li>
                  10th: {selected.edu10Percent}% ({selected.edu10Year})
                </li>
                <li>
                  12th: {selected.edu12Percent}% ({selected.edu12Year})
                </li>
                <li>
                  Graduation: {selected.gradPercent}% ({selected.gradYear})
                </li>
              </ul>

              <p>
                <b>Experience:</b> {selected.experience}
              </p>
              <p>
                <b>Applied On:</b> {selected.timestamp}
              </p>
            </div>

            <button
              onClick={closeDetails}
              className="w-full py-2 mt-6 text-white rounded-lg bg-slate-900"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
