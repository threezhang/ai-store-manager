// 步骤1: 推荐类目
export interface CategoryData {
  id: string;
  name: string;
  isRecommended: boolean;  // 系统强推标记
  isSelected: boolean;     // 用户选择状态
  metrics: {
    salesGrowth: number;   // 销量环比
    industryGrowth: number; // 行业增速
    profitMargin: number;  // 平均利润率
  };
  priority?: number;       // 用户调整的优先级
}

// 步骤2: 推荐策略
export interface StrategyConfig {
  id: 'trend' | 'blueOcean' | 'highProfit';
  name: string;
  description: string;
  isSelected: boolean;
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