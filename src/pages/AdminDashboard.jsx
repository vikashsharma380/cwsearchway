import React, { useEffect, useMemo, useState } from "react";

/**
 * Admin Dashboard (upgraded)
 * - Shows two cards: Candidate / Contractor (with stats)
 * - Click card to open table view
 * - Table view has filters: Today / Yesterday / 7 Days / This Month / All Time
 * - Search input (name, reg id, phone)
 * - Normalizes date fields:
 *    - Contractor: createdAt (timestamps:true)
 *    - Candidate: timestamp (your Registration schema)
 */

const FILTERS = [
  { key: "today", label: "Today" },
  { key: "yesterday", label: "Yesterday" },
  { key: "7days", label: "Last 7 Days" },
  { key: "month", label: "This Month" },
  { key: "all", label: "All Time" },
];

export default function AdminDashboard({ setCurrentPage }) {
  const [view, setView] = useState(""); // "" | "candidate" | "contractor"
  const [candidateData, setCandidateData] = useState([]);
  const [contractorData, setContractorData] = useState([]);
const [rejectUser, setRejectUser] = useState(null);
const [rejectRemark, setRejectRemark] = useState("");

  // table states
  const [data, setData] = useState([]);
  const [filterKey, setFilterKey] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [editForm, setEditForm] = useState({});

  // -------------------------
  // Helpers
  // -------------------------
  const parseItemDate = (item, kind) => {
    // kind: "candidate" or "contractor"
    if (kind === "contractor") {
      // contractor uses createdAt (timestamps:true)
      return item.createdAt ? new Date(item.createdAt) : null;
    } else {
      // candidate uses timestamp field
      return item.timestamp ? new Date(item.timestamp) : null;
    }
  };

  const normalizeStatus = (raw) => {
    if (!raw) return "Pending";
    const s = String(raw).toLowerCase();
    if (s === "approved") return "Accepted";
    if (s === "accepted") return "Accepted";
    if (s === "rejected") return "Rejected";
    if (s === "pending") return "Pending";
    return raw;
  };

  const getItemName = (item) => item.contractorName || item.employeeName || item.name || "-";
  const getItemPhone = (item) => item.mobile || item.phone || "-";
  const getItemRegId = (item) => item.registrationId || item.regId || "-";

  // -------------------------
  // Load overview stats
  // -------------------------
  const loadCandidateData = async () => {
    try {
      const res = await fetch("https://cwsearchway.onrender.com/api/admin/all");
      const json = await res.json();
      if (json.success) setCandidateData(json.data || []);
    } catch (err) {
      console.error("Candidate load error:", err);
    }
  };

  const handleLogout = () => {
  localStorage.removeItem("cw_admin_token");  // token delete
  setView("");                                // dashboard view reset
  setCurrentPage("admin");                    // admin login page par bhejo
};


  const loadContractorData = async () => {
    try {
      const res = await fetch(
        "https://cwsearchway.onrender.com/api/admin/all-contractors"
      );
      const json = await res.json();
      if (json.success) setContractorData(json.data || []);
    } catch (err) {
      console.error("Contractor load error:", err);
    }
  };

  useEffect(() => {
    loadCandidateData();
    loadContractorData();
  }, []);

  // -------------------------
  // When a view selected, load that data into `data`
  // -------------------------
  const loadViewData = async (v) => {
    setSearch("");
    setFilterKey("all");
    setSelected(null);
    setEditUser(null);

    if (v === "candidate") {
      // we've already fetched candidateData for stats; reuse if present else refetch
      if (candidateData.length > 0) {
        setData(candidateData);
      } else {
        await loadCandidateData();
        setData(candidateData);
      }
    } else if (v === "contractor") {
      if (contractorData.length > 0) {
        setData(contractorData);
      } else {
        await loadContractorData();
        setData(contractorData);
      }
    }
  };

  useEffect(() => {
    if (view) loadViewData(view);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);

  // -------------------------
  // Delete, update status, save edit
  // -------------------------
  const deleteUser = async (id) => {
    if (!window.confirm("Delete this record?")) return;

    const url =
      view === "candidate"
        ? `https://cwsearchway.onrender.com/api/admin/delete/${id}`
        : `https://cwsearchway.onrender.com/api/admin/delete-contractor/${id}`;

    try {
      await fetch(url, { method: "DELETE" });
      // refresh
      if (view === "candidate") {
        await loadCandidateData();
        setData((d) => d.filter((x) => x._id !== id));
      } else {
        await loadContractorData();
        setData((d) => d.filter((x) => x._id !== id));
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

const updateStatus = async (id, status, remark = "") => {
  const url =
    view === "candidate"
      ? `https://cwsearchway.onrender.com/api/admin/update-status/${id}`
      : `https://cwsearchway.onrender.com/api/admin/update-status-contractor/${id}`;

  await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status, remark }),
  });

  // Instead of loadData(), reload correct list
  if (view === "candidate") {
    await loadCandidateData();
    setData(candidateData); // refresh table
  } else {
    await loadContractorData();
    setData(contractorData);
  }
};



  const saveUser = async () => {
    if (!editUser) return;
    const url =
      view === "candidate"
        ? `https://cwsearchway.onrender.com/api/admin/update/${editUser._id}`
        : `https://cwsearchway.onrender.com/api/admin/update-contractor/${editUser._id}`;

    try {
      await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      setEditUser(null);
      // refresh lists
      if (view === "candidate") {
        await loadCandidateData();
        setData((d) => d.map((it) => (it._id === editUser._id ? editForm : it)));
      } else {
        await loadContractorData();
        setData((d) => d.map((it) => (it._id === editUser._id ? editForm : it)));
      }
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  useEffect(() => {
    if (editUser) setEditForm(editUser);
  }, [editUser]);

  // -------------------------
  // Date range helpers for filters (local dates)
  // -------------------------
  const getRange = (key) => {
    const now = new Date();
    const start = new Date(now);
    const end = new Date(now);

    if (key === "today") {
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
    } else if (key === "yesterday") {
      start.setDate(now.getDate() - 1);
      start.setHours(0, 0, 0, 0);
      end.setDate(now.getDate() - 1);
      end.setHours(23, 59, 59, 999);
    } else if (key === "7days") {
      start.setDate(now.getDate() - 6); // last 7 days including today
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
    } else if (key === "month") {
      start.setDate(1);
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
    } else {
      // all
      return [null, null];
    }
    return [start, end];
  };

  // -------------------------
  // Filtered data based on filterKey + search
  // -------------------------
  const filteredData = useMemo(() => {
    if (!data) return [];

    const [start, end] = getRange(filterKey);

    return data.filter((item) => {
      // date check
      const itemDate = parseItemDate(item, view);
      if (start && end) {
        if (!itemDate) return false;
        if (itemDate < start || itemDate > end) return false;
      }

      // search check
      if (search && search.trim().length > 0) {
        const q = search.toLowerCase();
        const name = (getItemName(item) || "").toString().toLowerCase();
        const phone = (getItemPhone(item) || "").toString().toLowerCase();
        const reg = (getItemRegId(item) || "").toString().toLowerCase();

        if (!name.includes(q) && !phone.includes(q) && !reg.includes(q)) {
          return false;
        }
      }

      return true;
    });
  }, [data, filterKey, search, view]);

  // -------------------------
  // Filter stats (for table view)
  // -------------------------
  const tableStats = useMemo(() => {
    const total = filteredData.length;
    let pending = 0,
      accepted = 0,
      rejected = 0;
    filteredData.forEach((it) => {
      const s = normalizeStatus(it.status);
      if (s === "Pending") pending++;
      else if (s === "Accepted") accepted++;
      else if (s === "Rejected") rejected++;
    });
    return { total, pending, accepted, rejected };
  }, [filteredData]);

  // -------------------------
  // Overview stats for the cards (unfiltered, all-time)
  // -------------------------
  const overview = useMemo(() => {
    // Candidate stats
    const c = candidateData || [];
    const cand = {
      total: c.length,
      pending: c.filter((x) => normalizeStatus(x.status) === "Pending").length,
      accepted: c.filter((x) => normalizeStatus(x.status) === "Accepted").length,
      rejected: c.filter((x) => normalizeStatus(x.status) === "Rejected").length,
    };
    // Contractor stats
    const co = contractorData || [];
    const cont = {
      total: co.length,
      pending: co.filter((x) => normalizeStatus(x.status) === "Pending").length,
      accepted: co.filter((x) => normalizeStatus(x.status) === "Accepted").length,
      rejected: co.filter((x) => normalizeStatus(x.status) === "Rejected").length,
    };

    return { cand, cont };
  }, [candidateData, contractorData]);

  // -------------------------
  // UI: Cards view (initial)
  // -------------------------
  if (!view) {
    return (
      <div className="min-h-screen p-6 bg-gradient-to-br from-slate-100 to-slate-200">
        <div className="max-w-6xl mx-auto">
          <header className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-extrabold">Admin Dashboard</h1>
          <button
  onClick={handleLogout}
  className="px-4 py-2 bg-red-600 text-white rounded-md"
>
  Logout
</button>

          </header>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Candidate Card */}
            <div
              onClick={() => setView("candidate")}
              className="cursor-pointer bg-white rounded-2xl p-6 shadow hover:shadow-2xl transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Candidate Data</h2>
                  <p className="text-sm text-slate-500 mt-1">All registrations for candidates</p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">Total</div>
                  <div className="text-3xl font-extrabold">{overview.cand.total}</div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl text-center">
                  <div className="text-sm text-slate-500">Pending</div>
                  <div className="text-lg font-semibold text-yellow-600">{overview.cand.pending}</div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl text-center">
                  <div className="text-sm text-slate-500">Accepted</div>
                  <div className="text-lg font-semibold text-green-600">{overview.cand.accepted}</div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl text-center">
                  <div className="text-sm text-slate-500">Rejected</div>
                  <div className="text-lg font-semibold text-red-600">{overview.cand.rejected}</div>
                </div>
              </div>
            </div>

            {/* Contractor Card */}
            <div
              onClick={() => setView("contractor")}
              className="cursor-pointer bg-white rounded-2xl p-6 shadow hover:shadow-2xl transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Contractor Data</h2>
                  <p className="text-sm text-slate-500 mt-1">All contractor registrations</p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">Total</div>
                  <div className="text-3xl font-extrabold">{overview.cont.total}</div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl text-center">
                  <div className="text-sm text-slate-500">Pending</div>
                  <div className="text-lg font-semibold text-yellow-600">{overview.cont.pending}</div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl text-center">
                  <div className="text-sm text-slate-500">Approved</div>
                  <div className="text-lg font-semibold text-green-600">{overview.cont.accepted}</div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl text-center">
                  <div className="text-sm text-slate-500">Rejected</div>
                  <div className="text-lg font-semibold text-red-600">{overview.cont.rejected}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------
  // Table View UI
  // -------------------------
  return (
    <div className="min-h-screen p-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold">{view === "candidate" ? "Candidate Dashboard" : "Contractor Dashboard"}</h1>
            <p className="text-sm text-slate-500">Filter and manage registrations</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setView("")}
              className="px-4 py-2 bg-gray-800 text-white rounded-md"
            >
              Back
            </button>

            <button
              onClick={() => setCurrentPage("home")}
              className="px-4 py-2 bg-red-600 text-white rounded-md"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white p-4 rounded-2xl shadow mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilterKey(f.key)}
                className={`px-3 py-2 rounded-full text-sm font-medium ${filterKey === f.key ? "bg-cyan-600 text-white" : "bg-slate-100 text-slate-700"}`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="text-sm text-slate-500 mr-2">Search</div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Name, Reg ID or phone"
              className="px-3 py-2 border rounded-xl w-[300px]"
            />
          </div>
        </div>

        {/* Table Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-white rounded-xl shadow text-center">
            <div className="text-sm text-slate-500">Total</div>
            <div className="text-2xl font-bold">{tableStats.total}</div>
          </div>

          <div className="p-4 bg-white rounded-xl shadow text-center">
            <div className="text-sm text-slate-500">Pending</div>
            <div className="text-2xl font-bold text-yellow-600">{tableStats.pending}</div>
          </div>

          <div className="p-4 bg-white rounded-xl shadow text-center">
            <div className="text-sm text-slate-500">Accepted</div>
            <div className="text-2xl font-bold text-green-600">{tableStats.accepted}</div>
          </div>

          <div className="p-4 bg-white rounded-xl shadow text-center">
            <div className="text-sm text-slate-500">Rejected</div>
            <div className="text-2xl font-bold text-red-600">{tableStats.rejected}</div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3 text-left">Reg ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Payment</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-slate-500">
                    No records found for these filters.
                  </td>
                </tr>
              )}

              {filteredData.map((item) => {
                const date = parseItemDate(item, view);
                const status = normalizeStatus(item.status);
                return (
                  <tr key={item._id} className="border-b hover:bg-slate-50">
                    <td className="p-3">{getItemRegId(item)}</td>
                    <td className="p-3">{getItemName(item)}</td>
                    <td className="p-3">{getItemPhone(item)}</td>
                    <td className="p-3">{item.payment || (item.paymentType ? `₹${item.paymentType}` : "Pending")}</td>
                    <td className="p-3">{date ? date.toLocaleString() : "-"}</td>
                    <td className="p-3">
                      <span className={`px-3 py-1 rounded-full text-sm ${status === "Accepted" ? "bg-green-100 text-green-700" : status === "Rejected" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>
                        {status}
                      </span>
                    </td>

                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => setSelected(item)}
                        className="px-3 py-2 bg-slate-900 text-white rounded-md text-sm"
                      >
                        View
                      </button>

                      <button
                        onClick={() => setEditUser(item)}
                        className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => updateStatus(item._id, "Accepted")}
                        className="px-3 py-2 bg-green-600 text-white rounded-md text-sm"
                      >
                        Accept
                      </button>

                     <button
  onClick={() => {
    setRejectUser(item);
    setRejectRemark("");
  }}
  className="px-3 py-2 bg-yellow-600 text-white rounded-md text-sm"
>
  Reject
</button>


                      <button
                        onClick={() => deleteUser(item._id)}
                        className="px-3 py-2 bg-red-600 text-white rounded-md text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* VIEW Modal */}
        {selected && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 overflow-y-auto max-h-[90vh]">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">Details</h3>
                <button onClick={() => setSelected(null)} className="text-slate-500">Close</button>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl">
                <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(selected, null, 2)}</pre>
              </div>

              <div className="mt-4">
                <button onClick={() => setSelected(null)} className="w-full py-3 bg-slate-900 text-white rounded-lg">Close</button>
              </div>
            </div>
          </div>
        )}

        {/* EDIT Modal */}
        {editUser && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-6 overflow-y-auto max-h-[90vh]">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">Edit Record (JSON)</h3>
                <button onClick={() => setEditUser(null)} className="text-slate-500">Cancel</button>
              </div>

              <textarea
                className="w-full p-4 border rounded-xl h-72"
                value={JSON.stringify(editForm, null, 2)}
                onChange={(e) => {
                  try {
                    setEditForm(JSON.parse(e.target.value));
                  } catch (err) {
                    // ignore parse errors while typing
                  }
                }}
              />

              <div className="flex gap-3 mt-4">
                <button onClick={saveUser} className="flex-1 py-3 bg-green-600 text-white rounded-lg">Save</button>
                <button onClick={() => setEditUser(null)} className="flex-1 py-3 bg-slate-800 text-white rounded-lg">Cancel</button>
              </div>
            </div>
          </div>
        )}
{rejectUser && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
    <div className="bg-white p-6 rounded-2xl w-full max-w-lg shadow-xl">

      <h2 className="text-xl font-bold mb-3">Reject Application</h2>

      <p className="text-sm text-slate-600 mb-2">
        <b>{rejectUser.contractorName || rejectUser.employeeName}</b> को reject करने का कारण लिखें:
      </p>

      <textarea
        value={rejectRemark}
        onChange={(e) => setRejectRemark(e.target.value)}
        placeholder="Reason for rejection..."
        className="w-full border p-3 rounded-xl h-32"
      />

      <div className="flex gap-3 mt-5">
        <button
          onClick={async () => {
            await updateStatus(rejectUser._id, "Rejected", rejectRemark);
            setRejectUser(null);
          }}
          className="flex-1 py-3 bg-red-600 text-white rounded-lg"
        >
          Submit
        </button>

        <button
          onClick={() => setRejectUser(null)}
          className="flex-1 py-3 bg-slate-800 text-white rounded-lg"
        >
          Cancel
        </button>
      </div>

    </div>
  </div>
)}



      </div>
    </div>
  );
}
