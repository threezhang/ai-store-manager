import type { CategoryData, StrategyConfig, KeywordData, ProductData } from './types'
import { generateId } from './utils'

// Mock类目数据
export const mockCategories: CategoryData[] = [
  {
    id: 'cat-1',
    name: '日用餐厨',
    isRecommended: true,
    isSelected: true, // 系统强推默认选中
    metrics: {
      salesGrowth: 68.5,
      industryGrowth: 42.3,
      profitMargin: 35.8
    }
  },
  {
    id: 'cat-2',
    name: '居家收纳',
    isRecommended: true,
    isSelected: false,
    metrics: {
      salesGrowth: 55.2,
      industryGrowth: 38.7,
      profitMargin: 42.1
    }
  },
  {
    id: 'cat-3',
    name: '个护清洁',
    isRecommended: true,
    isSelected: false,
    metrics: {
      salesGrowth: 48.9,
      industryGrowth: 35.4,
      profitMargin: 38.5
    }
  },
  {
    id: 'cat-4',
    name: '运动户外',
    isRecommended: false,
    isSelected: false,
    metrics: {
      salesGrowth: 72.3,
      industryGrowth: 56.8,
      profitMargin: 28.9
    }
  },
  {
    id: 'cat-5',
    name: '母婴用品',
    isRecommended: false,
    isSelected: false,
    metrics: {
      salesGrowth: 45.6,
      industryGrowth: 41.2,
      profitMargin: 48.5
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