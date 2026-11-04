import React, { useState } from 'react';
import { RestroomReview } from '../types';
import { sound } from '../utils/audio';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  restroomName: string;
  onAddReview: (review: RestroomReview) => void;
}

const AVAILABLE_TAGS = [
  '#獨立隔間',
  '#通風良好',
  '#尿布台',
  '#寬敞無障礙',
  '#無性別衝突',
  '#隔音極佳',
  '#防窺門鎖',
  '#乾淨無異味',
];

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  restroomName,
  onAddReview,
}) => {
  const [author, setAuthor] = useState('');
  const [role, setRole] = useState('訪客');
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>(['#獨立隔間', '#通風良好']);

  if (!isOpen) return null;

  const toggleTag = (tag: string) => {
    sound.playToggleSound(!selectedTags.includes(tag));
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    sound.playSuccessChime();
    const newRev: RestroomReview = {
      id: `r-${Date.now()}`,
      author: author.trim() || '熱心使用者',
      role,
      rating,
      date: '剛剛',
      content: content.trim(),
      tags: selectedTags,
      avatarInitial: (author.trim() || '熱')[0],
      avatarBg: 'bg-emerald-100 text-emerald-800',
    };

    onAddReview(newRev);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-5 shadow-2xl border border-slate-100 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#3E8E7E]/10 text-[#3E8E7E] flex items-center justify-center text-xs">
              <i className="fa-solid fa-pen-to-square"></i>
            </div>
            <div>
              <h3 className="text-xs font-extrabold text-slate-800">撰寫公廁安心評價 (廁評)</h3>
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

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          {/* Star Rating */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              總體舒適與安心評分
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => {
                    sound.playToggleSound(true);
                    setRating(star);
                  }}
                  className="text-xl text-amber-400 hover:scale-110 transition p-1"
                >
                  <i className={`fa-solid ${star <= rating ? 'fa-star' : 'fa-star text-slate-200'}`}></i>
                </button>
              ))}
              <span className="text-xs font-bold text-slate-600 ml-1">{rating}.0 分</span>
            </div>
          </div>

          {/* Name & Role */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">暱稱 (可選)</label>
              <input
                type="text"
                placeholder="例如: 謝同學"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full text-xs p-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#3E8E7E]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">身份標籤</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full text-xs p-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#3E8E7E]"
              >
                <option value="訪客">校園/市民訪客</option>
                <option value="推車家長">推車家長</option>
                <option value="輪椅使用者">輪椅身障人士</option>
                <option value="多元性別認同者">多元性別群體</option>
                <option value="考研/自習學生">安靜自習生</option>
              </select>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">特色標籤選擇</label>
            <div className="flex flex-wrap gap-1.5">
              {AVAILABLE_TAGS.map((tag) => (
                <button
                  type="button"
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-2 py-1 rounded-lg text-[10px] font-bold transition ${
                    selectedTags.includes(tag)
                      ? 'bg-[#3E8E7E] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Review Content */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              真實使用感受 (隔板防窺、排隊動線、清潔程度)
            </label>
            <textarea
              rows={3}
              required
              placeholder="分享這座廁所是否有全隔板、是否容易與人尷尬視線對上、環境備品是否齊全..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#3E8E7E]"
            />
          </div>

          {/* Actions */}
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
              發布真實廁評
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
