import React, { useState } from 'react';
import { sound } from '../utils/audio';
import { Region } from '../types';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetRegion?: Region | null;
  onUnlockPro: () => void;
}

export const PaywallModal: React.FC<PaywallModalProps> = ({
  isOpen,
  onClose,
  targetRegion,
  onUnlockPro,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'lifetime'>('monthly');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    sound.playSuccessChime();
    setTimeout(() => {
      setIsProcessing(false);
      onUnlockPro();
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 select-none">
      <div className="w-full max-w-lg bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border border-slate-100 space-y-4 max-h-[92vh] overflow-y-auto no-scrollbar">
        {/* Header Badge */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-400 text-white flex items-center justify-center text-lg shadow-md shadow-amber-500/20">
              <i className="fa-solid fa-crown"></i>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-extrabold text-slate-900">SafePee Pro 全區守護會員</h3>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                  商業版付費解鎖
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                跨區解鎖 • 即時佔用推播 • 害羞膀胱頂級音波遮蔽
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-400 flex items-center justify-center text-sm transition"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Region Lock Notice Banner */}
        <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs space-y-1.5">
          <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs">
            <i className="fa-solid fa-lock text-amber-600"></i>
            <span>
              {targetRegion ? `目前點選之「${targetRegion.name}」屬於付費解鎖區域` : '您目前處於免費體驗版'}
            </span>
          </div>
          <p className="text-[11px] text-amber-800 leading-relaxed">
            【免費版權益】：系統預設已解鎖<strong className="text-amber-950 font-bold">「台藝大校園」</strong>與<strong className="text-amber-950 font-bold">「新北市板橋區」</strong>所有智慧公廁與預警功能。若需跨區前往<strong className="text-amber-950 font-bold">台北市、桃園市</strong>等外縣市，需升級 SafePee Pro 解鎖完整跨區即時導航數據。
          </p>
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          {/* Plan 1: Monthly */}
          <div
            onClick={() => {
              sound.playToggleSound(true);
              setSelectedPlan('monthly');
            }}
            className={`p-3.5 rounded-2xl border-2 transition cursor-pointer relative flex flex-col justify-between ${
              selectedPlan === 'monthly'
                ? 'border-[#3E8E7E] bg-[#3E8E7E]/5 shadow-xs'
                : 'border-slate-200 bg-slate-50 hover:bg-slate-100/70'
            }`}
          >
            <span className="absolute -top-2.5 right-3 bg-[#3E8E7E] text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-xs">
              首月免費試用 7 天
            </span>
            <div>
              <div className="font-extrabold text-slate-800 text-xs">全台解鎖月訂閱</div>
              <div className="text-[10px] text-slate-400 mt-0.5">跨縣市彈性無負擔</div>
              <div className="mt-2 text-xl font-black text-slate-900 font-mono">
                NT$ 49 <span className="text-[10px] text-slate-500 font-normal">/ 月</span>
              </div>
            </div>
            <div className="text-[10px] text-[#3E8E7E] font-bold mt-2 flex items-center gap-1">
              <i className="fa-solid fa-circle-check"></i>
              <span>隨時可取消</span>
            </div>
          </div>

          {/* Plan 2: Lifetime Pass */}
          <div
            onClick={() => {
              sound.playToggleSound(true);
              setSelectedPlan('lifetime');
            }}
            className={`p-3.5 rounded-2xl border-2 transition cursor-pointer relative flex flex-col justify-between ${
              selectedPlan === 'lifetime'
                ? 'border-[#FF7D66] bg-[#FF7D66]/5 shadow-xs'
                : 'border-slate-200 bg-slate-50 hover:bg-slate-100/70'
            }`}
          >
            <span className="absolute -top-2.5 right-3 bg-[#FF7D66] text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-xs">
              最划算 終身買斷
            </span>
            <div>
              <div className="font-extrabold text-slate-800 text-xs">全國尊榮通行證</div>
              <div className="text-[10px] text-slate-400 mt-0.5">終身全台公廁無界限</div>
              <div className="mt-2 text-xl font-black text-[#FF7D66] font-mono">
                NT$ 199 <span className="text-[10px] text-slate-500 font-normal">/ 永久</span>
              </div>
            </div>
            <div className="text-[10px] text-[#FF7D66] font-bold mt-2 flex items-center gap-1">
              <i className="fa-solid fa-bolt"></i>
              <span>一次付清無後續費用</span>
            </div>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-[11px] space-y-2">
          <div className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
            <i className="fa-solid fa-sparkles text-amber-500"></i>
            <span>方案權益對比</span>
          </div>
          <div className="space-y-1.5 text-slate-600">
            <div className="flex items-center justify-between pb-1 border-b border-slate-200/60">
              <span>台藝大校園 + 新北板橋區公廁地圖</span>
              <span className="font-bold text-emerald-600">免費包含</span>
            </div>
            <div className="flex items-center justify-between pb-1 border-b border-slate-200/60">
              <span>台北市（信義/大安/北車等）+ 桃園全區地圖</span>
              <span className="font-bold text-amber-600">Pro 專屬解鎖</span>
            </div>
            <div className="flex items-center justify-between pb-1 border-b border-slate-200/60">
              <span>即時 35 隔間佔用感應與高峰預測</span>
              <span className="font-bold text-amber-600">Pro 專屬解鎖</span>
            </div>
            <div className="flex items-center justify-between pb-1 border-b border-slate-200/60">
              <span>異性清潔跨區推播與 0 秒緊急路徑</span>
              <span className="font-bold text-amber-600">Pro 專屬解鎖</span>
            </div>
            <div className="flex items-center justify-between">
              <span>害羞膀胱（Paruresis）自然流水音音波遮蔽</span>
              <span className="font-bold text-amber-600">Pro 專屬解鎖</span>
            </div>
          </div>
        </div>

        {/* Student Special Notice */}
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-900 text-[11px]">
          <i className="fa-solid fa-graduation-cap text-[#3E8E7E] text-sm"></i>
          <div>
            <span className="font-bold">台藝大學生校園認證權益：</span>
            <span className="text-emerald-800">在校師生憑校園帳號享校區與板橋區永久免費使用！</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="pt-1 space-y-2">
          <button
            onClick={handleSimulatePayment}
            disabled={isProcessing}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#3E8E7E] to-[#5FB8A6] hover:from-[#3E8E7E]/90 hover:to-[#5FB8A6]/90 text-white font-extrabold text-sm shadow-lg shadow-[#3E8E7E]/25 transition flex items-center justify-center gap-2 disabled:opacity-75 cursor-pointer"
          >
            {isProcessing ? (
              <>
                <i className="fa-solid fa-circle-notch animate-spin text-sm"></i>
                <span>安全交易授權驗證中...</span>
              </>
            ) : (
              <>
                <i className="fa-solid fa-crown text-amber-300"></i>
                <span>立即升級解鎖全區公廁地圖 (模擬啟用)</span>
              </>
            )}
          </button>

          <div className="flex items-center justify-between text-[10px] text-slate-400 px-2">
            <button
              onClick={() => {
                sound.playSuccessChime();
                onUnlockPro();
                onClose();
              }}
              className="hover:text-slate-600 underline cursor-pointer"
            >
              還原購買紀錄 (Restore Purchases)
            </button>
            <span>SSL 256 位元安全加密</span>
          </div>
        </div>
      </div>
    </div>
  );
};
