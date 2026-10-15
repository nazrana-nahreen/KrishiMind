import React, { useState } from 'react';
import {
  X,
  User,
  Phone,
  Lock,
  MapPin,
  Building2,
  Wheat,
  ShieldCheck,
  CheckCircle2,
  LogIn,
  UserPlus,
  AlertCircle,
  Sparkles,
  Smartphone,
  Store,
} from 'lucide-react';
import { Language } from '../types';
import { AuthService, UserAccount } from '../data/authService';

interface AuthModalProps {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserAccount) => void;
  initialTab?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  lang,
  isOpen,
  onClose,
  onLoginSuccess,
  initialTab = 'login',
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(initialTab);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Login Form State
  const [loginPhone, setLoginPhone] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register Form State
  const [regRole, setRegRole] = useState<'farmer' | 'buyer' | 'aratdar'>('farmer');
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regDivision, setRegDivision] = useState('Rajshahi');
  const [regDistrict, setRegDistrict] = useState('Bogura');
  const [regUpazila, setRegUpazila] = useState('Sherpur');
  const [regVillage, setRegVillage] = useState('');
  const [regCapacity, setRegCapacity] = useState('১০ বিঘা ধান জমি');
  const [regMfsType, setRegMfsType] = useState<'bkash' | 'nagad' | 'rocket'>('bkash');
  const [regMfsNumber, setRegMfsNumber] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!loginPhone.trim()) {
      setErrorMsg(lang === 'bn' ? 'অনুগ্রহ করে মোবাইল নম্বর প্রদান করুন' : 'Please provide mobile number');
      return;
    }

    const res = AuthService.login(loginPhone, loginPassword || undefined);
    if (res.success && res.user) {
      setSuccessMsg(lang === 'bn' ? 'সফলভাবে লগইন হয়েছে!' : 'Login successful!');
      setTimeout(() => {
        onLoginSuccess(res.user!);
        onClose();
      }, 500);
    } else {
      setErrorMsg(res.message || (lang === 'bn' ? 'লগইন ব্যর্থ হয়েছে।' : 'Login failed.'));
    }
  };

  const handleDemoLogin = (role: 'farmer' | 'buyer') => {
    setErrorMsg(null);
    const user = AuthService.demoLogin(role);
    setSuccessMsg(
      lang === 'bn'
        ? `${user.name} হিসেবে ডেমো লগইন সফল!`
        : `Logged in as demo ${role === 'farmer' ? 'Farmer' : 'Miller/Buyer'}!`
    );
    setTimeout(() => {
      onLoginSuccess(user);
      onClose();
    }, 400);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!regName.trim() || !regPhone.trim()) {
      setErrorMsg(
        lang === 'bn' ? 'অনুগ্রহ করে নাম এবং মোবাইল নম্বর দিন' : 'Please provide full name and phone number'
      );
      return;
    }

    const roleLabel =
      regRole === 'farmer'
        ? { en: 'Registered Farmer', bn: 'নিবন্ধিত কৃষক' }
        : regRole === 'buyer'
        ? { en: 'Commercial Rice Miller', bn: 'অটো চালকল মালিক ও পাইকার' }
        : { en: 'Aratdar & Commission Agent', bn: 'ধানের আড়তদার ও কমিশন এজেন্ট' };

    const res = AuthService.register({
      name: regName.trim(),
      phone: regPhone.trim(),
      password: regPassword.trim() || '123',
      role: regRole,
      roleLabel,
      division: regDivision,
      district: regDistrict,
      upazila: regUpazila,
      villageOrMokam: regVillage.trim() || `${regUpazila}, ${regDistrict}`,
      farmSizeOrCapacity: regCapacity.trim() || (regRole === 'farmer' ? '৫ বিঘা' : '৩০ টন/দিন'),
      mfsType: regMfsType,
      mfsNumber: regMfsNumber.trim() || regPhone.trim(),
      avatarSeed: regName.trim().slice(0, 3) || 'User',
    });

    if (res.success && res.user) {
      setSuccessMsg(
        lang === 'bn'
          ? 'অভিনন্দন! আপনার কৃষক/ক্রেতা প্রোফাইল তৈরি হয়েছে।'
          : 'Congratulations! Your profile has been registered.'
      );
      setTimeout(() => {
        onLoginSuccess(res.user!);
        onClose();
      }, 600);
    } else {
      setErrorMsg(res.message || (lang === 'bn' ? 'নিবন্ধন সম্পন্ন হয়নি।' : 'Registration failed.'));
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-emerald-100 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-900 text-white p-5 sm:p-6 relative flex items-start justify-between">
          <div className="space-y-1 pr-6">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold text-emerald-100">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>{lang === 'bn' ? 'কৃষক ও চালকল নেটওয়ার্ক' : 'Farmer & Buyer Network'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black">
              {lang === 'bn' ? 'কৃষিমাইন্ড অ্যাকাউন্ট' : 'KrishiMind Account'}
            </h2>
            <p className="text-xs text-emerald-100/90">
              {lang === 'bn'
                ? 'ধান বিক্রয়, বায়না বুকিং এবং সরকারি কৃষি সহায়তার জন্য প্রোফাইল ব্যবহার করুন।'
                : 'Manage paddy trades, token advances, and agricultural support.'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher: Login vs Register */}
        <div className="flex border-b border-slate-200 bg-slate-50/70 p-2 gap-2">
          <button
            type="button"
            onClick={() => {
              setActiveTab('login');
              setErrorMsg(null);
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'login'
                ? 'bg-white text-emerald-800 shadow-sm border border-emerald-200'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <LogIn className="w-4 h-4 text-emerald-600" />
            <span>{lang === 'bn' ? 'লগইন করুন' : 'Sign In'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('register');
              setErrorMsg(null);
            }}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'register'
                ? 'bg-white text-emerald-800 shadow-sm border border-emerald-200'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <UserPlus className="w-4 h-4 text-emerald-600" />
            <span>{lang === 'bn' ? 'নতুন প্রোফাইল তৈরি (নিবন্ধন)' : 'Register Profile'}</span>
          </button>
        </div>

        {/* Notification Banners */}
        {errorMsg && (
          <div className="mx-5 mt-4 p-3 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2 text-red-700 text-xs sm:text-sm">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="mx-5 mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-emerald-800 text-xs sm:text-sm font-semibold">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Scrollable Form Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {activeTab === 'login' ? (
            /* --- LOGIN TAB --- */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'bn' ? 'মোবাইল নম্বর (Phone Number)' : 'Mobile Phone Number'}
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    placeholder="017XXXXXXXX"
                    value={loginPhone}
                    onChange={(e) => setLoginPhone(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700">
                    {lang === 'bn' ? 'পাসওয়ার্ড (Password)' : 'Password'}
                  </label>
                  <span className="text-[11px] text-slate-400">
                    {lang === 'bn' ? '(ঐচ্ছিক - ডিফল্ট: 123)' : '(Optional - default: 123)'}
                  </span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md transition-all active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>{lang === 'bn' ? 'লগইন করুন' : 'Sign In Now'}</span>
              </button>

              {/* Fast 1-Click Demo Accounts */}
              <div className="pt-3 border-t border-slate-200 space-y-2">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">
                  {lang === 'bn' ? '— ১-ক্লিকে পরীক্ষামূলক ডেমো লগইন —' : '— 1-Click Instant Demo Login —'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('farmer')}
                    className="p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-left transition-all cursor-pointer flex items-center gap-2.5"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                      🌾
                    </div>
                    <div className="text-left overflow-hidden">
                      <div className="text-xs font-bold text-amber-950 truncate">মোঃ কফিল উদ্দিন</div>
                      <div className="text-[10px] text-amber-700 truncate">আদর্শ ধান কৃষক (বগুড়া)</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDemoLogin('buyer')}
                    className="p-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 border border-teal-200 text-left transition-all cursor-pointer flex items-center gap-2.5"
                  >
                    <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                      🏭
                    </div>
                    <div className="text-left overflow-hidden">
                      <div className="text-xs font-bold text-teal-950 truncate">হাজী রফিকুল ইসলাম</div>
                      <div className="text-[10px] text-teal-700 truncate">অটো চালকল ক্রেতা (দিনাজপুর)</div>
                    </div>
                  </button>
                </div>
              </div>
            </form>
          ) : (
            /* --- REGISTER TAB --- */
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              {/* Role Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {lang === 'bn' ? 'আপনার ভূমিকা নির্বাচন করুন (Select Role)' : 'Select Your Profile Role'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setRegRole('farmer');
                      setRegCapacity('১০ বিঘা ধান জমি');
                    }}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                      regRole === 'farmer'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-400/40'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <Wheat className="w-5 h-5 text-emerald-600" />
                    <span className="text-xs font-bold">{lang === 'bn' ? 'কৃষক' : 'Farmer'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setRegRole('buyer');
                      setRegCapacity('৫০ টন/দিন চালকল');
                    }}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                      regRole === 'buyer'
                        ? 'bg-amber-50 border-amber-500 text-amber-900 ring-2 ring-amber-400/40'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <Building2 className="w-5 h-5 text-amber-600" />
                    <span className="text-xs font-bold">{lang === 'bn' ? 'চালকল/মিলার' : 'Rice Miller'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setRegRole('aratdar');
                      setRegCapacity('দৈনিক ২০০ মন আড়ত ট্রেড');
                    }}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                      regRole === 'aratdar'
                        ? 'bg-teal-50 border-teal-500 text-teal-900 ring-2 ring-teal-400/40'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <Store className="w-5 h-5 text-teal-600" />
                    <span className="text-xs font-bold">{lang === 'bn' ? 'আড়তদার' : 'Aratdar'}</span>
                  </button>
                </div>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'bn' ? 'পূর্ণ নাম (Full Name)' : 'Full Name'}
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder={lang === 'bn' ? 'মো: রহিম উল্লাহ' : 'e.g. Md. Rahim'}
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'bn' ? 'মোবাইল নম্বর (Phone)' : 'Mobile Phone'}
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      placeholder="017XXXXXXXX"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'bn' ? 'পাসওয়ার্ড নির্ধারণ করুন' : 'Create Password'}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* District & Upazila */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'bn' ? 'জেলা (District)' : 'District'}
                  </label>
                  <select
                    value={regDistrict}
                    onChange={(e) => setRegDistrict(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    <option value="Bogura">বগুড়া (Bogura)</option>
                    <option value="Dinajpur">দিনাজপুর (Dinajpur)</option>
                    <option value="Naogaon">নওগাঁ (Naogaon)</option>
                    <option value="Mymensingh">ময়মনসিংহ (Mymensingh)</option>
                    <option value="Rangpur">রংপুর (Rangpur)</option>
                    <option value="Kushtia">কুষ্টিয়া (Kushtia)</option>
                    <option value="Jessore">যশোর (Jashore)</option>
                    <option value="Dhaka">ঢাকা (Dhaka)</option>
                    <option value="Sylhet">সিলেট (Sylhet)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'bn' ? 'উপজেলা (Upazila)' : 'Upazila'}
                  </label>
                  <input
                    type="text"
                    placeholder={lang === 'bn' ? 'যেমন: শেরপুর / সদর' : 'e.g. Sadar'}
                    value={regUpazila}
                    onChange={(e) => setRegUpazila(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Village or Mill/Mokam Address */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {regRole === 'farmer'
                    ? lang === 'bn'
                      ? 'গ্রাম ও ইউনিয়ন'
                      : 'Village & Union'
                    : lang === 'bn'
                    ? 'মোকাম / চালকল / আড়তের ঠিকানা'
                    : 'Mill / Business Address'}
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder={
                      regRole === 'farmer'
                        ? lang === 'bn'
                          ? 'ভবানীপুর গ্রাম, শেরপুর'
                          : 'Bhabanipur Village'
                        : lang === 'bn'
                        ? 'পুলহাট শিল্প এলাকা, মেসার্স যমুনা চালকল'
                        : 'Industrial Area Mill Road'
                    }
                    value={regVillage}
                    onChange={(e) => setRegVillage(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Capacity / Farm size */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {regRole === 'farmer'
                    ? lang === 'bn'
                      ? 'চাষকৃত ধান জমির পরিমাণ'
                      : 'Total Paddy Cultivated Land'
                    : lang === 'bn'
                    ? 'দৈনিক ধান ভাঙানো বা ক্রয়ের ক্ষমতা'
                    : 'Daily Processing / Buying Capacity'}
                </label>
                <input
                  type="text"
                  placeholder={regRole === 'farmer' ? 'যেমন: ১২ বিঘা ধান জমি' : 'যেমন: ৫০ টন প্রতিদিন'}
                  value={regCapacity}
                  onChange={(e) => setRegCapacity(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* MFS Payment Details (for Advance tokens) */}
              <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/80 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                  <Smartphone className="w-4 h-4 text-amber-700" />
                  <span>
                    {lang === 'bn' ? 'বায়না গ্রহণের মোবাইল ওয়ালেট (MFS)' : 'Token Advance Wallet (bKash/Nagad)'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(['bkash', 'nagad', 'rocket'] as const).map((mfs) => (
                    <button
                      key={mfs}
                      type="button"
                      onClick={() => setRegMfsType(mfs)}
                      className={`py-1.5 px-2 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                        regMfsType === mfs
                          ? 'bg-amber-600 text-white shadow-sm'
                          : 'bg-white text-slate-700 border border-slate-200'
                      }`}
                    >
                      {mfs === 'bkash' ? 'bKash (বিকাশ)' : mfs === 'nagad' ? 'Nagad (নগদ)' : 'Rocket (রকেট)'}
                    </button>
                  ))}
                </div>
                <input
                  type="tel"
                  placeholder={lang === 'bn' ? 'ওয়ালেট নম্বর (খালি রাখলে ফোন নম্বর ব্যবহার হবে)' : 'Wallet Mobile Number'}
                  value={regMfsNumber}
                  onChange={(e) => setRegMfsNumber(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black text-sm shadow-md transition-all active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>{lang === 'bn' ? 'প্রোফাইল তৈরি ও নিবন্ধন সম্পন্ন করুন' : 'Complete Profile Registration'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
