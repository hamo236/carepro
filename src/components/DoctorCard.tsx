import React, { useState } from 'react';
import {
  Star,
  MapPin,
  Clock,
  PhoneCall,
  ShieldCheck,
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

  const handleConfirmBooking = () => {
    if (selectedSlot && currentDay) {
      onBookSlot(doctor, currentDay.dateStr, selectedSlot);
    }
  };

  return (
    <article
      id={`doctor-card-${doctor.id}`}
      className="doctor-card-redesign font-['Tajawal',sans-serif]"
    >
      <div className="doctor-card__main">
        <header className="doctor-card__identity">
          <DoctorAvatar
            specialtyId={doctor.specialtyId}
            gender={doctor.gender}
            verified={doctor.verified}
            size="lg"
          />

          <div className="doctor-card__heading">
            <div className="doctor-card__eyebrow">
              <span>{doctor.title}</span>
              <span className="doctor-card__location">{doctor.city} · {doctor.area}</span>
            </div>

            <div className="doctor-card__name-row">
              <h3 onClick={() => onOpenProfile(doctor)}>{doctor.name}</h3>
              {onToggleFavorite && (
                <button
                  type="button"
                  onClick={() => onToggleFavorite(doctor.id)}
                  className="doctor-card__favorite"
                  title={isFavorite ? 'إزالة من المفضلة' : 'حفظ في المفضلة'}
                  aria-label={isFavorite ? 'إزالة من المفضلة' : 'حفظ في المفضلة'}
                >
                  <Bookmark className={isFavorite ? 'is-favorite' : ''} />
                </button>
              )}
            </div>

            <p className="doctor-card__specialty">{doctor.specialty}</p>

            <div className="doctor-card__rating-row">
              <span className="doctor-card__rating">
                <Star />
                <strong>{doctor.rating.toFixed(1)}</strong>
              </span>
              <button type="button" onClick={() => onOpenProfile(doctor)}>
                {doctor.reviewsCount} تقييمًا من مرضى زاروا الطبيب
              </button>
              {doctor.verified && (
                <span className="doctor-card__verified">
                  <ShieldCheck /> موثّق
                </span>
              )}
            </div>
          </div>
        </header>

        <div className="doctor-card__tags">
          {doctor.subSpecialties.slice(0, 3).map((sub, index) => (
            <span key={index}>{sub}</span>
          ))}
        </div>

        {doctor.acceptedInsurances && doctor.acceptedInsurances.length > 0 && (
          <div className="doctor-card__insurance">
            <Shield />
            <strong>يقبل التأمين:</strong>
            {doctor.acceptedInsurances.slice(0, 3).map((insurance, index) => (
              <span key={index}>{insurance}</span>
            ))}
            {doctor.acceptedInsurances.length > 3 && (
              <em>+{doctor.acceptedInsurances.length - 3}</em>
            )}
          </div>
        )}

        <div className="doctor-card__details">
          <div>
            <MapPin />
            <span><strong>{doctor.address}</strong><small>{doctor.landmark}</small></span>
          </div>
          <div>
            <Building2 />
            <span><small>نوع المنشأة</small><strong>{doctor.facilityType === 'hospital' ? 'مستشفى' : doctor.facilityType === 'polyclinic' ? 'مجمع عيادات' : 'عيادة خاصة'}</strong></span>
          </div>
          <div>
            <Clock />
            <span><small>مدة الانتظار</small><strong>{doctor.waitingTime}</strong></span>
          </div>
          <div>
            <PhoneCall />
            <span><small>للحجز هاتفيًا</small><strong>16676</strong></span>
          </div>
        </div>

        <footer className="doctor-card__footer">
          <button type="button" onClick={() => onOpenProfile(doctor)}>
            <Info />
            <span>عرض السيرة والخدمات والتقييمات</span>
            <ChevronLeft />
          </button>
          <span className="doctor-card__instant">حجز فوري</span>
        </footer>
      </div>

      <aside className="doctor-card__booking">
        <div className="doctor-card__booking-heading">
          <div>
            <CalendarCheck />
            <strong>اختر موعدك</strong>
          </div>
          <span>الدفع في العيادة</span>
        </div>

        <div className="doctor-card__days" role="tablist" aria-label="أيام الحجز">
          {doctor.availableDays.map((day, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={activeDayIndex === index}
              onClick={() => {
                setActiveDayIndex(index);
                setSelectedSlot(day.slots[0] || null);
              }}
              className={activeDayIndex === index ? 'is-active' : ''}
            >
              <strong>{day.dayName}</strong>
              <span>{day.dateStr.split('،')[1]?.trim() || day.dateStr}</span>
            </button>
          ))}
        </div>

        <div className="doctor-card__slots-label">المواعيد المتاحة لـ {currentDay?.dateStr}</div>
        <div className="doctor-card__slots">
          {currentDay?.slots.map((slot, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedSlot(slot)}
              className={selectedSlot === slot ? 'is-selected' : ''}
            >
              {slot}
            </button>
          ))}
        </div>

        <button
          id={`btn-book-doctor-${doctor.id}`}
          type="button"
          onClick={handleConfirmBooking}
          disabled={!selectedSlot}
          className="doctor-card__book-button"
        >
          <span>احجز الآن</span>
          {selectedSlot && <small>{selectedSlot}</small>}
        </button>
        <div className="doctor-card__payment-note">
          <ShieldCheck /> الحجز مجاني، والدفع بالعيادة
        </div>
      </aside>
    </article>
  );
};
