import React, { useState } from "react";

export default function ExploreJobs() {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("all");
  const [jobType, setJobType] = useState("all");

  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Code Web Telecom",
      location: "Patna",
      type: "Full Time",
      salary: "₹25,000 – ₹40,000",
    },
    {
      id: 2,
      title: "Backend Developer",
      company: "Code Web Information Of Technology",
      location: "Delhi",
      type: "Full Time",
      salary: "₹40,000 – ₹70,000",
    },
    {
      id: 3,
      title: "Civil Site Supervisor",
      company: "Pathak Enterprises",
      location: "Bihar",
      type: "Contract",
      salary: "₹18,000 – ₹25,000",
    },
    {
      id: 4,
      title: "Civil Engineer",
      company: "Nisha Construction",
      location: "Ranchi",
      type: "Full Time",
      salary: "₹30,000 – ₹55,000",
    },
    {
      id: 5,
      title: "Office Assistant",
      company: "Aradhya Enterprises",
      location: "Patna",
      type: "Part Time",
      salary: "₹12,000 – ₹18,000",
    },
  ];

  const filteredJobs = jobs.filter((job) => {
    return (
      job.title.toLowerCase().includes(keyword.toLowerCase()) &&
      (location === "all" || job.location === location) &&
      (jobType === "all" || job.type === jobType)
    );
  });

  return (
    <section className="min-h-screen px-6 py-24 bg-slate-50">
      <div className="mx-auto space-y-12 max-w-7xl">
        {/* PAGE HEADER */}
        <div className="space-y-3 text-center">
          <h1 className="text-4xl font-black text-slate-900">Explore Jobs</h1>
          <p className="max-w-2xl mx-auto text-slate-600">
            Discover verified jobs from trusted companies across India. Apply
            with confidence and grow your career.
          </p>
        </div>

        {/* SEARCH & FILTER */}
        <div className="grid grid-cols-1 gap-4 p-6 bg-white border shadow-sm md:grid-cols-4 rounded-xl">
          <input
            type="text"
            placeholder="Job title or keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-slate-300"
          />

          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="px-4 py-3 border rounded-lg"
          >
            <option value="all">All Locations</option>
            <option value="Patna">Patna</option>
            <option value="Delhi">Delhi</option>
            <option value="Bihar">Bihar</option>
            <option value="Ranchi">Ranchi</option>
          </select>

          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="px-4 py-3 border rounded-lg"
          >
            <option value="all">All Job Types</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Contract">Contract</option>
          </select>

          <button className="font-semibold text-white transition rounded-lg bg-slate-900 hover:bg-slate-800">
            Search Jobs
          </button>
        </div>

        {/* JOB RESULTS */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="p-6 transition bg-white border shadow-sm rounded-xl hover:shadow-md"
              >
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-slate-900">
                    {job.title}
                  </h3>
                  <p className="text-slate-600">{job.company}</p>
                </div>

                <div className="flex flex-wrap gap-4 mt-4 text-sm text-slate-500">
                  <span>📍 {job.location}</span>
                  <span>💼 {job.type}</span>
                  <span>💰 {job.salary}</span>
                </div>

                <div className="flex gap-4 mt-6">
                  <button className="px-6 py-2 font-semibold text-white transition rounded-lg bg-slate-900 hover:bg-slate-800">
                    Apply Now
                  </button>
                  <button className="px-6 py-2 font-semibold transition border rounded-lg border-slate-300 text-slate-700 hover:bg-slate-100">
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-slate-500">
              No jobs match your search.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
