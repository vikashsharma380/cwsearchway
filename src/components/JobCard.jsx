import React from "react";

export default function JobCard({ job, onApply }) {
  return (
    <div className="p-5 transition border bg-slate-900/90 border-slate-700 rounded-2xl hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/10">
      <h3 className="text-sm font-semibold sm:text-base text-slate-100">
        {job.title}
      </h3>
      <p className="text-xs text-slate-400">{job.company}</p>
      <p className="text-[11px] text-slate-400 mt-1">
        📍 {job.location} · 💼 {job.experience}
      </p>
      <div className="flex justify-between items-center mt-2 text-[11px]">
        <span className="px-2 py-1 rounded-full text-emerald-300 bg-emerald-500/10">
          {job.type}
        </span>
        <span className="text-amber-300">{job.salary}</span>
      </div>
      <button
        onClick={onApply}
        className="w-full py-2 mt-4 text-xs font-semibold text-white rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500"
      >
        Apply Now
      </button>
    </div>
  );
}
