import React from 'react';
import { Camera, Sprout, ArrowRight, ShieldCheck, Sparkles, CheckCircle2, Zap } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface HeroProps {
  lang: Language;
  onStartDetection: () => void;
  onViewDiseases: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onStartDetection, onViewDiseases }) => {
  const t = TRANSLATIONS[lang].hero;

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24">
      {/* Decorative Mint Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-emerald-200/40 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs (Exact match to reference mockup) */}
          <div className="lg:col-span-6 space-y-6 lg:space-y-8">
            {/* Subtle Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200/80 text-emerald-800 text-xs sm:text-sm font-semibold tracking-wide">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>{t.tag}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              {t.titlePrefix}{' '}
              <span className="text-emerald-500 font-black relative inline-block">
                {t.titleHighlight}
              </span>{' '}
              {t.titleSuffix}
            </h1>

            {/* Subtitle Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl font-normal">
              {t.description}
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {/* Primary Pill Button */}
              <button
                onClick={onStartDetection}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-semibold text-base shadow-lg shadow-emerald-500/25 transition-all duration-200 group"
              >
                <Camera className="w-5 h-5 text-emerald-100 group-hover:rotate-6 transition-transform" />
                <span>{t.btnStart}</span>
              </button>

              {/* Secondary Outlined Pill Button */}
              <button
                onClick={onViewDiseases}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full border-2 border-emerald-500/80 hover:border-emerald-600 hover:bg-emerald-50/80 active:scale-95 text-emerald-700 font-semibold text-base transition-all duration-200"
              >
                <Sprout className="w-5 h-5 text-emerald-600" />
                <span>{t.btnDiseases}</span>
              </button>
            </div>

            {/* Quick Feature Metric Badges */}
            <div className="pt-6 border-t border-emerald-100/90 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>{t.stats.accuracy}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 font-medium">
                <Zap className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>{t.stats.latency}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 font-medium">
                <Sparkles className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>{t.stats.explainability}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>{t.stats.grounded}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero High-Tech Greenhouse Image Card (Exact match to reference mockup) */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Soft background aura */}
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400/20 to-teal-300/30 rounded-3xl transform rotate-1 scale-105 filter blur-xl -z-10" />

              {/* Main Card with Image */}
              <div className="relative rounded-3xl sm:rounded-4xl overflow-hidden border border-emerald-100 bg-white shadow-2xl shadow-emerald-950/10 group">
                <img
                  src="/hero_greenhouse.png"
                  alt="High-tech automated smart agricultural crop inspection greenhouse with robotic monitoring"
                  className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-500"
                  onError={(e) => {
                    // Fallback to high quality agritech photo if local crop has issues
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80';
                  }}
                />

                {/* Floating Glassmorphism Badge: AI Active Scanner */}
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 glass-panel rounded-2xl p-3 sm:p-4 shadow-lg border border-white/70 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/30">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider font-semibold text-emerald-700">
                      Edge Model Verified
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-slate-900">
                      MobileNetV3 • 90.1% F1
                    </p>
                  </div>
                </div>

                {/* Floating Glassmorphism Badge: Real-Time Saliency */}
                <div className="absolute top-4 right-4 glass-panel rounded-full px-3 py-1.5 shadow-md border border-white/70 flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Grad-CAM Ready</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
