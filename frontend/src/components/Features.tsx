import React from 'react';
import {
  Sparkles,
  Eye,
  ShieldCheck,
  BookOpen,
  Languages,
  Zap,
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface FeaturesProps {
  lang: Language;
}

export const Features: React.FC<FeaturesProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang].features;

  const featuresList = [
    {
      icon: <Zap className="w-6 h-6 text-emerald-600" />,
      title: t.f1Title,
      desc: t.f1Desc,
    },
    {
      icon: <Eye className="w-6 h-6 text-teal-600" />,
      title: t.f2Title,
      desc: t.f2Desc,
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-amber-600" />,
      title: t.f3Title,
      desc: t.f3Desc,
    },
    {
      icon: <BookOpen className="w-6 h-6 text-emerald-600" />,
      title: t.f4Title,
      desc: t.f4Desc,
    },
    {
      icon: <Languages className="w-6 h-6 text-teal-600" />,
      title: t.f5Title,
      desc: t.f5Desc,
    },
    {
      icon: <Sparkles className="w-6 h-6 text-amber-600" />,
      title: t.f6Title,
      desc: t.f6Desc,
    },
  ];

  return (
    <section id="features" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 text-emerald-800 text-xs sm:text-sm font-semibold mb-3">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Core Capabilities</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {t.title}
        </h2>
        <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal">
          {t.subtitle}
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuresList.map((feat, i) => (
          <div
            key={i}
            className="bg-white rounded-3xl p-8 border border-emerald-100/90 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
              {feat.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900">{feat.title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">{feat.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
