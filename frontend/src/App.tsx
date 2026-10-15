import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Detector } from './components/Detector';
import { DiseaseDatabase } from './components/DiseaseDatabase';
import { ModelInsights } from './components/ModelInsights';
import { FarmingAssistant } from './components/FarmingAssistant';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { AgriMapPage } from './components/AgriMapPage';
import { MarketplacePage } from './components/MarketplacePage';
import { AuthModal } from './components/AuthModal';
import { FarmerProfileDrawer } from './components/FarmerProfileDrawer';
import { AuthService, UserAccount } from './data/authService';
import { Language, ClassKey } from './types';
import { MapPin, Navigation, ArrowRight, Store, TrendingUp, Scale } from 'lucide-react';

export const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [currentView, setCurrentView] = useState<'home' | 'map' | 'market'>('home');
  const [activeSection, setActiveSection] = useState<string>('home');
  const [backendOnline, setBackendOnline] = useState<boolean>(false);
  const [selectedDiseaseModal, setSelectedDiseaseModal] = useState<ClassKey | null>(null);

  // Authentication & Profile State
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => AuthService.getCurrentUser());
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [showProfileDrawer, setShowProfileDrawer] = useState<boolean>(false);

  const handleLogout = () => {
    AuthService.logout();
    setCurrentUser(null);
  };

  const handleLoginSuccess = (user: UserAccount) => {
    setCurrentUser(user);
    setShowAuthModal(false);
  };

  const handleProfileUpdated = (updatedUser: UserAccount) => {
    setCurrentUser(updatedUser);
  };

  // Check FastAPI backend health on mount and every 10 seconds
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:8000';
        const res = await fetch(`${apiBase}/health`, { method: 'GET' });
        if (res.ok) {
          const data = await res.json();
          setBackendOnline(data.status === 'ok');
        } else {
          setBackendOnline(false);
        }
      } catch {
        setBackendOnline(false);
      }
    };

    checkBackend();
    const timer = setInterval(checkBackend, 10000);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return;
    }

    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOpenDiseaseModal = (id: ClassKey) => {
    setSelectedDiseaseModal(id);
  };

  const handleCloseDiseaseModal = () => {
    setSelectedDiseaseModal(null);
  };

  return (
    <div className={`min-h-screen flex flex-col ${lang === 'bn' ? 'font-bengali' : 'font-sans'}`}>
      
      {/* Route: Dedicated Dhan Marketplace Page */}
      {currentView === 'market' ? (
        <MarketplacePage
          lang={lang}
          onBackToHome={() => {
            setCurrentView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          currentUser={currentUser}
          onOpenProfile={() => setShowProfileDrawer(true)}
          onOpenAuth={() => setShowAuthModal(true)}
          onUserUpdate={handleProfileUpdated}
        />
      ) : currentView === 'map' ? (
        /* Route: Dedicated Agri Map Page */
        <AgriMapPage
          lang={lang}
          onBackToHome={() => {
            setCurrentView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      ) : (
        /* Route: Main Single-Page Experience */
        <>
          {/* Sticky Navigation Bar */}
          <Navbar
            lang={lang}
            onLanguageChange={setLang}
            activeSection={activeSection}
            onNavigate={scrollToSection}
            backendOnline={backendOnline}
            currentView={currentView}
            onNavigateToMap={() => {
              setCurrentView('map');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToMarket={() => {
              setCurrentView('market');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToHome={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            currentUser={currentUser}
            onOpenProfile={() => setShowProfileDrawer(true)}
            onOpenAuth={() => setShowAuthModal(true)}
            onLogout={handleLogout}
          />

          {/* Main Content */}
          <main className="flex-1">
            {/* Hero Section matching uploaded mockup */}
            <div id="home">
              <Hero
                lang={lang}
                onStartDetection={() => scrollToSection('detect')}
                onViewDiseases={() => scrollToSection('database')}
              />
            </div>

            {/* Quick Action Banners: Marketplace & Krishi Map */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Dhan Marketplace Banner */}
                <div className="bg-gradient-to-r from-amber-600 to-amber-800 rounded-3xl p-6 sm:p-7 text-white shadow-lg flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-100 text-xs font-bold">
                      <Store className="w-3.5 h-3.5" />
                      <span>{lang === 'bn' ? 'ধান কেনাবেচার ডিজিটাল বাজার' : 'Dhan Crop Exchange Platform'}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black">
                      {lang === 'bn' ? 'ধানের লট বিক্রি বা সরাসরি চালকলের জন্য কিনুন' : 'Buy & Sell Paddy Crops Direct from Farmers'}
                    </h3>
                    <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed">
                      {lang === 'bn'
                        ? 'চিনিগুঁড়া, কাটারিভোগ, ব্রি-২৮/২৯ ও জিরাশাইল ধানের আজকের পাইকারি দর, মন ও কেজির ক্যালকুলেটর এবং নিরাপদ বায়না বুকিং।'
                        : 'Wholesale market rates per maund (40 kg), buyer-seller mode, live price calculator & bKash/Nagad escrow booking.'}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setCurrentView('market');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="self-start px-6 py-3 rounded-full bg-white hover:bg-amber-50 active:scale-95 text-amber-950 font-extrabold text-xs sm:text-sm shadow-md flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <Store className="w-4 h-4 text-amber-700" />
                    <span>{lang === 'bn' ? 'ধানের বাজার প্রবেশ করুন' : 'Open Dhan Marketplace'}</span>
                    <ArrowRight className="w-4 h-4 text-amber-700" />
                  </button>
                </div>

                {/* Local Krishi Offices Map Banner */}
                <div className="bg-gradient-to-r from-emerald-600 to-teal-800 rounded-3xl p-6 sm:p-7 text-white shadow-lg flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-emerald-100 text-xs font-bold">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{lang === 'bn' ? 'নিকটস্থ কৃষি অফিস ও সাহায্য কেন্দ্র' : 'Nearby Agriculture Help Centers'}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black">
                      {lang === 'bn' ? 'আপনার এলাকায় কৃষি কর্মকর্তা ও অফিস খুঁজুন' : 'Find Local DAE & BRRI Offices on Map'}
                    </h3>
                    <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                      {lang === 'bn'
                        ? 'আপনার জেলা ও উপজেলা নির্বাচন করে উপজেলা কৃষি কর্মকর্তা, ব্রি গবেষণা কেন্দ্র ও বিএডিসি বীজ ডিলারের সরাসরি যোগাযোগ নম্বর পান।'
                        : 'Interactive OpenStreetMap showing distance, phone numbers, and directions to local Upazila Agriculture Officers.'}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setCurrentView('map');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="self-start px-6 py-3 rounded-full bg-white hover:bg-emerald-50 active:scale-95 text-emerald-950 font-extrabold text-xs sm:text-sm shadow-md flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <MapPin className="w-4 h-4 text-emerald-700" />
                    <span>{lang === 'bn' ? 'ম্যাপে অফিস খুঁজুন' : 'Explore Krishi Map'}</span>
                    <ArrowRight className="w-4 h-4 text-emerald-700" />
                  </button>
                </div>

              </div>
            </section>

            {/* Core Capabilities */}
            <Features lang={lang} />

            {/* Live Detector & Diagnostic Scanner */}
            <Detector
              lang={lang}
              onViewDiseaseDetails={handleOpenDiseaseModal}
            />

            {/* Disease Encyclopedia Database */}
            <DiseaseDatabase
              lang={lang}
              selectedDiseaseModal={selectedDiseaseModal}
              onCloseModal={handleCloseDiseaseModal}
              onSelectDisease={handleOpenDiseaseModal}
            />

            {/* Model Insights & Evaluation */}
            <ModelInsights lang={lang} />

            {/* Grounded Bangla RAG Assistant */}
            <FarmingAssistant lang={lang} />

            {/* About & Safety Disclaimer */}
            <About lang={lang} />
          </main>

          {/* Footer */}
          <Footer lang={lang} onNavigate={scrollToSection} />
        </>
      )}

      {/* Global Farmer & Buyer Trading Profile Drawer */}
      <FarmerProfileDrawer
        lang={lang}
        isOpen={showProfileDrawer}
        onClose={() => setShowProfileDrawer(false)}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenAuthModal={() => {
          setShowProfileDrawer(false);
          setShowAuthModal(true);
        }}
        onProfileUpdated={handleProfileUpdated}
      />

      {/* Global Authentication Modal (Login & Register) */}
      <AuthModal
        lang={lang}
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default App;
