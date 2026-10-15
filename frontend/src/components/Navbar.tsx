import React, { useState } from 'react';
import { Sprout, Globe, Menu, X, Activity, Cpu, MapPin, Store, User, LogOut, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { UserAccount } from '../data/authService';

interface NavbarProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  backendOnline: boolean;
  currentView: 'home' | 'map' | 'market';
  onNavigateToMap: () => void;
  onNavigateToMarket: () => void;
  onNavigateToHome: () => void;
  currentUser: UserAccount | null;
  onOpenProfile: () => void;
  onOpenAuth: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onLanguageChange,
  activeSection,
  onNavigate,
  backendOnline,
  currentView,
  onNavigateToMap,
  onNavigateToMarket,
  onNavigateToHome,
  currentUser,
  onOpenProfile,
  onOpenAuth,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[lang].nav;

  const navItems = [
    { id: 'home', label: t.home },
    { id: 'features', label: t.features },
    { id: 'detect', label: t.detect },
    { id: 'database', label: t.database },
    { id: 'insights', label: t.insights },
    { id: 'assistant', label: t.assistant },
    { id: 'about', label: t.about },
  ];

  const handleNavClick = (id: string) => {
    if (currentView !== 'home') {
      onNavigateToHome();
    }
    setTimeout(() => {
      onNavigate(id);
    }, 50);
    setMobileMenuOpen(false);
  };

  const handleMapClick = () => {
    onNavigateToMap();
    setMobileMenuOpen(false);
  };

  const handleMarketClick = () => {
    onNavigateToMarket();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-emerald-100 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-slate-800">
                  {lang === 'bn' ? 'কৃষিমাইন্ড' : 'KrishiMind'}
                </span>
                <span className="text-xl font-bold text-emerald-600">AI</span>
              </div>
              <span className="text-[11px] font-medium text-emerald-700/70 tracking-wider uppercase block">
                PlantPulse Engine
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-50/80 p-1.5 rounded-full border border-slate-200/60">
            {navItems.map((item) => {
              const isActive = currentView === 'home' && activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/30 font-semibold'
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/60'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Marketplace, Map Page Button, Profile/Auth, Language & Backend Status */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Dhan Marketplace Button */}
            <button
              onClick={handleMarketClick}
              className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                currentView === 'market'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30 ring-2 ring-amber-400'
                  : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300'
              }`}
            >
              <Store className="w-3.5 h-3.5 text-amber-600" />
              <span>{t.dhanMarket}</span>
            </button>

            {/* Krishi Map Page Button */}
            <button
              onClick={handleMapClick}
              className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                currentView === 'map'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-2 ring-emerald-400'
                  : 'bg-emerald-100/90 hover:bg-emerald-200 text-emerald-900 border border-emerald-300/80'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              <span>{t.agriMap}</span>
            </button>

            {/* Farmer / Buyer Profile or Login Button */}
            {currentUser ? (
              <button
                onClick={onOpenProfile}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-300 text-xs font-bold transition-all cursor-pointer shadow-sm group"
                title={lang === 'bn' ? 'কৃষক প্রোফাইল ও লেনদেন দেখুন' : 'View Farmer Profile'}
              >
                <div className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[11px] font-black group-hover:scale-105 transition-transform">
                  {currentUser.avatarSeed ? currentUser.avatarSeed[0] : 'U'}
                </div>
                <span className="max-w-[110px] truncate">{currentUser.name.split(' ')[0]}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
              >
                <User className="w-3.5 h-3.5 text-emerald-400" />
                <span>{lang === 'bn' ? 'লগইন / নিবন্ধন' : 'Sign In'}</span>
              </button>
            )}

            {/* Language Switcher */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-full border border-slate-200 text-xs font-semibold">
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2 py-1 rounded-full transition-all cursor-pointer ${
                  lang === 'en'
                    ? 'bg-white text-emerald-700 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => onLanguageChange('bn')}
                className={`px-2 py-1 rounded-full font-bengali transition-all cursor-pointer ${
                  lang === 'bn'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                বাংলা
              </button>
            </div>
          </div>

          {/* Mobile Header Buttons */}
          <div className="flex lg:hidden items-center gap-1.5">
            {/* Quick Profile/Login in Mobile Navbar */}
            {currentUser ? (
              <button
                onClick={onOpenProfile}
                className="w-8 h-8 rounded-full bg-emerald-600 text-white text-xs font-black flex items-center justify-center shadow-sm"
                title={currentUser.name}
              >
                {currentUser.avatarSeed ? currentUser.avatarSeed[0] : 'U'}
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="p-1.5 rounded-lg bg-slate-900 text-emerald-400 text-xs font-bold"
                title="Login"
              >
                <User className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={handleMarketClick}
              className="p-2 rounded-xl bg-amber-100 text-amber-800"
              title={t.dhanMarket}
            >
              <Store className="w-4 h-4 text-amber-700" />
            </button>
            <button
              onClick={handleMapClick}
              className="p-2 rounded-xl bg-emerald-100 text-emerald-800"
              title={t.agriMap}
            >
              <MapPin className="w-4 h-4 text-emerald-700" />
            </button>
            <button
              onClick={() => onLanguageChange(lang === 'en' ? 'bn' : 'en')}
              className="px-2 py-1 text-xs font-semibold rounded-full bg-slate-100 border border-slate-200 text-emerald-700"
            >
              {lang === 'en' ? 'বাংলা' : 'EN'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-emerald-100 px-4 pt-3 pb-6 space-y-2.5 animate-fadeIn">
          {/* User Profile Card inside Mobile Drawer */}
          {currentUser ? (
            <div className="p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 flex items-center justify-between">
              <div
                onClick={() => {
                  onOpenProfile();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2.5 cursor-pointer flex-1 overflow-hidden"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white font-black text-sm flex items-center justify-center shrink-0">
                  {currentUser.avatarSeed ? currentUser.avatarSeed[0] : 'U'}
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-black text-slate-900 truncate">{currentUser.name}</div>
                  <div className="text-[11px] text-emerald-700 font-semibold truncate">
                    {lang === 'bn' ? currentUser.roleLabel.bn : currentUser.roleLabel.en}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => {
                    onOpenProfile();
                    setMobileMenuOpen(false);
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold"
                >
                  {lang === 'bn' ? 'প্রোফাইল' : 'Profile'}
                </button>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="p-1.5 rounded-lg bg-red-100 text-red-700"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => {
                onOpenAuth();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-2xl bg-slate-900 text-white font-bold text-sm flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'bn' ? 'লগইন বা নতুন প্রোফাইল নিবন্ধন' : 'Sign In / Register Profile'}</span>
            </button>
          )}

          {/* Marketplace Link in Mobile Drawer */}
          <button
            onClick={handleMarketClick}
            className={`w-full text-left px-4 py-2.5 rounded-2xl text-sm font-bold flex items-center gap-2 ${
              currentView === 'market'
                ? 'bg-amber-600 text-white'
                : 'bg-amber-50 text-amber-900 border border-amber-200'
            }`}
          >
            <Store className="w-4 h-4 text-amber-600" />
            <span>{t.dhanMarket} (ধানের বাজার)</span>
          </button>

          {/* Map Link in Mobile Drawer */}
          <button
            onClick={handleMapClick}
            className={`w-full text-left px-4 py-2.5 rounded-2xl text-sm font-bold flex items-center gap-2 ${
              currentView === 'map'
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 text-emerald-900 border border-emerald-200'
            }`}
          >
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>{t.agriMap} (কৃষি অফিস ম্যাপ)</span>
          </button>

          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-4 py-2 rounded-xl text-sm font-medium ${
                currentView === 'home' && activeSection === item.id
                  ? 'bg-emerald-500 text-white font-semibold'
                  : 'text-slate-600 hover:bg-emerald-50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between px-2">
            <span className="text-xs text-slate-500">API Status:</span>
            <span
              className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                backendOnline ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}
            >
              {backendOnline ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
