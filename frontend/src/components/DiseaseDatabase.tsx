import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  X,
  ExternalLink,
  ShieldAlert,
  Droplets,
  Thermometer,
  Layers,
} from 'lucide-react';
import { Language, ClassKey, DiseaseDetail } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { DISEASE_DATABASE } from '../data/diseaseDatabase';

interface DiseaseDatabaseProps {
  lang: Language;
  selectedDiseaseModal: ClassKey | null;
  onCloseModal: () => void;
  onSelectDisease: (id: ClassKey) => void;
}

export const DiseaseDatabase: React.FC<DiseaseDatabaseProps> = ({
  lang,
  selectedDiseaseModal,
  onCloseModal,
  onSelectDisease,
}) => {
  const t = TRANSLATIONS[lang].database;
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'diseases' | 'healthy'>('all');

  const diseaseList = Object.values(DISEASE_DATABASE);

  const filteredDiseases = diseaseList.filter((disease) => {
    // Filter by type
    if (filterType === 'diseases' && disease.type === 'healthy') return false;
    if (filterType === 'healthy' && disease.type !== 'healthy') return false;

    // Filter by search
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const nameEn = disease.name.en.toLowerCase();
    const nameBn = disease.name.bn.toLowerCase();
    const sciName = disease.scientificName.toLowerCase();
    const desc = disease.shortDescription[lang].toLowerCase();

    return (
      nameEn.includes(q) ||
      nameBn.includes(q) ||
      sciName.includes(q) ||
      desc.includes(q)
    );
  });

  const activeModalData: DiseaseDetail | null = selectedDiseaseModal
    ? DISEASE_DATABASE[selectedDiseaseModal]
    : null;

  return (
    <section id="database" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 text-emerald-800 text-xs sm:text-sm font-semibold mb-3">
          <BookOpen className="w-4 h-4 text-emerald-600" />
          <span>Curated Rice Agronomy Encyclopedia</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {t.title}
        </h2>
        <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal">
          {t.subtitle}
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-emerald-100 shadow-sm mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              filterType === 'all'
                ? 'bg-emerald-500 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {t.filterAll}
          </button>
          <button
            onClick={() => setFilterType('diseases')}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              filterType === 'diseases'
                ? 'bg-emerald-500 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {t.filterDiseases}
          </button>
          <button
            onClick={() => setFilterType('healthy')}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              filterType === 'healthy'
                ? 'bg-emerald-500 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {t.filterHealthy}
          </button>
        </div>
      </div>

      {/* Disease Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredDiseases.map((disease) => (
          <div
            key={disease.id}
            className="bg-white rounded-3xl border border-emerald-100/90 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden group"
          >
            {/* Card Thumbnail */}
            <div className="relative h-48 bg-slate-100 overflow-hidden">
              <img
                src={disease.sampleImages[0]}
                alt={disease.name[lang]}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span
                className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[11px] font-bold border backdrop-blur-md ${disease.badgeColor}`}
              >
                {disease.type.toUpperCase()}
              </span>
            </div>

            {/* Card Content */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {disease.name[lang]}
                </h3>
                <p className="text-xs text-slate-500 italic">
                  {disease.scientificName}
                </p>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mt-2">
                  {disease.shortDescription[lang]}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2">
                <div className="text-[11px] text-slate-500 flex items-center justify-between">
                  <span className="font-semibold">{t.severityLabel}:</span>
                  <span className="text-slate-700 font-medium truncate max-w-[150px]">
                    {disease.severity[lang]}
                  </span>
                </div>

                <button
                  onClick={() => onSelectDisease(disease.id)}
                  className="w-full mt-2 py-2.5 rounded-2xl bg-emerald-50 hover:bg-emerald-500 hover:text-white text-emerald-800 text-xs font-bold transition-all text-center block"
                >
                  {t.learnMore}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Disease Detail Modal */}
      {activeModalData && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative animate-scaleUp">
            {/* Close Button */}
            <button
              onClick={onCloseModal}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Title */}
            <div className="space-y-1">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-bold border mb-2 ${activeModalData.badgeColor}`}
              >
                {activeModalData.type.toUpperCase()}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {activeModalData.name[lang]}
              </h3>
              <p className="text-sm text-slate-500 italic">
                {activeModalData.scientificName}
              </p>
            </div>

            {/* Photos Preview */}
            <div className="grid grid-cols-2 gap-3">
              {activeModalData.sampleImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={activeModalData.name[lang]}
                  className="w-full h-36 object-cover rounded-2xl bg-slate-100 border border-slate-200"
                />
              ))}
            </div>

            {/* Description */}
            <p className="text-sm text-slate-700 leading-relaxed bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
              {activeModalData.shortDescription[lang]}
            </p>

            {/* Symptoms */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                {lang === 'bn' ? 'প্রধান লক্ষণসমূহ' : 'Key Diagnostic Symptoms'}
              </h4>
              <ul className="space-y-2 text-sm text-slate-600">
                {activeModalData.symptoms[lang].map((sym, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                    <span>{sym}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Environmental Causes */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                {lang === 'bn' ? 'রোগের অনুকূল পরিবেশ ও কারণ' : 'Favorable Conditions & Causes'}
              </h4>
              <ul className="space-y-2 text-sm text-slate-600">
                {activeModalData.causes[lang].map((cau, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                    <span>{cau}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Remedial Guidance Tabs */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                {lang === 'bn' ? 'অনুমোদিত সমন্বিত ব্যবস্থাপনা' : 'Integrated Management Protocols'}
              </h4>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-100 space-y-2">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                    {lang === 'bn' ? 'জৈব ও সাংস্কৃতিক ব্যবস্থাপনা' : 'Organic & Cultural Control'}
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {activeModalData.management.organic[lang].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-100 space-y-2">
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wide">
                    {lang === 'bn' ? 'রাসায়নিক ও অনুমোদিত দাওয়াই' : 'Chemical / Extension Prescription'}
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {activeModalData.management.chemical[lang].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* BRRI Reference Footer */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>{activeModalData.brriReference}</span>
              <button
                onClick={onCloseModal}
                className="px-4 py-2 rounded-full bg-slate-800 text-white font-semibold hover:bg-slate-900"
              >
                {lang === 'bn' ? 'বন্ধ করুন' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
