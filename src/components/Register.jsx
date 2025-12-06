import React, { useState } from "react";

export default function Register({ setCurrentPage }) {
  const [openRules, setOpenRules] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    fatherName: "",
    motherName: "",
    maritalStatus: "",
    aadhar: "",
    address: "",
    district: "",
    policeStation: "",
    state: "",
    pincode: "",
    edu10Board: "",
    edu10Percent: "",
    edu10Year: "",
    edu12Board: "",
    edu12Percent: "",
    edu12Year: "",
    gradBoard: "",
    gradPercent: "",
    gradYear: "",
    postGradBoard: "",
    postGradPercent: "",
    postGradYear: "",
    experience: "",
    resume: null,
    agree: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [registrationId, setRegistrationId] = useState("");

  // INPUT CHANGE
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
      resume: e.target.files[0]?.name || null,
    }));
  };

  // SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.agree) {
      alert("Please agree to the Rules & Regulations before submitting.");
      return;
    }

    const id = "CW" + Date.now();
    const registrationData = {
      ...formData,
      registrationId: id,
      status: ["Pending", "Accepted", "Rejected"][
        Math.floor(Math.random() * 3)
      ],
      timestamp: new Date().toLocaleString(),
    };

    const registrations = JSON.parse(
      localStorage.getItem("cwsearchway_registrations") || "{}"
    );

    registrations[id] = registrationData;

    localStorage.setItem(
      "cwsearchway_registrations",
      JSON.stringify(registrations)
    );

    setRegistrationId(id);
    setSubmitted(true);
    setTimeout(() => setCurrentPage("status"), 2000);
  };

  // SUBMITTED SCREEN
  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-screen pt-32 text-center">
        <div>
          <div className="mb-6 text-8xl animate-bounce">✅</div>
          <h2 className="text-5xl font-black text-slate-900">
            Application Submitted!
          </h2>

          <p className="mt-2 text-xl text-slate-600">Your journey begins now</p>

          <p className="mt-5 text-slate-600">Registration ID:</p>
          <p className="font-mono text-3xl font-black text-cyan-600">
            {registrationId}
          </p>

          <p className="mt-4 text-sm text-slate-500">
            Redirecting to status page…
          </p>
        </div>
      </div>
    );
  }

  // MAIN FORM
  return (
    <div className="min-h-screen px-6 pb-12 bg-white pt-28">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="mb-12 text-center">
          <h2 className="text-5xl font-black text-slate-900">
            Registration Form
          </h2>
          <p className="mt-2 text-lg text-slate-600">
            Fill all details carefully as per your documents.
          </p>
        </div>

        {/* FORM BOX */}
        <div className="p-10 bg-white border shadow-xl border-slate-200 rounded-3xl">
          {/* GRID */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { label: "Full Name", name: "fullName", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Phone", name: "phone", type: "text" },
              { label: "Date of Birth", name: "dob", type: "date" },
              { label: "Father's Name", name: "fatherName", type: "text" },
              { label: "Mother's Name", name: "motherName", type: "text" },
              { label: "Aadhar Number", name: "aadhar", type: "text" },
              { label: "District", name: "district", type: "text" },
              { label: "Police Station", name: "policeStation", type: "text" },
              { label: "State", name: "state", type: "text" },
              { label: "Pincode", name: "pincode", type: "text" },
            ].map((field) => (
              <div key={field.name}>
                <label className="text-sm font-semibold text-slate-700">
                  {field.label}
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

            {/* ADDRESS FULL WIDTH */}
            <div className="md:col-span-3">
              <label className="text-sm font-semibold text-slate-700">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-3 mt-1 border bg-slate-100 border-slate-300 rounded-xl text-slate-900"
              />
            </div>

            {/* DROPDOWNS */}
            {[
              {
                label: "Gender",
                name: "gender",
                options: ["Select", "Male", "Female", "Other"],
              },
              {
                label: "Marital Status",
                name: "maritalStatus",
                options: ["Select", "Single", "Married"],
              },
              {
                label: "Experience",
                name: "experience",
                options: ["Select", "Fresher", "1 Year", "2 Years", "3+ Years"],
              },
            ].map((field) => (
              <div key={field.name}>
                <label className="text-sm font-semibold text-slate-700">
                  {field.label}
                </label>
                <select
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full px-4 py-3 mt-1 border bg-slate-100 border-slate-300 rounded-xl text-slate-900"
                >
                  {field.options.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {/* EDUCATION TABLE */}
          <h3 className="mt-10 mb-4 text-xl font-bold text-slate-900">
            Educational Details
          </h3>

          <div className="grid grid-cols-4 gap-4 text-sm font-semibold text-slate-600">
            <p>Qualification</p>
            <p>Board / University</p>
            <p>Percentage</p>
            <p>Year</p>
          </div>

          {[
            { q: "10th", b: "edu10Board", p: "edu10Percent", y: "edu10Year" },
            { q: "12th", b: "edu12Board", p: "edu12Percent", y: "edu12Year" },
            {
              q: "Graduation",
              b: "gradBoard",
              p: "gradPercent",
              y: "gradYear",
            },
            {
              q: "Post Graduation",
              b: "postGradBoard",
              p: "postGradPercent",
              y: "postGradYear",
            },
          ].map((row) => (
            <div key={row.q} className="grid grid-cols-4 gap-4 mt-2">
              <input
                readOnly
                value={row.q}
                className="px-3 py-2 rounded-lg bg-slate-200 text-slate-700"
              />
              <input
                name={row.b}
                value={formData[row.b]}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg bg-slate-100 border-slate-300 text-slate-900"
              />
              <input
                name={row.p}
                value={formData[row.p]}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg bg-slate-100 border-slate-300 text-slate-900"
              />
              <input
                name={row.y}
                value={formData[row.y]}
                onChange={handleChange}
                className="px-3 py-2 border rounded-lg bg-slate-100 border-slate-300 text-slate-900"
              />
            </div>
          ))}

          {/* RESUME */}
          <div className="mt-8">
            <label className="text-sm font-semibold text-slate-700">
              Resume (Optional)
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full px-4 py-3 mt-1 border bg-slate-100 border-slate-300 rounded-xl text-slate-900"
            />
          </div>

          {/* RULES */}
          <div className="p-6 mt-10 border bg-slate-100 rounded-xl border-slate-300">
            <h3 className="text-lg font-bold text-slate-900">
              Rules & Regulations
            </h3>

            {!openRules ? (
              <>
                <p className="mt-2 text-sm text-slate-600">
                  • Candidate must follow all company rules.
                </p>
                <p className="text-sm text-slate-600">
                  • Registration fee is non-refundable.
                </p>

                <button
                  onClick={() => setOpenRules(true)}
                  className="mt-3 underline text-cyan-600"
                >
                  Read More
                </button>
              </>
            ) : (
              <>
                <div className="mt-3 space-y-2 text-sm text-slate-700">
                  <p>• Job registration fee ₹299 is compulsory.</p>
                  <p>• No refund after payment.</p>
                  <p>• Documents must be correct.</p>
                  <p>• Company is not responsible for false documents.</p>
                  <p>• Behaviour issues may lead to termination.</p>
                  <p>• Data remains confidential.</p>
                </div>

                <button
                  onClick={() => setOpenRules(false)}
                  className="mt-3 underline text-cyan-600"
                >
                  Read Less
                </button>
              </>
            )}

            <label className="flex items-center gap-2 mt-4 text-slate-800">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                className="w-5 h-5"
              />
              I agree to all Rules & Regulations.
            </label>
          </div>

          {/* SUBMIT */}
          <button
            onClick={handleSubmit}
            className="w-full py-4 mt-8 font-black text-white transition bg-gradient-to-r from-cyan-600 to-emerald-600 rounded-xl hover:scale-105"
          >
            🚀 Submit Application
          </button>
        </div>
      </div>
    </div>
  );
}
