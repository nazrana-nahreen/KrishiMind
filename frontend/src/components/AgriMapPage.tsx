import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import {
  ArrowLeft,
  MapPin,
  Navigation,
  Phone,
  Clock,
  Search,
  Building2,
  Sparkles,
  ExternalLink,
  Compass,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  PhoneCall,
  Layers,
} from 'lucide-react';
import { Language } from '../types';
import {
  DIVISIONS_DATA,
  AGRI_OFFICES,
  AgriOffice,
} from '../data/agriOfficesData';

interface AgriMapPageProps {
  lang: Language;
  onBackToHome: () => void;
}

function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

export const AgriMapPage: React.FC<AgriMapPageProps> = ({ lang, onBackToHome }) => {
  // Selected user location
  const [selectedDivision, setSelectedDivision] = useState<string>('Dhaka');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Gazipur');
  const [selectedUpazila, setSelectedUpazila] = useState<string>('Gazipur Sadar');

  // Coordinates
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number }>({
    lat: 23.9999,
    lng: 90.4203,
  });
  const [locationName, setLocationName] = useState<string>('Gazipur Sadar, Gazipur');
  const [isDetectingGps, setIsDetectingGps] = useState<boolean>(false);
  const [filterType, setFilterType] = useState<'all' | 'dae' | 'brri' | 'badc'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedOffice, setSelectedOffice] = useState<AgriOffice | null>(null);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);

  // Available districts for current division
  const currentDivisionData = DIVISIONS_DATA.find((d) => d.division === selectedDivision);
  const availableDistricts = currentDivisionData?.districts || [];
  const currentDistrictData = availableDistricts.find((d) => d.name === selectedDistrict);
  const availableUpazilas = currentDistrictData?.upazilas || [];

  // When division changes, update district & upazila
  const handleDivisionChange = (divName: string) => {
    setSelectedDivision(divName);
    const div = DIVISIONS_DATA.find((d) => d.division === divName);
    if (div && div.districts.length > 0) {
      const firstDist = div.districts[0];
      setSelectedDistrict(firstDist.name);
      setSelectedUpazila(firstDist.upazilas[0] || '');
      setUserCoords({ lat: firstDist.lat, lng: firstDist.lng });
      setLocationName(`${firstDist.nameBn || firstDist.name}`);
    }
  };

  const handleDistrictChange = (distName: string) => {
    setSelectedDistrict(distName);
    const dist = availableDistricts.find((d) => d.name === distName);
    if (dist) {
      setSelectedUpazila(dist.upazilas[0] || '');
      setUserCoords({ lat: dist.lat, lng: dist.lng });
      setLocationName(`${dist.nameBn || dist.name}`);
    }
  };

  const handleUpazilaChange = (upName: string) => {
    setSelectedUpazila(upName);
    setLocationName(`${upName}, ${selectedDistrict}`);
  };

  // GPS geolocation handler
  const handleDetectGPS = () => {
    if (!navigator.geolocation) {
      alert(lang === 'bn' ? 'আপনার ব্রাউজারে জিপিএস সুবিধা নেই।' : 'Geolocation not supported by your browser.');
      return;
    }

    setIsDetectingGps(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setUserCoords({ lat, lng });
        setLocationName(lang === 'bn' ? 'আমার বর্তমান জিপিএস অবস্থান' : 'My Current GPS Location');
        setIsDetectingGps(false);
      },
      (err) => {
        setIsDetectingGps(false);
        alert(
          lang === 'bn'
            ? 'জিপিএস অবস্থান নেওয়া যায়নি। অনুগ্রহ করে ড্রপডাউন থেকে আপনার জেলা নির্বাচন করুন।'
            : 'Could not acquire GPS position. Please select your district from the dropdown.'
        );
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Filter and sort offices by distance from userCoords
  const sortedOffices = AGRI_OFFICES.map((office) => {
    const dist = calculateDistanceKm(userCoords.lat, userCoords.lng, office.lat, office.lng);
    return { ...office, distanceKm: dist };
  })
    .filter((office) => {
      if (filterType !== 'all' && office.type !== filterType) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const nEn = office.name.en.toLowerCase();
      const nBn = office.name.bn.toLowerCase();
      const up = office.upazila.toLowerCase();
      const dist = office.district.toLowerCase();
      return nEn.includes(q) || nBn.includes(q) || up.includes(q) || dist.includes(q);
    })
    .sort((a, b) => a.distanceKm - b.distanceKm);

  // Initialize Leaflet map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current).setView([userCoords.lat, userCoords.lng], 10);

      // Free OpenStreetMap CartoDB Positron / OSM tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);

      const markersLayer = L.layerGroup().addTo(map);
      markersLayerRef.current = markersLayer;
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update map view & markers whenever userCoords or sortedOffices change
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    markersLayer.clearLayers();

    // 1. User Position Marker (Custom Pulsing Blue Pin)
    const userIcon = L.divIcon({
      className: 'custom-user-marker',
      html: `
        <div style="position: relative; width: 28px; height: 28px;">
          <div style="position: absolute; width: 28px; height: 28px; background: rgba(59, 130, 246, 0.4); border-radius: 50%; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="position: absolute; top: 4px; left: 4px; width: 20px; height: 20px; background: #2563eb; border: 3px solid #ffffff; border-radius: 50%; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.3);"></div>
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });

    const uMarker = L.marker([userCoords.lat, userCoords.lng], { icon: userIcon })
      .bindPopup(`
        <div style="font-family: inherit; font-size: 13px; line-height: 1.4; padding: 2px;">
          <strong style="color: #1e3a8a;">📍 ${lang === 'bn' ? 'আপনার নির্বাচিত অবস্থান' : 'Your Selected Location'}</strong><br/>
          <span style="color: #64748b; font-size: 11px;">${locationName}</span>
        </div>
      `)
      .addTo(markersLayer);
    userMarkerRef.current = uMarker;

    // 2. Office Markers with custom icons
    sortedOffices.forEach((office) => {
      let pinColor = '#10b981'; // DAE green
      let pinSymbol = '🏢';
      if (office.type === 'brri') {
        pinColor = '#059669'; // BRRI emerald
        pinSymbol = '🔬';
      } else if (office.type === 'badc') {
        pinColor = '#d97706'; // BADC amber
        pinSymbol = '🌾';
      }

      const officeIcon = L.divIcon({
        className: 'custom-office-marker',
        html: `
          <div style="background-color: ${pinColor}; width: 34px; height: 34px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 2px solid #ffffff; box-shadow: 0 4px 10px rgba(0,0,0,0.25); display: flex; align-items: center; justify-content: center; cursor: pointer;">
            <span style="transform: rotate(45deg); font-size: 15px;">${pinSymbol}</span>
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 34],
        popupAnchor: [0, -32],
      });

      const popupContent = `
        <div style="font-family: inherit; font-size: 13px; line-height: 1.5; min-width: 200px; padding: 4px;">
          <span style="background: ${pinColor}15; color: ${pinColor}; font-weight: 700; font-size: 10px; padding: 2px 8px; border-radius: 12px; border: 1px solid ${pinColor}40;">
            ${office.typeLabel[lang]}
          </span>
          <h4 style="font-weight: 800; margin: 6px 0 2px 0; color: #0f172a; font-size: 14px;">
            ${office.name[lang]}
          </h4>
          <p style="color: #64748b; font-size: 11px; margin: 0 0 6px 0;">
            📍 ${office.address[lang]}
          </p>
          <div style="border-top: 1px solid #f1f5f9; padding-top: 6px; margin-top: 6px;">
            <p style="font-size: 12px; margin: 0 0 4px 0; color: #334155;">
              <strong>👤 ${office.officerInCharge[lang]}</strong>
            </p>
            <p style="font-size: 12px; margin: 0 0 6px 0; color: #059669; font-weight: bold;">
              📞 <a href="tel:${office.phone}" style="color: #059669; text-decoration: none;">${office.phone}</a>
            </p>
            <p style="font-size: 11px; margin: 0 0 8px 0; color: #64748b;">
              ⏱️ ${office.timing[lang]}
            </p>
            <a href="https://www.google.com/maps/dir/?api=1&destination=${office.lat},${office.lng}" target="_blank" rel="noopener noreferrer" style="display: block; text-align: center; background: #10b981; color: white; padding: 6px 12px; border-radius: 8px; font-weight: bold; font-size: 11px; text-decoration: none;">
              🗺️ ${lang === 'bn' ? 'গুগল ম্যাপে দিকনির্দেশনা দেখুন' : 'Get Directions in Google Maps'} (${office.distanceKm} km)
            </a>
          </div>
        </div>
      `;

      L.marker([office.lat, office.lng], { icon: officeIcon })
        .bindPopup(popupContent)
        .addTo(markersLayer);
    });

    // Pan to user location
    map.setView([userCoords.lat, userCoords.lng], 10, { animate: true });
  }, [userCoords, sortedOffices, lang, locationName]);

  const handleFocusOffice = (office: AgriOffice) => {
    setSelectedOffice(office);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([office.lat, office.lng], 13, { animate: true });
    }
  };

  return (
    <div className={`min-h-screen bg-[#f2fbf5] ${lang === 'bn' ? 'font-bengali' : 'font-sans'}`}>
      
      {/* Top Navigation Bar with Back Button */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-sm font-semibold transition-all group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>{lang === 'bn' ? 'প্রধান পাতায় ফিরুন' : 'Back to Home'}</span>
          </button>

          <div className="text-center">
            <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-600" />
              <span>{lang === 'bn' ? 'স্থানীয় কৃষি অফিস ও সেবা কেন্দ্র ম্যাপ' : 'Nearby Agriculture Offices & Centers'}</span>
            </h1>
            <span className="text-xs text-emerald-700 font-medium hidden sm:block">
              {lang === 'bn' ? 'আপনার অবস্থান নির্বাচন করে নিকটস্থ কৃষি কর্মকর্তার সহায়তা নিন' : 'Select your location to discover local agronomists & DAE offices'}
            </span>
          </div>

          <a
            href="tel:16123"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-500/20"
          >
            <PhoneCall className="w-4 h-4" />
            <span className="hidden sm:inline">{lang === 'bn' ? 'কৃষি কল সেন্টার:' : 'Helpline:'}</span>
            <span>16123</span>
          </a>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Step 1: Location Selector Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/90 text-emerald-800 text-xs font-bold mb-2">
                <Compass className="w-3.5 h-3.5 text-emerald-600" />
                <span>{lang === 'bn' ? '১ম ধাপ: আপনার এলাকা নির্বাচন করুন' : 'Step 1: Set Your Farming Location'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                {lang === 'bn' ? 'আপনার বর্তমান অবস্থান বা জেলা বাছাই করুন' : 'Choose Your Division, District & Upazila'}
              </h2>
            </div>

            {/* GPS Locate Me Button */}
            <button
              onClick={handleDetectGPS}
              disabled={isDetectingGps}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 active:scale-95 text-white font-bold text-sm shadow-md shadow-emerald-500/25 transition-all self-start md:self-auto cursor-pointer"
            >
              <Navigation className={`w-4 h-4 ${isDetectingGps ? 'animate-spin' : ''}`} />
              <span>
                {isDetectingGps
                  ? lang === 'bn'
                    ? 'জিপিএস খোঁজা হচ্ছে...'
                    : 'Locating GPS...'
                  : lang === 'bn'
                  ? 'আমার বর্তমান জিপিএস অবস্থান ব্যবহার করুন'
                  : 'Detect My GPS Location'}
              </span>
            </button>
          </div>

          {/* Cascading Location Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Division */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                {lang === 'bn' ? 'বিভাগ (Division)' : 'Division'}
              </label>
              <select
                value={selectedDivision}
                onChange={(e) => handleDivisionChange(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all cursor-pointer"
              >
                {DIVISIONS_DATA.map((d) => (
                  <option key={d.division} value={d.division}>
                    {lang === 'bn' ? d.divisionBn : d.division}
                  </option>
                ))}
              </select>
            </div>

            {/* District */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                {lang === 'bn' ? 'জেলা (District)' : 'District'}
              </label>
              <select
                value={selectedDistrict}
                onChange={(e) => handleDistrictChange(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all cursor-pointer"
              >
                {availableDistricts.map((d) => (
                  <option key={d.name} value={d.name}>
                    {lang === 'bn' ? d.nameBn : d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Upazila */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                {lang === 'bn' ? 'উপজেলা (Upazila)' : 'Upazila'}
              </label>
              <select
                value={selectedUpazila}
                onChange={(e) => handleUpazilaChange(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all cursor-pointer"
              >
                {availableUpazilas.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>
              {lang === 'bn' ? 'বর্তমান সক্রিয় অবস্থান:' : 'Active Location Anchor:'}{' '}
              <strong className="text-slate-800">{locationName}</strong> ({userCoords.lat.toFixed(4)}, {userCoords.lng.toFixed(4)})
            </span>
          </div>
        </div>

        {/* Step 2: Interactive Map & Nearest Office Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Leaflet OpenStreetMap */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-4 sm:p-6 border border-emerald-100 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {lang === 'bn' ? 'ইন্টারেক্টিভ কৃষি সেবা মানচিত্র' : 'Live Interactive Agriculture Map'}
                </h3>
              </div>

              {/* Map Legend */}
              <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  <span>{lang === 'bn' ? 'আপনার অবস্থান' : 'You'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>{lang === 'bn' ? 'ডিএই অফিস' : 'DAE'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-700" />
                  <span>{lang === 'bn' ? 'ব্রি কেন্দ্র' : 'BRRI'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                  <span>{lang === 'bn' ? 'বিএডিসি' : 'BADC'}</span>
                </div>
              </div>
            </div>

            {/* Map Container */}
            <div
              ref={mapContainerRef}
              className="w-full h-[520px] rounded-2xl overflow-hidden border border-slate-200 z-10 relative shadow-inner"
            />

            <p className="text-[11px] text-slate-500 italic">
              {lang === 'bn'
                ? '* মানচিত্রের যেকোনো আইকনে ক্লিক করে সরাসরি অফিস ও কর্মকর্তার ফোন নম্বর, সেবাসমূহ এবং গুগল ম্যাপের দিকনির্দেশনা দেখুন।'
                : '* Click on any marker to open office contact details, opening hours, and direct navigation links.'}
            </p>
          </div>

          {/* Right Column: Filtered List of Nearby Offices (Sorted by Distance) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Filter Pills & Search */}
            <div className="bg-white rounded-3xl p-5 border border-emerald-100 shadow-sm space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={lang === 'bn' ? 'অফিস বা উপজেলার নাম লিখে খুঁজুন...' : 'Filter by office or upazila name...'}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Agency Filters */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    filterType === 'all'
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {lang === 'bn' ? 'সকল অফিস' : 'All Centers'} ({sortedOffices.length})
                </button>
                <button
                  onClick={() => setFilterType('dae')}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    filterType === 'dae'
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {lang === 'bn' ? 'ডিএই (DAE)' : 'DAE Offices'}
                </button>
                <button
                  onClick={() => setFilterType('brri')}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    filterType === 'brri'
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {lang === 'bn' ? 'ব্রি (BRRI)' : 'BRRI Stations'}
                </button>
                <button
                  onClick={() => setFilterType('badc')}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    filterType === 'badc'
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {lang === 'bn' ? 'বিএডিসি বীজ' : 'BADC Seeds'}
                </button>
              </div>
            </div>

            {/* Office Cards List */}
            <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
              {sortedOffices.map((office) => {
                const isSelected = selectedOffice?.id === office.id;
                let badgeClass = 'bg-emerald-100 text-emerald-800 border-emerald-200';
                if (office.type === 'brri') badgeClass = 'bg-teal-100 text-teal-800 border-teal-200';
                if (office.type === 'badc') badgeClass = 'bg-amber-100 text-amber-800 border-amber-200';

                return (
                  <div
                    key={office.id}
                    onClick={() => handleFocusOffice(office)}
                    className={`bg-white rounded-2xl p-5 border transition-all cursor-pointer hover:shadow-md ${
                      isSelected
                        ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                        : 'border-slate-200/90 hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${badgeClass}`}>
                        {office.typeLabel[lang]}
                      </span>
                      <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                        ~{office.distanceKm} km {lang === 'bn' ? 'দূরে' : 'away'}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 mt-2 hover:text-emerald-700 transition-colors">
                      {office.name[lang]}
                    </h4>

                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <span>{office.address[lang]}</span>
                    </p>

                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-slate-500 block text-[11px]">{office.officerInCharge[lang]}</span>
                        <a
                          href={`tel:${office.phone}`}
                          onClick={(e) => e.stopPropagation()}
                          className="font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 mt-0.5"
                        >
                          <Phone className="w-3 h-3" />
                          <span>{office.phone}</span>
                        </a>
                      </div>

                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${office.lat},${office.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 font-semibold transition-colors"
                      >
                        <span>{lang === 'bn' ? 'দিকনির্দেশনা' : 'Directions'}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

        {/* Emergency Agricultural Hotline Cards */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                {lang === 'bn' ? 'সরকারি জরুরি কৃষি সহায়তা' : 'Government Agricultural Helpline'}
              </span>
              <h3 className="text-2xl font-black">
                {lang === 'bn' ? 'দূরবর্তী মাঠে তাৎক্ষণিক সমাধান পেতে ১৬১২৩ এ কল করুন' : 'Need Immediate Agronomic Support from Your Field?'}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100 max-w-xl">
                {lang === 'bn'
                  ? 'সরাসরি সরকারি কৃষি কর্মকর্তার সাথে কথা বলে ধান পাতার রোগ ও বালাইনাশকের প্রেসক্রিপশন পান। সকাল ৯টা থেকে বিকাল ৫টা পর্যন্ত বিনামূল্যে সেবা চালু থাকে।'
                  : 'Speak directly with government agricultural extension officers for crop disease diagnostics and pesticide dosages (9 AM - 5 PM).'}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="tel:16123"
                className="px-6 py-3 rounded-full bg-white text-emerald-900 font-extrabold text-sm shadow-md hover:bg-emerald-50 flex items-center gap-2 transition-all cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-emerald-700" />
                <span>{lang === 'bn' ? '১৬১২৩ (কৃষি কল সেন্টার)' : 'Call 16123 (Krishi Center)'}</span>
              </a>
              <a
                href="tel:333"
                className="px-5 py-3 rounded-full bg-emerald-700/60 hover:bg-emerald-700 border border-emerald-400/40 text-white font-bold text-sm flex items-center gap-2 transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>{lang === 'bn' ? '৩৩৩ (কৃষি তথ্য সেবা)' : 'Call 333 (National)'}</span>
              </a>
            </div>
          </div>
        </div>

      </main>

    </div>
  );
};
