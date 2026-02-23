import { ArrowUpRight, ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden">
            {/* Floating Architectural Shapes */}
            <div className="absolute top-20 right-10 w-72 h-72 border border-white/[0.03] rounded-3xl rotate-12 animate-float" />
            <div className="absolute bottom-32 right-32 w-48 h-48 border border-blue-500/10 rounded-2xl -rotate-6 animate-float-delayed" />
            <div className="absolute top-1/3 left-[5%] w-1 h-32 bg-gradient-to-b from-blue-500/20 to-transparent" />
            <div className="absolute top-1/4 right-[15%] w-1 h-48 bg-gradient-to-b from-cyan-500/10 to-transparent" />

            {/* Orb */}
            <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-blue-600/8 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-32 md:py-0 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                    {/* Left Content */}
                    <div className="lg:col-span-7 animate-fade-in-up">
                        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-10">
                            <span className="w-2 h-2 rounded-full bg-blue-500 pulse-dot" />
                            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-blue-400">
                                Now Hiring Across India
                            </span>
                        </div>

                        <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight text-white leading-[1.05] mb-8 text-balance">
                            Building the{" "}
                            <span className="text-shimmer">Infrastructure</span>
                            {" "}of Human Capital.
                        </h1>

                        <p className="text-lg lg:text-xl text-slate-400 mb-12 max-w-xl leading-relaxed">
                            StructCrew connects elite architects, civil engineers, and construction leaders with India&apos;s most ambitious projects.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="group px-8 py-4 rounded-2xl bg-white text-[#0a0f1e] font-bold text-base hover:bg-slate-100 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-white/10">
                                I&apos;m Hiring
                                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                            <button className="group px-8 py-4 rounded-2xl bg-white/5 text-white font-bold text-base border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-3">
                                I&apos;m a Candidate
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>

                    {/* Right: Stats Card */}
                    <div className="lg:col-span-5 animate-fade-in-up delay-300">
                        <div className="glass-card border-gradient p-8 sm:p-10 space-y-8">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-3 h-3 rounded-full bg-emerald-500 pulse-dot" />
                                <span className="text-sm font-medium text-emerald-400">Live Dashboard</span>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                {[
                                    { value: "350+", label: "Placements Made", color: "text-blue-400" },
                                    { value: "98%", label: "Client Retention", color: "text-cyan-400" },
                                    { value: "45", label: "Active Openings", color: "text-emerald-400" },
                                    { value: "12", label: "Partner Firms", color: "text-amber-400" },
                                ].map((stat, i) => (
                                    <div key={i} className="space-y-1">
                                        <div className={`stat-number text-3xl sm:text-4xl ${stat.color}`}>
                                            {stat.value}
                                        </div>
                                        <div className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-4 border-t border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="flex -space-x-2">
                                        {["bg-blue-500", "bg-cyan-500", "bg-emerald-500", "bg-amber-500"].map((bg, i) => (
                                            <div key={i} className={`w-8 h-8 rounded-full ${bg} border-2 border-[#0a0f1e] flex items-center justify-center text-[10px] font-bold text-white`}>
                                                {["A", "R", "S", "P"][i]}
                                            </div>
                                        ))}
                                    </div>
                                    <span className="text-sm text-slate-400">Recently placed professionals</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
