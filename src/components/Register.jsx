import React, { useState } from "react";

export default function Register({ setCurrentPage }) {
  const [openRules, setOpenRules] = useState(false);

  const [formData, setFormData] = useState({
    employeeName: "",
    dob: "",
    gender: "",
    fatherName: "",
    motherName: "",
    husbandName: "",
    phone: "",
    email: "",
    aadhar: "",
    panCard: "",
    identificationMark: "",
    maritalStatus: "",
    permanentAddress: "",
    currentAddress: "",
    eduQualification: "",
    additionalQualification: "",
    experienceDetails: "",
    workPreference: "",
    utrNumber: "",
    signature: null,
    resume: null,
    agree: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [registrationId, setRegistrationId] = useState("");

  // Input Handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSignatureChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      signature: e.target.files[0],
    }));
  };

  const handleResumeChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      resume: e.target.files[0],
    }));
  };

  // Form Submit
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.agree) {
    alert("Please agree to the Rules & Regulations before submitting.");
    return;
  }

  const fd = new FormData();

  // Append ALL text fields safely
  Object.keys(formData).forEach((key) => {
    if (key !== "signature" && key !== "resume" && key !== "agree") {
      if (formData[key] !== null && formData[key] !== undefined) {
        fd.append(key, formData[key]);
      }
    }
  });

  // Append files only if selected
  if (formData.signature instanceof File) {
    fd.append("signature", formData.signature);
  }

  if (formData.resume instanceof File) {
    fd.append("resume", formData.resume);
  }

  try {
    const res = await fetch(
      "https://cwsearchway.onrender.com/api/registration/register",
      {
        method: "POST",
        body: fd, // ❗IMPORTANT: no headers
      }
    );

    const data = await res.json();
    console.log("Response:", data);

    if (data.success) {
      setRegistrationId(data.registrationId);
      setSubmitted(true);
      setTimeout(() => setCurrentPage("status"), 2000);
    } else {
      alert("Something went wrong!");
    }
  } catch (error) {
    alert("Server Error: " + error.message);
  }
};


  // Thank You Screen
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
        </div>
      </div>
    );
  }

  // MAIN FORM
  return (
    <div className="min-h-screen px-6 pb-12 bg-white pt-28">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-5xl font-black text-slate-900">
            Registration Form
          </h2>
        </div>

        <div className="p-10 bg-white border shadow-xl border-slate-200 rounded-3xl">
          {/* GRID FIELDS */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* PERSONAL DETAILS */}
            {[
              { label: "Employee Name", name: "employeeName" },
              { label: "Date of Birth", name: "dob", type: "date" },
              {
                label: "Gender",
                name: "gender",
                type: "select",
                options: ["Select", "Male", "Female", "Other"],
              },
              { label: "Father's Name", name: "fatherName" },
              { label: "Mother's Name", name: "motherName" },
              { label: "Husband's Name", name: "husbandName" },
              { label: "Mobile Number", name: "phone" },
              { label: "Email ID", name: "email" },
              { label: "Aadhar Card Number", name: "aadhar" },
              { label: "Pan Card Number", name: "panCard" },
              { label: "Identification Mark", name: "identificationMark" },
              {
                label: "Marital Status",
                name: "maritalStatus",
                type: "select",
                options: ["Select", "Unmarried", "Married"],
              },
            ].map((field) => (
              <div key={field.name}>
                <label className="text-sm font-semibold text-slate-700">
                  {field.label}
                </label>

                {field.type === "select" ? (
                  <select
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="w-full px-4 py-3 mt-1 border bg-slate-100 border-slate-300 rounded-xl"
                  >
                    {field.options.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type || "text"}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="w-full px-4 py-3 mt-1 border bg-slate-100 border-slate-300 rounded-xl"
                  />
                )}
              </div>
            ))}

            {/* ADDRESSES */}
            <div className="md:col-span-3">
              <label className="text-sm font-semibold text-slate-700">
                Permanent Address
              </label>
              <textarea
                name="permanentAddress"
                value={formData.permanentAddress}
                onChange={handleChange}
                className="w-full px-4 py-3 mt-1 border bg-slate-100 border-slate-300 rounded-xl"
              />
            </div>

            <div className="md:col-span-3">
              <label className="text-sm font-semibold text-slate-700">
                Current Address
              </label>
              <textarea
                name="currentAddress"
                value={formData.currentAddress}
                onChange={handleChange}
                className="w-full px-4 py-3 mt-1 border bg-slate-100 border-slate-300 rounded-xl"
              />
            </div>
          </div>

          {/* EDUCATION & EXPERIENCE */}
          <div className="mt-6">
            <label className="text-sm font-semibold text-slate-700">
              Education Qualification
            </label>
            <textarea
              name="eduQualification"
              value={formData.eduQualification}
              onChange={handleChange}
              className="w-full px-4 py-3 mt-1 border bg-slate-100 border-slate-300 rounded-xl"
            />
          </div>

          <div className="mt-4">
            <label className="text-sm font-semibold text-slate-700">
              Additional Qualification
            </label>
            <textarea
              name="additionalQualification"
              value={formData.additionalQualification}
              onChange={handleChange}
              className="w-full px-4 py-3 mt-1 border bg-slate-100 border-slate-300 rounded-xl"
            />
          </div>

          <div className="mt-4">
            <label className="text-sm font-semibold text-slate-700">
              Experience Details
            </label>
            <textarea
              name="experienceDetails"
              value={formData.experienceDetails}
              onChange={handleChange}
              className="w-full px-4 py-3 mt-1 border bg-slate-100 border-slate-300 rounded-xl"
            />
          </div>

          <div className="mt-4">
            <label className="text-sm font-semibold text-slate-700">
              What You Like To Do
            </label>
            <textarea
              name="workPreference"
              value={formData.workPreference}
              onChange={handleChange}
              className="w-full px-4 py-3 mt-1 border bg-slate-100 border-slate-300 rounded-xl"
            />
          </div>

          {/* UTR NUMBER */}
          <div className="mt-6">
            <label className="text-sm font-semibold text-slate-700">
              UTR Number (after payment)
            </label>
            <input
              type="text"
              name="utrNumber"
              value={formData.utrNumber}
              onChange={handleChange}
              className="w-full px-4 py-3 mt-1 border bg-slate-100 border-slate-300 rounded-xl"
            />
          </div>

          {/* SIGNATURE */}
          <div className="mt-6">
            <label className="text-sm font-semibold text-slate-700">
              Upload Signature *
            </label>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.webp"
              onChange={handleSignatureChange}
              className="w-full px-4 py-3 mt-1 border bg-slate-100 border-slate-300 rounded-xl"
            />
          </div>

          {/* RESUME */}
          <div className="mt-6">
            <label className="text-sm font-semibold text-slate-700">
              Resume
            </label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleResumeChange}
              className="w-full px-4 py-3 mt-1 border bg-slate-100 border-slate-300 rounded-xl"
            />
          </div>

          {/* RULES */}
          <div className="p-6 mt-10 border bg-slate-100 rounded-xl border-slate-300">
            <h3 className="text-lg font-bold text-slate-900">
              Rules & Regulations
            </h3>

            <p className="mt-2 text-sm text-slate-600">
              • Registration fee is non-refundable.
            </p>
            <p className="text-sm text-slate-600">
              • All information must match your documents.
            </p>

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
            Submit Application
          </button>
        </div>
      </div>
    </div>
  );
}
