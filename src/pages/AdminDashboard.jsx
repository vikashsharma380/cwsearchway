import React, { useEffect, useState } from "react";

export default function AdminDashboard({ setCurrentPage }) {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [editForm, setEditForm] = useState({});

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

  const saveUser = async () => {
    await fetch(
      `https://cwsearchway.onrender.com/api/admin/update/${editUser._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      }
    );

    setEditUser(null);
    loadData();
  };

  useEffect(() => {
    if (editUser) {
      setEditForm(editUser);
    }
  }, [editUser]);

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
          { label: "Pending", value: pending, color: "text-yellow-600" },
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
                <th className="p-3">Utr No.</th>
                <th className="p-3">Payment Type</th>
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
                  <td className="p-3">{item.utrNumber}</td>
                  <td className="p-3">{item.paymentType}</td>
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
                        rel="noopener noreferrer"
                        className="text-purple-600 underline text-sm"
                      >
                        View Resume
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
                      onClick={() => setEditUser(item)}
                      className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg"
                    >
                      Edit
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
              <p>
                <b>Name:</b> {selected.employeeName}
              </p>
              <p>
                <b>DOB:</b> {selected.dob}
              </p>
              <p>
                <b>Gender:</b> {selected.gender}
              </p>

              <p>
                <b>Father Name:</b> {selected.fatherName}
              </p>
              <p>
                <b>Mother Name:</b> {selected.motherName}
              </p>
              <p>
                <b>Spouse Name:</b> {selected.spouseName}
              </p>

              <p>
                <b>Phone:</b> {selected.phone}
              </p>
              <p>
                <b>Email:</b> {selected.email}
              </p>

              <p>
                <b>Aadhar:</b> {selected.aadhar}
              </p>
              <p>
                <b>PAN:</b> {selected.panCard}
              </p>

              <p>
                <b>Identification Mark:</b> {selected.identificationMark}
              </p>

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
              <p>
                <b>UTR:</b> {selected.utrNumber}
              </p>
              <p>
                <b>Status:</b> {selected.payment}
              </p>

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

      {/* FULL EDIT POPUP */}
      {editUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-2xl w-full max-w-3xl border shadow-xl overflow-y-auto max-h-[90vh]">
            <h3 className="text-2xl font-bold mb-4">Edit Applicant Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* NAME */}
              <label>
                <span>Name</span>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={editForm.employeeName || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, employeeName: e.target.value })
                  }
                />
              </label>

              {/* DOB */}
              <label>
                <span>DOB</span>
                <input
                  type="date"
                  className="w-full p-2 border rounded"
                  value={editForm.dob || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, dob: e.target.value })
                  }
                />
              </label>

              {/* Gender */}
              <label>
                <span>Gender</span>
                <select
                  className="w-full p-2 border rounded"
                  value={editForm.gender || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, gender: e.target.value })
                  }
                >
                  <option>Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </label>

              {/* FATHER NAME */}
              <label>
                <span>Father Name</span>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={editForm.fatherName || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, fatherName: e.target.value })
                  }
                />
              </label>

              {/* MOTHER NAME */}
              <label>
                <span>Mother Name</span>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={editForm.motherName || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, motherName: e.target.value })
                  }
                />
              </label>

              {/* SPOUSE NAME */}
              <label>
                <span>Spouse Name</span>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={editForm.spouseName || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, spouseName: e.target.value })
                  }
                />
              </label>

              {/* PHONE */}
              <label>
                <span>Phone</span>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={editForm.phone || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, phone: e.target.value })
                  }
                />
              </label>

              {/* EMAIL */}
              <label>
                <span>Email</span>
                <input
                  type="email"
                  className="w-full p-2 border rounded"
                  value={editForm.email || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                  }
                />
              </label>

              {/* AADHAR */}
              <label>
                <span>Aadhar</span>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={editForm.aadhar || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, aadhar: e.target.value })
                  }
                />
              </label>

              {/* PAN */}
              <label>
                <span>PAN</span>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={editForm.panCard || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, panCard: e.target.value })
                  }
                />
              </label>

              {/* IDENTIFICATION MARK */}
              <label className="md:col-span-2">
                <span>Identification Mark</span>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={editForm.identificationMark || ""}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      identificationMark: e.target.value,
                    })
                  }
                />
              </label>

              {/* ADDRESS */}
              <label className="md:col-span-2">
                <span>Permanent Address</span>
                <textarea
                  className="w-full p-2 border rounded"
                  value={editForm.permanentAddress || ""}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      permanentAddress: e.target.value,
                    })
                  }
                />
              </label>

              {/* EDUCATION */}
              <label className="md:col-span-2">
                <span>Education Qualification</span>
                <textarea
                  className="w-full p-2 border rounded"
                  value={editForm.eduQualification || ""}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      eduQualification: e.target.value,
                    })
                  }
                />
              </label>

              {/* EXPERIENCE */}
              <label className="md:col-span-2">
                <span>Experience Details</span>
                <textarea
                  className="w-full p-2 border rounded"
                  value={editForm.experienceDetails || ""}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      experienceDetails: e.target.value,
                    })
                  }
                />
              </label>

              {/* PAYMENT TYPE */}
              <label>
                <span>Payment Type</span>
                <select
                  className="w-full p-2 border rounded"
                  value={editForm.paymentType || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, paymentType: e.target.value })
                  }
                >
                  <option value="">Select</option>
                  <option value="299">299</option>
                  <option value="499">499</option>
                  <option value="999">999</option>
                </select>
              </label>

              {/* PAYMENT STATUS */}
              <label>
                <span>Payment Status</span>
                <select
                  className="w-full p-2 border rounded"
                  value={editForm.payment || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, payment: e.target.value })
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </label>

              {/* UTR */}
              <label>
                <span>UTR Number</span>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={editForm.utrNumber || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, utrNumber: e.target.value })
                  }
                />
              </label>

              {/* STATUS */}
              <label>
                <span>Status</span>
                <select
                  className="w-full p-2 border rounded"
                  value={editForm.status || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, status: e.target.value })
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </label>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={saveUser}
                className="flex-1 py-3 text-white bg-green-600 rounded-lg"
              >
                Save Changes
              </button>

              <button
                onClick={() => setEditUser(null)}
                className="flex-1 py-3 text-white bg-slate-900 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
