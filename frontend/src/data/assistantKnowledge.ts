export interface QAPair {
  id: string;
  keywords: string[];
  question: {
    en: string;
    bn: string;
  };
  answer: {
    en: string;
    bn: string;
  };
  source: string;
  sourceUrl?: string;
}

export const RICE_KNOWLEDGE_BASE: QAPair[] = [
  {
    id: 'brown_spot_nutrients',
    keywords: ['brown', 'spot', 'বাদামী', 'দাগ', 'তিল', 'তিলের মতো', 'potash', 'zinc', 'দস্তা', 'treat', 'cause', 'কারণ', 'প্রতিকার'],
    question: {
      en: 'What causes brown spots on rice leaves and how to treat them?',
      bn: 'ধানের পাতায় তিলের দানার মতো বাদামী দাগ হওয়ার কারণ ও প্রতিকার কী?',
    },
    answer: {
      en: 'Brown spot disease (Bipolaris oryzae) is primarily triggered by nutrient deficiencies (Potassium and Zinc) or drought stress:\n\n• Symptoms: Sesame seed-like circular brown spots with grey or yellow centers.\n• Organic Care: Maintain 2-5 cm standing water to avoid drought stress; add organic vermicompost.\n• Nutrient Remedy: Top-dress with MOP (Potash @ 5kg/bigha) and Zinc Sulfate.\n• Fungicide Spray: If severe, spray Nativo 75 WG (0.6g/L) or Carbendazim (Autostin @ 2g/L water).\n• Seed Prevention: Treat seeds next season with Provax-200 WP (2.5g/kg seed).',
      bn: 'বাদামী দাগ রোগ (Bipolaris oryzae) সাধারণত মাটিতে পটাশ ও জিংকের অভাব থাকলে এবং জমিতে রসের ঘাটতি (খরা) হলে মারাত্মক রূপ নেয়:\n\n• লক্ষণ: পাতায় তিলের দানার মতো গোল বা ডিম্বাকৃতি বাদামী দাগ, মাঝখানে ধূসর আভা।\n• জৈব প্রতিকার: জমিতে পর্যাপ্ত পানির রস বজায় রাখুন; বিঘাপ্রতি জৈব সার বা ট্রাইকো-কম্পোস্ট দিন।\n• সার প্রয়োগ: দ্রুত বিঘাপ্রতি ৫ কেজি পটাশ (MOP) ও জিংক সালফেট সার উপরিপ্রয়োগ করুন।\n• ছত্রাকনাশক: তীব্র হলে নেটিভো ৭৫ ডব্লিউজি (০.৬ গ্রাম/লিটার) অথবা অটোস্টিন (২ গ্রাম/লিটার পানিতে) মিশিয়ে স্প্রে করুন।\n• বীজ শোধন: পরবর্তী মৌসুমে বীজ প্রোভ্যাক্স-২০০ দিয়ে শোধন করে বপন করুন।',
    },
    source: 'DAE Crop Protection Guidelines & BRRI Rice Doctor (Factsheet #4)',
  },
  {
    id: 'blb_management',
    keywords: ['bacterial', 'blight', 'পোড়া', 'ব্লাইট', 'পাতা পোড়া', 'kresek', 'ইউরিয়া', 'urea', 'bacteria', 'আগা শুকানো'],
    question: {
      en: 'How to control and prevent Bacterial Leaf Blight (BLB) in paddy?',
      bn: 'ধানের ব্যাকটেরিয়াল পাতা পোড়া (ব্লাইট) রোগ হলে কী করণীয়?',
    },
    answer: {
      en: 'Bacterial Leaf Blight (Xanthomonas oryzae) causes leaves to dry from tips downward with wavy margins:\n\n1. Water Drainage: Drain stagnant water immediately and keep soil dry for 3–5 days.\n2. Stop Nitrogen: Completely suspend urea application until new healthy leaves emerge.\n3. Potash & Gypsum: Apply 5 kg Potash (MOP) and 5 kg Gypsum per bigha to reinforce cellular defense.\n4. Chemical/Bio Spray: Spray Copper Oxychloride (Cupravit 50 WP @ 2g/L) or fresh cow-dung filtrate (biocontrol).\n5. Resistant Cultivars: Plant BRRI dhan 89, 92, or Bangabandhu dhan 100 in future seasons.',
      bn: 'ব্যাকটেরিয়াল পাতা পোড়া (ব্লাইট) রোগে পাতার আগা থেকে দুই কিনারা বেয়ে ঢেউ খেলানো আকারে শুকিয়ে যায়:\n\n১. পানি নিষ্কাশন: আক্রান্ত জমির জমাট পানি দ্রুত বের করে ৩–৫ দিন জমি শুকনা রাখুন।\n২. ইউরিয়া বন্ধ: নতুন সুস্থ পাতা না আসা পর্যন্ত ইউরিয়া সারের উপরিপ্রয়োগ সম্পূর্ণ বন্ধ রাখুন।\n৩. পটাশ ও জিপসাম: গাছ শক্ত করতে বিঘা প্রতি ৫ কেজি পটাশ (MOP) এবং ৫ কেজি জিপসাম সার দিন।\n৪. স্প্রে: কৃষি কর্মকর্তার পরামর্শে কপার অক্সিক্লোরাইড (কুপ্রাভিট ২ গ্রাম/লিটার) অথবা গোবর পচানো পরিষ্কার পানি স্প্রে করুন।\n৫. প্রতিরোধী জাত: পরবর্তী মৌসুমে ব্রি ধান ৮৯, ব্রি ধান ৯২ বা বঙ্গবন্ধু ধান ১০০ চাষ করুন।',
    },
    source: 'BRRI Rice Production Manual (Chapter 12: Rice Pathology)',
  },
  {
    id: 'tungro_leafhopper',
    keywords: ['tungro', 'টুংরো', 'হলুদ', 'কমলা', 'খর্বাকৃতি', 'ফড়িং', 'পাতা ফড়িং', 'leafhopper', 'বেঁটে', 'vector', 'yellow', 'orange'],
    question: {
      en: 'How to manage Rice Tungro Virus and control the Green Leafhopper vector?',
      bn: 'ধানের টুংরো ভাইরাস এবং সবুজ পাতা ফড়িং কীভাবে নিয়ন্ত্রণ করা যায়?',
    },
    answer: {
      en: 'Tungro is a virus transmitted by the Green Leafhopper (GLH). Since there is no chemical cure for the virus, control the insect vector:\n\n1. Roguing: Uproot visibly infected orange/yellow stunted plants and bury them underground.\n2. Light Traps: Place nighttime light traps with kerosene/soapy water pans to attract and kill leafhoppers.\n3. Insecticide Spray: Spray Imidacloprid (Admire 200 SL @ 0.5ml/L) or Mipcin 75 WP (2g/L) aimed at the lower tiller bases.\n4. Synchronized Planting: Plant crops simultaneously across the block within 2 weeks.',
      bn: 'টুংরো ভাইরাস সবুজ পাতা ফড়িং দ্বারা ছড়ায়। ভাইরাসের কোনো সরাসরি ওষুধ নেই, তাই বাহক পোকা দমনই প্রধান উপায়:\n\n১. আক্রান্ত গাছ ধ্বংস: হলুদ-কমলা রঙের খর্বাকৃতি গাছ দেখামাত্র শিকড়সহ তুলে মাটির নিচে পুঁতে ফেলুন।\n২. আলোক ফাঁদ: রাতে বাতি ও সাবান পানির গামলা দিয়ে আলোক ফাঁদ তৈরি করে পাতা ফড়িং নিধন করুন।\n৩. কীটনাশক স্প্রে: গাছের গোড়ায় ইমিডাক্লোপ্রিড (এডমায়ার ০.৫ মিলি/লিটার) অথবা মিপসিন ৭৫ ডব্লিউপি (২ গ্রাম/লিটার) স্প্রে করুন।\n৪. প্রতিরোধী জাত: টুংরো সহনশীল ব্রি ধান ৪৮ বা ব্রি ধান ৭১ চাষ করুন।',
    },
    source: 'BRRI Entomology & Virology Division Advisory Bulletin',
  },
  {
    id: 'blast_disease',
    keywords: ['blast', 'ব্লাস্ট', 'চোখ', 'ঘাড় ব্লাস্ট', 'পাতা ব্লাস্ট', 'pyricularia', 'neck blast'],
    question: {
      en: 'How to identify and treat Rice Blast (Leaf, Node & Neck Blast)?',
      bn: 'ধানের ব্লাস্ট রোগ (পাতা ব্লাস্ট ও নেক ব্লাস্ট) কীভাবে দমন করবেন?',
    },
    answer: {
      en: 'Rice Blast (Pyricularia oryzae) is one of the most destructive diseases during cool nights and humid mornings:\n\n• Symptoms: Spindle or eye-shaped lesions with ash-colored centers; rotten black neck nodes breaking easily.\n• Emergency Treatment: Spray Tricyclazole 75 WP (e.g. Trooper @ 0.75g/L) or Nativo 75 WG (0.6g/L) in late afternoon.\n• Spray Timing: Spray once at booting stage and again at 50% heading stage.\n• Cultural Care: Keep field water standing at 2-3 inches to reduce spore dissemination.',
      bn: 'ব্লাস্ট রোগ (Pyricularia oryzae) ধানের শীষ ভেঙে যাওয়ার অন্যতম প্রধান কারণ:\n\n• লক্ষণ: পাতার ওপর চোখের মতো বা নৌকাকৃতি দাগ, মাঝখান ছাই রঙের। শীষের গোড়া কালো হয়ে শুকিয়ে ভেঙে যায় (নেক ব্লাস্ট)।\n• দ্রুত প্রতিকার: ট্রাইসাইক্লাজোল ৭৫ ডব্লিউপি (যেমন ট্রুপার ০.৭৫ গ্রাম/লিটার) অথবা নেটিভো (০.৬ গ্রাম/লিটার) বিকেলে স্প্রে করুন।\n• স্প্রে করার সময়: থোড় বের হওয়ার মুখে একবার এবং শীষ বের হওয়ার শুরুতে দ্বিতীয়বার স্প্রে করুন।\n• পানি ব্যবস্থাপনা: জমিতে ২–৩ ইঞ্চি পানি ধরে রাখলে ব্লাস্টের তীব্রতা হ্রাস পায়।',
    },
    source: 'BRRI Plant Pathology Division - Blast Management Guide',
  },
  {
    id: 'sheath_blight',
    keywords: ['sheath', 'blight', 'খোল পোড়া', 'খোল ব্লাইট', 'rhizoctonia', 'সাপের চামড়া'],
    question: {
      en: 'What are the symptoms and remedies for Sheath Blight in paddy?',
      bn: 'ধানের খোল পোড়া (Sheath Blight) রোগের লক্ষণ ও প্রতিকার কী?',
    },
    answer: {
      en: 'Sheath Blight (Rhizoctonia solani) starts on lower leaf sheaths above water level:\n\n• Symptoms: Greenish-grey oval lesions with dark margins, resembling snake skin patterns.\n• Remedy: Apply Validamycin (e.g. Sheathmar 3L @ 2ml/L) or Hexaconazole (Contaf 5 EC @ 1ml/L) targeting the base of plants.\n• Prevention: Avoid dense planting; maintain proper plant spacing to allow air circulation.',
      bn: 'খোল পোড়া রোগ পানির স্তরের ঠিক উপরে পাতার খোলে আক্রমণ করে:\n\n• লক্ষণ: সাপের চামড়ার মতো আঁকাবাঁকা ধূসর-সবুজ ছোপ ছোপ দাগ।\n• প্রতিকার: ভ্যালিডামাইসিন (যেমন শীথমূল বা শীথমের ২ মিলি/লিটার) অথবা হেক্সাকোনাজল (কন্ট্যাফ ১ মিলি/লিটার) গাছের গোড়া ভিজিয়ে স্প্রে করুন।\n• প্রতিরোধ: চারা ঘন করে না লাগিয়ে নির্দিষ্ট দূরত্বে রোপণ করুন যাতে বাতাস চলাচল করতে পারে।',
    },
    source: 'BRRI Rice Pathology Handbook',
  },
  {
    id: 'urea_management',
    keywords: ['urea', 'fertilizer', 'ইউরিয়া', 'সার', 'ডোজ', 'কিস্তি', 'গুটি ইউরিয়া', 'nitrogen', 'নাইট্রোজেন'],
    question: {
      en: 'What is the correct schedule for applying Urea fertilizer in rice?',
      bn: 'ধান ফসলে ইউরিয়া সার প্রয়োগের সঠিক নিয়ম ও কিস্তি কী?',
    },
    answer: {
      en: 'Urea should never be applied all at once. Split into 3 equal installments:\n\n• 1st Split: 10–15 days after transplanting (early tillering).\n• 2nd Split: 30–35 days after transplanting (active tillering).\n• 3rd Split: 5–7 days before panicle initiation (kone thhor).\n• Note: Always ensure 1–2 inches of soil water when applying, and never top-dress on dew-wet leaves.',
      bn: 'ইউরিয়া সার কখনো একবারে দেওয়া ঠিক নয়, এতে পাতা পোড়া ও ব্লাস্ট বাড়ে। ৩ কিস্তিতে দিন:\n\n• ১ম কিস্তি: চারা রোপণের ১০–১৫ দিন পর (কুশি আসার শুরুতে)।\n• ২য় কিস্তি: ৩০–৩৫ দিন পর (সর্বোচ্চ কুশি অবস্থায়)।\n• ৩য় কিস্তি: কাইচ থোড় আসার ৫–৭ দিন পূর্বে।\n• সতর্কতা: জমিতে ছিপছিপে পানি থাকা অবস্থায় সার দিন; শিশির ভেজা পাতায় ইউরিয়া ছিটাবেন না।',
    },
    source: 'BRRI Soil Science Division - Fertilizer Recommendation Guide',
  },
  {
    id: 'awd_irrigation',
    keywords: ['water', 'irrigation', 'পানি', 'সেচ', 'এডব্লিউডি', 'awd', 'শুকানো', 'খরচ', 'সেচ সাশ্রয়'],
    question: {
      en: 'How does Alternate Wetting and Drying (AWD) water management protect crop health?',
      bn: 'পর্যায়ক্রমে ভেজানো ও শুকানো (AWD) পদ্ধতিতে সেচ দিলে কী কী উপকার হয়?',
    },
    answer: {
      en: 'AWD uses a 7–10 cm perforated pipe to monitor the underground water level:\n\n• Saves 25–30% irrigation water and diesel/electricity expenses.\n• Promotes root aeration and prevents root asphyxiation.\n• Suppresses bacterial leaf blight and fungal sheath blight by reducing microclimate humidity.',
      bn: 'AWD বা পর্যায়ক্রমে ভেজানো ও শুকানো পদ্ধতিতে একটি ছিদ্রযুক্ত পাইপের সাহায্যে মাটির নিচের পানি পর্যবেক্ষণ করা হয়:\n\n• সেচের পানি ও জ্বালানি খরচ ২৫–৩০% সাশ্রয় হয়।\n• মাটির ভেতরে বাতাস চলাচল বাড়ে এবং শিকড় পচা রোগ হয় না।\n• জমিতে সারাক্ষণ স্যাঁতসেঁতে ভাব না থাকায় ব্যাকটেরিয়াল ব্লাইট ও খোল পোড়া রোগের প্রকোপ অনেক কমে যায়।',
    },
    source: 'BRRI Irrigation and Water Management Division (IWM)',
  },
  {
    id: 'insect_pests',
    keywords: ['pests', 'পোকা', 'মাজরা', 'পামরী', 'লেদা', 'hispa', 'stem borer', 'কীটপতঙ্গ', 'পোকামাকড়'],
    question: {
      en: 'How to control major rice insect pests (Stem Borer & Rice Hispa)?',
      bn: 'ধানের প্রধান ক্ষতিকর পোকা (মাজরা পোকা ও পামরী পোকা) কীভাবে দমন করবেন?',
    },
    answer: {
      en: 'Common insect control guidelines:\n\n• Stem Borer (মাজরা পোকা): Causes deadheart (মরা ডিগ) and whitehead. Use pheromone traps or apply Cartap (e.g. Suntap 4G @ 1kg/bigha) or Virtako.\n• Rice Hispa (পামরী পোকা): Scrapes green chlorophyl in white lines. Use sweep nets (সুইপিং) to catch beetles; spray Chlorpyrifos if severe.\n• Biological: Install T-perches for insectivorous birds in the field.',
      bn: 'ধানের প্রধান পোকামাকড় দমনের উপায়:\n\n• মাজরা পোকা: মরা ডিগ বা সাদা শীষ (চিটা) তৈরি করে। জমিতে বাঁশের কঞ্চি পুঁতে পাখি বসার ব্যবস্থা করুন এবং প্রয়োজনে কারটাপ (সানটাপ ৪জি বিঘা প্রতি ১ কেজি) বা ভিরতাকো প্রয়োগ করুন।\n• পামরী পোকা: পাতার সবুজ অংশ আঁচড়ে সাদা দাগ তৈরি করে। হাতজাল দিয়ে পোকা ধরুন এবং তীব্র হলে ক্লোরপাইরিফস গ্রুপের ওষুধ স্প্রে করুন।',
    },
    source: 'DAE Integrated Pest Management (IPM) Manual',
  },
  {
    id: 'helpline',
    keywords: ['helpline', 'contact', 'কৃষি কর্মকর্তা', 'নাম্বার', 'ফোন', 'help', 'hotline', 'সহায়তা', 'পরামর্শ'],
    question: {
      en: 'Where can farmers get direct expert agricultural advice in Bangladesh?',
      bn: 'বাংলাদেশে সরাসরি কৃষি বিশেষজ্ঞের পরামর্শ নেওয়ার হেল্পলাইন কোনগুলো?',
    },
    answer: {
      en: 'Official Agricultural Support Channels:\n\n• Krishi Call Center: Dial 16123 (Free consultation with agriculture specialists, 9 AM - 5 PM).\n• Upazila Agriculture Office (DAE): Contact your local Sub-Assistant Agriculture Officer (SAAO / উপসহকারী কৃষি কর্মকর্তা).\n• BRRI Rice Doctor App & Portal: www.brri.gov.bd.',
      bn: 'সরাসরি সরকারি কৃষি সহায়তা নম্বরসমূহ:\n\n• কৃষি কল সেন্টার: ১৬১২৩ (যেকোনো মোবাইল থেকে সকাল ৯টা – বিকাল ৫টা পর্যন্ত বিনামূল্যে কৃষি কর্মকর্তার পরামর্শ)।\n• উপজেলা কৃষি অফিস: আপনার এলাকার উপসহকারী কৃষি কর্মকর্তা (SAAO)-এর সাথে সরাসরি যোগাযোগ করুন।\n• ব্রি ওয়েবসাইট: www.brri.gov.bd',
    },
    source: 'Ministry of Agriculture, Bangladesh (Hotline 16123)',
  },
];
