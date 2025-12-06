import React from "react";

export default function About() {
  return (
    <section className="relative px-6 py-32 overflow-hidden bg-gradient-to-b from-slate-950 via-cyan-950/10 to-slate-950">
      {/* Background Blurs */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute rounded-full top-20 right-40 w-72 h-72 bg-cyan-600/20 blur-3xl"></div>
        <div className="absolute rounded-full bottom-20 left-40 w-72 h-72 bg-emerald-600/20 blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center grid-cols-1 gap-20 lg:grid-cols-2">
          {/* LEFT SIDE */}
          <div className="space-y-10">
            {/* Heading */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 border rounded-full bg-cyan-500/20 border-cyan-400/30">
                <span className="text-sm font-bold text-cyan-400">
                  🎯 ABOUT US
                </span>
              </div>

              <h2 className="text-6xl font-black leading-tight text-white lg:text-7xl">
                Built for the Future of Work
              </h2>

              <p className="max-w-lg text-xl leading-relaxed text-slate-300">
                CWSEARCHWAY combines AI with human expertise. Founded by
                ex-Google, Amazon, and Meta engineers.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  label: "Founded",
                  value: "2020",
                  color: "from-cyan-500 to-teal-500",
                },
                {
                  label: "Countries",
                  value: "180+",
                  color: "from-teal-500 to-emerald-500",
                },
                {
                  label: "Placements",
                  value: "5M+",
                  color: "from-emerald-500 to-cyan-500",
                },
                {
                  label: "Success",
                  value: "98%",
                  color: "from-cyan-500 to-emerald-500",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="p-6 transition-all duration-300 border group bg-gradient-to-br from-slate-900/60 to-slate-950/60 border-slate-700/50 hover:border-cyan-400/50 rounded-2xl hover:bg-slate-900/80"
                >
                  <p className="mb-2 text-sm text-slate-400">{stat.label}</p>
                  <div
                    className={`text-3xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                  >
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE FEATURES LIST */}
          <div className="space-y-6">
            {[
              {
                icon: "🧠",
                title: "AI-Powered Matching",
                desc: "Neural networks understand your true potential.",
              },
              {
                icon: "⚡",
                title: "Lightning Fast",
                desc: "Get hired within 48 hours.",
              },
              {
                icon: "🔐",
                title: "Enterprise Security",
                desc: "Bank-level encryption protects your data.",
              },
              {
                icon: "🌍",
                title: "Global Reach",
                desc: "Access jobs in 180+ countries.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-6 transition-all duration-300 border cursor-pointer group bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 border-slate-700/50 hover:border-cyan-400/50 rounded-2xl hover:bg-cyan-500/20"
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl transition-transform group-hover:scale-110">
                    {feature.icon}
                  </span>
                  <div>
                    <h3 className="mb-2 text-lg font-black text-white">
                      {feature.title}
                    </h3>
                    <p className="leading-relaxed text-slate-400">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
