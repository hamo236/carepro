import React, { useState } from 'react';
import { 
  Star, 
  MapPin, 
  Clock, 
  PhoneCall, 
  ShieldCheck, 
  Check, 
  ChevronLeft, 
  Info,
  CalendarCheck,
  Bookmark,
  Shield,
  Building2
} from 'lucide-react';
import { Doctor } from '../types';
import { DoctorAvatar } from './DoctorAvatar';

interface DoctorCardProps {
  doctor: Doctor;
  onOpenProfile: (doctor: Doctor) => void;
  onBookSlot: (doctor: Doctor, day: string, slot: string) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({
  doctor,
  onOpenProfile,
  onBookSlot,
  isFavorite = false,
  onToggleFavorite
}) => {
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(
    doctor.availableDays[0]?.slots[0] || null
  );

  const currentDay = doctor.availableDays[activeDayIndex] || doctor.availableDays[0];

  const handleSlotClick = (slot: string) => {
    setSelectedSlot(slot);
  };

  const handleConfirmBooking = () => {
    if (selectedSlot && currentDay) {
      onBookSlot(doctor, currentDay.dateStr, selectedSlot);
    }
  };

  return (
    <div 
      id={`doctor-card-${doctor.id}`}
      className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md hover:border-[#0066b2]/40 dark:hover:border-blue-500/40 transition-all duration-200 overflow-hidden flex flex-col lg:flex-row font-['Tajawal',sans-serif]"
    >
      {/* Right Column: Doctor Information (RTL Layout) */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start gap-3.5 sm:gap-4 relative">
            
            {/* Clinic Specialty Emblem & Badge */}
            <DoctorAvatar
              specialtyId={doctor.specialtyId}
              gender={doctor.gender}
              verified={doctor.verified}
              size="lg"
            />

            {/* Basic Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span className="text-[11px] font-black bg-blue-50 dark:bg-blue-950/80 text-[#0066b2] dark:text-blue-300 px-2.5 py-0.5 rounded-lg border border-blue-200 dark:border-blue-800">
                    {doctor.title}
                  </span>
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                    {doctor.city} - {doctor.area}
                  </span>
                </div>

                {/* Bookmark / Favorite */}
                {onToggleFavorite && (
                  <button
                    type="button"
                    onClick={() => onToggleFavorite(doctor.id)}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-[#0066b2] dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors active:scale-90 cursor-pointer"
                    title={isFavorite ? 'إزالة من المفضلة' : 'حفظ في المفضلة'}
                  >
                    <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-[#0066b2] text-[#0066b2] dark:fill-blue-400 dark:text-blue-400' : ''}`} />
                  </button>
                )}
              </div>

              <h3 
                onClick={() => onOpenProfile(doctor)}
                className="text-base sm:text-xl font-black text-slate-900 dark:text-white hover:text-[#0066b2] dark:hover:text-blue-400 transition-colors cursor-pointer truncate"
              >
                {doctor.name}
              </h3>

              <p className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 mt-0.5 sm:mt-1 line-clamp-2">
                {doctor.specialty}
              </p>

              {/* Rating and Reviews count */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700 px-2.5 py-0.5 rounded-lg">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 ml-1" />
                  <span className="text-xs font-black text-amber-900 dark:text-amber-200">{doctor.rating.toFixed(1)}</span>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenProfile(doctor)}
                  className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-[#0066b2] dark:hover:text-blue-400 hover:underline cursor-pointer"
                >
                  تقييم عام ({doctor.reviewsCount} مريض زار الطبيب)
                </button>
              </div>
            </div>
          </div>

          {/* Sub-specialties tags */}
          <div className="flex flex-wrap gap-1.5 mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800">
            {doctor.subSpecialties.slice(0, 3).map((sub, i) => (
              <span key={i} className="text-[11px] font-bold bg-slate-100 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 px-2.5 py-0.5 rounded-md border border-slate-200/60 dark:border-slate-700">
                {sub}
              </span>
            ))}
          </div>

          {/* Insurance accepted badges */}
          {doctor.acceptedInsurances && doctor.acceptedInsurances.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2.5 pt-2 text-[11px] text-slate-700 dark:text-slate-300">
              <Shield className="w-3.5 h-3.5 text-[#0066b2] dark:text-blue-400 shrink-0" />
              <span className="font-bold shrink-0">التأمين المتاح:</span>
              <div className="flex flex-wrap gap-1">
                {doctor.acceptedInsurances.slice(0, 3).map((ins, i) => (
                  <span key={i} className="bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-2 py-0.5 rounded text-[10px] font-bold text-slate-800 dark:text-slate-200">
                    {ins}
                  </span>
                ))}
                {doctor.acceptedInsurances.length > 3 && (
                  <span className="text-[10px] text-slate-600 dark:text-slate-400 font-bold">
                    +{doctor.acceptedInsurances.length - 3} أخرى
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Practical details (Address, Facility, Waiting time) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3.5 text-xs text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/80 p-3 rounded-2xl border border-slate-200 dark:border-slate-700/80">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#0066b2] dark:text-blue-400 shrink-0 mt-0.5" />
              <div className="min-w-0">
                <span className="font-bold text-slate-900 dark:text-white block truncate">{doctor.address}</span>
                <span className="text-[11px] text-slate-600 dark:text-slate-400 block truncate">{doctor.landmark}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#0066b2] dark:text-blue-400 shrink-0" />
              <div>
                <span className="text-slate-600 dark:text-slate-400 font-medium">نوع المنشأة:</span>
                <strong className="text-slate-900 dark:text-white font-bold mr-1">
                  {doctor.facilityType === 'hospital' ? 'مستشفى' : doctor.facilityType === 'polyclinic' ? 'مجمع عيادات' : 'عيادة خاصة'}
                </strong>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#0066b2] dark:text-blue-400 shrink-0" />
              <div>
                <span className="text-slate-600 dark:text-slate-400 font-medium">مدة الانتظار:</span>
                <strong className="text-slate-900 dark:text-white font-bold mr-1">{doctor.waitingTime}</strong>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-[#0066b2] dark:text-blue-400 shrink-0" />
              <div>
                <span className="text-slate-600 dark:text-slate-400 font-medium">للحجز هاتفياً:</span>
                <strong className="text-slate-900 dark:text-white font-mono font-bold mr-1">16676</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Link */}
        <div className="mt-3.5 pt-3 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={() => onOpenProfile(doctor)}
            className="text-xs font-black text-[#0066b2] dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer active:scale-98"
          >
            <Info className="w-3.5 h-3.5" />
            <span>عرض السيرة والخدمات والتقييمات</span>
          </button>
          <span className="text-[11px] text-slate-800 dark:text-slate-200 font-black bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-md border border-slate-300 dark:border-slate-700">
            متاح الحجز الفوري
          </span>
        </div>
      </div>

      {/* Left Column: Horizontal Multi-Day Booking Schedule */}
      <div className="w-full lg:w-80 bg-slate-50 dark:bg-slate-950 border-t lg:border-t-0 lg:border-r border-slate-200 dark:border-slate-800 p-4 sm:p-5 flex flex-col justify-between shrink-0">
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
              <CalendarCheck className="w-4 h-4 text-[#0066b2] dark:text-blue-400" />
              <span>مواعيد كشف العيادة</span>
            </span>
            <span className="text-[11px] text-slate-600 dark:text-slate-400 font-bold">الدفع في العيادة</span>
          </div>

          {/* Days Tabs Slider */}
          <div className="grid grid-cols-3 gap-1.5 mb-3 bg-white dark:bg-slate-900 p-1.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow-xs">
            {doctor.availableDays.map((d, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  setActiveDayIndex(index);
                  setSelectedSlot(d.slots[0] || null);
                }}
                className={`py-2 px-1 rounded-xl text-center transition-all duration-150 active:scale-95 cursor-pointer ${
                  activeDayIndex === index
                    ? 'bg-[#0066b2] dark:bg-blue-600 text-white shadow-xs font-black'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold'
                }`}
              >
                <span className="block text-xs leading-none">{d.dayName}</span>
                <span className="block text-[10px] opacity-90 mt-0.5 font-medium">
                  {d.dateStr.split('،')[1]?.trim() || d.dateStr}
                </span>
              </button>
            ))}
          </div>

          {/* Time Slots Chips Grid */}
          <div className="mb-4">
            <div className="text-[11px] font-black text-slate-700 dark:text-slate-300 mb-2">
              المواعيد لـ ({currentDay?.dateStr}):
            </div>

            <div className="grid grid-cols-2 gap-2 max-h-36 overflow-y-auto pr-0.5">
              {currentDay?.slots.map((slot, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSlotClick(slot)}
                  className={`text-xs py-2 px-2.5 rounded-xl border-2 font-black transition-all duration-150 active:scale-95 cursor-pointer ${
                    selectedSlot === slot
                      ? 'bg-blue-50 dark:bg-blue-600 text-[#0066b2] dark:text-white border-[#0066b2] dark:border-blue-400 shadow-xs ring-1 ring-[#0066b2] dark:ring-blue-400'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-300 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-400 hover:bg-blue-50/40 dark:hover:bg-slate-700'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Instant Booking Action Button */}
        <div>
          <button
            id={`btn-book-doctor-${doctor.id}`}
            type="button"
            onClick={handleConfirmBooking}
            disabled={!selectedSlot}
            className="w-full bg-[#0066b2] hover:bg-[#005596] dark:bg-blue-600 dark:hover:bg-blue-500 active:scale-98 text-white font-black py-3.5 px-4 rounded-2xl text-sm transition-all duration-150 shadow-md dark:shadow-[0_0_15px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 border border-transparent dark:border-blue-400/40"
          >
            <span>احجز الآن</span>
            {selectedSlot && (
              <span className="bg-white/20 text-white text-xs px-2.5 py-0.5 rounded-md font-mono font-black">
                {selectedSlot}
              </span>
            )}
          </button>

          <div className="flex items-center justify-center gap-1.5 mt-2.5 text-[11px] text-slate-600 dark:text-slate-300 text-center font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>الحجز مجاني، والدفع بالعيادة</span>
          </div>
        </div>
      </div>
    </div>
  );
};
