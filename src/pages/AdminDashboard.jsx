import React, { useEffect, useState } from "react";

export default function AdminDashboard({ setCurrentPage }) {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);

  // Fetch all registrations
  const loadData = async () => {
    const res = await fetch("https://cwsearchway.onrender.com/api/admin/all");
    const json = await res.json();
    if (json.success) setData(json.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  // DELETE user
  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    await fetch(`https://cwsearchway.onrender.com/api/admin/delete/${id}`, {
      method: "DELETE",
    });

    loadData();
  };

  // UPDATE status
  const updateStatus = async (id, status) => {
    await fetch(
      `https://cwsearchway.onrender.com/api/admin/update-status/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      }
    );

    loadData();
  };

  // ANALYTICS
  const total = data.length;
  const accepted = data.filter((u) => u.status === "Accepted").length;
  const rejected = data.filter((u) => u.status === "Rejected").length;
  const pending = data.filter((u) => u.status === "Pending").length;

  return (
    <div className="min-h-screen p-6 bg-slate-50">
      {/* Header */}
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
        {[ 
          { label: "Total Registrations", value: total },
          { label: "Accepted", value: accepted, color: "text-green-600" },
          { label: "Rejected", value: rejected, color: "text-red-600" },
          { label: "Pending", value: pending, color: "text-yellow-600" }
        ].map((stat, i) => (
          <div key={i} className="p-6 bg-white border shadow rounded-xl">
            <h3>{stat.label}</h3>
            <p className={`text-3xl font-bold ${stat.color || ""}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* TABLE */}
      <div className="p-6 bg-white border shadow-xl rounded-2xl">
        <h2 className="mb-4 text-xl font-bold">All Applicants</h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b bg-slate-100 text-left">
                <th className="p-3">Reg ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3 text-center">Payment</th>
                <th className="p-3 text-center">Documents</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr key={item._id} className="border-b hover:bg-slate-50">
                  <td className="p-3">{item.registrationId}</td>
                  <td className="p-3">{item.employeeName}</td>
                  <td className="p-3">{item.email}</td>
                  <td className="p-3">{item.phone}</td>

                  {/* PAYMENT */}
                  <td className="p-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-full ${
                        item.payment === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.payment}
                    </span>
                  </td>

                  {/* DOCUMENTS */}
                  <td className="p-3 text-center space-x-4">
                    {item.signature ? (
                      <a
                        href={item.signature}
                        target="_blank"
                        className="text-blue-600 underline text-sm"
                      >
                        Signature
                      </a>
                    ) : (
                      <span className="text-slate-400 text-sm">No Sign</span>
                    )}

                    {item.resume ? (
                      <a
                        href={item.resume}
                        target="_blank"
                        className="text-purple-600 underline text-sm"
                      >
                        Resume
                      </a>
                    ) : (
                      <span className="text-slate-400 text-sm">No Resume</span>
                    )}
                  </td>

                  {/* STATUS */}
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

                  {/* ACTIONS */}
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

              {data.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center p-5 text-slate-500">
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
          <div className="bg-white p-6 rounded-2xl w-full max-w-2xl border shadow-xl overflow-y-auto max-h-[90vh]">
            
            <h3 className="text-2xl font-bold mb-4">Applicant Details</h3>

            <div className="space-y-2">
              <p><b>Name:</b> {selected.employeeName}</p>
              <p><b>DOB:</b> {selected.dob}</p>
              <p><b>Gender:</b> {selected.gender}</p>

              <p><b>Father Name:</b> {selected.fatherName}</p>
              <p><b>Mother Name:</b> {selected.motherName}</p>
              <p><b>Husband Name:</b> {selected.husbandName}</p>

              <p><b>Phone:</b> {selected.phone}</p>
              <p><b>Email:</b> {selected.email}</p>

              <p><b>Aadhar:</b> {selected.aadhar}</p>
              <p><b>PAN:</b> {selected.panCard}</p>

              <p><b>Identification Mark:</b> {selected.identificationMark}</p>

              <p>
                <b>Permanent Address:</b> {selected.permanentAddress}
              </p>
              <p>
                <b>Current Address:</b> {selected.currentAddress}
              </p>

              <h3 className="text-xl font-bold mt-3">Education</h3>
              <p>{selected.eduQualification}</p>
              <p>{selected.additionalQualification}</p>

              <h3 className="text-xl font-bold mt-3">Experience</h3>
              <p>{selected.experienceDetails}</p>

              <h3 className="text-xl font-bold mt-3">Work Preference</h3>
              <p>{selected.workPreference}</p>

              <h3 className="text-xl font-bold mt-3">Payment</h3>
              <p><b>UTR:</b> {selected.utrNumber}</p>
              <p><b>Status:</b> {selected.payment}</p>

              <h3 className="text-xl font-bold mt-3">Documents</h3>

              <p>
                <b>Signature:</b>{" "}
                {selected.signature ? (
                  <a
                    href={selected.signature}
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    View Signature
                  </a>
                ) : (
                  "Not uploaded"
                )}
              </p>

              <p>
                <b>Resume:</b>{" "}
                {selected.resume ? (
                  <a
                    href={selected.resume}
                    target="_blank"
                    className="text-purple-600 underline"
                  >
                    Download Resume
                  </a>
                ) : (
                  "Not uploaded"
                )}
              </p>
            </div>

            <button
              onClick={() => setSelected(null)}
              className="w-full py-3 mt-6 text-white bg-slate-900 rounded-lg"
            >
              Close
            </button>

          </div>
        </div>
      )}
    </div>
  );
}
