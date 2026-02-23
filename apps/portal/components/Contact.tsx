"use client";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

export default function Contact() {
    return (
        <section id="contact" className="py-32 relative">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="glass-card border-gradient overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Left: CTA */}
                        <div className="p-10 sm:p-14 bg-gradient-to-br from-blue-600/10 to-transparent">
                            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400 mb-4 block">
                                Get in Touch
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6 text-balance">
                                Ready to Build Your Dream Team?
                            </h2>
                            <p className="text-slate-400 leading-relaxed mb-10 max-w-md">
                                Whether you&apos;re hiring for a single critical role or scaling an entire project team, we&apos;re here to help.
                            </p>

                            <div className="space-y-5">
                                {[
                                    { icon: Mail, label: "structcrew@gmail.com", href: "mailto:structcrew@gmail.com" },
                                    { icon: Phone, label: "+91 93129 43581", href: "tel:+919312943581" },
                                    { icon: MapPin, label: "New Delhi, India", href: "#" },
                                ].map((item, i) => (
                                    <a
                                        key={i}
                                        href={item.href}
                                        className="flex items-center gap-4 text-slate-400 hover:text-white transition-colors group"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                            <item.icon className="w-4 h-4" />
                                        </div>
                                        <span className="text-sm font-medium">{item.label}</span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Right: Quick Form */}
                        <div className="p-10 sm:p-14 border-t lg:border-t-0 lg:border-l border-white/[0.06]">
                            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2 block">Name</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all text-sm"
                                            placeholder="Your name"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2 block">Company</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all text-sm"
                                            placeholder="Company name"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2 block">Email</label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all text-sm"
                                        placeholder="you@company.com"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2 block">Message</label>
                                    <textarea
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all resize-none text-sm"
                                        placeholder="Tell us about the roles you need to fill..."
                                    />
                                </div>
                                <button className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-cyan-500 text-white font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30">
                                    Send Enquiry
                                    <ArrowUpRight className="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
