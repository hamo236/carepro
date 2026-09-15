import React, { useState } from 'react';
import { 
  Stethoscope, 
  Calendar, 
  FileText, 
  PhoneCall, 
  Bell, 
  Menu, 
  X, 
  HelpCircle,
  ShieldCheck,
  Moon,
  Sun,
  ShieldAlert,
  Sparkles,
  ArrowUpRight,
  MapPin,
  User as UserIcon,
  Compass
} from 'lucide-react';
import { User } from 'firebase/auth';
import { ActiveView, ThemeMode, UserRole, AccessibilityPreferences } from '../types';
import { AccessibilityBar } from './AccessibilityBar';
import { RoleProtectionModal } from './RoleProtectionModal';

interface HeaderProps {
  currentView: ActiveView;
  navigate: (view: ActiveView) => void;
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  bookingsCount: number;
  recordsCount: number;
  onOpenNotifications: () => void;
  unreadNotifications: number;
  onOpenSymptomGuide: () => void;
  onOpenJoinDoctor: () => void;
  onOpenPatientHelp: () => void;
  onOpenEmergency: () => void;
  onOpenMaps?: () => void;
  onOpenAuth?: () => void;
  currentUser?: User | null;
  theme: ThemeMode;
  toggleTheme: () => void;
  accessibilityPreferences: AccessibilityPreferences;
  onUpdateAccessibility: (updated: Partial<AccessibilityPreferences>) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  navigate,
  currentRole,
  onRoleChange,
  bookingsCount,
  recordsCount,
  onOpenNotifications,
  unreadNotifications,
  onOpenSymptomGuide,
  onOpenJoinDoctor,
  onOpenPatientHelp,
  onOpenEmergency,
  onOpenMaps,
  onOpenAuth,
  currentUser,
  theme,
  toggleTheme,
  accessibilityPreferences,
  onUpdateAccessibility
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pendingProtectedRole, setPendingProtectedRole] = useState<UserRole | null>(null);

  const requestRoleSwitch = (targetRole: UserRole) => {
    if (targetRole === 'patient') {
      try {
        sessionStorage.removeItem('carepro_role_secret');
      } catch (e) {}
      onRoleChange('patient');
      if (currentView === 'DOCTOR_DASHBOARD' || currentView === 'ADMIN_DASHBOARD') {
        navigate('HOME');
      }
      return;
    }
    // If already in target role, just navigate
    if (currentRole === targetRole) {
      if (targetRole === 'doctor') navigate('DOCTOR_DASHBOARD');
      if (targetRole === 'admin') navigate('ADMIN_DASHBOARD');
      return;
    }
    // Intercept with passcode confirmation modal for security
    setPendingProtectedRole(targetRole);
  };

  const handleRoleAuthSuccess = (role: UserRole) => {
    onRoleChange(role);
    if (role === 'doctor') navigate('DOCTOR_DASHBOARD');
    if (role === 'admin') navigate('ADMIN_DASHBOARD');
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 border-b border-slate-200/80 dark:border-slate-800/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] font-['Tajawal',sans-serif] transition-colors duration-200">
      
      {/* Top Ergonomics & Utility Bar */}
      <div className="bg-[#001f35] dark:bg-slate-950 text-slate-200 text-xs py-1.5 px-4 hidden md:block border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2 text-white font-medium">
              <PhoneCall className="w-3.5 h-3.5 text-sky-400" />
              <span>الخط الساخن للحجز السريع:</span>
              <strong className="text-white tracking-wider font-mono text-sm bg-sky-900/50 text-sky-200 px-2 py-0.5 rounded-full border border-sky-700/40">16676</strong>
            </div>
            
            <button
              type="button"
              onClick={onOpenEmergency}
              className="flex items-center gap-1.5 text-white bg-rose-950/80 hover:bg-rose-900 text-rose-200 px-2.5 py-0.5 rounded-full border border-rose-700/50 transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              <span className="font-black">طوارئ وإسعاف 123</span>
            </button>
          </div>
          
          <div className="flex items-center gap-4 text-[11px]">
            {/* Visual Ergonomics Controller */}
            <AccessibilityBar
              preferences={accessibilityPreferences}
              onUpdatePreferences={onUpdateAccessibility}
            />

            {/* Role Switcher Pill Container */}
            <div className="flex items-center gap-1 bg-slate-800/90 p-0.5 rounded-full border border-slate-700/80">
              <span className="text-slate-400 text-[10px] px-2 font-medium">الواجهة:</span>
              <button
                type="button"
                onClick={() => requestRoleSwitch('patient')}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                  currentRole === 'patient'
                    ? 'bg-[#0071e3] text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                مريض
              </button>
              <button
                type="button"
                onClick={() => requestRoleSwitch('doctor')}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                  currentRole === 'doctor'
                    ? 'bg-[#0071e3] text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                عيادة / طبيب
              </button>
              <button
                type="button"
                onClick={() => requestRoleSwitch('admin')}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                  currentRole === 'admin'
                    ? 'bg-[#0071e3] text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                إدارة المنصة
              </button>
            </div>

            <span className="text-slate-600">|</span>
            <button
              type="button"
              onClick={onOpenJoinDoctor}
              className="hover:text-white cursor-pointer transition-colors text-sky-300 font-bold flex items-center gap-1"
            >
              <span>انضم كطبيب</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Apple Clean Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo with Clean Modern Typography */}
          <div 
            id="brand-logo"
            onClick={() => navigate('HOME')} 
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#005bb5] to-[#0071e3] flex items-center justify-center shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform duration-200">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-black text-2xl tracking-tight text-slate-900 dark:text-white">دكتورنا</span>
                <span className="text-[10px] font-black bg-sky-50 dark:bg-sky-950/60 text-[#0071e3] dark:text-sky-300 px-2 py-0.5 rounded-full border border-sky-200/60 dark:border-sky-800/60">
                  CLINIC PRO
                </span>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">الرعاية الصحية الرقمية الأذكى في مصر</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/70 dark:bg-slate-800/60 p-1.5 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 text-xs font-bold">
            <button 
              id="nav-home"
              onClick={() => navigate('HOME')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                currentView === 'HOME' 
                  ? 'bg-white dark:bg-slate-900 text-[#0071e3] dark:text-sky-400 shadow-xs font-black' 
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              الرئيسية
            </button>

            <button 
              id="nav-doctors"
              onClick={() => navigate('SEARCH')}
              className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                currentView === 'SEARCH' 
                  ? 'bg-white dark:bg-slate-900 text-[#0071e3] dark:text-sky-400 shadow-xs font-black' 
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Stethoscope className="w-4 h-4 opacity-70" />
              <span>دليل الأطباء</span>
            </button>

            <button 
              id="nav-records"
              onClick={() => navigate('RECORDS')}
              className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                currentView === 'RECORDS' 
                  ? 'bg-white dark:bg-slate-900 text-[#0071e3] dark:text-sky-400 shadow-xs font-black' 
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4 opacity-70" />
              <span>الملف الطبي</span>
              {recordsCount > 0 && (
                <span className="bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-[10px] font-bold px-1.5 py-0.2 rounded-full font-mono">
                  {recordsCount}
                </span>
              )}
            </button>

            {/* Doctor Portal Nav Link */}
            <button 
              id="nav-doctor-dashboard"
              onClick={() => {
                onRoleChange('doctor');
                navigate('DOCTOR_DASHBOARD');
              }}
              className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                currentView === 'DOCTOR_DASHBOARD' 
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs font-black' 
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Stethoscope className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>بوابة الطبيب</span>
            </button>

            {/* Admin Portal Nav Link */}
            <button 
              id="nav-admin-dashboard"
              onClick={() => {
                onRoleChange('admin');
                navigate('ADMIN_DASHBOARD');
              }}
              className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                currentView === 'ADMIN_DASHBOARD' 
                  ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-xs font-black' 
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>الإدارة</span>
            </button>
          </nav>

          {/* Right Action Icons & Theme Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Google Maps Grounding Explorer */}
            {onOpenMaps && (
              <button 
                id="btn-open-maps"
                onClick={onOpenMaps}
                className="hidden md:flex items-center gap-1.5 text-xs font-bold text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/60 hover:bg-sky-100 dark:hover:bg-sky-900/60 px-3 py-2 rounded-xl border border-sky-200/80 dark:border-sky-800/80 transition-all cursor-pointer shadow-xs active:scale-95"
                title="استكشاف خريطة العيادات والمستشفيات الحية عبر Google Maps"
              >
                <Compass className="w-3.5 h-3.5 text-[#0070cd] dark:text-sky-400" />
                <span>خريطة العيادات الحية</span>
              </button>
            )}

            {/* Symptom triage helper */}
            <button 
              id="nav-symptoms-guide"
              onClick={onOpenSymptomGuide}
              className="hidden xl:flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700 px-3 py-2 rounded-xl border border-slate-200/80 dark:border-slate-700/80 transition-all cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#0071e3] dark:text-sky-400" />
              <span>دليل التخصصات</span>
            </button>

            {/* Firebase User Auth Pill / Button */}
            {onOpenAuth && (
              <button
                id="btn-auth-user"
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 p-1.5 sm:px-3 sm:py-2 text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-700 transition-all cursor-pointer active:scale-95"
                title={currentUser ? `مسجل باسم ${currentUser.displayName || currentUser.email}` : 'تسجيل الدخول'}
              >
                {currentUser ? (
                  <>
                    {currentUser.photoURL ? (
                      <img 
                        src={currentUser.photoURL} 
                        alt="User" 
                        className="w-5 h-5 rounded-full object-cover border border-emerald-500" 
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-[#0070cd] text-white flex items-center justify-center text-[10px] font-bold">
                        {currentUser.displayName ? currentUser.displayName[0] : 'U'}
                      </div>
                    )}
                    <span className="hidden sm:inline text-[11px] truncate max-w-[90px]">
                      {currentUser.displayName?.split(' ')[0] || 'حسابي'}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </>
                ) : (
                  <>
                    <UserIcon className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                    <span className="hidden sm:inline text-[11px]">دخول</span>
                  </>
                )}
              </button>
            )}

            {/* Theme Toggle (Light / Dark) */}
            <button
              id="btn-theme-toggle"
              type="button"
              onClick={toggleTheme}
              className="p-2.5 text-slate-700 dark:text-slate-200 hover:text-[#0066b2] dark:hover:text-sky-300 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl transition-all cursor-pointer border border-slate-200 dark:border-slate-700 shadow-xs active:scale-95"
              title={theme === 'dark' ? 'التحويل للوضع الطبيعي (النهاري)' : 'التحويل للوضع الليلي'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-300 fill-amber-300/20" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* Notification bell */}
            <button 
              id="btn-notifications"
              onClick={onOpenNotifications}
              className="relative p-2.5 text-slate-700 dark:text-slate-200 hover:text-[#0066b2] dark:hover:text-sky-300 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl transition-all cursor-pointer border border-slate-200 dark:border-slate-700 shadow-xs active:scale-95"
              title="التنبيهات والمواعيد"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifications > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-[#0066b2] dark:bg-sky-400 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse"></span>
              )}
            </button>

            {/* My Appointments Button */}
            <button
              id="btn-my-bookings"
              onClick={() => navigate('BOOKINGS')}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all duration-150 cursor-pointer shadow-xs active:scale-95 ${
                currentView === 'BOOKINGS'
                  ? 'bg-[#0066b2] dark:bg-blue-600 text-white shadow-md dark:shadow-[0_0_14px_rgba(37,99,235,0.4)] border border-transparent dark:border-blue-400/40'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>حجوزاتي</span>
              {bookingsCount > 0 && (
                <span className="bg-white/20 dark:bg-white/20 text-current text-[11px] px-1.5 py-0.2 rounded-full font-mono font-black">
                  {bookingsCount}
                </span>
              )}
            </button>

            {/* Mobile menu hamburger */}
            <button 
              id="btn-mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          {/* Mobile Accessibility Bar */}
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 mb-2">
            <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-2">الراحة البصرية وتسهيل القراءة:</div>
            <AccessibilityBar
              preferences={accessibilityPreferences}
              onUpdatePreferences={onUpdateAccessibility}
            />
          </div>

          <div className="p-3 bg-blue-50/70 dark:bg-slate-800 rounded-2xl flex items-center justify-between text-xs text-slate-900 dark:text-slate-100 font-bold mb-2 border border-blue-100 dark:border-slate-700">
            <div className="flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-[#0071e3]" />
              <span>الخط الساخن: 16676</span>
            </div>
            <button
              onClick={() => { onOpenEmergency(); setMobileMenuOpen(false); }}
              className="bg-rose-600 text-white px-3 py-1 rounded-xl text-[11px] font-bold shadow-xs cursor-pointer"
            >
              طوارئ 123
            </button>
          </div>

          <button 
            onClick={() => { navigate('HOME'); setMobileMenuOpen(false); }}
            className="w-full text-right py-2.5 px-3.5 rounded-xl text-slate-800 dark:text-slate-200 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 text-sm cursor-pointer"
          >
            <span>الرئيسية</span>
          </button>
          <button 
            onClick={() => { navigate('SEARCH'); setMobileMenuOpen(false); }}
            className="w-full text-right py-2.5 px-3.5 rounded-xl text-slate-800 dark:text-slate-200 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 text-sm cursor-pointer"
          >
            <Stethoscope className="w-4 h-4 text-[#0071e3]" />
            <span>دليل الأطباء والعيادات</span>
          </button>
          <button 
            onClick={() => { navigate('RECORDS'); setMobileMenuOpen(false); }}
            className="w-full text-right py-2.5 px-3.5 rounded-xl text-slate-800 dark:text-slate-200 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 text-sm cursor-pointer"
          >
            <FileText className="w-4 h-4 text-slate-500" />
            <span>الملف الطبي والروشتات ({recordsCount})</span>
          </button>
          <button 
            onClick={() => { 
              requestRoleSwitch('doctor');
              setMobileMenuOpen(false); 
            }}
            className="w-full text-right py-2.5 px-3.5 rounded-xl text-emerald-700 dark:text-emerald-400 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 text-sm cursor-pointer"
          >
            <Stethoscope className="w-4 h-4" />
            <span>لوحة تحكم الطبيب والعيادة</span>
          </button>
          <button 
            onClick={() => { 
              requestRoleSwitch('admin');
              setMobileMenuOpen(false); 
            }}
            className="w-full text-right py-2.5 px-3.5 rounded-xl text-amber-700 dark:text-amber-400 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 text-sm cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>لوحة إدارة المنصة والاعتمادات</span>
          </button>
          {/* Mobile Maps and Auth Items */}
          {onOpenMaps && (
            <button 
              onClick={() => { onOpenMaps(); setMobileMenuOpen(false); }}
              className="w-full text-right py-2.5 px-3.5 rounded-xl text-sky-800 dark:text-sky-300 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 text-sm cursor-pointer"
            >
              <Compass className="w-4 h-4 text-[#0070cd]" />
              <span>خريطة العيادات والمستشفيات الحية (Google Maps)</span>
            </button>
          )}

          {onOpenAuth && (
            <button 
              onClick={() => { onOpenAuth(); setMobileMenuOpen(false); }}
              className="w-full text-right py-2.5 px-3.5 rounded-xl text-slate-800 dark:text-slate-200 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between text-sm cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <UserIcon className="w-4 h-4 text-emerald-600" />
                <span>{currentUser ? `حسابي (${currentUser.displayName || currentUser.email})` : 'تسجيل الدخول (Google Firebase)'}</span>
              </div>
              {currentUser && <span className="w-2 h-2 rounded-full bg-emerald-500"></span>}
            </button>
          )}

          <button 
            onClick={() => { onOpenSymptomGuide(); setMobileMenuOpen(false); }}
            className="w-full text-right py-2.5 px-3.5 rounded-xl text-slate-800 dark:text-slate-200 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 text-sm cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-[#0071e3]" />
            <span>دليل اختيار التخصص الطبي</span>
          </button>
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-1 text-xs">
            <button
              onClick={() => { onOpenJoinDoctor(); setMobileMenuOpen(false); }}
              className="text-right py-2 px-3 text-[#0071e3] dark:text-sky-400 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer"
            >
              انضم لشبكة أطباء وعيادات دكتورنا
            </button>
            <button
              onClick={() => { onOpenPatientHelp(); setMobileMenuOpen(false); }}
              className="text-right py-2 px-3 text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer"
            >
              مركز مساعدة المرضى والأسئلة الشائعة
            </button>
          </div>
        </div>
      )}

      {/* Role Protection Passcode Verification Modal */}
      {pendingProtectedRole && (
        <RoleProtectionModal
          isOpen={!!pendingProtectedRole}
          targetRole={pendingProtectedRole}
          onClose={() => setPendingProtectedRole(null)}
          onSuccess={(role) => {
            handleRoleAuthSuccess(role);
            setPendingProtectedRole(null);
          }}
        />
      )}
    </header>
  );
};
