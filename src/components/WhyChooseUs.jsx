import React from "react";

export default function WhyChooseUs() {
  return (
    <section className="px-6 py-28 bg-slate-50">
      <div className="mx-auto space-y-16 max-w-7xl">
        {/* TRUSTED BY COMPANIES */}
        <div className="space-y-6 text-center">
          <h2 className="text-3xl font-black text-slate-900">
            Trusted by Top Companies
          </h2>
          <p className="text-slate-600">
            These organizations rely on CWSearchWay for hiring skilled talent.
          </p>

          {/* ⭐ CLEAN COMPANY NAME BARS */}
          <div className="flex flex-wrap justify-center gap-6 pt-4">
            <div className="px-10 py-4 text-lg font-semibold transition bg-white border shadow-sm border-slate-200 rounded-xl hover:shadow-md text-slate-800">
              Code Web Telecom
            </div>

            <div className="px-10 py-4 text-lg font-semibold transition bg-white border shadow-sm border-slate-200 rounded-xl hover:shadow-md text-slate-800">
              Digyaansh Shrishti Maintenance Pvt. Ltd.
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
    </section>
  );
}
