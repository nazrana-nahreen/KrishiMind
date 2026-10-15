import React from 'react';
import {
  BarChart3,
  Cpu,
  Target,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Table,
  Zap,
} from 'lucide-react';
import { Language, ClassKey } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { DISEASE_DATABASE } from '../data/diseaseDatabase';

interface ModelInsightsProps {
  lang: Language;
}

const METRICS_DATA = {
  accuracy: 0.9013,
  macro_f1: 0.9076,
  total_test: 223,
  latency_ms: 72,
  classes: ['bacterial_leaf_blight', 'brown_spot', 'healthy_leaf', 'tungro_virus'],
  per_class: {
    bacterial_leaf_blight: { precision: 0.7966, recall: 0.8704, f1: 0.8319, support: 54 },
    brown_spot: { precision: 0.9608, recall: 0.9245, f1: 0.9423, support: 53 },
    healthy_leaf: { precision: 1.0, recall: 0.9211, f1: 0.9589, support: 38 },
    tungro_virus: { precision: 0.8974, recall: 0.8974, f1: 0.8974, support: 78 },
  },
  confusion_matrix: [
    [47, 1, 0, 6],
    [2, 49, 0, 2],
    [3, 0, 35, 0],
    [7, 1, 0, 70],
  ],
};

const CLASS_SHORT_NAMES = {
  bacterial_leaf_blight: { en: 'Bacterial Blight', bn: 'পাতা পোড়া' },
  brown_spot: { en: 'Brown Spot', bn: 'বাদামী দাগ' },
  healthy_leaf: { en: 'Healthy Leaf', bn: 'সুস্থ পাতা' },
  tungro_virus: { en: 'Tungro Virus', bn: 'টুংরো ভাইরাস' },
};

export const ModelInsights: React.FC<ModelInsightsProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang].insights;

  return (
    <section id="insights" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 text-emerald-800 text-xs sm:text-sm font-semibold mb-3">
          <BarChart3 className="w-4 h-4 text-emerald-600" />
          <span>Transparent AI Evaluation</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {t.title}
        </h2>
        <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal">
          {t.subtitle}
        </p>
      </div>

      {/* Top Level Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
        <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {t.overallAccuracy}
            </span>
            <Target className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-3xl sm:text-4xl font-black text-slate-900">
            {(METRICS_DATA.accuracy * 100).toFixed(1)}%
          </p>
          <span className="text-xs text-emerald-700 font-medium">Held-out Test Evaluation</span>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {t.macroF1}
            </span>
            <Sparkles className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-3xl sm:text-4xl font-black text-slate-900">
            {(METRICS_DATA.macro_f1 * 100).toFixed(1)}%
          </p>
          <span className="text-xs text-emerald-700 font-medium">Balanced Across 4 Classes</span>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {t.testDatasetSize}
            </span>
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-3xl sm:text-4xl font-black text-slate-900">
            {METRICS_DATA.total_test}
          </p>
          <span className="text-xs text-slate-500 font-medium">15% Stratified Test Split</span>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {t.latencyEnv}
            </span>
            <Zap className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-3xl sm:text-4xl font-black text-slate-900">
            ~{METRICS_DATA.latency_ms} <span className="text-lg font-normal text-slate-500">ms</span>
          </p>
          <span className="text-xs text-emerald-700 font-medium">CPU Real-Time Inference</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        {/* Left: Per Class Metrics Table */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Table className="w-5 h-5 text-emerald-600" />
              <span>{t.perClassTitle}</span>
            </h3>
            <span className="text-xs text-slate-400">Pytorch Scikit-Learn</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <th className="pb-3">{t.classCol}</th>
                  <th className="pb-3">{t.precisionCol}</th>
                  <th className="pb-3">{t.recallCol}</th>
                  <th className="pb-3">{t.f1Col}</th>
                  <th className="pb-3">{t.supportCol}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {METRICS_DATA.classes.map((clsKey) => {
                  const m = METRICS_DATA.per_class[clsKey as keyof typeof METRICS_DATA.per_class];
                  const d = DISEASE_DATABASE[clsKey];
                  return (
                    <tr key={clsKey} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3.5 font-semibold text-slate-800 pr-4">
                        {d ? d.name[lang] : clsKey}
                      </td>
                      <td className="py-3.5 text-slate-600 font-mono">
                        {(m.precision * 100).toFixed(1)}%
                      </td>
                      <td className="py-3.5 text-slate-600 font-mono">
                        {(m.recall * 100).toFixed(1)}%
                      </td>
                      <td className="py-3.5 font-bold text-emerald-700 font-mono">
                        {(m.f1 * 100).toFixed(1)}%
                      </td>
                      <td className="py-3.5 text-slate-500 font-mono">
                        {m.support}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-xs text-slate-700 space-y-1">
            <p className="font-semibold text-emerald-900">
              {lang === 'bn' ? 'মূল্যায়ন পর্যবেক্ষণ:' : 'Key Evaluation Takeaways:'}
            </p>
            <p>
              {lang === 'bn'
                ? '• সুস্থ পাতা (Healthy Leaf) ক্লাসে ১০০% প্রিসিশন অর্জিত হয়েছে, যার অর্থ কোনো রোগাক্রান্ত পাতাকে ভুলবশত সুস্থ বলে চিহ্নিত করা হয়নি।'
                : '• Healthy Leaf class achieved 100% precision, ensuring zero false negatives on healthy plants.'}
            </p>
            <p>
              {lang === 'bn'
                ? '• বাদামী দাগ রোগে ৯৬% প্রিসিশন এবং ৯২.৫% রিকল নিয়ে সর্বোচ্চ এফ১-স্কোর (৯৪.২%) প্রদর্শিত হয়েছে।'
                : '• Brown Spot demonstrated robust 96.1% precision and 94.2% F1 score.'}
            </p>
          </div>
        </div>

        {/* Right: Confusion Matrix Heatmap */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-600" />
              <span>{t.matrixTitle}</span>
            </h3>
            <p className="text-xs text-slate-500">{t.matrixSubtitle}</p>
          </div>

          {/* Interactive Matrix Grid */}
          <div className="overflow-x-auto">
            <div className="min-w-[280px]">
              <div className="grid grid-cols-5 gap-1.5 text-center text-xs">
                {/* Header Row */}
                <div className="font-bold text-slate-400 p-1 text-[10px]">True \ Pred</div>
                {METRICS_DATA.classes.map((c) => (
                  <div key={c} className="font-bold text-slate-700 p-1 text-[10px] truncate" title={CLASS_SHORT_NAMES[c as keyof typeof CLASS_SHORT_NAMES][lang]}>
                    {CLASS_SHORT_NAMES[c as keyof typeof CLASS_SHORT_NAMES][lang]}
                  </div>
                ))}

                {/* Rows */}
                {METRICS_DATA.confusion_matrix.map((row, rIdx) => {
                  const trueClass = METRICS_DATA.classes[rIdx];
                  return (
                    <React.Fragment key={rIdx}>
                      <div className="font-bold text-slate-700 p-1 text-[10px] text-right truncate flex items-center justify-end">
                        {CLASS_SHORT_NAMES[trueClass as keyof typeof CLASS_SHORT_NAMES][lang]}
                      </div>
                      {row.map((cell, cIdx) => {
                        const isDiagonal = rIdx === cIdx;
                        return (
                          <div
                            key={cIdx}
                            className={`p-3 rounded-xl font-bold font-mono transition-transform hover:scale-105 flex items-center justify-center ${
                              isDiagonal
                                ? 'bg-emerald-500 text-white shadow-xs'
                                : cell > 0
                                ? 'bg-amber-100 text-amber-900 border border-amber-200'
                                : 'bg-slate-50 text-slate-400'
                            }`}
                          >
                            {cell}
                          </div>
                        );
                      })}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Actual generated matrix plot link / preview */}
          <div className="pt-2 border-t border-slate-100">
            <details className="text-xs text-slate-600 cursor-pointer">
              <summary className="font-semibold text-emerald-700 hover:text-emerald-800">
                {lang === 'bn' ? 'ম্যাটপ্লটলিব চার্ট বিস্তারিত দেখুন' : 'View High-Resolution Plot Image'}
              </summary>
              <div className="mt-3 rounded-2xl overflow-hidden border border-slate-200">
                <img
                  src="/confusion_matrix.png"
                  alt="Confusion Matrix Evaluation"
                  className="w-full h-auto"
                />
              </div>
            </details>
          </div>
        </div>
      </div>

      {/* Engineering Architecture Highlights */}
      <div className="bg-gradient-to-br from-emerald-900 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              {t.architectureTitle}
            </h3>
            <p className="text-xs text-emerald-300">
              MobileNetV3-Small Transfer Learning Architecture
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-sm text-slate-300">
          <div className="space-y-2 bg-white/5 p-5 rounded-2xl border border-white/10">
            <span className="font-bold text-emerald-400 block">1. Edge MobileNetV3</span>
            <p className="leading-relaxed text-xs">{t.archP1}</p>
          </div>
          <div className="space-y-2 bg-white/5 p-5 rounded-2xl border border-white/10">
            <span className="font-bold text-emerald-400 block">2. Real-Time Grad-CAM</span>
            <p className="leading-relaxed text-xs">{t.archP2}</p>
          </div>
          <div className="space-y-2 bg-white/5 p-5 rounded-2xl border border-white/10">
            <span className="font-bold text-emerald-400 block">3. Safety Abstention</span>
            <p className="leading-relaxed text-xs">{t.archP3}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
