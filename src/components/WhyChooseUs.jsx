import React from "react";

export default function WhyChooseUs() {
  const companies = [
    "Code Web Telecom",
    "Digyaansh Shrishti Maintenance Pvt. Ltd.",
    "Pathak Enterprises",
    "Aradhya Enterprises",
    "Nisha Construction",
    "Code Web Information Of Technology",
    "Code Web Solutions",
    "Code Web IT",
  ];

  return (
    <section className="px-6 overflow-hidden py-28 bg-slate-50">
      <div className="mx-auto space-y-16 max-w-7xl">
        {/* TRUSTED BY COMPANIES */}
        <div className="space-y-6 text-center">
          <h2 className="text-3xl font-black text-slate-900">
            Trusted by Top Companies
          </h2>
          <p className="text-slate-600">
            These organizations rely on CWSearchWay for hiring skilled talent.
          </p>

          {/* ⭐ AUTO SCROLLING COMPANY BAR */}
          <div className="relative w-full pt-6 overflow-hidden">
            <div className="flex gap-6 animate-scroll whitespace-nowrap">
              {[...companies, ...companies].map((company, index) => (
                <div
                  key={index}
                  className="px-10 py-4 text-lg font-semibold transition bg-white border shadow-sm border-slate-200 rounded-xl text-slate-800 hover:shadow-md"
                >
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* WHY CHOOSE US */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="p-6 transition bg-white border shadow-sm rounded-xl hover:shadow-md">
            <h3 className="font-bold text-slate-900">Verified Companies</h3>
            <p className="mt-2 text-slate-600">
              All job listings are screened and verified for authenticity.
            </p>
          </div>

          <div className="p-6 transition bg-white border shadow-sm rounded-xl hover:shadow-md">
            <h3 className="font-bold text-slate-900">Smart Job Matching</h3>
            <p className="mt-2 text-slate-600">
              Our AI recommends jobs that match your skills and goals.
            </p>
          </div>

          <div className="p-6 transition bg-white border shadow-sm rounded-xl hover:shadow-md">
            <h3 className="font-bold text-slate-900">Fast Hiring Process</h3>
            <p className="mt-2 text-slate-600">
              Apply easily and get responses faster than traditional platforms.
            </p>
          </div>

          <div className="p-6 transition bg-white border shadow-sm rounded-xl hover:shadow-md">
            <h3 className="font-bold text-slate-900">Career Support</h3>
            <p className="mt-2 text-slate-600">
              Free resume tools, career tips, and interview preparation.
            </p>
          </div>
        </div>
      </div>

      {/* CUSTOM ANIMATION */}
      <style>
        {`
    @keyframes scroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-100%); }
    }
    .animate-scroll {
      animation: scroll 14s linear infinite;
    }
  `}
      </style>
    </section>
  );
}
