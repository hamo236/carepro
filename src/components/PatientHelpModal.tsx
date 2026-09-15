import React, { useState } from 'react';
import { 
  X, 
  PhoneCall, 
  HelpCircle, 
  ShieldCheck, 
  CreditCard, 
  Calendar, 
  FileText, 
  Video,
  ChevronDown,
  CheckCircle2,
  Send
} from 'lucide-react';

interface PatientHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: any) => void;
}

export const PatientHelpModal: React.FC<PatientHelpModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [inquiryText, setInquiryText] = useState('');
  const [inquirySent, setInquirySent] = useState(false);

  if (!isOpen) return null;

  const faqs = [
    {
      q: 'كيف يتم حجز موعد في العيادة وهل الحجز مجاني؟',
      a: 'الحجز عبر منصة دكتورنا مجاني بنسبة 100% وبدون أي رسوم إضافية. يتم الدفع مباشرة في مقر العيادة بالسعر الرسمي المعلن بدون زيادة.'
    },
    {
      q: 'ماذا أفعل إذا رغبت في تعديل الموعد أو إلغائه؟',
      a: 'يمكنك التوجه مباشرة لصفحة "حجوزاتي" من القائمة العلوية والضغط على "تعديل الموعد" لاختيار يوم وساعة أخرى أو "إلغاء الموعد" مجاناً في أي وقت.'
    },
    {
      q: 'كيف تعمل خدمة الاستشارة بالفيديو وتوصيل الروشتة؟',
      a: 'بعد بدء الاستشارة بالفيديو مع الطبيب الاستشاري المناوب، يتم فحص الأعراض بالفيديو والمحادثة، ثم يصدر الطبيب روشتة إلكترونية رسمية يمكنك تحميلها كـ PDF فور انتهاء المكالمة.'
    },
    {
      q: 'أين تُحفظ الروشتات والتحاليل الطبية الخاصة بي؟',
      a: 'تُحفظ جميع تقاريرك بأمان تام في صفحة "ملفي الطبي" المشفرة حيث يمكنك مراجعتها، طباعتها، أو إظهارها لأي طبيب معالج في أي وقت.'
    }
  ];

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryText.trim()) return;
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setInquiryText('');
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto font-['Tajawal',sans-serif]">
      <div 
        className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#002b49] dark:bg-slate-950 text-white p-6 relative flex items-start justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-blue-300">
              <HelpCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black">مركز مساعدة وخدمة المرضى</h2>
              <p className="text-xs text-slate-300 dark:text-slate-400 mt-0.5">فريق دعم دكتورنا متاح لمساعدتكم 24 ساعة يومياً</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700 dark:text-slate-300">
          
          {/* Direct Hotline Box */}
          <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#0070cd] text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block">الخط الساخن للحجز السريع والمساعدة:</span>
                <strong className="text-2xl font-black text-[#002b49] dark:text-white font-mono">16676</strong>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block">بسعر المكالمة العادية من أي هاتف</span>
              </div>
            </div>
            <a
              href="tel:16676"
              className="bg-[#0070cd] hover:bg-[#005bb0] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors shrink-0"
            >
              اتصال الآن
            </a>
          </div>

          {/* Quick FAQ Accordion */}
          <div>
            <h3 className="font-black text-slate-900 dark:text-white text-sm mb-3">الأسئلة الأكثر شيوعاً</h3>
            <div className="space-y-2">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div 
                    key={idx} 
                    className="border border-slate-200 dark:border-slate-700/80 rounded-xl overflow-hidden transition-all bg-slate-50/50 dark:bg-slate-800/40"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full text-right p-3.5 flex items-center justify-between font-bold text-xs text-slate-800 dark:text-slate-200 hover:text-[#0070cd] dark:hover:text-blue-400 transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-[#0070cd]' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="p-3.5 pt-0 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-700/60 bg-white dark:bg-slate-800/80">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ask Support Box */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <h3 className="font-black text-slate-900 dark:text-white text-xs mb-2">هل لديك استفسار محدد؟ أرسله مباشرة</h3>
            {inquirySent ? (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>تم استلام رسالتك، وسيقوم فريق الدعم بالرد فوراً.</span>
              </div>
            ) : (
              <form onSubmit={handleSendInquiry} className="flex gap-2">
                <input
                  type="text"
                  placeholder="اكتب استفسارك هنا..."
                  value={inquiryText}
                  onChange={(e) => setInquiryText(e.target.value)}
                  className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-200 outline-none focus:border-[#0070cd] focus:bg-white dark:focus:bg-slate-800"
                />
                <button
                  type="submit"
                  className="bg-[#0070cd] hover:bg-[#005bb0] text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 rotate-180" />
                  <span>إرسال</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
