import React from 'react';

interface OriginalSpecModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ORIGINAL_IMAGE_URL =
  'https://lh3.googleusercontent.com/aida/AEtjO1UIBcMI0wsQe4HJyCI_kMgUVKBnRvyuMPK9PxDsw0jMpOuOZS3iZnDDvFUiN4QRtUG5wJZtQ0fmRpxTzAiU8H4tVXhLR63xKpyJ5IVl34s2OaK46DdKbdKmkdGtxYk2wxsntQVz7VdEGlMSPD7vsu_K_C4fdHBU49TLUqPPIXyxsQuCzI3ONZ0NFio5RVSRszcLzptWSsYTWZzAOwLFRhAv3Jobx1DtkUo0hA8vvVH8o08twEWQsfNzcAA';

export const OriginalSpecModal: React.FC<OriginalSpecModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 select-none">
      <div className="w-full max-w-4xl bg-white rounded-3xl p-5 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-sm">
              <i className="fa-solid fa-layer-group"></i>
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-800">
                Stitch 原稿設計對照 (Project 13741609565754940846)
              </h3>
              <p className="text-[11px] text-slate-400">
                SafePee.map (廁評) 三屏聯動設計稿 • Google Stitch Labs Export
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-500 flex items-center justify-center text-sm"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Image Preview Container */}
        <div className="flex-1 overflow-auto bg-slate-100 rounded-2xl p-2 border border-slate-200/80 flex items-center justify-center min-h-0">
          <img
            src={ORIGINAL_IMAGE_URL}
            alt="Stitch 原始三聯屏設計稿"
            referrerPolicy="no-referrer"
            className="max-w-full max-h-[65vh] object-contain rounded-xl shadow-md border border-slate-200"
          />
        </div>

        {/* Footer info */}
        <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 shrink-0 pt-1 gap-2">
          <span>組別: 第六組 (洪諄翔、林雍訢、楊杰睿、莎里谷姆)</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition"
          >
            返回體驗應用程式
          </button>
        </div>
      </div>
    </div>
  );
};
