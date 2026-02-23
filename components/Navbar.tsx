"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { label: "Services", href: "#services" },
        { label: "Industries", href: "#industries" },
        { label: "About", href: "#about" },
        { label: "Contact", href: "#contact" },
    ];

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                    ? "bg-[#0a0f1e]/80 backdrop-blur-2xl border-b border-white/[0.06] shadow-2xl shadow-black/20"
                    : "bg-transparent"
                }`}>
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="h-20 flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center font-bold text-lg text-white shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-shadow">
                                    S
                                </div>
                                <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-20 blur-lg transition-opacity" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-bold tracking-tight text-white leading-none">
                                    Struct<span className="text-blue-400">Crew</span>
                                </span>
                                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-medium">Recruitment</span>
                            </div>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="link-hover px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors rounded-lg"
                                >
                                    {link.label}
                                </Link>
                            ))}

                            <div className="w-px h-6 bg-white/10 mx-3" />

                            <Link
                                href="/portal"
                                className="group ml-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-cyan-500 text-white text-sm font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
                            >
                                HR Portal
                                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </Link>
                        </div>

                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setIsMobileOpen(!isMobileOpen)}
                            className="md:hidden text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
                        >
                            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMobileOpen && (
                <div className="fixed inset-0 z-40 bg-[#0a0f1e]/95 backdrop-blur-2xl md:hidden pt-24">
                    <div className="px-6 flex flex-col gap-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                onClick={() => setIsMobileOpen(false)}
                                className="text-2xl font-semibold text-slate-300 hover:text-white py-4 border-b border-white/5 transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/portal"
                            onClick={() => setIsMobileOpen(false)}
                            className="mt-6 w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 text-white text-center text-lg font-bold"
                        >
                            Open HR Portal
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}
