import React from "react";
import heroPerson from "../assets/hero-person.png";

export default function Hero({ setCurrentPage }) {
  return (
    <section className="pb-20 bg-white pt-28">
      <div className="grid items-center max-w-6xl gap-20 px-4 mx-auto lg:grid-cols-2">
        {/* LEFT */}
        <div className="space-y-8">
          <h1 className="text-4xl font-bold leading-tight lg:text-6xl text-slate-900">
            Embrace the Journey
            <br />
            to Your <span className="text-slate-900">Dream Job</span>
            <br />
            and Unlock Your Potential
          </h1>

          <p className="max-w-xl text-lg text-slate-600">
            Discover global opportunities and find the perfect role that matches
            your goals and personality.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setCurrentPage("register")}
              className="px-6 py-3 text-sm font-semibold text-white rounded-full bg-slate-900 hover:bg-slate-800"
            >
              Find a job
            </button>

            <button className="flex items-center gap-2 px-6 py-3 text-sm border rounded-full border-slate-300 hover:bg-slate-100">
              <span className="flex items-center justify-center w-8 h-8 border rounded-full border-slate-400">
                ▶
              </span>
              Watch Video
            </button>
          </div>

          {/* STATS */}
          <div className="flex gap-10 pt-2 text-sm">
            <div>
              <p className="text-xl font-bold text-slate-900">100K+</p>
              <p className="text-xs text-slate-500">Worldwide Users</p>
            </div>
            <div>
              <p className="text-xl font-bold text-slate-900">20K+</p>
              <p className="text-xs text-slate-500">Job Opportunities</p>
            </div>
            <div>
              <p className="text-xl font-bold text-slate-900">6.7K+</p>
              <p className="text-xs text-slate-500">Joined Companies</p>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE + CARD */}
        <div className="relative">
          <div className="absolute inset-0 translate-x-5 translate-y-4 rounded-3xl bg-gradient-to-br from-sky-200/40 via-white to-green-100/40" />

          <div className="relative overflow-hidden border shadow-xl rounded-3xl border-slate-200">
            <img src={heroPerson} className="object-cover w-full" />
          </div>

          {/* TESTIMONIAL BOX */}
          <div className="absolute w-64 p-4 border shadow-lg bottom-6 right-4 bg-white/90 backdrop-blur-md border-slate-200 rounded-xl">
            <p className="text-sm text-slate-700">
              “This platform helped me land my dream role. Highly recommended!”
            </p>
            <p className="mt-2 text-xs font-semibold text-slate-900">
              Jonas Elliot
            </p>
            <p className="text-[11px] text-slate-500">CFO at Margo Inc.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
