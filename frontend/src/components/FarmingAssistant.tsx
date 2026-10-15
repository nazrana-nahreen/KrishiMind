import React, { useState, useRef } from 'react';
import {
  MessageSquare,
  Send,
  HelpCircle,
  Sparkles,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Bookmark,
  Bot,
  User,
  PhoneCall,
  Loader2,
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { RICE_KNOWLEDGE_BASE, QAPair } from '../data/assistantKnowledge';

interface FarmingAssistantProps {
  lang: Language;
}

export const FarmingAssistant: React.FC<FarmingAssistantProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang].assistant;
  const [query, setQuery] = useState('');
  const [activeQA, setActiveQA] = useState<QAPair | null>(RICE_KNOWLEDGE_BASE[0]);
  const [isThinking, setIsThinking] = useState(false);
  const [lastAskedQuestion, setLastAskedQuestion] = useState<string>(RICE_KNOWLEDGE_BASE[0].question[lang]);
  const [noResultFound, setNoResultFound] = useState(false);
  const responseRef = useRef<HTMLDivElement>(null);

  const searchKnowledgeBase = (userQuery: string) => {
    if (!userQuery.trim()) return;

    setIsThinking(true);
    setLastAskedQuestion(userQuery);
    setNoResultFound(false);

    // Simulated short AI retrieval delay for realistic feedback
    setTimeout(() => {
      const qLower = userQuery.toLowerCase().trim();
      const tokens = qLower.split(/[\s,?.!]+/).filter((w) => w.length > 1);

      // Score each knowledge base entry
      let bestMatch: QAPair | null = null;
      let highestScore = 0;

      for (const item of RICE_KNOWLEDGE_BASE) {
        let score = 0;
        const qEn = item.question.en.toLowerCase();
        const qBn = item.question.bn.toLowerCase();
        const ansEn = item.answer.en.toLowerCase();
        const ansBn = item.answer.bn.toLowerCase();

        // Exact match boost
        if (qEn.includes(qLower) || qBn.includes(qLower)) {
          score += 15;
        }

        // Keyword matches
        for (const kw of item.keywords) {
          const kwLower = kw.toLowerCase();
          if (qLower.includes(kwLower)) {
            score += 8;
          }
        }

        // Token matches
        for (const token of tokens) {
          if (qEn.includes(token) || qBn.includes(token)) score += 3;
          if (ansEn.includes(token) || ansBn.includes(token)) score += 2;
        }

        if (score > highestScore) {
          highestScore = score;
          bestMatch = item;
        }
      }

      if (bestMatch && highestScore >= 2) {
        setActiveQA(bestMatch);
        setNoResultFound(false);
      } else {
        // Fallback to helpline or first item if completely out of domain
        setActiveQA(null);
        setNoResultFound(true);
      }

      setIsThinking(false);

      // Smooth scroll directly to the response area
      setTimeout(() => {
        responseRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }, 350);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchKnowledgeBase(query);
  };

  const handleSelectSuggested = (qa: QAPair) => {
    const qText = qa.question[lang];
    setQuery(qText);
    searchKnowledgeBase(qText);
  };

  return (
    <section id="assistant" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 text-emerald-800 text-xs sm:text-sm font-semibold mb-3">
          <MessageSquare className="w-4 h-4 text-emerald-600" />
          <span>Grounded Bangla RAG Assistant</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {t.title}
        </h2>
        <p className="mt-3 text-base sm:text-lg text-slate-600 font-normal">
          {t.subtitle}
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Search Input Bar */}
        <form onSubmit={handleFormSubmit} className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.inputPlaceholder}
            className="w-full pl-6 pr-40 py-4 rounded-3xl bg-white border-2 border-emerald-200 text-sm sm:text-base text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 shadow-md shadow-emerald-900/5 transition-all"
          />
          <button
            type="submit"
            disabled={isThinking}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 px-6 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 disabled:opacity-75 text-white font-semibold text-xs sm:text-sm shadow-md shadow-emerald-500/25 flex items-center gap-2 transition-all cursor-pointer"
          >
            {isThinking ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Searching...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>{t.sendBtn}</span>
              </>
            )}
          </button>
        </form>

        {/* Suggested Queries Chips */}
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {t.suggestedTitle}
          </p>
          <div className="flex flex-wrap gap-2">
            {RICE_KNOWLEDGE_BASE.slice(0, 6).map((qa) => (
              <button
                key={qa.id}
                type="button"
                onClick={() => handleSelectSuggested(qa)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all text-left cursor-pointer ${
                  activeQA?.id === qa.id && !noResultFound
                    ? 'bg-emerald-500 text-white border-emerald-500 shadow-xs font-semibold'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50'
                }`}
              >
                {qa.question[lang]}
              </button>
            ))}
          </div>
        </div>

        {/* Target Anchor for auto-scroll */}
        <div ref={responseRef} className="pt-2">

          {/* Thinking / Searching Animation */}
          {isThinking && (
            <div className="bg-white rounded-3xl p-8 border border-emerald-200 shadow-sm flex items-center gap-4 animate-pulse">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 animate-bounce">
                <Bot className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-800">
                  {lang === 'bn' ? 'কৃষিমাইন্ড এআই উত্তর খুঁজছে...' : 'KrishiMind AI is retrieving BRRI research literature...'}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>{lang === 'bn' ? 'সংশ্লিষ্ট নথিপত্র বিশ্লেষণ করা হচ্ছে' : 'Analyzing curated agricultural passages'}</span>
                </div>
              </div>
            </div>
          )}

          {/* Active Grounded Response */}
          {!isThinking && activeQA && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-200/80 shadow-lg shadow-emerald-900/5 space-y-5 animate-fadeIn">
              
              {/* Question Header */}
              <div className="flex items-start gap-3 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 inline-block mb-1">
                    {lang === 'bn' ? 'উত্তর প্রস্তুত' : 'Answer Grounded'}
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                    {activeQA.question[lang]}
                  </h3>
                  <span className="text-xs text-slate-500 block">
                    {lang === 'bn' ? 'তথ্যসূত্র: বাংলাদেশ ধান গবেষণা ইনস্টিটিউট (ব্রি)' : 'Grounded on: Bangladesh Rice Research Institute (BRRI) Guidelines'}
                  </span>
                </div>
              </div>

              {/* Answer Body with bullet points and clean styling */}
              <div className="bg-emerald-50/50 p-5 sm:p-6 rounded-2xl border border-emerald-100 text-sm sm:text-base text-slate-800 leading-relaxed space-y-3 font-normal">
                {activeQA.answer[lang].split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Source Reference & Hotline */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="font-semibold">{t.sourceCitation}:</span>
                  <span className="italic text-slate-700">{activeQA.source}</span>
                </div>

                <a
                  href="tel:16123"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 transition-colors self-start sm:self-auto font-medium"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{lang === 'bn' ? 'কৃষি কল সেন্টার: ১৬১২৩' : 'Krishi Helpline: 16123'}</span>
                </a>
              </div>
            </div>
          )}

          {/* No Direct Evidence Fallback */}
          {!isThinking && noResultFound && (
            <div className="bg-white rounded-3xl p-8 border border-amber-200 shadow-sm space-y-4 text-center animate-fadeIn">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
                <AlertCircle className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-slate-900">
                  {lang === 'bn'
                    ? `"${lastAskedQuestion}" এর সরাসরি কোনো নথি মেলেনি`
                    : `No Direct Passages Matched "${lastAskedQuestion}"`}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                  {lang === 'bn'
                    ? 'কৃষিমাইন্ড এআই নির্ভরযোগ্য প্রমাণের বাইরে মনগড়া উত্তর প্রদান করে না। আপনার প্রশ্নের বিষয়টি কিউরেটেড ডেটাবেজে সরাসরি পাওয়া যায়নি। অনুগ্রহ করে উপরের সাজেস্টেড প্রশ্নগুলো থেকে নির্বাচন করুন অথবা বিনামূল্যে সরকারি কৃষি কর্মকর্তাদের সাথে যোগাযোগ করুন।'
                    : 'KrishiMind strictly abstains from hallucinating answers without verified literature citations. Please select from the suggested topic chips above or consult the official agricultural support channels.'}
                </p>
              </div>

              <div className="pt-2 flex justify-center">
                <a
                  href="tel:16123"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-semibold shadow-md shadow-emerald-500/20"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>{lang === 'bn' ? '১৬১২৩ নম্বরে সরাসরি কৃষিবিদকে ফোন করুন' : 'Call 16123 (Krishi Call Center)'}</span>
                </a>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
