import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CreditCard,
  Smartphone,
  Building,
  CheckCircle2,
  Lock,
  ArrowRight,
  Truck,
  Printer,
  ChevronRight,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { Language } from '../types';
import { PaddyListing } from '../data/marketplaceData';

interface PaymentGatewayModalProps {
  lang: Language;
  listing: PaddyListing;
  onClose: () => void;
  onSuccess: (paymentDetails: {
    method: string;
    trxId: string;
    amount: number;
    paymentType: 'token' | 'full' | 'cod';
  }) => void;
}

export const PaymentGatewayModal: React.FC<PaymentGatewayModalProps> = ({
  lang,
  listing,
  onClose,
  onSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<'wallets' | 'cards' | 'netbanking' | 'cod'>('wallets');
  const [paymentType, setPaymentType] = useState<'token' | 'full'>('token');
  const [selectedMethod, setSelectedMethod] = useState<string | null>('bkash');
  
  // Interactive Payment Flow Steps: 'selection' -> 'input' -> 'success'
  const [step, setStep] = useState<'selection' | 'process' | 'receipt'>('selection');
  const [walletPhone, setWalletPhone] = useState('017XXXXXXXX');
  const [pinOrOtp, setPinOrOtp] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedTrxId, setGeneratedTrxId] = useState('');

  const totalAmount = listing.quantityMaunds * listing.pricePerMaund;
  const tokenAmount = Math.round(totalAmount * 0.10); // 10% token advance
  const payableAmount = paymentType === 'token' ? tokenAmount : totalAmount;

  // Mobile Wallets (MFS)
  const mobileWallets = [
    {
      id: 'bkash',
      name: 'bKash',
      nameBn: 'বিকাশ',
      color: '#e2136e',
      bg: 'bg-[#e2136e]/10 border-[#e2136e]/30',
      badge: 'বিকাশ',
      textColor: 'text-[#e2136e]',
      symbol: (
        <div className="w-10 h-7 bg-[#e2136e] rounded-md flex items-center justify-center text-white font-black text-xs tracking-tighter">
          bKash
        </div>
      ),
    },
    {
      id: 'nagad',
      name: 'Nagad',
      nameBn: 'নগদ',
      color: '#f7941d',
      bg: 'bg-[#f7941d]/10 border-[#f7941d]/30',
      badge: 'নগদ',
      textColor: 'text-[#f7941d]',
      symbol: (
        <div className="w-10 h-7 bg-gradient-to-r from-[#ea1d24] to-[#f7941d] rounded-md flex items-center justify-center text-white font-bold text-xs">
          নগদ
        </div>
      ),
    },
    {
      id: 'rocket',
      name: 'Rocket',
      nameBn: 'রকেট',
      color: '#8c3494',
      bg: 'bg-[#8c3494]/10 border-[#8c3494]/30',
      badge: 'রকেট',
      textColor: 'text-[#8c3494]',
      symbol: (
        <div className="w-10 h-7 bg-[#8c3494] rounded-md flex items-center justify-center text-white font-bold text-xs">
          রকেট
        </div>
      ),
    },
    {
      id: 'upay',
      name: 'Upay',
      nameBn: 'উপায়',
      color: '#002d72',
      bg: 'bg-amber-50 border-amber-200',
      badge: 'উপায়',
      textColor: 'text-[#002d72]',
      symbol: (
        <div className="w-10 h-7 bg-[#ffcb05] text-[#002d72] rounded-md flex items-center justify-center font-black text-xs border border-amber-300">
          upay
        </div>
      ),
    },
    {
      id: 'tap',
      name: 'Tap',
      nameBn: 'ট্যাপ',
      color: '#ed1c24',
      bg: 'bg-red-50 border-red-200',
      badge: 'ট্যাপ',
      textColor: 'text-red-600',
      symbol: (
        <div className="w-10 h-7 bg-[#ed1c24] rounded-md flex items-center justify-center text-white font-bold text-[11px]">
          tap
        </div>
      ),
    },
    {
      id: 'okwallet',
      name: 'OK Wallet',
      nameBn: 'ওকে ওয়ালেট',
      color: '#f58220',
      bg: 'bg-yellow-50 border-yellow-200',
      badge: 'ওকে ওয়ালেট',
      textColor: 'text-amber-800',
      symbol: (
        <div className="w-10 h-7 bg-amber-400 rounded-md flex items-center justify-center text-slate-900 font-bold text-[10px]">
          OK
        </div>
      ),
    },
    {
      id: 'surecash',
      name: 'SureCash',
      nameBn: 'শিওরক্যাশ',
      color: '#005baa',
      bg: 'bg-blue-50 border-blue-200',
      badge: 'শিওরক্যাশ',
      textColor: 'text-blue-700',
      symbol: (
        <div className="w-10 h-7 bg-[#005baa] rounded-md flex items-center justify-center text-white font-bold text-[9px]">
          শিওরক্যাশ
        </div>
      ),
    },
  ];

  // Cards (Local & International)
  const cardsList = [
    {
      id: 'visa',
      name: 'VISA Card',
      sub: 'Debit & Credit',
      color: '#1a1f71',
      symbol: (
        <div className="w-12 h-8 bg-slate-900 rounded-md flex items-center justify-center text-white font-black italic text-sm tracking-wider">
          VISA
        </div>
      ),
    },
    {
      id: 'mastercard',
      name: 'MasterCard',
      sub: 'Global Acceptance',
      color: '#eb001b',
      symbol: (
        <div className="w-12 h-8 bg-slate-900 rounded-md flex items-center justify-center relative overflow-hidden">
          <div className="w-4 h-4 rounded-full bg-[#eb001b] -mr-1" />
          <div className="w-4 h-4 rounded-full bg-[#f79e1b] -ml-1 opacity-90" />
        </div>
      ),
    },
    {
      id: 'amex',
      name: 'American Express',
      sub: 'AMEX Cards',
      color: '#006fcf',
      symbol: (
        <div className="w-12 h-8 bg-[#006fcf] rounded-md flex items-center justify-center text-white font-black text-[9px] uppercase tracking-tighter text-center leading-none">
          AMEX
        </div>
      ),
    },
    {
      id: 'dbbl_nexus',
      name: 'DBBL Nexus',
      sub: 'Dutch-Bangla Bank',
      color: '#00843d',
      symbol: (
        <div className="w-12 h-8 bg-white border border-slate-300 rounded-md flex items-center justify-center">
          <div className="flex -space-x-1">
            <span className="w-2.5 h-4 bg-red-600 rounded-l-full" />
            <span className="w-2.5 h-4 bg-green-600" />
            <span className="w-2.5 h-4 bg-blue-600 rounded-r-full" />
          </div>
        </div>
      ),
    },
    {
      id: 'discover',
      name: 'Discover Network',
      sub: 'International Cards',
      color: '#f6851f',
      symbol: (
        <div className="w-12 h-8 bg-white border border-slate-300 rounded-md flex items-center justify-center text-slate-800 font-extrabold text-[9px]">
          DISC<span className="text-orange-500 font-black">O</span>VER
        </div>
      ),
    },
    {
      id: 'qcash',
      name: 'Q-Cash',
      sub: 'National Payment Switch',
      color: '#d32f2f',
      symbol: (
        <div className="w-12 h-8 bg-[#d32f2f] rounded-md flex items-center justify-center text-white font-extrabold text-xs">
          Q
        </div>
      ),
    },
    {
      id: 'unionpay',
      name: 'UnionPay',
      sub: 'China & Asia Network',
      color: '#d6001c',
      symbol: (
        <div className="w-12 h-8 bg-[#d6001c] rounded-md flex items-center justify-center text-white font-bold text-[9px]">
          UnionPay
        </div>
      ),
    },
  ];

  // Net Banking options
  const netBankingList = [
    { id: 'ibbl', name: 'Islami Bank (iBanking)' },
    { id: 'city', name: 'City Bank (City Touch)' },
    { id: 'brac', name: 'BRAC Bank (Astha)' },
    { id: 'dbbl_net', name: 'Dutch-Bangla Internet Banking' },
  ];

  const handleProceedToProcess = () => {
    if (activeTab === 'cod') {
      executeSuccess('cod', 'COD-ESCROW');
      return;
    }
    setStep('process');
  };

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const trx = `TRX-${Math.floor(10000000 + Math.random() * 90000000)}`;
      setGeneratedTrxId(trx);
      setIsProcessing(false);
      setStep('receipt');
    }, 1200);
  };

  const executeSuccess = (method: string, trx: string) => {
    onSuccess({
      method: method.toUpperCase(),
      trxId: trx,
      amount: payableAmount,
      paymentType: activeTab === 'cod' ? 'cod' : paymentType,
    });
  };

  const handleFinish = () => {
    executeSuccess(selectedMethod || 'MFS', generatedTrxId);
    onClose();
  };

  return (
    <div className={`fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto ${lang === 'bn' ? 'font-bengali' : 'font-sans'}`}>
      
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-200 relative animate-scaleUp my-8">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-emerald-700 to-teal-800 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-5 h-5 text-emerald-300" />
            <span className="text-xs uppercase tracking-wider font-bold text-emerald-200">
              {lang === 'bn' ? 'নিরাপদ পেমেন্ট গেটওয়ে (SSL Encrypted)' : 'Secure Agritech Payment Gateway'}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black">
            {lang === 'bn' ? 'ধান ক্রয়ের লেনদেন ও বায়না পরিশোধ' : 'Paddy Lot Purchase & Escrow'}
          </h3>

          {/* Lot Summary Pill */}
          <div className="mt-4 bg-white/10 backdrop-blur-md rounded-2xl p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs border border-white/15">
            <div>
              <span className="text-emerald-200 block text-[11px] font-medium">
                {lang === 'bn' ? 'ধানের জাত ও পরিমাণ:' : 'Paddy Lot & Quantity:'}
              </span>
              <strong className="text-sm font-bold text-white">
                {listing.varietyName[lang]} ({listing.quantityMaunds} {lang === 'bn' ? 'মন' : 'Maunds'})
              </strong>
            </div>

            <div className="text-right">
              <span className="text-emerald-200 block text-[11px] font-medium">
                {lang === 'bn' ? 'পরিশোধযোগ্য বিল:' : 'Payable Amount:'}
              </span>
              <strong className="text-lg font-black text-white font-mono">
                ৳{payableAmount.toLocaleString()} BDT
              </strong>
            </div>
          </div>
        </div>

        {/* STEP 1: PAYMENT METHOD SELECTION */}
        {step === 'selection' && (
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Payment Type Switcher: 10% Token Advance vs Full Price */}
            <div className="bg-slate-50 p-1.5 rounded-2xl border border-slate-200 flex items-center justify-between text-xs font-bold">
              <button
                type="button"
                onClick={() => setPaymentType('token')}
                className={`flex-1 py-2.5 px-3 rounded-xl transition-all cursor-pointer text-center ${
                  paymentType === 'token'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>{lang === 'bn' ? '১০% বায়না বুকিং (টোকেন মানি)' : '10% Token Advance Booking'}</span>
                <span className="block font-mono text-[11px] opacity-90">৳{tokenAmount.toLocaleString()}</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentType('full')}
                className={`flex-1 py-2.5 px-3 rounded-xl transition-all cursor-pointer text-center ${
                  paymentType === 'full'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>{lang === 'bn' ? 'সম্পূর্ণ মূল্য পরিশোধ (১০০%)' : 'Full Payment (100%)'}</span>
                <span className="block font-mono text-[11px] opacity-90">৳{totalAmount.toLocaleString()}</span>
              </button>
            </div>

            {/* Gateway Category Tabs (Matching the uploaded image layout) */}
            <div className="border-b border-slate-200 flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveTab('wallets')}
                className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'wallets'
                    ? 'border-emerald-500 text-emerald-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>{lang === 'bn' ? 'মোবাইল ওয়ালেট (MFS)' : 'Major Mobile Wallet Methods'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('cards')}
                className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'cards'
                    ? 'border-emerald-500 text-emerald-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>{lang === 'bn' ? 'কার্ড (Cards - Local & Intl)' : 'Major Cards - Local & Intl'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('cod')}
                className={`pb-3 px-3 border-b-2 flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'cod'
                    ? 'border-emerald-500 text-emerald-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Truck className="w-4 h-4" />
                <span>{lang === 'bn' ? 'চালকল ওজন স্কেল (COD)' : 'Mill Weighbridge COD'}</span>
              </button>
            </div>

            {/* TAB 1: Mobile Wallets Grid (bKash, Nagad, Rocket, Upay, Tap, etc.) */}
            {activeTab === 'wallets' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold uppercase tracking-wider text-slate-600">
                    {lang === 'bn' ? 'বিকাশ, নগদ, রকেট বা অন্যান্য ওয়ালেট নির্বাচন করুন' : 'Select a Mobile Wallet Provider'}
                  </span>
                  <span className="text-[11px] text-emerald-700 font-medium">Instant Verification</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {mobileWallets.map((wallet) => (
                    <button
                      key={wallet.id}
                      type="button"
                      onClick={() => setSelectedMethod(wallet.id)}
                      className={`p-3.5 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                        selectedMethod === wallet.id
                          ? 'border-emerald-500 bg-emerald-50/50 shadow-md ring-2 ring-emerald-500/20'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      {wallet.symbol}
                      <span className="text-xs font-bold text-slate-800">{wallet.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: Major Cards (Visa, MasterCard, Amex, DBBL Nexus, etc.) */}
            {activeTab === 'cards' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold uppercase tracking-wider text-slate-600">
                    {lang === 'bn' ? 'ভিসা, মাস্টারকার্ড, নেক্সাস বা অ্যামেক্স কার্ড' : 'Major Cards - Local & International'}
                  </span>
                  <span className="text-[11px] text-emerald-700 font-medium">256-Bit SSL Secured</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {cardsList.map((card) => (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => setSelectedMethod(card.id)}
                      className={`p-3.5 rounded-2xl border-2 flex items-center gap-3 transition-all cursor-pointer text-left ${
                        selectedMethod === card.id
                          ? 'border-emerald-500 bg-emerald-50/50 shadow-md ring-2 ring-emerald-500/20'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      {card.symbol}
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-slate-900 block truncate">{card.name}</span>
                        <span className="text-[10px] text-slate-400 block truncate">{card.sub}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: Mill Weighbridge COD Escrow */}
            {activeTab === 'cod' && (
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-emerald-600" />
                  <h4 className="text-sm font-bold text-slate-900">
                    {lang === 'bn' ? 'চালকল ডিজিটাল ওজন স্কেলে যাচাই ও পরিশোধ' : 'Mill Weighbridge COD Escrow'}
                  </h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {lang === 'bn'
                    ? 'ট্রাকটি যখন আপনার চালকলে পৌঁছাবে, তখন ডিজিটাল স্কেলে সঠিক ওজন ও আর্দ্রতা পরীক্ষা করে চালানের বাকি মূল্য সরাসরি ব্যাংক ট্রান্সফার বা ক্যাশে পরিশোধ করা হবে।'
                    : 'The grain truck will be weighed at your designated rice mill weighbridge. Once net weight and moisture are confirmed, final settlement is disbursed via bank or cash.'}
                </p>
                <div className="p-3 bg-emerald-100/70 rounded-xl text-emerald-900 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                  <span>{lang === 'bn' ? 'কোনো তাৎক্ষণিক টাকা কাটা হবে না। লটটি আপনার জন্য রিজার্ভ হবে।' : 'Zero upfront debit. The lot will be reserved for your mill.'}</span>
                </div>
              </div>
            )}

            {/* Action Button */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>SSLCOMMERZ / Central Bank Verified</span>
              </div>

              <button
                type="button"
                onClick={handleProceedToProcess}
                className="px-8 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm shadow-lg shadow-emerald-500/25 active:scale-95 flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>{lang === 'bn' ? 'পরবর্তী ধাপে যান' : 'Continue to Pay'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

        {/* STEP 2: SIMULATED PAYMENT PROCESS (bKash / Nagad / Card PIN Step) */}
        {step === 'process' && (
          <form onSubmit={handleSimulatePayment} className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-1">
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                {selectedMethod?.toUpperCase()} Gateway
              </span>
              <h4 className="text-xl font-black text-slate-900">
                {lang === 'bn' ? 'অ্যাকাউন্ট নম্বর ও পিন প্রদান করুন' : 'Enter Account Details to Authorize'}
              </h4>
              <p className="text-xs text-slate-500">
                {lang === 'bn'
                  ? `আপনার ${selectedMethod} অ্যাকাউন্ট থেকে ৳${payableAmount.toLocaleString()} ডেবিট করা হবে`
                  : `৳${payableAmount.toLocaleString()} BDT will be authorized from your ${selectedMethod}`}
              </p>
            </div>

            {/* Wallet / Card Input Fields */}
            <div className="space-y-4 max-w-sm mx-auto">
              {activeTab === 'wallets' ? (
                <>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">
                      {lang === 'bn' ? `${selectedMethod?.toUpperCase()} ওয়ালেট নম্বর` : `${selectedMethod?.toUpperCase()} Wallet Number`}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="017XXXXXXXX"
                      value={walletPhone}
                      onChange={(e) => setWalletPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-mono font-bold focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">
                      {lang === 'bn' ? 'গোপন পিন / ওটিপি (PIN / OTP)' : 'Account PIN / OTP'}
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••"
                      maxLength={5}
                      value={pinOrOtp}
                      onChange={(e) => setPinOrOtp(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-mono tracking-widest text-center font-bold focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">
                      {lang === 'bn' ? 'কার্ড নম্বর (Card Number)' : '16-Digit Card Number'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="4123 •••• •••• ••••"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-mono font-bold focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Expiry (MM/YY)</label>
                      <input
                        type="text"
                        placeholder="12/28"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">CVV</label>
                      <input
                        type="password"
                        placeholder="•••"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-mono"
                      />
                    </div>
                  </div>
                </>
              )}

              <p className="text-[11px] text-slate-400 text-center">
                🔒 {lang === 'bn' ? 'ডেমো সিমুলেশন: আপনার কোনো আসল টাকা কাটা হবে না।' : 'Demo Sandbox: No real currency will be charged.'}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStep('selection')}
                className="text-xs font-bold text-slate-600 hover:text-slate-900"
              >
                {lang === 'bn' ? '← অন্য মাধ্যম বেছে নিন' : '← Change Method'}
              </button>

              <button
                type="submit"
                disabled={isProcessing}
                className="px-8 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-75 text-white font-extrabold text-sm shadow-lg shadow-emerald-500/25 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                {isProcessing ? (
                  <span>{lang === 'bn' ? 'যাচাই করা হচ্ছে...' : 'Verifying with Bank...'}</span>
                ) : (
                  <span>{lang === 'bn' ? `৳${payableAmount.toLocaleString()} পরিশোধ নিশ্চিত করুন` : `Confirm ৳${payableAmount.toLocaleString()}`}</span>
                )}
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: TRANSACTION SUCCESS & DIGITAL RECEIPT */}
        {step === 'receipt' && (
          <div className="p-6 sm:p-8 space-y-6 text-center animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md shadow-emerald-500/20">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h4 className="text-2xl font-black text-slate-900">
                {lang === 'bn' ? 'পেমেন্ট ও বায়না সফল হয়েছে!' : 'Payment Authorized Successfully!'}
              </h4>
              <p className="text-xs text-slate-500">
                {lang === 'bn' ? 'ধানের লটটি আপনার জন্য সংরক্ষিত করা হয়েছে' : 'Paddy Lot has been reserved for your mill.'}
              </p>
            </div>

            {/* Official Digital Invoice / Receipt */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-left space-y-3 text-xs max-w-md mx-auto">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Transaction ID:</span>
                <span className="font-mono font-extrabold text-emerald-800">{generatedTrxId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{lang === 'bn' ? 'পেমেন্ট মাধ্যম:' : 'Method:'}</span>
                <span className="font-bold text-slate-800 uppercase">{selectedMethod} Gateway</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{lang === 'bn' ? 'ধানের জাত:' : 'Crop Variety:'}</span>
                <span className="font-bold text-slate-800">{listing.varietyName[lang]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{lang === 'bn' ? 'পরিমাণ:' : 'Quantity:'}</span>
                <span className="font-bold text-slate-800">{listing.quantityMaunds} {lang === 'bn' ? 'মন' : 'Maunds'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{lang === 'bn' ? 'কৃষক / বিক্রেতা:' : 'Farmer / Seller:'}</span>
                <span className="font-bold text-slate-800">{listing.sellerName[lang]} ({listing.sellerPhone})</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 text-sm font-extrabold text-slate-900">
                <span>{lang === 'bn' ? 'পরিশোধিত অর্থ:' : 'Amount Paid:'}</span>
                <span className="text-emerald-700 font-mono">৳{payableAmount.toLocaleString()} BDT</span>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="w-full max-w-md mx-auto py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm shadow-md transition-all cursor-pointer"
            >
              {lang === 'bn' ? 'রিসিপ্ট সেভ করে ড্যাশবোর্ডে ফিরুন' : 'Done & Return to Marketplace'}
            </button>
          </div>
        )}

      </div>

    </div>
  );
};
