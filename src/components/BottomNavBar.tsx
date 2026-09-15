import React from 'react';
import { Home, Stethoscope, FileText, Calendar } from 'lucide-react';
import { ActiveView } from '../types';

interface BottomNavBarProps {
  currentView: ActiveView;
  navigate: (view: ActiveView) => void;
  bookingsCount: number;
  recordsCount: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentView,
  navigate,
  bookingsCount,
  recordsCount
}) => {
  const navItems = [
    {
      id: 'HOME' as ActiveView,
      label: 'الرئيسية',
      icon: Home
    },
    {
      id: 'SEARCH' as ActiveView,
      label: 'الأطباء',
      icon: Stethoscope
    },
    {
      id: 'RECORDS' as ActiveView,
      label: 'ملفي الطبي',
      icon: FileText,
      count: recordsCount
    },
    {
      id: 'BOOKINGS' as ActiveView,
      label: 'مواعيدي',
      icon: Calendar,
      count: bookingsCount
    }
  ];

  return (
    <nav 
      aria-label="التنقل الرئيسي للهاتف"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 border-t border-slate-200/80 dark:border-slate-800/80 shadow-[0_-4px_24px_rgba(0,0,0,0.06)] font-['Tajawal',sans-serif] select-none transition-colors duration-200"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 8px)' }}
    >
      <div className="flex items-center justify-around px-2 pt-2">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                navigate(item.id);
              }}
              className={`relative flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-2xl transition-all duration-200 active:scale-95 cursor-pointer ${
                isActive
                  ? 'text-[#0066b2] dark:text-blue-400 font-black'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium'
              }`}
            >
              {/* Active Pill Highlight */}
              {isActive && (
                <span className="absolute -top-1 w-8 h-1 bg-[#0066b2] dark:bg-blue-400 rounded-full animate-in fade-in zoom-in-50 duration-200" />
              )}

              <div className="relative p-1">
                <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110' : ''}`} />
                
                {/* Numeric Counter Badge */}
                {item.count !== undefined && item.count > 0 && (
                  <span className="absolute -top-0.5 -right-1 bg-[#0066b2] dark:bg-blue-500 text-white text-[10px] font-mono font-black min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900">
                    {item.count}
                  </span>
                )}
              </div>

              <span className={`text-[11px] mt-0.5 leading-tight ${isActive ? 'font-bold' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
