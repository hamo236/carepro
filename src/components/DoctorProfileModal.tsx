import React, { useState } from 'react';
import { 
  X, 
  Star, 
  MapPin, 
  Clock, 
  PhoneCall, 
  CheckCircle2, 
  GraduationCap, 
  Award, 
  Stethoscope,
  ShieldCheck,
  CalendarCheck,
  Building2,
  MessageSquare,
  Shield,
  ExternalLink,
  Navigation
} from 'lucide-react';
import { Doctor } from '../types';
import { DoctorAvatar } from './DoctorAvatar';
import { ClinicNavigationModal } from './ClinicNavigationModal';

interface DoctorProfileModalProps {
  doctor: Doctor | null;
  onClose: () => void;
  onBook: (doctor: Doctor, day: string, slot: string) => void;
}

export const DoctorProfileModal: React.FC<DoctorProfileModalProps> = ({
  doctor,
  onClose,
  onBook
}) => {
  if (!doctor) return null;

  const [activeDayIdx, setActiveDayIdx] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<string>(
    doctor.availableDays[0]?.slots[0] || '05:00 م'
  );
  const [showNavModal, setShowNavModal] = useState(false);

  const currentDay = doctor.availableDays[activeDayIdx] || doctor.availableDays[0];

  const handleBookNow = () => {
    onBook(doctor, currentDay.dateStr, selectedSlot);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200 font-['Tajawal',sans-serif]">
      <div 
        className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#002b49] dark:bg-slate-950 text-white p-6 relative flex items-start justify-between border-b border-slate-800">
          <div className="flex items-start gap-4">
            <DoctorAvatar
              specialtyId={doctor.specialtyId}
              gender={doctor.gender}
              verified={doctor.verified}
              size="lg"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-[#0070cd] text-white text-[11px] font-bold px-2 py-0.5 rounded">
                  {doctor.title}
                </span>
                <span className="text-xs text-blue-200 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>طبيب معتمد وموثق</span>
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-white">{doctor.name}</h2>
              <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-xl font-medium">
                {doctor.specialty}
              </p>

              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 ml-1" />
                  <span>{doctor.rating}</span>
                </div>
                <span className="text-xs text-slate-300">
                  بناءً على {doctor.reviewsCount} تقييم من مرضى حقيقيين
                </span>
              </div>
            </div>
          </div>

          <button
            id="btn-close-profile-modal"
            type="button"
            onClick={onClose}
            className="text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700 dark:text-slate-300 text-sm">
          
          {/* Quick Clinic Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-[#0070cd] dark:text-blue-400 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 block">نوع المنشأة:</span>
                <strong className="text-slate-900 dark:text-white text-sm">
                  {doctor.facilityType === 'hospital' ? 'مستشفى' : doctor.facilityType === 'polyclinic' ? 'مجمع عيادات' : 'عيادة خاصة'}
                </strong>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-[#0070cd] dark:text-blue-400 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 block">متوسط مدة الانتظار:</span>
                <strong className="text-slate-900 dark:text-white text-base">{doctor.waitingTime}</strong>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-[#0070cd] dark:text-blue-400 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 block">موقع العيادة:</span>
                <strong className="text-slate-900 dark:text-white text-sm">{doctor.city} - {doctor.area}</strong>
              </div>
            </div>
          </div>

          {/* Insurance Acceptance Section */}
          {doctor.acceptedInsurances && doctor.acceptedInsurances.length > 0 && (
            <div className="bg-blue-50/50 dark:bg-slate-800/80 p-4 rounded-2xl border border-blue-100 dark:border-slate-700">
              <h3 className="text-sm font-black text-[#002b49] dark:text-white mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#0070cd] dark:text-blue-400" />
                <span>التعاقدات وشركات التأمين المقبولة بالعيادة</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {doctor.acceptedInsurances.map((ins, i) => (
                  <span key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs px-3 py-1 rounded-lg font-medium">
                    {ins}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* About & Bio */}
          <div>
            <h3 className="text-base font-black text-[#002b49] dark:text-white mb-2 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#0070cd] dark:text-blue-400" />
              <span>نبذة عن الطبيب والخبرات</span>
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm bg-slate-50/50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
              {doctor.bio}
            </p>
          </div>

          {/* Qualifications & Degrees */}
          <div>
            <h3 className="text-base font-black text-[#002b49] dark:text-white mb-2 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-[#0070cd] dark:text-blue-400" />
              <span>الشهادات العلمية والزمالات الدولية</span>
            </h3>
            <ul className="space-y-2">
              {doctor.degrees.map((deg, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-700 dark:text-slate-300 text-xs sm:text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#0070cd] dark:text-blue-400 shrink-0 mt-0.5" />
                  <span>{deg}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Clinic Services */}
          <div>
            <h3 className="text-base font-black text-[#002b49] dark:text-white mb-3 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-[#0070cd] dark:text-blue-400" />
              <span>الخدمات الطبية والتخصصية المتاحة بالعيادة</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {doctor.services.map((srv, idx) => (
                <div key={idx} className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center gap-2 text-xs sm:text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#0070cd] dark:text-blue-400 shrink-0" />
                  <span className="font-bold text-slate-800 dark:text-slate-200">{srv.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Address & Landmarks */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-black text-[#002b49] dark:text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#0070cd] dark:text-blue-400" />
                <span>عنوان وموقع العيادة الجغرافي</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowNavModal(true)}
                className="text-xs text-[#0070cd] dark:text-blue-400 hover:underline font-bold flex items-center gap-1 bg-blue-50 dark:bg-blue-950/70 px-3 py-1.5 rounded-xl border border-blue-200/80 dark:border-blue-900/60 cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>الملاحة بالـ GPS / أوبر</span>
              </button>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
              <p className="font-bold text-slate-900 dark:text-slate-200 mb-1">{doctor.address}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{doctor.landmark}</p>
              <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-600 dark:text-slate-400">
                <span>رقم هاتف العيادة والحجز: {doctor.phone}</span>
                <span className="text-[#0070cd] dark:text-blue-400 font-bold">متاح مصعد وتجهيزات لذوي الاحتياجات</span>
              </div>
            </div>
          </div>

          {/* Verified Patient Reviews */}
          <div>
            <h3 className="text-base font-black text-[#002b49] dark:text-white mb-3 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#0070cd] dark:text-blue-400" />
              <span>آراء وتقييمات المرضى الموثقة ({doctor.reviewsCount})</span>
            </h3>
            <div className="space-y-3">
              {doctor.recentReviews.map((rev, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <strong className="text-slate-900 dark:text-slate-200 text-sm">{rev.author}</strong>
                      {rev.verifiedVisit && (
                        <span className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-[#0070cd] dark:text-blue-400" />
                          <span>زيارة محققة</span>
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-400">{rev.date}</span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(rev.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-600'}`} />
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">"{rev.comment}"</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Pinned Booking Footer */}
        <div className="bg-slate-100 dark:bg-slate-950 p-5 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Slot selector inside profile */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-black text-slate-800 dark:text-slate-200 shrink-0">اختر موعد:</span>
            <select
              value={activeDayIdx}
              onChange={(e) => {
                const idx = Number(e.target.value);
                setActiveDayIdx(idx);
                setSelectedSlot(doctor.availableDays[idx]?.slots[0] || '');
              }}
              className="bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs font-black py-2.5 px-3 rounded-xl outline-none cursor-pointer"
            >
              {doctor.availableDays.map((d, i) => (
                <option key={i} value={i}>{d.dayName} ({d.dateStr})</option>
              ))}
            </select>

            <select
              value={selectedSlot}
              onChange={(e) => setSelectedSlot(e.target.value)}
              className="bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs font-black py-2.5 px-3 rounded-xl outline-none cursor-pointer"
            >
              {currentDay.slots.map((s, i) => (
                <option key={i} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              id="btn-profile-book-action"
              type="button"
              onClick={handleBookNow}
              className="bg-[#0066b2] hover:bg-[#005596] dark:bg-blue-600 dark:hover:bg-blue-500 active:scale-95 text-white font-black text-sm px-6 py-3 rounded-xl transition-all duration-150 shadow-md dark:shadow-[0_0_16px_rgba(37,99,235,0.4)] cursor-pointer border border-transparent dark:border-blue-400/40"
            >
              تأكيد حجز الموعد الآن
            </button>
          </div>
        </div>

      </div>

      {/* Clinic Navigation & Transport Modal */}
      <ClinicNavigationModal
        isOpen={showNavModal}
        onClose={() => setShowNavModal(false)}
        doctorName={doctor.name}
        address={doctor.address}
        city={doctor.city}
        area={doctor.area}
        landmark={doctor.landmark}
      />
    </div>
  );
};
