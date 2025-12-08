import React, { useState } from "react";
import { UploadButton } from "@uploadthing/react";

export default function ContractorRegister({ setCurrentPage }) {
  const [submitted, setSubmitted] = useState(false);
  const [registrationId, setRegistrationId] = useState("");
  const [showMore, setShowMore] = useState(false);

  const [formData, setFormData] = useState({
    contractorName: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    spouseName: "",
    fatherName: "",
    motherName: "",
    phone: "",
    email: "",
    aadhaarCard: "",
    panCard: "",
    identificationMark: "",
    permanentAddress: "",
    educationQualification: "",
    experienceDetails: "",
    workType: "",
    utrNumber: "",
    signature: null,
    agree: false,
  });

  // Input Change
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agree) {
      return alert("Please accept all terms before submitting.");
    }

    try {
      const res = await fetch(
        "https://cwsearchway.onrender.com/api/contractor/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (data.success) {
        setRegistrationId(data.registrationId);
        setSubmitted(true);

        setTimeout(() => setCurrentPage("status"), 2000);
      } else {
        alert(data.message || "Something went wrong!");
      }
    } catch (err) {
      alert("Server Error: " + err.message);
    }
  };

  // SUCCESS SCREEN
  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-screen pt-32 text-center">
        <div>
          <div className="mb-6 text-8xl animate-bounce">✅</div>
          <h2 className="text-5xl font-black text-slate-900">
            Registration Complete!
          </h2>
          <p className="mt-4 text-xl text-slate-600">Your Registration ID:</p>
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
        <h2 className="mb-12 text-5xl font-black text-center text-slate-900">
          Contractor Registration
        </h2>

        <form
          onSubmit={handleSubmit}
          className="p-10 bg-white border shadow-xl border-slate-200 rounded-3xl"
        >
          {/* GRID FIELDS */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { label: "Contractor Name", name: "contractorName" },
              { label: "Date of Birth", name: "dob", type: "date" },
              {
                label: "Gender",
                name: "gender",
                type: "select",
                options: ["Male", "Female", "Other"],
              },
              { label: "Father's Name", name: "fatherName" },
              { label: "Mother's Name", name: "motherName" },
              { label: "Mobile Number", name: "phone" },
              { label: "Email ID", name: "email" },
              { label: "Aadhaar Number", name: "aadhaarCard" },
              { label: "PAN Card Number", name: "panCard" },
              {
                label: "Identification Mark",
                name: "identificationMark",
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
                    <option value="">Select</option>
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

            {/* MARITAL STATUS */}
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Marital Status
              </label>
              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
                className="w-full px-4 py-3 mt-1 border bg-slate-100 border-slate-300 rounded-xl"
              >
                <option value="">Select</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
              </select>
            </div>

            {/* SPOUSE NAME */}
            {formData.maritalStatus === "married" && (
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Spouse Name
                </label>
                <input
                  type="text"
                  name="spouseName"
                  value={formData.spouseName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 mt-1 border bg-slate-100 border-slate-300 rounded-xl"
                />
              </div>
            )}
          </div>

          {/* ADDRESS */}
          <div className="mt-6">
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

          {/* EDUCATION */}
          <div className="mt-6">
            <label className="text-sm font-semibold text-slate-700">
              Education Qualification
            </label>
            <textarea
              name="educationQualification"
              value={formData.educationQualification}
              onChange={handleChange}
              className="w-full px-4 py-3 mt-1 border bg-slate-100 border-slate-300 rounded-xl"
            />
          </div>

          {/* EXPERIENCE */}
          <div className="mt-6">
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

         {/* WORK TYPE */}
<div className="mt-6">
  <label className="text-sm font-semibold text-slate-700">
    Work Type *
  </label>

  <select
    name="workType"
    value={formData.workType}
    onChange={handleChange}
    className="w-full px-4 py-3 mt-1 border bg-slate-100 border-slate-300 rounded-xl"
  >
    <option value="">Select Work Type</option>
    <option value="Electrician">Electrician</option>
    <option value="Plumber">Plumber</option>
    <option value="Civil Work">Civil Work</option>
    <option value="Mason">Mason</option>
    <option value="Painter">Painter</option>
    <option value="Carpenter">Carpenter</option>
    <option value="Labour">Labour</option>
    <option value="Welder">Welder</option>
    <option value="Operator">Operator</option>
    <option value="Driver">Driver</option>
    <option value="Other">Other</option>
  </select>

  {/* OTHER WORK TYPE INPUT */}
  {formData.workType === "Other" && (
    <input
      type="text"
      name="workTypeOther"
      onChange={(e) =>
        setFormData((prev) => ({
          ...prev,
          workType: e.target.value, // overwrite workType with custom
        }))
      }
      placeholder="Enter your work type"
      className="w-full px-4 py-3 mt-3 border bg-slate-100 border-slate-300 rounded-xl"
    />
  )}
</div>
{/* PAYMENT TYPE */}
<div className="mt-6">
  <label className="text-sm font-semibold text-slate-700">
    Select Payment Type *
  </label>

  <select
    name="paymentType"
    value={formData.paymentType}
    onChange={handleChange}
    className="w-full px-4 py-3 mt-1 border bg-slate-100 border-slate-300 rounded-xl"
  >
    <option value="">Select</option>
    <option value="999">Registration – ₹999</option>
    <option value="1499">Premium Registration – ₹1499</option>
  </select>
</div>

{/* QR CODE DISPLAY */}
{formData.paymentType && (
  <div className="mt-4">
    <p className="text-sm font-semibold text-slate-700">
      Scan QR to Pay
    </p>

    {formData.paymentType === "999" && (
      <img
        src="/999.png"
        alt="QR 999"
        className="w-48 rounded-xl border mt-2"
      />
    )}

    {formData.paymentType === "1499" && (
      <img
        src="/1499.png"
        alt="QR 1499"
        className="w-48 rounded-xl border mt-2"
      />
    )}

    <p className="text-xs text-slate-600 mt-2">
      After payment, please enter UTR number below.
    </p>
  </div>
)}


          {/* UTR NUMBER */}
          <div className="mt-6">
            <label className="text-sm font-semibold text-slate-700">
              UTR Number (After Payment)
            </label>
            <input
              type="text"
              name="utrNumber"
              value={formData.utrNumber}
              onChange={handleChange}
              className="w-full px-4 py-3 mt-1 border bg-slate-100 border-slate-300 rounded-xl"
            />
          </div>

          {/* SIGNATURE UPLOAD */}
          <div className="mt-6">
            <label className="text-sm font-semibold text-slate-700">
              Upload Signature *
            </label>
            <UploadButton
              endpoint="signatureUpload"
              url="https://cwsearchway.onrender.com/api/uploadthing"
              onClientUploadComplete={(files) => {
                const file = files[0];
                setFormData((prev) => ({ ...prev, signature: file.url }));
              }}
              onUploadError={(err) => alert("Upload Error: " + err.message)}
            />
          </div>

          {/* RULES */}
       <div className="p-6 mt-10 border bg-slate-100 rounded-xl border-slate-300">
  <h3 className="text-lg font-bold text-slate-900">
    Rules & Regulations
  </h3>

  {/* Always Visible */}
  <p className="mt-2 text-sm text-slate-600">
    • Job registration fee of ₹299 / ₹499 is charged for providing job opportunities and interview coordination.
  </p>

  <p className="mt-2 text-sm text-slate-600">
    • All information provided during registration must be correct. Incorrect or incomplete details may lead to cancellation.
  </p>

  <p className="mt-2 text-sm text-slate-600">
    • No agency or company can provide a 100% job selection guarantee. Selection depends on company policy and interview performance.
  </p>

  {/* Show More Content */}
  {showMore && (
    <>
      <p className="mt-2 text-sm text-slate-600">
        • Registration fee is strictly non-refundable under any circumstances.
      </p>

      <p className="mt-2 text-sm text-slate-600">
        • Registration fee is only a service/processing charge and not a job guarantee.
      </p>

      <p className="mt-2 text-sm text-slate-600">
        • Additional service charges may apply after selection (if applicable).
      </p>

      <p className="mt-2 text-sm text-slate-600">
        • Any fraud, misbehavior, or false activity may lead to registration cancellation.
      </p>

      <p className="mt-2 text-sm text-slate-600">
        • Candidate's personal data will be kept secure and not shared without consent.
      </p>

      <p className="mt-2 text-sm text-slate-600">
        • After fee payment, the candidate agrees to all Terms & Conditions as a binding agreement.
      </p>
    </>
  )}

  {/* VIEW MORE / VIEW LESS BUTTON */}
  <button
    type="button"
    onClick={() => setShowMore(!showMore)}
    className="mt-3 text-cyan-700 font-semibold hover:underline"
  >
    {showMore ? "View Less" : "View More"}
  </button>

  {/* Checkbox */}
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


          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full py-4 mt-8 font-black text-white transition bg-gradient-to-r from-cyan-600 to-emerald-600 rounded-xl hover:scale-105"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}
