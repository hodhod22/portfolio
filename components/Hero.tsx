"use client";

import { FiArrowRight, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient med v4 variabler */}
      <div className="absolute inset-0 bg-linear-to-br from-primary-500/10 via-secondary-500/10 to-pink-500/10" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Frontend-utvecklare med
            <span className="block text-gradient">Next.js & TypeScript</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
            Jag bygger moderna, snabba och responsiva webbapplikationer som
            löser verkliga problem.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/demo">
              <button className="w-full sm:w-auto px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2">
                Se mina projekt
                <FiArrowRight />
              </button>
            </Link>
            <Link href="#contact">
              <button className="w-full sm:w-auto px-6 py-3 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                Kontakta mig
                <FiMail />
              </button>
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6">
            <a
              href="https://github.com/dittanvändarnamn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <FiGithub className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/in/dittnamn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <FiLinkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
