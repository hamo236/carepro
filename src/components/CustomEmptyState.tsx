import React from 'react';
import { 
  Search, 
  CalendarX2, 
  FolderOpen, 
  Stethoscope, 
  RotateCcw, 
  UserPlus, 
  Sparkles,
  ArrowLeft,
  FilePlus2,
  Clock,
  FilterX
} from 'lucide-react';

interface EmptyStateProps {
  type: 'search' | 'appointments' | 'appointments-past' | 'records' | 'records-filtered' | 'notifications';
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  secondaryActionText?: string;
  onSecondaryAction?: () => void;
  extraSuggestions?: string[];
  onSuggestionClick?: (s: string) => void;
}

export const CustomEmptyState: React.FC<EmptyStateProps> = ({
  type,
  title,
  description,
  actionText,
  onAction,
  secondaryActionText,
  onSecondaryAction,
  extraSuggestions,
  onSuggestionClick
}) => {
  // Visual config based on type
  const config = {
    search: {
      icon: Search,
      iconColor: 'text-[#0066b2] dark:text-blue-400',
      iconBg: 'bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-900',
      defaultTitle: 'لم نجد أطباء أو عيادات تطابق هذه الخيارات',
      defaultDesc: 'حاول توسيع نطاق البحث باختيار منطقة مجاورة، أو إزالة بعض الفلاتر (مثل التأمين أو المواعيد اليومية) لمشاهدة جميع الأطباء المتاحين.',
      defaultBtn: 'إعادة تعيين جميع الفلاتر',
    },
    appointments: {
      icon: CalendarX2,
      iconColor: 'text-[#0066b2] dark:text-blue-400',
      iconBg: 'bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-900',
      defaultTitle: 'لا توجد مواعيد قادمة مجدولة حتى الآن',
      defaultDesc: 'يمكنك تصفح أفضل الاستشاريين والأخصائيين المعتمدين وحجز كشفك في أقل من دقيقة مع الدفع بالعيادة وبدون أي رسوم إضافية.',
      defaultBtn: 'ابحث عن طبيب واحجز الآن',
    },
    'appointments-past': {
      icon: Clock,
      iconColor: 'text-slate-500 dark:text-slate-400',
      iconBg: 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700',
      defaultTitle: 'لا توجد زيارات سابقة مسجلة في سجلك',
      defaultDesc: 'عند إتمامك لأي زيارة أو كشف طبي مع أطباء كير برو، ستظهر تفاصيل الزيارة والروشتة هنا تلقائياً للرجوع إليها مستقبلاً.',
      defaultBtn: 'تصفح قائمة الأطباء',
    },
    records: {
      icon: FolderOpen,
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      iconBg: 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-900',
      defaultTitle: 'ملفك الطبي الرقمي فارغ حالياً',
      defaultDesc: 'احتفظ بجميع الروشتات، نتائج التحاليل، وفحوصات الأشعة في مكان واحد مؤمن لتتمكن من مشاركتها بسهولة مع طبيبك بضغطة زر.',
      defaultBtn: 'إضافة أول روشتة أو تقرير',
    },
    'records-filtered': {
      icon: FilterX,
      iconColor: 'text-amber-600 dark:text-amber-400',
      iconBg: 'bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-900',
      defaultTitle: 'لا توجد ملفات طبية في هذا القسم المحدد',
      defaultDesc: 'لم يتم العثور على أي مستندات تحت هذا التصنيف، يمكنك إضافة مستند جديد أو الانتقال لعرض جميع السجلات.',
      defaultBtn: 'إضافة مستند جديد',
    },
    notifications: {
      icon: Sparkles,
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      iconBg: 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-900',
      defaultTitle: 'أنت على اطلاع دائم! لا توجد تنبيهات جديدة',
      defaultDesc: 'سنقوم بتنبيهك تلقائياً عند اقتراب مواعيد كشوفاتك القادمة أو عند صدور نتائج جديدة لملفك الصحي.',
      defaultBtn: 'العودة للرئيسية',
    }
  }[type];

  const IconComponent = config.icon;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 text-center shadow-xs max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-200 font-['Tajawal',sans-serif]">
      {/* Icon Badge */}
      <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-3xl ${config.iconBg} border flex items-center justify-center mx-auto mb-5 shadow-xs`}>
        <IconComponent className={`w-8 h-8 sm:w-10 sm:h-10 ${config.iconColor}`} />
      </div>

      {/* Main Title & Subtext */}
      <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mb-2 leading-snug">
        {title || config.defaultTitle}
      </h3>
      
      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed mb-6 font-medium">
        {description || config.defaultDesc}
      </p>

      {/* Optional Quick Suggestion Chips (e.g. for search keywords) */}
      {extraSuggestions && extraSuggestions.length > 0 && onSuggestionClick && (
        <div className="mb-6 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-2">
            اقتراحات شائعة للبحث السريع:
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {extraSuggestions.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSuggestionClick(item)}
                className="text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 hover:text-[#0066b2] dark:hover:text-blue-300 text-slate-700 dark:text-slate-200 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        {onAction && (
          <button
            type="button"
            onClick={onAction}
            className="w-full sm:w-auto bg-[#0066b2] hover:bg-[#005596] dark:bg-blue-600 dark:hover:bg-blue-500 active:scale-95 text-white text-xs sm:text-sm font-black py-3 px-6 rounded-2xl transition-all shadow-md dark:shadow-[0_0_16px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2 cursor-pointer border border-transparent dark:border-blue-400/40"
          >
            {type === 'search' && <RotateCcw className="w-4 h-4" />}
            {type === 'appointments' && <Stethoscope className="w-4 h-4" />}
            {type === 'records' && <FilePlus2 className="w-4 h-4" />}
            <span>{actionText || config.defaultBtn}</span>
          </button>
        )}

        {onSecondaryAction && secondaryActionText && (
          <button
            type="button"
            onClick={onSecondaryAction}
            className="w-full sm:w-auto bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-bold py-3 px-6 rounded-2xl transition-all border border-slate-300 dark:border-slate-700 flex items-center justify-center gap-2 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>{secondaryActionText}</span>
          </button>
        )}
      </div>
    </div>
  );
};
