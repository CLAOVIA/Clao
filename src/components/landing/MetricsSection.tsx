"use client";

import { TrendingDown, Users, AlertCircle, ExternalLink, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

export function MetricsSection() {
    const metrics = [
        {
            value: "15,5%",
            label: "Taux de turnover moyen",
            description: "En France en 2024. Au-delà de 15%, l'INSEE considère ce taux comme élevé et révélateur de problèmes structurels.",
            source: "INSEE",
            sourceUrl: "https://www.insee.fr/fr/statistiques/4501583",
            year: "2024",
            icon: TrendingDown,
            color: "red",
            highlight: false
        },
        {
            value: "34%",
            label: "Salariés en burn-out",
            description: "Des salariés français se déclarent en situation de burn-out ou à risque selon le Baromètre Empreinte Humaine.",
            source: "Empreinte Humaine / OpinionWay",
            sourceUrl: "https://www.asso-franceburnout.fr/quelles-sont-les-statistiques-du-burn-out-en-france/",
            year: "2024",
            icon: AlertCircle,
            color: "amber",
            highlight: true
        },
        {
            value: "7%",
            label: "Salariés engagés",
            description: "Seulement 7% des Français sont engagés dans leur travail. La France est 36ème sur 38 pays européens.",
            source: "Gallup",
            sourceUrl: "https://zestmeup.com/blog/etude-gallup-lengagement-au-travail-des-salaries-europeens/",
            year: "2025",
            icon: Users,
            color: "sage",
            highlight: false
        }
    ];

    const getColorClasses = (color: string) => {
        const colors: Record<string, { bg: string; border: string; icon: string; iconBg: string }> = {
            red: { bg: "bg-red-50/50", border: "border-red-100", icon: "text-red-600", iconBg: "bg-red-100" },
            amber: { bg: "bg-amber-50/50", border: "border-amber-100", icon: "text-amber-600", iconBg: "bg-amber-100" },
            sage: { bg: "bg-sage-50/50", border: "border-sage-100", icon: "text-sage-600", iconBg: "bg-sage-100" }
        };
        return colors[color] || colors.sage;
    };

    return (
        <section className="py-24 bg-white relative overflow-hidden" id="metrics">
            {/* Background decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-red-50 via-amber-50 to-sage-50 rounded-full blur-3xl opacity-30" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-100 text-stone-600 text-sm font-medium mb-6">
                        <BarChart3 className="w-4 h-4" />
                        Données officielles
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-sage-900 mb-6">
                        Le coût caché du <span className="text-stone-400 decoration-sage-300 underline underline-offset-4 decoration-2">silence</span>
                    </h2>
                    <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                        Les chiffres parlent d&apos;eux-mêmes. Le manque d&apos;écoute a un impact mesurable sur vos équipes.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {metrics.map((metric, index) => {
                        const colors = getColorClasses(metric.color);
                        const Icon = metric.icon;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`p-8 rounded-3xl ${colors.bg} ${colors.border} border hover:shadow-xl transition-all group relative ${metric.highlight ? 'scale-105 shadow-xl z-10' : ''}`}
                            >
                                {/* Year Badge */}
                                <div className="absolute top-4 right-4 px-2 py-1 bg-white/80 rounded-full text-xs font-medium text-stone-500 border border-stone-200">
                                    {metric.year}
                                </div>

                                <div className={`w-14 h-14 ${colors.iconBg} rounded-2xl flex items-center justify-center ${colors.icon} mb-6 group-hover:scale-110 transition-transform`}>
                                    <Icon className="w-7 h-7" />
                                </div>

                                <h3 className="text-5xl font-bold text-sage-900 mb-3">{metric.value}</h3>
                                <p className="font-bold text-stone-700 mb-3 text-lg">{metric.label}</p>
                                <p className="text-sm text-stone-500 mb-6 leading-relaxed">{metric.description}</p>

                                {/* Source Link */}
                                <a
                                    href={metric.sourceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-xs font-medium text-sage-600 hover:text-sage-800 transition-colors group/link"
                                >
                                    <span className="px-2 py-1 bg-white rounded-md border border-sage-200">
                                        Source: {metric.source}
                                    </span>
                                    <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                                </a>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-16 text-center"
                >
                    <div className="inline-flex items-center gap-4 p-4 bg-sage-50 rounded-2xl border border-sage-100">
                        <div className="w-10 h-10 bg-sage-500 rounded-xl flex items-center justify-center text-white">
                            <BarChart3 className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-bold text-sage-900">70% de la variance d&apos;engagement</p>
                            <p className="text-xs text-stone-500">dépend directement du manager selon Gallup</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
