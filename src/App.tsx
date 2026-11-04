/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Restroom, FilterState, UserSettings, RestroomReview, RegionId, Region } from './types';
import { initialRestrooms, REGIONS } from './data/restrooms';
import { sound } from './utils/audio';

import { HeaderBanner } from './components/HeaderBanner';
import { PhoneShell } from './components/PhoneShell';
import { Screen1Map } from './components/Screen1Map';
import { Screen2Crowd } from './components/Screen2Crowd';
import { Screen3Cleaning } from './components/Screen3Cleaning';
import { Screen4Settings } from './components/Screen4Settings';

import { EmergencyModal } from './components/EmergencyModal';
import { QuickReportModal } from './components/QuickReportModal';
import { ScheduleModal } from './components/ScheduleModal';
import { ReviewModal } from './components/ReviewModal';
import { GestureModal } from './components/GestureModal';
import { VoiceFilterModal } from './components/VoiceFilterModal';
import { DetailModal } from './components/DetailModal';
import { OriginalSpecModal } from './components/OriginalSpecModal';
import { PaywallModal } from './components/PaywallModal';

export default function App() {
  const [restrooms, setRestrooms] = useState<Restroom[]>(initialRestrooms);
  const [currentRegionId, setCurrentRegionId] = useState<RegionId>('ntua');
  const [isProUnlocked, setIsProUnlocked] = useState(false);

  // Default selected restroom in current region
  const [selectedRestroom, setSelectedRestroom] = useState<Restroom>(
    initialRestrooms.find((r) => r.regionId === 'ntua') || initialRestrooms[0]
  );
  const [detailRestroom, setDetailRestroom] = useState<Restroom | null>(null);

  const [viewMode, setViewMode] = useState<'presentation' | 'mobile'>('presentation');
  const [mobileTab, setMobileTab] = useState<'map' | 'crowd' | 'cleaning' | 'settings'>('map');

  const [filters, setFilters] = useState<FilterState>({
    genderFriendly: true,
    accessible: false,
    parentChild: false,
    independentStall: false,
    antiPeep: true,
    queueConcealment: true,
    noGenderConflict: true,
    spacious: false,
    notCrowded: false,
  });

  const [userSettings, setUserSettings] = useState<UserSettings>({
    userName: '林同學 (台藝大視傳)',
    isProUnlocked: false,
    selectedRegion: 'ntua',
    paruresisMode: true,
    audioMaskingType: 'off',
    genderAffirmingPriority: 'all-gender',
    accessibilityNeed: false,
    strollerNeed: false,
    autoCleaningAlert: true,
    highContrastMap: false,
    soundEffects: true,
  });

  const [anxietyRadarActive, setAnxietyRadarActive] = useState(true);
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(
    new Set(['ntua-comprehensive', 'civic-plaza-b1'])
  );
  const [distanceToast, setDistanceToast] = useState<string | null>(null);

  // Modals
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isQuickReportOpen, setIsQuickReportOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isGestureModalOpen, setIsGestureModalOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isOriginalSpecOpen, setIsOriginalSpecOpen] = useState(false);
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [paywallTargetRegion, setPaywallTargetRegion] = useState<Region | null>(null);

  // Handle region switch and update selected restroom
  const handleChangeRegion = (newRegionId: RegionId) => {
    setCurrentRegionId(newRegionId);
    const targetRegion = REGIONS.find((r) => r.id === newRegionId);

    // If region is locked and not unlocked, open paywall prompt
    if (targetRegion && !targetRegion.isDefaultUnlocked && !isProUnlocked) {
      setPaywallTargetRegion(targetRegion);
      setIsPaywallOpen(true);
    }

    const firstInRegion = restrooms.find((r) => r.regionId === newRegionId);
    if (firstInRegion) {
      setSelectedRestroom(firstInRegion);
    }
  };

  const handleUnlockPro = () => {
    setIsProUnlocked(true);
    setUserSettings((s) => ({ ...s, isProUnlocked: true }));
    sound.playSuccessChime();
    setDistanceToast('👑 已成功解鎖 SafePee Pro！台北市、桃園市全區公廁地圖已全面開放！');
    setTimeout(() => setDistanceToast(null), 4000);
  };

  // Device Motion Shake Detection for mobile browsers
  useEffect(() => {
    let lastX = 0, lastY = 0, lastZ = 0;
    let lastTime = 0;
    const SHAKE_THRESHOLD = 15;

    const handleMotion = (event: DeviceMotionEvent) => {
      const current = event.accelerationIncludingGravity;
      if (!current) return;
      const curTime = Date.now();
      if (curTime - lastTime > 150) {
        const diffTime = curTime - lastTime;
        lastTime = curTime;
        const speed =
          Math.abs((current.x || 0) + (current.y || 0) + (current.z || 0) - lastX - lastY - lastZ) /
          diffTime * 10000;

        if (speed > SHAKE_THRESHOLD) {
          sound.playEmergencyBeep();
          setIsQuickReportOpen(true);
        }
        lastX = current.x || 0;
        lastY = current.y || 0;
        lastZ = current.z || 0;
      }
    };

    window.addEventListener('devicemotion', handleMotion);
    return () => window.removeEventListener('devicemotion', handleMotion);
  }, []);

  const handleToggleFilter = (key: keyof FilterState) => {
    setFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleToggleBookmark = (r: Restroom) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(r.id)) {
        next.delete(r.id);
      } else {
        next.add(r.id);
      }
      return next;
    });
  };

  const handleAddReview = (newReview: RestroomReview) => {
    setRestrooms((prev) =>
      prev.map((r) =>
        r.id === selectedRestroom.id
          ? {
              ...r,
              reviews: [newReview, ...r.reviews],
            }
          : r
      )
    );
    setSelectedRestroom((prev) => ({
      ...prev,
      reviews: [newReview, ...prev.reviews],
    }));
  };

  const handleReportSubmit = (issue: string) => {
    const reportReview: RestroomReview = {
      id: `rep-${Date.now()}`,
      author: '系統回報中心',
      role: '即時通報',
      rating: 4,
      date: '剛剛',
      content: `使用者回報此處問題: 【${issue}】，值班保潔專員已接單處理中。`,
      tags: ['#即時回報', '#專員處理中'],
      avatarInitial: '報',
      avatarBg: 'bg-amber-100 text-amber-800',
    };
    handleAddReview(reportReview);
  };

  const handleTriggerThreeFingerGesture = () => {
    sound.playSuccessChime();
    setDistanceToast(
      `📍 三指下滑感應：距離 ${selectedRestroom.name} 僅 ${selectedRestroom.distanceMeters}m (步行約 ${selectedRestroom.walkMinutes} 分鐘)`
    );
    setTimeout(() => setDistanceToast(null), 4000);
  };

  const handleVoiceCommand = (cmd: string) => {
    if (cmd.includes('擁擠')) {
      setFilters((prev) => ({ ...prev, notCrowded: true }));
    }
    if (cmd.includes('性別友善')) {
      setFilters((prev) => ({ ...prev, genderFriendly: true, noGenderConflict: true }));
    }
    if (cmd.includes('無障礙')) {
      setFilters((prev) => ({ ...prev, accessible: true }));
    }
    if (cmd.includes('親子') || cmd.includes('育嬰')) {
      setFilters((prev) => ({ ...prev, parentChild: true }));
    }
    if (cmd.includes('解鎖') || cmd.includes('升級')) {
      setIsPaywallOpen(true);
    }
    setDistanceToast(`🎙️ 已依據語音指令「${cmd}」更新篩選條件`);
    setTimeout(() => setDistanceToast(null), 3000);
  };

  // Find civic plaza or selected restroom for Screen 2 and 3 representation
  const featuredRestroom =
    currentRegionId === 'banqiao'
      ? restrooms.find((r) => r.id === 'civic-plaza-b1') || selectedRestroom
      : selectedRestroom;

  return (
    <div className="bg-[#F1F5F9] text-slate-800 font-sans antialiased min-h-screen py-6 sm:py-8 px-2 sm:px-4 lg:px-8">
      {/* Toast Notification */}
      {distanceToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-300">
          <span className="w-2 h-2 rounded-full bg-[#3E8E7E] animate-ping"></span>
          <span className="font-semibold">{distanceToast}</span>
        </div>
      )}

      {/* Presentation Header Banner */}
      <HeaderBanner
        viewMode={viewMode}
        setViewMode={setViewMode}
        isEmergencyMode={isEmergencyMode}
        setIsEmergencyMode={(em) => {
          setIsEmergencyMode(em);
          if (em) setIsEmergencyModalOpen(true);
        }}
        onOpenOriginalSpec={() => setIsOriginalSpecOpen(true)}
        onOpenGestureSandbox={() => setIsGestureModalOpen(true)}
        anxietyRadarActive={anxietyRadarActive}
        setAnxietyRadarActive={setAnxietyRadarActive}
        isProUnlocked={isProUnlocked}
        onOpenPaywall={() => {
          setPaywallTargetRegion(null);
          setIsPaywallOpen(true);
        }}
      />

      {/* Main Content Area */}
      {viewMode === 'presentation' ? (
        /* 3-Screen Side-by-Side Presentation Layout matching Stitch design */
        <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {/* SCREEN 1: 地圖探索 (Map & Distance Explore) */}
          <PhoneShell
            time="09:41"
            islandText="SafePee"
            islandColor="emerald"
            activeTab="map"
            screenLabel="SCREEN 1 : 地圖探索"
            screenSubLabel="Map & Distance Explore"
            accentColor="primary"
            onTabChange={(tab) => {
              if (tab !== 'map') {
                setViewMode('mobile');
                setMobileTab(tab);
              }
            }}
          >
            <Screen1Map
              restrooms={restrooms}
              selectedRestroom={selectedRestroom}
              onSelectRestroom={(r) => {
                setSelectedRestroom(r);
              }}
              filters={filters}
              onToggleFilter={handleToggleFilter}
              anxietyRadarActive={anxietyRadarActive}
              onTriggerThreeFingerGesture={handleTriggerThreeFingerGesture}
              onTriggerCircleGesture={() => setIsEmergencyModalOpen(true)}
              onOpenDetailModal={(r) => {
                setDetailRestroom(r);
                setIsDetailModalOpen(true);
              }}
              currentRegionId={currentRegionId}
              onChangeRegion={handleChangeRegion}
              isProUnlocked={isProUnlocked}
              onOpenPaywall={(reg) => {
                setPaywallTargetRegion(reg || null);
                setIsPaywallOpen(true);
              }}
            />
          </PhoneShell>

          {/* SCREEN 2: 擁擠與安全 (Real-time Crowding & Safety) */}
          <PhoneShell
            time="09:42"
            islandText="CrowdScan"
            islandColor="blue"
            activeTab="crowd"
            screenLabel="SCREEN 2 : 擁擠與安全"
            screenSubLabel="Real-time Crowding & Safety"
            accentColor="blue"
            onTabChange={(tab) => {
              if (tab !== 'crowd') {
                setViewMode('mobile');
                setMobileTab(tab);
              }
            }}
          >
            <Screen2Crowd
              selectedRestroom={featuredRestroom}
              filters={filters}
              onToggleFilter={handleToggleFilter}
              isBookmarked={bookmarkedIds.has(featuredRestroom.id)}
              onToggleBookmark={handleToggleBookmark}
              onOpenVoiceFilter={() => setIsVoiceModalOpen(true)}
            />
          </PhoneShell>

          {/* SCREEN 3: 清潔提醒與回饋 (Cleaning Alert & Feedback) */}
          <PhoneShell
            time="09:43"
            islandText="CleanAlert"
            islandColor="amber"
            activeTab="cleaning"
            screenLabel="SCREEN 3 : 清潔提醒與回饋"
            screenSubLabel="Cleaning Alert & Feedback"
            accentColor="amber"
            onTabChange={(tab) => {
              if (tab !== 'cleaning') {
                setViewMode('mobile');
                setMobileTab(tab);
              }
            }}
          >
            <Screen3Cleaning
              selectedRestroom={featuredRestroom}
              onOpenQuickReport={() => setIsQuickReportOpen(true)}
              onOpenScheduleModal={() => setIsScheduleModalOpen(true)}
              onOpenReviewModal={() => setIsReviewModalOpen(true)}
              onSelectAlternative={() => {
                const alt =
                  restrooms.find(
                    (r) => r.regionId === currentRegionId && r.id !== featuredRestroom.id
                  ) || restrooms[0];
                setSelectedRestroom(alt);
                setDistanceToast(`🔄 已切換至替代路線：${alt.name}`);
                setTimeout(() => setDistanceToast(null), 3000);
              }}
            />
          </PhoneShell>
        </main>
      ) : (
        /* Mobile Interactive Simulator (Single-Phone View with Tab Switching) */
        <main className="max-w-md mx-auto flex flex-col items-center justify-center py-2">
          <PhoneShell
            time="09:45"
            islandText={
              mobileTab === 'map'
                ? 'SafePee'
                : mobileTab === 'crowd'
                ? 'CrowdScan'
                : mobileTab === 'cleaning'
                ? 'CleanAlert'
                : 'MyShield'
            }
            islandColor={
              mobileTab === 'map'
                ? 'emerald'
                : mobileTab === 'crowd'
                ? 'blue'
                : mobileTab === 'cleaning'
                ? 'amber'
                : 'emerald'
            }
            activeTab={mobileTab}
            onTabChange={(tab) => setMobileTab(tab)}
            screenLabel={`目前頁面 : ${
              mobileTab === 'map'
                ? '地圖探索'
                : mobileTab === 'crowd'
                ? '擁擠與安全'
                : mobileTab === 'cleaning'
                ? '清潔提醒與回饋'
                : '個人設定'
            }`}
            screenSubLabel="單機互動測試中"
            accentColor={
              mobileTab === 'crowd'
                ? 'blue'
                : mobileTab === 'cleaning'
                ? 'amber'
                : 'primary'
            }
            isSinglePhone={true}
          >
            {mobileTab === 'map' && (
              <Screen1Map
                restrooms={restrooms}
                selectedRestroom={selectedRestroom}
                onSelectRestroom={(r) => setSelectedRestroom(r)}
                filters={filters}
                onToggleFilter={handleToggleFilter}
                anxietyRadarActive={anxietyRadarActive}
                onTriggerThreeFingerGesture={handleTriggerThreeFingerGesture}
                onTriggerCircleGesture={() => setIsEmergencyModalOpen(true)}
                onOpenDetailModal={(r) => {
                  setDetailRestroom(r);
                  setIsDetailModalOpen(true);
                }}
                currentRegionId={currentRegionId}
                onChangeRegion={handleChangeRegion}
                isProUnlocked={isProUnlocked}
                onOpenPaywall={(reg) => {
                  setPaywallTargetRegion(reg || null);
                  setIsPaywallOpen(true);
                }}
              />
            )}

            {mobileTab === 'crowd' && (
              <Screen2Crowd
                selectedRestroom={selectedRestroom}
                filters={filters}
                onToggleFilter={handleToggleFilter}
                isBookmarked={bookmarkedIds.has(selectedRestroom.id)}
                onToggleBookmark={handleToggleBookmark}
                onOpenVoiceFilter={() => setIsVoiceModalOpen(true)}
              />
            )}

            {mobileTab === 'cleaning' && (
              <Screen3Cleaning
                selectedRestroom={selectedRestroom}
                onOpenQuickReport={() => setIsQuickReportOpen(true)}
                onOpenScheduleModal={() => setIsScheduleModalOpen(true)}
                onOpenReviewModal={() => setIsReviewModalOpen(true)}
                onSelectAlternative={() => {
                  const alt =
                    restrooms.find(
                      (r) => r.regionId === currentRegionId && r.id !== selectedRestroom.id
                    ) || restrooms[0];
                  setSelectedRestroom(alt);
                  setDistanceToast(`🔄 已切換至替代路線：${alt.name}`);
                  setTimeout(() => setDistanceToast(null), 3000);
                }}
              />
            )}

            {mobileTab === 'settings' && (
              <Screen4Settings
                settings={userSettings}
                onUpdateSettings={(newSt) => setUserSettings((s) => ({ ...s, ...newSt }))}
                onTriggerEmergencyMode={() => setIsEmergencyModalOpen(true)}
                isProUnlocked={isProUnlocked}
                onOpenPaywall={() => {
                  setPaywallTargetRegion(null);
                  setIsPaywallOpen(true);
                }}
                onTogglePro={() => {
                  setIsProUnlocked((prev) => !prev);
                  setUserSettings((s) => ({ ...s, isProUnlocked: !s.isProUnlocked }));
                }}
              />
            )}
          </PhoneShell>
        </main>
      )}

      {/* Presentation Footer Notes matching original Stitch export */}
      <footer className="max-w-4xl mx-auto mt-12 text-center text-xs text-slate-500 pb-8 select-none">
        <div className="flex flex-wrap items-center justify-center gap-4 mb-2.5">
          <span className="inline-flex items-center gap-1.5">
            <i className="fa-solid fa-check text-[#3E8E7E]"></i> 痛點過濾標籤 (性別友善 / 無障礙 / 親子)
          </span>
          <span className="inline-flex items-center gap-1.5">
            <i className="fa-solid fa-check text-[#3E8E7E]"></i> 焦慮雷達與手勢導航 (三指下滑 / 畫圈)
          </span>
          <span className="inline-flex items-center gap-1.5">
            <i className="fa-solid fa-check text-[#3E8E7E]"></i> 即時擁擠度監控 (12/35 間)
          </span>
          <span className="inline-flex items-center gap-1.5">
            <i className="fa-solid fa-check text-[#3E8E7E]"></i> 商業模式範圍解鎖 (台藝大/板橋免費 • 台北/桃園升級)
          </span>
        </div>
        <p className="text-slate-400">
          © 2025 SafePee.map (廁評) • 專為友善性別、身障與焦慮人群打造之智慧公廁指引系統 • 組別：第六組 (國立臺灣藝術大學 洪諄翔、林雍訢、楊杰睿、莎里谷姆)
        </p>
      </footer>

      {/* Emergency Relief Modal */}
      <EmergencyModal
        isOpen={isEmergencyModalOpen}
        onClose={() => {
          setIsEmergencyModalOpen(false);
          setIsEmergencyMode(false);
        }}
        nearestRestroom={selectedRestroom}
      />

      {/* Quick Report Modal */}
      <QuickReportModal
        isOpen={isQuickReportOpen}
        onClose={() => setIsQuickReportOpen(false)}
        restroomName={selectedRestroom.name}
        onSubmitReport={handleReportSubmit}
      />

      {/* Cleaning Schedule Modal */}
      <ScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        restroomName={selectedRestroom.name}
      />

      {/* Add Review Modal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        restroomName={selectedRestroom.name}
        onAddReview={handleAddReview}
      />

      {/* Gesture Sandbox Modal */}
      <GestureModal
        isOpen={isGestureModalOpen}
        onClose={() => setIsGestureModalOpen(false)}
        onTriggerEmergency={() => setIsEmergencyModalOpen(true)}
        onTriggerDistanceOverlay={handleTriggerThreeFingerGesture}
      />

      {/* Voice Recognition / Filter Modal */}
      <VoiceFilterModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onApplyVoiceCommand={handleVoiceCommand}
      />

      {/* Restroom Detailed Spec Modal */}
      <DetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        restroom={detailRestroom}
        onNavigateTo={(r) => {
          setSelectedRestroom(r);
          setDistanceToast(`📍 開始為您導航至：${r.name}`);
          setTimeout(() => setDistanceToast(null), 3000);
        }}
      />

      {/* Original Stitch Spec Reference Lightbox */}
      <OriginalSpecModal
        isOpen={isOriginalSpecOpen}
        onClose={() => setIsOriginalSpecOpen(false)}
      />

      {/* Paywall & Region Unlock Commercial Modal */}
      <PaywallModal
        isOpen={isPaywallOpen}
        onClose={() => setIsPaywallOpen(false)}
        targetRegion={paywallTargetRegion}
        onUnlockPro={handleUnlockPro}
      />
    </div>
  );
}
