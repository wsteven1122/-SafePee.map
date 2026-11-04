import React, { useState } from 'react';
import { sound } from '../utils/audio';

interface QuickReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  restroomName: string;
  onSubmitReport: (issue: string, note: string) => void;
}

const COMMON_ISSUES = [
  { id: 'no-paper', label: '衛生紙已用罄', icon: 'fa-solid fa-toilet-paper' },
  { id: 'dirty-floor', label: '地面濕滑或髒污', icon: 'fa-solid fa-water' },
  { id: 'broken-lock', label: '門鎖損壞無法關緊', icon: 'fa-solid fa-lock-open' },
  { id: 'odor', label: '異味過重需通風', icon: 'fa-solid fa-wind' },
  { id: 'cleaning-conflict', label: '異性打掃作業干擾', icon: 'fa-solid fa-broom' },
  { id: 'emergency-call', label: '需清潔人員緊急到場', icon: 'fa-solid fa-bell-concierge' },
];

export const QuickReportModal: React.FC<QuickReportModalProps> = ({
  isOpen,
  onClose,
  restroomName,
  onSubmitReport,
}) => {
  const [selectedIssue, setSelectedIssue] = useState('no-paper');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playSuccessChime();
    const issueObj = COMMON_ISSUES.find((i) => i.id === selectedIssue);
    onSubmitReport(issueObj ? issueObj.label : '未知異常', notes);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-slate-100 space-y-4">
        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-[#3E8E7E] flex items-center justify-center text-2xl">
              <i className="fa-solid fa-check"></i>
            </div>
            <h3 className="text-base font-extrabold text-slate-800">感謝您的即時回報！</h3>
            <p className="text-xs text-slate-500">已通知該場站清潔值班人員，公廁狀態已同步更新。</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#3E8E7E]/10 text-[#3E8E7E] flex items-center justify-center text-xs">
                  <i className="fa-solid fa-hand-holding-hand"></i>
                </div>
                <div>
                  <h3 className="text-xs font-extrabold text-slate-800">隨手一搖快速回報</h3>
                  <p className="text-[10px] text-slate-400">{restroomName}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-6 h-6 rounded-full hover:bg-slate-100 text-slate-400 flex items-center justify-center text-xs"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            {/* Quick Chips */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              {COMMON_ISSUES.map((issue) => (
                <button
                  type="button"
                  key={issue.id}
                  onClick={() => {
                    sound.playToggleSound(true);
                    setSelectedIssue(issue.id);
                  }}
                  className={`p-2.5 rounded-xl border text-left transition flex items-center gap-2 ${
                    selectedIssue === issue.id
                      ? 'border-[#3E8E7E] bg-[#3E8E7E]/10 text-[#3E8E7E] font-bold shadow-xs'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <i className={`${issue.icon} text-xs text-slate-400`}></i>
                  <span className="text-[11px] leading-tight">{issue.label}</span>
                </button>
              ))}
            </div>

            {/* Additional note */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                補充說明 (可選)
              </label>
              <input
                type="text"
                placeholder="例如: 靠近第 3 間無障礙隔間..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#3E8E7E]"
              />
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs hover:bg-slate-200 transition"
              >
                取消
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-[#3E8E7E] text-white font-extrabold text-xs hover:bg-[#3E8E7E]/90 shadow-md transition"
              >
                確認送出回報
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
