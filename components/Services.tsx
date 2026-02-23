import { Briefcase, Users, Search, BarChart3, Zap, Shield } from "lucide-react";

const services = [
    {
        icon: Search,
        title: "Executive Search",
        description: "Identify and recruit C-suite and senior leadership for architecture and construction firms across India.",
        color: "from-blue-500 to-blue-600",
        iconColor: "text-blue-400",
    },
    {
        icon: Users,
        title: "Project Staffing",
        description: "Rapid deployment of project managers, site engineers, and supervisors for ongoing construction projects.",
        color: "from-cyan-500 to-cyan-600",
        iconColor: "text-cyan-400",
    },
    {
        icon: Briefcase,
        title: "Contract Hiring",
        description: "Flexible workforce solutions for seasonal demands, project-based work, and temporary assignments.",
        color: "from-emerald-500 to-emerald-600",
        iconColor: "text-emerald-400",
    },
    {
        icon: BarChart3,
        title: "Salary Benchmarking",
        description: "Data-driven compensation insights for the AEC industry to help you attract and retain top performers.",
        color: "from-amber-500 to-amber-600",
        iconColor: "text-amber-400",
    },
    {
        icon: Zap,
        title: "Rapid Placement",
        description: "72-hour shortlist guarantee for urgent roles. We move fast because your projects can't wait.",
        color: "from-purple-500 to-purple-600",
        iconColor: "text-purple-400",
    },
    {
        icon: Shield,
        title: "Compliance & Vetting",
        description: "Comprehensive background verification, license checks, and reference validation for every candidate.",
        color: "from-rose-500 to-rose-600",
        iconColor: "text-rose-400",
    },
];

export default function Services() {
    return (
        <section id="services" className="py-32 relative">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Section Header */}
                <div className="max-w-2xl mb-20">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400 mb-4 block">
                        What We Do
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6 text-balance">
                        Specialized Recruitment for the <span className="text-blue-400">Built Environment</span>
                    </h2>
                    <p className="text-lg text-slate-400 leading-relaxed">
                        From concept to completion, we provide the human infrastructure that powers India&apos;s most ambitious architectural and construction projects.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, i) => (
                        <div
                            key={i}
                            className="glass-card p-8 group cursor-pointer"
                        >
                            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                <service.icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                                {service.title}
                            </h3>
                            <p className="text-slate-400 leading-relaxed text-sm">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
