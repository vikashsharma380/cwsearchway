import React, { useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";

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

  const getItemName = (item) =>
    item.contractorName || item.employeeName || item.name || "-";
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



const exportToExcel = (rows, filename) => {
  if (!rows || rows.length === 0) {
    alert("No data available!");
    return;
  }

  // remove Mongo extra fields
  const clean = rows.map(({ __v, _id, ...rest }) => rest);

  const sheet = XLSX.utils.json_to_sheet(clean);
  const book = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(book, sheet, "Data");

  XLSX.writeFile(book, `${filename}.xlsx`);
};


  const handleLogout = () => {
    localStorage.removeItem("cw_admin_token");

    // CLOSE ALL MODALS
    setSelected(null);
    setEditUser(null);
    setRejectUser(null);

    setView("");
    setCurrentPage("admin");
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
        setData((d) =>
          d.map((it) => (it._id === editUser._id ? editForm : it))
        );
      } else {
        await loadContractorData();
        setData((d) =>
          d.map((it) => (it._id === editUser._id ? editForm : it))
        );
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
      accepted: c.filter((x) => normalizeStatus(x.status) === "Accepted")
        .length,
      rejected: c.filter((x) => normalizeStatus(x.status) === "Rejected")
        .length,
    };
    // Contractor stats
    const co = contractorData || [];
    const cont = {
      total: co.length,
      pending: co.filter((x) => normalizeStatus(x.status) === "Pending").length,
      accepted: co.filter((x) => normalizeStatus(x.status) === "Accepted")
        .length,
      rejected: co.filter((x) => normalizeStatus(x.status) === "Rejected")
        .length,
    };

    return { cand, cont };
  }, [candidateData, contractorData]);
const Detail = ({ label, value }) => (
  <div>
    <p className="text-slate-500 text-xs">{label}</p>
    <p className="font-semibold text-slate-800 bg-slate-50 p-2 rounded-lg mt-1">
      {value || "—"}
    </p>
  </div>
);

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
                  <p className="text-sm text-slate-500 mt-1">
                    All registrations for candidates
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">Total</div>
                  <div className="text-3xl font-extrabold">
                    {overview.cand.total}
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl text-center">
                  <div className="text-sm text-slate-500">Pending</div>
                  <div className="text-lg font-semibold text-yellow-600">
                    {overview.cand.pending}
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl text-center">
                  <div className="text-sm text-slate-500">Accepted</div>
                  <div className="text-lg font-semibold text-green-600">
                    {overview.cand.accepted}
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl text-center">
                  <div className="text-sm text-slate-500">Rejected</div>
                  <div className="text-lg font-semibold text-red-600">
                    {overview.cand.rejected}
                  </div>
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
                  <p className="text-sm text-slate-500 mt-1">
                    All contractor registrations
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">Total</div>
                  <div className="text-3xl font-extrabold">
                    {overview.cont.total}
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl text-center">
                  <div className="text-sm text-slate-500">Pending</div>
                  <div className="text-lg font-semibold text-yellow-600">
                    {overview.cont.pending}
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl text-center">
                  <div className="text-sm text-slate-500">Approved</div>
                  <div className="text-lg font-semibold text-green-600">
                    {overview.cont.accepted}
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl text-center">
                  <div className="text-sm text-slate-500">Rejected</div>
                  <div className="text-lg font-semibold text-red-600">
                    {overview.cont.rejected}
                  </div>
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
      <div className="max-w-full mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold">
              {view === "candidate"
                ? "Candidate Dashboard"
                : "Contractor Dashboard"}
            </h1>
            <p className="text-sm text-slate-500">
              Filter and manage registrations
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setSelected(null);
                setEditUser(null);
                setRejectUser(null);
                setView("");
              }}
              className="px-4 py-2 bg-gray-800 text-white rounded-md"
            >
              Back
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md"
            >
              Logout
            </button>
          </div>
        </div>
   <div className="flex items-center gap-3">

  {/* DOWNLOAD XLS BUTTON */}
  <button
    onClick={() =>
      exportToExcel(
        data,
        view === "candidate"
          ? "CandidateData"
          : "ContractorData"
      )
    }
    className="px-4 py-2 bg-green-700 text-white rounded-md"
  >
    Download XLS
  </button>

  {/* BACK BUTTON */}
  <button
    onClick={() => {
      setSelected(null);
      setEditUser(null);
      setRejectUser(null);
      setView("");
    }}
    className="px-4 py-2 bg-gray-800 text-white rounded-md"
  >
    Back
  </button>

  {/* LOGOUT */}
  <button
    onClick={handleLogout}
    className="px-4 py-2 bg-red-600 text-white rounded-md"
  >
    Logout
  </button>
</div>



        {/* Filters & Search */}
        <div className="bg-white p-4 rounded-2xl shadow mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilterKey(f.key)}
                className={`px-3 py-2 rounded-full text-sm font-medium ${
                  filterKey === f.key
                    ? "bg-cyan-600 text-white"
                    : "bg-slate-100 text-slate-700"
                }`}
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
            <div className="text-2xl font-bold text-yellow-600">
              {tableStats.pending}
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl shadow text-center">
            <div className="text-sm text-slate-500">Accepted</div>
            <div className="text-2xl font-bold text-green-600">
              {tableStats.accepted}
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl shadow text-center">
            <div className="text-sm text-slate-500">Rejected</div>
            <div className="text-2xl font-bold text-red-600">
              {tableStats.rejected}
            </div>
          </div>
        </div>

        {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-x-auto">
  <table className="w-full min-w-[1000px]">
    <thead className="bg-slate-100">
      <tr>
        <th className="p-3 text-left">Reg ID</th>
        <th className="p-3 text-left">Name</th>
        <th className="p-3 text-left">Phone</th>
        <th className="p-3 text-left">UTR Number</th>
        <th className="p-3 text-left">Payment Type</th>
        <th className="p-3 text-left">Payment</th>
        <th className="p-3 text-left">Date</th>
        <th className="p-3 text-left">Status</th>
        <th className="p-3 text-right">Actions</th>
      </tr>
    </thead>

    <tbody>
      {filteredData.length === 0 && (
        <tr>
          <td colSpan={9} className="p-6 text-center text-slate-500">
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
            <td className="p-3">{item.utrNumber || "-"}</td>
            <td className="p-3">{item.paymentType || "Pending"}</td>
            <td className="p-3">{item.payment || "-"}</td>

            <td className="p-3">
              {date ? date.toLocaleString() : "-"}
            </td>

            <td className="p-3">
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  status === "Accepted"
                    ? "bg-green-100 text-green-700"
                    : status === "Rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {status}
              </span>
            </td>

            <td className="p-3 text-right space-x-2 whitespace-nowrap">
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
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-6 overflow-y-auto max-h-[90vh]">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold">User Details</h3>
        <button onClick={() => setSelected(null)} className="text-slate-600 text-xl">✖</button>
      </div>

      {/* DETAILS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">

        <Detail label="Registration ID" value={selected.registrationId} />
        <Detail label="Name" value={selected.employeeName || selected.contractorName} />
        <Detail label="Date of Birth" value={selected.dob} />
        <Detail label="Gender" value={selected.gender} />
        <Detail label="Marital Status" value={selected.maritalStatus} />
        <Detail label="Father Name" value={selected.fatherName} />
        <Detail label="Mother Name" value={selected.motherName} />
        <Detail label="Spouse Name" value={selected.spouseName} />

        <Detail label="Phone" value={selected.phone || selected.mobile} />
        <Detail label="Email" value={selected.email} />
        <Detail label="Aadhar" value={selected.aadhar || selected.aadhaarCard} />
        <Detail label="PAN Card" value={selected.panCard} />
        <Detail label="Identification Mark" value={selected.identificationMark} />

        <Detail label="Education" value={selected.eduQualification} />
        <Detail label="Additional Qualification" value={selected.additionalQualification} />

        <Detail label="Work Preference" value={selected.workPreference} />
        <Detail label="Experience" value={selected.experienceDetails} />

        <Detail label="Payment Type" value={selected.paymentType} />
        <Detail label="Payment Status" value={selected.payment} />
        <Detail label="UTR Number" value={selected.utrNumber} />

        <Detail label="Status" value={selected.status} />
        <Detail label="Remark" value={selected.remark} />

      </div>

      {/* ADDRESS */}
      <div className="mt-4">
        <h4 className="font-semibold text-slate-700">Permanent Address</h4>
        <p className="text-slate-600 mt-1 bg-slate-50 p-3 rounded-xl">{selected.permanentAddress}</p>
      </div>

      {/* SIGNATURE */}
      <div className="mt-6">
        <h4 className="font-semibold text-slate-700">Signature</h4>
        {selected.signature ? (
          <img
            src={selected.signature}
            alt="Signature"
            className="w-40 h-20 object-contain mt-2 border rounded"
          />
        ) : (
          <p className="text-slate-500 mt-1">No signature uploaded</p>
        )}
      </div>

      {/* RESUME */}
      <div className="mt-6">
        <h4 className="font-semibold text-slate-700">Resume</h4>
        {selected.resume ? (
          <a
            href={selected.resume}
            target="_blank"
            className="text-blue-600 underline text-sm"
          >
            View Resume (PDF)
          </a>
        ) : (
          <p className="text-slate-500 mt-1">No resume uploaded</p>
        )}
      </div>

      {/* CLOSE BUTTON */}
      <div className="mt-6">
        <button
          onClick={() => setSelected(null)}
          className="w-full py-3 bg-slate-900 text-white rounded-lg"
        >
          Close
        </button>
      </div>

    </div>
  </div>
)}

        {/* EDIT Modal */}
{editUser && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-6 overflow-y-auto max-h-[90vh]">

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold">Edit Candidate Details</h3>
        <button onClick={() => setEditUser(null)} className="text-slate-500 text-xl">✖</button>
      </div>

      {/* FORM START */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* NAME */}
        <div>
          <label className="text-sm text-slate-600">Employee Name</label>
          <input
            type="text"
            value={editForm.employeeName || ""}
            onChange={(e) => setEditForm({ ...editForm, employeeName: e.target.value })}
            className="w-full border rounded-xl px-3 py-2"
          />
        </div>

        {/* DOB */}
        <div>
          <label className="text-sm text-slate-600">Date of Birth</label>
          <input
            type="date"
            value={editForm.dob || ""}
            onChange={(e) => setEditForm({ ...editForm, dob: e.target.value })}
            className="w-full border rounded-xl px-3 py-2"
          />
        </div>

        {/* GENDER */}
        <div>
          <label className="text-sm text-slate-600">Gender</label>
          <select
            value={editForm.gender || ""}
            onChange={(e) => setEditForm({ ...editForm, gender: e.target.value })}
            className="w-full border rounded-xl px-3 py-2"
          >
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        {/* MARITAL STATUS */}
        <div>
          <label className="text-sm text-slate-600">Marital Status</label>
          <select
            value={editForm.maritalStatus || ""}
            onChange={(e) => setEditForm({ ...editForm, maritalStatus: e.target.value })}
            className="w-full border rounded-xl px-3 py-2"
          >
            <option value="">Select</option>
            <option>Single</option>
            <option>Married</option>
          </select>
        </div>

        {/* FATHER NAME */}
        <div>
          <label className="text-sm text-slate-600">Father Name</label>
          <input
            type="text"
            value={editForm.fatherName || ""}
            onChange={(e) => setEditForm({ ...editForm, fatherName: e.target.value })}
            className="w-full border rounded-xl px-3 py-2"
          />
        </div>

        {/* MOTHER NAME */}
        <div>
          <label className="text-sm text-slate-600">Mother Name</label>
          <input
            type="text"
            value={editForm.motherName || ""}
            onChange={(e) => setEditForm({ ...editForm, motherName: e.target.value })}
            className="w-full border rounded-xl px-3 py-2"
          />
        </div>

        {/* SPOUSE NAME */}
        <div>
          <label className="text-sm text-slate-600">Spouse Name</label>
          <input
            type="text"
            value={editForm.spouseName || ""}
            onChange={(e) => setEditForm({ ...editForm, spouseName: e.target.value })}
            className="w-full border rounded-xl px-3 py-2"
          />
        </div>

        {/* PHONE */}
        <div>
          <label className="text-sm text-slate-600">Phone Number</label>
          <input
            type="text"
            value={editForm.phone || ""}
            onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
            className="w-full border rounded-xl px-3 py-2"
          />
        </div>

        {/* EMAIL */}
        <div>
          <label className="text-sm text-slate-600">Email</label>
          <input
            type="email"
            value={editForm.email || ""}
            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
            className="w-full border rounded-xl px-3 py-2"
          />
        </div>

        {/* AADHAR */}
        <div>
          <label className="text-sm text-slate-600">Aadhar Number</label>
          <input
            type="text"
            value={editForm.aadhar || ""}
            onChange={(e) => setEditForm({ ...editForm, aadhar: e.target.value })}
            className="w-full border rounded-xl px-3 py-2"
          />
        </div>

        {/* PAN CARD */}
        <div>
          <label className="text-sm text-slate-600">PAN Card</label>
          <input
            type="text"
            value={editForm.panCard || ""}
            onChange={(e) => setEditForm({ ...editForm, panCard: e.target.value })}
            className="w-full border rounded-xl px-3 py-2"
          />
        </div>

        {/* IDENTIFICATION MARK */}
        <div>
          <label className="text-sm text-slate-600">Identification Mark</label>
          <input
            type="text"
            value={editForm.identificationMark || ""}
            onChange={(e) => setEditForm({ ...editForm, identificationMark: e.target.value })}
            className="w-full border rounded-xl px-3 py-2"
          />
        </div>

        {/* PERMANENT ADDRESS */}
        <div className="md:col-span-2">
          <label className="text-sm text-slate-600">Permanent Address</label>
          <textarea
            value={editForm.permanentAddress || ""}
            onChange={(e) => setEditForm({ ...editForm, permanentAddress: e.target.value })}
            className="w-full border rounded-xl px-3 py-2"
            rows="2"
          ></textarea>
        </div>

        {/* EDUCATION */}
        <div>
          <label className="text-sm text-slate-600">Education Qualification</label>
          <input
            type="text"
            value={editForm.eduQualification || ""}
            onChange={(e) => setEditForm({ ...editForm, eduQualification: e.target.value })}
            className="w-full border rounded-xl px-3 py-2"
          />
        </div>

        {/* Additional Qualification */}
        <div>
          <label className="text-sm text-slate-600">Additional Qualification</label>
          <input
            type="text"
            value={editForm.additionalQualification || ""}
            onChange={(e) =>
              setEditForm({ ...editForm, additionalQualification: e.target.value })
            }
            className="w-full border rounded-xl px-3 py-2"
          />
        </div>

        {/* Experience */}
        <div className="md:col-span-2">
          <label className="text-sm text-slate-600">Experience Details</label>
          <textarea
            value={editForm.experienceDetails || ""}
            onChange={(e) => setEditForm({ ...editForm, experienceDetails: e.target.value })}
            className="w-full border rounded-xl px-3 py-2"
            rows="2"
          ></textarea>
        </div>

        {/* Work Preference */}
        <div>
          <label className="text-sm text-slate-600">Work Preference</label>
          <input
            type="text"
            value={editForm.workPreference || ""}
            onChange={(e) => setEditForm({ ...editForm, workPreference: e.target.value })}
            className="w-full border rounded-xl px-3 py-2"
          />
        </div>

        {/* Payment Type */}
        <div>
          <label className="text-sm text-slate-600">Payment Type</label>
          <select
            value={editForm.paymentType || ""}
            onChange={(e) => setEditForm({ ...editForm, paymentType: e.target.value })}
            className="w-full border rounded-xl px-3 py-2"
          >
            <option>Select</option>
            <option value="299">299</option>
            <option value="499">499</option>
          </select>
        </div>

        {/* UTR NUMBER */}
        <div>
          <label className="text-sm text-slate-600">UTR Number</label>
          <input
            type="text"
            value={editForm.utrNumber || ""}
            onChange={(e) => setEditForm({ ...editForm, utrNumber: e.target.value })}
            className="w-full border rounded-xl px-3 py-2"
          />
        </div>

        {/* PAYMENT STATUS */}
        <div>
          <label className="text-sm text-slate-600">Payment Status</label>
          <select
            value={editForm.payment || ""}
            onChange={(e) => setEditForm({ ...editForm, payment: e.target.value })}
            className="w-full border rounded-xl px-3 py-2"
          >
            <option value="">Select</option>
            <option>Pending</option>
            <option>Paid</option>
          </select>
        </div>

        {/* RESUME */}
        <div>
          <label className="text-sm text-slate-600">Resume (PDF Link)</label>
          <input
            type="text"
            value={editForm.resume || ""}
            onChange={(e) => setEditForm({ ...editForm, resume: e.target.value })}
            className="w-full border rounded-xl px-3 py-2"
          />
          {editForm.resume && (
            <a href={editForm.resume} target="_blank" className="text-blue-600 text-sm underline">
              View Resume
            </a>
          )}
        </div>

        {/* SIGNATURE */}
        <div>
          <label className="text-sm text-slate-600">Signature Image URL</label>
          <input
            type="text"
            value={editForm.signature || ""}
            onChange={(e) => setEditForm({ ...editForm, signature: e.target.value })}
            className="w-full border rounded-xl px-3 py-2"
          />
          {editForm.signature && (
            <img
              src={editForm.signature}
              alt="Signature"
              className="w-32 h-16 object-contain mt-2 border rounded"
            />
          )}
        </div>

      </div>
      {/* FORM END */}

      {/* BUTTONS */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={saveUser}
          className="flex-1 py-3 bg-green-600 text-white rounded-lg text-lg"
        >
          Save Changes
        </button>

        <button
          onClick={() => setEditUser(null)}
          className="flex-1 py-3 bg-slate-800 text-white rounded-lg text-lg"
        >
          Cancel
        </button>
      </div>

    </div>
  </div>
)}



        {rejectUser && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-2xl w-full max-w-lg shadow-xl">
              <h2 className="text-xl font-bold mb-3">Reject Application</h2>

              <p className="text-sm text-slate-600 mb-2">
                <b>{rejectUser.contractorName || rejectUser.employeeName}</b> को
                reject करने का कारण लिखें:
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
                    await updateStatus(
                      rejectUser._id,
                      "Rejected",
                      rejectRemark
                    );
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
