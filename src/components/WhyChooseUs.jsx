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
            Thousands of employers hire talent through CWSearchWay.
          </p>

          <div className="flex flex-wrap justify-center gap-10 pt-4 grayscale opacity-80">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
              className="h-8"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Google_logo_%282015%29.svg"
              className="h-8"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
              className="h-8"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/1/19/Tata_logo.svg"
              className="h-8"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg"
              className="h-8"
            />
          </div>
        </div>

        {/* WHY CHOOSE US  */}
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
