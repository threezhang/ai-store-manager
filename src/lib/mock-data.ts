import type { CategoryData, StrategyConfig, KeywordData, ProductData } from './types'
import { generateId } from './utils'

// Mock类目数据
export const mockCategories: CategoryData[] = [
  // 热门推荐类目
  {
    id: 'cat-1',
    name: '日用餐厨',
    description: '厨房用品、餐具、收纳等日常必需品',
    isRecommended: true,
    isSelected: true,
    category: 'hot',
    metrics: {
      salesGrowth: 68.5,
      industryGrowth: 42.3,
      profitMargin: 35.8,
      recommendScore: 95, // 推荐指数
      competitionLevel: 3, // 竞争激烈度 1-5
      difficultyLevel: 2, // 入门难度 1-5
      marketSize: 8.5, // 市场规模(万)
      avgProfit: 28.5 // 平均利润率
    }
  },
  {
    id: 'cat-2',
    name: '居家收纳',
    description: '收纳盒、整理架、储物用品',
    isRecommended: true,
    isSelected: false,
    category: 'hot',
    metrics: {
      salesGrowth: 55.2,
      industryGrowth: 38.7,
      profitMargin: 42.1,
      recommendScore: 92,
      competitionLevel: 2,
      difficultyLevel: 1,
      marketSize: 6.8,
      avgProfit: 32.1
    }
  },
  {
    id: 'cat-3',
    name: '个护清洁',
    description: '洗漱用品、清洁工具、个人护理',
    isRecommended: true,
    isSelected: false,
    category: 'hot',
    metrics: {
      salesGrowth: 48.9,
      industryGrowth: 35.4,
      profitMargin: 38.5,
      recommendScore: 88,
      competitionLevel: 3,
      difficultyLevel: 2,
      marketSize: 5.2,
      avgProfit: 26.8
    }
  },
  
  // 高潜力类目
  {
    id: 'cat-4',
    name: '运动户外',
    description: '健身器材、户外用品、运动配件',
    isRecommended: false,
    isSelected: false,
    category: 'potential',
    metrics: {
      salesGrowth: 72.3,
      industryGrowth: 56.8,
      profitMargin: 28.9,
      recommendScore: 78,
      competitionLevel: 4,
      difficultyLevel: 3,
      marketSize: 12.3,
      avgProfit: 22.5
    }
  },
  {
    id: 'cat-5',
    name: '母婴用品',
    description: '婴儿用品、儿童玩具、母婴护理',
    isRecommended: false,
    isSelected: false,
    category: 'potential',
    metrics: {
      salesGrowth: 45.6,
      industryGrowth: 41.2,
      profitMargin: 48.5,
      recommendScore: 85,
      competitionLevel: 4,
      difficultyLevel: 4,
      marketSize: 15.6,
      avgProfit: 35.2
    }
  },
  {
    id: 'cat-6',
    name: '宠物用品',
    description: '宠物食品、玩具、护理用品',
    isRecommended: false,
    isSelected: false,
    category: 'potential',
    metrics: {
      salesGrowth: 82.1,
      industryGrowth: 67.3,
      profitMargin: 52.8,
      recommendScore: 89,
      competitionLevel: 3,
      difficultyLevel: 2,
      marketSize: 9.8,
      avgProfit: 41.2
    }
  },
  
  // 其他类目
  {
    id: 'cat-7',
    name: '汽车用品',
    description: '汽车配件、装饰、清洁保养',
    isRecommended: false,
    isSelected: false,
    category: 'other',
    metrics: {
      salesGrowth: 35.8,
      industryGrowth: 28.4,
      profitMargin: 45.2,
      recommendScore: 65,
      competitionLevel: 4,
      difficultyLevel: 4,
      marketSize: 18.9,
      avgProfit: 38.6
    }
  },
  {
    id: 'cat-8',
    name: '数码配件',
    description: '手机配件、电脑周边、智能设备',
    isRecommended: false,
    isSelected: false,
    category: 'other',
    metrics: {
      salesGrowth: 28.6,
      industryGrowth: 22.1,
      profitMargin: 32.4,
      recommendScore: 58,
      competitionLevel: 5,
      difficultyLevel: 5,
      marketSize: 25.6,
      avgProfit: 25.8
    }
  },
  {
    id: 'cat-9',
    name: '服装配饰',
    description: '服装、鞋帽、包包、饰品',
    isRecommended: false,
    isSelected: false,
    category: 'other',
    metrics: {
      salesGrowth: 42.3,
      industryGrowth: 31.5,
      profitMargin: 55.8,
      recommendScore: 72,
      competitionLevel: 5,
      difficultyLevel: 4,
      marketSize: 32.4,
      avgProfit: 42.8
    }
  },
  {
    id: 'cat-10',
    name: '美妆护肤',
    description: '化妆品、护肤品、美容工具',
    isRecommended: false,
    isSelected: false,
    category: 'other',
    metrics: {
      salesGrowth: 38.9,
      industryGrowth: 29.7,
      profitMargin: 62.1,
      recommendScore: 68,
      competitionLevel: 5,
      difficultyLevel: 5,
      marketSize: 28.7,
      avgProfit: 48.5
    }
  },
  {
    id: 'cat-11',
    name: '办公文具',
    description: '办公用品、文具、学习用品',
    isRecommended: false,
    isSelected: false,
    category: 'other',
    metrics: {
      salesGrowth: 25.4,
      industryGrowth: 18.9,
      profitMargin: 38.6,
      recommendScore: 52,
      competitionLevel: 3,
      difficultyLevel: 2,
      marketSize: 8.9,
      avgProfit: 28.4
    }
  },
  {
    id: 'cat-12',
    name: '园艺花卉',
    description: '植物、花盆、园艺工具',
    isRecommended: false,
    isSelected: false,
    category: 'other',
    metrics: {
      salesGrowth: 52.8,
      industryGrowth: 45.6,
      profitMargin: 48.9,
      recommendScore: 76,
      competitionLevel: 2,
      difficultyLevel: 3,
      marketSize: 4.5,
      avgProfit: 35.8
    }
  }
]

// Mock策略数据
export const mockStrategies: StrategyConfig[] = [
  {
    id: 'trend',
    name: '趋势爆款',
    description: '抓住市场热点，快速跟进爆款商品',
    isSelected: false,
    params: {
      growthThreshold: 60,
      competitionThreshold: 70,
      profitThreshold: 25
    }
  },
  {
    id: 'blueOcean',
    name: '蓝海细分',
    description: '寻找低竞争、高潜力的细分市场',
    isSelected: false,
    params: {
      growthThreshold: 30,
      competitionThreshold: 40,
      profitThreshold: 35
    }
  },
  {
    id: 'highProfit',
    name: '高利润',
    description: '优先选择高利润率的优质商品',
    isSelected: false,
    params: {
      growthThreshold: 20,
      competitionThreshold: 60,
      profitThreshold: 50
    }
  }
]

// 根据类目生成关键词
export function generateKeywords(categoryIds: string[]): KeywordData[] {
  const keywordsByCategory: Record<string, KeywordData[]> = {
    'cat-1': [
      { keyword: '厨房收纳盒', heat: 85, competition: 42, isSelected: true, priority: 1 },
      { keyword: '刀具架', heat: 72, competition: 38, isSelected: true, priority: 2 },
      { keyword: '调料瓶', heat: 68, competition: 45, isSelected: false, priority: 3 },
      { keyword: '餐具收纳', heat: 75, competition: 40, isSelected: false, priority: 4 },
      { keyword: '保鲜盒', heat: 88, competition: 55, isSelected: true, priority: 5 }
    ],
    'cat-2': [
      { keyword: '收纳挂钩', heat: 92, competition: 35, isSelected: true, priority: 1 },
      { keyword: '真空压缩袋', heat: 78, competition: 48, isSelected: true, priority: 2 },
      { keyword: '衣柜收纳', heat: 83, competition: 52, isSelected: false, priority: 3 },
      { keyword: '桌面收纳盒', heat: 71, competition: 40, isSelected: false, priority: 4 },
      { keyword: '墙面置物架', heat: 65, competition: 38, isSelected: true, priority: 5 }
    ],
    'cat-3': [
      { keyword: '牙刷架', heat: 76, competition: 42, isSelected: true, priority: 1 },
      { keyword: '肥皂盒', heat: 65, competition: 35, isSelected: false, priority: 2 },
      { keyword: '浴室置物架', heat: 82, competition: 48, isSelected: true, priority: 3 },
      { keyword: '洗漱包', heat: 70, competition: 40, isSelected: false, priority: 4 },
      { keyword: '毛巾架', heat: 78, competition: 45, isSelected: true, priority: 5 }
    ],
    'cat-4': [
      { keyword: '瑜伽垫', heat: 88, competition: 65, isSelected: true, priority: 1 },
      { keyword: '运动水壶', heat: 75, competition: 55, isSelected: false, priority: 2 },
      { keyword: '健身器材', heat: 92, competition: 72, isSelected: true, priority: 3 },
      { keyword: '户外背包', heat: 68, competition: 48, isSelected: false, priority: 4 },
      { keyword: '跑步装备', heat: 85, competition: 60, isSelected: true, priority: 5 }
    ],
    'cat-5': [
      { keyword: '婴儿餐具', heat: 80, competition: 45, isSelected: true, priority: 1 },
      { keyword: '尿不湿收纳', heat: 72, competition: 38, isSelected: false, priority: 2 },
      { keyword: '奶瓶架', heat: 78, competition: 42, isSelected: true, priority: 3 },
      { keyword: '婴儿围兜', heat: 65, competition: 35, isSelected: false, priority: 4 },
      { keyword: '儿童玩具收纳', heat: 85, competition: 52, isSelected: true, priority: 5 }
    ]
  }

  const keywords: KeywordData[] = []
  categoryIds.forEach(catId => {
    if (keywordsByCategory[catId]) {
      keywords.push(...keywordsByCategory[catId])
    }
  })

  // 添加更多随机关键词
  const additionalKeywords = [
    '创意家居', '北欧风格', '简约设计', '多功能', '便携式',
    '折叠收纳', '壁挂式', '透明设计', '密封防潮', '大容量'
  ]

  additionalKeywords.forEach((keyword, index) => {
    if (keywords.length < 20) {
      keywords.push({
        keyword,
        heat: Math.floor(Math.random() * 30) + 60,
        competition: Math.floor(Math.random() * 30) + 30,
        isSelected: false,
        priority: keywords.length + 1
      })
    }
  })

  return keywords.slice(0, 20)
}

// 生成商品数据
export function generateProducts(keywordData: KeywordData[], count: number = 50): ProductData[] {
  const products: ProductData[] = []
  const productTemplates = [
    { prefix: '多功能', suffix: '套装' },
    { prefix: '创意', suffix: '新款' },
    { prefix: '日式', suffix: '精选' },
    { prefix: '简约', suffix: '热卖' },
    { prefix: '加厚', suffix: '升级版' },
    { prefix: '便携式', suffix: '家用' },
    { prefix: '大容量', suffix: '实用款' },
    { prefix: '高品质', suffix: '爆款' }
  ]

  keywordData.forEach(keyword => {
    if (!keyword.isSelected) return
    
    productTemplates.forEach((template, index) => {
      if (products.length >= count) return
      
      const price = Math.floor(Math.random() * 150) + 20
      const cost = price * (0.3 + Math.random() * 0.3)
      const profit = ((price - cost) / price) * 100

      products.push({
        id: generateId(),
        title: `${template.prefix}${keyword.keyword}${template.suffix}`,
        image: `/api/placeholder/200/200`,
        price,
        cost,
        profit,
        competition: Math.floor(Math.random() * 50) + 20,
        predictedSales: Math.floor(Math.random() * 400) + 100,
        matchedKeyword: keyword.keyword,
        score: 0, // 将在后续计算
        isAccepted: false,
        isIgnored: false
      })
    })
  })

  // 如果商品不够，生成一些随机商品
  while (products.length < count) {
    const randomKeyword = keywordData[Math.floor(Math.random() * keywordData.length)]
    const template = productTemplates[Math.floor(Math.random() * productTemplates.length)]
    const price = Math.floor(Math.random() * 150) + 20
    const cost = price * (0.3 + Math.random() * 0.3)
    const profit = ((price - cost) / price) * 100

    products.push({
      id: generateId(),
      title: `${template.prefix}${randomKeyword.keyword}${template.suffix}`,
      image: `/api/placeholder/200/200`,
      price,
      cost,
      profit,
      competition: Math.floor(Math.random() * 50) + 20,
      predictedSales: Math.floor(Math.random() * 400) + 100,
      matchedKeyword: randomKeyword.keyword,
      score: 0,
      isAccepted: false,
      isIgnored: false
    })
  }

  return products
}

// 模拟铺货状态更新
export function simulateListingStatus(logs: any[]): any[] {
  return logs.map(log => {
    if (log.status === 'pending' && Math.random() > 0.7) {
      return { ...log, status: 'processing' }
    }
    if (log.status === 'processing' && Math.random() > 0.5) {
      const isSuccess = Math.random() > 0.1
      return {
        ...log,
        status: isSuccess ? 'success' : 'failed',
        completedAt: new Date().toISOString(),
        errorMsg: isSuccess ? null : '商品标题包含违禁词'
      }
    }
    return log
  })
} 