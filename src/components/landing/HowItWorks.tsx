import { MessageSquare, Cpu, CheckCircle2 } from "lucide-react";

export function HowItWorks() {
    return (
        <section className="py-24 bg-sage-50/50" id="how-it-works">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-xs font-bold text-sage-600 uppercase tracking-widest bg-sage-100 px-3 py-1 rounded-full">Processus Simple</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-sage-900 mt-4 mb-6">
                        Du message à l&apos;action en 3 étapes
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-12 relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-sage-300 to-transparent border-t border-dashed border-sage-400 opacity-50"></div>

                    {/* Step 1 */}
                    <div className="relative flex flex-col items-center text-center">
                        <div className="w-24 h-24 bg-white rounded-full border-4 border-sage-100 shadow-xl flex items-center justify-center text-sage-600 mb-6 relative z-10">
                            <MessageSquare className="w-10 h-10" />
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-sage-800 text-white rounded-full flex items-center justify-center font-bold text-sm border-2 border-white">1</div>
                        </div>
                        <h3 className="text-xl font-bold text-sage-900 mb-3">Libération de la parole</h3>
                        <p className="text-stone-600 text-sm leading-relaxed px-4">
                            Le collaborateur discute librement avec l&apos;IA. Anonymat garanti, écoute bienveillante 24/7.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="relative flex flex-col items-center text-center">
                        <div className="w-24 h-24 bg-white rounded-full border-4 border-sage-100 shadow-xl flex items-center justify-center text-sage-600 mb-6 relative z-10">
                            <Cpu className="w-10 h-10" />
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-sage-800 text-white rounded-full flex items-center justify-center font-bold text-sm border-2 border-white">2</div>
                        </div>
                        <h3 className="text-xl font-bold text-sage-900 mb-3">Analyse & Structuration</h3>
                        <p className="text-stone-600 text-sm leading-relaxed px-4">
                            L&apos;IA synthétise les points clés, détecte les signaux faibles et prépare un rapport objectif.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="relative flex flex-col items-center text-center">
                        <div className="w-24 h-24 bg-white rounded-full border-4 border-sage-100 shadow-xl flex items-center justify-center text-sage-600 mb-6 relative z-10">
                            <CheckCircle2 className="w-10 h-10" />
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-sage-800 text-white rounded-full flex items-center justify-center font-bold text-sm border-2 border-white">3</div>
                        </div>
                        <h3 className="text-xl font-bold text-sage-900 mb-3">Action Managériale</h3>
                        <p className="text-stone-600 text-sm leading-relaxed px-4">
                            Le manager reçoit un kit complet : synthèse, conseils, et plan d&apos;action prêt à l&apos;emploi.
                        </p>
                    </div>
                </div>

                {/* CTA Button */}
                <div className="mt-16 text-center">
                    <a
                        href="https://typebot.co/l-o-l-2-svsf1j3"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-sage-800 text-white rounded-full font-bold text-lg hover:bg-sage-900 transition-all hover:scale-105 shadow-lg shadow-sage-300/30"
                    >
                        Commencer maintenant
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>

                    {/* Mode Explanation */}
                    <div className="mt-6 max-w-xl mx-auto text-xs text-stone-500 space-y-1">
                        <p><span className="font-semibold text-emerald-600">Mode Test :</span> Le collaborateur reçoit sa synthèse et le manager reçoit le REX.</p>
                        <p><span className="font-semibold text-blue-600">Mode Réel :</span> Le collaborateur reçoit sa synthèse et le manager reçoit également les résultats.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
