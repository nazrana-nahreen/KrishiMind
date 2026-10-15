import { DiseaseDetail } from '../types';

export const DISEASE_DATABASE: Record<string, DiseaseDetail> = {
  bacterial_leaf_blight: {
    id: 'bacterial_leaf_blight',
    name: {
      en: 'Bacterial Leaf Blight (BLB)',
      bn: 'ব্যাকটেরিয়াল পাতা পোড়া রোগ (ব্লাইট)',
    },
    scientificName: 'Xanthomonas oryzae pv. oryzae',
    type: 'bacterial',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    severity: {
      en: 'High Yield Loss Potential (20-60%)',
      bn: 'উচ্চ ফলন ক্ষতির ঝুঁকি (২০-৬০%)',
    },
    shortDescription: {
      en: 'A devastating systemic bacterial disease that affects rice leaves from tillering to heading stage, causing rapid drying of leaves.',
      bn: 'ধানের একটি মারাত্বক ব্যাকটেরিয়াজনিত রোগ যা কুশি থেকে থোড় আসার পর্যায়ে পাতার কিনারা শুকিয়ে বাদামী বা খড়ের রঙ ধারণ করে।',
    },
    symptoms: {
      en: [
        'Water-soaked to yellowish-green stripes initiating near leaf tips and margins.',
        'Lesions rapidly elongate with characteristic wavy margins, turning dull white or straw-colored.',
        'Milky bacterial dew beads appear on young lesions early in the morning.',
        'Severe systemic kresek phase causes seedlings to wither and lodge prematurely.',
      ],
      bn: [
        'পাতার আগা ও কিনারায় পানির মতো ভেজা বা হলুদাভ সবুজ দাগ তৈরি হয়।',
        'দাগগুলো ক্রমশ নিচের দিকে ঢেউটিন আকৃতির ঢেউ খেলানো কিনারাসহ বাদামী বা খড় রঙে শুকিয়ে যায়।',
        'ভোরের কুয়াশায় আক্রান্ত পাতার কিনারে ব্যাকটেরিয়ার রস বা আঠালো ফোঁটা লক্ষ্য করা যায়।',
        'তীব্র আক্রমণে চারার "ক্রিসেক" দশা ঘটে এবং ধান গাছ দ্রুত মরে যায়।',
      ],
    },
    causes: {
      en: [
        'Favored by temperatures between 25°C-34°C with high relative humidity (>85%).',
        'Excessive application of chemical urea/nitrogen fertilizer.',
        'Rainstorms, strong winds, and cyclone conditions creating microscopic leaf abrasions.',
        'Stagnant deep floodwater aiding bacterial dispersal across fields.',
      ],
      bn: [
        '২৫°–৩৪° সেলসিয়াস তাপমাত্রা এবং উচ্চ আর্দ্রতা (>৮৫%)।',
        'জমিতে মাত্রারিক্ত ইউরিয়া সার প্রয়োগ।',
        'বৃষ্টি, ঝড়ো হাওয়া বা ঝড়ের কারণে পাতায় হওয়া সূক্ষ্ম ক্ষতের মাধ্যমে ব্যাকটেরিয়া প্রবেশ করে।',
        'জমিতে দীর্ঘদিন জমাট পানি থাকলে রোগের দ্রুত বিস্তার ঘটে।',
      ],
    },
    management: {
      organic: {
        en: [
          'Drain field water immediately and keep the land dry for 3–5 days to slow bacterial progression.',
          'Apply neem seed extract or spray cow dung slurry supernatant (biocontrol mechanism).',
          'Avoid clipping leaf tips during seedling transplantation.',
        ],
        bn: [
          'আক্রান্ত জমিতে জমাট পানি অবিলম্বে নিষ্কাশন করে ৩–৫ দিন শুষ্ক রাখুন।',
          'নিম পাতার নির্যাস বা গোবর পচানো পরিষ্কার পানি স্প্রে করুন।',
          'চারা রোপণের সময় পাতার আগা কাটা থেকে বিরত থাকুন।',
        ],
      },
      chemical: {
        en: [
          'Top dress with 5 kg MOP (Potash) and 5 kg Gypsum per bigha to increase tissue silica and disease resistance.',
          'Suspend all nitrogen/urea top-dressing until fresh healthy leaves emerge.',
          'Apply Copper Oxychloride (e.g. Cupravit 50 WP @ 2g/L) or Bismerthiazol under local extension advice.',
        ],
        bn: [
          'বিঘা প্রতি ৫ কেজি এমওপি (পটাশ) এবং ৫ কেজি জিপসাম উপরিপ্রয়োগ করে গাছের রোগ প্রতিরোধ শক্তি বাড়ান।',
          'নতুন সুস্থ পাতা না আসা পর্যন্ত ইউরিয়া সার দেওয়া সম্পূর্ণ বন্ধ রাখুন।',
          'কৃষি কর্মকর্তার পরামর্শে কপার অক্সিক্লোরাইড (যেমন কুপ্রাভিট ২ গ্রাম/লিটার) অথবা বায়োফার্টিলাইজার স্প্রে করুন।',
        ],
      },
      prevention: {
        en: [
          'Cultivate BLB-resistant or tolerant rice varieties such as BRRI dhan 89, BRRI dhan 92, or Bangabandhu dhan 100.',
          'Treat seeds with hot water (52°C–54°C for 15 minutes) or approved bio-agents before sowing.',
          'Maintain balanced soil fertilization based on soil testing recommendations.',
        ],
        bn: [
          'রোগ প্রতিরোধী ব্রি জাত (যেমন ব্রি ধান ৮৯, ব্রি ধান ৯২, বঙ্গবন্ধু ধান ১০০) চাষ করুন।',
          'বীজ শোধন: গরম পানিতে (৫২°-৫৪° সেলসিয়াস) ১৫ মিনিট ভিজিয়ে রেখে বা ট্রাইকোডার্মা দিয়ে বীজ শোধন করুন।',
          'মাটি পরীক্ষা করে সুষম অনুপাতে সার ব্যবহার করুন।',
        ],
      },
    },
    sampleImages: [
      '/samples/bacterial_leaf_blight/sample_1.jpg',
      '/samples/bacterial_leaf_blight/sample_2.jpg',
    ],
    brriReference: 'BRRI Adhunik Dhaner Chash (23rd Ed.) - Chapter 12: Rice Pathology',
  },

  brown_spot: {
    id: 'brown_spot',
    name: {
      en: 'Brown Spot Disease',
      bn: 'ধানের বাদামী দাগ রোগ',
    },
    scientificName: 'Bipolaris oryzae (Cochliobolus miyabeanus)',
    type: 'fungal',
    badgeColor: 'bg-orange-100 text-orange-800 border-orange-300',
    severity: {
      en: 'Moderate to High (Seedling & Grain Impact)',
      bn: 'মাঝারি থেকে তীব্র (চারা ও ধানের চিটা বৃদ্ধি)',
    },
    shortDescription: {
      en: 'A widespread fungal disease commonly appearing in soils deficient in plant nutrients, producing round to oval brown spots with grey centers.',
      bn: 'মাটিতে পুষ্টির ঘাটতি থাকলে ব্যাপকভাবে দৃশ্যমান ছত্রাকজনিত রোগ, যা পাতায় তিলের মতো ছোট ছোট বাদামী ও ডিম্বাকৃতি দাগ সৃষ্টি করে।',
    },
    symptoms: {
      en: [
        'Small, circular to oval sesame seed-like brown spots across the leaf blade.',
        'Mature lesions have a light yellow, grey or whitish center encircled by a dark brown halo.',
        'Severe infections cause coalescing spots, leading to premature leaf blighting and death.',
        'Spotted and discolored grains (black or brown spotting on glumes), resulting in poor germination.',
      ],
      bn: [
        'পাতায় তিলের দানার মতো ছোট ছোট ডিম্বাকৃতি গাঢ় বাদামী দাগ দেখা যায়।',
        'দাগ বড় হলে মাঝখানের অংশ ধূসর বা সাদাটে হয়ে চারদিকে হলুদ আভা ফুটে ওঠে।',
        'অসংখ্য দাগ পরস্পর মিশে গিয়ে সম্পূর্ণ পাতা বাদামী হয়ে শুকিয়ে যেতে পারে।',
        'ধানের খোসায় কালো বা বাদামী ছোপ ছোপ দাগ পড়ে এবং ফলন চিটা হয়ে যায়।',
      ],
    },
    causes: {
      en: [
        'Nutrient-poor, sandy, or degraded soils lacking Potassium, Zinc, Manganese, or Nitrogen balance.',
        'Water stress, intermittent drought, or poor moisture retention in high-land plots.',
        'High humidity (>90%) with cloudy days and temperatures between 25°C-30°C.',
        'Use of infected uncertified seeds from previous seasons.',
      ],
      bn: [
        'বেলে বা পুষ্টিহীন মাটিতে পটাশ, দস্তা, বা বোরন এর তীব্র ঘাটতি।',
        'জমিতে পানির তীব্র অভাব বা খরা পরিস্থিতি সৃষ্টি হওয়া।',
        'উচ্চ আর্দ্রতা ও মেঘাচ্ছন্ন স্যাঁতসেঁতে আবহাওয়া।',
        'পূর্ববর্তী মৌসুমের আক্রান্ত বীজ শোধন ছাড়া ব্যবহার করা।',
      ],
    },
    management: {
      organic: {
        en: [
          'Incorporate ample well-decomposed organic manure or vermicompost into the soil bed.',
          'Soak seeds in 1% brine solution to separate light, infected floating seeds before sowing.',
          'Maintain adequate standing water (2-5 cm) to avoid soil water stress during tillering.',
        ],
        bn: [
          'জমিতে পর্যাপ্ত গোবর বা ট্রাইকো-কম্পোস্ট ও ভার্মিকম্পোস্ট প্রয়োগ করুন।',
          'লবণ পানিতে (১০০ গ্রাম লবণ প্রতি লিটারে) বীজ ভিজিয়ে ভাসমান রোগাক্রান্ত বীজ আলাদা করুন।',
          'কুশি অবস্থায় জমিতে পর্যাপ্ত রস বজায় রাখুন, যাতে খরা পরিস্থিতি না হয়।',
        ],
      },
      chemical: {
        en: [
          'Top-dress with Potash (MOP) and Zinc Sulfate (Mono-Zinc or Hepta-Zinc) as per BRRI recommendation.',
          'Foliar spray with Carbendazim (e.g. Autostin @ 2g/L) or Nativo 75 WG (0.6g/L) at first symptom appearance.',
          'Repeat foliar spray after 10-14 days if wet weather persists.',
        ],
        bn: [
          'মাটিতে দ্রুত পটাশ (এমওপি) ও জিংক সালফেট সার অনুমোদিত মাত্রায় প্রয়োগ করুন।',
          'লক্ষণ দেখার সাথে সাথে কার্বেনডাজিম (যেমন অটোস্টিন ২ গ্রাম/লিটার) বা নেটিভো ৭৫ ডব্লিউজি (০.৬ গ্রাম/লিটার) স্প্রে করুন।',
          'আবহাওয়া আর্দ্র থাকলে ১০-১২ দিন পর পুনরায় একবার স্প্রে করুন।',
        ],
      },
      prevention: {
        en: [
          'Seed treatment with Carbendazim or Provax-200 WP @ 2.5g per kg of dry paddy seed.',
          'Crop rotation with legumes or green manuring crops (Dhaincha) to restore soil fertility.',
          'Ensure certified disease-free seeds from BADC or reputable seed agencies.',
        ],
        bn: [
          'বীজ শোধন: প্রতি কেজি ধানের বীজে ২.৫ গ্রাম প্রোভ্যাক্স-২০০ বা অটোস্টিন মিশিয়ে শোধন করুন।',
          'সবুজ সার (ধইঞ্চা) চাষ করে মাটির জৈব পদার্থ ও পুষ্টি উপাদান বৃদ্ধি করুন।',
          'বিএডিসি বা অনুমোদিত ডিলারের প্রত্যয়িত সুস্থ বীজ ব্যবহার করুন।',
        ],
      },
    },
    sampleImages: [
      '/samples/brown_spot/sample_1.jpg',
      '/samples/brown_spot/sample_2.jpg',
    ],
    brriReference: 'BRRI Rice Doctor - Fungal Diseases of Paddy Rice',
  },

  tungro_virus: {
    id: 'tungro_virus',
    name: {
      en: 'Rice Tungro Virus Disease',
      bn: 'ধানের টুংরো ভাইরাস রোগ',
    },
    scientificName: 'Rice Tungro Bacilliform Virus (RTBV) & Spherical Virus (RTSV)',
    type: 'viral',
    badgeColor: 'bg-red-100 text-red-800 border-red-300',
    severity: {
      en: 'Very Severe (Complete Yield Loss possible if unchecked)',
      bn: 'চরম বিপজ্জনক (সময়মতো নিয়ন্ত্রণ না করলে ফসল ধ্বংসের শঙ্কা)',
    },
    shortDescription: {
      en: 'A viral complex transmitted by the Green Leafhopper (Nephotettix spp.) that causes severe stunting, yellow-orange leaves, and sterile grains.',
      bn: 'সবুজ পাতা ফড়িং বাহিত ভাইরাসজনিত মারণব্যাধি, যার ফলে ধান গাছ খর্বাকৃতি হয়, পাতা হলদে-কমলা রঙ ধারণ করে এবং কোনো ফলন হয় না।',
    },
    symptoms: {
      en: [
        'Characteristic bright yellow to vibrant orange discoloration starting from leaf tips and margins.',
        'Pronounced stunting of the plant with significantly reduced tiller count.',
        'Young emerged leaves are mottled, interveinal chlorotic, and smaller than normal.',
        'Delayed or partial panicle emergence with sterile, empty grains (chita).',
      ],
      bn: [
        'পাতার আগা থেকে শুরু হয়ে নিচের দিকে গাঢ় হলুদ বা কমলা রঙ ছড়িয়ে পড়ে।',
        'গাছ খর্বাকৃতি বা বেঁটে হয়ে যায় এবং কোনো নতুন কুশি গজায় না।',
        'নতুন পাতার শিরাগুলোর মাঝে হলদে ছোপ ছোপ ভাব দেখা যায়।',
        'শীষ দেরিতে বের হয় অথবা অসম্পূর্ণভাবে বের হয়ে সম্পূর্ণ চিটা হয়ে যায়।',
      ],
    },
    causes: {
      en: [
        'Presence and high population of insect vector Green Leafhopper (GLH).',
        'Staggered or out-of-season continuous rice planting providing a continuous vector host.',
        'Mild warm humid temperatures with gentle breeze aiding leafhopper flight.',
        'Presence of infected ratoon stubbles or wild grass weed hosts nearby.',
      ],
      bn: [
        'সবুজ পাতা ফড়িং (Green Leafhopper) এর ব্যাপক প্রাদুর্ভাব।',
        'এলাকায় অসময়ে বিক্ষিপ্তভাবে ধান চাষ করায় ফড়িং সারাবছর বেঁচে থাকে।',
        'পূর্ববর্তী মৌসুমের ফসলের গোড়া বা আইলের ঘাসে ভাইরাসের জীবাণু সুপ্ত থাকা।',
        'অনুকূল উষ্ণ ও আর্দ্র আবহাওয়া যা ফড়িং বংশবৃদ্ধিতে সাহায্য করে।',
      ],
    },
    management: {
      organic: {
        en: [
          'Uproot (rouge) and destroy visibly infected diseased clumps immediately and bury away from field.',
          'Install nighttime light traps (petromax / bulb with soapy water pan) to monitor and kill adult leafhoppers.',
          'Erect perches for insect-eating birds (T-perches) across the paddy field.',
        ],
        bn: [
          'আক্রান্ত গাছ দেখা মাত্রই গোড়াসহ তুলে মাটির নিচে পুঁতে বা পুড়িয়ে ধ্বংস করে ফেলুন।',
          'রাতে কেরোসিনের বাতি বা বাল্ব ও সাবান পানির ট্রাপ স্থাপন করে পাতা ফড়িং নিধন করুন।',
          'জমিতে বাঁশের কঞ্চি বা ডাল পুঁতে পাখি বসার ব্যবস্থা (পার্চিং) করুন।',
        ],
      },
      chemical: {
        en: [
          'Direct chemical spray against the Green Leafhopper vector rather than the virus itself.',
          'Spray approved insecticides: Imidacloprid (e.g. Admire 200 SL @ 0.5ml/L) or Mipcin 75 WP (2g/L).',
          'Ensure spraying targets the lower base of the tillers where leafhoppers shelter.',
        ],
        bn: [
          'ভাইরাসের সরাসরি ওষুধ নেই, তাই বাহক সবুজ পাতা ফড়িং দমনে অবিলম্বে কীটনাশক স্প্রে করুন।',
          'ইমিডাক্লোপ্রিড (যেমন এডমায়ার ০.৫ মিলি/লিটার) অথবা মিপসিন ৭৫ ডব্লিউপি (২ গ্রাম/লিটার) স্প্রে করুন।',
          'গাছের গোড়ার দিকে লক্ষ্য করে স্প্রে করতে হবে, যেখানে পাতা ফড়িং লুকিয়ে থাকে।',
        ],
      },
      prevention: {
        en: [
          'Cultivate Tungro-resistant paddy cultivars recommended by BRRI (e.g. BRRI dhan 48, BRRI dhan 71, BRRI dhan 84).',
          'Practice synchronous community planting within a 2-week window to break leafhopper life cycle.',
          'Keep field bunds (ail) clean of alternate host grasses and weeds.',
        ],
        bn: [
          'টুংরো প্রতিরোধী ব্রি জাত চাষ করুন (যেমন ব্রি ধান ৪৮, ব্রি ধান ৭১, ব্রি ধান ৮৪)।',
          'এলাকায় একই সময়ে সমলয়ে ধান চারা রোপণ করুন।',
          'আইল ও ড্রেন নিয়মিত ঘাস ও আগাছামুক্ত রাখুন যাতে ফড়িং আশ্রয় না পায়।',
        ],
      },
    },
    sampleImages: [
      '/samples/tungro_virus/sample_1.jpg',
      '/samples/tungro_virus/sample_2.jpg',
    ],
    brriReference: 'BRRI Factsheet on Vector-Borne Viral Diseases in Boro & Aman Rice',
  },

  healthy_leaf: {
    id: 'healthy_leaf',
    name: {
      en: 'Healthy Paddy Leaf',
      bn: 'সুস্থ ও রোগমুক্ত ধান পাতা',
    },
    scientificName: 'Oryza sativa (Optimal Phenotype)',
    type: 'healthy',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    severity: {
      en: 'None (Optimal Vigor & Maximum Yield Potential)',
      bn: 'নেই (সর্বোচ্চ বৃদ্ধি ও স্বাভাবিক ফলন সম্ভাবনা)',
    },
    shortDescription: {
      en: 'Vigorous, chlorophyll-rich rice leaf with normal photosynthetic development and complete absence of pathogenic lesions or vector damage.',
      bn: 'সবুজ ও সতেজ রোগমুক্ত ধান পাতা। ক্লোরোফিলের পূর্ণ বিকাশ ও কোনো প্রকার রোগ-জীবাণু বা পোকামাকড়ের আক্রমণের চিহ্ন নেই।',
    },
    symptoms: {
      en: [
        'Uniform emerald green coloration without chlorosis, spots, or streaks.',
        'Clean leaf surface with intact cuticle and natural waxy luster.',
        'Strong erect leaf architecture maximizing sunlight interception.',
        'Healthy tiller density with normal leaf sheath development.',
      ],
      bn: [
        'সম্পূর্ণ পাতায় সমান সবুজ রঙ, কোনো প্রকার দাগ, ফুটকি বা হলুদ রেখা নেই।',
        'পাতার ত্বক মসৃণ, পরিষ্কার ও সুস্থ মেসোফিল কলা বিদ্যমান।',
        'খাড়া পাতা কাঠামো যা সূর্যালোক শোষণে সবচেয়ে কার্যকর।',
        'স্বাভাবিক কুশি ও সুস্থ ডালপালা বৃদ্ধি।',
      ],
    },
    causes: {
      en: [
        'Good agronomic practices, balanced N-P-K-S-Zn fertilization.',
        'Clean certified seed source and timely weed control.',
        'Proper irrigation water depth (AWD - Alternate Wetting and Drying).',
        'Favorable ecological balance with beneficial predatory insects.',
      ],
      bn: [
        'সুষম সার প্রয়োগ ও সঠিক সময়ে আগাছা দমন।',
        'ভালো প্রত্যয়িত বীজ এবং সঠিক পানি ব্যবস্থাপনা (পর্যায়ক্রমে ভিজানো ও শুকানো - AWD পদ্ধতি)।',
        'উপকারী বন্ধু পোকামাকড়ের প্রাকৃতিক ভারসাম্য বজায় থাকা।',
      ],
    },
    management: {
      organic: {
        en: [
          'Maintain regular weekly field inspection (scouting).',
          'Continue applying organic vermicompost and neem oil repellent periodically.',
          'Conserve spider and ladybird beetle populations which feed on harmful pest nymphs.',
        ],
        bn: [
          'প্রতি সপ্তাহে অন্তত একবার নিয়মিত খেত পরিদর্শন (স্কাউটিং) চালিয়ে যান।',
          'প্রাকৃতিক বন্ধু পোকা (যেমন মাকড়সা, লেডিবার্ড বিটল) সংরক্ষণ করুন যা ক্ষতিকর পোকা খেয়ে ফেলে।',
          'পর্যায়ক্রমে নিম তেল মিশ্রণ স্প্রে করে রোগ বা পোকা প্রতিরোধ বজায় রাখুন।',
        ],
      },
      chemical: {
        en: [
          'No pesticide or chemical treatment needed! Avoid prophylactic sprays that kill beneficial insects.',
          'Apply the remaining split doses of Urea and Potash as planned during PI (Panicle Initiation).',
        ],
        bn: [
          'কোনো রাসায়নিক কীটনাশক বা ছত্রাকনাশক স্প্রে করার প্রয়োজন নেই!',
          'অপ্রয়োজনীয় বিষ স্প্রে করলে উপকারী বন্ধু পোকা মারা যায়।',
          'পরিকল্পনা অনুযায়ী থোড় আসার সময়ে অবশিষ্ট ইউরিয়া ও পটাশ উপরিপ্রয়োগ করুন।',
        ],
      },
      prevention: {
        en: [
          'Keep water level 2-4 cm during panicle formation; drain field 10 days before harvest.',
          'Monitor weather forecasts during heading stage for unseasonal rains or squalls.',
        ],
        bn: [
          'থোড় ও ফুল আসার সময়ে জমিতে ২-৪ সেমি পানি বজায় রাখুন; ধান কাটার ১০-১২ দিন আগে পানি বের করে দিন।',
          'আবহাওয়া পূর্বাভাসের প্রতি লক্ষ্য রাখুন।',
        ],
      },
    },
    sampleImages: [
      '/samples/healthy_leaf/sample_1.jpg',
      '/samples/healthy_leaf/sample_2.jpg',
    ],
    brriReference: 'BRRI Standard Production Manual for Inbred and Hybrid Rice',
  },
};
