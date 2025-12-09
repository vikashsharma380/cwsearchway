import React, { useState } from "react";
import { UploadButton } from "@uploadthing/react";

export default function Register({ setCurrentPage }) {
  const [submitted, setSubmitted] = useState(false);
  const [registrationId, setRegistrationId] = useState("");
  const [showMore, setShowMore] = useState(false);

  const [formData, setFormData] = useState({
    resume: null,
    agree: false,
  });

  // Input Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agree) {
      alert("Please agree to the Rules & Regulations before submitting.");
      return;
    }
    if (!formData.signature) {
      alert("Please upload your Signature before submitting.");
      return;
    }

    if (!formData.paymentType) {
      alert("Please select a Payment Type before submitting.");
      return;
    }
    if (!formData.utrNumber) {
      alert("Please enter the UTR Number after payment before submitting.");
      return;
    }
    if (
      !formData.employeeName ||
      !formData.dob ||
      !formData.phone ||
      !formData.email
    ) {
      alert("Please fill in all required fields before submitting.");
      return;
    }

    try {
      const res = await fetch(
        "https://cwsearchway.onrender.com/api/registration/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            signatureUrl: formData.signature,
            resumeUrl: formData.resume,
          }),
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

  // THANK YOU PAGE
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
            Candidate Registration Form
          </h2>
        </div>

        <div className="p-10 bg-white border shadow-xl border-slate-200 rounded-3xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
              { label: "Mobile Number", name: "phone" },
              { label: "Email ID", name: "email" },
              { label: "Aadhar Card Number", name: "aadhar" },
              { label: "Pan Card Number", name: "panCard" },
              { label: "Identification Mark", name: "identificationMark" },
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
                <option value="Unmarried">Unmarried</option>
                <option value="Married">Married</option>
              </select>
            </div>

            {/* HUSBAND NAME ONLY WHEN MARRIED */}
            {formData.maritalStatus === "Married" && (
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Spouse Name
                </label>
                <input
                  type="text"
                  name="husbandName"
                  value={formData.husbandName}
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

          {/* EXPERIENCE */}
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

          {/* WORK PREFERENCE */}
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
              <option value="299">
                Part-time job/work, Temporary work, Short-term job/work - ₹299
              </option>
              <option value="499">Internship – ₹499</option>

              <option value="999">Permanent Work/Job– ₹999</option>
            </select>
          </div>

          {/* QR CODE DISPLAY */}
          {formData.paymentType && (
            <div className="mt-4">
              <p className="text-sm font-semibold text-slate-700">
                Scan QR to Pay
              </p>

              {formData.paymentType === "299" && (
                <img
                  src="/__qr_code.png"
                  alt="QR 299"
                  className="w-48 mt-2 border rounded-xl"
                />
              )}

              {formData.paymentType === "499" && (
                <img
                  src="/__qr_code (1).png"
                  alt="QR 499"
                  className="w-48 mt-2 border rounded-xl"
                />
              )}

              {formData.paymentType === "999" && (
                <img
                  src="/999.png"
                  alt="QR 999"
                  className="w-48 mt-2 border rounded-xl"
                />
              )}

              <p className="mt-2 text-xs text-slate-600">
                After payment, enter the UTR Number below.
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
              appearance={{ button: "bg-slate-700 text-white" }}
              onClientUploadComplete={(files) => {
                const file = files[0];
                setFormData((prev) => ({ ...prev, signature: file.url }));
              }}
              onUploadError={(err) => alert(`Upload Error: ${err.message}`)}
            />
          </div>

          {/* RESUME UPLOAD */}
          <div className="mt-6">
            <label className="text-sm font-semibold text-slate-700">
              Resume
            </label>

            <UploadButton
              endpoint="resumeUpload"
              url="https://cwsearchway.onrender.com/api/uploadthing"
              appearance={{ button: "bg-slate-700 text-white" }}
              onClientUploadComplete={(files) => {
                const file = files[0];
                setFormData((prev) => ({ ...prev, resume: file.url }));
              }}
              onUploadError={(err) => alert(`Upload Error: ${err.message}`)}
            />
          </div>

          <div className="p-6 mt-10 border bg-slate-100 rounded-xl border-slate-300">
            <h3 className="text-lg font-bold text-slate-900">
              Rules & Regulations
            </h3>

            {/* Always Visible */}
            <p className="mt-2 text-sm text-slate-600">
              • One time registration fee is charged for providing job
              opportunities and interview coordination.
            </p>

            <p className="mt-2 text-sm text-slate-600">
              • All information provided during registration must be correct.
              Incorrect or incomplete details may lead to cancellation.
            </p>

            <p className="mt-2 text-sm text-slate-600">
              • No agency or company can provide a 100% job selection guarantee.
              Selection depends on company policy and interview performance.
            </p>

            {/* Show More Content */}
            {showMore && (
              <>
                <p className="mt-2 text-sm text-slate-600">
                  • Registration fee is strictly non-refundable under any
                  circumstances.
                </p>

                <p className="mt-2 text-sm text-slate-600">
                  • Registration fee is only a service/processing charge and not
                  a job guarantee.
                </p>

                <p className="mt-2 text-sm text-slate-600">
                  • Additional service charges may apply after selection (if
                  applicable).
                </p>

                <p className="mt-2 text-sm text-slate-600">
                  • Any fraud, misbehavior, or false activity may lead to
                  registration cancellation.
                </p>

                <p className="mt-2 text-sm text-slate-600">
                  • Candidate's personal data will be kept secure and not shared
                  without consent.
                </p>

                <p className="mt-2 text-sm text-slate-600">
                  • After fee payment, the candidate agrees to all Terms &
                  Conditions as a binding agreement.
                </p>
              </>
            )}

            {/* VIEW MORE / VIEW LESS BUTTON */}
            <button
              type="button"
              onClick={() => setShowMore(!showMore)}
              className="mt-3 font-semibold text-cyan-700 hover:underline"
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
