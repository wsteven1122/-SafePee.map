import React, { useState } from 'react';
import { UserSettings } from '../types';
import { sound } from '../utils/audio';

interface Screen4SettingsProps {
  settings: UserSettings;
  onUpdateSettings: (newSettings: Partial<UserSettings>) => void;
  onTriggerEmergencyMode: () => void;
  isProUnlocked: boolean;
  onOpenPaywall: () => void;
  onTogglePro: () => void;
}

export const Screen4Settings: React.FC<Screen4SettingsProps> = ({
  settings,
  onUpdateSettings,
  onTriggerEmergencyMode,
  isProUnlocked,
  onOpenPaywall,
  onTogglePro,
}) => {
  const [isMaskingPlaying, setIsMaskingPlaying] = useState(false);

  const handleToggleMasking = (type: UserSettings['audioMaskingType']) => {
    sound.toggleMasking(type, (playing) => {
      setIsMaskingPlaying(playing);
    });
    onUpdateSettings({ audioMaskingType: type });
  };

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-3.5 select-none bg-slate-50">
      {/* Profile Card */}
      <div className="bg-white rounded-3xl p-4 shadow-card border border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#3E8E7E] to-[#5FB8A6] text-white flex items-center justify-center text-lg font-bold shadow-xs">
            <i className="fa-solid fa-user-shield"></i>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-extrabold text-slate-800">{settings.userName}</span>
              <span className="text-[9.5px] px-2 py-0.5 rounded-full bg-[#3E8E7E]/10 text-[#3E8E7E] font-bold">
                台藝大第六組
              </span>
            </div>
            <p className="text-[10.5px] text-slate-400 mt-0.5">自定義隱私、無障礙與如廁減焦慮配置</p>
          </div>
        </div>
        <button
          onClick={() => {
            sound.playSuccessChime();
            onTriggerEmergencyMode();
          }}
          className="px-2.5 py-1.5 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 text-xs font-bold hover:bg-rose-100 transition flex items-center gap-1 cursor-pointer"
        >
          <i className="fa-solid fa-triangle-exclamation text-xs"></i>
          <span>緊急模式</span>
        </button>
      </div>

      {/* NEW: Membership & Region Authorization (商業模式與範圍解鎖) */}
      <div className="bg-gradient-to-br from-white to-amber-50/40 rounded-3xl p-4 shadow-card border border-amber-200/80 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 text-white flex items-center justify-center text-xs shadow-xs">
              <i className="fa-solid fa-crown"></i>
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-800">
                商業模式與區域解鎖授權
              </div>
              <div className="text-[10px] text-slate-500">
                {isProUnlocked
                  ? 'SafePee Pro 全台無界限會員 (已解鎖)'
                  : '免費學生版 (僅限台藝大與板橋區)'}
              </div>
            </div>
          </div>
          <span
            className={`px-2 py-0.5 rounded-full text-[9.5px] font-extrabold ${
              isProUnlocked
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
            }`}
          >
            {isProUnlocked ? '★ Pro 全區版' : '免費版'}
          </span>
        </div>

        {/* Region access status */}
        <div className="p-2.5 bg-white rounded-2xl border border-slate-100 text-xs space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-600 flex items-center gap-1.5">
              <i className="fa-solid fa-circle-check text-emerald-500 text-[10px]"></i>
              國立臺灣藝術大學 (校本部)
            </span>
            <span className="font-bold text-emerald-600 text-[10px]">免費已解鎖</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-600 flex items-center gap-1.5">
              <i className="fa-solid fa-circle-check text-emerald-500 text-[10px]"></i>
              新北市板橋區 (市政/府中)
            </span>
            <span className="font-bold text-emerald-600 text-[10px]">免費已解鎖</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-600 flex items-center gap-1.5">
              <i
                className={`fa-solid text-[10px] ${
                  isProUnlocked
                    ? 'fa-circle-check text-emerald-500'
                    : 'fa-lock text-amber-500'
                }`}
              ></i>
              台北市 (信義/大安/北車)
            </span>
            <span
              className={`font-bold text-[10px] ${
                isProUnlocked ? 'text-emerald-600' : 'text-amber-600'
              }`}
            >
              {isProUnlocked ? 'Pro 已解鎖' : '🔒 需升級解鎖'}
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-600 flex items-center gap-1.5">
              <i
                className={`fa-solid text-[10px] ${
                  isProUnlocked
                    ? 'fa-circle-check text-emerald-500'
                    : 'fa-lock text-amber-500'
                }`}
              ></i>
              桃園都會區 (總圖/高鐵)
            </span>
            <span
              className={`font-bold text-[10px] ${
                isProUnlocked ? 'text-emerald-600' : 'text-amber-600'
              }`}
            >
              {isProUnlocked ? 'Pro 已解鎖' : '🔒 需升級解鎖'}
            </span>
          </div>
        </div>

        {/* Upgrade / Toggle buttons */}
        <div className="flex items-center gap-2 pt-0.5">
          {!isProUnlocked ? (
            <button
              onClick={onOpenPaywall}
              className="flex-1 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-black text-xs hover:from-amber-600 hover:to-amber-500 transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <i className="fa-solid fa-crown text-[10px]"></i>
              <span>升級 SafePee Pro 全區解鎖</span>
            </button>
          ) : (
            <div className="flex-1 text-[11px] font-bold text-amber-900 bg-amber-100/60 p-2 rounded-xl text-center">
              ✨ 感謝您支持 SafePee Pro，全台無界限安心如廁！
            </div>
          )}

          <button
            onClick={() => {
              sound.playSuccessChime();
              onTogglePro();
            }}
            className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer"
            title="測試切換免費版/付費解鎖"
          >
            {isProUnlocked ? '切換回免費版' : '一鍵模擬解鎖'}
          </button>
        </div>
      </div>

      {/* Section 1: Paruresis / Shy Bladder Mode (音頻遮蔽與流水音) */}
      <div className="bg-white rounded-3xl p-4 shadow-card border border-slate-100 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center text-xs">
              <i className="fa-solid fa-water"></i>
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-800">害羞膀胱 / 如廁焦慮守護</div>
              <div className="text-[10px] text-slate-500">內建擬真自然音波遮蔽，防尷尬與焦慮</div>
            </div>
          </div>
          <span
            className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
              isMaskingPlaying ? 'bg-emerald-100 text-emerald-800 animate-pulse' : 'bg-slate-100 text-slate-500'
            }`}
          >
            {isMaskingPlaying ? '播放遮蔽音中' : '未播放'}
          </span>
        </div>

        {/* Audio masking buttons */}
        <div className="grid grid-cols-3 gap-2 text-xs pt-1">
          <button
            onClick={() => handleToggleMasking(isMaskingPlaying ? 'off' : 'waterfall')}
            className={`p-2 rounded-xl border text-center transition flex flex-col items-center gap-1 cursor-pointer ${
              settings.audioMaskingType === 'waterfall' && isMaskingPlaying
                ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-teal-50'
            }`}
          >
            <i className="fa-solid fa-water text-xs"></i>
            <span className="font-bold text-[10.5px]">潺潺流水音</span>
          </button>

          <button
            onClick={() => handleToggleMasking(isMaskingPlaying ? 'off' : 'pink-noise')}
            className={`p-2 rounded-xl border text-center transition flex flex-col items-center gap-1 cursor-pointer ${
              settings.audioMaskingType === 'pink-noise' && isMaskingPlaying
                ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-teal-50'
            }`}
          >
            <i className="fa-solid fa-wave-square text-xs"></i>
            <span className="font-bold text-[10.5px]">粉紅噪聲</span>
          </button>

          <button
            onClick={() => handleToggleMasking('off')}
            className="p-2 rounded-xl border text-center transition flex flex-col items-center gap-1 bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 cursor-pointer"
          >
            <i className="fa-solid fa-volume-xmark text-xs"></i>
            <span className="font-bold text-[10.5px]">靜音停止</span>
          </button>
        </div>
      </div>

      {/* Section 2: Gender Inclusivity & Privacy */}
      <div className="bg-white rounded-3xl p-4 shadow-card border border-slate-100 space-y-3">
        <div className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
          <i className="fa-solid fa-venus-mars text-[#3E8E7E]"></i>
          <span>性別友善與空間偏好 (Inclusivity Priority)</span>
        </div>

        <div className="space-y-2 text-xs">
          <div
            onClick={() => {
              sound.playToggleSound(true);
              onUpdateSettings({
                genderAffirmingPriority:
                  settings.genderAffirmingPriority === 'all-gender' ? 'standard' : 'all-gender',
              });
            }}
            className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 hover:bg-slate-100 cursor-pointer transition"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs">
                <i className="fa-solid fa-person-arrow-up-from-ground"></i>
              </div>
              <div>
                <div className="font-bold text-slate-800 text-[11px]">優先推薦全性別獨立空間</div>
                <div className="text-[9.5px] text-slate-500">避開傳統性別二分標籤，享受尊嚴如廁</div>
              </div>
            </div>
            <span className="w-5 h-5 rounded-full bg-[#3E8E7E] text-white flex items-center justify-center text-[10px]">
              {settings.genderAffirmingPriority === 'all-gender' ? (
                <i className="fa-solid fa-check"></i>
              ) : null}
            </span>
          </div>

          <div
            onClick={() => {
              sound.playToggleSound(!settings.accessibilityNeed);
              onUpdateSettings({ accessibilityNeed: !settings.accessibilityNeed });
            }}
            className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 hover:bg-slate-100 cursor-pointer transition"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center text-xs">
                <i className="fa-solid fa-wheelchair"></i>
              </div>
              <div>
                <div className="font-bold text-slate-800 text-[11px]">無障礙坡道與大型電動門需求</div>
                <div className="text-[9.5px] text-slate-500">過濾無門檻或提供輪椅平移空間</div>
              </div>
            </div>
            <div
              className={`w-9 h-5 rounded-full relative p-0.5 transition-colors flex items-center ${
                settings.accessibilityNeed ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow-xs transition-transform ${
                  settings.accessibilityNeed ? 'ml-auto' : 'mr-auto'
                }`}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Cleaning & Notifications */}
      <div className="bg-white rounded-3xl p-4 shadow-card border border-slate-100 space-y-2.5">
        <div className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
          <i className="fa-solid fa-bell text-amber-500"></i>
          <span>即時提醒與感應偏好</span>
        </div>

        <div
          onClick={() => {
            sound.playToggleSound(!settings.autoCleaningAlert);
            onUpdateSettings({ autoCleaningAlert: !settings.autoCleaningAlert });
          }}
          className="flex items-center justify-between p-2 rounded-xl bg-slate-50 cursor-pointer"
        >
          <div className="text-[11px] font-bold text-slate-700">異性打掃中預警提示音</div>
          <div
            className={`w-9 h-5 rounded-full relative p-0.5 transition-colors flex items-center ${
              settings.autoCleaningAlert ? 'bg-amber-500' : 'bg-slate-300'
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow-xs transition-transform ${
                settings.autoCleaningAlert ? 'ml-auto' : 'mr-auto'
              }`}
            ></div>
          </div>
        </div>

        <div
          onClick={() => {
            sound.playToggleSound(!settings.soundEffects);
            onUpdateSettings({ soundEffects: !settings.soundEffects });
          }}
          className="flex items-center justify-between p-2 rounded-xl bg-slate-50 cursor-pointer"
        >
          <div className="text-[11px] font-bold text-slate-700">介面點擊回饋音效</div>
          <div
            className={`w-9 h-5 rounded-full relative p-0.5 transition-colors flex items-center ${
              settings.soundEffects ? 'bg-[#3E8E7E]' : 'bg-slate-300'
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow-xs transition-transform ${
                settings.soundEffects ? 'ml-auto' : 'mr-auto'
              }`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
