import { Restroom, Region } from '../types';

export const REGIONS: Region[] = [
  {
    id: 'ntua',
    name: '國立臺灣藝術大學 (台藝大校園)',
    shortName: '台藝大校園',
    isDefaultUnlocked: true,
    restroomsCount: 3,
    description: '校內綜合大樓、教學研究大樓、影音大樓與全校友善示範點',
    badge: '免費預設解鎖'
  },
  {
    id: 'banqiao',
    name: '新北市板橋區 (府中商圈 / 市政園區)',
    shortName: '新北板橋區',
    isDefaultUnlocked: true,
    restroomsCount: 4,
    description: '市民廣場 B1、SafePee 旗艦點、捷運站與新北市立圖書館總館',
    badge: '免費預設解鎖'
  },
  {
    id: 'taipei',
    name: '台北市核心特區 (信義商圈 / 台北車站 / 大安)',
    shortName: '台北市核心區',
    isDefaultUnlocked: false,
    restroomsCount: 5,
    description: '信義百貨商圈、台北車站地下街、大安森林公園景觀示範廁所',
    badge: '🔒 Pro 付費解鎖'
  },
  {
    id: 'taoyuan',
    name: '桃園都會特區 (藝文廣場 / 高鐵特區)',
    shortName: '桃園都會區',
    isDefaultUnlocked: false,
    restroomsCount: 3,
    description: '桃園市立圖書館總館、藝文特區綠廊與桃園高鐵站友善廁所',
    badge: '🔒 Pro 付費解鎖'
  }
];

export const initialRestrooms: Restroom[] = [
  // ==========================================
  // NTUA CAMPUS (台藝大校園) - 免費版預設解鎖
  // ==========================================
  {
    id: 'ntua-comprehensive',
    name: '台藝大 綜合大樓 1F (性別友善示範點)',
    subLocation: '台藝大校本部 綜合大樓 靠近美術學系側',
    category: '大專院校示範廁所',
    regionId: 'ntua',
    distanceMeters: 80,
    walkMinutes: 1,
    rating: 4.9,
    comfortBadge: '優',
    crowdStatus: '充足',
    totalStalls: 18,
    occupiedStalls: 3,
    maleStalls: 6,
    femaleStalls: 6,
    allGenderStalls: 6,
    babyCare: true,
    accessible: true,
    independentStall: true,
    floorToCeilingPartition: true,
    queueConcealment: true,
    antiPeepLock: true,
    spacious: true,
    cleaningStatus: {
      isCleaning: false,
      cleanerGender: '中性',
      targetGender: '全性別獨立間',
      minutesRemaining: 0,
      recommendedAlternative: '本校園示範點常態開放，通風良好',
      safetyInspectionStatus: '已通過教育部校園友善廁所安全認證'
    },
    reviews: [
      {
        id: 'r-ntua-1',
        author: '藝設系 鄭同學',
        role: '校園學生',
        rating: 5,
        date: '5 分鐘前',
        content: '大一剛進來最怕去傳統男廁被盯著看，綜合大樓這間全隔板完全拯救了我的社交焦慮！',
        tags: ['#台藝大友善點', '#獨立隔間', '#隔音極佳'],
        avatarInitial: '鄭',
        avatarBg: 'bg-emerald-100 text-emerald-800'
      },
      {
        id: 'r-ntua-2',
        author: '視傳系 楊同學',
        role: '第六組團隊成員',
        rating: 5,
        date: '半小時前',
        content: '實測水流聲遮蔽與隔板間隙完全零死角，做模型熬夜時最安心的去處。',
        tags: ['#第六組認證', '#通風良好'],
        avatarInitial: '楊',
        avatarBg: 'bg-teal-100 text-teal-800'
      }
    ],
    stalls: Array.from({ length: 18 }, (_, i) => ({
      id: i + 1,
      type: i < 6 ? 'all-gender' : i < 12 ? 'female' : 'male',
      isOccupied: [2, 7, 13].includes(i + 1),
      hasFullPartition: true,
      hasAntiPeepLock: true
    })),
    mapCoords: { x: 210, y: 220 }
  },
  {
    id: 'ntua-research',
    name: '台藝大 教學研究大樓 B1 獨立隔間',
    subLocation: '台藝大 教研大樓 地下展演廳旁',
    category: '文創演藝場域',
    regionId: 'ntua',
    distanceMeters: 140,
    walkMinutes: 2,
    rating: 4.7,
    comfortBadge: '優',
    crowdStatus: '充足',
    totalStalls: 14,
    occupiedStalls: 4,
    maleStalls: 4,
    femaleStalls: 6,
    allGenderStalls: 4,
    babyCare: false,
    accessible: true,
    independentStall: true,
    floorToCeilingPartition: true,
    queueConcealment: true,
    antiPeepLock: true,
    spacious: true,
    cleaningStatus: {
      isCleaning: false,
      cleanerGender: '男性',
      targetGender: '男廁',
      minutesRemaining: 0,
      recommendedAlternative: '展演空檔人流較少，推薦優先前往',
      safetyInspectionStatus: '感應燈具與安全鈴線路暢通'
    },
    reviews: [
      {
        id: 'r-ntua-3',
        author: '國樂系 洪同學',
        role: '研究生',
        rating: 4.8,
        date: '昨天',
        content: 'B1 空間隱蔽，排隊動線有牆體遮掩，不會跟走廊經過的師生對到眼。',
        tags: ['#隱密排隊', '#安靜無味'],
        avatarInitial: '洪',
        avatarBg: 'bg-blue-100 text-blue-800'
      }
    ],
    stalls: Array.from({ length: 14 }, (_, i) => ({
      id: i + 1,
      type: i < 4 ? 'all-gender' : i < 10 ? 'female' : 'male',
      isOccupied: [3, 5, 9, 12].includes(i + 1),
      hasFullPartition: true,
      hasAntiPeepLock: true
    })),
    mapCoords: { x: 120, y: 150 }
  },
  {
    id: 'ntua-av-center',
    name: '台藝大 影音大樓 2F 親子與無障礙公廁',
    subLocation: '台藝大 電影與傳播學院 2 樓',
    category: '學院專用友善點',
    regionId: 'ntua',
    distanceMeters: 220,
    walkMinutes: 4,
    rating: 4.6,
    comfortBadge: '良好',
    crowdStatus: '普通',
    totalStalls: 10,
    occupiedStalls: 4,
    maleStalls: 3,
    femaleStalls: 5,
    allGenderStalls: 2,
    babyCare: true,
    accessible: true,
    independentStall: true,
    floorToCeilingPartition: true,
    queueConcealment: false,
    antiPeepLock: true,
    spacious: true,
    cleaningStatus: {
      isCleaning: false,
      cleanerGender: '女性',
      targetGender: '女廁',
      minutesRemaining: 0,
      recommendedAlternative: '正常使用中',
      safetyInspectionStatus: '母嬰尿布台定期巡檢正常'
    },
    reviews: [
      {
        id: 'r-ntua-4',
        author: '電影系 林同學',
        role: '學生',
        rating: 4.5,
        date: '前天',
        content: '拍片器材放旁邊空間還是很寬敞，無障礙大門按鈕反應很快。',
        tags: ['#寬敞無障礙', '#設備新穎'],
        avatarInitial: '林',
        avatarBg: 'bg-purple-100 text-purple-800'
      }
    ],
    stalls: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      type: i < 2 ? 'all-gender' : i < 7 ? 'female' : 'male',
      isOccupied: [2, 4, 8].includes(i + 1),
      hasFullPartition: true,
      hasAntiPeepLock: true
    })),
    mapCoords: { x: 290, y: 340 }
  },

  // ==========================================
  // BANQIAO DISTRICT (新北板橋區) - 免費版預設解鎖
  // ==========================================
  {
    id: 'safepee-flagship',
    name: 'SafePee 旗艦點',
    subLocation: '板橋府中商圈 1F (性別友善示範區)',
    category: '旗艦示範廁所',
    regionId: 'banqiao',
    distanceMeters: 150,
    walkMinutes: 3,
    rating: 4.9,
    comfortBadge: '優',
    crowdStatus: '充足',
    totalStalls: 24,
    occupiedStalls: 6,
    maleStalls: 8,
    femaleStalls: 8,
    allGenderStalls: 8,
    babyCare: true,
    accessible: true,
    independentStall: true,
    floorToCeilingPartition: true,
    queueConcealment: true,
    antiPeepLock: true,
    spacious: true,
    cleaningStatus: {
      isCleaning: false,
      cleanerGender: '中性',
      targetGender: '全性別獨立間',
      minutesRemaining: 0,
      recommendedAlternative: '本站目前無清潔干擾，全區開放',
      safetyInspectionStatus: '已完成今日第三次深度消毒'
    },
    reviews: [
      {
        id: 'r-0',
        author: '林同學',
        role: '跨性別友善認證訪客',
        rating: 5,
        date: '10 分鐘前',
        content: '旗艦點完全沒有性別衝突的尷尬感，每一間都是全封閉獨立隔間，隔音也超好，救了我的害羞膀胱！',
        tags: ['#獨立隔間', '#無性別衝突', '#安全防窺'],
        avatarInitial: '林',
        avatarBg: 'bg-emerald-100 text-emerald-800'
      },
      {
        id: 'r-1',
        author: '張同學',
        role: '校園訪客',
        rating: 5,
        date: '25 分鐘前',
        content: '有隔板、不擁擠，下課時間來也不用尷尬對視，環境很乾淨！',
        tags: ['#獨立隔間', '#通風良好'],
        avatarInitial: '張',
        avatarBg: 'bg-slate-200 text-slate-700'
      }
    ],
    stalls: Array.from({ length: 24 }, (_, i) => ({
      id: i + 1,
      type: i < 8 ? 'all-gender' : i < 16 ? 'female' : 'male',
      isOccupied: [2, 5, 9, 14, 18, 22].includes(i + 1),
      hasFullPartition: true,
      hasAntiPeepLock: true
    })),
    mapCoords: { x: 225, y: 190 }
  },
  {
    id: 'civic-plaza-b1',
    name: '市民廣場 B1 公廁',
    subLocation: '板橋新北市政園區 核心連通道',
    category: '市政公用公廁',
    regionId: 'banqiao',
    distanceMeters: 200,
    walkMinutes: 4,
    rating: 4.8,
    comfortBadge: '優',
    crowdStatus: '充足',
    totalStalls: 35,
    occupiedStalls: 12,
    maleStalls: 12,
    femaleStalls: 15,
    allGenderStalls: 8,
    babyCare: true,
    accessible: true,
    independentStall: true,
    floorToCeilingPartition: true,
    queueConcealment: true,
    antiPeepLock: true,
    spacious: true,
    cleaningStatus: {
      isCleaning: true,
      cleanerGender: '女性',
      targetGender: '男廁',
      minutesRemaining: 10,
      recommendedAlternative: '步行 40m 前往 B2 友善獨立廁間',
      safetyInspectionStatus: '無隔板限制: 女性'
    },
    reviews: [
      {
        id: 'r-2',
        author: '張同學',
        role: '訪客',
        rating: 5,
        date: '1 小時前',
        content: '有隔板、不擁擠，下課時間來也不用尷尬對視，環境很乾淨！',
        tags: ['#獨立隔間', '#通風良好'],
        avatarInitial: 'L',
        avatarBg: 'bg-slate-300 text-slate-700'
      },
      {
        id: 'r-3',
        author: '陳媽媽',
        role: '推車家長',
        rating: 4.5,
        date: '3 小時前',
        content: '空間很大，適合親子推車直接進去，備品補得很及時。',
        tags: ['#尿布台', '#寬敞無障礙'],
        avatarInitial: '陳',
        avatarBg: 'bg-pink-200 text-pink-700'
      }
    ],
    stalls: Array.from({ length: 35 }, (_, i) => ({
      id: i + 1,
      type: i < 12 ? 'male' : i < 27 ? 'female' : 'all-gender',
      isOccupied: [1, 3, 4, 8, 12, 15, 17, 20, 24, 28, 31, 33].includes(i + 1),
      hasFullPartition: true,
      hasAntiPeepLock: true
    })),
    mapCoords: { x: 190, y: 320 }
  },
  {
    id: 'metro-exit-3',
    name: '捷運 3 號口公廁 (板橋站)',
    subLocation: '板橋捷運大廳層 B1 付費區外',
    category: '大眾運輸樞紐',
    regionId: 'banqiao',
    distanceMeters: 260,
    walkMinutes: 5,
    rating: 3.8,
    comfortBadge: '擁擠',
    crowdStatus: '擁擠',
    totalStalls: 30,
    occupiedStalls: 26,
    maleStalls: 10,
    femaleStalls: 16,
    allGenderStalls: 4,
    babyCare: true,
    accessible: true,
    independentStall: false,
    floorToCeilingPartition: false,
    queueConcealment: false,
    antiPeepLock: true,
    spacious: false,
    cleaningStatus: {
      isCleaning: false,
      cleanerGender: '男性',
      targetGender: '男廁',
      minutesRemaining: 0,
      recommendedAlternative: '建議前往 SafePee 旗艦點避免長時間排隊',
      safetyInspectionStatus: '人流高峰注意隨身物品'
    },
    reviews: [
      {
        id: 'r-5',
        author: '何小姐',
        role: '通勤族',
        rating: 3.5,
        date: '4 小時前',
        content: '人流很多，排隊排到外面走廊容易焦慮，建議急用改走 B1 市民廣場。',
        tags: ['#人流高峰', '#排隊明顯'],
        avatarInitial: '何',
        avatarBg: 'bg-amber-100 text-amber-800'
      }
    ],
    stalls: Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      type: i < 10 ? 'male' : i < 26 ? 'female' : 'accessible',
      isOccupied: i < 26,
      hasFullPartition: false,
      hasAntiPeepLock: true
    })),
    mapCoords: { x: 310, y: 155 }
  },
  {
    id: 'library-2f',
    name: '新北市圖總館 2F 閱覽區',
    subLocation: '板橋貴興路 新北市立圖書館總館 2 樓',
    category: '安靜文教場所',
    regionId: 'banqiao',
    distanceMeters: 380,
    walkMinutes: 7,
    rating: 4.2,
    comfortBadge: '普通',
    crowdStatus: '普通',
    totalStalls: 16,
    occupiedStalls: 7,
    maleStalls: 6,
    femaleStalls: 8,
    allGenderStalls: 2,
    babyCare: false,
    accessible: true,
    independentStall: true,
    floorToCeilingPartition: true,
    queueConcealment: true,
    antiPeepLock: true,
    spacious: true,
    cleaningStatus: {
      isCleaning: false,
      cleanerGender: '女性',
      targetGender: '女廁',
      minutesRemaining: 0,
      recommendedAlternative: '正常開放使用中',
      safetyInspectionStatus: '環境安靜，音量感應維持低分貝'
    },
    reviews: [
      {
        id: 'r-6',
        author: '黃同學',
        role: '考研生',
        rating: 4.5,
        date: '2 天前',
        content: '環境超安靜，洗手台有溫水，完全沒有壓迫感。',
        tags: ['#安靜舒適', '#獨立隔間'],
        avatarInitial: '黃',
        avatarBg: 'bg-indigo-100 text-indigo-800'
      }
    ],
    stalls: Array.from({ length: 16 }, (_, i) => ({
      id: i + 1,
      type: i < 6 ? 'male' : i < 14 ? 'female' : 'accessible',
      isOccupied: [1, 4, 7, 10, 11, 13, 15].includes(i + 1),
      hasFullPartition: true,
      hasAntiPeepLock: true
    })),
    mapCoords: { x: 75, y: 105 }
  },

  // ==========================================
  // TAIPEI CITY (台北市) - 付費解鎖區域 (LOCKED)
  // ==========================================
  {
    id: 'taipei-cityhall',
    name: '台北市政府 1F 性別友善旗艦廁',
    subLocation: '台北市信義區 市府路 1 號 (市府大樓中央大廳)',
    category: '首善之都政經示範點',
    regionId: 'taipei',
    distanceMeters: 450,
    walkMinutes: 6,
    rating: 4.9,
    comfortBadge: '優',
    crowdStatus: '充足',
    totalStalls: 28,
    occupiedStalls: 8,
    maleStalls: 8,
    femaleStalls: 10,
    allGenderStalls: 10,
    babyCare: true,
    accessible: true,
    independentStall: true,
    floorToCeilingPartition: true,
    queueConcealment: true,
    antiPeepLock: true,
    spacious: true,
    cleaningStatus: {
      isCleaning: false,
      cleanerGender: '中性',
      targetGender: '全性別獨立間',
      minutesRemaining: 0,
      recommendedAlternative: '旗艦規格，通風極佳',
      safetyInspectionStatus: 'VIP 全區防窺防偷拍最高規認證'
    },
    reviews: [
      {
        id: 'r-tpe-1',
        author: '王專員',
        role: '信義商務客',
        rating: 5,
        date: '1 小時前',
        content: '市府這間改裝後完全媲美日本機場，獨立隔間安全感滿分！',
        tags: ['#台北旗艦', '#全隔板', '#頂級衛生'],
        avatarInitial: '王',
        avatarBg: 'bg-amber-100 text-amber-800'
      }
    ],
    stalls: Array.from({ length: 28 }, (_, i) => ({
      id: i + 1,
      type: i < 10 ? 'all-gender' : i < 20 ? 'female' : 'male',
      isOccupied: [2, 5, 11, 16, 21, 24, 27].includes(i + 1),
      hasFullPartition: true,
      hasAntiPeepLock: true
    })),
    mapCoords: { x: 230, y: 180 }
  },
  {
    id: 'taipei-xinyi-vieshow',
    name: '信義威秀 2F 智慧友善公廁',
    subLocation: '台北市信義區 松壽路 20 號',
    category: '頂級娛樂商圈',
    regionId: 'taipei',
    distanceMeters: 550,
    walkMinutes: 8,
    rating: 4.6,
    comfortBadge: '良好',
    crowdStatus: '普通',
    totalStalls: 22,
    occupiedStalls: 11,
    maleStalls: 8,
    femaleStalls: 10,
    allGenderStalls: 4,
    babyCare: true,
    accessible: true,
    independentStall: true,
    floorToCeilingPartition: true,
    queueConcealment: true,
    antiPeepLock: true,
    spacious: true,
    cleaningStatus: {
      isCleaning: false,
      cleanerGender: '女性',
      targetGender: '女廁',
      minutesRemaining: 0,
      recommendedAlternative: '正常開放使用中',
      safetyInspectionStatus: '商場定期巡檢合格'
    },
    reviews: [
      {
        id: 'r-tpe-2',
        author: '柯小姐',
        role: '觀影訪客',
        rating: 4.5,
        date: '昨天',
        content: '電影散場時雖然人多，但排隊動線設計很好，不會尷尬對視。',
        tags: ['#信義商圈', '#隱私排隊'],
        avatarInitial: '柯',
        avatarBg: 'bg-rose-100 text-rose-800'
      }
    ],
    stalls: Array.from({ length: 22 }, (_, i) => ({
      id: i + 1,
      type: i < 4 ? 'all-gender' : i < 14 ? 'female' : 'male',
      isOccupied: i % 2 === 0,
      hasFullPartition: true,
      hasAntiPeepLock: true
    })),
    mapCoords: { x: 310, y: 260 }
  },
  {
    id: 'taipei-main-station',
    name: '台北車站 B1 智慧多功能無障礙廁所',
    subLocation: '台北市中正區 忠孝西路一段 台北車站地下一樓 西區',
    category: '全台最大交通總樞紐',
    regionId: 'taipei',
    distanceMeters: 620,
    walkMinutes: 9,
    rating: 4.4,
    comfortBadge: '普通',
    crowdStatus: '普通',
    totalStalls: 32,
    occupiedStalls: 18,
    maleStalls: 12,
    femaleStalls: 16,
    allGenderStalls: 4,
    babyCare: true,
    accessible: true,
    independentStall: true,
    floorToCeilingPartition: true,
    queueConcealment: false,
    antiPeepLock: true,
    spacious: true,
    cleaningStatus: {
      isCleaning: true,
      cleanerGender: '男性',
      targetGender: '男廁',
      minutesRemaining: 8,
      recommendedAlternative: '北門連通道另有備用無障礙獨立間',
      safetyInspectionStatus: '防爆與防偷拍針孔日常清查完畢'
    },
    reviews: [
      {
        id: 'r-tpe-3',
        author: '高先生',
        role: '高鐵通勤族',
        rating: 4.3,
        date: '前天',
        content: '北車這座重新翻修後乾淨很多，指標很清晰，還有大件行李放置格。',
        tags: ['#北車地下街', '#多功能空間'],
        avatarInitial: '高',
        avatarBg: 'bg-sky-100 text-sky-800'
      }
    ],
    stalls: Array.from({ length: 32 }, (_, i) => ({
      id: i + 1,
      type: i < 4 ? 'all-gender' : i < 18 ? 'female' : 'male',
      isOccupied: i < 18,
      hasFullPartition: true,
      hasAntiPeepLock: true
    })),
    mapCoords: { x: 140, y: 120 }
  },

  // ==========================================
  // TAOYUAN METROPOLITAN (桃園都會區) - 付費解鎖區域 (LOCKED)
  // ==========================================
  {
    id: 'taoyuan-main-library',
    name: '桃園市立圖書館總館 1F 友善公廁',
    subLocation: '桃園市桃園區 南平路 303 號 藝文特區核心',
    category: '全台最美綠建築圖書館',
    regionId: 'taoyuan',
    distanceMeters: 350,
    walkMinutes: 5,
    rating: 4.9,
    comfortBadge: '優',
    crowdStatus: '充足',
    totalStalls: 26,
    occupiedStalls: 5,
    maleStalls: 8,
    femaleStalls: 12,
    allGenderStalls: 6,
    babyCare: true,
    accessible: true,
    independentStall: true,
    floorToCeilingPartition: true,
    queueConcealment: true,
    antiPeepLock: true,
    spacious: true,
    cleaningStatus: {
      isCleaning: false,
      cleanerGender: '中性',
      targetGender: '全性別獨立間',
      minutesRemaining: 0,
      recommendedAlternative: '自然採光良好，備品充足',
      safetyInspectionStatus: '綠建築自然通風與空氣感測良級'
    },
    reviews: [
      {
        id: 'r-ty-1',
        author: '曾同學',
        role: '藝文愛好者',
        rating: 5,
        date: '3 小時前',
        content: '生命之樹建築的廁所太漂亮了，全隔板完全沒有縫隙，完全是五星級體驗。',
        tags: ['#桃園總圖', '#綠建築五星', '#極致安心'],
        avatarInitial: '曾',
        avatarBg: 'bg-teal-100 text-teal-800'
      }
    ],
    stalls: Array.from({ length: 26 }, (_, i) => ({
      id: i + 1,
      type: i < 6 ? 'all-gender' : i < 18 ? 'female' : 'male',
      isOccupied: [2, 8, 14, 20, 25].includes(i + 1),
      hasFullPartition: true,
      hasAntiPeepLock: true
    })),
    mapCoords: { x: 215, y: 195 }
  },
  {
    id: 'taoyuan-hsr-station',
    name: '高鐵桃園站 B1 智慧多元友善廁間',
    subLocation: '桃園市中壢區 高鐵北路一段 6 號 (華泰名品城連通道)',
    category: '高鐵航廈連通樞紐',
    regionId: 'taoyuan',
    distanceMeters: 480,
    walkMinutes: 7,
    rating: 4.5,
    comfortBadge: '良好',
    crowdStatus: '普通',
    totalStalls: 20,
    occupiedStalls: 9,
    maleStalls: 8,
    femaleStalls: 8,
    allGenderStalls: 4,
    babyCare: true,
    accessible: true,
    independentStall: true,
    floorToCeilingPartition: true,
    queueConcealment: true,
    antiPeepLock: true,
    spacious: true,
    cleaningStatus: {
      isCleaning: false,
      cleanerGender: '男性',
      targetGender: '男廁',
      minutesRemaining: 0,
      recommendedAlternative: '高鐵乘車旅客可優先走 5 號門',
      safetyInspectionStatus: '行李防窺與無障礙安全門檢查完畢'
    },
    reviews: [
      {
        id: 'r-ty-2',
        author: '趙先生',
        role: '出差商務客',
        rating: 4.5,
        date: '昨天',
        content: '出差趕飛機前必來，乾淨迅速，而且隔板高度做得很足，很讓人放心。',
        tags: ['#高鐵站點', '#獨立隔間'],
        avatarInitial: '趙',
        avatarBg: 'bg-emerald-100 text-emerald-800'
      }
    ],
    stalls: Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      type: i < 4 ? 'all-gender' : i < 12 ? 'female' : 'male',
      isOccupied: i % 2 === 1,
      hasFullPartition: true,
      hasAntiPeepLock: true
    })),
    mapCoords: { x: 130, y: 280 }
  }
];
