"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useTransform, useSpring, useReducedMotion } from "framer-motion";
import {
    ShieldCheck,
    Server,
    Lock,
    Command,
    BrainCircuit,
    Lightbulb,
    Square,
    Briefcase,
    Mail,
    Mic2,
    FileText,
    CheckSquare,
    Sparkles,
    Play,
    Zap
} from "lucide-react";

// Composant Badge animé
function AnimatedBadge({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    return (
        <motion.span
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay, duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-sage-200 shadow-sm text-xs font-medium text-sage-700"
        >
            {children}
        </motion.span>
    );
}

// Composant Mockup 3D du Rapport REX
function ReportMockup3D() {
    const prefersReducedMotion = useReducedMotion();
    const containerRef = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Optimized springs with lower stiffness for smoother animations
    const rotateX = useSpring(useTransform(mouseY, [-300, 300], [5, -5]), { stiffness: 50, damping: 20, mass: 0.5 });
    const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-5, 5]), { stiffness: 50, damping: 20, mass: 0.5 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (prefersReducedMotion || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    // Callouts animés
    const callouts = [
        { label: "Synthèse IA", position: "top-[140px] -left-4", delay: 1.2 },
        { label: "Plan d'action", position: "top-[340px] -right-4", delay: 1.4 },
        { label: "Email prêt", position: "bottom-[80px] -left-4", delay: 1.6 }
    ];

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full max-w-[420px] mx-auto"
            style={{ perspective: "1200px" }}
        >
            {/* Glow effect behind */}
            <div className="absolute inset-0 bg-gradient-to-br from-sage-300/40 via-sage-200/30 to-transparent rounded-[2rem] blur-3xl scale-110 -z-10" />

            <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.3 }}
                style={{
                    rotateX: prefersReducedMotion ? 5 : rotateX,
                    rotateY: prefersReducedMotion ? -8 : rotateY,
                    transformStyle: "preserve-3d"
                }}
                className="relative"
            >
                {/* Shadow layer */}
                <div className="absolute inset-0 bg-sage-900/20 rounded-[2rem] blur-2xl translate-y-8 translate-x-4 scale-95" />

                {/* Main card */}
                <div className="relative bg-white rounded-[1.5rem] border border-sage-200 shadow-2xl overflow-hidden"
                    style={{ transform: "translateZ(20px)" }}>

                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent pointer-events-none" />

                    {/* Report Header */}
                    <header className="flex justify-between items-end border-b-2 border-sage-100 p-5 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-sage-900 flex items-center justify-center text-white shadow-lg">
                                <Command className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-sage-900 tracking-tight leading-none">Rapport REX</h3>
                                <p className="text-[10px] text-stone-500 font-medium mt-0.5">Analyse Confidentielle</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-xs font-bold text-sage-900">Marie Dupont</p>
                            <p className="text-[9px] text-stone-400 font-mono">24 Oct 2025</p>
                        </div>
                    </header>

                    <div className="p-5 space-y-4">
                        {/* Synthèse IA */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="bg-stone-50 p-3.5 rounded-xl border border-stone-100 relative"
                        >
                            <div className="absolute -left-0.5 top-3 bottom-3 w-1 bg-sage-500 rounded-r-full" />
                            <h4 className="text-[9px] font-bold text-sage-600 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                                <BrainCircuit className="w-3 h-3" /> Synthèse IA
                            </h4>
                            <p className="text-stone-700 text-[11px] leading-relaxed mb-2">
                                Marie est engagée mais se sent <strong>saturée par l&apos;administratif</strong>.
                            </p>
                            <div className="flex items-center gap-2 bg-white p-2 rounded-lg border border-stone-200 shadow-sm">
                                <div className="bg-amber-100 p-1 rounded text-amber-600"><Lightbulb className="w-2.5 h-2.5" /></div>
                                <p className="text-[9px] font-bold text-stone-700">Conseil : &quot;Contrôleur&quot; → &quot;Facilitateur&quot;</p>
                            </div>
                        </motion.div>

                        {/* Thématiques Grid */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7, duration: 0.6 }}
                        >
                            <h4 className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mb-2">Analyse Thématique</h4>
                            <div className="grid grid-cols-2 gap-1.5">
                                {[
                                    { label: "Relation", value: "Manque soutien", color: "bg-orange-500" },
                                    { label: "Charge", value: "Saturée", color: "bg-red-500" },
                                    { label: "Motivation", value: "Freinée", color: "bg-yellow-400" },
                                    { label: "Objectifs", value: "Clairs", color: "bg-green-500" }
                                ].map((item, i) => (
                                    <div key={i} className="p-2 bg-white rounded-lg border border-stone-200 shadow-sm flex gap-2">
                                        <div className="mt-0.5"><div className={`w-1.5 h-1.5 rounded-full ${item.color}`} /></div>
                                        <div>
                                            <p className="text-[7px] font-bold text-stone-400 uppercase">T{i + 1}. {item.label}</p>
                                            <p className="text-[10px] font-bold text-sage-900">{item.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Plan d'Action */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.9, duration: 0.6 }}
                        >
                            <h4 className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mb-2">Plan d&apos;Action</h4>
                            <div className="space-y-1.5">
                                <div className="flex items-center gap-2 p-2.5 bg-white border-l-4 border-red-500 rounded-r-lg shadow-sm ring-1 ring-stone-100">
                                    <Square className="w-3 h-3 text-stone-300 shrink-0" />
                                    <div className="flex-1 flex justify-between items-center">
                                        <h5 className="text-[10px] font-bold text-sage-900">Envoyer l&apos;email</h5>
                                        <span className="text-[7px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-bold uppercase">Maintenant</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 p-2.5 bg-white border-l-4 border-sage-500 rounded-r-lg shadow-sm ring-1 ring-stone-100">
                                    <Square className="w-3 h-3 text-stone-300 shrink-0" />
                                    <div className="flex-1 flex justify-between items-center">
                                        <h5 className="text-[10px] font-bold text-sage-900">Point Hebdo (30 min)</h5>
                                        <span className="text-[7px] bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded font-bold uppercase">Planifier</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Kit Manager */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.1, duration: 0.6 }}
                            className="bg-sage-50 p-3 rounded-xl border border-sage-100"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <div className="bg-white p-1 rounded-lg shadow-sm text-sage-700">
                                    <Briefcase className="w-3 h-3" />
                                </div>
                                <h4 className="text-[9px] font-bold text-sage-900 uppercase tracking-wider">Kit Manager</h4>
                            </div>
                            <div className="grid grid-cols-2 gap-1.5">
                                <div className="bg-white rounded-lg p-2 border border-sage-200 flex items-center gap-1.5">
                                    <Mail className="w-3 h-3 text-blue-600" />
                                    <p className="text-[9px] font-bold text-stone-800">Email prêt</p>
                                </div>
                                <div className="bg-white rounded-lg p-2 border border-sage-200 flex items-center gap-1.5">
                                    <Mic2 className="w-3 h-3 text-purple-600" />
                                    <p className="text-[9px] font-bold text-stone-800">Script</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Callouts - simplified for performance */}
                {callouts.map((callout, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: callout.delay, duration: 0.4 }}
                        className={`absolute ${callout.position} z-20`}
                    >
                        <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg border border-sage-200 flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-sage-500" />
                            <span className="text-[10px] font-bold text-sage-800">{callout.label}</span>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Floating effect removed for performance */}
        </div>
    );
}

// Hero Principal
export function HeroPremium() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <header className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 px-6 overflow-hidden min-h-screen flex items-center">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-sage-50 via-white to-stone-50" />

            {/* Noise texture overlay */}
            <div className="absolute inset-0 opacity-[0.015]"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }}
            />

            {/* Optimized static blobs - CSS-based for better performance */}
            <div
                className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-sage-200/30 rounded-full blur-[120px] will-change-transform animate-blob-slow"
                style={{ transform: "translateZ(0)" }}
            />
            <div
                className="absolute bottom-20 left-1/4 w-[400px] h-[400px] bg-blue-100/20 rounded-full blur-[100px] will-change-transform animate-blob-medium"
                style={{ transform: "translateZ(0)", animationDelay: "2s" }}
            />
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sage-100/20 rounded-full blur-[150px] will-change-transform animate-blob-fast"
                style={{ transform: "translateZ(0)", animationDelay: "4s" }}
            />

            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
                {/* Text Content */}
                {isLoaded && (
                    <div className="text-left">
                        {/* Badges */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="flex flex-wrap gap-2 mb-8"
                        >
                            <AnimatedBadge delay={0.3}>
                                <Sparkles className="w-3 h-3 text-sage-600" />
                                Écoute augmentée
                            </AnimatedBadge>
                            <AnimatedBadge delay={0.4}>
                                <CheckSquare className="w-3 h-3 text-sage-600" />
                                Action immédiate
                            </AnimatedBadge>
                            <AnimatedBadge delay={0.5}>
                                <Briefcase className="w-3 h-3 text-sage-600" />
                                Rétention talents
                            </AnimatedBadge>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-sage-900 tracking-tight leading-[1.1] mb-6"
                        >
                            <span className="block">Transformez le</span>
                            <span className="relative inline-block">
                                <span
                                    className="relative z-10 bg-gradient-to-r from-sage-700 via-sage-600 to-sage-500 bg-clip-text text-transparent"
                                >
                                    ressenti collaborateur
                                </span>
                                <motion.span
                                    initial={{ scaleX: 0, opacity: 0 }}
                                    animate={{ scaleX: 1, opacity: 1 }}
                                    transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
                                    className="absolute -bottom-1 left-0 right-0 h-3 bg-gradient-to-r from-sage-300/80 to-sage-200/60 -z-10 origin-left rounded-sm"
                                />
                            </span>
                            <span className="block mt-2">
                                en{" "}
                                <motion.span
                                    className="relative inline-block"
                                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                    transition={{ delay: 1.2, duration: 0.5, type: "spring", stiffness: 200 }}
                                >
                                    <span className="relative z-10 text-sage-600">levier de performance</span>
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 1.5, duration: 0.4 }}
                                        className="absolute -inset-2 bg-sage-100 rounded-xl -z-10"
                                    />
                                    <motion.span
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.8, duration: 0.3 }}
                                        className="absolute -top-6 -right-6 text-2xl"
                                    >
                                        <Sparkles className="w-6 h-6 text-amber-400" />
                                    </motion.span>
                                </motion.span>
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="text-lg text-stone-600 max-w-lg mb-10 leading-relaxed"
                        >
                            Claovia est le <strong>copilote IA</strong> qui permet aux managers opérationnels de passer du constat à l&apos;action. Collecte de REX, analyse des non-dits et génération de kits de réponse : <strong>tout est prêt en 2 minutes</strong> pour fidéliser vos talents.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4 mb-10"
                        >
                            <Link
                                href="#demo-section"
                                className="group relative px-8 py-4 rounded-full bg-sage-800 text-white text-base font-medium overflow-hidden transition-all shadow-xl shadow-sage-300/30 hover:shadow-2xl hover:shadow-sage-300/40 hover:-translate-y-1 flex items-center justify-center gap-2"
                            >
                                {/* Shine effect */}
                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                <Play className="w-4 h-4" />
                                Voir la démo
                            </Link>
                            <Link
                                href="/onboarding"
                                className="px-8 py-4 rounded-full bg-white border border-sage-200 text-sage-800 text-base font-medium hover:bg-sage-50 transition-all flex items-center justify-center gap-2 hover:-translate-y-1 shadow-lg shadow-stone-100"
                            >
                                <Zap className="w-4 h-4" />
                                Générer un exemple
                            </Link>
                        </motion.div>

                        {/* Proof elements */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.4 }}
                            className="flex items-center gap-6 text-xs text-stone-500 font-medium"
                        >
                            <span className="flex items-center gap-1.5">
                                <FileText className="w-4 h-4 text-sage-600" /> PDF A4 prêt
                            </span>
                            <span className="flex items-center gap-1.5">
                                <ShieldCheck className="w-4 h-4 text-sage-600" /> Confidentiel
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Zap className="w-4 h-4 text-sage-600" /> 2 min
                            </span>
                        </motion.div>

                        {/* Mini features */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.5 }}
                            className="mt-12 pt-8 border-t border-stone-200 grid grid-cols-3 gap-4"
                        >
                            {[
                                { icon: BrainCircuit, label: "Comprendre", desc: "Le vrai problème" },
                                { icon: CheckSquare, label: "Agir", desc: "Tout de suite" },
                                { icon: FileText, label: "Garder", desc: "Ses talents" }
                            ].map((feature, i) => (
                                <div key={i} className="text-center">
                                    <div className="w-10 h-10 mx-auto mb-2 bg-sage-50 rounded-xl flex items-center justify-center text-sage-600">
                                        <feature.icon className="w-5 h-5" />
                                    </div>
                                    <p className="text-xs font-bold text-sage-900">{feature.label}</p>
                                    <p className="text-[10px] text-stone-500">{feature.desc}</p>
                                </div>
                            ))}
                        </motion.div>

                        {/* Security badges */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.6 }}
                            className="mt-8 flex items-center gap-4 text-[10px] text-stone-400"
                        >
                            <span className="flex items-center gap-1">
                                <ShieldCheck className="w-3 h-3" /> RGPD
                            </span>
                            <span className="flex items-center gap-1">
                                <Server className="w-3 h-3" /> France
                            </span>
                            <span className="flex items-center gap-1">
                                <Lock className="w-3 h-3" /> Chiffré
                            </span>
                        </motion.div>
                    </div>
                )}

                {/* 3D Mockup */}
                <div className="relative hidden lg:block">
                    <ReportMockup3D />
                </div>

                {/* Mobile Mockup (simplified) */}
                <div className="lg:hidden">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="max-w-sm mx-auto"
                    >
                        <ReportMockup3D />
                    </motion.div>
                </div>
            </div>
        </header>
    );
}
