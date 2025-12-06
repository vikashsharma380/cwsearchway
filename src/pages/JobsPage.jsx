import React, { useState } from "react";
import JobCard from "../components/JobCard";
import Footer from "../components/Footer";

const ALL_JOBS = [
  {
    id: 1,
    title: "React Frontend Developer",
    company: "CodeWeb Telecom",
    location: "Remote / India",
    salary: "₹6L – ₹10L",
    type: "Full Time",
    experience: "1–3 Years",
    mode: "Remote",
    category: "Software",
  },
  {
    id: 2,
    title: "Junior JavaScript Developer",
    company: "CW Labs",
    location: "Noida, India",
    salary: "₹4L – ₹7L",
    type: "Full Time",
    experience: "0–2 Years",
    mode: "On-site",
    category: "Software",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "DesignTech Systems",
    location: "Gurugram, India",
    salary: "₹5L – ₹9L",
    type: "Hybrid",
    experience: "1–4 Years",
    mode: "Hybrid",
    category: "Design",
  },
  {
    id: 4,
    title: "Customer Support Executive",
    company: "CW Support Hub",
    location: "Pune, India",
    salary: "₹2L – ₹3.5L",
    type: "Full Time",
    experience: "0–1 Year",
    mode: "On-site",
    category: "BPO",
  },
];

export default function JobsPage({ setCurrentPage }) {
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("All");
  const [category, setCategory] = useState("All");

  const filteredJobs = ALL_JOBS.filter((job) => {
    const term = search.trim().toLowerCase();
    const matchesSearch =
      term === "" ||
      job.title.toLowerCase().includes(term) ||
      job.company.toLowerCase().includes(term) ||
      job.location.toLowerCase().includes(term);

    const matchesMode = mode === "All" || job.mode === mode;
    const matchesCategory = category === "All" || job.category === category;

    return matchesSearch && matchesMode && matchesCategory;
  });

  return (
    <>
      <main className="min-h-screen pb-16 text-white pt-28 bg-slate-950">
        <section className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[260px,1fr] gap-8">
          {/* FILTERS */}
          <aside className="p-5 border bg-slate-900/80 border-slate-700 rounded-2xl h-fit">
            <h2 className="mb-4 text-sm font-semibold text-slate-100">
              Filters
            </h2>

            <div className="space-y-4 text-xs">
              <div>
                <p className="mb-1 text-slate-400">Search</p>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg bg-slate-800 border-slate-700 focus:outline-none focus:border-cyan-400"
                  placeholder="Job title / company / location"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div>
                <p className="mb-1 text-slate-400">Work mode</p>
                <div className="flex flex-wrap gap-2">
                  {["All", "Remote", "On-site", "Hybrid"].map((m) => (
                    <button
                      key={m}
                      onClick={() => setMode(m)}
                      className={`px-3 py-1 rounded-full border ${
                        mode === m
                          ? "border-cyan-400 bg-cyan-500/10 text-cyan-200"
                          : "border-slate-700 text-slate-300 hover:border-cyan-400/60"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-1 text-slate-400">Category</p>
                <select
                  className="w-full px-3 py-2 border rounded-lg bg-slate-800 border-slate-700 focus:outline-none focus:border-cyan-400"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>All</option>
                  <option>Software</option>
                  <option>Design</option>
                  <option>BPO</option>
                </select>
              </div>

              <button
                className="w-full mt-2 text-[11px] text-slate-300 border border-slate-700 px-3 py-2 rounded-full hover:border-cyan-400"
                onClick={() => {
                  setSearch("");
                  setMode("All");
                  setCategory("All");
                }}
              >
                Reset filters
              </button>
            </div>
          </aside>

          {/* JOB LIST */}
          <section>
            <div className="flex items-center justify-between gap-3 mb-4">
              <div>
                <h1 className="text-lg font-bold sm:text-xl">
                  {filteredJobs.length} jobs found
                </h1>
                <p className="text-xs text-slate-400">
                  Based on your filters and search
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onApply={() => setCurrentPage("register")}
                />
              ))}

              {filteredJobs.length === 0 && (
                <div className="p-6 text-sm text-center border text-slate-400 border-slate-700 rounded-2xl">
                  No jobs match this search yet. Try changing filters.
                </div>
              )}
            </div>
          </section>
        </section>
      </main>

      <Footer setCurrentPage={setCurrentPage} />
    </>
  );
}
