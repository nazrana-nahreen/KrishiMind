export interface AgriOffice {
  id: string;
  name: {
    en: string;
    bn: string;
  };
  type: 'dae' | 'brri' | 'badc' | 'seba_kendro';
  typeLabel: {
    en: string;
    bn: string;
  };
  division: string;
  district: string;
  upazila: string;
  address: {
    en: string;
    bn: string;
  };
  lat: number;
  lng: number;
  phone: string;
  email?: string;
  officerInCharge: {
    en: string;
    bn: string;
  };
  services: {
    en: string[];
    bn: string[];
  };
  timing: {
    en: string;
    bn: string;
  };
}

export interface DivisionDistrictData {
  division: string;
  divisionBn: string;
  districts: {
    name: string;
    nameBn: string;
    lat: number;
    lng: number;
    upazilas: string[];
  }[];
}

export const DIVISIONS_DATA: DivisionDistrictData[] = [
  {
    division: 'Dhaka',
    divisionBn: 'ঢাকা',
    districts: [
      {
        name: 'Dhaka',
        nameBn: 'ঢাকা',
        lat: 23.8103,
        lng: 90.4125,
        upazilas: ['Savar', 'Dhamrai', 'Keraniganj', 'Nawabganj', 'Dohar'],
      },
      {
        name: 'Gazipur',
        nameBn: 'গাজীপুর',
        lat: 23.9999,
        lng: 90.4203,
        upazilas: ['Gazipur Sadar', 'Kapasia', 'Kaliakair', 'Kaliganj', 'Sreepur'],
      },
      {
        name: 'Narayanganj',
        nameBn: 'নারায়ণগঞ্জ',
        lat: 23.6238,
        lng: 90.5000,
        upazilas: ['Narayanganj Sadar', 'Araihazar', 'Bandar', 'Rupganj', 'Sonargaon'],
      },
      {
        name: 'Tangail',
        nameBn: 'টাঙ্গাইল',
        lat: 24.2513,
        lng: 89.9167,
        upazilas: ['Tangail Sadar', 'Mirzapur', 'Gopalpur', 'Madhupur', 'Ghatail'],
      },
      {
        name: 'Manikganj',
        nameBn: 'মানিকগঞ্জ',
        lat: 23.8617,
        lng: 90.0003,
        upazilas: ['Manikganj Sadar', 'Singair', 'Saturia', 'Ghior', 'Shivalaya'],
      },
      {
        name: 'Narsingdi',
        nameBn: 'নরসিংদী',
        lat: 23.9322,
        lng: 90.7154,
        upazilas: ['Narsingdi Sadar', 'Palash', 'Shibpur', 'Belabo', 'Raipura', 'Monohardi'],
      },
    ],
  },
  {
    division: 'Mymensingh',
    divisionBn: 'ময়মনসিংহ',
    districts: [
      {
        name: 'Mymensingh',
        nameBn: 'ময়মনসিংহ',
        lat: 24.7471,
        lng: 90.4203,
        upazilas: ['Mymensingh Sadar', 'Muktagachha', 'Trishal', 'Fulbaria', 'Gafargaon', 'Bhaluka', 'Ishwarganj'],
      },
      {
        name: 'Jamalpur',
        nameBn: 'জামালপুর',
        lat: 24.9375,
        lng: 89.9378,
        upazilas: ['Jamalpur Sadar', 'Sarishabari', 'Melandaha', 'Islampur', 'Dewanganj'],
      },
      {
        name: 'Sherpur',
        nameBn: 'শেরপুর',
        lat: 25.0205,
        lng: 90.0153,
        upazilas: ['Sherpur Sadar', 'Nakla', 'Nalitabari', 'Jhenaigati', 'Sreebardi'],
      },
      {
        name: 'Netrokona',
        nameBn: 'নেত্রকোণা',
        lat: 24.8709,
        lng: 90.7279,
        upazilas: ['Netrokona Sadar', 'Barhatta', 'Kendua', 'Atpara', 'Madan', 'Mohanganj'],
      },
    ],
  },
  {
    division: 'Rajshahi',
    divisionBn: 'রাজশাহী',
    districts: [
      {
        name: 'Rajshahi',
        nameBn: 'রাজশাহী',
        lat: 24.3745,
        lng: 88.6042,
        upazilas: ['Paba', 'Godagari', 'Tanore', 'Mohanpur', 'Bagmara', 'Durgapur', 'Puthia', 'Charghat', 'Bagha'],
      },
      {
        name: 'Bogura',
        nameBn: 'বগুড়া',
        lat: 24.8465,
        lng: 89.3777,
        upazilas: ['Bogura Sadar', 'Shibganj', 'Sherpur', 'Gabtali', 'Kahaloo', 'Dhunat', 'Sariakandi'],
      },
      {
        name: 'Pabna',
        nameBn: 'পাবনা',
        lat: 24.0116,
        lng: 89.2443,
        upazilas: ['Pabna Sadar', 'Ishwardi', 'Atgharia', 'Bera', 'Bhangura', 'Chatmohar', 'Santhia', 'Sujanagar'],
      },
      {
        name: 'Naogaon',
        nameBn: 'নওগাঁ',
        lat: 24.8103,
        lng: 88.9419,
        upazilas: ['Naogaon Sadar', 'Mohadevpur', 'Patnitala', 'Dhamoirhat', 'Manda', 'Badalgachhi'],
      },
    ],
  },
  {
    division: 'Rangpur',
    divisionBn: 'রংপুর',
    districts: [
      {
        name: 'Rangpur',
        nameBn: 'রংপুর',
        lat: 25.7439,
        lng: 89.2752,
        upazilas: ['Rangpur Sadar', 'Mithapukur', 'Pirganj', 'Badarganj', 'Gangachara', 'Kaunia', 'Taraganj'],
      },
      {
        name: 'Dinajpur',
        nameBn: 'দিনাজপুর',
        lat: 25.6217,
        lng: 88.6355,
        upazilas: ['Dinajpur Sadar', 'Birganj', 'Kaharole', 'Birol', 'Bochaganj', 'Phulbari', 'Parbatipur'],
      },
      {
        name: 'Kurigram',
        nameBn: 'কুড়িগ্রাম',
        lat: 25.8054,
        lng: 89.6362,
        upazilas: ['Kurigram Sadar', 'Nageshwari', 'Bhurungamari', 'Phulbari', 'Rajarhat', 'Ulipur', 'Chilmari'],
      },
    ],
  },
  {
    division: 'Chittagong',
    divisionBn: 'চট্টগ্রাম',
    districts: [
      {
        name: 'Chittagong',
        nameBn: 'চট্টগ্রাম',
        lat: 22.3569,
        lng: 91.7832,
        upazilas: ['Hathazari', 'Fatikchhari', 'Raozan', 'Rangunia', 'Patiya', 'Boalkhali', 'Anwara', 'Chandanaish', 'Mirsharai', 'Sitakunda'],
      },
      {
        name: 'Cumilla',
        nameBn: 'কুমিল্লা',
        lat: 23.4607,
        lng: 91.1809,
        upazilas: ['Cumilla Adarsha Sadar', 'Debidwar', 'Homna', 'Daudkandi', 'Chauddagram', 'Brahmanpara', 'Burichang', 'Chandina', 'Muradnagar'],
      },
      {
        name: 'Brahmanbaria',
        nameBn: 'ব্রাহ্মণবাড়িয়া',
        lat: 23.9571,
        lng: 91.1119,
        upazilas: ['Brahmanbaria Sadar', 'Kasba', 'Nasirnagar', 'Nabinagar', 'Bancharampur', 'Sarail', 'Ashuganj', 'Akhaura'],
      },
    ],
  },
  {
    division: 'Khulna',
    divisionBn: 'খুলনা',
    districts: [
      {
        name: 'Khulna',
        nameBn: 'খুলনা',
        lat: 22.8456,
        lng: 89.5403,
        upazilas: ['Rupsha', 'Batiaghata', 'Dumuria', 'Dighalia', 'Phultala', 'Terokhada', 'Paikgachha', 'Dacope', 'Koyra'],
      },
      {
        name: 'Jashore',
        nameBn: 'যশোর',
        lat: 23.1664,
        lng: 89.2182,
        upazilas: ['Jashore Sadar', 'Jhikargachha', 'Chaugachha', 'Manirampur', 'Keshabpur', 'Bagherpara', 'Abhaynagar', 'Sharsha'],
      },
      {
        name: 'Kushtia',
        nameBn: 'কুষ্টিয়া',
        lat: 23.9013,
        lng: 89.1205,
        upazilas: ['Kushtia Sadar', 'Kumarkhali', 'Khoksa', 'Mirpur', 'Bheramara', 'Daulatpur'],
      },
      {
        name: 'Satkhira',
        nameBn: 'সাতক্ষীরা',
        lat: 22.7185,
        lng: 89.0705,
        upazilas: ['Satkhira Sadar', 'Assasuni', 'Debhata', 'Kalaroa', 'Kaliganj', 'Shyamnagar', 'Tala'],
      },
    ],
  },
  {
    division: 'Barishal',
    divisionBn: 'বরিশাল',
    districts: [
      {
        name: 'Barishal',
        nameBn: 'বরিশাল',
        lat: 22.7010,
        lng: 90.3535,
        upazilas: ['Barishal Sadar', 'Bakerganj', 'Babuganj', 'Wazirpur', 'Banaripara', 'Gournadi', 'Agailjhara', 'Mehendiganj', 'Muladi', 'Hizla'],
      },
      {
        name: 'Bhola',
        nameBn: 'ভোলা',
        lat: 22.6859,
        lng: 90.6481,
        upazilas: ['Bhola Sadar', 'Daulatkhan', 'Burhanuddin', 'Tazumuddin', 'Lalmohan', 'Char Fasson', 'Monpura'],
      },
      {
        name: 'Patuakhali',
        nameBn: 'পটুয়াখালী',
        lat: 22.3596,
        lng: 90.3299,
        upazilas: ['Patuakhali Sadar', 'Bauphal', 'Galachipa', 'Dashmina', 'Kalapara', 'Mirzaganj', 'Dumki', 'Rangabali'],
      },
    ],
  },
  {
    division: 'Sylhet',
    divisionBn: 'সিলেট',
    districts: [
      {
        name: 'Sylhet',
        nameBn: 'সিলেট',
        lat: 24.8949,
        lng: 91.8687,
        upazilas: ['Sylhet Sadar', 'Beanibazar', 'Golapganj', 'Companiganj', 'Fenchuganj', 'Bishwanath', 'Gowainghat', 'Jaintiapur', 'Kanaighat', 'Zakiganj'],
      },
      {
        name: 'Habiganj',
        nameBn: 'হবিগঞ্জ',
        lat: 24.3750,
        lng: 91.4167,
        upazilas: ['Habiganj Sadar', 'Nabiganj', 'Bahubal', 'Madhabpur', 'Chunarughat', 'Lakhai', 'Baniachang', 'Ajmiriganj'],
      },
      {
        name: 'Sunamganj',
        nameBn: 'সুনামগঞ্জ',
        lat: 25.0658,
        lng: 91.3950,
        upazilas: ['Sunamganj Sadar', 'Chhatak', 'Jagannathpur', 'Derai', 'Dharampasha', 'Tahirpur', 'Jamalganj', 'Shalla'],
      },
    ],
  },
];

export const AGRI_OFFICES: AgriOffice[] = [
  // BRRI Headquarters & Major Regional Research Stations
  {
    id: 'brri_hq_gazipur',
    name: {
      en: 'BRRI Central Headquarters & Rice Pathology Lab',
      bn: 'বাংলাদেশ ধান গবেষণা ইনস্টিটিউট (ব্রি) প্রধান কার্যালয় ও রোগতত্ত্ব ল্যাব',
    },
    type: 'brri',
    typeLabel: {
      en: 'BRRI Research Station',
      bn: 'ব্রি গবেষণা কেন্দ্র',
    },
    division: 'Dhaka',
    district: 'Gazipur',
    upazila: 'Gazipur Sadar',
    address: {
      en: 'BRRI Campus, Joydebpur, Gazipur-1701',
      bn: 'ব্রি ক্যাম্পাস, জয়দেবপুর, গাজীপুর-১৭০১',
    },
    lat: 23.9912,
    lng: 90.4120,
    phone: '02-49272005',
    email: 'dg@brri.gov.bd',
    officerInCharge: {
      en: 'Director General & Chief Plant Pathologist',
      bn: 'মহাপরিচালক ও প্রধান উদ্ভিদ রোগতত্ত্ববিদ',
    },
    services: {
      en: [
        'Advanced Rice Leaf Disease Lab Diagnostics',
        'Breeder & Foundation Paddy Seed Distribution',
        'Direct Agronomic Consultation with Rice Scientists',
        'Soil Fertility & Nutrient Testing',
      ],
      bn: [
        'উন্নত ধানের রোগ ল্যাব পরীক্ষা ও নমুনা বিশ্লেষণ',
        'প্রজননবিদ ও ভিত্তি ধান বীজ সরবরাহ',
        'ধান বিজ্ঞানীদের সাথে সরাসরি পরামর্শ',
        'মাটির পুষ্টি ও উর্বরতা পরীক্ষা',
      ],
    },
    timing: {
      en: 'Sunday - Thursday: 9:00 AM - 5:00 PM',
      bn: 'রবিবার - বৃহস্পতিবার: সকাল ৯:০০ - বিকাল ৫:০০',
    },
  },
  {
    id: 'brri_rajshahi',
    name: {
      en: 'BRRI Regional Station Rajshahi',
      bn: 'ব্রি আঞ্চলিক কার্যালয়, রাজশাহী (বরেন্দ্র অঞ্চল)',
    },
    type: 'brri',
    typeLabel: {
      en: 'BRRI Regional Station',
      bn: 'ব্রি আঞ্চলিক কেন্দ্র',
    },
    division: 'Rajshahi',
    district: 'Rajshahi',
    upazila: 'Paba',
    address: {
      en: 'Shyampur, Paba, Rajshahi',
      bn: 'শ্যামপুর, পবা, রাজশাহী',
    },
    lat: 24.3850,
    lng: 88.6320,
    phone: '0721-761234',
    officerInCharge: {
      en: 'Chief Scientific Officer (CSO)',
      bn: 'মুখ্য বৈজ্ঞানিক কর্মকর্তা',
    },
    services: {
      en: [
        'Drought-tolerant rice cultivars advice (BRRI dhan 56, 71)',
        'Leaf disease & blast diagnosis for Barind tract',
        'Free farmer training sessions',
      ],
      bn: [
        'খরা সহনশীল ব্রি জাতের বীজ ও পরামর্শ (ব্রি ধান ৫৬, ৭১)',
        'বরেন্দ্র অঞ্চলের পাতা পোড়া ও ব্লাস্ট রোগ নির্ণয়',
        'কৃষকদের নিয়মিত প্রশিক্ষণ',
      ],
    },
    timing: {
      en: 'Sunday - Thursday: 9:00 AM - 5:00 PM',
      bn: 'রবিবার - বৃহস্পতিবার: সকাল ৯:০০ - বিকাল ৫:০০',
    },
  },
  {
    id: 'brri_rangpur',
    name: {
      en: 'BRRI Regional Station Rangpur',
      bn: 'ব্রি আঞ্চলিক কার্যালয়, রংপুর',
    },
    type: 'brri',
    typeLabel: {
      en: 'BRRI Regional Station',
      bn: 'ব্রি আঞ্চলিক কেন্দ্র',
    },
    division: 'Rangpur',
    district: 'Rangpur',
    upazila: 'Rangpur Sadar',
    address: {
      en: 'Dhap, Rangpur Sadar',
      bn: 'ধাপ, রংপুর সদর',
    },
    lat: 25.7520,
    lng: 89.2530,
    phone: '0521-63456',
    officerInCharge: {
      en: 'Principal Scientific Officer',
      bn: 'প্রধান বৈজ্ঞানিক কর্মকর্তা',
    },
    services: {
      en: [
        'Cold-tolerant rice pathology guidance (Boro season)',
        'Brown spot & blast disease diagnosis',
        'High quality paddy seed source',
      ],
      bn: [
        'ঠাণ্ডা সহনশীল বোরো ধানের রোগ ব্যবস্থাপনা',
        'বাদামী দাগ ও ব্লাস্ট রোগ পরীক্ষা',
        'উন্নত মানের ধান বীজ সরবরাহ',
      ],
    },
    timing: {
      en: 'Sunday - Thursday: 9:00 AM - 5:00 PM',
      bn: 'রবিবার - বৃহস্পতিবার: সকাল ৯:০০ - বিকাল ৫:০০',
    },
  },
  {
    id: 'brri_habiganj',
    name: {
      en: 'BRRI Regional Station Habiganj (Deepwater & Haor Rice)',
      bn: 'ব্রি আঞ্চলিক কার্যালয়, হবিগঞ্জ (হাওর ও গভীর পানির ধান)',
    },
    type: 'brri',
    typeLabel: {
      en: 'BRRI Regional Station',
      bn: 'ব্রি আঞ্চলিক কেন্দ্র',
    },
    division: 'Sylhet',
    district: 'Habiganj',
    upazila: 'Habiganj Sadar',
    address: {
      en: 'BRRI Habiganj, Shayestanagar',
      bn: 'ব্রি হবিগঞ্জ, শায়েস্তানগর',
    },
    lat: 24.3820,
    lng: 91.4110,
    phone: '0831-52310',
    officerInCharge: {
      en: 'Senior Rice Pathologist',
      bn: 'উর্ধ্বতন উদ্ভিদ রোগতত্ত্ববিদ',
    },
    services: {
      en: [
        'Haor flash-flood flash rice protection',
        'Bacterial Leaf Blight & stem borer controls for haor',
        'Early maturing Boro varieties advice',
      ],
      bn: [
        'হাওরের আগাম বন্যা ও ধানের রোগ সুরক্ষা',
        'হাওর এলাকার পাতা পোড়া ও মাজরা পোকা দমন',
        'স্বল্পমেয়াদী আগাম বোরো জাতের পরামর্শ',
      ],
    },
    timing: {
      en: 'Sunday - Thursday: 9:00 AM - 5:00 PM',
      bn: 'রবিবার - বৃহস্পতিবার: সকাল ৯:০০ - বিকাল ৫:০০',
    },
  },
  {
    id: 'brri_cumilla',
    name: {
      en: 'BRRI Regional Station Cumilla',
      bn: 'ব্রি আঞ্চলিক কার্যালয়, কুমিল্লা',
    },
    type: 'brri',
    typeLabel: {
      en: 'BRRI Regional Station',
      bn: 'ব্রি আঞ্চলিক কেন্দ্র',
    },
    division: 'Chittagong',
    district: 'Cumilla',
    upazila: 'Cumilla Adarsha Sadar',
    address: {
      en: 'Kotbari Road, Cumilla',
      bn: 'কোটবাড়ী রোড, কুমিল্লা',
    },
    lat: 23.4420,
    lng: 91.1510,
    phone: '081-65432',
    officerInCharge: {
      en: 'Chief Scientific Officer',
      bn: 'মুখ্য বৈজ্ঞানিক কর্মকর্তা',
    },
    services: {
      en: [
        'Tungro virus vector surveillance & control',
        'Aman & Aus paddy crop management',
        'Demonstration plots & diagnostic clinic',
      ],
      bn: [
        'টুংরো ভাইরাস ও সবুজ পাতা ফড়িং পর্যবেক্ষণ ও দমন',
        'আমন ও আউশ ধানের সমন্বিত রোগ ব্যবস্থাপনা',
        'মাঠ পর্যায়ের কৃষক রোগ নির্ণয় ক্লিনিক',
      ],
    },
    timing: {
      en: 'Sunday - Thursday: 9:00 AM - 5:00 PM',
      bn: 'রবিবার - বৃহস্পতিবার: সকাল ৯:০০ - বিকাল ৫:০০',
    },
  },
  {
    id: 'brri_barishal',
    name: {
      en: 'BRRI Regional Station Barishal',
      bn: 'ব্রি আঞ্চলিক কার্যালয়, বরিশাল',
    },
    type: 'brri',
    typeLabel: {
      en: 'BRRI Regional Station',
      bn: 'ব্রি আঞ্চলিক কেন্দ্র',
    },
    division: 'Barishal',
    district: 'Barishal',
    upazila: 'Babuganj',
    address: {
      en: 'Rahmatpur, Babuganj, Barishal',
      bn: 'রহমতপুর, বাবুগঞ্জ, বরিশাল',
    },
    lat: 22.7830,
    lng: 90.3120,
    phone: '0431-71234',
    officerInCharge: {
      en: 'Principal Plant Breeder',
      bn: 'প্রধান উদ্ভিদ প্রজননবিদ',
    },
    services: {
      en: [
        'Tidal flood & submergence tolerant cultivars',
        'Coastal salinity & disease management',
        'Farmer advisory cell',
      ],
      bn: [
        'জোয়ার-ভাটা ও নিমজ্জিত সহনশীল ধানের প্রযুক্তি',
        'উপকূলীয় লবণাক্ততা ও রোগ ব্যবস্থাপনা',
        'কৃষক পরামর্শ সেবা সেল',
      ],
    },
    timing: {
      en: 'Sunday - Thursday: 9:00 AM - 5:00 PM',
      bn: 'রবিবার - বৃহস্পতিবার: সকাল ৯:০০ - বিকাল ৫:০০',
    },
  },
  {
    id: 'brri_satkhira',
    name: {
      en: 'BRRI Regional Station Satkhira (Salinity Zone)',
      bn: 'ব্রি আঞ্চলিক কার্যালয়, সাতক্ষীরা (লবণাক্ততা অঞ্চল)',
    },
    type: 'brri',
    typeLabel: {
      en: 'BRRI Regional Station',
      bn: 'ব্রি আঞ্চলিক কেন্দ্র',
    },
    division: 'Khulna',
    district: 'Satkhira',
    upazila: 'Satkhira Sadar',
    address: {
      en: 'Alipur, Satkhira Sadar',
      bn: 'আলীপুর, সাতক্ষীরা সদর',
    },
    lat: 22.7240,
    lng: 89.0830,
    phone: '0471-63890',
    officerInCharge: {
      en: 'Senior Agronomist',
      bn: 'উর্ধ্বতন কৃষিবিদ',
    },
    services: {
      en: [
        'Saline-tolerant varieties (BRRI dhan 67, 97, 99)',
        'Saline water leaf scorch vs bacterial blight diagnosis',
        'Soil EC measurement & fertilizer guidance',
      ],
      bn: [
        'লবণাক্ততা সহনশীল জাত (ব্রি ধান ৬৭, ৯৭, ৯৯)',
        'লবণাক্ততার কারণে পাতা পোড়া বনাম রোগ সনাক্তকরণ',
        'মাটির লবণাক্ততা পরীক্ষা ও সার পরামর্শ',
      ],
    },
    timing: {
      en: 'Sunday - Thursday: 9:00 AM - 5:00 PM',
      bn: 'রবিবার - বৃহস্পতিবার: সকাল ৯:০০ - বিকাল ৫:০০',
    },
  },

  // DAE Upazila Agriculture Offices (Department of Agricultural Extension)
  {
    id: 'dae_savar',
    name: {
      en: 'Upazila Agriculture Office, Savar (DAE)',
      bn: 'উপজেলা কৃষি অফিস, সাভার (কৃষি সম্প্রসারণ অধিদপ্তর)',
    },
    type: 'dae',
    typeLabel: {
      en: 'Upazila Krishi Office (DAE)',
      bn: 'উপজেলা কৃষি অফিস (ডিএই)',
    },
    division: 'Dhaka',
    district: 'Dhaka',
    upazila: 'Savar',
    address: {
      en: 'Upazila Parishad Complex, Savar, Dhaka',
      bn: 'উপজেলা পরিষদ চত্বর, সাভার, ঢাকা',
    },
    lat: 23.8447,
    lng: 90.2588,
    phone: '01712-345678',
    officerInCharge: {
      en: 'Upazila Agriculture Officer (UAO)',
      bn: 'উপজেলা কৃষি কর্মকর্তা (ইউএও)',
    },
    services: {
      en: [
        'Free Crop Clinic for leaf disease examination',
        'Sub-Assistant Agriculture Officer (SAAO) field visits',
        'Government subsidized fertilizer vouchers',
        'Free certified seeds distribution during seasons',
      ],
      bn: [
        'বিনামূল্যে ফসল ক্লিনিকে ধান পাতা পরীক্ষা',
        'উপসহকারী কৃষি কর্মকর্তা (এসএএও)-এর মাঠ পরিদর্শন',
        'সরকারি প্রণোদনা ও ভর্তুকির সার ও বীজ বিতরণ',
        'আধুনিক বালাইনাশক প্রয়োগের সঠিক পরামর্শ',
      ],
    },
    timing: {
      en: 'Sunday - Thursday: 9:00 AM - 5:00 PM',
      bn: 'রবিবার - বৃহস্পতিবার: সকাল ৯:০০ - বিকাল ৫:০০',
    },
  },
  {
    id: 'dae_gazipur_sadar',
    name: {
      en: 'Upazila Agriculture Office, Gazipur Sadar',
      bn: 'উপজেলা কৃষি অফিস, গাজীপুর সদর',
    },
    type: 'dae',
    typeLabel: {
      en: 'Upazila Krishi Office (DAE)',
      bn: 'উপজেলা কৃষি অফিস (ডিএই)',
    },
    division: 'Dhaka',
    district: 'Gazipur',
    upazila: 'Gazipur Sadar',
    address: {
      en: 'Upazila Parishad Bhaban, Rajbari Road, Gazipur',
      bn: 'উপজেলা পরিষদ ভবন, রাজবাড়ী রোড, গাজীপুর',
    },
    lat: 24.0022,
    lng: 90.4255,
    phone: '01715-456789',
    officerInCharge: {
      en: 'Upazila Agriculture Officer',
      bn: 'উপজেলা কৃষি কর্মকর্তা',
    },
    services: {
      en: [
        'Rice disease scouting & pest forecast',
        'Light trap campaign coordination',
        'Farmers training on balanced urea & AWD',
      ],
      bn: [
        'ধানের রোগ পর্যবেক্ষণ ও বালাই পূর্বাভাস',
        'আলোক ফাঁদ তৈরি ও পোকা দমন কর্মসূচি',
        'সুষম সার ও এডব্লিউডি সেচ প্রশিক্ষণ',
      ],
    },
    timing: {
      en: 'Sunday - Thursday: 9:00 AM - 5:00 PM',
      bn: 'রবিবার - বৃহস্পতিবার: সকাল ৯:০০ - বিকাল ৫:০০',
    },
  },
  {
    id: 'dae_mymensingh_sadar',
    name: {
      en: 'Upazila Agriculture Office, Mymensingh Sadar',
      bn: 'উপজেলা কৃষি অফিস, ময়মনসিংহ সদর',
    },
    type: 'dae',
    typeLabel: {
      en: 'Upazila Krishi Office (DAE)',
      bn: 'উপজেলা কৃষি অফিস (ডিএই)',
    },
    division: 'Mymensingh',
    district: 'Mymensingh',
    upazila: 'Mymensingh Sadar',
    address: {
      en: 'Kachijhuli, Mymensingh Sadar',
      bn: 'কাঁচিঝুলি, ময়মনসিংহ সদর',
    },
    lat: 24.7562,
    lng: 90.4065,
    phone: '01716-567890',
    officerInCharge: {
      en: 'Upazila Agriculture Officer',
      bn: 'উপজেলা কৃষি কর্মকর্তা',
    },
    services: {
      en: [
        'Boro & Aman rice disease clinic',
        'Seed treatment demonstrations with Fungicide',
        'Government subsidy smart farmer card service',
      ],
      bn: [
        'বোরো ও আমন ধানের রোগ নির্ণয় ক্লিনিক',
        'ছত্রাকনাশক দিয়ে বীজ শোধন প্রদর্শনী',
        'কৃষক কার্ড ও সরকারি সেবা সহায়তা',
      ],
    },
    timing: {
      en: 'Sunday - Thursday: 9:00 AM - 5:00 PM',
      bn: 'রবিবার - বৃহস্পতিবার: সকাল ৯:০০ - বিকাল ৫:০০',
    },
  },
  {
    id: 'dae_bogura_sadar',
    name: {
      en: 'Upazila Agriculture Office, Bogura Sadar',
      bn: 'উপজেলা কৃষি অফিস, বগুড়া সদর',
    },
    type: 'dae',
    typeLabel: {
      en: 'Upazila Krishi Office (DAE)',
      bn: 'উপজেলা কৃষি অফিস (ডিএই)',
    },
    division: 'Rajshahi',
    district: 'Bogura',
    upazila: 'Bogura Sadar',
    address: {
      en: 'Sherpur Road, Bogura',
      bn: 'শেরপুর রোড, বগুড়া',
    },
    lat: 24.8512,
    lng: 89.3698,
    phone: '01718-789012',
    officerInCharge: {
      en: 'Upazila Agriculture Officer',
      bn: 'উপজেলা কৃষি কর্মকর্তা',
    },
    services: {
      en: [
        'Brown spot & bacterial blight specialist assistance',
        'Zinc & Potash fertilizer recommendation',
        'Block SAAO emergency response cell',
      ],
      bn: [
        'বাদামী দাগ ও পাতা পোড়া রোগের বিশেষজ্ঞ সমাধান',
        'মাটিতে জিংক ও পটাশ সারের মাত্রা নির্ধারণ',
        'ব্লক উপসহকারী কৃষি কর্মকর্তার মাঠ সহায়তা',
      ],
    },
    timing: {
      en: 'Sunday - Thursday: 9:00 AM - 5:00 PM',
      bn: 'রবিবার - বৃহস্পতিবার: সকাল ৯:০০ - বিকাল ৫:০০',
    },
  },
  {
    id: 'dae_dinajpur_sadar',
    name: {
      en: 'Upazila Agriculture Office, Dinajpur Sadar',
      bn: 'উপজেলা কৃষি অফিস, দিনাজপুর সদর',
    },
    type: 'dae',
    typeLabel: {
      en: 'Upazila Krishi Office (DAE)',
      bn: 'উপজেলা কৃষি অফিস (ডিএই)',
    },
    division: 'Rangpur',
    district: 'Dinajpur',
    upazila: 'Dinajpur Sadar',
    address: {
      en: 'Court Station Road, Dinajpur',
      bn: 'কোর্ট স্টেশন রোড, দিনাজপুর',
    },
    lat: 25.6275,
    lng: 88.6402,
    phone: '01719-890123',
    officerInCharge: {
      en: 'Upazila Agriculture Officer',
      bn: 'উপজেলা কৃষি কর্মকর্তা',
    },
    services: {
      en: [
        'Aromatic rice (Katari Bhog) disease prevention',
        'Neck blast & sheath blight management',
        'Soil health card distribution',
      ],
      bn: [
        'সুগন্ধি ধান (কাটারিভোগ) এর রোগ দমন পরামর্শ',
        'নেক ব্লাস্ট ও খোল পোড়া রোগের তাৎক্ষণিক প্রতিকার',
        'মাটি স্বাস্থ্য কার্ড সেবা',
      ],
    },
    timing: {
      en: 'Sunday - Thursday: 9:00 AM - 5:00 PM',
      bn: 'রবিবার - বৃহস্পতিবার: সকাল ৯:০০ - বিকাল ৫:০০',
    },
  },
  {
    id: 'dae_jashore_sadar',
    name: {
      en: 'Upazila Agriculture Office, Jashore Sadar',
      bn: 'উপজেলা কৃষি অফিস, যশোর সদর',
    },
    type: 'dae',
    typeLabel: {
      en: 'Upazila Krishi Office (DAE)',
      bn: 'উপজেলা কৃষি অফিস (ডিএই)',
    },
    division: 'Khulna',
    district: 'Jashore',
    upazila: 'Jashore Sadar',
    address: {
      en: 'Daratana, Jashore Sadar',
      bn: 'দড়াটানা, যশোর সদর',
    },
    lat: 23.1685,
    lng: 90.2155,
    phone: '01721-012345',
    officerInCharge: {
      en: 'Upazila Agriculture Officer',
      bn: 'উপজেলা কৃষি কর্মকর্তা',
    },
    services: {
      en: [
        'Integrated Pest Management (IPM) guidance',
        'Pheromone trap & biological predator conservation',
        'Rice Tungro vector eradication protocol',
      ],
      bn: [
        'সমন্বিত বালাই দমন (আইপিএম) পরামর্শ',
        'আলোক ফাঁদ ও বন্ধু পোকা সংরক্ষণ কর্মসূচি',
        'টুংরো ভাইরাসের বাহক পোকা নিধন ক্যাম্পেইন',
      ],
    },
    timing: {
      en: 'Sunday - Thursday: 9:00 AM - 5:00 PM',
      bn: 'রবিবার - বৃহস্পতিবার: সকাল ৯:০০ - বিকাল ৫:০০',
    },
  },

  // BADC Seed & Fertilizer Sales Centers (Bangladesh Agricultural Development Corporation)
  {
    id: 'badc_seed_dhaka',
    name: {
      en: 'BADC Central Paddy Seed Sales Center, Gabtoli',
      bn: 'বিএডিসি প্রধান ধান বীজ ও সার বিক্রয় কেন্দ্র, গাবতলী',
    },
    type: 'badc',
    typeLabel: {
      en: 'BADC Seed Center',
      bn: 'বিএডিসি বীজ কেন্দ্র',
    },
    division: 'Dhaka',
    district: 'Dhaka',
    upazila: 'Savar',
    address: {
      en: 'BADC Seed Bhaban, Gabtoli, Mirpur, Dhaka',
      bn: 'বিএডিসি বীজ ভবন, গাবতলী, মিরপুর, ঢাকা',
    },
    lat: 23.7845,
    lng: 90.3450,
    phone: '02-9002345',
    officerInCharge: {
      en: 'Deputy Director (Seed Marketing)',
      bn: 'উপ-পরিচালক (বীজ বিপণন)',
    },
    services: {
      en: [
        'Government Certified BRRI Paddy Seeds (BRRI 28, 29, 89, 92)',
        'Pre-treated disease-free seeds',
        'Fertilizer supply assistance',
      ],
      bn: [
        'সরকারি প্রত্যয়িত ব্রি ধান বীজ বিক্রয় (ব্রি ২৮, ২৯, ৮৯, ৯২)',
        'রোগমুক্ত ও শোধিত ধান বীজ',
        'অনুমোদিত সার বিপণন সহায়তা',
      ],
    },
    timing: {
      en: 'Sunday - Thursday: 9:30 AM - 4:30 PM',
      bn: 'রবিবার - বৃহস্পতিবার: সকাল ৯:৩০ - বিকাল ৪:৩০',
    },
  },
  {
    id: 'badc_seed_rajshahi',
    name: {
      en: 'BADC Seed Processing & Sales Center, Rajshahi',
      bn: 'বিএডিসি বীজ প্রক্রিয়াজাতকরণ ও বিপণন কেন্দ্র, রাজশাহী',
    },
    type: 'badc',
    typeLabel: {
      en: 'BADC Seed Center',
      bn: 'বিএডিসি বীজ কেন্দ্র',
    },
    division: 'Rajshahi',
    district: 'Rajshahi',
    upazila: 'Paba',
    address: {
      en: 'Station Road, Rajshahi',
      bn: 'স্টেশন রোড, রাজশাহী',
    },
    lat: 24.3720,
    lng: 88.6015,
    phone: '0721-772345',
    officerInCharge: {
      en: 'Assistant Director (Seed)',
      bn: 'সহকারী পরিচালক (বীজ)',
    },
    services: {
      en: [
        'Drought-tolerant certified rice seeds',
        'Official seed germination testing verification',
      ],
      bn: [
        'খরা সহনশীল প্রত্যয়িত ধানের বীজ',
        'সরকারি বীজ গজানোর হার ও গুণগত মান নিশ্চিতকরণ',
      ],
    },
    timing: {
      en: 'Sunday - Thursday: 9:30 AM - 4:30 PM',
      bn: 'রবিবার - বৃহস্পতিবার: সকাল ৯:৩০ - বিকাল ৪:৩০',
    },
  },
];
