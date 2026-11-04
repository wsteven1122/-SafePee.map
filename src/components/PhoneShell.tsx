import React from 'react';

interface PhoneShellProps {
  time?: string;
  islandText?: string;
  islandColor?: 'emerald' | 'blue' | 'amber' | 'rose';
  activeTab: 'map' | 'crowd' | 'cleaning' | 'settings';
  onTabChange?: (tab: 'map' | 'crowd' | 'cleaning' | 'settings') => void;
  screenLabel?: string;
  screenSubLabel?: string;
  accentColor?: 'primary' | 'blue' | 'amber';
  children: React.ReactNode;
  isSinglePhone?: boolean;
}

export const PhoneShell: React.FC<PhoneShellProps> = ({
  time = '09:41',
  islandText = 'SafePee',
  islandColor = 'emerald',
  activeTab,
  onTabChange,
  screenLabel,
  screenSubLabel,
  accentColor = 'primary',
  children,
  isSinglePhone = false,
}) => {
  const getTabActiveClass = (tab: 'map' | 'crowd' | 'cleaning' | 'settings') => {
    if (activeTab !== tab) {
      return 'text-slate-400 hover:text-slate-600 font-medium';
    }
    if (accentColor === 'blue') return 'text-blue-600 font-bold';
    if (accentColor === 'amber') return 'text-amber-600 font-bold';
    return 'text-[#3E8E7E] font-bold';
  };

  const getPillBg = (tab: 'map' | 'crowd' | 'cleaning' | 'settings') => {
    if (activeTab !== tab) return '';
    if (accentColor === 'blue') return 'bg-blue-100 text-blue-600';
    if (accentColor === 'amber') return 'bg-amber-100 text-amber-600';
    return 'bg-[#3E8E7E]/10 text-[#3E8E7E]';
  };

  const getDotBg = () => {
    if (accentColor === 'blue') return 'bg-blue-500';
    if (accentColor === 'amber') return 'bg-amber-500';
    return 'bg-[#3E8E7E]';
  };

  return (
    <section className={`w-full ${isSinglePhone ? 'max-w-[420px]' : 'max-w-[390px]'} flex flex-col items-center select-none`}>
      {screenLabel && (
        <div className="w-full mb-3 flex items-center justify-between px-2 text-xs font-semibold text-slate-500">
          <span
            className={`flex items-center gap-1.5 font-bold ${
              accentColor === 'blue'
                ? 'text-blue-600'
                : accentColor === 'amber'
                ? 'text-amber-600'
                : 'text-[#3E8E7E]'
            }`}
          >
            <span
              className={`w-2.5 h-2.5 rounded-full inline-block ${
                accentColor === 'blue'
                  ? 'bg-blue-500'
                  : accentColor === 'amber'
                  ? 'bg-amber-500'
                  : 'bg-[#3E8E7E]'
              }`}
            ></span>
            {screenLabel}
          </span>
          <span className="text-slate-400">{screenSubLabel}</span>
        </div>
      )}

      {/* Phone Shell Frame */}
      <div className="w-full h-[812px] bg-white rounded-[44px] shadow-phone border-[8px] border-slate-900/90 relative overflow-hidden flex flex-col justify-between">
        {/* Status Bar & Dynamic Island Notch */}
        <div className="pt-3 px-6 pb-2 flex justify-between items-center z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shrink-0">
          <span className="text-xs font-bold text-slate-800 tracking-tight">{time}</span>

          {/* Dynamic Island / Speaker */}
          <div className="w-24 h-4 bg-slate-900 rounded-full flex items-center justify-center gap-1.5 px-2 shadow-inner">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                islandColor === 'blue'
                  ? 'bg-blue-400'
                  : islandColor === 'amber'
                  ? 'bg-amber-400'
                  : islandColor === 'rose'
                  ? 'bg-rose-400'
                  : 'bg-emerald-400 animate-pulse'
              }`}
            ></span>
            <span className="text-[9px] text-white/80 font-mono tracking-wider">{islandText}</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-700">
            <i className="fa-solid fa-signal text-[10px]"></i>
            <i className="fa-solid fa-wifi text-[10px]"></i>
            <i className="fa-solid fa-battery-full text-xs text-[#3E8E7E]"></i>
          </div>
        </div>

        {/* Screen Content Viewport */}
        <div className="flex-1 relative overflow-hidden flex flex-col min-h-0 bg-[#F8FAFC]">
          {children}
        </div>

        {/* Sticky Bottom Navigation Bar */}
        <nav className="bg-white border-t border-slate-100 px-3 py-2 z-40 shrink-0 shadow-lg">
          <div className="grid grid-cols-4 gap-1">
            {/* Tab 1: 地圖探索 */}
            <button
              onClick={() => onTabChange?.('map')}
              className={`flex flex-col items-center justify-center py-1 text-[10px] relative transition-colors ${getTabActiveClass(
                'map'
              )}`}
            >
              <div
                className={`w-9 h-6 rounded-full flex items-center justify-center mb-0.5 transition-colors ${
                  activeTab === 'map' ? getPillBg('map') : ''
                }`}
              >
                <i className="fa-solid fa-map-location-dot text-sm"></i>
              </div>
              <span>地圖探索</span>
              {activeTab === 'map' && (
                <span className={`w-1.5 h-1.5 rounded-full mt-0.5 ${getDotBg()}`}></span>
              )}
            </button>

            {/* Tab 2: 擁擠與安全 */}
            <button
              onClick={() => onTabChange?.('crowd')}
              className={`flex flex-col items-center justify-center py-1 text-[10px] relative transition-colors ${getTabActiveClass(
                'crowd'
              )}`}
            >
              <div
                className={`w-9 h-6 rounded-full flex items-center justify-center mb-0.5 transition-colors ${
                  activeTab === 'crowd' ? getPillBg('crowd') : ''
                }`}
              >
                <i className="fa-solid fa-users-line text-sm"></i>
              </div>
              <span>擁擠與安全</span>
              {activeTab === 'crowd' && (
                <span className={`w-1.5 h-1.5 rounded-full mt-0.5 ${getDotBg()}`}></span>
              )}
            </button>

            {/* Tab 3: 清潔回報 */}
            <button
              onClick={() => onTabChange?.('cleaning')}
              className={`flex flex-col items-center justify-center py-1 text-[10px] relative transition-colors ${getTabActiveClass(
                'cleaning'
              )}`}
            >
              <div
                className={`w-9 h-6 rounded-full flex items-center justify-center mb-0.5 transition-colors ${
                  activeTab === 'cleaning' ? getPillBg('cleaning') : ''
                }`}
              >
                <i className="fa-solid fa-broom text-sm"></i>
              </div>
              <span>清潔回報</span>
              {activeTab === 'cleaning' && (
                <span className={`w-1.5 h-1.5 rounded-full mt-0.5 ${getDotBg()}`}></span>
              )}
            </button>

            {/* Tab 4: 個人設定 */}
            <button
              onClick={() => onTabChange?.('settings')}
              className={`flex flex-col items-center justify-center py-1 text-[10px] relative transition-colors ${getTabActiveClass(
                'settings'
              )}`}
            >
              <div
                className={`w-9 h-6 rounded-full flex items-center justify-center mb-0.5 transition-colors ${
                  activeTab === 'settings' ? getPillBg('settings') : ''
                }`}
              >
                <i className="fa-solid fa-user-gear text-sm"></i>
              </div>
              <span>個人設定</span>
              {activeTab === 'settings' && (
                <span className={`w-1.5 h-1.5 rounded-full mt-0.5 ${getDotBg()}`}></span>
              )}
            </button>
          </div>

          {/* Home Indicator Bar */}
          <div className="w-32 h-1 bg-slate-200 rounded-full mx-auto mt-2"></div>
        </nav>
      </div>
    </section>
  );
};
