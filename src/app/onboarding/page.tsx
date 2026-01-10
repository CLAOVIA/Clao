"use client";

import Link from "next/link";
import {
    MessageCircle,
    Layers,
    FileCheck,
    CheckCircle,
    HeartHandshake,
    LayoutGrid,
    Zap,
    ArrowRight,
    Lock
} from "lucide-react";

export default function OnboardingPage() {

    const handleStart = () => {
        // Redirect directly to Typebot
        window.location.href = "https://typebot.co/claovia-rex-clao-ia-05gi2vb";
    };

    return (
        <div className="min-h-screen flex flex-col bg-sage-50 text-stone-600 font-sans selection:bg-sage-200 selection:text-sage-900">

            {/* Simple Header */}
            <header className="py-6 px-6 flex justify-center">
                <Link href="/" className="group transition-opacity hover:opacity-80">
                    <span className="font-bold text-2xl text-sage-900 tracking-tight">Claovia</span>
                </Link>
            </header>

            <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-8 md:py-12 flex flex-col items-center">

                {/* Hero Title */}
                <div className="text-center mb-12 animate-slide-up">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-sage-200 shadow-sm mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-xs font-semibold text-sage-800 tracking-wide uppercase">Espace Collaborateur</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-sage-900 mb-6 leading-tight">
                        Transformez votre ressenti<br />en actions managériales
                    </h1>
                    <p className="text-lg text-stone-500 max-w-xl mx-auto">
                        L&apos;expérience commence ici. Vous parlez librement, l&apos;IA centralise et structure l&apos;information pour votre manager.
                    </p>
                </div>

                {/* The Process Animation (Chat Flow) */}
                <div className="w-full bg-white rounded-[2rem] p-8 md:p-12 shadow-xl shadow-sage-200/50 border border-sage-100 mb-16 relative overflow-hidden animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    {/* Background Blob */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-sage-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

                    <div className="relative z-10 grid md:grid-cols-3 gap-8 items-center text-center">

                        {/* Step 1: Input (Chat Bubble) */}
                        <div className="flex flex-col items-center group relative z-10">
                            <div className="bg-blue-50 w-20 h-20 rounded-2xl flex items-center justify-center text-blue-600 mb-6 shadow-sm border border-blue-100">
                                <MessageCircle className="w-10 h-10" />
                            </div>
                            <h3 className="font-bold text-sage-900 mb-2">1. Discussion avec Clao</h3>
                            <div className="bg-white p-3 rounded-tr-2xl rounded-tl-2xl rounded-bl-2xl rounded-br-none border border-blue-100 text-xs text-stone-500 italic shadow-sm max-w-[220px] mx-auto text-left relative">
                                <div className="absolute -bottom-2 -right-0 w-4 h-4 bg-white border-b border-r border-blue-100 transform rotate-45"></div>
                                &quot;Honnêtement, c&apos;est le chaos sur le projet X, je me sens seul...&quot;
                            </div>
                        </div>

                        {/* Step 2: AI Magic (Center) */}
                        <div className="flex flex-col items-center relative z-20">
                            <div className="hidden md:block absolute top-10 left-[-50%] right-[-50%] h-1 rounded-full bg-linear-to-r from-sage-200 via-sage-500 to-sage-200 opacity-30 -z-10 animate-pulse"></div>
                            <div className="bg-sage-900 w-20 h-20 rounded-full flex items-center justify-center text-white mb-4 shadow-lg shadow-sage-200 border-4 border-white animate-pulse-soft">
                                <Layers className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold text-sage-900 mb-1">Centralisation Intelligente</h3>
                            <div className="flex gap-2 text-xs text-sage-600 font-medium bg-sage-50 px-3 py-1 rounded-full border border-sage-100 mb-2">
                                Analyse & Structuration
                            </div>
                            <p className="text-xs text-stone-500 max-w-[180px] leading-relaxed">
                                L&apos;IA agrège vos retours pour en extraire l&apos;essentiel sans perdre le sens.
                            </p>
                        </div>

                        {/* Step 3: Output (Report) */}
                        <div className="flex flex-col items-center group relative z-10">
                            <div className="bg-green-50 w-20 h-20 rounded-2xl flex items-center justify-center text-green-600 mb-6 shadow-sm border border-green-100">
                                <FileCheck className="w-10 h-10" />
                            </div>
                            <h3 className="font-bold text-sage-900 mb-2">3. Le Manager reçoit</h3>
                            <div className="bg-white p-3 rounded-xl border border-green-100 text-xs text-stone-600 font-medium shadow-sm max-w-[220px] mx-auto text-left flex gap-2 items-start">
                                <div className="w-1 h-full bg-green-500 rounded-full shrink-0"></div>
                                &quot;Le collaborateur exprime un besoin de structuration et de soutien sur le projet X.&quot;
                            </div>
                        </div>

                    </div>

                    <p className="text-center text-sm text-stone-400 mt-10 flex items-center justify-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Reformulation professionnelle & Centralisation de l&apos;info
                    </p>
                </div>

                {/* Values Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-16 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                    <div className="p-6 bg-white rounded-2xl border border-stone-100 text-center hover:shadow-md transition-all">
                        <div className="bg-sage-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-sage-600">
                            <HeartHandshake className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-sage-900 mb-2">Authenticité</h4>
                        <p className="text-sm text-stone-500">Parlez avec vos mots, sans filtre. Clao comprend le contexte émotionnel.</p>
                    </div>
                    <div className="p-6 bg-white rounded-2xl border border-stone-100 text-center hover:shadow-md transition-all">
                        <div className="bg-sage-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-sage-600">
                            <LayoutGrid className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-sage-900 mb-2">Clarté</h4>
                        <p className="text-sm text-stone-500">L&apos;information est centralisée et organisée pour être directement exploitable.</p>
                    </div>
                    <div className="p-6 bg-white rounded-2xl border border-stone-100 text-center hover:shadow-md transition-all">
                        <div className="bg-sage-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-sage-600">
                            <Zap className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-sage-900 mb-2">Impact Rapide</h4>
                        <p className="text-sm text-stone-500">Votre manager reçoit des outils pour agir, pas juste un constat.</p>
                    </div>
                </div>

                {/* Simple CTA Button */}
                <div className="w-full max-w-md animate-slide-up text-center" style={{ animationDelay: '0.6s' }}>
                    <button
                        onClick={handleStart}
                        className="w-full bg-sage-800 hover:bg-sage-900 text-white font-bold py-5 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 flex items-center justify-center gap-3 text-xl group"
                    >
                        Commencer maintenant
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <p className="mt-4 text-sm text-stone-400 flex items-center justify-center gap-2">
                        <Lock className="w-4 h-4" />
                        Données chiffrées et confidentielles
                    </p>
                </div>

            </main>

            <footer className="text-center py-8 text-[10px] text-stone-400 border-t border-stone-100 bg-white">
                © 2026 Claovia. Tous droits réservés.
            </footer>
        </div>
    );
}
