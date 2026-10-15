import React from 'react';
import { Sprout, Heart } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface FooterProps {
  lang: Language;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onNavigate }) => {
  const t = TRANSLATIONS[lang].footer;
  const nav = TRANSLATIONS[lang].nav;

  return (
    <footer className="bg-white border-t border-emerald-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-bold text-slate-900">
                {lang === 'bn' ? 'কৃষিমাইন্ড এআই' : 'KrishiMind AI'}
              </span>
              <span className="text-[11px] block text-emerald-700/80 font-medium">
                PlantPulse Rice Pathology Assistant
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-600 font-medium">
            <button onClick={() => onNavigate('home')} className="hover:text-emerald-700">
              {nav.home}
            </button>
            <button onClick={() => onNavigate('features')} className="hover:text-emerald-700">
              {nav.features}
            </button>
            <button onClick={() => onNavigate('detect')} className="hover:text-emerald-700">
              {nav.detect}
            </button>
            <button onClick={() => onNavigate('database')} className="hover:text-emerald-700">
              {nav.database}
            </button>
            <button onClick={() => onNavigate('insights')} className="hover:text-emerald-700">
              {nav.insights}
            </button>
            <button onClick={() => onNavigate('assistant')} className="hover:text-emerald-700">
              {nav.assistant}
            </button>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>{t.rights}</p>
          <p className="flex items-center gap-1.5 text-center">
            <span>{t.designedFor}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
