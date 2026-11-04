import React from 'react';
import { Restroom } from '../types';
import { sound } from '../utils/audio';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  restroom: Restroom | null;
  onNavigateTo: (restroom: Restroom) => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  isOpen,
  onClose,
  restroom,
  onNavigateTo,
}) => {
  if (!isOpen || !restroom) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 select-none">
      <div className="w-full max-w-md bg-white rounded-3xl p-5 shadow-2xl border border-slate-100 space-y-4 max-h-[85vh] overflow-y-auto no-scrollbar">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 bg-[#3E8E7E]/10 text-[#3E8E7E] rounded-full">
                {restroom.category}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">{restroom.subLocation}</span>
            </div>
            <h2 className="text-lg font-extrabold text-slate-800 mt-1">{restroom.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full hover:bg-slate-100 text-slate-400 flex items-center justify-center text-xs"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
            <div className="text-[10px] text-slate-400 font-semibold">距離</div>
            <div className="text-sm font-extrabold text-slate-800 mt-0.5 font-mono">
              {restroom.distanceMeters}m
            </div>
            <div className="text-[9.5px] text-[#3E8E7E] font-bold">步行約 {restroom.walkMinutes} 分</div>
          </div>

          <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
            <div className="text-[10px] text-slate-400 font-semibold">評分 / 舒適度</div>
            <div className="text-sm font-extrabold text-amber-500 mt-0.5 flex items-center justify-center gap-1">
              <i className="fa-solid fa-star text-xs"></i>
              <span>{restroom.rating}</span>
            </div>
            <div className="text-[9.5px] text-emerald-600 font-bold">等級: {restroom.comfortBadge}</div>
          </div>

          <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
            <div className="text-[10px] text-slate-400 font-semibold">即時佔用</div>
            <div className="text-sm font-extrabold text-blue-600 mt-0.5 font-mono">
              {restroom.occupiedStalls} / {restroom.totalStalls}
            </div>
            <div className="text-[9.5px] text-blue-600 font-bold">{restroom.crowdStatus}</div>
          </div>
        </div>

        {/* Facilities Checklist */}
        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-2 text-xs">
          <span className="text-[11px] font-extrabold text-slate-800 flex items-center gap-1.5">
            <i className="fa-solid fa-list-check text-[#3E8E7E]"></i>
            設施與友善認證配置
          </span>
          <div className="grid grid-cols-2 gap-1.5 text-[11px]">
            <div className="flex items-center gap-1.5 text-slate-700">
              <i className="fa-solid fa-circle-check text-emerald-500 text-[10px]"></i>
              <span>頂天立地全隔板</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-700">
              <i className="fa-solid fa-circle-check text-emerald-500 text-[10px]"></i>
              <span>全封閉防窺安全鎖</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-700">
              <i className="fa-solid fa-circle-check text-emerald-500 text-[10px]"></i>
              <span>掩護排隊遮蔽動線</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-700">
              <i className="fa-solid fa-circle-check text-emerald-500 text-[10px]"></i>
              <span>全性別/通用廁間</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-700">
              <i className={`fa-solid text-[10px] ${restroom.accessible ? 'fa-circle-check text-emerald-500' : 'fa-circle-xmark text-slate-300'}`}></i>
              <span>無障礙平移電動門</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-700">
              <i className={`fa-solid text-[10px] ${restroom.babyCare ? 'fa-circle-check text-emerald-500' : 'fa-circle-xmark text-slate-300'}`}></i>
              <span>親子育嬰台配備</span>
            </div>
          </div>
        </div>

        {/* Cleaning Banner */}
        <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs space-y-1">
          <div className="flex items-center justify-between font-bold text-amber-900 text-[11px]">
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-broom text-amber-600"></i>
              清潔狀態
            </span>
            <span>{restroom.cleaningStatus.isCleaning ? '打掃中 (約剩 10 分)' : '良好可用'}</span>
          </div>
          <p className="text-[10.5px] text-amber-800">{restroom.cleaningStatus.recommendedAlternative}</p>
        </div>

        {/* Reviews snippet */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-800">最新如廁體驗 ({restroom.reviews.length} 則)</div>
          {restroom.reviews.slice(0, 2).map((rv) => (
            <div key={rv.id} className="p-2.5 rounded-xl bg-slate-50 text-xs border border-slate-100">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 mb-1">
                <span>{rv.author} ({rv.role})</span>
                <span className="text-amber-500">★ {rv.rating}</span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">「{rv.content}」</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={onClose}
            className="py-2.5 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs hover:bg-slate-200 transition"
          >
            關閉
          </button>
          <button
            onClick={() => {
              sound.playSuccessChime();
              onNavigateTo(restroom);
              onClose();
            }}
            className="py-2.5 rounded-xl bg-[#3E8E7E] text-white font-extrabold text-xs hover:bg-[#3E8E7E]/90 shadow-md transition flex items-center justify-center gap-1.5"
          >
            <i className="fa-solid fa-location-arrow"></i>
            <span>導航前往此處</span>
          </button>
        </div>
      </div>
    </div>
  );
};
