import React from 'react';

interface HeaderBannerProps {
  viewMode: 'presentation' | 'mobile';
  setViewMode: (mode: 'presentation' | 'mobile') => void;
  isEmergencyMode: boolean;
  setIsEmergencyMode: (emergency: boolean) => void;
  onOpenOriginalSpec: () => void;
  onOpenGestureSandbox: () => void;
  anxietyRadarActive: boolean;
  setAnxietyRadarActive: (active: boolean) => void;
  isProUnlocked: boolean;
  onOpenPaywall: () => void;
}

export const HeaderBanner: React.FC<HeaderBannerProps> = ({
  viewMode,
  setViewMode,
  isEmergencyMode,
  setIsEmergencyMode,
  onOpenOriginalSpec,
  onOpenGestureSandbox,
  anxietyRadarActive,
  setAnxietyRadarActive,
  isProUnlocked,
  onOpenPaywall,
}) => {
  return (
    <header className="max-w-7xl mx-auto mb-6 text-center select-none">
      {/* Team & Category Badge */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-2.5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3E8E7E]/10 text-[#3E8E7E] font-bold text-xs uppercase tracking-wider shadow-xs">
          <i className="fa-solid fa-restroom"></i>
          <span>第六組作品 • 性別友善與安心智慧公廁導航 (國立臺灣藝術大學)</span>
        </div>

        {/* Membership Tier Status */}
        <button
          onClick={onOpenPaywall}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black shadow-xs transition cursor-pointer border ${
            isProUnlocked
              ? 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200/80'
              : 'bg-white text-slate-700 border-slate-200 hover:border-amber-400 hover:text-amber-800'
          }`}
          title="查看付費解鎖商業方案"
        >
          <i className={`fa-solid ${isProUnlocked ? 'fa-crown text-amber-500' : 'fa-lock text-amber-500'}`}></i>
          <span>
            {isProUnlocked ? 'SafePee Pro 全台無界限' : '免費版 (僅限台藝大/板橋 • 升級解鎖)'}
          </span>
        </button>
      </div>

      {/* Main Title */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-800 tracking-tight flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        <span>SafePee.map</span>
        <span className="text-[#3E8E7E]">(廁評)</span>
        <span className="text-xs px-2.5 py-1 bg-[#FF7D66]/15 text-[#FF7D66] rounded-lg font-bold border border-[#FF7D66]/30 shadow-xs">
          智慧解焦慮
        </span>
      </h1>

      {/* Subtitle */}
      <p className="mt-2 text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto px-4 leading-relaxed">
        以包容、性別平等、降低如廁焦慮為核心的安心公廁地圖系統。免費版已解鎖台藝大校園與板橋區；升級解鎖台北市、桃園全區即時跨區導航。
      </p>

      {/* Presentation & Interaction Controls Toolbar */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 px-2">
        {/* View Mode Switcher */}
        <div className="bg-white/90 backdrop-blur-md p-1 rounded-2xl border border-slate-200/90 shadow-xs flex items-center gap-1 text-xs font-semibold">
          <button
            onClick={() => setViewMode('presentation')}
            className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'presentation'
                ? 'bg-[#3E8E7E] text-white shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <i className="fa-solid fa-table-columns text-xs"></i>
            <span>三屏聯動展示 (Stitch Spec)</span>
          </button>
          <button
            onClick={() => setViewMode('mobile')}
            className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'mobile'
                ? 'bg-[#3E8E7E] text-white shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <i className="fa-solid fa-mobile-screen text-xs"></i>
            <span>手機單機互動體驗</span>
          </button>
        </div>

        {/* Emergency Mode Button */}
        <button
          onClick={() => setIsEmergencyMode(!isEmergencyMode)}
          className={`px-3 py-1.5 rounded-2xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs border cursor-pointer ${
            isEmergencyMode
              ? 'bg-rose-600 text-white border-rose-700 animate-pulse'
              : 'bg-white text-rose-600 border-rose-200 hover:bg-rose-50'
          }`}
        >
          <i className="fa-solid fa-triangle-exclamation"></i>
          <span>{isEmergencyMode ? '退出緊急模式' : '🚨 緊急如廁模式'}</span>
        </button>

        {/* Anxiety Radar Toggle */}
        <button
          onClick={() => setAnxietyRadarActive(!anxietyRadarActive)}
          className={`px-3 py-1.5 rounded-2xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs border cursor-pointer ${
            anxietyRadarActive
              ? 'bg-[#3E8E7E]/15 text-[#3E8E7E] border-[#3E8E7E]/40'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${anxietyRadarActive ? 'bg-[#3E8E7E] animate-ping' : 'bg-slate-300'}`}></span>
          <span>焦慮雷達: {anxietyRadarActive ? '偵測啟動中' : '已關閉'}</span>
        </button>

        {/* Gesture Sandbox Button */}
        <button
          onClick={onOpenGestureSandbox}
          className="px-3 py-1.5 rounded-2xl text-xs font-bold bg-white text-slate-700 hover:text-[#3E8E7E] border border-slate-200 shadow-xs transition flex items-center gap-1.5 cursor-pointer"
        >
          <i className="fa-solid fa-hand-pointer text-[#FF7D66]"></i>
          <span>手勢引導測試</span>
        </button>

        {/* View Original Stitch Design Spec */}
        <button
          onClick={onOpenOriginalSpec}
          className="px-3 py-1.5 rounded-2xl text-xs font-bold bg-white text-slate-600 hover:text-slate-900 border border-slate-200 shadow-xs transition flex items-center gap-1.5 cursor-pointer"
        >
          <i className="fa-solid fa-image text-[#3B82F6]"></i>
          <span>原 Stitch 設計稿對照</span>
        </button>
      </div>
    </header>
  );
};
