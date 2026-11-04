import React from 'react';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  restroomName: string;
}

const SCHEDULE_SHIFTS = [
  { time: '08:00 - 08:30', staff: '林專員 (男)', target: '全區例行早巡與深層消毒', status: '已完成' },
  { time: '10:00 - 10:20', staff: '王專員 (女)', target: '男廁及全性別通用廁間保潔', status: '打掃進行中 (剩餘 10 分)' },
  { time: '14:00 - 14:30', staff: '陳專員 (女)', target: '女廁、育嬰哺乳室補充備品', status: '排程中' },
  { time: '18:00 - 18:25', staff: '李專員 (男)', target: '下班尖峰人流前深度清潔', status: '排程中' },
  { time: '21:00 - 21:40', staff: '張組長 (中性)', target: '夜間紫外線消殺與全區大考評', status: '排程中' },
];

export const ScheduleModal: React.FC<ScheduleModalProps> = ({ isOpen, onClose, restroomName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-5 shadow-2xl border border-slate-100 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-xs">
              <i className="fa-solid fa-calendar-check"></i>
            </div>
            <div>
              <h3 className="text-xs font-extrabold text-slate-800">打掃日程與清潔作業紀錄</h3>
              <p className="text-[10px] text-slate-400">{restroomName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-6 h-6 rounded-full hover:bg-slate-100 text-slate-400 flex items-center justify-center text-xs"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Timetable List */}
        <div className="space-y-2 text-xs">
          {SCHEDULE_SHIFTS.map((shift, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-2xl border transition ${
                shift.status.includes('進行中')
                  ? 'bg-amber-50/80 border-amber-300 ring-2 ring-amber-200/50'
                  : 'bg-slate-50 border-slate-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-slate-800 text-[11px] flex items-center gap-1.5">
                  <i className="fa-regular fa-clock text-[10px] text-slate-400"></i>
                  {shift.time}
                </span>
                <span
                  className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full ${
                    shift.status.includes('進行中')
                      ? 'bg-amber-200 text-amber-900 animate-pulse'
                      : shift.status === '已完成'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {shift.status}
                </span>
              </div>
              <div className="text-[11px] font-semibold text-slate-700 mt-1">{shift.target}</div>
              <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-2">
                <span>執行責任人: {shift.staff}</span>
                <span>•</span>
                <span>備品即時連線監控</span>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition"
        >
          關閉查看
        </button>
      </div>
    </div>
  );
};
