import React from 'react';
import { 
  Stethoscope, 
  FileText, 
  HelpCircle, 
  ShieldCheck, 
  Star, 
  CreditCard, 
  ChevronLeft,
  Award,
  Compass
} from 'lucide-react';
import { Doctor, Booking } from '../types';
import { DoctorCard } from './DoctorCard';
import { HeroSearch } from './HeroSearch';
import { UpcomingAppointmentBanner } from './UpcomingAppointmentBanner';
import { SpecialtiesGrid } from './SpecialtiesGrid';

interface HomeViewProps {
  doctors: Doctor[];
  bookings?: Booking[];
  selectedSpecialty: string;
  setSelectedSpecialty: (s: string) => void;
  selectedCity: string;
  setSelectedCity: (c: string) => void;
  selectedArea: string;
  setSelectedArea: (a: string) => void;
  selectedInsurance?: string;
  setSelectedInsurance?: (ins: string) => void;
  onSearch: (filters: { specialty: string; city: string; area: string; doctorName: string; insurance?: string }) => void;
  onOpenProfile: (doctor: Doctor) => void;
  onBookSlot: (doctor: Doctor, day: string, slot: string) => void;
  onNavigateToSearch: () => void;
  onNavigateToRecords: () => void;
  onNavigateToBookings?: () => void;
  onViewVoucher?: (booking: Booking) => void;
  onOpenSymptomGuide: () => void;
  onOpenMaps?: () => void;
  onOpenJoinDoctor?: () => void;
  favorites?: string[];
  onToggleFavorite?: (id: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  doctors,
  bookings = [],
  selectedSpecialty,
  setSelectedSpecialty,
  selectedCity,
  setSelectedCity,
  selectedArea,
  setSelectedArea,
  selectedInsurance = '',
  setSelectedInsurance,
  onSearch,
  onOpenProfile,
  onBookSlot,
  onNavigateToSearch,
  onNavigateToRecords,
  onNavigateToBookings = () => {},
  onViewVoucher = () => {},
  onOpenSymptomGuide,
  onOpenMaps,
  onOpenJoinDoctor,
  favorites = [],
  onToggleFavorite
}) => {
  return (
    <div className="w-full font-['Tajawal',sans-serif] bg-[#f8fafc] dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      {/* Visual 'Upcoming Appointment' Toast/Badge Banner */}
      {bookings.length > 0 && (
        <UpcomingAppointmentBanner
          bookings={bookings}
          onViewVoucher={onViewVoucher}
          onNavigateToBookings={onNavigateToBookings}
        />
      )}

      {/* Hero Search Bar */}
      <HeroSearch
        onSearch={onSearch}
        selectedSpecialty={selectedSpecialty}
        setSelectedSpecialty={setSelectedSpecialty}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        selectedArea={selectedArea}
        setSelectedArea={setSelectedArea}
        selectedInsurance={selectedInsurance}
        setSelectedInsurance={setSelectedInsurance}
      />

      {/* Instant Medical Specialties Discovery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-slate-200 dark:border-slate-800">
        <SpecialtiesGrid
          selectedSpecialty={selectedSpecialty}
          onSelectSpecialty={(specId) => {
            setSelectedSpecialty(specId);
            onNavigateToSearch();
          }}
          onNavigateToSearch={onNavigateToSearch}
        />
      </section>

      {/* Services Grid (Doctorna Core Pillars) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#002b49] dark:text-white">
              خدمات الرعاية الصحية
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              احجز موعدك في أفضل العيادات والمستشفيات بضغطة زر مع ضمان الدفع بالعيادة
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1 text-[#0070cd] dark:text-blue-400 font-bold bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>أطباء معتمدون ومراجعون</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          
          {/* Service 1: Clinic Booking */}
          <div 
            id="service-clinic-booking"
            onClick={onNavigateToSearch}
            className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-[#0070cd] dark:hover:border-blue-500 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-slate-800 text-[#0070cd] dark:text-blue-400 border border-blue-100 dark:border-slate-700 flex items-center justify-center mb-3.5 group-hover:bg-[#0070cd] group-hover:text-white transition-colors">
                <Stethoscope className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base mb-1">حجز كشف عيادة</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                اختر العيادة الأقرب، احجز موعدك المؤكد وادفع في العيادة بالسعر الرسمي مع تنظيم دورك.
              </p>
            </div>
            <span className="text-xs text-[#0070cd] dark:text-blue-400 font-bold mt-4 flex items-center gap-1 group-hover:gap-2 transition-all">
              <span>تصفح العيادات</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Service 2: Live Clinics Map (Google Maps Grounding) */}
          <div 
            id="service-live-maps"
            onClick={onOpenMaps || onNavigateToSearch}
            className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-sky-500 dark:hover:border-sky-500 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-sky-50 dark:bg-slate-800 text-sky-600 dark:text-sky-400 border border-sky-100 dark:border-slate-700 flex items-center justify-center mb-3.5 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                <Compass className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-1.5 mb-1">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">خريطة العيادات الحية</h3>
                <span className="text-[10px] bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 font-bold px-1.5 py-0.5 rounded-md">Maps</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                استكشف المراكز والمستشفيات المعتمدة حولك في مصر مباشرة عبر Google Maps الذكي.
              </p>
            </div>
            <span className="text-xs text-sky-600 dark:text-sky-400 font-bold mt-4 flex items-center gap-1 group-hover:gap-2 transition-all">
              <span>استكشاف الخريطة</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Service 3: Medical Records & OCR */}
          <div 
            id="service-medical-records"
            onClick={onNavigateToRecords}
            className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-slate-700 flex items-center justify-center mb-3.5 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base mb-1">الملف الطبي والروشتات</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                احفظ روشتاتك وفحوصاتك مع ماسح الروشتات الذكي (OCR) وفاحص التعارضات الدوائية.
              </p>
            </div>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-4 flex items-center gap-1 group-hover:gap-2 transition-all">
              <span>فتح ملفي الطبي</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Service 4: Specialty Triage Guide */}
          <div 
            id="service-triage-guide"
            onClick={onOpenSymptomGuide}
            className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-slate-700 flex items-center justify-center mb-3.5 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base mb-1">دليل اختيار التخصص</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                محتار تكشف عند مين؟ اعرف التخصص الطبي المناسب والفحوصات المقترحة حسب أعراضك.
              </p>
            </div>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold mt-4 flex items-center gap-1 group-hover:gap-2 transition-all">
              <span>تجربة الدليل الذكي</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </span>
          </div>

        </div>
      </section>

      {/* Featured Clinics / Doctors */}
      <section className="bg-slate-50/70 dark:bg-slate-900/50 py-10 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {doctors.length > 0 ? (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="w-4 h-4 text-[#0070cd] dark:text-blue-400" />
                    <span className="text-xs font-bold text-[#0070cd] dark:text-blue-400 uppercase tracking-wider">عيادات معتمدة ومميزة</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#002b49] dark:text-white">أطباء وعيادات موصى بها من مرضى دكتورنا</h2>
                </div>

                <button
                  onClick={onNavigateToSearch}
                  className="text-xs sm:text-sm font-bold text-[#0070cd] dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer self-start sm:self-auto"
                >
                  <span>عرض جميع العيادات ({doctors.length})</span>
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                {doctors.slice(0, 3).map((doctor) => (
                  <DoctorCard
                    key={doctor.id}
                    doctor={doctor}
                    onOpenProfile={onOpenProfile}
                    onBookSlot={onBookSlot}
                    isFavorite={favorites.includes(doctor.id)}
                    onToggleFavorite={onToggleFavorite}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-10 text-center max-w-2xl mx-auto shadow-xs">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-slate-800 text-[#0070cd] dark:text-blue-400 flex items-center justify-center mx-auto mb-4 border border-blue-100 dark:border-slate-700">
                <Stethoscope className="w-8 h-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-black text-[#002b49] dark:text-white mb-2">
                شبكة التعاقدات الطبية قيد المراجعة والتسجيل
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                لم يتم التعاقد مع أطباء أو مراكز طبية حتى الآن. نعمل حالياً على استكمال إجراءات التعاقد ومراجعة التراخيص لضمان جودة الرعاية الصحية قبل إطلاق جداول الحجز.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                {onOpenJoinDoctor && (
                  <button
                    type="button"
                    onClick={onOpenJoinDoctor}
                    className="w-full sm:w-auto bg-[#0066b2] hover:bg-[#005596] active:scale-98 text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    طلب انضمام طبيب أو عيادة
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSpecialty('all');
                    onNavigateToSearch();
                  }}
                  className="w-full sm:w-auto bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  استعراض كل الأطباء
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Compact Trust Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 text-[#0070cd] dark:text-blue-400 border border-slate-200/70 dark:border-slate-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-xs">عيادات وأطباء معتمدون</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">مراجعة التراخيص الطبية وسجلات مزاولة المهنة</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 text-[#0070cd] dark:text-blue-400 border border-slate-200/70 dark:border-slate-700 flex items-center justify-center shrink-0">
              <Star className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-xs">تقييمات مرضى حقيقية</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">تُكتب حصرياً بعد إتمام الكشف الفعلي بالعيادة</p>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 text-[#0070cd] dark:text-blue-400 border border-slate-200/70 dark:border-slate-700 flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-xs">حجز مجاني والدفع بالعيادة</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">لا رسوم إضافية وبالسعر الرسمي المعلن</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};


