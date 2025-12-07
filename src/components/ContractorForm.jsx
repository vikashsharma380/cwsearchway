import React, { useState } from "react";

export default function ContractorForm({ setCurrentPage }) {
  const [submitted, setSubmitted] = useState(false);
  const [registrationId, setRegistrationId] = useState("");

  const [formData, setFormData] = useState({
    contractorName: "",
    dob: "",
    date: "",
    gender: "",
    maritalStatus: "",
    fatherName: "",
    motherName: "",
    husbandName: "",
    mobile: "",
    email: "",
    aadhar: "",
    pan: "",
    idMark: "",
    address: "",
    education: "",
    experience: "",
    workType: "",
    utrNo: "",
    signature: null,
    agree: false,
  });

  // HANDLE INPUT
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      signature: e.target.files[0]?.name || null,
    }));
  };

  // SUBMIT FORM
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.agree) {
      alert("Please agree to the Rules & Regulations.");
      return;
    }

    const id = "CT" + Date.now();

    const contractorData = {
      ...formData,
      registrationId: id,
      timestamp: new Date().toLocaleString(),
    };

    const saved = JSON.parse(
      localStorage.getItem("cwsearchway_contractors") || "{}"
    );

    saved[id] = contractorData;

    localStorage.setItem("cwsearchway_contractors", JSON.stringify(saved));

    setRegistrationId(id);
    setSubmitted(true);
    setTimeout(() => setCurrentPage("contractor-status"), 2000);
  };

  // SUBMITTED SCREEN
  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-screen pt-32 text-center">
        <div>
          <div className="mb-6 text-8xl animate-bounce">✅</div>
          <h2 className="text-5xl font-black text-slate-900">
            Contractor Registered!
          </h2>

          <p className="mt-2 text-xl text-slate-600">Thank you for applying</p>

          <p className="mt-5 text-slate-600">Registration ID:</p>
          <p className="font-mono text-3xl font-black text-cyan-600">
            {registrationId}
          </p>

          <p className="mt-4 text-sm text-slate-500">
            Redirecting to contractor status page…
          </p>
        </div>
      </div>
    );
  }

  // FORM UI
  return (
    <div className="min-h-screen px-6 pb-12 bg-white pt-28">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="mb-12 text-center">
          <h2 className="text-5xl font-black text-slate-900">
            Contractor Registration Form
          </h2>
          <p className="mt-2 text-lg text-slate-600">
            Fill all details carefully as per your documents.
          </p>
        </div>

        <div className="p-10 bg-white border shadow-xl border-slate-200 rounded-3xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                label: "Contractor Name",
                name: "contractorName",
                type: "text",
              },
              { label: "Date of Birth", name: "dob", type: "date" },
              { label: "Date", name: "date", type: "date" },
              { label: "Father's Name", name: "fatherName", type: "text" },
              { label: "Mother's Name", name: "motherName", type: "text" },
              { label: "Husband's Name", name: "husbandName", type: "text" },
              { label: "Mobile Number", name: "mobile", type: "text" },
              { label: "Email ID", name: "email", type: "email" },
              { label: "Aadhar Number", name: "aadhar", type: "text" },
              { label: "PAN Number", name: "pan", type: "text" },
              { label: "Identification Mark", name: "idMark", type: "text" },
            ].map((field) => (
              <div key={field.name}>
                <label className="text-sm font-semibold text-slate-700">
                  {field.label} *
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full px-4 py-3 mt-1 border bg-slate-100 border-slate-300 rounded-xl text-slate-900"
                />
              </div>
            ))}

            {/* FULL WIDTH INPUT */}
            <div className="md:col-span-3">
              <label className="text-sm font-semibold text-slate-700">
                Permanent Address *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-3 mt-1 border bg-slate-100 border-slate-300 rounded-xl text-slate-900"
              />
            </div>

            <div className="md:col-span-3">
              <label className="text-sm font-semibold text-slate-700">
                Education Qualification *
              </label>
              <input
                type="text"
                name="education"
                value={formData.education}
                onChange={handleChange}
                className="w-full px-4 py-3 mt-1 border bg-slate-100 border-slate-300 rounded-xl text-slate-900"
              />
            </div>

            <div className="md:col-span-3">
              <label className="text-sm font-semibold text-slate-700">
                Experience Details
              </label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full px-4 py-3 mt-1 border bg-slate-100 border-slate-300 rounded-xl text-slate-900"
              />
            </div>

            <div className="md:col-span-3">
              <label className="text-sm font-semibold text-slate-700">
                What Kind Of Contract Do U Want ? *
              </label>
              <input
                type="text"
                name="workType"
                value={formData.workType}
                onChange={handleChange}
                className="w-full px-4 py-3 mt-1 border bg-slate-100 border-slate-300 rounded-xl text-slate-900"
              />
            </div>

            {/* GENDER + MARITAL STATUS */}
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Gender *
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-3 mt-1 border bg-slate-100 border-slate-300 rounded-xl text-slate-900"
              >
                <option>Select</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Marital Status *
              </label>
              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
                className="w-full px-4 py-3 mt-1 border bg-slate-100 border-slate-300 rounded-xl text-slate-900"
              >
                <option>Select</option>
                <option>Unmarried</option>
                <option>Married</option>
              </select>
            </div>

            {/* UTR NO */}
            <div className="md:col-span-3">
              <label className="text-sm font-semibold text-slate-700">
                UTR Number (After Payment) *
              </label>
              <input
                name="utrNo"
                value={formData.utrNo}
                onChange={handleChange}
                className="w-full px-4 py-3 mt-1 border bg-slate-100 border-slate-300 rounded-xl text-slate-900"
              />
            </div>

            {/* SIGNATURE FILE */}
            <div className="md:col-span-3">
              <label className="text-sm font-semibold text-slate-700">
                Upload Your Signature (Max 1MB) *
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full px-4 py-3 mt-1 border bg-slate-100 border-slate-300 rounded-xl"
              />
            </div>
          </div>

          {/* RULES */}
          <div className="p-6 mt-10 border bg-slate-100 rounded-xl border-slate-300">
            <label className="flex items-center gap-2 mt-2 text-slate-800">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                className="w-5 h-5"
              />
              I confirm all details are correct.
            </label>
          </div>

          {/* SUBMIT */}
          <button
            onClick={handleSubmit}
            className="w-full py-4 mt-8 font-black text-white transition bg-gradient-to-r from-cyan-600 to-emerald-600 rounded-xl hover:scale-105"
          >
            🚀 Submit
          </button>
        </div>
      </div>
    </div>
  );
}
