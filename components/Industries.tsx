import { Building2, HardHat, Compass, Ruler, PaintBucket, Cog } from "lucide-react";

const industries = [
    { icon: Compass, name: "Architecture", roles: "Principal Architects, Design Leads, BIM Managers", count: "120+ placed" },
    { icon: Building2, name: "Commercial Construction", roles: "Project Directors, Site Engineers, QS Engineers", count: "85+ placed" },
    { icon: HardHat, name: "Infrastructure", roles: "Highway Engineers, Bridge Specialists, Geotechnical Experts", count: "60+ placed" },
    { icon: PaintBucket, name: "Interior Design", roles: "Design Directors, 3D Visualizers, FF&E Specialists", count: "45+ placed" },
    { icon: Ruler, name: "Structural Engineering", roles: "Structural Analysts, RCC Designers, Steel Detailers", count: "55+ placed" },
    { icon: Cog, name: "MEP Services", roles: "HVAC Engineers, Electrical Designers, Plumbing Consultants", count: "40+ placed" },
];

export default function Industries() {
    return (
        <section id="industries" className="py-32 relative">
            {/* Decorative */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-600/[0.02] to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-20">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400 mb-4 block">
                        Industries
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6 text-balance">
                        Deep Expertise Across <span className="text-cyan-400">Every Vertical</span>
                    </h2>
                    <p className="text-lg text-slate-400">
                        Our recruiters have domain knowledge in every sector of the architecture, engineering, and construction ecosystem.
                    </p>
                </div>

                {/* Industries Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {industries.map((ind, i) => (
                        <div
                            key={i}
                            className="group flex items-start gap-5 p-6 rounded-2xl border border-white/[0.04] hover:border-white/10 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300 cursor-pointer"
                        >
                            <div className="shrink-0 w-12 h-12 rounded-xl bg-slate-800/80 flex items-center justify-center text-blue-400 group-hover:text-cyan-400 transition-colors">
                                <ind.icon className="w-5 h-5" />
                            </div>
                            <div className="min-w-0">
                                <h3 className="font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{ind.name}</h3>
                                <p className="text-sm text-slate-500 mb-2 leading-relaxed">{ind.roles}</p>
                                <span className="text-xs font-semibold text-emerald-500/80 uppercase tracking-wider">{ind.count}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
