import React, { useState, useEffect } from 'react';
import { sound } from '../utils/audio';

interface VoiceFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyVoiceCommand: (command: string) => void;
}

const VOICE_PRESETS = [
  { text: '過濾擁擠廁所', label: '「說：過濾擁擠」' },
  { text: '找性別友善獨立間', label: '「說：性別友善」' },
  { text: '找無障礙大空間', label: '「說：無障礙」' },
  { text: '找親子育嬰室', label: '「說：親子育嬰」' },
  { text: '避開異性清潔打掃', label: '「說：避開清潔」' },
];

export const VoiceFilterModal: React.FC<VoiceFilterModalProps> = ({
  isOpen,
  onClose,
  onApplyVoiceCommand,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [speechSupported, setSpeechSupported] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setIsListening(true);
    setTranscript('正在聆聽中，請說出篩選關鍵字...');

    // Try Web Speech API if supported
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const windowObj = window as any;
    const SpeechRecognitionClass = windowObj.SpeechRecognition || windowObj.webkitSpeechRecognition;

    if (SpeechRecognitionClass) {
      setSpeechSupported(true);
      try {
        const recognition = new SpeechRecognitionClass();
        recognition.lang = 'zh-TW';
        recognition.continuous = false;
        recognition.interimResults = true;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recognition.onresult = (event: any) => {
          const current = event.results[0][0].transcript;
          setTranscript(current);
          if (event.results[0].isFinal) {
            sound.playSuccessChime();
            setTimeout(() => {
              onApplyVoiceCommand(current);
              onClose();
            }, 800);
          }
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.start();
        return () => {
          recognition.stop();
        };
      } catch {
        // Fallback to simulation
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectPreset = (text: string) => {
    sound.playSuccessChime();
    setTranscript(text);
    setTimeout(() => {
      onApplyVoiceCommand(text);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 select-none">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-700 text-white rounded-3xl p-5 shadow-2xl text-center space-y-4">
        {/* Pulsing Mic */}
        <div className="py-2">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#FF7D66]/20 border-2 border-[#FF7D66] flex items-center justify-center text-[#FF7D66] text-2xl animate-pulse">
            <i className="fa-solid fa-microphone"></i>
          </div>
          <h3 className="text-sm font-extrabold text-white mt-3">語音智能篩選中 (Voice Filter)</h3>
          <p className="text-xs text-slate-400 mt-0.5">免動手觸控，直接開口說出需求</p>
        </div>

        {/* Live Transcript Box */}
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-700 min-h-[50px] flex items-center justify-center">
          <span className="text-xs font-semibold text-emerald-400 font-mono">
            {transcript || '請說出指令...'}
          </span>
        </div>

        {/* Quick Voice Shortcut Buttons */}
        <div className="space-y-1.5 pt-1 text-left">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            或點選常用語音指令：
          </span>
          <div className="grid grid-cols-1 gap-1.5">
            {VOICE_PRESETS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectPreset(p.text)}
                className="w-full px-3 py-2 bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 rounded-xl text-xs font-medium text-left flex items-center justify-between transition border border-slate-700/60"
              >
                <span>{p.label}</span>
                <i className="fa-solid fa-waveform-lines text-[10px] text-teal-400"></i>
              </button>
            ))}
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-xl text-xs font-bold transition"
        >
          取消語音輸入
        </button>
      </div>
    </div>
  );
};
