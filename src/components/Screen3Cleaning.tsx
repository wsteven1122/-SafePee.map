import React, { useState, useEffect } from 'react';
import { Restroom } from '../types';
import { sound } from '../utils/audio';

interface Screen3CleaningProps {
  selectedRestroom: Restroom;
  onOpenQuickReport: () => void;
  onOpenScheduleModal: () => void;
  onOpenReviewModal: () => void;
  onSelectAlternative: () => void;
}

export const Screen3Cleaning: React.FC<Screen3CleaningProps> = ({
  selectedRestroom,
  onOpenQuickReport,
  onOpenScheduleModal,
  onOpenReviewModal,
  onSelectAlternative,
}) => {
  const [minutesRemaining, setMinutesRemaining] = useState(
    selectedRestroom.cleaningStatus.minutesRemaining || 10
  );
  const [seconds, setSeconds] = useState(45);

  useEffect(() => {
    if (!selectedRestroom.cleaningStatus.isCleaning) return;
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          setMinutesRemaining((m) => Math.max(1, m - 1));
          return 59;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [selectedRestroom.cleaningStatus.isCleaning]);

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-3.5 select-none bg-slate-50">
      {/* Yellow Warning Banner: 清潔與安全狀態 */}
      <div className="bg-gradient-to-br from-amber-50 via-amber-100/60 to-yellow-50 rounded-3xl p-4 shadow-card border-2 border-amber-300 relative overflow-hidden">
        {/* Header of Banner */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-amber-200">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
            <h2 className="text-xs font-black text-amber-900 tracking-wide uppercase">
              即時清潔與安全狀態
            </h2>
          </div>
          <span className="text-[9.5px] font-bold bg-amber-200/80 text-amber-800 px-2 py-0.5 rounded-full">
            {selectedRestroom.cleaningStatus.isCleaning ? '打掃中 (Cleaning)' : '正常開放 (Clean)'}
          </span>
        </div>

        {/* Broom Icon & Sensitive Alert */}
        <div className="flex items-start gap-3 bg-white/90 p-3 rounded-2xl border border-amber-200/70 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-base shadow-xs flex-shrink-0">
            <i className="fa-solid fa-broom"></i>
          </div>
          <div className="flex-1">
            <div className="text-[12px] font-extrabold text-amber-950 leading-tight">
              {selectedRestroom.cleaningStatus.isCleaning
                ? `⚠️ 異性清潔人員正在打掃中 (${selectedRestroom.cleaningStatus.cleanerGender}清潔員)`
                : '✅ 本時段清潔作業已完成'}
            </div>
            <div className="text-[11px] text-amber-800 font-semibold mt-0.5">
              {selectedRestroom.cleaningStatus.targetGender}打掃作業 •{' '}
              <span className="text-amber-950 font-bold font-mono">
                {selectedRestroom.cleaningStatus.isCleaning
                  ? `預計 ${minutesRemaining} 分 ${seconds} 秒結束`
                  : '環境整潔已驗收'}
              </span>
            </div>
            <button
              onClick={() => {
                sound.playSuccessChime();
                onSelectAlternative();
              }}
              className="mt-2 text-[10px] bg-amber-50 hover:bg-amber-100 text-amber-900 px-2 py-1 rounded-lg border border-amber-200/80 font-medium w-full text-left flex items-center justify-between transition cursor-pointer"
            >
              <span>{selectedRestroom.cleaningStatus.recommendedAlternative}</span>
              <i className="fa-solid fa-arrow-right text-[10px] text-amber-700"></i>
            </button>
          </div>
        </div>

        {/* Safety Status Indicator: 無隔板限制: 女性 */}
        <div className="mt-2.5 flex items-center justify-between text-[11px] bg-white/70 px-3 py-2 rounded-xl">
          <span className="font-bold text-slate-700 flex items-center gap-1.5">
            <i className="fa-solid fa-lock-open text-[#FF7D66]"></i>
            安全性檢視狀態
          </span>
          <span className="font-black text-[#FF7D66] bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">
            {selectedRestroom.cleaningStatus.safetyInspectionStatus}
          </span>
        </div>
      </div>

      {/* Interactive Feedback Panel (互動回饋) */}
      <div className="bg-white rounded-3xl p-4 shadow-card border border-slate-100 space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
            <i className="fa-solid fa-mobile-screen-button text-[#3E8E7E]"></i>
            <span>快捷回報與日程 (Quick Actions)</span>
          </div>
          <span className="text-[9.5px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold">
            感應支援
          </span>
        </div>

        {/* Shake Phone Quick Report Action */}
        <div
          onClick={() => {
            sound.playSuccessChime();
            onOpenQuickReport();
          }}
          className="p-3 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 flex items-center justify-between cursor-pointer hover:bg-emerald-100/50 transition"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#3E8E7E] text-white flex items-center justify-center text-sm shadow-xs">
              <i className="fa-solid fa-hand-holding-hand"></i>
            </div>
            <div>
              <div className="text-[11.5px] font-extrabold text-slate-800">搖一搖手機快速回報</div>
              <div className="text-[10px] text-[#3E8E7E] font-semibold">隨手一搖回報無衛生紙或髒污</div>
            </div>
          </div>
          <span className="w-6 h-6 rounded-full bg-white text-[#3E8E7E] flex items-center justify-center text-xs shadow-xs">
            <i className="fa-solid fa-chevron-right text-[10px]"></i>
          </span>
        </div>

        {/* Swipe up for Schedule Action */}
        <div
          onClick={() => {
            sound.playSuccessChime();
            onOpenScheduleModal();
          }}
          className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition"
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-arrow-up"></i>
            </div>
            <span className="text-[11px] font-bold text-slate-700">向上滑動查看詳細打掃日程</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">10:00 / 14:00 / 18:00</span>
        </div>
      </div>

      {/* User Reviews & Pain-point Verification (用戶評價) */}
      <div className="bg-white rounded-3xl p-4 shadow-card border border-slate-100 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
            <i className="fa-solid fa-comments text-[#3E8E7E]"></i>
            <span>用戶安心評價 (User Reviews)</span>
          </div>
          <button
            onClick={onOpenReviewModal}
            className="text-[10.5px] font-bold text-[#3E8E7E] hover:underline flex items-center gap-1"
          >
            <span>{selectedRestroom.reviews.length} 則真實廁評</span>
            <i className="fa-solid fa-pen text-[9px]"></i>
          </button>
        </div>

        {/* Reviews List */}
        <div className="space-y-2">
          {selectedRestroom.reviews.map((rv) => (
            <div key={rv.id} className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${rv.avatarBg}`}
                  >
                    {rv.avatarInitial}
                  </div>
                  <span className="text-[11px] font-bold text-slate-700">
                    {rv.author} <span className="text-[9px] text-slate-400 font-normal">({rv.role})</span>
                  </span>
                </div>
                <div className="flex items-center gap-0.5 text-amber-400 text-[10px]">
                  {Array.from({ length: 5 }, (_, idx) => (
                    <i
                      key={idx}
                      className={`fa-solid ${
                        idx < Math.floor(rv.rating)
                          ? 'fa-star'
                          : idx < rv.rating
                          ? 'fa-star-half-stroke'
                          : 'fa-star text-slate-200'
                      }`}
                    ></i>
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-slate-700 font-semibold leading-relaxed">「{rv.content}」</p>
              <div className="flex flex-wrap items-center gap-1 pt-0.5">
                {rv.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-0.5 rounded-md bg-emerald-100/70 text-emerald-800 text-[9.5px] font-bold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Add Review Button */}
        <button
          onClick={onOpenReviewModal}
          className="w-full py-2 bg-[#3E8E7E]/10 hover:bg-[#3E8E7E]/15 text-[#3E8E7E] rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 border border-[#3E8E7E]/20"
        >
          <i className="fa-solid fa-plus text-xs"></i>
          <span>新增此廁所如廁體驗評價</span>
        </button>
      </div>
    </div>
  );
};
