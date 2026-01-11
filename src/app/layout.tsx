import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Claovia - Transformez chaque retour d'expérience en action",
  description: "L'IA qui donne a vos managers les outils pour comprendre et agir. 93% des salaries ne se sentent pas ecoutes. Changez ca.",
  keywords: ["RH", "feedback", "manager", "collaborateur", "IA", "REX", "retour experience"],
  openGraph: {
    title: "Claovia - Transformez chaque feedback en action",
    description: "L'IA qui donne a vos managers les outils pour comprendre et agir.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${inter.variable} bg-sage-50 text-stone-600 antialiased font-sans selection:bg-sage-200 selection:text-sage-900 overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
