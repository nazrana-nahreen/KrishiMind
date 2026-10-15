export interface UserAccount {
  id: string;
  name: string;
  phone: string;
  password?: string;
  role: 'farmer' | 'buyer' | 'aratdar';
  roleLabel: {
    en: string;
    bn: string;
  };
  division: string;
  district: string;
  upazila: string;
  villageOrMokam: string;
  farmSizeOrCapacity: string;
  mfsType: 'bkash' | 'nagad' | 'rocket';
  mfsNumber: string;
  totalMaundsTraded: number;
  totalRevenue: number;
  verified: boolean;
  avatarSeed: string;
  createdAt: string;
  orders: {
    id: string;
    listingTitle: string;
    date: string;
    maunds: number;
    totalAmount: number;
    status: 'Pending' | 'Advance Paid' | 'Delivered & Settled';
  }[];
}

const STORAGE_KEY_USER = 'krishimind_auth_user';
const STORAGE_KEY_ACCOUNTS = 'krishimind_accounts_list';

export const DEMO_ACCOUNTS: UserAccount[] = [
  {
    id: 'user_farmer_101',
    name: 'মো: কফিল উদ্দিন (মডেল কৃষক)',
    phone: '01712334455',
    password: '123',
    role: 'farmer',
    roleLabel: {
      en: 'Verified Rice Farmer',
      bn: 'সার্টিফাইড আদর্শ কৃষক',
    },
    division: 'Rajshahi',
    district: 'Bogura',
    upazila: 'Sherpur',
    villageOrMokam: 'ভবানীপুর গ্রাম, শেরপুর',
    farmSizeOrCapacity: '১২ বিঘা ধান জমি',
    mfsType: 'bkash',
    mfsNumber: '01712334455',
    totalMaundsTraded: 420,
    totalRevenue: 785000,
    verified: true,
    avatarSeed: 'Kofil',
    createdAt: '12 Jan 2026',
    orders: [
      {
        id: 'ORD-8921',
        listingTitle: 'কাটারিভোগ চিকন ধান (১২০ মন)',
        date: '12 Oct 2026',
        maunds: 120,
        totalAmount: 228000,
        status: 'Delivered & Settled',
      },
      {
        id: 'ORD-8944',
        listingTitle: 'ব্রি ধান-২৮ বোরো লট (১০০ মন)',
        date: '14 Oct 2026',
        maunds: 100,
        totalAmount: 142000,
        status: 'Advance Paid',
      },
    ],
  },
  {
    id: 'user_buyer_202',
    name: 'হাজী রফিকুল ইসলাম (মেসার্স যমুনা অটো রাইস মিল)',
    phone: '01819223344',
    password: '123',
    role: 'buyer',
    roleLabel: {
      en: 'Commercial Rice Miller',
      bn: 'অটো চালকল মালিক ও পাইকার',
    },
    division: 'Rangpur',
    district: 'Dinajpur',
    upazila: 'Dinajpur Sadar',
    villageOrMokam: 'পুলহাট শিল্প এলাকা, দিনাজপুর',
    farmSizeOrCapacity: 'প্রতিদিন ৫০ টন চালকল প্রসেসিং',
    mfsType: 'bkash',
    mfsNumber: '01819223344',
    totalMaundsTraded: 1250,
    totalRevenue: 2450000,
    verified: true,
    avatarSeed: 'Rafiqul',
    createdAt: '05 Feb 2026',
    orders: [
      {
        id: 'ORD-9102',
        listingTitle: 'দিনাজপুরী কাটারি ধান (২৫০ মন)',
        date: '10 Oct 2026',
        maunds: 250,
        totalAmount: 485000,
        status: 'Delivered & Settled',
      },
    ],
  },
];

export const AuthService = {
  // Get all registered accounts
  getAllAccounts(): UserAccount[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY_ACCOUNTS);
      if (data) {
        return JSON.parse(data);
      }
    } catch {}
    // Seed default demo accounts
    localStorage.setItem(STORAGE_KEY_ACCOUNTS, JSON.stringify(DEMO_ACCOUNTS));
    return DEMO_ACCOUNTS;
  },

  // Get currently logged-in user
  getCurrentUser(): UserAccount | null {
    try {
      const data = localStorage.getItem(STORAGE_KEY_USER);
      if (data === 'LOGGED_OUT') {
        return null;
      }
      if (data) {
        return JSON.parse(data);
      }
    } catch {}
    // Default to the first demo farmer on initial visit
    const def = DEMO_ACCOUNTS[0];
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(def));
    return def;
  },

  // Login
  login(phone: string, password?: string): { success: boolean; user?: UserAccount; message?: string } {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const accounts = this.getAllAccounts();
    const found = accounts.find((acc) => acc.phone.replace(/[^0-9]/g, '') === cleanPhone);

    if (!found) {
      return {
        success: false,
        message: 'এই ফোন নম্বরে কোনো কৃষক বা ক্রেতা অ্যাকাউন্ট পাওয়া যায়নি। অনুগ্রহ করে নিবন্ধন করুন।',
      };
    }

    if (password && found.password && found.password !== password) {
      return { success: false, message: 'ভুল পাসওয়ার্ড! অনুগ্রহ করে সঠিক পাসওয়ার্ড দিন।' };
    }

    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(found));
    return { success: true, user: found };
  },

  // Quick Demo Login
  demoLogin(role: 'farmer' | 'buyer'): UserAccount {
    const target = DEMO_ACCOUNTS.find((a) => a.role === role) || DEMO_ACCOUNTS[0];
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(target));
    return target;
  },

  // Register / Create new profile
  register(newUserData: Omit<UserAccount, 'id' | 'createdAt' | 'orders' | 'totalMaundsTraded' | 'totalRevenue' | 'verified'>): {
    success: boolean;
    user?: UserAccount;
    message?: string;
  } {
    const accounts = this.getAllAccounts();
    const cleanPhone = newUserData.phone.replace(/[^0-9]/g, '');

    if (accounts.some((a) => a.phone.replace(/[^0-9]/g, '') === cleanPhone)) {
      return { success: false, message: 'এই মোবাইল নম্বর দিয়ে আগেই অ্যাকাউন্ট তৈরি করা আছে। অনুগ্রহ করে লগইন করুন।' };
    }

    const newUser: UserAccount = {
      ...newUserData,
      id: `usr_${Date.now()}`,
      createdAt: 'Today',
      orders: [],
      totalMaundsTraded: 0,
      totalRevenue: 0,
      verified: true,
    };

    const updatedList = [newUser, ...accounts];
    localStorage.setItem(STORAGE_KEY_ACCOUNTS, JSON.stringify(updatedList));
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(newUser));
    return { success: true, user: newUser };
  },

  // Update profile
  updateProfile(updatedUser: UserAccount): void {
    const accounts = this.getAllAccounts();
    const idx = accounts.findIndex((a) => a.id === updatedUser.id);
    if (idx !== -1) {
      accounts[idx] = updatedUser;
    } else {
      accounts.push(updatedUser);
    }
    localStorage.setItem(STORAGE_KEY_ACCOUNTS, JSON.stringify(accounts));
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updatedUser));
  },

  // Append new order/trade
  addOrderToCurrentUser(order: {
    listingTitle: string;
    maunds: number;
    totalAmount: number;
    status: 'Pending' | 'Advance Paid' | 'Delivered & Settled';
  }): UserAccount | null {
    const current = this.getCurrentUser();
    if (!current) return null;

    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      ...order,
    };

    const updatedUser: UserAccount = {
      ...current,
      totalMaundsTraded: current.totalMaundsTraded + order.maunds,
      totalRevenue: current.totalRevenue + order.totalAmount,
      orders: [newOrder, ...current.orders],
    };

    this.updateProfile(updatedUser);
    return updatedUser;
  },

  // Logout
  logout(): void {
    localStorage.setItem(STORAGE_KEY_USER, 'LOGGED_OUT');
  },
};
