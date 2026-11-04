import React, { useRef, useState } from 'react';
import { sound } from '../utils/audio';

interface GestureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerEmergency: () => void;
  onTriggerDistanceOverlay: () => void;
}

export const GestureModal: React.FC<GestureModalProps> = ({
  isOpen,
  onClose,
  onTriggerEmergency,
  onTriggerDistanceOverlay,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
  const [gestureFeedback, setGestureFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    setGestureFeedback(null);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const p = { x: clientX - rect.left, y: clientY - rect.top };
    setPoints([p]);

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.strokeStyle = '#FF7D66';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const p = { x: clientX - rect.left, y: clientY - rect.top };

    setPoints((prev) => [...prev, p]);

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    }
  };

  const endDraw = () => {
    setIsDrawing(false);
    if (points.length < 10) return;

    // Check if path forms a loop/circle (start is close to end, and has reasonable width/height)
    const first = points[0];
    const last = points[points.length - 1];
    const dist = Math.hypot(last.x - first.x, last.y - first.y);

    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (const pt of points) {
      if (pt.x < minX) minX = pt.x;
      if (pt.x > maxX) maxX = pt.x;
      if (pt.y < minY) minY = pt.y;
      if (pt.y > maxY) maxY = pt.y;
    }
    const width = maxX - minX;
    const height = maxY - minY;

    if (dist < 60 && width > 40 && height > 40) {
      sound.playSuccessChime();
      setGestureFeedback('✨ 成功識別「畫圈手勢」！啟動緊急前往...');
      setTimeout(() => {
        onClose();
        onTriggerEmergency();
      }, 1000);
    } else {
      setGestureFeedback('請在畫布上畫一個完整的圓圈以啟動緊急導航');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 select-none">
      <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-slate-100 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#FF7D66]/10 text-[#FF7D66] flex items-center justify-center text-xs">
              <i className="fa-solid fa-hand-pointer"></i>
            </div>
            <div>
              <h3 className="text-xs font-extrabold text-slate-800">直覺手勢輔助體驗台</h3>
              <p className="text-[10px] text-slate-400">模擬三指下滑與畫圈手勢</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-6 h-6 rounded-full hover:bg-slate-100 text-slate-400 flex items-center justify-center text-xs"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Gesture 1 button */}
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
              <i className="fa-solid fa-angles-down text-[#3E8E7E]"></i>
              手勢一：三指下滑
            </span>
            <span className="text-[9.5px] bg-[#3E8E7E]/10 text-[#3E8E7E] px-2 py-0.5 rounded-full font-bold">
              距離預估
            </span>
          </div>
          <p className="text-[10.5px] text-slate-500">
            遇到急迫情形無需細看螢幕，在手機任意區域三指下拉，直接語音播報剩餘距離與預估步時。
          </p>
          <button
            onClick={() => {
              sound.playSuccessChime();
              onTriggerDistanceOverlay();
              onClose();
            }}
            className="w-full py-2 rounded-xl bg-white border border-[#3E8E7E]/40 text-[#3E8E7E] font-bold text-xs hover:bg-[#3E8E7E]/5 transition flex items-center justify-center gap-1.5 shadow-xs"
          >
            <i className="fa-solid fa-play text-[10px]"></i>
            <span>模擬觸發「三指下滑」預估</span>
          </button>
        </div>

        {/* Gesture 2 interactive canvas */}
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
              <i className="fa-solid fa-arrows-spin text-[#FF7D66]"></i>
              手勢二：手指畫圈 (一秒啟動緊急)
            </span>
            <span className="text-[9.5px] bg-[#FFEBE7] text-[#FF7D66] px-2 py-0.5 rounded-full font-bold">
              緊急模式
            </span>
          </div>
          <p className="text-[10.5px] text-slate-500">
            在下方虛線方框內用滑鼠或手指直接畫一個圓圈測試手勢感應：
          </p>

          <canvas
            ref={canvasRef}
            width={280}
            height={130}
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={endDraw}
            onTouchStart={startDraw}
            onTouchMove={draw}
            onTouchEnd={endDraw}
            className="w-full bg-white rounded-xl border border-dashed border-slate-300 touch-none cursor-crosshair shadow-inner"
          />

          {gestureFeedback && (
            <div className="text-[10.5px] font-bold text-center text-[#FF7D66] animate-pulse">
              {gestureFeedback}
            </div>
          )}

          <button
            onClick={() => {
              sound.playSuccessChime();
              onTriggerEmergency();
              onClose();
            }}
            className="w-full py-1.5 rounded-xl bg-[#FF7D66]/10 text-[#FF7D66] font-bold text-xs hover:bg-[#FF7D66]/20 transition"
          >
            直接模擬「畫圈」啟動緊急導航
          </button>
        </div>
      </div>
    </div>
  );
};
