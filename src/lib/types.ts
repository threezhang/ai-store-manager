// 步骤1: 推荐类目
export interface CategoryData {
  id: string;
  name: string;
  description: string;       // 类目描述
  isRecommended: boolean;    // 系统强推标记
  isSelected: boolean;       // 用户选择状态
  category: 'hot' | 'potential' | 'other'; // 类目分类
  metrics: {
    salesGrowth: number;     // 销量环比
    industryGrowth: number;  // 行业增速
    profitMargin: number;    // 平均利润率
    recommendScore: number;  // AI推荐指数 0-100
    competitionLevel: number; // 竞争激烈度 1-5 (1最低,5最高)
    difficultyLevel: number; // 入门难度 1-5 (1最容易,5最难)
    marketSize: number;      // 市场规模(万)
    avgProfit: number;       // 平均利润率
  };
  priority?: number;         // 用户调整的优先级
}

// 步骤2: 推荐策略 - 精致化重设计
export interface StrategyConfig {
  id: 'trend' | 'blueOcean' | 'premium';
  name: string;
  tagline: string;           // 策略标语
  description: string;
  isSelected: boolean;
  coreAdvantages: string[];  // 核心优势（3个）
  targetUsers: string[];     // 适用人群
  characteristics: {         // 策略特征
    difficulty: string;      // 上手难度
    timeframe: string;       // 见效周期
    riskLevel: string;       // 风险等级
    profitLevel: string;     // 利润水平
  };
  recommendedKeywords: {     // 推荐关键词（策略关联）
    keyword: string;
    heat: number;
    competition: number;
    type: string;            // 关键词类型
    reason: string;          // 推荐理由
  }[];
  params: {
    growthThreshold: number;
    competitionThreshold: number;
    profitThreshold: number;
  };
}

// 步骤3: 关键词配置
export interface KeywordData {
  keyword: string;
  heat: number;          // 热度指数
  competition: number;   // 竞争度
  isSelected: boolean;
  priority: number;      // 用户调整的优先级
  type?: string;         // 关键词类型（可选）
  attributes?: {         // 产品属性（可选）
    audience: string[];  // 目标人群
    season: string[];    // 适用季节
    size: string[];      // 尺寸规格
    material: string[];  // 材质
    style: string[];     // 风格
  };
  tags?: string[];       // 描述标签
  strategy?: string;     // 所属策略
  reason?: string;       // 推荐理由
}

export interface SelectionParams {
  growthRate: number;    // 最低增长率
  competition: number;   // 最高竞争度
  profitMargin: number;  // 最低利润率
}

// 步骤4: AI推荐商品
export interface ProductData {
  id: string;
  title: string;
  image: string;
  price: number;
  cost: number;
  profit: number;        // 利润率
  competition: number;   // 竞争度
  predictedSales: number; // 预测销量
  matchedKeyword: string;
  score: number;         // AI评分
  isAccepted?: boolean;  // 用户采纳状态
  isIgnored?: boolean;   // 用户忽略状态
}

// 步骤5: 铺货队列
export interface ListingLog {
  id: string;
  productId: string;
  product?: ProductData;
  platform: 'taobao' | 'douyin' | 'wechat';
  status: 'pending' | 'processing' | 'success' | 'failed';
  createdAt: string;
  completedAt?: string;
  errorMsg?: string;
}

// 应用状态
export interface AppState {
  // 流程控制
  currentStep: number;
  isLoading: boolean;
  
  // 业务数据
  selectedCategories: CategoryData[];
  selectedStrategies: StrategyConfig[];
  keywords: KeywordData[];
  params: SelectionParams;
  recommendedProducts: ProductData[];
  acceptedProducts: ProductData[];
  listingLogs: ListingLog[];
  
  // 操作方法
  setCurrentStep: (step: number) => void;
  updateCategories: (categories: CategoryData[]) => void;
  updateStrategies: (strategies: StrategyConfig[]) => void;
  updateKeywords: (keywords: KeywordData[]) => void;
  updateParams: (params: SelectionParams) => void;
  setRecommendedProducts: (products: ProductData[]) => void;
  acceptProduct: (productId: string) => void;
  ignoreProduct: (productId: string) => void;
  updateListingLogs: (logs: ListingLog[]) => void;
  resetFlow: () => void;
  
  // 计算属性
  canProceedToNextStep: () => boolean;
}

// 历史记录
export interface HistoryRecord {
  time: string;
  categories: string[];
  strategy: {
    trend: boolean;
    blueOcean: boolean;
    highProfit: boolean;
  };
  acceptRate: number;
  avgProfit: number;
} 