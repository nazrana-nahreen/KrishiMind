import React, { useState } from 'react';
import {
  ArrowLeft,
  ShoppingCart,
  Store,
  TrendingUp,
  Calculator,
  PlusCircle,
  Search,
  Filter,
  MapPin,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Truck,
  CreditCard,
  User,
  History,
  X,
  Sparkles,
  PhoneCall,
  Scale,
  Award,
  DollarSign,
  AlertCircle,
} from 'lucide-react';
import { Language } from '../types';
import {
  PADDY_MARKET_RATES,
  INITIAL_PADDY_LISTINGS,
  PaddyListing,
  PaddyVarietyRate,
} from '../data/marketplaceData';
import { PaymentGatewayModal } from './PaymentGatewayModal';
import { UserAccount, AuthService } from '../data/authService';

interface MarketplacePageProps {
  lang: Language;
  onBackToHome: () => void;
  currentUser: UserAccount | null;
  onOpenProfile: () => void;
  onOpenAuth: () => void;
  onUserUpdate: (updatedUser: UserAccount) => void;
}

export const MarketplacePage: React.FC<MarketplacePageProps> = ({
  lang,
  onBackToHome,
  currentUser,
  onOpenProfile,
  onOpenAuth,
  onUserUpdate,
}) => {
  // Mode: Buyer View (ধান কিনুন) or Seller View (ধান বিক্রি করুন)
  const [activeMode, setActiveMode] = useState<'buyer' | 'seller'>('buyer');
  
  // Listings state
  const [listings, setListings] = useState<PaddyListing[]>(INITIAL_PADDY_LISTINGS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrictFilter, setSelectedDistrictFilter] = useState('all');
  const [selectedVarietyFilter, setSelectedVarietyFilter] = useState('all');

  // Modals
  const [showPostModal, setShowPostModal] = useState(false);
  const [showCalculatorModal, setShowCalculatorModal] = useState(false);
  const [showRatesModal, setShowRatesModal] = useState(false);
  const [selectedListingForBooking, setSelectedListingForBooking] = useState<PaddyListing | null>(null);
  const [bookingSuccessMsg, setBookingSuccessMsg] = useState<string | null>(null);

  // Calculator State
  const [calcQuantity, setCalcQuantity] = useState<number>(50);
  const [calcUnit, setCalcUnit] = useState<'maund' | 'kg'>('maund');
  const [calcPricePerMaund, setCalcPricePerMaund] = useState<number>(1920);

  // Calculate results
  const totalMaundsCalc = calcUnit === 'maund' ? calcQuantity : calcQuantity / 40;
  const totalKgCalc = calcUnit === 'maund' ? calcQuantity * 40 : calcQuantity;
  const totalPriceCalc = Math.round(totalMaundsCalc * calcPricePerMaund);
  const tokenAdvanceCalc = Math.round(totalPriceCalc * 0.10); // 10% token advance
  const truckLoads5Ton = Math.ceil(totalKgCalc / 5000);

  // New Listing Form State
  const [newVariety, setNewVariety] = useState('kataribhog');
  const [newQuantityMaunds, setNewQuantityMaunds] = useState<number>(100);
  const [newPricePerMaund, setNewPricePerMaund] = useState<number>(1900);
  const [newMoisture, setNewMoisture] = useState<number>(13);
  const [newDistrict, setNewDistrict] = useState(currentUser?.district || 'Bogura');
  const [newUpazila, setNewUpazila] = useState(currentUser?.upazila || 'Sherpur');
  const [newVillage, setNewVillage] = useState(currentUser?.villageOrMokam || '');
  const [newDescription, setNewDescription] = useState('');
  const [newPhone, setNewPhone] = useState(currentUser?.phone || '01712-334455');

  const handleOpenPostModal = () => {
    if (!currentUser) {
      onOpenAuth();
      return;
    }
    setShowPostModal(true);
  };

  const handlePostListing = (e: React.FormEvent) => {
    e.preventDefault();
    const varietyObj = PADDY_MARKET_RATES.find((v) => v.id === newVariety) || PADDY_MARKET_RATES[0];

    const newLot: PaddyListing = {
      id: `lot_${Date.now()}`,
      sellerId: currentUser?.id || `user_${Date.now()}`,
      sellerName: {
        en: currentUser?.name || 'Farmer Seller',
        bn: currentUser?.name || 'কৃষক বিক্রেতা',
      },
      sellerType: currentUser?.role === 'aratdar' ? 'aratdar' : 'farmer',
      sellerPhone: newPhone || currentUser?.phone || '01712-334455',
      sellerRating: 5.0,
      varietyId: varietyObj.id,
      varietyName: {
        en: `${varietyObj.name.en} (Farmer Lot)`,
        bn: `${varietyObj.name.bn} (কৃষকের লট)`,
      },
      quantityMaunds: Number(newQuantityMaunds),
      quantityKg: Number(newQuantityMaunds) * 40,
      pricePerMaund: Number(newPricePerMaund),
      moisturePercent: Number(newMoisture),
      moistureCondition: {
        en: `${newMoisture}% Moisture (Sun Dried)`,
        bn: `${newMoisture}% আর্দ্রতা (রোদে শুকানো)`,
      },
      division: 'Rajshahi',
      district: newDistrict,
      districtBn: newDistrict,
      upazila: newUpazila,
      villageOrMarket: {
        en: newVillage || `${newUpazila}, ${newDistrict}`,
        bn: newVillage || `${newUpazila}, ${newDistrict}`,
      },
      availableFrom: 'Ready for Immediate Loading',
      description: {
        en: newDescription || 'Freshly harvested authentic paddy lot. Dry, clean, and ready for truck dispatch.',
        bn: newDescription || 'তাজা সোনালী রঙের শুকনা ধান। সরাসরি নিজস্ব খামার থেকে ট্রাকে লোড দেওয়ার জন্য প্রস্তুত।',
      },
      imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
      verifiedLot: true,
      bKashNumber: newPhone,
      status: 'active',
    };

    setListings([newLot, ...listings]);
    setShowPostModal(false);
    alert(
      lang === 'bn'
        ? 'আপনার ধানের লটটি সফলভাবে বাজারে তালিকাভুক্ত হয়েছে!'
        : 'Your paddy lot has been published to the marketplace!'
    );
  };

  // Booking / Token Advance Handler
  const handleConfirmBooking = (paymentMethod: 'mfs' | 'cod') => {
    if (!selectedListingForBooking) return;

    const newOrder = {
      listingTitle: `${selectedListingForBooking.varietyName[lang]} (${selectedListingForBooking.quantityMaunds} মন)`,
      maunds: selectedListingForBooking.quantityMaunds,
      totalAmount: selectedListingForBooking.quantityMaunds * selectedListingForBooking.pricePerMaund,
      status: paymentMethod === 'mfs' ? ('Advance Paid' as const) : ('Pending' as const),
    };

    const updated = AuthService.addOrderToCurrentUser(newOrder);
    if (updated) {
      onUserUpdate(updated);
    }

    setBookingSuccessMsg(
      lang === 'bn'
        ? `অভিনন্দন! "${selectedListingForBooking.varietyName.bn}" এর ${selectedListingForBooking.quantityMaunds} মনের লটটি বুক করা হয়েছে। বিক্রেতার সাথে যোগাযোগ করতে ফোন করুন: ${selectedListingForBooking.sellerPhone}`
        : `Congratulations! Lot for "${selectedListingForBooking.varietyName.en}" (${selectedListingForBooking.quantityMaunds} maunds) has been reserved. Contact seller at: ${selectedListingForBooking.sellerPhone}`
    );
    setSelectedListingForBooking(null);
  };

  // Filter listings
  const filteredListings = listings.filter((item) => {
    if (selectedDistrictFilter !== 'all' && item.district !== selectedDistrictFilter) return false;
    if (selectedVarietyFilter !== 'all' && item.varietyId !== selectedVarietyFilter) return false;
    if (!searchQuery.trim()) return true;

    const q = searchQuery.toLowerCase();
    const titleEn = item.varietyName.en.toLowerCase();
    const titleBn = item.varietyName.bn.toLowerCase();
    const dist = item.district.toLowerCase();
    const upazila = item.upazila.toLowerCase();
    const seller = item.sellerName[lang].toLowerCase();

    return titleEn.includes(q) || titleBn.includes(q) || dist.includes(q) || upazila.includes(q) || seller.includes(q);
  });

  return (
    <div className={`min-h-screen bg-[#f2fbf5] ${lang === 'bn' ? 'font-bengali' : 'font-sans'}`}>
      
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{lang === 'bn' ? 'হোমে ফিরুন' : 'Home'}</span>
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold text-slate-900">
                  {lang === 'bn' ? 'ধানের ডিজিটাল বাজার' : 'Dhan Crop Exchange'}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300">
                  MARKETPLACE
                </span>
              </div>
              <span className="text-[11px] text-emerald-700/80 font-medium hidden sm:block">
                {lang === 'bn' ? 'কৃষক, আড়তদার ও চালকলের সরাসরি কেনাবেচা প্ল্যাটফর্ম' : 'Direct trading between farmers, wholesalers & rice mills'}
              </span>
            </div>
          </div>

          {/* Mode Switcher & Profile Button */}
          <div className="flex items-center gap-2.5">
            {/* Buyer vs Seller Mode Pill */}
            <div className="bg-slate-100 p-1 rounded-full border border-slate-200 flex items-center text-xs font-bold">
              <button
                onClick={() => setActiveMode('buyer')}
                className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeMode === 'buyer'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'ক্রেতা মোড' : 'Buyer'}</span>
              </button>
              <button
                onClick={() => setActiveMode('seller')}
                className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeMode === 'seller'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'বিক্রেতা মোড' : 'Seller'}</span>
              </button>
            </div>

            {/* Profile Drawer or Sign In Button */}
            {currentUser ? (
              <button
                onClick={onOpenProfile}
                className="p-1.5 sm:px-3 sm:py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2 cursor-pointer shadow-sm group"
                title={lang === 'bn' ? 'কৃষক প্রোফাইল ও লেনদেন' : 'Farmer Profile'}
              >
                <div className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px] font-black group-hover:scale-105 transition-transform">
                  {currentUser.avatarSeed ? currentUser.avatarSeed[0] : 'U'}
                </div>
                <span className="hidden sm:inline max-w-[120px] truncate">{currentUser.name}</span>
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="p-1.5 sm:px-3.5 sm:py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <User className="w-3.5 h-3.5 text-emerald-400" />
                <span>{lang === 'bn' ? 'লগইন / নিবন্ধন' : 'Sign In'}</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Booking Success Notification if any */}
        {bookingSuccessMsg && (
          <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-emerald-900 text-sm flex items-center justify-between shadow-sm animate-fadeIn">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <p className="font-medium">{bookingSuccessMsg}</p>
            </div>
            <button
              onClick={() => setBookingSuccessMsg(null)}
              className="text-emerald-700 hover:text-emerald-900 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Wholesale Rates Ticker Banner */}
        <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                {lang === 'bn' ? 'আজকের ধানের পাইকারি বাজারদর (প্রতি মণ / ৪০ কেজি)' : 'Today\'s Wholesale Paddy Rates (Per Maund / 40 Kg)'}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowCalculatorModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 cursor-pointer"
              >
                <Calculator className="w-3.5 h-3.5 text-emerald-600" />
                <span>{lang === 'bn' ? 'মন ও কেজির ক্যালকুলেটর' : 'Maund & Price Calculator'}</span>
              </button>
              <button
                onClick={() => setShowRatesModal(true)}
                className="text-xs font-semibold text-emerald-600 hover:underline cursor-pointer"
              >
                {lang === 'bn' ? 'বিস্তারিত দর তালিকা' : 'View Full Rate Table'}
              </button>
            </div>
          </div>

          {/* Quick Rates Ticker Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {PADDY_MARKET_RATES.slice(0, 5).map((rate) => (
              <div
                key={rate.id}
                className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200/80 hover:border-emerald-300 transition-all space-y-1"
              >
                <span className="text-[11px] font-bold text-slate-600 truncate block">
                  {rate.name[lang]}
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="text-base sm:text-lg font-black text-slate-900">
                    ৳{rate.minPrice} – ৳{rate.maxPrice}
                  </span>
                  <span
                    className={`text-[10px] font-extrabold ${
                      rate.trend === 'up'
                        ? 'text-emerald-600'
                        : rate.trend === 'down'
                        ? 'text-red-500'
                        : 'text-slate-400'
                    }`}
                  >
                    {rate.change24h}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 block truncate">{rate.categoryLabel[lang]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Bar: Mode Specific Tools & Search Filter */}
        <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Mode Banner / Action Button */}
            <div>
              {activeMode === 'buyer' ? (
                <div>
                  <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-emerald-600" />
                    <span>{lang === 'bn' ? 'চালকল ও পাইকারদের জন্য ধানের লট সমূহ' : 'Available Paddy Lots for Buyers & Rice Mills'}</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {lang === 'bn' ? 'ট্রান্সপোর্ট খরচ বাঁচাতে নিজের জেলার কাছের লট বেছে নিন' : 'Filter by district to minimize truck logistics transportation cost'}
                  </p>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                    <Store className="w-5 h-5 text-emerald-600" />
                    <span>{lang === 'bn' ? 'কৃষক ও আড়তদার ড্যাশবোর্ড' : 'Farmer & Seller Portal'}</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {lang === 'bn' ? 'আপনার উৎপাদিত ধানের নতুন লট বিক্রি করতে লিস্টিং যোগ করুন' : 'List your paddy crop yields for direct wholesale purchase'}
                  </p>
                </div>
              )}
            </div>

            {/* Post New Lot Button */}
            <button
              onClick={handleOpenPostModal}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-extrabold text-sm shadow-md shadow-emerald-500/25 active:scale-95 transition-all self-start md:self-auto cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{lang === 'bn' ? '+ নতুন ধান বিক্রির লিস্টিং দিন' : '+ Post New Paddy Lot'}</span>
            </button>
          </div>

          {/* Filter & Search Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-4 border-t border-slate-100">
            {/* Search Input */}
            <div className="sm:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'bn' ? 'ধানের জাত, জেলা বা উপজেলার নাম দিয়ে খুঁজুন...' : 'Search by paddy variety, district, or seller name...'}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* District Filter */}
            <div className="sm:col-span-3">
              <select
                value={selectedDistrictFilter}
                onChange={(e) => setSelectedDistrictFilter(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:border-emerald-500"
              >
                <option value="all">{lang === 'bn' ? 'সকল জেলা (All Districts)' : 'All Districts'}</option>
                <option value="Dinajpur">দিনাজপুর (Dinajpur)</option>
                <option value="Bogura">বগুড়া (Bogura)</option>
                <option value="Mymensingh">ময়মনসিংহ (Mymensingh)</option>
                <option value="Naogaon">নওগাঁ (Naogaon)</option>
                <option value="Kushtia">কুষ্টিয়া (Kushtia)</option>
                <option value="Gazipur">গাজীপুর (Gazipur)</option>
                <option value="Jashore">যশোর (Jashore)</option>
              </select>
            </div>

            {/* Variety Filter */}
            <div className="sm:col-span-3">
              <select
                value={selectedVarietyFilter}
                onChange={(e) => setSelectedVarietyFilter(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:border-emerald-500"
              >
                <option value="all">{lang === 'bn' ? 'সকল ধানের জাত' : 'All Varieties'}</option>
                {PADDY_MARKET_RATES.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name[lang]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((lot) => {
            const totalPrice = lot.quantityMaunds * lot.pricePerMaund;

            return (
              <div
                key={lot.id}
                className="bg-white rounded-3xl border border-emerald-100/90 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col group"
              >
                {/* Image & Badges */}
                <div className="relative h-48 bg-slate-100 overflow-hidden">
                  <img
                    src={lot.imageUrl}
                    alt={lot.varietyName[lang]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-emerald-800 text-[10px] font-extrabold shadow-xs">
                      {lot.quantityMaunds} {lang === 'bn' ? 'মন ধান' : 'Maunds'} ({lot.quantityKg} kg)
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-slate-900/70 backdrop-blur-md text-white text-[10px] font-medium">
                      {lot.moisturePercent}% {lang === 'bn' ? 'আর্দ্রতা' : 'Moisture'}
                    </span>
                  </div>

                  {lot.verifiedLot && (
                    <div className="absolute bottom-3 right-3 px-2 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center gap-1 shadow-md">
                      <ShieldCheck className="w-3 h-3" />
                      <span>{lang === 'bn' ? 'যাচাইকৃত লট' : 'Verified Lot'}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-baseline justify-between">
                      <h4 className="text-lg font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {lot.varietyName[lang]}
                      </h4>
                    </div>

                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <span>{lot.villageOrMarket[lang]}, {lot.districtBn}</span>
                    </p>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {lot.description[lang]}
                    </p>
                  </div>

                  {/* Price & Summary */}
                  <div className="pt-3 border-t border-slate-100 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[11px] text-slate-400 block font-medium">
                          {lang === 'bn' ? 'প্রতি মনের দর' : 'Price / Maund'}
                        </span>
                        <span className="text-xl font-black text-emerald-700">
                          ৳{lot.pricePerMaund}
                        </span>
                        <span className="text-[11px] text-slate-400 font-normal"> /মন (৪০ কেজি)</span>
                      </div>

                      <div className="text-right">
                        <span className="text-[11px] text-slate-400 block font-medium">
                          {lang === 'bn' ? 'মোট মূল্য' : 'Total Price'}
                        </span>
                        <span className="text-base font-extrabold text-slate-900">
                          ৳{totalPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Seller details */}
                    <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-50">
                      <span className="font-semibold">{lot.sellerName[lang]}</span>
                      <a
                        href={`tel:${lot.sellerPhone}`}
                        className="font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                      >
                        <Phone className="w-3 h-3" />
                        <span>{lot.sellerPhone}</span>
                      </a>
                    </div>

                    {/* Buy / Book Button */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <a
                        href={`tel:${lot.sellerPhone}`}
                        className="py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{lang === 'bn' ? 'সরাসরি কল' : 'Call Seller'}</span>
                      </a>

                      <button
                        onClick={() => setSelectedListingForBooking(lot)}
                        className="py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>{lang === 'bn' ? 'লট বুক করুন' : 'Book Lot'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </main>

      {/* MODAL 1: Maund & Kg Calculator Modal */}
      {showCalculatorModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-scaleUp">
            <button
              onClick={() => setShowCalculatorModal(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {lang === 'bn' ? 'ধানের ওজন ও দর ক্যালকুলেটর' : 'Paddy Maund & Weight Calculator'}
                </h3>
                <span className="text-xs text-slate-500">১ মন = ৪০ কেজি (Standard Wholesale Formula)</span>
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">
                    {lang === 'bn' ? 'পরিমাণ (Quantity)' : 'Quantity'}
                  </label>
                  <input
                    type="number"
                    value={calcQuantity}
                    onChange={(e) => setCalcQuantity(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">
                    {lang === 'bn' ? 'একক (Unit)' : 'Unit'}
                  </label>
                  <select
                    value={calcUnit}
                    onChange={(e) => setCalcUnit(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold"
                  >
                    <option value="maund">{lang === 'bn' ? 'মন (Maund)' : 'Maund (মন)'}</option>
                    <option value="kg">{lang === 'bn' ? 'কেজি (Kilogram)' : 'Kilogram (কেজি)'}</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">
                  {lang === 'bn' ? 'প্রতি মনের দর (৳/মন)' : 'Price per Maund (BDT)'}
                </label>
                <input
                  type="number"
                  value={calcPricePerMaund}
                  onChange={(e) => setCalcPricePerMaund(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold"
                />
              </div>
            </div>

            {/* Calculation Outputs */}
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>{lang === 'bn' ? 'মোট ওজন (মন ও কেজি):' : 'Total Weight:'}</span>
                <span className="font-bold text-slate-900">
                  {totalMaundsCalc.toFixed(1)} মন / {totalKgCalc.toLocaleString()} কেজি
                </span>
              </div>

              <div className="flex items-center justify-between text-base font-extrabold border-t border-emerald-200/60 pt-2">
                <span className="text-emerald-950">{lang === 'bn' ? 'সর্বমোট মূল্য:' : 'Total Wholesale Price:'}</span>
                <span className="text-2xl font-black text-emerald-700 font-mono">
                  ৳{totalPriceCalc.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
                <span>{lang === 'bn' ? 'প্রস্তাবিত ১০% অগ্রিম বায়না:' : '10% Token Advance:'}</span>
                <span className="font-bold text-emerald-800">৳{tokenAdvanceCalc.toLocaleString()}</span>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                <Truck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>
                  {lang === 'bn'
                    ? `আনুমানিক ৫-টনী ট্রাক লাগবে: ${truckLoads5Ton} টি`
                    : `Est. 5-Ton Trucks Required: ${truckLoads5Ton}`}
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowCalculatorModal(false)}
              className="w-full py-3 rounded-2xl bg-slate-900 text-white font-bold text-sm"
            >
              {lang === 'bn' ? 'বন্ধ করুন' : 'Close'}
            </button>
          </div>
        </div>
      )}

      {/* MODAL 2: Full Rates Comparison Table */}
      {showRatesModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-scaleUp max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowRatesModal(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-2xl font-extrabold text-slate-900">
                {lang === 'bn' ? 'ধানের জাতভিত্তিক সরকারি ও মোকাম দর তালিকা' : 'Paddy Variety Wholesale Price Index'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {lang === 'bn' ? 'দিনাজপুর, নওগাঁ, বগুড়া ও কুষ্টিয়া মোকামের বাজার গড়' : 'Wholesale market benchmark rates for Bangladesh'}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                    <th className="pb-3">{lang === 'bn' ? 'ধানের জাত' : 'Paddy Variety'}</th>
                    <th className="pb-3">{lang === 'bn' ? 'মণ প্রতি দর' : 'Price / Maund (40kg)'}</th>
                    <th className="pb-3">{lang === 'bn' ? 'বাজার পরিস্থিতি' : 'Market Context'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {PADDY_MARKET_RATES.map((rate) => (
                    <tr key={rate.id} className="hover:bg-slate-50">
                      <td className="py-3 font-bold text-slate-900 pr-2">{rate.name[lang]}</td>
                      <td className="py-3 font-extrabold text-emerald-700 whitespace-nowrap">
                        ৳{rate.minPrice} – ৳{rate.maxPrice}
                      </td>
                      <td className="py-3 text-slate-600 text-xs">{rate.marketContext[lang]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              onClick={() => setShowRatesModal(false)}
              className="w-full py-3 rounded-2xl bg-slate-900 text-white font-bold text-sm"
            >
              {lang === 'bn' ? 'ঠিক আছে' : 'Got it'}
            </button>
          </div>
        </div>
      )}

      {/* MODAL 3: Post New Paddy Lot Form */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-scaleUp max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowPostModal(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                {lang === 'bn' ? 'কৃষক ও বিক্রেতা ফর্ম' : 'Seller Listing Form'}
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-2">
                {lang === 'bn' ? 'ধান বিক্রির নতুন লট যোগ করুন' : 'List Your Paddy Crop Lot'}
              </h3>
            </div>

            <form onSubmit={handlePostListing} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  {lang === 'bn' ? 'ধানের জাত নির্বাচন করুন' : 'Select Paddy Variety'}
                </label>
                <select
                  value={newVariety}
                  onChange={(e) => setNewVariety(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold"
                >
                  {PADDY_MARKET_RATES.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name[lang]} (বাজারদর ৳{v.minPrice}-৳{v.maxPrice})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    {lang === 'bn' ? 'মোট ওজন (মন)' : 'Total Quantity (Maunds)'}
                  </label>
                  <input
                    type="number"
                    required
                    value={newQuantityMaunds}
                    onChange={(e) => setNewQuantityMaunds(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    {lang === 'bn' ? 'প্রত্যাশিত দর (৳/মন)' : 'Expected Price (৳/Maund)'}
                  </label>
                  <input
                    type="number"
                    required
                    value={newPricePerMaund}
                    onChange={(e) => setNewPricePerMaund(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    {lang === 'bn' ? 'আর্দ্রতা শতকরা (%)' : 'Moisture Level (%)'}
                  </label>
                  <input
                    type="number"
                    value={newMoisture}
                    onChange={(e) => setNewMoisture(Number(e.target.value))}
                    placeholder="12-14%"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    {lang === 'bn' ? 'মোবাইল নম্বর' : 'Phone / bKash Number'}
                  </label>
                  <input
                    type="text"
                    required
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-mono font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    {lang === 'bn' ? 'জেলা' : 'District'}
                  </label>
                  <input
                    type="text"
                    required
                    value={newDistrict}
                    onChange={(e) => setNewDistrict(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    {lang === 'bn' ? 'উপজেলা' : 'Upazila'}
                  </label>
                  <input
                    type="text"
                    required
                    value={newUpazila}
                    onChange={(e) => setNewUpazila(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  {lang === 'bn' ? 'গ্রাম বা চাতাল / আড়তের ঠিকানা' : 'Village, Chatal or Market Address'}
                </label>
                <input
                  type="text"
                  value={newVillage}
                  onChange={(e) => setNewVillage(e.target.value)}
                  placeholder="যেমন: শেরপুর বাজার সংলগ্ন ধানের চাতাল"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  {lang === 'bn' ? 'ধানের গুণমান সম্পর্কে অতিরিক্ত বিবরণ' : 'Description'}
                </label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="চিটা মুক্ত, রোদে শুকানো সোনালী ধান..."
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm shadow-lg shadow-emerald-500/25 active:scale-95 transition-all"
              >
                {lang === 'bn' ? 'লিস্টিং প্রকাশ করুন' : 'Publish Paddy Lot'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: Deal Booking & Payment Gateway Modal */}
      {selectedListingForBooking && (
        <PaymentGatewayModal
          lang={lang}
          listing={selectedListingForBooking}
          onClose={() => setSelectedListingForBooking(null)}
          onSuccess={(payment) => {
            const newOrder = {
              listingTitle: `${selectedListingForBooking.varietyName[lang]} (${selectedListingForBooking.quantityMaunds} মন)`,
              maunds: selectedListingForBooking.quantityMaunds,
              totalAmount: payment.amount,
              status: (payment.paymentType === 'cod' ? 'Pending' : 'Advance Paid') as 'Pending' | 'Advance Paid',
            };

            const updated = AuthService.addOrderToCurrentUser(newOrder);
            if (updated) {
              onUserUpdate(updated);
            }

            setBookingSuccessMsg(
              lang === 'bn'
                ? `অভিনন্দন! "${selectedListingForBooking.varietyName.bn}" এর ${selectedListingForBooking.quantityMaunds} মনের লটটি সফলভাবে বুক করা হয়েছে। পেমেন্ট মাধ্যম: ${payment.method}, ট্রানজেকশন আইডি: ${payment.trxId}। বিক্রেতার সাথে যোগাযোগ করতে ফোন করুন: ${selectedListingForBooking.sellerPhone}`
                : `Success! "${selectedListingForBooking.varietyName.en}" (${selectedListingForBooking.quantityMaunds} maunds) has been booked via ${payment.method}. TrxID: ${payment.trxId}. Contact seller at: ${selectedListingForBooking.sellerPhone}`
            );
            setSelectedListingForBooking(null);
          }}
        />
      )}

    </div>
  );
};
