import React, { useEffect, useState } from 'react';
import { Restroom } from '../types';
import { sound } from '../utils/audio';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  nearestRestroom: Restroom;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  isOpen,
  onClose,
  nearestRestroom,
}) => {
  const [distance, setDistance] = useState(nearestRestroom.distanceMeters);

  useEffect(() => {
    if (!isOpen) return;
    sound.playEmergencyBeep();
    const interval = setInterval(() => {
      setDistance((d) => Math.max(10, d - 8));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border-2 border-rose-500 rounded-3xl p-6 text-white shadow-2xl text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
        {/* Urgent Header */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-black uppercase tracking-wider animate-pulse">
          <i className="fa-solid fa-triangle-exclamation"></i>
          <span>緊急如廁導航模式 • 最高優先級</span>
        </div>

        {/* Large Arrow & Distance */}
        <div className="py-2">
          <div className="w-20 h-20 mx-auto rounded-full bg-rose-600/30 border-2 border-rose-500 flex items-center justify-center text-rose-400 text-3xl animate-bounce">
            <i className="fa-solid fa-arrow-up"></i>
          </div>
          <div className="text-4xl font-black text-rose-400 font-mono mt-3">
            {distance} <span className="text-xl text-white/70">公尺</span>
          </div>
          <div className="text-sm text-slate-300 font-semibold mt-1">
            直走前方 50m 右轉，預計 <span className="text-emerald-400 font-bold font-mono">1 分鐘內</span>抵達
          </div>
        </div>

        {/* Target Restroom Details */}
        <div className="bg-slate-800/80 rounded-2xl p-4 border border-slate-700 text-left space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-base font-extrabold text-white">{nearestRestroom.name}</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/40">
              有可用空位
            </span>
          </div>
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span>{nearestRestroom.subLocation}</span>
            <span>•</span>
            <span className="text-teal-300 font-semibold">獨立隔間防窺</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => {
              sound.playSuccessChime();
              onClose();
            }}
            className="py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition"
          >
            關閉急導航
          </button>
          <button
            onClick={() => {
              sound.playSuccessChime();
              onClose();
            }}
            className="py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs shadow-lg transition flex items-center justify-center gap-1.5"
          >
            <i className="fa-solid fa-circle-check"></i>
            <span>我已順利抵達</span>
          </button>
        </div>
      </div>
    </div>
  );
};
