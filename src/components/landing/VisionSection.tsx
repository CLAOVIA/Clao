"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronDown,
    Target,
    Users,
    TrendingUp,
    Compass,
    AlertTriangle,
    ArrowDown,
    Sparkles,
    Eye,
    Lightbulb
} from "lucide-react";

export function VisionSection() {
    const [isOpen, setIsOpen] = useState(false);

    const steps = [
        {
            id: 1,
            title: "L'Expert Métier",
            quote: "Je maîtrise mon sujet.",
            result: "Je produis 100k€ au lieu de 70k€.",
            icon: Target,
            color: "blue",
            trap: {
                title: "Le Piège n°1",
                subtitle: "Du \"Faire\" au \"Faire Faire\"",
                description: "Être un bon expert ne veut pas dire savoir animer une équipe."
            }
        },
        {
            id: 2,
            title: "Le Manager",
            quote: "Je dois faire réussir les autres.",
            result: "Je gère l'humain et les conflits.",
            icon: Users,
            color: "sage",
            trap: {
                title: "Le Piège n°2",
                subtitle: "Humain vs Rentabilité",
                description: "Savoir manager ne veut pas dire savoir piloter un profit."
            }
        },
        {
            id: 3,
            title: "Le Responsable",
            quote: "Je garantis la rentabilité.",
            result: "Je pilote des tableaux complexes.",
            icon: TrendingUp,
            color: "amber",
            trap: {
                title: "Le Piège n°3",
                subtitle: "Optimisation vs Vision",
                description: "Savoir gérer ne veut pas dire savoir définir une vision."
            }
        },
        {
            id: 4,
            title: "Le Directeur",
            quote: "Je trace la route de demain.",
            result: "",
            icon: Compass,
            color: "purple",
            trap: null
        }
    ];

    const getColorClasses = (color: string) => {
        const colors: Record<string, { bg: string; text: string; border: string; light: string }> = {
            blue: { bg: "bg-blue-500", text: "text-blue-600", border: "border-blue-200", light: "bg-blue-50" },
            sage: { bg: "bg-sage-500", text: "text-sage-600", border: "border-sage-200", light: "bg-sage-50" },
            amber: { bg: "bg-amber-500", text: "text-amber-600", border: "border-amber-200", light: "bg-amber-50" },
            purple: { bg: "bg-purple-500", text: "text-purple-600", border: "border-purple-200", light: "bg-purple-50" }
        };
        return colors[color] || colors.sage;
    };

    return (
        <section className="py-24 bg-white relative overflow-hidden" id="vision">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-sage-50 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-sage-50 rounded-full blur-3xl opacity-50 translate-x-1/2 translate-y-1/2" />

            <div className="max-w-5xl mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-sage-100 text-sage-700 text-sm font-medium mb-6">
                            Notre Vision
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-sage-900 mb-4">
                            L&apos;origine d&apos;une réflexion
                        </h2>
                        <p className="text-lg text-stone-500 max-w-2xl mx-auto">
                            Claovia est née d&apos;une analyse systémique du monde de l&apos;entreprise — fruit d&apos;années d&apos;observation.
                        </p>
                    </motion.div>
                </div>

                {/* Le Constat - Cards Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="grid md:grid-cols-2 gap-6 mb-12"
                >
                    {/* Card 1: Le Constat */}
                    <div className="bg-gradient-to-br from-stone-50 to-stone-100 rounded-3xl p-8 border border-stone-200">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-12 h-12 bg-stone-200 rounded-2xl flex items-center justify-center text-stone-600 shrink-0">
                                <Eye className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-sage-900 mb-2">Le Constat</h3>
                                <p className="text-stone-600 leading-relaxed">
                                    Les mêmes processus se répètent : des dysfonctionnements humains que personne n&apos;osait nommer.
                                </p>
                            </div>
                        </div>
                        <div className="mt-4 p-4 bg-white/60 rounded-xl border border-stone-200">
                            <p className="text-sm text-stone-500 italic">
                                &quot;On promouvait les meilleurs techniciens au poste de manager, sans leur donner les outils pour réussir cette transition.&quot;
                            </p>
                        </div>
                    </div>

                    {/* Card 2: La Solution */}
                    <div className="bg-gradient-to-br from-sage-50 to-sage-100 rounded-3xl p-8 border border-sage-200">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-12 h-12 bg-sage-500 rounded-2xl flex items-center justify-center text-white shrink-0">
                                <Lightbulb className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-sage-900 mb-2">Notre Réponse</h3>
                                <p className="text-stone-600 leading-relaxed">
                                    Augmenter le manager de proximité avec l&apos;IA pour qu&apos;il puisse enfin écouter, comprendre et agir.
                                </p>
                            </div>
                        </div>
                        <div className="mt-4 p-4 bg-white/60 rounded-xl border border-sage-200">
                            <p className="text-sm text-sage-700 font-medium">
                                L&apos;IA gère l&apos;écoute et l&apos;analyse. Le manager garde le lien humain.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* La Genèse - Accordion */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-sage-50 rounded-3xl p-8 md:p-10"
                >
                    <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 bg-sage-500 rounded-2xl flex items-center justify-center text-white shrink-0">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-sage-900 mb-2">La Genèse</h3>
                            <p className="text-stone-600">
                                Comprendre le cycle d&apos;évolution professionnelle et ses pièges structurels.
                            </p>
                        </div>
                    </div>

                    {/* Accordion Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full flex items-center justify-between p-5 bg-white rounded-2xl border border-sage-200 hover:border-sage-300 hover:shadow-md transition-all group"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-sage-500 animate-pulse" />
                            <span className="font-semibold text-sage-800">
                                {isOpen ? "Masquer le schéma d'évolution" : "Découvrir le schéma d'évolution"}
                            </span>
                        </div>
                        <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="w-10 h-10 bg-sage-100 rounded-full flex items-center justify-center text-sage-600 group-hover:bg-sage-200 transition-colors"
                        >
                            <ChevronDown className="w-5 h-5" />
                        </motion.div>
                    </button>

                    {/* Accordion Content */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="overflow-hidden"
                            >
                                <div className="pt-8">
                                    {/* Timeline */}
                                    <div className="relative">
                                        {/* Vertical Line */}
                                        <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-sage-300 to-purple-200" />

                                        {steps.map((step, index) => {
                                            const colors = getColorClasses(step.color);
                                            const Icon = step.icon;

                                            return (
                                                <motion.div
                                                    key={step.id}
                                                    initial={{ opacity: 0, x: -30 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.5, delay: index * 0.15 }}
                                                    className="relative mb-8 last:mb-0"
                                                >
                                                    {/* Step Card */}
                                                    <div className="flex items-start gap-6 ml-0">
                                                        {/* Icon Circle */}
                                                        <div className={`relative z-10 w-14 h-14 ${colors.light} rounded-2xl flex items-center justify-center ${colors.text} shrink-0 border-4 border-white shadow-lg`}>
                                                            <Icon className="w-6 h-6" />
                                                        </div>

                                                        {/* Content */}
                                                        <div className={`flex-1 bg-white rounded-2xl p-6 border ${colors.border} shadow-sm hover:shadow-md transition-shadow`}>
                                                            <h4 className="font-bold text-sage-900 text-lg mb-2">{step.title}</h4>
                                                            <p className="text-sage-700 font-medium italic mb-2">&quot;{step.quote}&quot;</p>
                                                            {step.result && (
                                                                <p className="text-sm text-stone-500 bg-stone-50 px-3 py-1.5 rounded-lg inline-block">
                                                                    {step.result}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Trap Card */}
                                                    {step.trap && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: -10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ duration: 0.4, delay: index * 0.15 + 0.2 }}
                                                            className="relative ml-20 mt-4"
                                                        >
                                                            {/* Connector */}
                                                            <div className="absolute -top-4 left-0 flex flex-col items-center">
                                                                <div className="w-0.5 h-4 bg-red-200" />
                                                                <ArrowDown className="w-4 h-4 text-red-300 -mt-1" />
                                                            </div>

                                                            <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 rounded-xl p-5 ml-4">
                                                                <div className="flex items-start gap-3">
                                                                    <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center text-red-500 shrink-0">
                                                                        <AlertTriangle className="w-5 h-5" />
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
                                                                            {step.trap.title}
                                                                        </p>
                                                                        <p className="font-semibold text-red-800 mb-1">
                                                                            {step.trap.subtitle}
                                                                        </p>
                                                                        <p className="text-sm text-red-700">
                                                                            {step.trap.description}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </motion.div>
                                            );
                                        })}
                                    </div>

                                    {/* Conclusion */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.7 }}
                                        className="mt-10 p-6 bg-sage-900 rounded-2xl text-center relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-sage-800/50 to-sage-900/50" />
                                        <div className="relative z-10">
                                            <p className="text-sage-100 text-lg font-medium mb-2">
                                                À chaque niveau, la compétence qui a permis la promotion devient insuffisante.
                                            </p>
                                            <p className="text-sage-300 text-sm">
                                                Claovia augmente le manager de proximité pour qu&apos;il réussisse cette transition critique.
                                            </p>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

            </div>
        </section>
    );
}
