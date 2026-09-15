import React from 'react';
import { Stethoscope, PhoneCall, ShieldCheck, Heart, UserPlus, HelpCircle } from 'lucide-react';
import { ActiveView } from '../types';

interface FooterProps {
  navigate: (view: ActiveView) => void;
  onSelectSpecialty: (specId: string) => void;
  onSelectArea: (city: string, area: string) => void;
  onOpenJoinDoctor: () => void;
  onOpenPatientHelp: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  navigate, 
  onSelectSpecialty, 
  onSelectArea,
  onOpenJoinDoctor,
  onOpenPatientHelp
}) => {
  return (
    <footer className="bg-[#001e33] text-slate-300 font-['Tajawal',sans-serif] border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          
          {/* Brand & Hotline */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0070cd] rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div>
                <span className="font-black text-xl text-white">دكتورنا <span className="text-[#0070cd]">كلينك</span></span>
                <span className="block text-[10px] text-slate-400">منصة حجز الأطباء والعيادات الأولى</span>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed max-w-sm text-xs">
              دكتورنا هي منصة الرعاية الصحية الرائدة في مصر والشرق الأوسط، تتيح للمرضى البحث عن أفضل الأطباء والعيادات والمستشفيات وحجز المواعيد مجاناً وبكل أمان.
            </p>

            <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/80 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">للحجز هاتفياً وخدمة المرضى:</span>
                  <strong className="text-white font-mono text-base font-bold">16676</strong>
                  <span className="text-[10px] text-slate-400 mr-2">(سعر المكالمة العادية 24/7)</span>
                </div>
              </div>
              <button
                onClick={onOpenPatientHelp}
                className="bg-[#0070cd] hover:bg-[#005bb0] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shrink-0"
              >
                مركز المساعدة
              </button>
            </div>
          </div>

          {/* Specialties Column */}
          <div>
            <h4 className="font-bold text-white mb-3 text-sm">أشهر التخصصات الطبية</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button 
                  onClick={() => { onSelectSpecialty('internal'); navigate('SEARCH'); }}
                  className="hover:text-white transition-colors cursor-pointer text-right"
                >
                  أمراض الباطنة والجهاز الهضمي
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onSelectSpecialty('dermatology'); navigate('SEARCH'); }}
                  className="hover:text-white transition-colors cursor-pointer text-right"
                >
                  الجلدية والتجميل والليزر
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onSelectSpecialty('dentistry'); navigate('SEARCH'); }}
                  className="hover:text-white transition-colors cursor-pointer text-right"
                >
                  طب وجراحة الأسنان
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onSelectSpecialty('pediatrics'); navigate('SEARCH'); }}
                  className="hover:text-white transition-colors cursor-pointer text-right"
                >
                  طب الأطفال وحديثي الولادة
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onSelectSpecialty('orthopedics'); navigate('SEARCH'); }}
                  className="hover:text-white transition-colors cursor-pointer text-right"
                >
                  جراحة العظام والمفاصل
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onSelectSpecialty('cardiology'); navigate('SEARCH'); }}
                  className="hover:text-white transition-colors cursor-pointer text-right"
                >
                  أمراض القلب والأوعية الدموية
                </button>
              </li>
            </ul>
          </div>

          {/* Cities Column */}
          <div>
            <h4 className="font-bold text-white mb-3 text-sm">العيادات حسب المحافظة</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button 
                  onClick={() => { onSelectArea('القاهرة', 'مصر الجديدة'); navigate('SEARCH'); }}
                  className="hover:text-white transition-colors cursor-pointer text-right"
                >
                  أطباء مصر الجديدة
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onSelectArea('القاهرة', 'مدينة نصر'); navigate('SEARCH'); }}
                  className="hover:text-white transition-colors cursor-pointer text-right"
                >
                  أطباء مدينة نصر
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onSelectArea('القاهرة', 'المعادي'); navigate('SEARCH'); }}
                  className="hover:text-white transition-colors cursor-pointer text-right"
                >
                  أطباء المعادي
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onSelectArea('الجيزة', 'الدقي'); navigate('SEARCH'); }}
                  className="hover:text-white transition-colors cursor-pointer text-right"
                >
                  أطباء الدقي والمهندسين
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onSelectArea('الجيزة', 'الشيخ زايد'); navigate('SEARCH'); }}
                  className="hover:text-white transition-colors cursor-pointer text-right"
                >
                  أطباء الشيخ زايد و ٦ أكتوبر
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onSelectArea('الإسكندرية', 'سموحة'); navigate('SEARCH'); }}
                  className="hover:text-white transition-colors cursor-pointer text-right"
                >
                  أطباء سموحة بالإسكندرية
                </button>
              </li>
            </ul>
          </div>

          {/* Patient Services & Providers */}
          <div>
            <h4 className="font-bold text-white mb-3 text-sm">خدمات المرضى والشبكة</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => navigate('SEARCH')} className="hover:text-white cursor-pointer text-right">
                  حجز كشف عيادة
                </button>
              </li>
              <li>
                <button onClick={() => navigate('RECORDS')} className="hover:text-white cursor-pointer text-right">
                  الملف الطبي والروشتات الرقمية
                </button>
              </li>
              <li>
                <button onClick={() => navigate('BOOKINGS')} className="hover:text-white cursor-pointer text-right">
                  متابعة وتأكيد الحجوزات
                </button>
              </li>
              <li className="pt-2 border-t border-slate-800">
                <button 
                  onClick={onOpenJoinDoctor}
                  className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1.5 cursor-pointer text-right"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>انضم كطبيب أو عيادة</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenPatientHelp} 
                  className="hover:text-white cursor-pointer text-right"
                >
                  شروط الاستخدام والخصوصية
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#0070cd]" />
            <span>جميع حقوق الملكية والعلامة التجارية محفوظة لمنصة دكتورنا كلينك © 2026</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onOpenPatientHelp} className="hover:text-slate-400 cursor-pointer">سياسة حماية بيانات المرضى</button>
            <span>•</span>
            <button onClick={onOpenPatientHelp} className="hover:text-slate-400 cursor-pointer">ميثاق شرف الممارسة الطبية</button>
            <span>•</span>
            <button onClick={onOpenPatientHelp} className="hover:text-slate-400 cursor-pointer">تواصل معنا</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
