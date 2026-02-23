"use client";
import { useState } from "react";
import { Sparkles, Send, FileText, CheckCircle2, ArrowLeft, Loader2, AlertCircle, Download, User, Briefcase, IndianRupee, Building2, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface CandidateData {
    name: string;
    email: string;
    phone: string;
    position: string;
    start_date: string;
    salary: string;
    company: string;
    template: string;
    [key: string]: string;
}

export default function PortalPage() {
    const [prompt, setPrompt] = useState("");
    const [isParsing, setIsParsing] = useState(false);
    const [candidateData, setCandidateData] = useState<CandidateData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [docxGenerated, setDocxGenerated] = useState(false);

    const handleMagicParse = async () => {
        if (!prompt.trim()) return;
        setIsParsing(true);
        setError(null);
        setCandidateData(null);

        try {
            const res = await fetch("/api/parse", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt }),
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.message || "Failed to parse candidate data");
            }

            setCandidateData(data.data);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Something went wrong";
            setError(message);
        } finally {
            setIsParsing(false);
        }
    };

    const handleGenerateDocx = async () => {
        if (!candidateData) return;
        setIsGenerating(true);
        setError(null);
        setDocxGenerated(false);

        try {
            const res = await fetch("/api/generate-docx", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(candidateData),
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || "Failed to generate DOCX");
            }

            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `offer_letter_${candidateData.name.replace(/\s+/g, "_")}.docx`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            setDocxGenerated(true);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "DOCX generation failed";
            setError(message);
        } finally {
            setIsGenerating(false);
        }
    };

    const displayFields = candidateData
        ? Object.entries(candidateData).filter(([key, value]) => key !== "template" && value && value.trim() !== "")
        : [];

    return (
        <div className="min-h-screen pb-20">
            {/* Top Bar */}
            <div className="sticky top-0 z-50 bg-[#0a0f1e]/80 backdrop-blur-2xl border-b border-white/[0.06]">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-medium">Back to StructCrew</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 pulse-dot" />
                        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Portal Active</span>
                    </div>
                </div>
            </div>

            <main className="max-w-6xl mx-auto px-6 pt-12">
                {/* Header */}
                <header className="mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
                        <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">AI-Powered</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
                        Agentic <span className="text-blue-400">Command</span> Center
                    </h1>
                    <p className="text-slate-500 text-lg max-w-lg">Paste any text — interview notes, WhatsApp messages, or just describe the hire — and Gemini will extract the candidate details.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Left Column: Magic Box (3 cols) */}
                    <div className="lg:col-span-3">
                        <div className="glass-card border-gradient p-1">
                            <div className="bg-[#0a0f1e] rounded-[21px] p-6 sm:p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-2 text-blue-400">
                                        <Sparkles className="w-4 h-4" />
                                        <h2 className="font-semibold text-sm uppercase tracking-wider">Magic Box</h2>
                                    </div>
                                    <span className="text-[10px] text-slate-600 uppercase tracking-wider">Gemini 1.5 Flash</span>
                                </div>

                                <textarea
                                    className="w-full h-56 bg-transparent border-none focus:outline-none focus:ring-0 text-slate-300 placeholder:text-slate-700 resize-none text-sm leading-relaxed"
                                    placeholder={`Paste anything here...\n\n"Create offer for Yash Rakhiani from Hookkapaani, CNC Operator role, 45k salary, starting March 1 2026, email yash@hookkapaani.com"`}
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                />

                                <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
                                    <span className="text-xs text-slate-700">{prompt.length} characters</span>
                                    <button
                                        onClick={handleMagicParse}
                                        disabled={!prompt.trim() || isParsing}
                                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-cyan-500 disabled:opacity-40 disabled:hover:from-blue-600 disabled:hover:to-blue-500 transition-all duration-300 font-bold text-sm flex items-center gap-2 shadow-lg shadow-blue-500/20"
                                    >
                                        {isParsing ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Agent Working...
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles className="w-4 h-4" />
                                                Extract &amp; Generate
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Result (2 cols) */}
                    <div className="lg:col-span-2">
                        {error && (
                            <div className="glass-card p-6 mb-4 border-red-500/20 animate-fade-in-up">
                                <div className="flex items-start gap-3 text-red-400">
                                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-bold text-sm mb-1">Error</h3>
                                        <p className="text-xs text-red-400/80">{error}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {candidateData || isParsing ? (
                            <div className="glass-card p-8 animate-fade-in-up">
                                <h3 className="font-bold mb-2 flex items-center gap-2 text-emerald-400 text-sm uppercase tracking-wider">
                                    <CheckCircle2 className="w-4 h-4" /> Extracted Profile
                                </h3>
                                <div className="mb-6 flex items-center gap-2">
                                    {isParsing ? (
                                        <div className="h-4 w-32 bg-white/5 rounded animate-pulse" />
                                    ) : (
                                        <span className="text-[10px] px-2 py-1 rounded-md bg-blue-500/10 text-blue-400 font-semibold uppercase tracking-wider border border-blue-500/20">
                                            Template: {candidateData?.template || "default"}
                                        </span>
                                    )}
                                </div>

                                <div className="space-y-4 mb-8">
                                    <AnimatePresence mode="popLayout">
                                        {isParsing ? (
                                            // Skeleton State
                                            Array.from({ length: 5 }).map((_, i) => (
                                                <motion.div
                                                    key={`skeleton-${i}`}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="flex justify-between items-center border-b border-white/[0.04] pb-3"
                                                >
                                                    <div className="h-3 w-20 bg-white/5 rounded animate-pulse" />
                                                    <div className="h-4 w-32 bg-white/10 rounded animate-pulse" />
                                                </motion.div>
                                            ))
                                        ) : (
                                            // Real Data with Staggered Animation
                                            displayFields.map(([key, value], i) => (
                                                <motion.div
                                                    key={key}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.05 }}
                                                    className="flex justify-between items-center border-b border-white/[0.04] pb-3"
                                                >
                                                    <span className="text-slate-600 text-xs uppercase tracking-wider font-medium">{key.replace(/_/g, " ")}</span>
                                                    <span className="text-white text-sm font-semibold text-right max-w-[60%]">{String(value)}</span>
                                                </motion.div>
                                            ))
                                        )}
                                    </AnimatePresence>
                                </div>

                                <div className="space-y-3">
                                    <button
                                        onClick={handleGenerateDocx}
                                        disabled={isGenerating || isParsing}
                                        className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${docxGenerated
                                                ? "bg-emerald-500 text-white"
                                                : "bg-white text-[#0a0f1e] hover:bg-slate-100 disabled:opacity-50"
                                            }`}
                                    >
                                        {isGenerating ? (
                                            <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</>
                                        ) : docxGenerated ? (
                                            <><Download className="w-4 h-4" /> Downloaded! Click to Re-download</>
                                        ) : (
                                            <><FileText className="w-4 h-4" /> Generate DOCX</>
                                        )}
                                    </button>
                                    <button
                                        disabled={isParsing}
                                        className="w-full py-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 font-bold text-sm hover:bg-emerald-500/10 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        <Send className="w-4 h-4" /> Email to Candidate
                                    </button>
                                </div>
                            </div>
                        ) : !error ? (
                            <div className="glass-card h-full min-h-[420px] flex flex-col items-center justify-center p-10 text-center">
                                <div className="w-16 h-16 rounded-2xl bg-slate-900/60 flex items-center justify-center mb-6">
                                    <Sparkles className="w-7 h-7 text-slate-700" />
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed max-w-[200px]">
                                    Fill the Magic Box and click <strong className="text-slate-400">Extract</strong> to see parsed data here.
                                </p>
                            </div>
                        ) : null}
                    </div>
                </div>
            </main>
        </div>
    );
}
