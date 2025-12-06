import React from "react";

export default function Services() {
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
      desc: "Get notified about perfect opportunities",
      color: "from-emerald-500 to-cyan-500",
    },
    {
      icon: "💬",
      title: "AI Interviewer",
      desc: "Practice interviews with AI",
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
      desc: "Expert guidance included",
      color: "from-cyan-500 to-emerald-500",
    },
    {
      icon: "🚀",
      title: "Fast Track",
      desc: "Priority hiring for premium users",
      color: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <section className="px-6 py-32 bg-white">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 border rounded-full bg-emerald-100 border-emerald-300">
            <span className="text-sm font-bold text-emerald-700">
              ⚡ FEATURES
            </span>
          </div>

          <h2 className="mb-4 text-5xl font-black lg:text-6xl text-slate-900">
            Powered by 2025 AI
          </h2>

          <p className="max-w-2xl mx-auto text-lg text-slate-600">
            Next-generation tools for modern job seekers.
          </p>
        </div>

        {/* SERVICES GRID */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <div
              key={i}
              className="relative p-8 transition-all duration-300 bg-white border shadow-sm group border-slate-200 rounded-2xl hover:shadow-xl"
            >
              {/* Gradient hover effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`}
              ></div>

              {/* Content */}
              <div className="relative space-y-4">
                <div className="text-5xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                  {service.icon}
                </div>

                <h3 className="text-lg font-black text-slate-900">
                  {service.title}
                </h3>

                <p className="text-sm leading-relaxed text-slate-600">
                  {service.desc}
                </p>

                <div
                  className={`h-1 bg-gradient-to-r ${service.color} w-0 group-hover:w-16 transition-all duration-300`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
