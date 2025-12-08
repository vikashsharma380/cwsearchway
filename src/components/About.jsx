import React from "react";
import heroPerson from "../assets/hero-person.png";

export default function About({ setCurrentPage }) {
  return (
    <section className="px-6 py-32 bg-white">
      <div className="grid items-center grid-cols-1 gap-20 mx-auto max-w-7xl lg:grid-cols-2">
        {/* LEFT CONTENT */}
        <div className="space-y-10">
          <h2 className="text-5xl font-black leading-tight text-slate-900">
            Helping You Build
            <br />
            The Career You Deserve
          </h2>

          <p className="max-w-lg text-lg text-slate-600">
            CWSearchWay is a next-generation job platform designed to connect
            job seekers with verified employers. We focus on accuracy,
            transparency and faster hiring—so you find opportunities that match
            your skills and goals effortlessly.
          </p>

          {/* ⭐ Register Button (GOES TO Registration Form Page) */}
          <button
            onClick={() => setCurrentPage("form")}
            className="px-8 py-3 font-semibold text-white transition bg-black rounded-full shadow hover:bg-slate-900"
          >
            Register Now →
          </button>

          {/* QUICK STATS */}
          <div className="grid grid-cols-3 gap-6 pt-4">
            <div>
              <p className="text-3xl font-bold text-slate-900">150K+</p>
              <p className="text-sm text-slate-500">Active Candidates</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">25K+</p>
              <p className="text-sm text-slate-500">Verified Jobs</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">10K+</p>
              <p className="text-sm text-slate-500">Hiring Companies</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE CARDS */}
        <div className="space-y-6">
          <div className="p-6 transition bg-white border shadow-sm rounded-2xl border-slate-200 hover:shadow-md">
            <h3 className="text-lg font-semibold text-slate-900">
              Verified Opportunities
            </h3>
            <p className="mt-2 text-slate-600">
              Every job posted on CWSearchWay goes through a strict verification
              system to ensure authenticity and transparency.
            </p>
          </div>

          <div className="p-6 transition bg-white border shadow-sm rounded-2xl border-slate-200 hover:shadow-md">
            <h3 className="text-lg font-semibold text-slate-900">
              Smart Job Matching
            </h3>
            <p className="mt-2 text-slate-600">
              Our intelligent system recommends jobs based on your skills,
              interests, location preference and experience.
            </p>
          </div>

          <div className="p-6 transition bg-white border shadow-sm rounded-2xl border-slate-200 hover:shadow-md">
            <h3 className="text-lg font-semibold text-slate-900">
              Faster Hiring Process
            </h3>
            <p className="mt-2 text-slate-600">
              No more waiting for weeks. Employers respond quicker with our
              streamlined job application and tracking system.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
