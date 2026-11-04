import React, { useState } from 'react';
import { Restroom, FilterState, Region, RegionId } from '../types';
import { REGIONS } from '../data/restrooms';
import { sound } from '../utils/audio';

interface Screen1MapProps {
  restrooms: Restroom[];
  selectedRestroom: Restroom;
  onSelectRestroom: (restroom: Restroom) => void;
  filters: FilterState;
  onToggleFilter: (key: keyof FilterState) => void;
  anxietyRadarActive: boolean;
  onTriggerThreeFingerGesture: () => void;
  onTriggerCircleGesture: () => void;
  onOpenDetailModal: (restroom: Restroom) => void;
  currentRegionId: RegionId;
  onChangeRegion: (regionId: RegionId) => void;
  isProUnlocked: boolean;
  onOpenPaywall: (region?: Region) => void;
}

export const Screen1Map: React.FC<Screen1MapProps> = ({
  restrooms,
  selectedRestroom,
  onSelectRestroom,
  filters,
  onToggleFilter,
  anxietyRadarActive,
  onTriggerThreeFingerGesture,
  onTriggerCircleGesture,
  onOpenDetailModal,
  currentRegionId,
  onChangeRegion,
  isProUnlocked,
  onOpenPaywall,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState({ x: 175, y: 410 });
  const [isNavigating, setIsNavigating] = useState(false);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);

  const currentRegion = REGIONS.find((r) => r.id === currentRegionId) || REGIONS[0];
  const isCurrentRegionLocked = !currentRegion.isDefaultUnlocked && !isProUnlocked;

  // Filter restrooms
  const filteredRestrooms = restrooms.filter((r) => {
    // Region check
    if (r.regionId !== currentRegionId) return false;

    // Search query check
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = r.name.toLowerCase().includes(q);
      const matchSub = r.subLocation.toLowerCase().includes(q);
      const matchTags = r.reviews.some((rv) => rv.tags.some((t) => t.toLowerCase().includes(q)));
      if (!matchName && !matchSub && !matchTags) return false;
    }

    // Pain point filters
    if (filters.genderFriendly && !r.independentStall && r.allGenderStalls === 0) return false;
    if (filters.accessible && !r.accessible) return false;
    if (filters.parentChild && !r.babyCare) return false;
    if (filters.independentStall && !r.floorToCeilingPartition) return false;
    return true;
  });

  const handlePinClick = (r: Restroom) => {
    if (isCurrentRegionLocked) {
      sound.playEmergencyBeep();
      onOpenPaywall(currentRegion);
      return;
    }
    sound.playSuccessChime();
    onSelectRestroom(r);
  };

  const handleRegionClick = (region: Region) => {
    sound.playSuccessChime();
    onChangeRegion(region.id);

    // If locked, trigger paywall prompt
    if (!region.isDefaultUnlocked && !isProUnlocked) {
      sound.playToggleSound(false);
    }
  };

  const handleRecenter = () => {
    sound.playSuccessChime();
    setUserLocation({ x: 175, y: 410 });
    setIsNavigating(true);
    setTimeout(() => setIsNavigating(false), 2000);
  };

  return (
    <div className="relative flex-1 flex flex-col h-full bg-[#E8F0EA] overflow-hidden select-none">
      {/* Top Content Header: Search & Team Info */}
      <div className="px-4 pt-1 pb-2 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 space-y-2 shrink-0 shadow-xs">
        {/* Search Bar with Logo */}
        <div className="flex items-center gap-2 bg-slate-100/90 hover:bg-slate-100 transition rounded-2xl p-1.5 pl-3 border border-slate-200/80">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#3E8E7E] to-[#5FB8A6] flex items-center justify-center text-white text-sm shadow-xs flex-shrink-0">
            <i className="fa-solid fa-toilet"></i>
          </div>
          <div className="flex-1 flex items-center gap-2">
            <i className="fa-solid fa-magnifying-glass text-slate-400 text-xs"></i>
            <input
              type="text"
              placeholder="搜尋公廁、捷運站、無障礙..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs text-slate-700 w-full focus:outline-none placeholder-slate-400 font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-slate-400 hover:text-slate-600 text-xs px-1"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilterDrawer(!showFilterDrawer)}
            className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs shadow-xs border transition ${
              showFilterDrawer
                ? 'bg-[#3E8E7E] text-white border-[#3E8E7E]'
                : 'bg-white text-slate-500 hover:text-[#3E8E7E] border-slate-200'
            }`}
            title="更多痛點篩選"
          >
            <i className="fa-solid fa-sliders"></i>
          </button>
        </div>

        {/* Region Lock & Area Switcher Tabs */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold px-0.5">
            <span className="flex items-center gap-1 text-slate-600">
              <i className="fa-solid fa-map-pin text-[#3E8E7E]"></i>
              涵蓋範圍選擇：
            </span>
            {isProUnlocked ? (
              <span className="text-amber-600 font-extrabold flex items-center gap-1">
                <i className="fa-solid fa-crown text-[9px]"></i>
                Pro 全區已解鎖
              </span>
            ) : (
              <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                免費版 (台藝大 + 板橋)
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
            {REGIONS.map((reg) => {
              const isLocked = !reg.isDefaultUnlocked && !isProUnlocked;
              const isCurrent = reg.id === currentRegionId;
              return (
                <button
                  key={reg.id}
                  onClick={() => handleRegionClick(reg)}
                  className={`flex-shrink-0 px-2.5 py-1 rounded-xl text-[10.5px] font-bold transition flex items-center gap-1.5 border ${
                    isCurrent
                      ? isLocked
                        ? 'bg-amber-100 text-amber-900 border-amber-300 shadow-xs'
                        : 'bg-[#3E8E7E] text-white border-[#3E8E7E] shadow-xs'
                      : isLocked
                      ? 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200/80'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {isLocked && <i className="fa-solid fa-lock text-[9px] text-amber-600"></i>}
                  {!isLocked && isCurrent && <i className="fa-solid fa-check text-[9px]"></i>}
                  <span>{reg.shortName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Team Attribution Tag */}
        <div className="flex items-center justify-between text-[10px] px-2 py-0.5 rounded-lg bg-emerald-50/80 border border-emerald-100 text-emerald-800">
          <span className="font-bold flex items-center gap-1">
            <i className="fa-solid fa-users text-[#3E8E7E] text-[10px]"></i>
            組別: 第六組 (台藝大)
          </span>
          <span
            className="text-slate-600 font-medium truncate max-w-[190px]"
            title="洪諄翔、林雍訢、楊杰睿、莎里谷姆"
          >
            (洪諄翔、林雍訢、楊杰睿、莎里谷姆)
          </span>
        </div>

        {/* Pain Point Filter Pill Chips (痛點過濾) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5 pt-0.5">
          <button
            onClick={() => onToggleFilter('genderFriendly')}
            className={`flex-shrink-0 px-2.5 py-1 rounded-full text-[10.5px] font-bold flex items-center gap-1.5 transition shadow-xs ${
              filters.genderFriendly
                ? 'bg-[#3E8E7E] text-white'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <i className="fa-solid fa-venus-mars text-[10px]"></i>
            <span>性別友善</span>
          </button>

          <button
            onClick={() => onToggleFilter('accessible')}
            className={`flex-shrink-0 px-2.5 py-1 rounded-full text-[10.5px] font-semibold flex items-center gap-1.5 transition ${
              filters.accessible
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <i className={`fa-solid fa-wheelchair text-[10px] ${filters.accessible ? 'text-white' : 'text-blue-500'}`}></i>
            <span>無障礙</span>
          </button>

          <button
            onClick={() => onToggleFilter('parentChild')}
            className={`flex-shrink-0 px-2.5 py-1 rounded-full text-[10.5px] font-semibold flex items-center gap-1.5 transition ${
              filters.parentChild
                ? 'bg-[#FF7D66] text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <i className={`fa-solid fa-baby text-[10px] ${filters.parentChild ? 'text-white' : 'text-[#FF7D66]'}`}></i>
            <span>親子/育嬰</span>
          </button>

          <button
            onClick={() => onToggleFilter('independentStall')}
            className={`flex-shrink-0 px-2.5 py-1 rounded-full text-[10.5px] font-semibold flex items-center gap-1 transition ${
              filters.independentStall
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            }`}
          >
            <i className={`fa-solid fa-shield-heart text-[10px] ${filters.independentStall ? 'text-white' : 'text-amber-500'}`}></i>
            <span>獨立隔間</span>
          </button>
        </div>
      </div>

      {/* Main Content: Interactive Map Area */}
      <div className="relative flex-1 bg-[#E8F0EA] overflow-hidden">
        {/* Stylized Map Canvas Background SVG */}
        <svg
          className="absolute inset-0 w-full h-full object-cover opacity-85 cursor-grab active:cursor-grabbing"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="mapgrid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#D3E2D7" strokeWidth="1" />
            </pattern>
          </defs>

          {/* Map Base & Roads */}
          <rect width="100%" height="100%" fill="#EAF3EC" />
          <rect width="100%" height="100%" fill="url(#mapgrid)" />

          {/* Park Area */}
          <path d="M-20,120 Q80,90 140,160 T320,180 L350,30 L-20,20 Z" fill="#D9ECE0" />

          {/* Road Networks */}
          <path d="M-20,190 L400,240" stroke="#FFFFFF" strokeWidth="26" strokeLinecap="round" />
          <path d="M-20,190 L400,240" stroke="#CBDDD2" strokeWidth="1.5" strokeDasharray="6 6" fill="none" />
          <path d="M120,-20 L160,520" stroke="#FFFFFF" strokeWidth="20" strokeLinecap="round" />
          <path d="M260,110 L300,500" stroke="#FFFFFF" strokeWidth="16" />
          <path d="M40,360 Q180,310 390,380" stroke="#FFFFFF" strokeWidth="22" />

          {/* Walking Route dashed line toward the Selected Restroom */}
          {!isCurrentRegionLocked && (
            <path
              d={`M ${userLocation.x},${userLocation.y} Q ${(userLocation.x + selectedRestroom.mapCoords.x) / 2 + 10},${
                (userLocation.y + selectedRestroom.mapCoords.y) / 2
              } ${selectedRestroom.mapCoords.x},${selectedRestroom.mapCoords.y + 25}`}
              stroke="#3E8E7E"
              strokeWidth="4"
              strokeDasharray="6 6"
              fill="none"
              className="animate-pulse"
            />
          )}
        </svg>

        {/* LOCKED REGION SHADED OVERLAY */}
        {isCurrentRegionLocked && (
          <div className="absolute inset-0 z-40 bg-slate-900/60 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 text-center text-white space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border-2 border-amber-400 text-amber-300 flex items-center justify-center text-2xl shadow-lg animate-bounce">
              <i className="fa-solid fa-lock"></i>
            </div>
            <div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/30 text-amber-200 border border-amber-400/50 font-bold uppercase tracking-wider">
                區域鎖定中 • 需要 SafePee Pro
              </span>
              <h3 className="text-base font-extrabold text-white mt-1.5">
                {currentRegion.name}
              </h3>
              <p className="text-xs text-slate-200 max-w-[260px] mx-auto mt-1 leading-relaxed">
                免費版僅解鎖「台藝大校園」與「板橋區」。升級解鎖台北市、桃園等全台公廁數據與即時佔用推播。
              </p>
            </div>
            <button
              onClick={() => onOpenPaywall(currentRegion)}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-600 hover:to-amber-500 text-slate-950 font-black text-xs shadow-xl transition flex items-center gap-1.5 cursor-pointer transform hover:scale-105"
            >
              <i className="fa-solid fa-crown text-slate-950"></i>
              <span>立即升級 / 解鎖此區域</span>
            </button>
          </div>
        )}

        {/* Current User GPS Location Dot with Anxious Radar Rings (焦慮雷達) */}
        <div
          className="absolute z-20 pointer-events-none transition-all duration-700"
          style={{ left: `${userLocation.x}px`, top: `${userLocation.y}px`, transform: 'translate(-50%, -50%)' }}
        >
          {/* Pulsing Rings */}
          {anxietyRadarActive && !isCurrentRegionLocked && (
            <>
              <div className="absolute w-24 h-24 -left-9 -top-9 rounded-full bg-[#3E8E7E]/20 radar-circle-1"></div>
              <div className="absolute w-36 h-36 -left-15 -top-15 rounded-full bg-[#3E8E7E]/10 radar-circle-2"></div>
            </>
          )}

          {/* User Location Indicator */}
          <div className="relative w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center border-2 border-[#3E8E7E]">
            <div className="w-3 h-3 rounded-full bg-[#3E8E7E]"></div>
          </div>

          {/* Distance Indicator Label (距離) Hand-drawn style badge */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-full text-[9.5px] font-bold text-[#3E8E7E] border border-[#3E8E7E]/30 shadow-xs flex items-center gap-1 whitespace-nowrap">
            <span className={`w-1.5 h-1.5 rounded-full bg-[#FF7D66] ${anxietyRadarActive ? 'animate-ping' : ''}`}></span>
            <span>
              {isCurrentRegionLocked
                ? '此區需解鎖'
                : anxietyRadarActive
                ? '焦慮雷達: 鎖定首選'
                : '目前位置'}
            </span>
          </div>
        </div>

        {/* Dynamic Pins for Current Region */}
        {filteredRestrooms.map((restroom) => {
          const isSelected = selectedRestroom.id === restroom.id && !isCurrentRegionLocked;

          if (isSelected) {
            // Prominent Highlighted Pin
            return (
              <div
                key={restroom.id}
                onClick={() => onOpenDetailModal(restroom)}
                className="absolute z-30 cursor-pointer transition-transform hover:scale-105"
                style={{
                  left: `${restroom.mapCoords.x}px`,
                  top: `${restroom.mapCoords.y}px`,
                  transform: 'translate(-50%, -100%)',
                }}
              >
                <div className="relative flex flex-col items-center animate-bounce hover-bounce">
                  {/* Top Highlighted Distance Overlay */}
                  <div className="bg-gradient-to-r from-[#3E8E7E] to-[#5FB8A6] text-white px-3 py-1.5 rounded-2xl shadow-pin text-left flex items-center gap-2 border border-white/40">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[11px]">
                      <i className="fa-solid fa-location-arrow"></i>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[12px] font-extrabold tracking-tight truncate max-w-[130px]">
                          {restroom.name}
                        </span>
                        <span className="bg-white text-[#3E8E7E] text-[9px] font-black px-1.5 py-0.2 rounded-full shrink-0">
                          首選
                        </span>
                      </div>
                      <div className="text-[10.5px] font-semibold text-white/95 flex items-center gap-1">
                        <span>距離 {restroom.distanceMeters}m</span>
                        <span className="opacity-75">•</span>
                        <span className="text-emerald-100 font-bold">步行 {restroom.walkMinutes} min</span>
                      </div>
                    </div>
                  </div>

                  {/* Cute Toilet Logo Map Marker Head (SafePee Pin) */}
                  <div className="relative -mt-1 w-11 h-11 bg-white rounded-2xl shadow-lg border-2 border-[#3E8E7E] flex items-center justify-center text-[#FF7D66] rotate-45 transform hover:scale-110 transition">
                    <div className="-rotate-45 flex items-center justify-center">
                      <div className="relative">
                        <i className="fa-solid fa-toilet text-xl text-[#3E8E7E]"></i>
                        <span className="absolute -top-1 -right-1.5 w-3 h-3 bg-[#FF7D66] rounded-full flex items-center justify-center text-[7px] text-white font-bold border border-white">
                          ★
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-2.5 h-2.5 bg-[#3E8E7E] transform rotate-45 -mt-1 rounded-xs shadow-xs"></div>
                </div>
              </div>
            );
          }

          // Secondary Pin
          return (
            <div
              key={restroom.id}
              onClick={() => handlePinClick(restroom)}
              className="absolute z-10 cursor-pointer group transition-transform hover:scale-105"
              style={{
                left: `${restroom.mapCoords.x}px`,
                top: `${restroom.mapCoords.y}px`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="flex flex-col items-center">
                <div className="px-2 py-0.5 bg-white/95 rounded-md shadow-xs border border-slate-200 text-[10px] font-semibold text-slate-700 mb-1 flex items-center gap-1 whitespace-nowrap">
                  <span className="truncate max-w-[90px]">{restroom.name}</span>
                  <span
                    className={`text-[9px] px-1 rounded font-bold ${
                      restroom.comfortBadge === '優'
                        ? 'text-emerald-600 bg-emerald-50'
                        : restroom.comfortBadge === '擁擠'
                        ? 'text-rose-500 bg-rose-50'
                        : 'text-amber-600 bg-amber-50'
                    }`}
                  >
                    {restroom.comfortBadge}
                  </span>
                </div>
                <div
                  className={`w-7 h-7 rounded-full text-white flex items-center justify-center text-xs shadow-md border-2 border-white relative ${
                    restroom.comfortBadge === '優'
                      ? 'bg-[#3E8E7E]'
                      : restroom.comfortBadge === '擁擠'
                      ? 'bg-rose-500'
                      : 'bg-slate-700'
                  }`}
                >
                  <i className="fa-solid fa-restroom"></i>
                  {isCurrentRegionLocked && (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-500 text-slate-900 flex items-center justify-center text-[8px] font-bold border border-white">
                      🔒
                    </span>
                  )}
                </div>
                <span className="text-[9px] font-bold text-slate-500 mt-0.5">{restroom.distanceMeters}m</span>
              </div>
            </div>
          );
        })}

        {/* Bottom Gesture Control Hint Panel (手勢控制與焦慮引導) */}
        <div className="absolute bottom-3 left-3 right-3 z-30 bg-white/95 backdrop-blur-md rounded-2xl p-3 border border-slate-200/90 shadow-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-extrabold text-slate-800 flex items-center gap-1.5">
              <i className="fa-solid fa-hand-pointer text-[#FF7D66]"></i>
              直覺手勢輔助 (Gesture Guide)
            </span>
            <span className="text-[9.5px] bg-[#FFEBE7] text-[#FF7D66] font-bold px-2 py-0.5 rounded-full">
              免慌張快速導航
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[10.5px]">
            {/* Gesture 1: Three-finger drag down */}
            <button
              onClick={onTriggerThreeFingerGesture}
              className="flex items-center gap-2 bg-slate-50 hover:bg-[#3E8E7E]/10 p-2 rounded-xl border border-slate-100 transition text-left cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-[#3E8E7E]/10 text-[#3E8E7E] flex items-center justify-center text-xs flex-shrink-0">
                <i className="fa-solid fa-angles-down"></i>
              </div>
              <div className="leading-tight">
                <div className="font-bold text-slate-800">三指下滑</div>
                <div className="text-[9.5px] text-slate-500">顯示即時距離與預估</div>
              </div>
            </button>

            {/* Gesture 2: Draw circle to navigate */}
            <button
              onClick={onTriggerCircleGesture}
              className="flex items-center gap-2 bg-slate-50 hover:bg-[#FF7D66]/10 p-2 rounded-xl border border-slate-100 transition text-left cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-[#FF7D66]/10 text-[#FF7D66] flex items-center justify-center text-xs flex-shrink-0">
                <i className="fa-solid fa-arrows-spin"></i>
              </div>
              <div className="leading-tight">
                <div className="font-bold text-slate-800">手指畫圈</div>
                <div className="text-[9.5px] text-slate-500">一秒啟動緊急前往</div>
              </div>
            </button>
          </div>
        </div>

        {/* Compass & Current Location Recenter Floating Buttons */}
        <div className="absolute right-3 top-4 z-20 flex flex-col gap-2">
          <button
            onClick={() => {
              sound.playSuccessChime();
            }}
            className="w-9 h-9 rounded-2xl bg-white/95 backdrop-blur-xs text-slate-700 shadow-md flex items-center justify-center text-xs border border-slate-200 hover:text-[#3E8E7E] transition cursor-pointer"
            title="指北針指向"
          >
            <i className="fa-regular fa-compass text-sm"></i>
          </button>
          <button
            onClick={handleRecenter}
            className={`w-9 h-9 rounded-2xl bg-white/95 backdrop-blur-xs shadow-md flex items-center justify-center text-xs border border-slate-200 transition cursor-pointer ${
              isNavigating ? 'text-[#FF7D66] ring-2 ring-[#FF7D66]/50' : 'text-[#3E8E7E]'
            }`}
            title="重定位至目前位置"
          >
            <i className="fa-solid fa-location-crosshairs text-sm"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
