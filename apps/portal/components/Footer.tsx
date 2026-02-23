import Link from "next/link";

export default function Footer() {
    return (
        <footer className="py-16 border-t border-white/[0.04]">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-3 mb-6">
                            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center font-bold text-sm text-white">
                                S
                            </div>
                            <span className="text-lg font-bold text-white">
                                Struct<span className="text-blue-400">Crew</span>
                            </span>
                        </Link>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            Elite recruitment for architecture, engineering, and construction professionals.
                        </p>
                    </div>

                    {/* Links */}
                    {[
                        {
                            title: "Company",
                            links: [
                                { label: "About Us", href: "#about" },
                                { label: "Careers", href: "#" },
                                { label: "Blog", href: "#" },
                            ],
                        },
                        {
                            title: "Services",
                            links: [
                                { label: "Executive Search", href: "#services" },
                                { label: "Project Staffing", href: "#services" },
                                { label: "Contract Hiring", href: "#services" },
                            ],
                        },
                        {
                            title: "Resources",
                            links: [
                                { label: "HR Portal", href: "/portal" },
                                { label: "Salary Guide", href: "#" },
                                { label: "Contact", href: "#contact" },
                            ],
                        },
                    ].map((group, i) => (
                        <div key={i}>
                            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400 mb-5">{group.title}</h4>
                            <ul className="space-y-3">
                                {group.links.map((link, j) => (
                                    <li key={j}>
                                        <Link href={link.href} className="text-sm text-slate-500 hover:text-white transition-colors">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-slate-600">
                        © 2026 StructCrew. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-xs text-slate-600">
                        <span className="hover:text-slate-400 cursor-pointer transition-colors">Privacy Policy</span>
                        <span className="hover:text-slate-400 cursor-pointer transition-colors">Terms of Service</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
