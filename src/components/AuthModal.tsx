import React, { useState } from 'react';
import { 
  User as UserIcon, 
  LogOut, 
  LogIn, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  Cloud,
  X
} from 'lucide-react';
import { User } from 'firebase/auth';
import { loginWithGoogle, logoutUser } from '../firebase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      await loginWithGoogle();
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'تعذر إتمام تسجيل الدخول عبر جوجل');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    setError(null);
    try {
      await logoutUser();
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'تعذر تسجيل الخروج');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200 font-['Tajawal',sans-serif]">
      <div 
        className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#002b49] dark:bg-slate-950 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#0070cd] dark:text-blue-400" />
            <h3 className="font-black text-base">
              {currentUser ? 'حساب المريض والملف السحابي' : 'تسجيل الدخول إلى دكتورنا'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {currentUser ? (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50/70 dark:bg-slate-800/80 rounded-2xl border border-blue-200/80 dark:border-slate-700 flex items-center gap-4">
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName || 'User'}
                    className="w-14 h-14 rounded-2xl border-2 border-white dark:border-slate-700 shadow-sm object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-2xl bg-[#0070cd] text-white flex items-center justify-center font-bold text-xl">
                    {currentUser.displayName ? currentUser.displayName[0] : 'U'}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                      {currentUser.displayName || 'مريض دكتورنا'}
                    </h4>
                    <span className="text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full">
                      موثق بـ Firebase
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                    {currentUser.email}
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-2">
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold">
                  <Cloud className="w-4 h-4" />
                  <span>المزامنة السحابية الدائمة مفعلة (Firestore)</span>
                </div>
                <p className="leading-relaxed">
                  يتم حفظ مواعيد كشوفاتك، الروشتات الطبية، وبيانات المتابعة بأمان تام عبر قاعدة بيانات Firebase السحابية.
                </p>
              </div>

              <button
                type="button"
                onClick={handleSignOut}
                disabled={loading}
                className="w-full bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/40 text-rose-700 dark:text-rose-300 font-bold text-xs py-3 px-4 rounded-xl border border-rose-200 dark:border-rose-900 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <LogOut className="w-4 h-4" />
                <span>{loading ? 'جاري تسجيل الخروج...' : 'تسجيل الخروج من الحساب'}</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4 text-center">
              <div className="w-14 h-14 bg-blue-50 dark:bg-slate-800 text-[#0070cd] dark:text-blue-400 rounded-3xl flex items-center justify-center mx-auto border border-blue-200 dark:border-slate-700 shadow-xs">
                <UserIcon className="w-7 h-7" />
              </div>

              <div>
                <h4 className="text-base font-black text-slate-900 dark:text-white">
                  احفظ مواعيدك وملفك الصحي بأمان
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  سجل الدخول فوراً بضغطة واحدة باستخدام حساب Google لمزامنة حجوزاتك، الروشتات والتحاليل عبر سحابة Firebase المعتمدة.
                </p>
              </div>

              {error && (
                <div className="p-3 bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 text-xs font-bold rounded-xl border border-rose-200 dark:border-rose-900 text-right">
                  {error}
                </div>
              )}

              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold text-xs sm:text-sm py-3.5 px-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 transition-all flex items-center justify-center gap-3 cursor-pointer shadow-sm hover:border-[#0070cd] disabled:opacity-50"
              >
                {/* Google multi-color G logo */}
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15Z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"
                  />
                </svg>
                <span>{loading ? 'جاري الاتصال بـ Google...' : 'المتابعة والتسجيل بحساب Google'}</span>
              </button>

              <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>تسجيل آمن ومشفر بنسبة 100% عبر Firebase Authentication</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
