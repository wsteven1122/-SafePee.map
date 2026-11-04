import React, { useState } from 'react';
import { Restroom, FilterState } from '../types';
import { sound } from '../utils/audio';

interface Screen2CrowdProps {
  selectedRestroom: Restroom;
  filters: FilterState;
  onToggleFilter: (key: keyof FilterState) => void;
  isBookmarked: boolean;
  onToggleBookmark: (restroom: Restroom) => void;
  onOpenVoiceFilter: () => void;
}

export const Screen2Crowd: React.FC<Screen2CrowdProps> = ({
  selectedRestroom,
  filters,
  onToggleFilter,
  isBookmarked,
  onToggleBookmark,
  onOpenVoiceFilter,
}) => {
  const [showStallGrid, setShowStallGrid] = useState(false);
  const [heartAnim, setHeartAnim] = useState(false);
  const [simulatedOccupancy, setSimulatedOccupancy] = useState(selectedRestroom.occupiedStalls);

  const capacityPercent = Math.round((simulatedOccupancy / selectedRestroom.totalStalls) * 100);

  const handleToggle = (key: keyof FilterState) => {
    const next = !filters[key];
    sound.playToggleSound(next);
    onToggleFilter(key);
  };

  const handleDoubleTap = () => {
    sound.playSuccessChime();
    setHeartAnim(true);
    onToggleBookmark(selectedRestroom);
    setTimeout(() => setHeartAnim(false), 900);
  };

  return (
    <div
      onDoubleClick={handleDoubleTap}
      className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-3.5 select-none bg-slate-50 relative"
    >
      {/* Floating Animated Heart on Double Tap */}
      {heartAnim && (
        <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="text-6xl text-rose-500 animate-ping">
            <i className="fa-solid fa-heart"></i>
          </div>
        </div>
      )}

      {/* Top Title & Rating Banner */}
      <div className="bg-white rounded-3xl p-4 shadow-card border border-slate-100">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 bg-[#3E8E7E]/10 text-[#3E8E7E] rounded-full">
                GPS 已定位
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                {selectedRestroom.subLocation}
              </span>
            </div>
            <h2 className="text-lg font-extrabold text-slate-800 mt-1">{selectedRestroom.name}</h2>
          </div>

          {/* Rating & Comfort Badge */}
          <div className="text-right">
            <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 rounded-xl border border-amber-200">
              <i className="fa-solid fa-star text-amber-500 text-xs"></i>
              <span className="text-xs font-extrabold text-amber-900">{selectedRestroom.rating}</span>
            </div>
            <div className="text-[10.5px] font-bold text-emerald-600 mt-1 flex items-center justify-end gap-1">
              <i className="fa-solid fa-circle-check text-[10px]"></i>
              <span>舒適度: {selectedRestroom.comfortBadge}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Crowd-Density Widget (擁擠程度: 12 / 35 間) */}
      <div className="bg-gradient-to-br from-white to-blue-50/50 rounded-3xl p-4 shadow-card border border-blue-100 relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {/* Overlapping People Icon Widget */}
            <div className="w-10 h-10 rounded-2xl bg-blue-500 text-white flex items-center justify-center text-sm shadow-md shadow-blue-500/20">
              <i className="fa-solid fa-people-roof text-base"></i>
            </div>
            <div>
              <div className="text-[11px] font-semibold text-slate-500">即時佔用狀態</div>
              <div className="text-sm font-extrabold text-slate-800">
                擁擠程度:{' '}
                <span className="text-blue-600 font-black">{simulatedOccupancy}</span>{' '}
                <span className="text-xs text-slate-400">/ {selectedRestroom.totalStalls} 間</span>
              </div>
            </div>
          </div>
          <span
            className={`px-2.5 py-1 rounded-full text-[10.5px] font-extrabold ${
              capacityPercent > 70
                ? 'bg-rose-100 text-rose-800'
                : capacityPercent > 40
                ? 'bg-amber-100 text-amber-800'
                : 'bg-emerald-100 text-emerald-800'
            }`}
          >
            {capacityPercent > 70 ? '人流擁擠' : capacityPercent > 40 ? '正常流動' : '餘位充足'}
          </span>
        </div>

        {/* Progress Bar of Capacity */}
        <div className="w-full bg-slate-100 rounded-full h-2.5 mb-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-emerald-400 to-blue-500 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(capacityPercent, 100)}%` }}
          ></div>
        </div>

        {/* Stall Visualizer Switch */}
        <div className="flex items-center justify-between text-[10px] text-slate-500 mb-2">
          <span>容量負載: {capacityPercent}%</span>
          <button
            onClick={() => setShowStallGrid(!showStallGrid)}
            className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1"
          >
            <i className={`fa-solid ${showStallGrid ? 'fa-chevron-up' : 'fa-grid-2'}`}></i>
            <span>{showStallGrid ? '收起獨立隔間圖' : '查看 35 間即時隔間狀態'}</span>
          </button>
        </div>

        {/* Expanded Stall Grid Viewer */}
        {showStallGrid && (
          <div className="bg-white/95 p-3 rounded-2xl border border-blue-200/80 mb-3 space-y-2">
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-700">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> 綠色: 空閒可用
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span> 紅色: 使用中
              </span>
              <span className="text-slate-400">點擊模擬佔用</span>
            </div>
            <div className="grid grid-cols-7 gap-1.5 pt-1">
              {selectedRestroom.stalls.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    s.isOccupied = !s.isOccupied;
                    setSimulatedOccupancy(selectedRestroom.stalls.filter((x) => x.isOccupied).length);
                    sound.playToggleSound(s.isOccupied);
                  }}
                  className={`h-7 rounded-lg text-[10px] font-mono font-bold flex items-center justify-center transition ${
                    s.isOccupied
                      ? 'bg-rose-500 text-white shadow-xs'
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
                  }`}
                  title={`廁間 #${s.id} - ${s.isOccupied ? '使用中' : '空閒'}`}
                >
                  {s.id}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* User Sub-attributes (男性 / 特別提供子母與育嬰) */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white/90 p-2.5 rounded-2xl border border-slate-100 flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-[11px] font-bold">
              <i className="fa-solid fa-mars"></i>
            </div>
            <div>
              <div className="text-[10px] text-slate-500">男性廁間</div>
              <div className="font-extrabold text-slate-800 text-[11px]">
                {selectedRestroom.maleStalls} / {selectedRestroom.maleStalls} 間 (全可用)
              </div>
            </div>
          </div>

          <div className="bg-white/90 p-2.5 rounded-2xl border border-pink-100 flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-pink-100 text-pink-500 flex items-center justify-center text-[11px]">
              <i className="fa-solid fa-baby-carriage"></i>
            </div>
            <div>
              <div className="text-[10px] text-pink-600 font-semibold">母嬰友善</div>
              <div className="font-extrabold text-slate-800 text-[11px] leading-tight">
                {selectedRestroom.babyCare ? '特別提供子母與育嬰' : '無獨立育嬰室'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toggles for Pain Points (痛點開關過濾) */}
      <div className="bg-white rounded-3xl p-4 shadow-card border border-slate-100 space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
            <i className="fa-solid fa-shield-halved text-[#3E8E7E]"></i>
            <span>安心痛點防護篩選 (Pain-Point Filters)</span>
          </div>
          <span className="text-[10px] text-slate-400 font-medium">點擊切換</span>
        </div>

        <div className="space-y-2 text-xs">
          {/* Toggle 1: 隔板/防窺 */}
          <div
            onClick={() => handleToggle('antiPeep')}
            className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-slate-100/70 transition cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px]">
                <i className="fa-solid fa-door-closed"></i>
              </div>
              <div>
                <span className="font-bold text-slate-800">隔板 / 防窺設計</span>
                <span className="block text-[9.5px] text-slate-500">頂天立地隔板，全封閉安全門鎖</span>
              </div>
            </div>
            {/* Active Toggle Switch */}
            <div
              className={`w-9 h-5 rounded-full relative p-0.5 transition-colors flex items-center ${
                filters.antiPeep ? 'bg-[#3E8E7E]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow-xs transition-transform ${
                  filters.antiPeep ? 'ml-auto' : 'mr-auto'
                }`}
              ></div>
            </div>
          </div>

          {/* Toggle 2: 掩護/排隊 */}
          <div
            onClick={() => handleToggle('queueConcealment')}
            className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-slate-100/70 transition cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center text-[10px]">
                <i className="fa-solid fa-eye-slash"></i>
              </div>
              <div>
                <span className="font-bold text-slate-800">掩護 / 隱私排隊動線</span>
                <span className="block text-[9.5px] text-slate-500">避免視線直視排隊人群與焦慮感</span>
              </div>
            </div>
            <div
              className={`w-9 h-5 rounded-full relative p-0.5 transition-colors flex items-center ${
                filters.queueConcealment ? 'bg-[#3E8E7E]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow-xs transition-transform ${
                  filters.queueConcealment ? 'ml-auto' : 'mr-auto'
                }`}
              ></div>
            </div>
          </div>

          {/* Toggle 3: 無性別友善衝突 */}
          <div
            onClick={() => handleToggle('noGenderConflict')}
            className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-slate-100/70 transition cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center text-[10px]">
                <i className="fa-solid fa-hands-holding-circle"></i>
              </div>
              <div>
                <span className="font-bold text-slate-800">無性別友善衝突</span>
                <span className="block text-[9.5px] text-slate-500">通用獨立空間，友善多元性別群體</span>
              </div>
            </div>
            <div
              className={`w-9 h-5 rounded-full relative p-0.5 transition-colors flex items-center ${
                filters.noGenderConflict ? 'bg-[#3E8E7E]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow-xs transition-transform ${
                  filters.noGenderConflict ? 'ml-auto' : 'mr-auto'
                }`}
              ></div>
            </div>
          </div>

          {/* Toggle 4: 空地寬敞 & 不擁擠 (Dual pill style) */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => handleToggle('spacious')}
              className={`px-2.5 py-1.5 rounded-xl border font-bold text-[10.5px] flex items-center justify-between transition ${
                filters.spacious
                  ? 'border-[#3E8E7E]/40 bg-[#3E8E7E]/10 text-[#3E8E7E]'
                  : 'border-slate-200 bg-slate-50 text-slate-500'
              }`}
            >
              <span>空地寬敞</span>
              {filters.spacious && <i className="fa-solid fa-check text-[10px]"></i>}
            </button>

            <button
              onClick={() => handleToggle('notCrowded')}
              className={`px-2.5 py-1.5 rounded-xl border font-bold text-[10.5px] flex items-center justify-between transition ${
                filters.notCrowded
                  ? 'border-[#3E8E7E]/40 bg-[#3E8E7E]/10 text-[#3E8E7E]'
                  : 'border-slate-200 bg-slate-50 text-slate-500'
              }`}
            >
              <span>不擁擠 (少於5人)</span>
              {filters.notCrowded && <i className="fa-solid fa-check text-[10px]"></i>}
            </button>
          </div>
        </div>
      </div>

      {/* Audio-recognition Bar (語音篩選) */}
      <div
        onClick={onOpenVoiceFilter}
        className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl p-3 shadow-md flex items-center justify-between cursor-pointer hover:ring-2 hover:ring-[#FF7D66]/60 transition"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#FF7D66] flex items-center justify-center text-white text-xs animate-pulse">
            <i className="fa-solid fa-microphone"></i>
          </div>
          <div>
            <div className="text-[11px] font-bold">語音篩選</div>
            <div className="text-[9.5px] text-slate-300">說出「篩選」過濾擁擠廁所</div>
          </div>
        </div>
        <span className="px-2 py-1 rounded-lg bg-white/10 text-[9px] font-mono text-emerald-300 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span>點擊語音</span>
        </span>
      </div>

      {/* Double Click Prompt: 點兩次收藏 */}
      <div className="text-center py-1">
        <button
          onClick={handleDoubleTap}
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold transition ${
            isBookmarked
              ? 'bg-[#FFEBE7] text-[#FF7D66] font-bold shadow-xs'
              : 'bg-slate-200/80 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <i className={`fa-solid fa-heart text-[9px] ${isBookmarked ? 'text-[#FF7D66]' : 'text-slate-400'}`}></i>
          <span>{isBookmarked ? '已收藏此安心廁所 ★' : '點兩次收藏此安心廁所'}</span>
        </button>
      </div>
    </div>
  );
};
