export interface PaddyVarietyRate {
  id: string;
  name: {
    en: string;
    bn: string;
  };
  category: 'aromatic' | 'fine' | 'medium' | 'coarse';
  categoryLabel: {
    en: string;
    bn: string;
  };
  minPrice: number; // per maund (40 kg) in BDT
  maxPrice: number;
  trend: 'up' | 'down' | 'stable';
  change24h: string;
  marketContext: {
    en: string;
    bn: string;
  };
}

export interface PaddyListing {
  id: string;
  sellerId: string;
  sellerName: {
    en: string;
    bn: string;
  };
  sellerType: 'farmer' | 'aratdar';
  sellerPhone: string;
  sellerRating: number;
  varietyId: string;
  varietyName: {
    en: string;
    bn: string;
  };
  quantityMaunds: number; // 1 maund = 40 kg
  quantityKg: number;
  pricePerMaund: number; // BDT
  moisturePercent: number; // e.g. 12% dry, 18% wet
  moistureCondition: {
    en: string;
    bn: string;
  };
  division: string;
  district: string;
  districtBn: string;
  upazila: string;
  villageOrMarket: {
    en: string;
    bn: string;
  };
  availableFrom: string;
  description: {
    en: string;
    bn: string;
  };
  imageUrl: string;
  verifiedLot: boolean;
  bKashNumber?: string;
  nagadNumber?: string;
  status: 'active' | 'sold' | 'reserved';
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  role: 'farmer' | 'buyer';
  division: string;
  district: string;
  upazila: string;
  mfsType: 'bkash' | 'nagad' | 'rocket';
  mfsNumber: string;
  totalMaundsTraded: number;
  totalRevenue: number;
  orders: {
    id: string;
    listingTitle: string;
    date: string;
    maunds: number;
    totalAmount: number;
    status: 'Pending' | 'Advance Paid' | 'Delivered & Settled';
  }[];
}

export const PADDY_MARKET_RATES: PaddyVarietyRate[] = [
  {
    id: 'chinigura',
    name: {
      en: 'Chinigura (Fragrant / Sugondhi)',
      bn: 'চিনিগুঁড়া (সুগন্ধি পোলাও চালের ধান)',
    },
    category: 'aromatic',
    categoryLabel: {
      en: 'Premium Aromatic',
      bn: 'প্রিমিয়াম সুগন্ধি জাত',
    },
    minPrice: 2000,
    maxPrice: 2050,
    trend: 'up',
    change24h: '+৳২৫',
    marketContext: {
      en: 'Premium pricing for festival & export aromatic rice (Dinajpur origin)',
      bn: 'উৎসব ও রফতানি মানের প্রিমিয়াম সুগন্ধি ধান (দিনাজপুরের ঐতিহ্য)',
    },
  },
  {
    id: 'kataribhog',
    name: {
      en: 'Kataribhog / Katari',
      bn: 'কাটারিভোগ / কাটারি নাজির',
    },
    category: 'fine',
    categoryLabel: {
      en: 'High-Demand Fine Grain',
      bn: 'চিকন সরু চালের ধান',
    },
    minPrice: 1850,
    maxPrice: 1960,
    trend: 'stable',
    change24h: '০%',
    marketContext: {
      en: 'High consumer demand in urban wholesale markets and automatic mills',
      bn: 'শহুরে বাজার ও অটো রাইস মিলে সর্বোচ্চ চাহিদাসম্পন্ন চিকন ধান',
    },
  },
  {
    id: 'jirashail',
    name: {
      en: 'Jirashail / Miniket / Zira',
      bn: 'জিরাশাইল / মিনিকেট / জিরা',
    },
    category: 'fine',
    categoryLabel: {
      en: 'Fine Table Grain',
      bn: 'উচ্চমানের সরু ধান',
    },
    minPrice: 1900,
    maxPrice: 1950,
    trend: 'up',
    change24h: '+৳১৫',
    marketContext: {
      en: 'Stable, high-quality variety preferred by commercial millers',
      bn: 'অটো চালকলের জন্য নিয়মিত লাভজনক ও জনপ্রিয় সরু জাতের ধান',
    },
  },
  {
    id: 'brri_28_29',
    name: {
      en: 'BRRI Dhan-28 / BRRI-29 / BRRI-89',
      bn: 'ব্রি ধান-২৮ / ব্রি ধান-২৯ / ব্রি-৮৯',
    },
    category: 'medium',
    categoryLabel: {
      en: 'Standard Seasonal Rice',
      bn: 'মৌসুমি প্রধান ধান',
    },
    minPrice: 1400,
    maxPrice: 1450,
    trend: 'stable',
    change24h: '+৳১০',
    marketContext: {
      en: 'Most common seasonal choice across Haor, Boro, and Aman basins',
      bn: 'বাংলাদেশের সবচেয়ে বেশি উৎপাদিত ও দ্রুত লেনদেন হওয়া ধান',
    },
  },
  {
    id: 'swarna_5',
    name: {
      en: 'Swarna-5 / Coarse Dhan (Mota Dhan)',
      bn: 'স্বর্ণা-৫ / মোটা ধান',
    },
    category: 'coarse',
    categoryLabel: {
      en: 'High Production Coarse',
      bn: 'উচ্চ ফলনশীল মোটা ধান',
    },
    minPrice: 1200,
    maxPrice: 1250,
    trend: 'down',
    change24h: '-৳১০',
    marketContext: {
      en: 'Lower production cost, high bulk demand for parboiled rice & food relief',
      bn: 'কম খরচে বেশি ফলন, সিদ্ধ চাল ও পাইকারি ট্রেডিংয়ে সর্বোচ্চ চাহিদা',
    },
  },
  {
    id: 'najirshail',
    name: {
      en: 'Najirshail / Shampa Katari',
      bn: 'নাজিরশাইল / শম্পা কাটারি',
    },
    category: 'fine',
    categoryLabel: {
      en: 'Aromatic & Fine',
      bn: 'বিশেষ চিকন জাত',
    },
    minPrice: 1800,
    maxPrice: 1880,
    trend: 'up',
    change24h: '+৳২০',
    marketContext: {
      en: 'High market liquidity in Bogura, Naogaon, and Mymensingh hubs',
      bn: 'বগুড়া, নওগাঁ ও ময়মনসিংহের মোকামে নিয়মিত উচ্চমূল্যে বিক্রি',
    },
  },
];

export const INITIAL_PADDY_LISTINGS: PaddyListing[] = [
  {
    id: 'lot_101',
    sellerId: 'user_farmer_1',
    sellerName: {
      en: 'Haji Abdul Malek',
      bn: 'হাজী আব্দুল মালেক',
    },
    sellerType: 'farmer',
    sellerPhone: '01712-445566',
    sellerRating: 4.9,
    varietyId: 'kataribhog',
    varietyName: {
      en: 'Kataribhog Fine Grain (Sun Dried)',
      bn: 'কাটারিভোগ চিকন ধান (রোদে শুকানো)',
    },
    quantityMaunds: 180,
    quantityKg: 7200,
    pricePerMaund: 1920,
    moisturePercent: 12.5,
    moistureCondition: {
      en: 'Well Dried (12.5% Moisture)',
      bn: 'সম্পূর্ণ শুকনা (১২.৫% আর্দ্রতা)',
    },
    division: 'Rangpur',
    district: 'Dinajpur',
    districtBn: 'দিনাজপুর',
    upazila: 'Dinajpur Sadar',
    villageOrMarket: {
      en: 'Gopalganj Bazar, Dinajpur',
      bn: 'গোপালগঞ্জ বাজার সংলগ্ন চাতাল, দিনাজপুর',
    },
    availableFrom: 'Ready for Truck Loading',
    description: {
      en: 'Freshly harvested authentic Katari paddy. Completely clean of chaff and weed seeds. Direct from my own 12-bigha farm.',
      bn: 'নিজের ১২ বিঘা জমির সদ্য কাটা কাটারি ধান। চিটা ও ঘাসের বীজ ছাড়া সম্পূর্ণ ঝাড়াই করা। এখনই ট্রাকে লোড দেওয়া সম্ভব।',
    },
    imageUrl: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=600&q=80',
    verifiedLot: true,
    bKashNumber: '01712-445566',
    status: 'active',
  },
  {
    id: 'lot_102',
    sellerId: 'user_arat_2',
    sellerName: {
      en: 'Bismillah Krishi Arat (Prop: Rafiqul Islam)',
      bn: 'বিসমিল্লাহ কৃষি আড়ত (প্রো: রফিকুল ইসলাম)',
    },
    sellerType: 'aratdar',
    sellerPhone: '01718-998877',
    sellerRating: 4.8,
    varietyId: 'chinigura',
    varietyName: {
      en: 'Chinigura Premium Aromatic Paddy',
      bn: 'চিনিগুঁড়া প্রিমিয়াম সুগন্ধি ধান',
    },
    quantityMaunds: 250,
    quantityKg: 10000,
    pricePerMaund: 2040,
    moisturePercent: 13.0,
    moistureCondition: {
      en: 'Optimal for Auto Milling',
      bn: 'অটো চালকলের জন্য প্রস্তুত',
    },
    division: 'Rajshahi',
    district: 'Bogura',
    districtBn: 'বগুড়া',
    upazila: 'Sherpur',
    villageOrMarket: {
      en: 'Sherpur Dhaner Mokam, Bogura',
      bn: 'শেরপুর ধানের মোকাম, বগুড়া',
    },
    availableFrom: 'Immediate Delivery (2 Trucks Capacity)',
    description: {
      en: 'Top grade aromatic Chinigura paddy with natural fragrance. Moisture verified with digital meter. Ideal for packaging mills.',
      bn: 'অরিজিনাল মিষ্টি সুবাসযুক্ত চিনিগুঁড়া ধান। ডিজিটাল মিটারে আর্দ্রতা মেপে সংরক্ষণ করা হয়েছে। বড় মিলের জন্য পারফেক্ট লট।',
    },
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
    verifiedLot: true,
    bKashNumber: '01718-998877',
    status: 'active',
  },
  {
    id: 'lot_103',
    sellerId: 'user_farmer_3',
    sellerName: {
      en: 'Md. Shafiqul Alam (Model Farmer)',
      bn: 'মো: শফিকুল আলম (মডেল কৃষক)',
    },
    sellerType: 'farmer',
    sellerPhone: '01819-223344',
    sellerRating: 5.0,
    varietyId: 'brri_28_29',
    varietyName: {
      en: 'BRRI Dhan-89 / High Yield Boro Lot',
      bn: 'ব্রি ধান-৮৯ / উচ্চ ফলনশীল বোরো ধান',
    },
    quantityMaunds: 320,
    quantityKg: 12800,
    pricePerMaund: 1440,
    moisturePercent: 13.5,
    moistureCondition: {
      en: 'Machine Cleaned & Bagged',
      bn: 'মেশিনে ঝাড়াই ও বস্তাভর্তি',
    },
    division: 'Mymensingh',
    district: 'Mymensingh',
    districtBn: 'ময়মনসিংহ',
    upazila: 'Trishal',
    villageOrMarket: {
      en: 'Dhanikhola Road, Trishal',
      bn: 'ধানীখোলা রোড, ত্রিশাল, ময়মনসিংহ',
    },
    availableFrom: 'Warehouse Ready',
    description: {
      en: 'Bumper production BRRI-89 paddy. Grains are heavy, bright golden, zero disease infection. Weighed in standard 80kg jute sacks.',
      bn: 'বাম্পার ফলনের চকচকে সোনালী রঙের ব্রি-৮৯ ধান। কোনো রোগ বা পোকামাকড়ের ক্ষতি নেই। ৮০ কেজির পাটের বস্তায় প্রস্তুত।',
    },
    imageUrl: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&w=600&q=80',
    verifiedLot: true,
    nagadNumber: '01819-223344',
    status: 'active',
  },
  {
    id: 'lot_104',
    sellerId: 'user_farmer_4',
    sellerName: {
      en: 'Anwar Hossain Mondol',
      bn: 'আনোয়ার হোসেন মণ্ডল',
    },
    sellerType: 'farmer',
    sellerPhone: '01725-667788',
    sellerRating: 4.7,
    varietyId: 'jirashail',
    varietyName: {
      en: 'Jirashail Miniket Paddy (Naogaon Origin)',
      bn: 'জিরাশাইল মিনিকেট ধান (নওগাঁর প্রসিদ্ধ ধান)',
    },
    quantityMaunds: 140,
    quantityKg: 5600,
    pricePerMaund: 1940,
    moisturePercent: 12.0,
    moistureCondition: {
      en: 'Extra Dry (12% Moisture)',
      bn: 'কড়া রোদে শুকানো (১২% আর্দ্রতা)',
    },
    division: 'Rajshahi',
    district: 'Naogaon',
    districtBn: 'নওগাঁ',
    upazila: 'Mohadevpur',
    villageOrMarket: {
      en: 'Mohadevpur Rice Market, Naogaon',
      bn: 'মহাদেবপুর ধানের আড়ত, নওগাঁ',
    },
    availableFrom: 'Immediate Pickup',
    description: {
      en: 'Famous Jirashail variety cultivated in pesticide-controlled methods. Exceptional grain integrity with high milling yield ratio.',
      bn: 'নওগাঁর বিখ্যাত জিরাশাইল ধান। চালকলে ভাঙালে সর্বোচ্চ পরিমাণ চিকন আস্ত চাল পাওয়া যায়। চিটা মুক্ত ও পরিষ্কার।',
    },
    imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80',
    verifiedLot: true,
    bKashNumber: '01725-667788',
    status: 'active',
  },
  {
    id: 'lot_105',
    sellerId: 'user_arat_5',
    sellerName: {
      en: 'Kushtia Shonar Bangla Krishi Bhandar',
      bn: 'কুষ্টিয়া সোনার বাংলা কৃষি ভাণ্ডার',
    },
    sellerType: 'aratdar',
    sellerPhone: '01912-334455',
    sellerRating: 4.9,
    varietyId: 'swarna_5',
    varietyName: {
      en: 'Swarna-5 Coarse Paddy (Bulk Lot)',
      bn: 'স্বর্ণা-৫ মোটা ধান (বড় লট)',
    },
    quantityMaunds: 500,
    quantityKg: 20000,
    pricePerMaund: 1220,
    moisturePercent: 14.0,
    moistureCondition: {
      en: 'Direct Harvester Field Lot',
      bn: 'হারভেস্টারে কাটা তাজা ধান',
    },
    division: 'Khulna',
    district: 'Kushtia',
    districtBn: 'কুষ্টিয়া',
    upazila: 'Kumarkhali',
    villageOrMarket: {
      en: 'Kumarkhali Ghat, Kushtia',
      bn: 'কুমারখালী ঘাট সংলগ্ন গোডাউন, কুষ্টিয়া',
    },
    availableFrom: 'Bulk Order Delivery (Truck Access)',
    description: {
      en: 'Bulk quantity of Swarna-5 suitable for parboiled rice processing. 10-wheeler truck accessible location on regional highway.',
      bn: 'বড় চালকলের জন্য ৫০০ মনের বিশাল লট। কুমারখালী মহাসড়ক সংলগ্ন হওয়ায় সরাসরি ১০ চাকার ট্রাকে লোড দেওয়া সহজ।',
    },
    imageUrl: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&w=600&q=80',
    verifiedLot: true,
    status: 'active',
  },
];
