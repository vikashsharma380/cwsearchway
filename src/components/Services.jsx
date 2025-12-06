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
    <section className="relative px-6 py-32 overflow-hidden bg-gradient-to-b from-slate-950 to-cyan-950/20">
      <div className="relative mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border rounded-full bg-emerald-500/20 border-emerald-400/30">
            <span className="text-sm font-bold text-emerald-400">
              ⚡ FEATURES
            </span>
          </div>

          <h2 className="mb-6 text-6xl font-black text-white lg:text-7xl">
            Powered by 2025 AI
          </h2>

          <p className="max-w-2xl mx-auto text-xl text-slate-300">
            Next-generation tools for modern job seekers
          </p>
        </div>

        {/* SERVICES GRID */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <div
              key={i}
              className="relative p-8 overflow-hidden transition-all duration-300 border group bg-gradient-to-br from-slate-900/40 to-slate-950/40 border-slate-700/50 hover:border-cyan-400/50 rounded-2xl hover:bg-slate-900/60 hover:shadow-2xl hover:shadow-cyan-500/10"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 
                group-hover:opacity-5 transition-opacity`}
              ></div>

              <div className="relative space-y-4">
                <div className="text-5xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                  {service.icon}
                </div>

                <h3 className="text-lg font-black text-white">
                  {service.title}
                </h3>

                <p className="text-sm leading-relaxed text-slate-400">
                  {service.desc}
                </p>

                <div
                  className={`h-1 bg-gradient-to-r ${service.color} w-0 
                  group-hover:w-12 transition-all duration-300`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
