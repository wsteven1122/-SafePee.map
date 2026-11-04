export type RegionId = 'ntua' | 'banqiao' | 'taipei' | 'taoyuan';

export interface Region {
  id: RegionId;
  name: string;
  shortName: string;
  isDefaultUnlocked: boolean;
  restroomsCount: number;
  description: string;
  badge: string;
}

export interface RestroomReview {
  id: string;
  author: string;
  role: string;
  rating: number;
  date: string;
  content: string;
  tags: string[];
  avatarInitial: string;
  avatarBg: string;
}

export interface RestroomStall {
  id: number;
  type: 'all-gender' | 'male' | 'female' | 'accessible' | 'family';
  isOccupied: boolean;
  hasFullPartition: boolean;
  hasAntiPeepLock: boolean;
}

export interface Restroom {
  id: string;
  name: string;
  subLocation: string;
  category: string;
  regionId: RegionId;
  distanceMeters: number;
  walkMinutes: number;
  rating: number;
  comfortBadge: '優' | '良好' | '普通' | '擁擠';
  crowdStatus: '充足' | '普通' | '擁擠';
  totalStalls: number;
  occupiedStalls: number;
  maleStalls: number;
  femaleStalls: number;
  allGenderStalls: number;
  babyCare: boolean;
  accessible: boolean;
  independentStall: boolean;
  floorToCeilingPartition: boolean;
  queueConcealment: boolean;
  antiPeepLock: boolean;
  spacious: boolean;
  cleaningStatus: {
    isCleaning: boolean;
    cleanerGender: '男性' | '女性' | '中性';
    targetGender: '男廁' | '女廁' | '全性別獨立間';
    minutesRemaining: number;
    recommendedAlternative: string;
    safetyInspectionStatus: string;
  };
  reviews: RestroomReview[];
  stalls: RestroomStall[];
  mapCoords: { x: number; y: number };
}

export interface FilterState {
  genderFriendly: boolean;
  accessible: boolean;
  parentChild: boolean;
  independentStall: boolean;
  antiPeep: boolean;
  queueConcealment: boolean;
  noGenderConflict: boolean;
  spacious: boolean;
  notCrowded: boolean;
}

export interface UserSettings {
  userName: string;
  isProUnlocked: boolean;
  selectedRegion: RegionId;
  paruresisMode: boolean; // 焦慮/害羞膀胱音頻遮蔽與離峰導航
  audioMaskingType: 'pink-noise' | 'waterfall' | 'gentle-rain' | 'off';
  genderAffirmingPriority: 'all-gender' | 'private-single' | 'standard';
  accessibilityNeed: boolean;
  strollerNeed: boolean;
  autoCleaningAlert: boolean;
  highContrastMap: boolean;
  soundEffects: boolean;
}
