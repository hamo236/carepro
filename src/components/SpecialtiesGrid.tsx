import React from 'react';
import { 
  Stethoscope, 
  Activity, 
  Sparkles, 
  Smile, 
  Baby, 
  Bone, 
  Ear, 
  Heart, 
  User, 
  Brain, 
  Eye,
  ChevronLeft,
  Search,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { SPECIALTIES } from '../data/seedData';

interface SpecialtiesGridProps {
  selectedSpecialty: string;
  onSelectSpecialty: (specialtyId: string) => void;
  onNavigateToSearch?: () => void;
  title?: string;
  subtitle?: string;
  compact?: boolean;
}

// Icon mapper for medical specialties
const getSpecialtyIcon = (iconName: string) => {
  switch (iconName) {
    case 'activity':
      return Activity;
    case 'sparkles':
      return Sparkles;
    case 'smile':
      return Smile;
    case 'baby':
      return Baby;
    case 'bone':
      return Bone;
    case 'ear':
      return Ear;
    case 'heart':
      return Heart;
    case 'user':
      return User;
    case 'brain':
      return Brain;
    case 'eye':
      return Eye;
    default:
      return Stethoscope;
  }
};

export const SpecialtiesGrid: React.FC<SpecialtiesGridProps> = ({
  selectedSpecialty,
  onSelectSpecialty,
  onNavigateToSearch,
  title = 'أقسام التخصصات الطبية',
  subtitle = 'اختر التخصص المطلوب للبحث الفوري عن أفضل الأطباء والعيادات المعتمدة',
  compact = false
}) => {
  const activeSpecialties = SPECIALTIES.filter(s => s.id !== 'all');

  return (
    <section className="w-full font-['Tajawal',sans-serif]">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-950/70 text-[#0066b2] dark:text-blue-400 text-xs font-bold px-3 py-1 rounded-full border border-blue-200/80 dark:border-blue-900/60">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>دليل التخصصات والعيادات</span>
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#002b49] dark:text-white">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              {subtitle}
            </p>
          )}
        </div>

        {onNavigateToSearch && (
          <button
            type="button"
            onClick={onNavigateToSearch}
            className="self-start sm:self-auto text-xs sm:text-sm font-bold text-[#0066b2] dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>عرض جميع الأقسام والتخصصات</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Specialties Cards Grid */}
      <div className={`grid ${
        compact 
          ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3'
          : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4'
      }`}>
        {activeSpecialties.map((spec) => {
          const IconComponent = getSpecialtyIcon(spec.icon);
          const isSelected = selectedSpecialty === spec.id;

          return (
            <button
              key={spec.id}
              type="button"
              onClick={() => onSelectSpecialty(spec.id)}
              className={`group relative p-4 sm:p-5 rounded-2xl sm:rounded-3xl border text-right transition-all duration-200 active:scale-98 flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? 'bg-[#0066b2] text-white border-[#0066b2] shadow-lg shadow-blue-500/20'
                  : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border-slate-200/90 dark:border-slate-800 hover:border-[#0066b2] dark:hover:border-blue-500 hover:shadow-md'
              }`}
            >
              {/* Icon & Badge */}
              <div className="flex items-start justify-between mb-3 w-full">
                <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-colors ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-50 dark:bg-slate-800 text-[#0066b2] dark:text-blue-400 group-hover:bg-[#0066b2] group-hover:text-white border border-slate-200/70 dark:border-slate-700'
                }`}>
                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>

                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                }`}>
                  تخصص
                </span>
              </div>

              {/* Title & Action Label */}
              <div>
                <h3 className={`font-bold text-xs sm:text-sm mb-1 leading-snug line-clamp-1 ${
                  isSelected ? 'text-white' : 'text-slate-900 dark:text-white group-hover:text-[#0066b2] dark:group-hover:text-blue-400'
                }`}>
                  {spec.name}
                </h3>
                <span className={`text-[11px] font-medium flex items-center gap-1 transition-all ${
                  isSelected ? 'text-blue-100' : 'text-slate-400 dark:text-slate-500 group-hover:text-[#0066b2] dark:group-hover:text-blue-400'
                }`}>
                  <span>بحث وحجز</span>
                  <ChevronLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
