import React, { useState, useEffect } from "react";
import logoImage from "./assets/logo.png";

// Lucide Icons (Home renamed → HomeIcon)
import { Home as HomeIcon, Info, Sparkles, BarChart3 } from "lucide-react";

const Navbar = ({ currentPage, setCurrentPage }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => setScrolled(window.scrollY > 50));
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-gradient-to-b from-slate-950/95 to-transparent backdrop-blur-xl border-b border-emerald-500/20"
          : "bg-transparent"
      } h-20 flex items-center`}
    >
      <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
        {/* LOGO */}
        <button
          onClick={() => setCurrentPage("home")}
          className="group flex items-center gap-0"
        >
          <img
            src={logoImage}
            alt="CWSearchWay"
            className="h-48 w-48 object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
          />
        </button>

        {/* NAV LINKS */}
        <div className="hidden lg:flex gap-1 items-center bg-white/5 backdrop-blur-xl rounded-2xl p-1 border border-white/10">
          {[
            { id: "home", label: "Home", icon: <HomeIcon size={16} /> },
            { id: "about", label: "About", icon: <Info size={16} /> },
            { id: "services", label: "Features", icon: <Sparkles size={16} /> },
            { id: "status", label: "Status", icon: <BarChart3 size={16} /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`px-5 py-2 rounded-xl font-semibold flex items-center gap-2 transition-all ${
                currentPage === item.id
                  ? "bg-gradient-to-r from-cyan-600 to-emerald-600 text-white shadow-lg shadow-cyan-500/30"
                  : "text-white hover:bg-white/10"
              }`}
            >
              {item.icon}
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          ))}
        </div>

        {/* APPLY NOW BUTTON */}
        <button
          onClick={() => setCurrentPage("register")}
          className="px-6 py-2.5 bg-gradient-to-r from-cyan-600 to-emerald-600 text-white font-black rounded-xl hover:scale-105 transition"
        >
          🚀 Apply Now
        </button>
      </div>
    </nav>
  );
};

// ============ HERO ============
const Home = ({ setCurrentPage }) => {
  return (
    <section className="relative min-h-screen pt-32 pb-24 overflow-hidden bg-gradient-to-br from-slate-950 via-cyan-950/20 to-slate-950">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-cyan-600/30 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-gradient-to-br from-emerald-600/30 to-transparent rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-gradient-to-br from-teal-600/20 to-transparent rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <div className="space-y-6">
              <h1 className="text-7xl lg:text-8xl font-black leading-tight text-white">
                Your Future
                <div className="relative h-24 mt-4">
                  <div className="bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent text-7xl lg:text-8xl font-black">
                    Starts Now
                  </div>
                </div>
              </h1>

              <p className="text-xl text-slate-300 max-w-lg leading-relaxed font-light">
                Powered by cutting-edge AI. Find jobs that match your potential.
                Get hired in 48 hours or less.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                onClick={() => setCurrentPage("register")}
                className="group relative px-8 py-4 font-black text-lg text-white overflow-hidden rounded-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 group-hover:scale-110 transition-transform duration-300"></div>
                <div className="relative flex items-center justify-center gap-2">
                  Apply Now
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>
              </button>

              <button
                onClick={() => setCurrentPage("status")}
                className="group px-8 py-4 font-black text-lg text-white border-2 border-cyan-400/50 rounded-2xl hover:border-cyan-400 hover:bg-cyan-400/10 transition-all duration-300 backdrop-blur-xl"
              >
                Track Status
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-12 border-t border-slate-700/50">
              {[
                { icon: "💼", value: "500K+", label: "Active Jobs" },
                { icon: "👥", value: "2M+", label: "Users" },
                { icon: "🎯", value: "98%", label: "Success Rate" },
              ].map((stat, i) => (
                <div key={i} className="group">
                  <span className="text-3xl">{stat.icon}</span>
                  <div className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mt-2">
                    {stat.value}
                  </div>
                  <p className="text-slate-400 text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block relative h-96 perspective">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 to-emerald-600/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-2xl border border-cyan-400/20 rounded-3xl p-8 h-full hover:border-cyan-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20">
                <div className="flex gap-2 mb-8">
                  <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
                  <div className="w-3 h-3 rounded-full bg-teal-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                </div>
                <div className="space-y-6">
                  {[
                    {
                      icon: "🤖",
                      title: "AI Matching",
                      desc: "Smart algorithms",
                    },
                    {
                      icon: "⚡",
                      title: "Fast Hiring",
                      desc: "48-hour placement",
                    },
                    {
                      icon: "🎯",
                      title: "Perfect Fit",
                      desc: "Your dream job",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="group flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all"
                    >
                      <div className="text-3xl group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm">
                          {item.title}
                        </div>
                        <div className="text-slate-400 text-xs">
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============ ABOUT ============
const About = () => {
  return (
    <section className="relative py-32 px-6 bg-gradient-to-b from-slate-950 via-cyan-950/10 to-slate-950 overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-40 w-72 h-72 bg-cyan-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-emerald-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-400/30 rounded-full">
                <span className="text-cyan-400 text-sm font-bold">
                  🎯 ABOUT US
                </span>
              </div>
              <h2 className="text-6xl lg:text-7xl font-black text-white leading-tight">
                Built for the Future of Work
              </h2>
              <p className="text-xl text-slate-300 leading-relaxed max-w-lg">
                CWSEARCHWAY combines AI with human expertise. Founded by
                ex-Google, Amazon, and Meta engineers.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  label: "Founded",
                  value: "2020",
                  color: "from-cyan-500 to-teal-500",
                },
                {
                  label: "Countries",
                  value: "180+",
                  color: "from-teal-500 to-emerald-500",
                },
                {
                  label: "Placements",
                  value: "5M+",
                  color: "from-emerald-500 to-cyan-500",
                },
                {
                  label: "Success",
                  value: "98%",
                  color: "from-cyan-500 to-emerald-500",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="group bg-gradient-to-br from-slate-900/60 to-slate-950/60 border border-slate-700/50 hover:border-cyan-400/50 rounded-2xl p-6 transition-all duration-300 hover:bg-slate-900/80"
                >
                  <p className="text-slate-400 text-sm mb-2">{stat.label}</p>
                  <div
                    className={`text-3xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                  >
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {[
              {
                icon: "🧠",
                title: "AI-Powered Matching",
                desc: "Neural networks understand your true potential.",
              },
              {
                icon: "⚡",
                title: "Lightning Fast",
                desc: "Get hired within 48 hours.",
              },
              {
                icon: "🔐",
                title: "Enterprise Security",
                desc: "Bank-level encryption protects your data.",
              },
              {
                icon: "🌍",
                title: "Global Reach",
                desc: "Access jobs in 180+ countries.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 border border-slate-700/50 hover:border-cyan-400/50 rounded-2xl p-6 transition-all duration-300 hover:bg-cyan-500/20 cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </span>
                  <div>
                    <h3 className="font-black text-white text-lg mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============ SERVICES ============
const Services = () => {
  const services = [
    {
      icon: "🤖",
      title: "Neural Matching",
      desc: "AI learns your goals in real-time",
      color: "from-cyan-500 to-teal-500",
    },
    {
      icon: "📊",
      title: "Live Analytics",
      desc: "Track applications 24/7",
      color: "from-teal-500 to-emerald-500",
    },
    {
      icon: "🔔",
      title: "Smart Alerts",
      desc: "Get notified of perfect opportunities",
      color: "from-emerald-500 to-cyan-500",
    },
    {
      icon: "💬",
      title: "AI Interviewer",
      desc: "Practice with our AI",
      color: "from-cyan-600 to-teal-600",
    },
    {
      icon: "📝",
      title: "Auto Resume",
      desc: "AI optimizes your resume",
      color: "from-teal-600 to-emerald-600",
    },
    {
      icon: "🏆",
      title: "Verified Jobs",
      desc: "100% verified positions",
      color: "from-emerald-600 to-cyan-600",
    },
    {
      icon: "💼",
      title: "Career Coach",
      desc: "Expert mentors included",
      color: "from-cyan-500 to-emerald-500",
    },
    {
      icon: "🚀",
      title: "Fast Track",
      desc: "Priority for members",
      color: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <section className="relative py-32 px-6 bg-gradient-to-b from-slate-950 to-cyan-950/20 overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-400/30 rounded-full mb-6">
            <span className="text-emerald-400 text-sm font-bold">
              ⚡ FEATURES
            </span>
          </div>
          <h2 className="text-6xl lg:text-7xl font-black text-white mb-6">
            Powered by 2025 AI
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Next-generation tools for modern job seekers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              className="group relative bg-gradient-to-br from-slate-900/40 to-slate-950/40 border border-slate-700/50 hover:border-cyan-400/50 rounded-2xl p-8 transition-all duration-300 hover:bg-slate-900/60 overflow-hidden hover:shadow-2xl hover:shadow-cyan-500/10"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity`}
              ></div>

              <div className="relative space-y-4">
                <div className="text-5xl group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="font-black text-white text-lg">
                  {service.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {service.desc}
                </p>
                <div
                  className={`h-1 bg-gradient-to-r ${service.color} w-0 group-hover:w-12 transition-all duration-300`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
// ============ REGISTRATION FORM ============
// ============ REGISTRATION FORM (UPDATED) ============
const Register = ({ setCurrentPage }) => {
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
    edu10: "",
    edu10Board: "",
    edu10Percent: "",
    edu10Year: "",
    edu12: "",
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

  // Handle input changes
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

  // Submit Application
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

  // Submission Screen
  if (submitted) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center text-center text-white">
        <div>
          <div className="text-8xl mb-6 animate-bounce">✅</div>
          <h2 className="text-5xl font-black">Application Submitted!</h2>
          <p className="text-xl mt-2 text-slate-300">Your journey begins now</p>

          <p className="mt-5 text-slate-300">Registration ID:</p>
          <p className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent font-mono">
            {registrationId}
          </p>
          <p className="text-slate-500 mt-4 text-sm">
            Redirecting to status page…
          </p>
        </div>
      </div>
    );
  }

  // MAIN FORM UI
  return (
    <div className="min-h-screen pt-28 pb-12 px-6 bg-gradient-to-br from-slate-950 via-cyan-950/10 to-slate-950">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-6xl font-black text-white">Registration Form</h2>
          <p className="text-slate-300 text-lg mt-2">
            Fill all details carefully as per your documents.
          </p>
        </div>

        {/* BIG WIDE FORM BOX */}
        <div className="bg-gradient-to-br from-slate-900/60 to-slate-950/60 border border-slate-700/50 backdrop-blur-2xl rounded-3xl p-10">
          {/* 3 COLUMN GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* INPUT FIELDS */}
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
                <label className="text-slate-300 text-sm font-semibold">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white"
                />
              </div>
            ))}

            {/* ADDRESS FULL WIDTH */}
            <div className="md:col-span-3">
              <label className="text-slate-300 text-sm font-semibold">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white"
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
                <label className="text-slate-300 text-sm font-semibold">
                  {field.label}
                </label>
                <select
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white"
                >
                  {field.options.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {/* EDUCATION TABLE */}
          <h3 className="text-white font-bold text-xl mt-10 mb-4">
            Educational Details
          </h3>

          <div className="grid grid-cols-4 gap-4 text-slate-300 text-sm font-semibold">
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
                className="px-3 py-2 bg-slate-800/50 text-white rounded-lg"
              />
              <input
                name={row.b}
                value={formData[row.b]}
                onChange={handleChange}
                className="px-3 py-2 bg-slate-800/50 text-white rounded-lg"
              />
              <input
                name={row.p}
                value={formData[row.p]}
                onChange={handleChange}
                className="px-3 py-2 bg-slate-800/50 text-white rounded-lg"
              />
              <input
                name={row.y}
                value={formData[row.y]}
                onChange={handleChange}
                className="px-3 py-2 bg-slate-800/50 text-white rounded-lg"
              />
            </div>
          ))}

          {/* RESUME UPLOAD */}
          <div className="mt-8">
            <label className="text-slate-300 text-sm font-semibold">
              Resume (Optional)
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full mt-1 px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white"
            />
          </div>

          {/* RULES & REGULATIONS */}
          <div className="mt-10 p-6 bg-slate-800/40 rounded-xl border border-slate-700/40">
            <h3 className="text-white font-bold text-lg">
              Rules & Regulations
            </h3>

            {!openRules ? (
              <>
                <p className="text-slate-400 text-sm mt-2">
                  • Candidate must follow all company rules.
                </p>
                <p className="text-slate-400 text-sm">
                  • Registration fee is non-refundable.
                </p>

                <button
                  onClick={() => setOpenRules(true)}
                  className="text-cyan-400 mt-3 underline"
                >
                  Read More
                </button>
              </>
            ) : (
              <>
                <div className="text-slate-300 text-sm space-y-2 mt-3">
                  <p>• Job registration fee ₹299 is compulsory.</p>
                  <p>• No refund after payment.</p>
                  <p>• Documents must be correct.</p>
                  <p>• Company is not responsible for false documents.</p>
                  <p>• Behaviour issues may lead to termination.</p>
                  <p>• Data remains confidential.</p>
                </div>

                <button
                  onClick={() => setOpenRules(false)}
                  className="text-cyan-400 mt-3 underline"
                >
                  Read Less
                </button>
              </>
            )}

            <label className="flex items-center gap-2 mt-4 text-slate-300">
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
            className="w-full mt-8 py-4 bg-gradient-to-r from-cyan-600 to-emerald-600 text-white font-black rounded-xl hover:scale-105 transition"
          >
            🚀 Submit Application
          </button>
        </div>
      </div>
    </div>
  );
};

// ============ CHECK STATUS ============
const CheckStatus = () => {
  const [registrationId, setRegistrationId] = useState("");
  const [registrationData, setRegistrationData] = useState(null);
  const [searched, setSearched] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const registrations = JSON.parse(
      localStorage.getItem("cwsearchway_registrations") || "{}"
    );
    const data = registrations[registrationId];
    if (data) {
      setRegistrationData(data);
      setNotFound(false);
    } else {
      setRegistrationData(null);
      setNotFound(true);
    }
    setSearched(true);
  };

  const getStatusStyles = (status) => {
    if (status === "Accepted")
      return { icon: "✅", color: "from-emerald-500 to-teal-500" };
    if (status === "Rejected")
      return { icon: "❌", color: "from-orange-500 to-red-500" };
    return { icon: "⏳", color: "from-amber-500 to-orange-500" };
  };

  return (
    <div className="min-h-screen pt-32 pb-12 px-6 bg-gradient-to-br from-slate-950 via-cyan-950/10 to-slate-950">
      <div className="max-w-2xl mx-auto">
        <div className="space-y-4 mb-8 text-center">
          <h2 className="text-5xl font-black text-white">Check Your Status</h2>
          <p className="text-slate-300">Enter your registration ID</p>
        </div>

        <div className="bg-gradient-to-br from-slate-900/60 to-slate-950/60 backdrop-blur-2xl border border-slate-700/50 rounded-3xl p-8 sm:p-12 mb-8 hover:border-cyan-400/30 transition-all">
          <input
            type="text"
            value={registrationId}
            onChange={(e) => setRegistrationId(e.target.value.toUpperCase())}
            placeholder="CW1234567890"
            className="w-full px-6 py-4 bg-slate-800/50 border border-slate-600/50 rounded-xl focus:border-cyan-400 focus:outline-none text-white font-bold text-lg mb-4 placeholder-slate-500 transition-all"
          />
          <button
            onClick={handleSearch}
            className="w-full py-4 bg-gradient-to-r from-cyan-600 to-emerald-600 text-white font-black rounded-xl hover:shadow-2xl hover:shadow-cyan-500/30 transition-all"
          >
            Search Status
          </button>
        </div>

        {searched && !notFound && registrationData && (
          <div className="bg-gradient-to-br from-slate-900/60 to-slate-950/60 backdrop-blur-2xl border border-cyan-400/30 rounded-3xl p-8 sm:p-12">
            <div className="text-center mb-10">
              <div className="text-8xl mb-6 animate-bounce">
                {getStatusStyles(registrationData.status).icon}
              </div>
              <h3
                className={`text-4xl font-black bg-gradient-to-r ${
                  getStatusStyles(registrationData.status).color
                } bg-clip-text text-transparent`}
              >
                {registrationData.status}
              </h3>
              <p className="text-slate-400 mt-2 text-sm">Application Status</p>
            </div>

            <div className="space-y-4 bg-slate-800/30 p-8 rounded-2xl border border-slate-700/50">
              {[
                { label: "🆔 ID", value: registrationData.registrationId },
                { label: "👤 Name", value: registrationData.fullName },
                { label: "📧 Email", value: registrationData.email },
                { label: "💼 Role", value: registrationData.jobRole },
                { label: "📅 Applied", value: registrationData.timestamp },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between py-3 border-b border-slate-700 last:border-0"
                >
                  <span className="font-bold text-slate-300">
                    {item.label}:
                  </span>
                  <span className="text-slate-200">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {searched && notFound && (
          <div className="bg-gradient-to-br from-slate-900/60 to-slate-950/60 backdrop-blur-2xl border border-slate-700/50 rounded-3xl p-12 text-center">
            <div className="text-7xl mb-6">🔍</div>
            <h3 className="text-3xl font-black text-white mb-3">Not Found</h3>
            <p className="text-slate-400 text-lg">
              ID "<strong className="text-slate-300">{registrationId}</strong>"
              not found. Try again.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// ============ FOOTER ============
const Footer = ({ setCurrentPage }) => {
  return (
    <footer className="bg-gradient-to-b from-slate-950 to-black border-t border-slate-800/50 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
        <div>
          <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            CWSearchWay
          </span>
          <p className="text-slate-400 mt-3 text-sm">
            The future of career discovery.
          </p>
        </div>
        <div>
          <h5 className="font-black text-white mb-4 text-sm">Platform</h5>
          <div className="space-y-2 text-slate-400 text-sm">
            <button
              onClick={() => setCurrentPage("home")}
              className="hover:text-cyan-400 transition-colors block"
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage("about")}
              className="hover:text-cyan-400 transition-colors block"
            >
              About
            </button>
            <button
              onClick={() => setCurrentPage("services")}
              className="hover:text-cyan-400 transition-colors block"
            >
              Features
            </button>
          </div>
        </div>
        <div>
          <h5 className="font-black text-white mb-4 text-sm">Career</h5>
          <div className="space-y-2 text-slate-400 text-sm">
            <button
              onClick={() => setCurrentPage("register")}
              className="hover:text-cyan-400 transition-colors block"
            >
              Apply Now
            </button>
            <button
              onClick={() => setCurrentPage("status")}
              className="hover:text-cyan-400 transition-colors block"
            >
              Track Status
            </button>
          </div>
        </div>
        <div>
          <h5 className="font-black text-white mb-4 text-sm">Company</h5>
          <div className="space-y-2 text-slate-400 text-sm">
            <p>Blog</p>
            <p>Careers</p>
            <p>Contact</p>
          </div>
        </div>
        <div>
          <h5 className="font-black text-white mb-4 text-sm">Contact</h5>
          <p className="text-slate-400 text-sm">🚀 hello@cwai.com</p>
          <p className="text-slate-400 text-sm">📱 +1 (888) 123-4567</p>
        </div>
      </div>
      <div className="border-t border-slate-800/50 pt-8 text-center text-slate-500 text-sm">
        <p>© 2025 CWSEARCHWAY. All rights reserved.</p>
      </div>
    </footer>
  );
};

// ============ MAIN APP ============
export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const pages = {
    home: (
      <>
        <Home setCurrentPage={setCurrentPage} />
        <About />
        <Services />
        <Footer setCurrentPage={setCurrentPage} />
      </>
    ),
    about: (
      <>
        <About />
        <Footer setCurrentPage={setCurrentPage} />
      </>
    ),
    services: (
      <>
        <Services />
        <Footer setCurrentPage={setCurrentPage} />
      </>
    ),
    register: (
      <>
        <Register setCurrentPage={setCurrentPage} />
        <Footer setCurrentPage={setCurrentPage} />
      </>
    ),
    status: (
      <>
        <CheckStatus />
        <Footer setCurrentPage={setCurrentPage} />
      </>
    ),
  };

  return (
    <div className="bg-black">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {pages[currentPage]}
    </div>
  );
}
