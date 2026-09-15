import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Stethoscope, 
  Home, 
  ChevronDown, 
  ShieldCheck, 
  Star, 
  Users, 
  CheckCircle2, 
  UserRound
} from 'lucide-react';
import { SPECIALTIES, CITIES_AND_AREAS } from '../data/seedData';

interface HeroSearchProps {
  onSearch: (filters: { specialty: string; city: string; area: string; doctorName: string; insurance?: string }) => void;
  selectedSpecialty: string;
  setSelectedSpecialty: (spec: string) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  selectedArea: string;
  setSelectedArea: (area: string) => void;
  selectedInsurance?: string;
  setSelectedInsurance?: (insurance: string) => void;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  onSearch,
  selectedSpecialty,
  setSelectedSpecialty,
  selectedCity,
  setSelectedCity,
  selectedArea,
  setSelectedArea
}) => {
  const [activeTab, setActiveTab] = useState<'clinic' | 'home'>('clinic');
  const [doctorNameInput, setDoctorNameInput] = useState('');

  const currentAreas = CITIES_AND_AREAS.find(c => c.city === selectedCity)?.areas || [];

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setSelectedArea('');
  };

  const handleExecuteSearch = () => {
    onSearch({
      specialty: selectedSpecialty,
      city: selectedCity,
      area: selectedArea,
      doctorName: doctorNameInput
    });
  };

  return (
    <section className="bg-slate-50 dark:bg-slate-950 pt-6 sm:pt-10 pb-10 sm:pb-12 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200 font-['Tajawal',sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Headline */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-slate-800 border border-blue-200 dark:border-slate-700 text-[#0066b2] dark:text-blue-400 text-xs font-black px-4 py-1.5 rounded-full mb-3 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-[#0066b2] dark:text-blue-400" />
            <span>المنصة المعتمدة لحجز الأطباء والعيادات في مصر</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-2.5">
            احجز أفضل دكتور في مصر <br className="hidden sm:inline" />
            <span className="text-[#0066b2] dark:text-blue-400">بكل سهولة وبدون أي رسوم حجز</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-medium">
            اختر التخصص والمنطقة، احجز موعدك المؤكد فورا، وادفع في العيادة بالسعر الرسمي.
          </p>
        </div>

        {/* Tab Selection (Clinic / Home Visit) */}
        <div className="max-w-4xl mx-auto mb-3 flex justify-start sm:justify-center overflow-x-auto pb-1 scrollbar-none">
          <div className="inline-flex bg-white dark:bg-slate-900 p-1 rounded-2xl border border-slate-300 dark:border-slate-700 shadow-xs">
            <button
              id="tab-clinic"
              type="button"
              onClick={() => setActiveTab('clinic')}
              className={`flex items-center gap-2 px-5 sm:px-7 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all duration-150 cursor-pointer ${
                activeTab === 'clinic'
                  ? 'bg-[#0066b2] text-white shadow-xs'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              <span>كشف بالعيادة</span>
            </button>

            <button
              id="tab-home"
              type="button"
              onClick={() => setActiveTab('home')}
              className={`flex items-center gap-2 px-5 sm:px-7 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all duration-150 cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-[#0066b2] text-white shadow-xs'
                  : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>زيارة منزلية</span>
            </button>
          </div>
        </div>

        {/* Master Search Bar (Clean High-Contrast Form) */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl shadow-md border-2 border-slate-300/80 dark:border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Field 1: Specialty */}
            <div className="md:col-span-3 relative">
              <label className="block text-xs font-black text-slate-800 dark:text-slate-200 mb-1.5 pr-1">التخصص الطبي</label>
              <div className="relative flex items-center bg-white dark:bg-slate-950 rounded-2xl border-2 border-slate-300 dark:border-slate-700 focus-within:border-[#0066b2] dark:focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 dark:focus-within:ring-slate-800 transition-all">
                <Stethoscope className="w-4 h-4 text-[#0066b2] mr-3 shrink-0" />
                <select
                  id="select-hero-specialty"
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full bg-transparent py-3 pr-1 pl-7 text-xs sm:text-sm font-bold text-slate-900 dark:text-white outline-none appearance-none cursor-pointer"
                >
                  <option value="" className="dark:bg-slate-900">جميع التخصصات الطبية</option>
                  {SPECIALTIES.filter(s => s.id !== 'all').map((spec) => (
                    <option key={spec.id} value={spec.id} className="dark:bg-slate-900">{spec.name}</option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 absolute left-2.5 pointer-events-none" />
              </div>
            </div>

            {/* Field 2: Governorate & Area */}
            <div className="md:col-span-5 relative">
              <label className="block text-xs font-black text-slate-800 dark:text-slate-200 mb-1.5 pr-1">المحافظة والمنطقة</label>
              <div className="grid grid-cols-2 gap-2">
                <div className="relative flex items-center bg-white dark:bg-slate-950 rounded-2xl border-2 border-slate-300 dark:border-slate-700 focus-within:border-[#0066b2] dark:focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 dark:focus-within:ring-slate-800 transition-all">
                  <MapPin className="w-3.5 h-3.5 text-[#0066b2] mr-2.5 shrink-0" />
                  <select
                    id="select-hero-city"
                    value={selectedCity}
                    onChange={(e) => handleCityChange(e.target.value)}
                    className="w-full bg-transparent py-3 pr-1 pl-6 text-xs sm:text-sm font-bold text-slate-900 dark:text-white outline-none appearance-none cursor-pointer"
                  >
                    <option value="" className="dark:bg-slate-900">المحافظة (الكل)</option>
                    {CITIES_AND_AREAS.map(c => (
                      <option key={c.city} value={c.city} className="dark:bg-slate-900">{c.city}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute left-2 pointer-events-none" />
                </div>

                <div className="relative flex items-center bg-white dark:bg-slate-950 rounded-2xl border-2 border-slate-300 dark:border-slate-700 focus-within:border-[#0066b2] dark:focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 dark:focus-within:ring-slate-800 transition-all">
                  <select
                    id="select-hero-area"
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    disabled={!selectedCity}
                    className="w-full bg-transparent py-3 pr-2.5 pl-6 text-xs sm:text-sm font-bold text-slate-900 dark:text-white outline-none appearance-none cursor-pointer disabled:opacity-50"
                  >
                    <option value="" className="dark:bg-slate-900">
                      {selectedCity ? `مناطق ${selectedCity}` : 'اختر المحافظة أولاً'}
                    </option>
                    {currentAreas.map(area => (
                      <option key={area} value={area} className="dark:bg-slate-900">{area}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute left-2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Field 3: Doctor or Clinic Name & Search Button */}
            <div className="md:col-span-4 relative flex flex-col">
              <label className="block text-xs font-black text-slate-800 dark:text-slate-200 mb-1.5 pr-1">اسم الطبيب أو العيادة</label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1 flex items-center bg-white dark:bg-slate-950 rounded-2xl border-2 border-slate-300 dark:border-slate-700 focus-within:border-[#0066b2] dark:focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 dark:focus-within:ring-slate-800 transition-all">
                  <UserRound className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
                  <input
                    id="input-hero-doctor-name"
                    type="text"
                    placeholder="اكتب اسم الطبيب أو العيادة..."
                    value={doctorNameInput}
                    onChange={(e) => setDoctorNameInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleExecuteSearch()}
                    className="w-full bg-transparent py-3 px-2 text-xs sm:text-sm font-bold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none"
                  />
                </div>
                <button
                  id="btn-hero-search-submit"
                  type="button"
                  onClick={handleExecuteSearch}
                  className="bg-[#0066b2] hover:bg-[#005596] dark:bg-blue-600 dark:hover:bg-blue-500 active:scale-95 text-white font-black text-sm px-6 py-3.5 rounded-2xl transition-all duration-150 shadow-md dark:shadow-[0_0_16px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2 shrink-0 cursor-pointer border border-transparent dark:border-blue-400/40"
                >
                  <Search className="w-4 h-4" />
                  <span>بحث</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Simplified Trust Statistics Bar */}
        <div className="max-w-4xl mx-auto mt-6 sm:mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-center">
          <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-center gap-1.5 text-[#0066b2] dark:text-blue-400 font-black text-base sm:text-lg">
              <Users className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>+20,000</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 font-bold mt-0.5">طبيب معتمد واستشاري</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-center gap-1.5 text-[#0066b2] dark:text-blue-400 font-black text-base sm:text-lg">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-[#0066b2] dark:fill-blue-400" />
              <span>100% موثقة</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 font-bold mt-0.5">تقييمات مرضى حقيقيين</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-center gap-1.5 text-[#0066b2] dark:text-blue-400 font-black text-base sm:text-lg">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>حجز مجاني</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 font-bold mt-0.5">الدفع بالعيادة بنفس السعر</p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-center gap-1.5 text-[#0066b2] dark:text-blue-400 font-black text-base sm:text-lg">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>دقة المواعيد</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 font-bold mt-0.5">تأكيد فوري للحجز</p>
          </div>
        </div>

      </div>
    </section>
  );
};

