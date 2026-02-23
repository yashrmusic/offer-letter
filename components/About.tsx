import { Target, Clock, Award, TrendingUp } from "lucide-react";

const values = [
    {
        icon: Target,
        title: "Precision Matching",
        description: "We don't just match resumes to JDs. We understand project context, team culture, and career trajectories.",
    },
    {
        icon: Clock,
        title: "Speed to Hire",
        description: "Average time-to-shortlist of 72 hours. Your projects stay on schedule because your team is complete.",
    },
    {
        icon: Award,
        title: "Industry Veterans",
        description: "Our recruiters come from AEC backgrounds. They speak the language of architecture and construction.",
    },
    {
        icon: TrendingUp,
        title: "Retention Focus",
        description: "98% retention rate at the 1-year mark. We find people who stay because we match on values, not just skills.",
    },
];

export default function About() {
    return (
        <section id="about" className="py-32 relative">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    {/* Left: Text */}
                    <div>
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400 mb-4 block">
                            Why StructCrew
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-8 text-balance">
                            Recruitment Built on <span className="text-emerald-400">Domain Expertise</span>
                        </h2>
                        <p className="text-lg text-slate-400 leading-relaxed mb-10">
                            StructCrew was founded by professionals who worked in architecture and construction before moving into talent acquisition.
                            We understand the difference between a site engineer and a project engineer because we&apos;ve been both.
                        </p>

                        <div className="flex items-center gap-6 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                            <div className="stat-number text-4xl text-blue-400">7+</div>
                            <div>
                                <div className="font-semibold text-white text-sm">Years of Specialized Experience</div>
                                <div className="text-slate-500 text-sm">Focused exclusively on the AEC industry</div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Value Props */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {values.map((v, i) => (
                            <div key={i} className="glass-card p-6 group">
                                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4 group-hover:bg-emerald-500/20 transition-colors">
                                    <v.icon className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-white text-sm mb-2">{v.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{v.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
