import React, { useState, useEffect, useCallback } from 'react';
import { 
  Users, 
  Clock, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Volume2, 
  VolumeX,
  ChevronRight,
  MapPin,
  Sparkles,
  Stethoscope,
  Bell
} from 'lucide-react';
import { Booking, ClinicQueueState, ClinicQueueDrift } from '../types';
import { apiService } from '../services/apiService';
import { getClinicDrift } from '../services/smartScheduleEngine';

interface LiveClinicQueueTrackerProps {
  booking: Booking;
  compact?: boolean;
}

export const LiveClinicQueueTracker: React.FC<LiveClinicQueueTrackerProps> = ({
  booking,
  compact = false
}) => {
  const userTicketNumber = booking.queueNumber || 1;
  const [queueState, setQueueState] = useState<ClinicQueueState | null>(null);
  const [driftInfo, setDriftInfo] = useState<ClinicQueueDrift | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [hasNotifiedTurn, setHasNotifiedTurn] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchQueue = useCallback(async (isManual = false) => {
    if (isManual) setIsRefreshing(true);
    try {
      const live = await apiService.getClinicQueue(booking.doctorId);
      setQueueState(live);
      setDriftInfo(getClinicDrift(booking.doctorId));
      setFetchError(null);

      // Sound / Visual chime when it's the patient's turn
      if (
        (live.currentServingTicket === userTicketNumber || booking.status === 'in_consultation') && 
        soundEnabled && 
        !hasNotifiedTurn
      ) {
        try {
          const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
          osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.15); // A5
          gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
          osc.start();
          osc.stop(audioCtx.currentTime + 0.5);
          setHasNotifiedTurn(true);
        } catch {
          // audio autoplay might be restricted
        }
      }
    } catch (e: any) {
      console.error('Error fetching live queue:', e);
      setFetchError('تعذر تحديث طابور العيادة المباشر حالياً. يتم عرض بيانات الانتظار المسجلة.');
    } finally {
      if (isManual) setIsRefreshing(false);
    }
  }, [booking.doctorId, booking.status, userTicketNumber, soundEnabled, hasNotifiedTurn]);

  useEffect(() => {
    fetchQueue(false);
    // Real-time live polling every 12 seconds
    const interval = setInterval(() => {
      fetchQueue(false);
    }, 12000);
    return () => clearInterval(interval);
  }, [fetchQueue]);

  const currentServing = queueState ? queueState.currentServingTicket : (booking.status === 'in_consultation' ? userTicketNumber : Math.max(1, userTicketNumber - 1));
  const isMyTurn = booking.status === 'in_consultation' || currentServing === userTicketNumber;
  const isCompleted = booking.status === 'completed';
  const patientsAhead = isCompleted ? 0 : Math.max(0, userTicketNumber - currentServing);
  const baseMinutesWait = patientsAhead * 12; // 12 mins per patient average
  const totalEstimatedWait = baseMinutesWait + (driftInfo?.isDelayed ? driftInfo.delayMinutes : 0);


  const handleManualRefresh = () => {
    fetchQueue(true);
  };

  if (compact) {
    return (
      <div className="bg-blue-50/70 dark:bg-slate-800/80 border border-blue-200/80 dark:border-slate-700 rounded-2xl p-3 flex items-center justify-between gap-3 text-xs font-['Tajawal',sans-serif]">
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-xl text-white flex items-center justify-center font-mono font-black text-xs shadow-xs ${
            isMyTurn ? 'bg-emerald-600 animate-pulse' : isCompleted ? 'bg-slate-500' : 'bg-[#0070cd]'
          }`}>
            #{userTicketNumber}
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
              <span>الدور الحالي بالعيادة:</span>
              <span className="font-mono text-[#0070cd] dark:text-blue-400 font-black">#{currentServing}</span>
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
              {isCompleted ? 'اكتملت الزيارة الطبية' : isMyTurn ? 'حان دورك للدخول إلى غرفة الكشف الآن!' : `أمامك ${patientsAhead} مرضى • الانتظار ~ ${totalEstimatedWait} دقيقة`}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleManualRefresh}
          className="p-1.5 text-slate-400 hover:text-[#0070cd] dark:hover:text-blue-400 transition-colors cursor-pointer"
          title="تحديث الدور المباشر"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50/90 via-white to-blue-50/50 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 rounded-3xl border-2 border-blue-200 dark:border-slate-800 p-5 shadow-sm font-['Tajawal',sans-serif]">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-blue-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-[#0070cd] text-white flex items-center justify-center shadow-xs">
              <Users className="w-4 h-4" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </div>
          <div>
            <h4 className="text-sm font-black text-[#002b49] dark:text-white flex items-center gap-1.5">
              <span>متابعة طابور العيادة المباشر</span>
              <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">
                مباشر LIVE
              </span>
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">تحديث حي ومباشر مع نظام إدارة عيادة الطبيب</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-1.5 rounded-xl border transition-colors cursor-pointer ${
              soundEnabled 
                ? 'bg-blue-100 dark:bg-blue-900/40 text-[#0070cd] dark:text-blue-300 border-blue-300' 
                : 'bg-white dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'
            }`}
            title={soundEnabled ? 'التنبيه الصوتي مفعّل' : 'تفعيل التنبيه الصوتي عند حلول دورك'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          <button
            type="button"
            onClick={handleManualRefresh}
            className="flex items-center gap-1 text-xs text-[#0070cd] dark:text-blue-400 bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 px-2.5 py-1.5 rounded-xl border border-blue-200/80 dark:border-slate-700 transition-colors font-bold cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>تحديث</span>
          </button>
        </div>
      </div>

      {fetchError && (
        <div className="mt-3 p-2.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded-xl text-amber-800 dark:text-amber-300 text-xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
            <span>{fetchError}</span>
          </div>
          <button 
            type="button"
            onClick={() => fetchQueue(true)} 
            className="underline font-bold text-amber-900 dark:text-amber-200 hover:text-amber-700 cursor-pointer text-[11px] shrink-0"
          >
            إعادة التحديث
          </button>
        </div>
      )}

      {/* Main Queue Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-4">
        {/* User Ticket */}
        <div className={`bg-white dark:bg-slate-800/90 p-3.5 rounded-2xl border-2 shadow-xs text-center ${
          isMyTurn ? 'border-emerald-500 ring-2 ring-emerald-400/30' : 'border-[#0070cd]/30 dark:border-blue-900/60'
        }`}>
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">رقم تذكرتك</span>
          <div className="font-mono text-2xl font-black text-[#0070cd] dark:text-blue-400">
            #{userTicketNumber}
          </div>
          <span className="text-[10px] text-slate-600 dark:text-slate-300 font-bold">المريض: {booking.patientName}</span>
        </div>

        {/* Current Serving */}
        <div className="bg-white dark:bg-slate-800/90 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs text-center">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">الدور الحالي بالعيادة</span>
          <div className="font-mono text-2xl font-black text-emerald-600 dark:text-emerald-400">
            #{currentServing}
          </div>
          <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-bold">
            {isMyTurn ? 'أنت داخل الكشف الآن' : 'في غرفة الكشف الآن'}
          </span>
        </div>

        {/* Patients Ahead */}
        <div className="col-span-2 sm:col-span-1 bg-white dark:bg-slate-800/90 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs text-center flex flex-col justify-center">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block mb-1">المتبقي أمامك</span>
          <div className={`font-mono text-xl font-black ${isMyTurn ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-800 dark:text-slate-200'}`}>
            {isCompleted ? 'مكتمل' : isMyTurn ? 'دورك الآن!' : `${patientsAhead} مرضى`}
          </div>
          <span className="text-[10px] text-slate-600 dark:text-slate-400 font-bold">
            {isCompleted ? 'شكراً لزيارتكم' : isMyTurn ? 'تفضل بالدخول' : `~ ${totalEstimatedWait} دقيقة متوقعة`}
          </span>
        </div>
      </div>

      {/* Delay Alert Broadcast if active */}
      {driftInfo?.isDelayed && !isCompleted && (
        <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-800 rounded-2xl text-amber-900 dark:text-amber-200 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="font-bold flex items-center justify-between">
              <span>تنويه من العيادة: تأخير متوقع قرابة ({driftInfo.delayMinutes} دقيقة)</span>
              <span className="text-[10px] bg-amber-200/70 dark:bg-amber-900 text-amber-900 dark:text-amber-200 px-2 py-0.5 rounded-md">
                معدّل
              </span>
            </div>
            <p className="text-[11px] text-amber-800 dark:text-amber-300 mt-0.5">
              {driftInfo.doctorMessage || 'تم تحديث ميعاد الدخول التقديري تلقائياً لتجنب الانتظار الطويل داخل العيادة.'}
            </p>
          </div>
        </div>
      )}

      {/* Visual Queue Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 font-bold">
          <span>حالة الدور:</span>
          <span className={isMyTurn ? 'text-emerald-600 font-black' : ''}>
            {isCompleted ? 'انتهى الكشف' : isMyTurn ? 'حان دورك للدخول!' : patientsAhead === 1 ? 'أنت التالي مباشرة' : 'في قائمة الانتظار'}
          </span>
        </div>
        <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${
              isMyTurn 
                ? 'bg-emerald-500 animate-pulse' 
                : 'bg-gradient-to-r from-[#0070cd] to-emerald-500'
            }`}
            style={{ 
              width: isCompleted 
                ? '100%' 
                : `${Math.min(100, Math.max(10, (currentServing / Math.max(1, userTicketNumber)) * 100))}%` 
            }}
          />
        </div>
      </div>

      {/* Advisory status */}
      <div className="mt-3.5 pt-3 border-t border-blue-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-[#0070cd] dark:text-blue-400 shrink-0" />
          <span>يرجى التواجد بقاعة الاستقبال قبل موعدك بـ 10 دقائق</span>
        </div>
        <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
          <span>متصل بالعيادة</span>
        </span>
      </div>
    </div>
  );
};

