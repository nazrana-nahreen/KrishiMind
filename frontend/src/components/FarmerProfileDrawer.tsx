import React, { useState } from 'react';
import {
  X,
  User,
  Phone,
  MapPin,
  Building2,
  Wheat,
  ShieldCheck,
  CheckCircle2,
  Clock,
  TrendingUp,
  LogOut,
  Edit3,
  Save,
  DollarSign,
  Package,
  Calendar,
  Smartphone,
  Sparkles,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';
import { Language } from '../types';
import { AuthService, UserAccount } from '../data/authService';

interface FarmerProfileDrawerProps {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserAccount | null;
  onLogout: () => void;
  onOpenAuthModal: () => void;
  onProfileUpdated: (updatedUser: UserAccount) => void;
}

export const FarmerProfileDrawer: React.FC<FarmerProfileDrawerProps> = ({
  lang,
  isOpen,
  onClose,
  currentUser,
  onLogout,
  onOpenAuthModal,
  onProfileUpdated,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(currentUser?.name || '');
  const [editPhone, setEditPhone] = useState(currentUser?.phone || '');
  const [editDistrict, setEditDistrict] = useState(currentUser?.district || '');
  const [editUpazila, setEditUpazila] = useState(currentUser?.upazila || '');
  const [editVillage, setEditVillage] = useState(currentUser?.villageOrMokam || '');
  const [editCapacity, setEditCapacity] = useState(currentUser?.farmSizeOrCapacity || '');
  const [editMfsNumber, setEditMfsNumber] = useState(currentUser?.mfsNumber || '');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  // If user is not logged in, prompt auth
  if (!currentUser) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-5 shadow-2xl border border-slate-100">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
            <User className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-black text-slate-800">
              {lang === 'bn' ? 'আপনি লগইন অবস্থায় নেই' : 'You are not logged in'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              {lang === 'bn'
                ? 'কৃষক বা ক্রেতা প্রোফাইল দেখতে এবং ধানের অর্ডার ও লেনদেন পরিচালনা করতে লগইন করুন।'
                : 'Sign in to access your farmer/buyer trading profile, orders, and stats.'}
            </p>
          </div>
          <div className="flex flex-col gap-2.5">
            <button
              onClick={() => {
                onClose();
                onOpenAuthModal();
              }}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md transition-all cursor-pointer"
            >
              {lang === 'bn' ? 'লগইন বা নতুন প্রোফাইল তৈরি করুন' : 'Sign In or Register'}
            </button>
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs cursor-pointer"
            >
              {lang === 'bn' ? 'বন্ধ করুন' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleStartEdit = () => {
    setEditName(currentUser.name);
    setEditPhone(currentUser.phone);
    setEditDistrict(currentUser.district);
    setEditUpazila(currentUser.upazila);
    setEditVillage(currentUser.villageOrMokam);
    setEditCapacity(currentUser.farmSizeOrCapacity);
    setEditMfsNumber(currentUser.mfsNumber);
    setIsEditing(true);
    setSaveSuccessMsg(null);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserAccount = {
      ...currentUser,
      name: editName.trim() || currentUser.name,
      phone: editPhone.trim() || currentUser.phone,
      district: editDistrict.trim() || currentUser.district,
      upazila: editUpazila.trim() || currentUser.upazila,
      villageOrMokam: editVillage.trim() || currentUser.villageOrMokam,
      farmSizeOrCapacity: editCapacity.trim() || currentUser.farmSizeOrCapacity,
      mfsNumber: editMfsNumber.trim() || currentUser.mfsNumber,
    };

    AuthService.updateProfile(updated);
    onProfileUpdated(updated);
    setIsEditing(false);
    setSaveSuccessMsg(lang === 'bn' ? 'প্রোফাইল সফলভাবে আপডেট হয়েছে!' : 'Profile updated successfully!');
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-end animate-fadeIn">
      {/* Background click to dismiss */}
      <div className="flex-1" onClick={onClose} />

      {/* Slide-over Drawer */}
      <div className="bg-white w-full max-w-lg h-full shadow-2xl flex flex-col overflow-hidden border-l border-emerald-100">
        
        {/* Drawer Header */}
        <div className="bg-gradient-to-r from-emerald-700 via-teal-800 to-emerald-900 text-white p-5 sm:p-6 shrink-0 relative">
          <div className="flex items-center justify-between mb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold text-emerald-100">
              <Wheat className="w-3.5 h-3.5 text-amber-300" />
              <span>
                {currentUser.role === 'farmer'
                  ? lang === 'bn'
                    ? 'কৃষক অ্যাকাউন্ট'
                    : 'Farmer Account'
                  : lang === 'bn'
                  ? 'চালকল ক্রেতা অ্যাকাউন্ট'
                  : 'Rice Miller Account'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (isEditing) {
                    setIsEditing(false);
                  } else {
                    handleStartEdit();
                  }
                }}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title={isEditing ? 'Cancel Edit' : 'Edit Profile'}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditing ? (lang === 'bn' ? 'বাতিল' : 'Cancel') : lang === 'bn' ? 'এডিট' : 'Edit'}</span>
              </button>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* User Hero Banner */}
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-900 font-black text-xl flex items-center justify-center shadow-lg shrink-0 border-2 border-white/60">
              {currentUser.avatarSeed ? currentUser.avatarSeed[0] : 'U'}
            </div>
            <div className="overflow-hidden">
              <div className="flex items-center gap-1.5">
                <h2 className="text-lg sm:text-xl font-black truncate">{currentUser.name}</h2>
                {currentUser.verified && (
                  <span title="Verified Producer">
                    <ShieldCheck className="w-5 h-5 text-emerald-300 shrink-0" />
                  </span>
                )}
              </div>
              <p className="text-xs text-emerald-100/90 truncate">
                {lang === 'bn' ? currentUser.roleLabel.bn : currentUser.roleLabel.en}
              </p>
              <div className="flex items-center gap-2 text-[11px] text-emerald-200 mt-0.5">
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  {currentUser.phone}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 truncate">
                  <MapPin className="w-3 h-3" />
                  {currentUser.upazila}, {currentUser.district}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Success toast if updated */}
        {saveSuccessMsg && (
          <div className="bg-emerald-500 text-white px-4 py-2 text-xs font-bold text-center flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">

          {/* EDIT FORM (if active) */}
          {isEditing ? (
            <form onSubmit={handleSaveEdit} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3.5">
              <h3 className="text-xs font-black uppercase text-slate-700 tracking-wider flex items-center gap-1.5">
                <Edit3 className="w-4 h-4 text-emerald-600" />
                <span>{lang === 'bn' ? 'প্রোফাইল তথ্য সংশোধন' : 'Edit Profile Details'}</span>
              </h3>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  {lang === 'bn' ? 'পূর্ণ নাম' : 'Full Name'}
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  {lang === 'bn' ? 'মোবাইল নম্বর' : 'Phone Number'}
                </label>
                <input
                  type="tel"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    {lang === 'bn' ? 'জেলা' : 'District'}
                  </label>
                  <input
                    type="text"
                    value={editDistrict}
                    onChange={(e) => setEditDistrict(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    {lang === 'bn' ? 'উপজেলা' : 'Upazila'}
                  </label>
                  <input
                    type="text"
                    value={editUpazila}
                    onChange={(e) => setEditUpazila(e.target.value)}
                    className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  {lang === 'bn' ? 'গ্রাম বা মোকামের ঠিকানা' : 'Village / Mill Address'}
                </label>
                <input
                  type="text"
                  value={editVillage}
                  onChange={(e) => setEditVillage(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  {lang === 'bn' ? 'জমির পরিমাণ বা মিলের ক্ষমতা' : 'Farm Size or Mill Capacity'}
                </label>
                <input
                  type="text"
                  value={editCapacity}
                  onChange={(e) => setEditCapacity(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  {lang === 'bn' ? 'বিকাশ / নগদ ওয়ালেট নম্বর' : 'bKash / Nagad Wallet Number'}
                </label>
                <input
                  type="tel"
                  value={editMfsNumber}
                  onChange={(e) => setEditMfsNumber(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'সংরক্ষণ করুন' : 'Save Changes'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="py-2.5 px-4 rounded-xl border border-slate-300 text-slate-600 text-xs sm:text-sm font-semibold hover:bg-slate-100 cursor-pointer"
                >
                  {lang === 'bn' ? 'বাতিল' : 'Cancel'}
                </button>
              </div>
            </form>
          ) : null}

          {/* Key Trading Statistics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200">
              <div className="flex items-center justify-between text-amber-700 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  {lang === 'bn' ? 'মোট লেনদেন মন' : 'Total Traded'}
                </span>
                <Wheat className="w-4 h-4" />
              </div>
              <div className="text-xl sm:text-2xl font-black text-amber-950">
                {currentUser.totalMaundsTraded} <span className="text-xs font-bold text-amber-800">মন</span>
              </div>
              <p className="text-[10px] text-amber-700/80 mt-0.5">
                {currentUser.totalMaundsTraded * 40} {lang === 'bn' ? 'কেজি ধান' : 'kg paddy'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200">
              <div className="flex items-center justify-between text-emerald-700 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  {lang === 'bn' ? 'মোট বিক্রয়মূল্য' : 'Total Volume'}
                </span>
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="text-xl sm:text-2xl font-black text-emerald-950">
                ৳{(currentUser.totalRevenue / 1000).toFixed(0)}k
              </div>
              <p className="text-[10px] text-emerald-700/80 mt-0.5">
                ৳{currentUser.totalRevenue.toLocaleString()} {lang === 'bn' ? 'টাকা' : 'BDT'}
              </p>
            </div>
          </div>

          {/* Profile Details List */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
            <h3 className="text-xs font-black uppercase text-slate-700 tracking-wider">
              {lang === 'bn' ? 'খামার ও ব্যবসায়িক বিবরণ' : 'Farm & Business Specs'}
            </h3>

            <div className="grid grid-cols-2 gap-y-3 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">
                  {currentUser.role === 'farmer'
                    ? lang === 'bn'
                      ? 'জমির পরিমাণ'
                      : 'Farm Size'
                    : lang === 'bn'
                    ? 'প্রসেসিং ক্ষমতা'
                    : 'Processing Rate'}
                </span>
                <span className="font-bold text-slate-800">{currentUser.farmSizeOrCapacity}</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">
                  {lang === 'bn' ? 'ওয়ালেট (বায়না)' : 'MFS Escrow Wallet'}
                </span>
                <span className="font-bold text-slate-800 capitalize">
                  {currentUser.mfsType}: {currentUser.mfsNumber}
                </span>
              </div>

              <div className="col-span-2">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">
                  {lang === 'bn' ? 'পূর্ণ ঠিকানা' : 'Address'}
                </span>
                <span className="font-semibold text-slate-800">
                  {currentUser.villageOrMokam}, {currentUser.upazila}, {currentUser.district}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">
                  {lang === 'bn' ? 'সদস্য হয়েছেন' : 'Member Since'}
                </span>
                <span className="font-semibold text-slate-700">{currentUser.createdAt}</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">
                  {lang === 'bn' ? 'ভেরিফিকেশন স্ট্যাটাস' : 'Verification'}
                </span>
                <span className="inline-flex items-center gap-1 font-bold text-emerald-700 text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {lang === 'bn' ? 'যাচাইকৃত প্রোফাইল' : 'Verified'}
                </span>
              </div>
            </div>
          </div>

          {/* Recent Orders & Trade History */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase text-slate-700 tracking-wider flex items-center gap-1.5">
                <Package className="w-4 h-4 text-emerald-600" />
                <span>{lang === 'bn' ? 'ধান কেনাবেচা ও অর্ডারের ইতিহাস' : 'Recent Paddy Orders & Trades'}</span>
              </h3>
              <span className="text-[11px] font-bold text-slate-400">
                {currentUser.orders.length} {lang === 'bn' ? 'টি লেনদেন' : 'Trades'}
              </span>
            </div>

            {currentUser.orders.length === 0 ? (
              <div className="text-center py-6 border border-dashed border-slate-200 rounded-2xl text-slate-400 text-xs">
                {lang === 'bn'
                  ? 'এখনও কোনো লেনদেন বা বুকিং করা হয়নি।'
                  : 'No order activity yet. Book or sell paddy lots from marketplace.'}
              </div>
            ) : (
              <div className="space-y-2.5">
                {currentUser.orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-3.5 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-sm transition-all bg-white"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-bold">
                            {order.id}
                          </span>
                          <span className="text-[11px] text-slate-400">{order.date}</span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 mt-1">{order.listingTitle}</h4>
                      </div>

                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                          order.status === 'Delivered & Settled'
                            ? 'bg-emerald-100 text-emerald-800'
                            : order.status === 'Advance Paid'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {order.status === 'Delivered & Settled'
                          ? lang === 'bn'
                            ? 'খালাস ও সম্পন্ন'
                            : 'Settled'
                          : order.status === 'Advance Paid'
                          ? lang === 'bn'
                            ? 'বায়না পরিশোধিত'
                            : 'Advance Paid'
                          : order.status}
                      </span>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">
                        {order.maunds} {lang === 'bn' ? 'মন ধান' : 'maunds'}
                      </span>
                      <span className="font-black text-slate-900">৳{order.totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 shrink-0 space-y-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenAuthModal();
              }}
              className="flex-1 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-200/60 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
              <span>{lang === 'bn' ? 'অন্য অ্যাকাউন্টে স্যুইচ করুন' : 'Switch Account'}</span>
            </button>

            {/* Logout Button */}
            <button
              onClick={() => {
                AuthService.logout();
                onLogout();
                onClose();
              }}
              className="px-4 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 text-red-600" />
              <span>{lang === 'bn' ? 'লগআউট' : 'Log Out'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
