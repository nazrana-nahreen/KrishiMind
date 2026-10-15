import React from 'react';
import {
  Info,
  ShieldAlert,
  Sprout,
  Heart,
  Award,
  Layers,
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface AboutProps {
  lang: Language;
}

export const About: React.FC<AboutProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang].about;

  return (
    <section id="about" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-emerald-100 shadow-sm space-y-10">
        
        {/* Title */}
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 text-emerald-800 text-xs sm:text-sm font-semibold">
            <Info className="w-4 h-4 text-emerald-600" />
            <span>Capstone Context & Mission</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.title}
          </h2>
          <p className="text-base text-slate-600">{t.subtitle}</p>
        </div>

        {/* Story Body */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-sm sm:text-base text-slate-700 leading-relaxed">
          <div className="space-y-4">
            <p>{t.p1}</p>
            <p>{t.p2}</p>
          </div>

          <div className="bg-emerald-50/60 p-6 rounded-3xl border border-emerald-100 space-y-4">
            <h4 className="text-base font-bold text-emerald-950 flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" />
              <span>Project Artifacts & Specifications</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span><strong>Model:</strong> MobileNetV3-Small (930k parameters, 0.9013 Accuracy)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span><strong>Explainability:</strong> Grad-CAM gradient saliency maps</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span><strong>Target Classes:</strong> Bacterial Blight, Brown Spot, Tungro, Healthy</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span><strong>Framework:</strong> PyTorch 2.x • FastAPI • React 18 • Vite • Tailwind</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Agricultural Safety Disclaimer (Mandatory per Project Document Section 20) */}
        <div className="p-6 rounded-2xl bg-amber-50 border-2 border-amber-200/90 text-amber-900 space-y-2">
          <div className="flex items-center gap-2 font-bold text-amber-900 text-sm sm:text-base">
            <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <span>{t.disclaimerTitle}</span>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed text-amber-950/90 font-normal">
            {t.disclaimerBody}
          </p>
        </div>

      </div>
    </section>
  );
};
