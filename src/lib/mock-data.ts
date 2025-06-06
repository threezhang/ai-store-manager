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

// Mock策略数据 - 重新设计版本
export const mockStrategies: StrategyConfig[] = [
  {
    id: 'trend',
    name: '热点爆款',
    tagline: '追热点，快爆发',
    description: '基于AI实时监测社媒热点和搜索趋势，快速捕捉爆款商机',
    isSelected: false,
    // 核心优势（3个关键词）
    coreAdvantages: ['起量极快', '流量成本低', '爆发力强'],
    // 适用人群
    targetUsers: ['新手卖家', '追求快速起量', '灵活供应链'],
    // 策略特点
    characteristics: {
      difficulty: '容易上手',
      timeframe: '3-7天见效', 
      riskLevel: '高风险',
      profitLevel: '中等利润'
    },
    // 示例关键词（用于展示，实际会根据类目动态生成）
    recommendedKeywords: [
      { keyword: '网红爆款神器', heat: 95, competition: 68, type: '热搜词', reason: '社媒热度爆发' },
      { keyword: '抖音同款好物', heat: 92, competition: 75, type: '飙升词', reason: '短视频种草效应' },
      { keyword: '小红书推荐', heat: 89, competition: 65, type: '热搜词', reason: '种草平台热门' },
      { keyword: '居家生活必备', heat: 91, competition: 72, type: '季节词', reason: '居家生活热潮' },
      { keyword: '懒人必备神器', heat: 87, competition: 52, type: '话题词', reason: '懒人经济兴起' },
      { keyword: '智能生活好物', heat: 89, competition: 65, type: '科技词', reason: '智能产品热潮' }
    ],
    params: {
      growthThreshold: 80,
      competitionThreshold: 80,
      profitThreshold: 20
    }
  },
  {
    id: 'blueOcean',
    name: '蓝海挖掘',
    tagline: '找空白，稳增长',
    description: 'AI算法深度挖掘低竞争细分市场，建立差异化竞争优势',
    isSelected: true,
    coreAdvantages: ['竞争小', '利润稳定', '可持续'],
    targetUsers: ['有耐心卖家', '品牌化发展', '长期规划'],
    characteristics: {
      difficulty: '需要技巧',
      timeframe: '2-4周见效',
      riskLevel: '低风险',
      profitLevel: '高利润'
    },
    // 示例关键词（用于展示，实际会根据类目动态生成）
    recommendedKeywords: [
      { keyword: '垂直细分专用', heat: 85, competition: 45, type: '长尾词', reason: '细分需求未满足' },
      { keyword: '小众市场专用', heat: 76, competition: 45, type: '功能词', reason: '专业化需求' },
      { keyword: '特殊场景应用', heat: 75, competition: 42, type: '场景词', reason: '场景化细分' },
      { keyword: '专业工具配件', heat: 78, competition: 55, type: '精准词', reason: '垂直市场机会' },
      { keyword: '周边辅助产品', heat: 82, competition: 48, type: '长尾词', reason: '配件市场空白' },
      { keyword: '专业级工具', heat: 76, competition: 42, type: '专业词', reason: '专业用户需求' }
    ],
    params: {
      growthThreshold: 30,
      competitionThreshold: 50,
      profitThreshold: 35
    }
  },
  {
    id: 'premium',
    name: '高利润策略', 
    tagline: '做精品，赚差价',
    description: '聚焦高价值商品和精准人群，通过品质差异化实现高利润',
    isSelected: false,
    coreAdvantages: ['单品利润高', '复购率高', '抗价格战'],
    targetUsers: ['成熟卖家', '品质导向', '利润优先'],
    characteristics: {
      difficulty: '专业要求',
      timeframe: '1-3周见效',
      riskLevel: '中等风险', 
      profitLevel: '超高利润'
    },
    recommendedKeywords: [
      { keyword: '高端品质产品', heat: 72, competition: 38, type: '品牌词', reason: '高端市场定位' },
      { keyword: '奢华设计款', heat: 85, competition: 58, type: '价值词', reason: '奢华消费升级' },
      { keyword: '专业级产品', heat: 82, competition: 58, type: '专业词', reason: '专业用户付费意愿高' },
      { keyword: '定制化服务', heat: 72, competition: 45, type: '高端词', reason: '个性化定制需求' },
      { keyword: '进口优质材质', heat: 85, competition: 75, type: '品牌词', reason: '进口产品溢价' },
      { keyword: '限量精品', heat: 82, competition: 68, type: '奢华词', reason: '收藏价值溢价' }
    ],
    params: {
      growthThreshold: 25,
      competitionThreshold: 70,
      profitThreshold: 45
    }
  }
]

// 完整的类目关键词数据库 - 包含完整属性
const CATEGORY_KEYWORDS_DATABASE = {
  'cat-1': { // 日用餐厨
    trend: [
      { 
        keyword: '厨房收纳神器', 
        heat: 95, 
        competition: 68, 
        isSelected: false, 
        priority: 1,
        attributes: {
          audience: ['家庭用户', '新手妈妈', '职场女性'],
          season: ['四季通用'],
          size: ['中等尺寸', '大容量'],
          material: ['环保塑料', '不锈钢'],
          style: ['简约现代', '日式极简']
        },
        tags: ['收纳整理', '厨房必备', '空间优化', '易清洁'],
        strategy: 'trend',
        reason: '抖音热度飙升300%，厨房整理成热门话题'
      },
      { 
        keyword: '智能切菜器', 
        heat: 88, 
        competition: 72, 
        isSelected: false, 
        priority: 2,
        attributes: {
          audience: ['家庭用户', '上班族', '年轻女性'],
          season: ['四季通用'],
          size: ['便携式', '标准规格'],
          material: ['食品级塑料', '不锈钢'],
          style: ['简约现代', '工业风格']
        },
        tags: ['智能厨具', '省时省力', '安全防护', '多功能'],
        strategy: 'trend',
        reason: '小红书种草爆发，懒人厨房神器'
      },
      { 
        keyword: '多功能料理机', 
        heat: 84, 
        competition: 65, 
        isSelected: false, 
        priority: 3,
        attributes: {
          audience: ['家庭用户', '年轻女性'],
          season: ['四季通用'],
          size: ['标准规格', '大容量'],
          material: ['食品级塑料', '不锈钢'],
          style: ['简约现代', '科技风']
        },
        tags: ['多功能', '一机多用', '节省空间', '高效料理'],
        strategy: 'trend',
        reason: '多功能厨电成为热门趋势'
      },
      { 
        keyword: '网红厨房小物', 
        heat: 82, 
        competition: 70, 
        isSelected: false, 
        priority: 4,
        attributes: {
          audience: ['年轻女性', '学生群体'],
          season: ['四季通用'],
          size: ['迷你小巧', '便携式'],
          material: ['环保塑料', '硅胶'],
          style: ['时尚潮流', '可爱风']
        },
        tags: ['网红爆款', '拍照神器', '颜值担当', '实用美观'],
        strategy: 'trend',
        reason: '社交媒体厨房美学兴起'
      }
    ],
    blueOcean: [
      { 
        keyword: '密封保鲜盒套装', 
        heat: 85, 
        competition: 45, 
        isSelected: false, 
        priority: 1,
        attributes: {
          audience: ['家庭用户', '新手妈妈'],
          season: ['四季通用'],
          size: ['大容量', '可调节'],
          material: ['环保塑料', '钢化玻璃'],
          style: ['简约现代', '北欧风情']
        },
        tags: ['食品保鲜', '密封防漏', '微波炉适用', '叠放收纳'],
        strategy: 'blueOcean',
        reason: '细分需求，高品质保鲜市场'
      },
      { 
        keyword: '沥水碗架组合', 
        heat: 68, 
        competition: 42, 
        isSelected: false, 
        priority: 2,
        attributes: {
          audience: ['家庭用户', '单身人士'],
          season: ['四季通用'],
          size: ['中等尺寸', '可调节'],
          material: ['不锈钢', '环保塑料'],
          style: ['简约现代', '工业风格']
        },
        tags: ['快速沥水', '防锈材质', '可拆卸', '厨房清洁'],
        strategy: 'blueOcean',
        reason: '厨房清洁细分领域，需求稳定'
      },
      { 
        keyword: '厨房垃圾分类桶', 
        heat: 65, 
        competition: 38, 
        isSelected: false, 
        priority: 3,
        attributes: {
          audience: ['家庭用户', '环保人士'],
          season: ['四季通用'],
          size: ['标准规格', '大容量'],
          material: ['环保塑料', '不锈钢'],
          style: ['简约现代', '环保风']
        },
        tags: ['垃圾分类', '环保节能', '异味控制', '便捷倾倒'],
        strategy: 'blueOcean',
        reason: '垃圾分类政策推动，细分需求增长'
      },
      { 
        keyword: '调料计量勺套装', 
        heat: 62, 
        competition: 35, 
        isSelected: false, 
        priority: 4,
        attributes: {
          audience: ['烘焙爱好者', '家庭用户'],
          season: ['四季通用'],
          size: ['迷你小巧', '标准规格'],
          material: ['不锈钢', '食品级硅胶'],
          style: ['简约现代', '专业风']
        },
        tags: ['精准计量', '烘焙专用', '易清洗', '专业工具'],
        strategy: 'blueOcean',
        reason: '烘焙市场细分，专业工具需求'
      }
    ],
    premium: [
      { 
        keyword: '不锈钢调料架', 
        heat: 72, 
        competition: 38, 
        isSelected: false, 
        priority: 1,
        attributes: {
          audience: ['家庭用户', '职场女性'],
          season: ['四季通用'],
          size: ['标准规格', '大容量'],
          material: ['不锈钢', '竹纤维'],
          style: ['简约现代', '工业风格']
        },
        tags: ['防锈耐用', '分层收纳', '易拆洗', '厨房整理'],
        strategy: 'premium',
        reason: '高端厨房配件，注重品质生活'
      },
      { 
        keyword: '多功能刀具架', 
        heat: 78, 
        competition: 55, 
        isSelected: false, 
        priority: 2,
        attributes: {
          audience: ['家庭用户', '中老年人'],
          season: ['四季通用'],
          size: ['标准规格', '大容量'],
          material: ['实木', '竹纤维'],
          style: ['简约现代', '田园清新']
        },
        tags: ['安全存放', '通风干燥', '防菌设计', '节省空间'],
        strategy: 'premium',
        reason: '安全厨房理念，高品质木质产品'
      },
      { 
        keyword: '实木砧板套装', 
        heat: 70, 
        competition: 45, 
        isSelected: false, 
        priority: 3,
        attributes: {
          audience: ['家庭用户', '烹饪爱好者'],
          season: ['四季通用'],
          size: ['标准规格', '大容量'],
          material: ['实木', '竹纤维'],
          style: ['简约现代', '自然风']
        },
        tags: ['天然环保', '抗菌防霉', '不伤刀刃', '分类使用'],
        strategy: 'premium',
        reason: '天然材质回归，健康厨房理念'
      },
      { 
        keyword: '高端餐具收纳', 
        heat: 75, 
        competition: 50, 
        isSelected: false, 
        priority: 4,
        attributes: {
          audience: ['高端用户', '品质生活'],
          season: ['四季通用'],
          size: ['大容量', '可定制'],
          material: ['实木', '不锈钢', '皮革'],
          style: ['奢华风', '简约现代']
        },
        tags: ['高端定制', '品质工艺', '典雅设计', '收纳艺术'],
        strategy: 'premium',
        reason: '高端餐具收纳，彰显生活品味'
      }
    ]
  },
  'cat-2': { // 居家收纳
    trend: [
      { 
        keyword: 'ins风桌面收纳盒', 
        heat: 92, 
        competition: 75, 
        isSelected: false, 
        priority: 1,
        attributes: {
          audience: ['年轻女性', '学生群体', '职场女性'],
          season: ['四季通用'],
          size: ['迷你小巧', '标准规格'],
          material: ['高档陶瓷', '实木', '亚克力'],
          style: ['时尚潮流', '日式极简', '北欧风情']
        },
        tags: ['装饰美化', '拍照神器', '个性化', '网红爆款'],
        strategy: 'trend',
        reason: 'INS风装饰热潮，社媒传播力强'
      },
      { 
        keyword: '真空压缩收纳袋', 
        heat: 88, 
        competition: 62, 
        isSelected: false, 
        priority: 2,
        attributes: {
          audience: ['家庭用户', '学生群体', '单身人士'],
          season: ['秋季', '冬季', '四季通用'],
          size: ['大容量', '加大款'],
          material: ['高密度PE', '尼龙'],
          style: ['简约现代']
        },
        tags: ['节省空间', '防潮防霉', '季节换装', '搬家神器'],
        strategy: 'trend',
        reason: '换季收纳刚需，抖音话题热度高'
      },
      { 
        keyword: '网红收纳神器', 
        heat: 85, 
        competition: 68, 
        isSelected: false, 
        priority: 3,
        attributes: {
          audience: ['年轻女性', '学生群体'],
          season: ['四季通用'],
          size: ['标准规格', '便携式'],
          material: ['环保塑料', '亚克力'],
          style: ['时尚潮流', '可爱风']
        },
        tags: ['网红推荐', '创意设计', '多功能', '颜值收纳'],
        strategy: 'trend',
        reason: '网红效应带动，年轻群体追捧'
      },
      { 
        keyword: '韩式收纳盒', 
        heat: 80, 
        competition: 65, 
        isSelected: false, 
        priority: 4,
        attributes: {
          audience: ['年轻女性', '韩流粉丝'],
          season: ['四季通用'],
          size: ['标准规格', '迷你小巧'],
          material: ['环保塑料', '亚克力'],
          style: ['韩式风格', '简约现代']
        },
        tags: ['韩式美学', '精致收纳', '透明设计', '叠放整齐'],
        strategy: 'trend',
        reason: '韩流文化影响，韩式生活方式流行'
      }
    ],
    blueOcean: [
      { 
        keyword: '床底收纳整理箱', 
        heat: 76, 
        competition: 45, 
        isSelected: false, 
        priority: 1,
        attributes: {
          audience: ['家庭用户', '学生群体', '单身人士'],
          season: ['四季通用'],
          size: ['大容量', '超大容量'],
          material: ['环保塑料', '无纺布'],
          style: ['简约现代']
        },
        tags: ['床底专用', '滑轮设计', '防尘密封', '大容量'],
        strategy: 'blueOcean',
        reason: '床底空间利用细分需求'
      },
      { 
        keyword: '墙面多层置物架', 
        heat: 72, 
        competition: 38, 
        isSelected: false, 
        priority: 2,
        attributes: {
          audience: ['家庭用户', '学生群体'],
          season: ['四季通用'],
          size: ['中等尺寸', '可调节'],
          material: ['实木', '金属', '竹纤维'],
          style: ['简约现代', '工业风格', '北欧风情']
        },
        tags: ['墙面安装', '多层收纳', '节省地面', '承重强'],
        strategy: 'blueOcean',
        reason: '立体收纳解决方案，空间利用率高'
      },
      { 
        keyword: '车载收纳用品', 
        heat: 68, 
        competition: 42, 
        isSelected: false, 
        priority: 3,
        attributes: {
          audience: ['车主', '家庭用户'],
          season: ['四季通用'],
          size: ['便携式', '标准规格'],
          material: ['皮革', '牛津布', '环保塑料'],
          style: ['简约现代', '商务风']
        },
        tags: ['车载专用', '防滑设计', '多格分类', '易安装'],
        strategy: 'blueOcean',
        reason: '汽车收纳细分市场，需求稳定增长'
      },
      { 
        keyword: '办公桌收纳系统', 
        heat: 70, 
        competition: 40, 
        isSelected: false, 
        priority: 4,
        attributes: {
          audience: ['上班族', '学生群体'],
          season: ['四季通用'],
          size: ['标准规格', '模块化'],
          material: ['实木', '亚克力', '金属'],
          style: ['简约现代', '工业风格']
        },
        tags: ['办公专用', '模块组合', '文具分类', '效率提升'],
        strategy: 'blueOcean',
        reason: '居家办公兴起，桌面整理需求增长'
      }
    ],
    premium: [
      { 
        keyword: '旋转化妆品收纳架', 
        heat: 85, 
        competition: 58, 
        isSelected: false, 
        priority: 1,
        attributes: {
          audience: ['年轻女性', '职场女性'],
          season: ['四季通用'],
          size: ['标准规格', '大容量'],
          material: ['亚克力', '环保塑料'],
          style: ['时尚潮流', '简约现代']
        },
        tags: ['360度旋转', '透明可视', '分层收纳', '美妆专用'],
        strategy: 'premium',
        reason: '美妆收纳细分市场，客单价高'
      },
      { 
        keyword: '透明鞋盒收纳神器', 
        heat: 68, 
        competition: 52, 
        isSelected: false, 
        priority: 2,
        attributes: {
          audience: ['年轻女性', '职场女性', '家庭用户'],
          season: ['四季通用'],
          size: ['标准规格', '加大款'],
          material: ['透明塑料', '亚克力'],
          style: ['简约现代', '时尚潮流']
        },
        tags: ['透明可视', '防尘防潮', '叠放设计', '鞋靴专用'],
        strategy: 'premium',
        reason: '鞋靴收纳专业化，重视品质和美观'
      },
      { 
        keyword: '亚克力首饰收纳', 
        heat: 75, 
        competition: 55, 
        isSelected: false, 
        priority: 3,
        attributes: {
          audience: ['年轻女性', '时尚爱好者'],
          season: ['四季通用'],
          size: ['标准规格', '大容量'],
          material: ['亚克力', '绒布'],
          style: ['时尚潮流', '奢华风']
        },
        tags: ['首饰专用', '防氧化', '精致展示', '高端材质'],
        strategy: 'premium',
        reason: '首饰收纳高端化，展示与保护并重'
      },
      { 
        keyword: '高端衣柜收纳', 
        heat: 78, 
        competition: 48, 
        isSelected: false, 
        priority: 4,
        attributes: {
          audience: ['高端用户', '品质生活'],
          season: ['四季通用'],
          size: ['大容量', '可定制'],
          material: ['实木', '皮革', '高端布料'],
          style: ['奢华风', '简约现代']
        },
        tags: ['定制服务', '高端材质', '空间优化', '品质工艺'],
        strategy: 'premium',
        reason: '高端衣柜收纳，个性化定制需求'
      }
    ]
  },
  'cat-3': { // 个护清洁
    trend: [
      { 
        keyword: '免打孔浴室置物架', 
        heat: 89, 
        competition: 65, 
        isSelected: false, 
        priority: 1,
        attributes: {
          audience: ['家庭用户', '单身人士', '学生群体'],
          season: ['四季通用'],
          size: ['标准规格', '大容量'],
          material: ['不锈钢', '环保塑料'],
          style: ['简约现代', '工业风格']
        },
        tags: ['免打孔安装', '防水防锈', '强力承重', '浴室专用'],
        strategy: 'trend',
        reason: '租房族热门需求，免打孔概念火爆'
      },
      { 
        keyword: '懒人清洁神器', 
        heat: 85, 
        competition: 72, 
        isSelected: false, 
        priority: 2,
        attributes: {
          audience: ['懒人群体', '上班族', '学生群体'],
          season: ['四季通用'],
          size: ['便携式', '标准规格'],
          material: ['环保塑料', '微纤维'],
          style: ['简约现代', '科技风']
        },
        tags: ['省时省力', '一键清洁', '懒人必备', '高效去污'],
        strategy: 'trend',
        reason: '懒人经济兴起，清洁效率成关键'
      },
      { 
        keyword: '网红洗脸巾', 
        heat: 82, 
        competition: 68, 
        isSelected: false, 
        priority: 3,
        attributes: {
          audience: ['年轻女性', '护肤爱好者'],
          season: ['四季通用'],
          size: ['便携式', '标准规格'],
          material: ['纯棉', '竹纤维'],
          style: ['简约现代', '可爱风']
        },
        tags: ['一次性使用', '卫生便捷', '护肤专用', '网红推荐'],
        strategy: 'trend',
        reason: '护肤精致化，一次性洗脸巾成趋势'
      },
      { 
        keyword: '便携洗漱包', 
        heat: 78, 
        competition: 62, 
        isSelected: false, 
        priority: 4,
        attributes: {
          audience: ['出差人士', '旅行爱好者'],
          season: ['四季通用'],
          size: ['便携式', '大容量'],
          material: ['防水布料', '尼龙'],
          style: ['简约现代', '运动风']
        },
        tags: ['便携出行', '防水设计', '分格收纳', '旅行必备'],
        strategy: 'trend',
        reason: '出行频率增加，便携洗漱成刚需'
      }
    ],
    blueOcean: [
      { 
        keyword: '洗衣液收纳盒', 
        heat: 75, 
        competition: 42, 
        isSelected: false, 
        priority: 1,
        attributes: {
          audience: ['家庭用户', '新手妈妈'],
          season: ['四季通用'],
          size: ['大容量', '标准规格'],
          material: ['环保塑料', '透明材质'],
          style: ['简约现代', '田园清新']
        },
        tags: ['洗衣用品', '密封防潮', '计量倒取', '整理收纳'],
        strategy: 'blueOcean',
        reason: '洗衣用品收纳细分市场'
      },
      { 
        keyword: '浴室防滑垫组合', 
        heat: 70, 
        competition: 38, 
        isSelected: false, 
        priority: 2,
        attributes: {
          audience: ['家庭用户', '老年人', '儿童家庭'],
          season: ['四季通用'],
          size: ['标准规格', '大尺寸'],
          material: ['硅胶', '橡胶'],
          style: ['简约现代', '卡通可爱']
        },
        tags: ['防滑安全', '易清洗', '抗菌防霉', '浴室专用'],
        strategy: 'blueOcean',
        reason: '浴室安全细分需求，老人儿童市场'
      },
      { 
        keyword: '洗衣机清洁套装', 
        heat: 68, 
        competition: 35, 
        isSelected: false, 
        priority: 3,
        attributes: {
          audience: ['家庭用户', '清洁达人'],
          season: ['四季通用'],
          size: ['标准规格'],
          material: ['清洁剂', '工具组合'],
          style: ['专业风', '简约现代']
        },
        tags: ['深度清洁', '除菌除垢', '延长寿命', '专业工具'],
        strategy: 'blueOcean',
        reason: '家电清洁意识提升，专业化需求增长'
      },
      { 
        keyword: '马桶清洁工具', 
        heat: 65, 
        competition: 40, 
        isSelected: false, 
        priority: 4,
        attributes: {
          audience: ['家庭用户', '清洁工作者'],
          season: ['四季通用'],
          size: ['标准规格', '便携式'],
          material: ['塑料', '不锈钢', '刷毛'],
          style: ['简约现代', '专业风']
        },
        tags: ['深度清洁', '死角清理', '卫生环保', '专业工具'],
        strategy: 'blueOcean',
        reason: '卫生间清洁专业化，细分工具需求'
      }
    ],
    premium: [
      { 
        keyword: '电动牙刷收纳架', 
        heat: 82, 
        competition: 58, 
        isSelected: false, 
        priority: 1,
        attributes: {
          audience: ['年轻女性', '职场女性', '中老年人'],
          season: ['四季通用'],
          size: ['迷你小巧', '标准规格'],
          material: ['环保塑料', '硅胶'],
          style: ['简约现代', '时尚潮流']
        },
        tags: ['电动牙刷专用', '充电便利', '卫生防尘', '家庭适用'],
        strategy: 'premium',
        reason: '电动牙刷普及，专业收纳需求增长'
      },
      { 
        keyword: '毛巾加热架', 
        heat: 78, 
        competition: 68, 
        isSelected: false, 
        priority: 2,
        attributes: {
          audience: ['家庭用户', '中老年人'],
          season: ['秋季', '冬季', '四季通用'],
          size: ['标准规格', '大容量'],
          material: ['不锈钢', '铝合金'],
          style: ['简约现代', '工业风格']
        },
        tags: ['恒温加热', '杀菌除湿', '节能环保', '浴室升级'],
        strategy: 'premium',
        reason: '高端浴室设备，注重生活品质'
      },
      { 
        keyword: '智能马桶盖', 
        heat: 88, 
        competition: 78, 
        isSelected: false, 
        priority: 3,
        attributes: {
          audience: ['高端用户', '科技爱好者'],
          season: ['四季通用'],
          size: ['标准规格', '可定制'],
          material: ['工程塑料', '金属'],
          style: ['科技风', '简约现代']
        },
        tags: ['智能控制', '自动清洗', '座圈加热', '健康卫生'],
        strategy: 'premium',
        reason: '智能卫浴升级，高端生活体验'
      },
      { 
        keyword: '高端浴室套装', 
        heat: 85, 
        competition: 72, 
        isSelected: false, 
        priority: 4,
        attributes: {
          audience: ['高端用户', '装修业主'],
          season: ['四季通用'],
          size: ['成套组合', '可定制'],
          material: ['不锈钢', '陶瓷', '天然石材'],
          style: ['奢华风', '简约现代']
        },
        tags: ['成套配置', '高端材质', '设计感', '品质工艺'],
        strategy: 'premium',
        reason: '高端浴室一体化解决方案'
      }
    ]
  },
  'cat-4': { // 运动户外
    trend: [
      { 
        keyword: '便携瑜伽垫', 
        heat: 91, 
        competition: 72, 
        isSelected: false, 
        priority: 1,
        attributes: {
          audience: ['年轻女性', '职场女性', '学生群体'],
          season: ['四季通用'],
          size: ['便携式', '标准规格'],
          material: ['TPE材质', '天然橡胶'],
          style: ['简约现代', '时尚潮流']
        },
        tags: ['便携折叠', '防滑耐磨', '环保材质', '居家健身'],
        strategy: 'trend',
        reason: '居家健身热潮，瑜伽普及度高'
      },
      { 
        keyword: '智能跳绳计数器', 
        heat: 85, 
        competition: 68, 
        isSelected: false, 
        priority: 2,
        attributes: {
          audience: ['学生群体', '年轻女性', '上班族'],
          season: ['四季通用'],
          size: ['便携式', '标准规格'],
          material: ['环保塑料', '硅胶'],
          style: ['时尚潮流', '简约现代']
        },
        tags: ['智能计数', '减肥神器', '无绳设计', '室内运动'],
        strategy: 'trend',
        reason: '智能运动设备热门，减肥需求旺盛'
      },
      { 
        keyword: '居家健身器材', 
        heat: 88, 
        competition: 75, 
        isSelected: false, 
        priority: 3,
        attributes: {
          audience: ['健身爱好者', '家庭用户'],
          season: ['四季通用'],
          size: ['标准规格', '大容量'],
          material: ['金属', '环保塑料'],
          style: ['简约现代', '工业风']
        },
        tags: ['居家健身', '多功能', '节省空间', '专业训练'],
        strategy: 'trend',
        reason: '居家健身成为主流，设备需求激增'
      },
      { 
        keyword: '减肥神器', 
        heat: 92, 
        competition: 80, 
        isSelected: false, 
        priority: 4,
        attributes: {
          audience: ['减肥人群', '年轻女性'],
          season: ['四季通用'],
          size: ['便携式', '标准规格'],
          material: ['环保塑料', '硅胶'],
          style: ['时尚潮流', '科技风']
        },
        tags: ['快速减肥', '燃脂塑形', '简单易用', '效果显著'],
        strategy: 'trend',
        reason: '减肥市场火热，网红产品层出不穷'
      }
    ],
    blueOcean: [
      { 
        keyword: '户外多功能腰包', 
        heat: 78, 
        competition: 55, 
        isSelected: false, 
        priority: 1,
        attributes: {
          audience: ['运动爱好者', '户外玩家', '年轻人'],
          season: ['春季', '夏季', '秋季'],
          size: ['便携式', '大容量'],
          material: ['防水尼龙', '涤纶'],
          style: ['运动风', '户外风']
        },
        tags: ['防水防汗', '多袋设计', '反光条', '运动专用'],
        strategy: 'blueOcean',
        reason: '户外运动细分装备，专业需求'
      },
      { 
        keyword: '登山杖收纳袋', 
        heat: 65, 
        competition: 38, 
        isSelected: false, 
        priority: 2,
        attributes: {
          audience: ['登山爱好者', '户外玩家'],
          season: ['春季', '夏季', '秋季'],
          size: ['便携式', '标准规格'],
          material: ['防水尼龙', '牛津布'],
          style: ['户外风', '专业风']
        },
        tags: ['专业收纳', '防水耐磨', '轻便携带', '户外专用'],
        strategy: 'blueOcean',
        reason: '登山装备细分收纳需求'
      },
      { 
        keyword: '钓鱼装备收纳', 
        heat: 68, 
        competition: 42, 
        isSelected: false, 
        priority: 3,
        attributes: {
          audience: ['钓鱼爱好者', '中老年人'],
          season: ['春季', '夏季', '秋季'],
          size: ['大容量', '标准规格'],
          material: ['防水塑料', '牛津布'],
          style: ['专业风', '实用风']
        },
        tags: ['专业分类', '防水密封', '大容量', '钓具专用'],
        strategy: 'blueOcean',
        reason: '钓鱼装备专业化收纳需求'
      },
      { 
        keyword: '骑行配件套装', 
        heat: 70, 
        competition: 45, 
        isSelected: false, 
        priority: 4,
        attributes: {
          audience: ['骑行爱好者', '通勤族'],
          season: ['四季通用'],
          size: ['便携式', '标准规格'],
          material: ['碳纤维', '铝合金'],
          style: ['运动风', '科技风']
        },
        tags: ['骑行专用', '轻量化', '安全防护', '专业配件'],
        strategy: 'blueOcean',
        reason: '骑行文化兴起，专业配件需求增长'
      }
    ],
    premium: [
      { 
        keyword: '高端瑜伽砖套装', 
        heat: 72, 
        competition: 45, 
        isSelected: false, 
        priority: 1,
        attributes: {
          audience: ['瑜伽爱好者', '职场女性'],
          season: ['四季通用'],
          size: ['标准规格'],
          material: ['软木', 'EVA'],
          style: ['简约现代', '自然风']
        },
        tags: ['专业瑜伽', '环保软木', '防滑耐用', '辅助工具'],
        strategy: 'premium',
        reason: '专业瑜伽器材，高端用户群体'
      },
      { 
        keyword: '专业健身手套', 
        heat: 75, 
        competition: 52, 
        isSelected: false, 
        priority: 2,
        attributes: {
          audience: ['健身爱好者', '专业运动员'],
          season: ['四季通用'],
          size: ['可调节', '标准规格'],
          material: ['真皮', '透气网布'],
          style: ['专业风', '运动风']
        },
        tags: ['专业防护', '透气舒适', '防滑抓握', '耐用持久'],
        strategy: 'premium',
        reason: '专业健身装备，注重品质和保护'
      },
      { 
        keyword: '智能体脂秤', 
        heat: 85, 
        competition: 68, 
        isSelected: false, 
        priority: 3,
        attributes: {
          audience: ['健身爱好者', '健康管理者'],
          season: ['四季通用'],
          size: ['标准规格'],
          material: ['钢化玻璃', '金属'],
          style: ['科技风', '简约现代']
        },
        tags: ['智能检测', '多项数据', 'APP连接', '健康管理'],
        strategy: 'premium',
        reason: '智能健康设备，精准数据管理'
      },
      { 
        keyword: '户外专业装备', 
        heat: 80, 
        competition: 58, 
        isSelected: false, 
        priority: 4,
        attributes: {
          audience: ['专业户外玩家', '探险爱好者'],
          season: ['四季通用'],
          size: ['专业规格', '可定制'],
          material: ['碳纤维', '钛合金', '防水材料'],
          style: ['专业风', '户外风']
        },
        tags: ['专业级别', '极端环境', '轻量化', '高强度'],
        strategy: 'premium',
        reason: '专业户外装备，极限环境适用'
      }
    ]
  },
  'cat-5': { // 母婴用品
    trend: [
      { 
        keyword: '儿童安全餐具套装', 
        heat: 87, 
        competition: 52, 
        isSelected: false, 
        priority: 1,
        attributes: {
          audience: ['新手妈妈', '家庭用户'],
          season: ['四季通用'],
          size: ['标准规格', '迷你小巧'],
          material: ['食品级硅胶', '环保塑料', '竹纤维'],
          style: ['田园清新', '简约现代', '卡通可爱']
        },
        tags: ['儿童专用', '安全无毒', '防摔设计', '易握手柄'],
        strategy: 'trend',
        reason: '儿童餐具安全话题热度高'
      },
      { 
        keyword: '宝宝爬行垫拼接', 
        heat: 79, 
        competition: 58, 
        isSelected: false, 
        priority: 2,
        attributes: {
          audience: ['新手妈妈', '家庭用户'],
          season: ['四季通用'],
          size: ['大容量', '加大款'],
          material: ['EVA材质', '食品级材料'],
          style: ['卡通可爱', '田园清新']
        },
        tags: ['拼接设计', '防摔缓冲', '易清洗', '宝宝爬行'],
        strategy: 'trend',
        reason: '宝宝爬行发育话题关注度高'
      },
      { 
        keyword: '婴儿辅食工具', 
        heat: 82, 
        competition: 55, 
        isSelected: false, 
        priority: 3,
        attributes: {
          audience: ['新手妈妈', '育儿家庭'],
          season: ['四季通用'],
          size: ['迷你小巧', '标准规格'],
          material: ['食品级硅胶', '不锈钢'],
          style: ['简约现代', '卡通可爱']
        },
        tags: ['辅食制作', '营养搭配', '安全卫生', '易操作'],
        strategy: 'trend',
        reason: '科学育儿理念，辅食工具专业化'
      },
      { 
        keyword: '儿童防护用品', 
        heat: 85, 
        competition: 62, 
        isSelected: false, 
        priority: 4,
        attributes: {
          audience: ['新手妈妈', '安全意识强的家长'],
          season: ['四季通用'],
          size: ['标准规格', '可调节'],
          material: ['环保塑料', '软质材料'],
          style: ['安全实用', '卡通可爱']
        },
        tags: ['儿童安全', '家居防护', '意外预防', '父母安心'],
        strategy: 'trend',
        reason: '儿童安全意识提升，防护用品需求增长'
      }
    ],
    blueOcean: [
      { 
        keyword: '婴儿床收纳挂袋', 
        heat: 82, 
        competition: 48, 
        isSelected: false, 
        priority: 1,
        attributes: {
          audience: ['新手妈妈', '家庭用户'],
          season: ['四季通用'],
          size: ['大容量', '标准规格'],
          material: ['纯棉布料', '无纺布'],
          style: ['田园清新', '简约现代']
        },
        tags: ['床边收纳', '多袋设计', '安全固定', '母婴用品'],
        strategy: 'blueOcean',
        reason: '婴儿床配件细分需求'
      },
      { 
        keyword: '奶粉收纳密封罐', 
        heat: 75, 
        competition: 42, 
        isSelected: false, 
        priority: 2,
        attributes: {
          audience: ['新手妈妈', '奶粉喂养家庭'],
          season: ['四季通用'],
          size: ['大容量', '标准规格'],
          material: ['食品级塑料', '不锈钢'],
          style: ['简约现代', '实用风']
        },
        tags: ['密封保鲜', '分格收纳', '便携取用', '奶粉专用'],
        strategy: 'blueOcean',
        reason: '奶粉收纳细分需求，保鲜要求高'
      },
      { 
        keyword: '宝宝洗澡用品', 
        heat: 78, 
        competition: 45, 
        isSelected: false, 
        priority: 3,
        attributes: {
          audience: ['新手妈妈', '婴幼儿家庭'],
          season: ['四季通用'],
          size: ['标准规格', '便携式'],
          material: ['食品级硅胶', '环保塑料'],
          style: ['卡通可爱', '田园清新']
        },
        tags: ['婴儿洗澡', '安全防滑', '温度提示', '亲子互动'],
        strategy: 'blueOcean',
        reason: '婴儿洗浴用品细分市场'
      },
      { 
        keyword: '儿童书桌收纳', 
        heat: 70, 
        competition: 38, 
        isSelected: false, 
        priority: 4,
        attributes: {
          audience: ['学龄儿童家庭', '教育重视家长'],
          season: ['四季通用'],
          size: ['标准规格', '可调节'],
          material: ['实木', '环保塑料'],
          style: ['简约现代', '卡通可爱']
        },
        tags: ['学习收纳', '文具分类', '培养习惯', '儿童专用'],
        strategy: 'blueOcean',
        reason: '儿童学习用品收纳，培养整理习惯'
      }
    ],
    premium: [
      { 
        keyword: '智能奶瓶消毒器', 
        heat: 85, 
        competition: 75,
        isSelected: false, 
        priority: 1,
        attributes: {
          audience: ['新手妈妈', '家庭用户'],
          season: ['四季通用'],
          size: ['标准规格', '大容量'],
          material: ['食品级塑料', '不锈钢'],
          style: ['简约现代', '科技风']
        },
        tags: ['紫外线消毒', '智能定时', '安全可靠', '婴儿专用'],
        strategy: 'premium',
        reason: '高端母婴电器，注重科技和安全'
      },
      { 
        keyword: '高端婴儿推车', 
        heat: 92, 
        competition: 82, 
        isSelected: false, 
        priority: 2,
        attributes: {
          audience: ['高端用户', '品质育儿家庭'],
          season: ['四季通用'],
          size: ['标准规格', '可折叠'],
          material: ['铝合金', '高端布料'],
          style: ['时尚潮流', '欧式风格']
        },
        tags: ['高端品质', '安全舒适', '时尚设计', '多功能'],
        strategy: 'premium',
        reason: '高端婴儿推车，品质和设计并重'
      },
      { 
        keyword: '实木儿童餐椅', 
        heat: 78, 
        competition: 65, 
        isSelected: false, 
        priority: 3,
        attributes: {
          audience: ['品质育儿家庭', '环保意识家长'],
          season: ['四季通用'],
          size: ['可调节', '标准规格'],
          material: ['实木', '环保漆'],
          style: ['自然风', '简约现代']
        },
        tags: ['天然实木', '可调节高度', '安全环保', '耐用持久'],
        strategy: 'premium',
        reason: '天然材质儿童家具，环保安全'
      },
      { 
        keyword: '有机棉婴儿用品', 
        heat: 80, 
        competition: 58, 
        isSelected: false, 
        priority: 4,
        attributes: {
          audience: ['高端用户', '环保意识家长'],
          season: ['四季通用'],
          size: ['标准规格', '多规格'],
          material: ['有机棉', '天然纤维'],
          style: ['自然风', '简约现代']
        },
        tags: ['有机材质', '天然无添加', '亲肤柔软', '高端品质'],
        strategy: 'premium',
        reason: '有机婴儿用品，天然健康理念'
      }
    ]
  },
  'cat-6': { // 宠物用品
    trend: [
      { 
        keyword: '猫咪自动饮水器', 
        heat: 89, 
        competition: 65, 
        isSelected: false, 
        priority: 1,
        attributes: {
          audience: ['宠物主人', '年轻女性', '单身人士'],
          season: ['四季通用'],
          size: ['大容量', '标准规格'],
          material: ['食品级塑料', '不锈钢'],
          style: ['简约现代', '可爱风']
        },
        tags: ['自动循环', '静音设计', '过滤净化', '猫咪专用'],
        strategy: 'trend',
        reason: '宠物智能用品热潮，猫咪经济火热'
      },
      { 
        keyword: '智能宠物喂食器', 
        heat: 86, 
        competition: 72, 
        isSelected: false, 
        priority: 2,
        attributes: {
          audience: ['忙碌宠物主', '科技爱好者'],
          season: ['四季通用'],
          size: ['大容量', '标准规格'],
          material: ['食品级塑料', '不锈钢'],
          style: ['科技风', '简约现代']
        },
        tags: ['定时喂食', '智能控制', 'APP操作', '宠物健康'],
        strategy: 'trend',
        reason: '智能宠物设备火热，懒人养宠需求'
      },
      { 
        keyword: '宠物智能玩具', 
        heat: 83, 
        competition: 68, 
        isSelected: false, 
        priority: 3,
        attributes: {
          audience: ['宠物主人', '年轻群体'],
          season: ['四季通用'],
          size: ['标准规格', '便携式'],
          material: ['环保塑料', '硅胶'],
          style: ['科技风', '可爱风']
        },
        tags: ['智能互动', '自动运转', '娱乐解闷', '宠物训练'],
        strategy: 'trend',
        reason: '宠物娱乐智能化，互动玩具受欢迎'
      },
      { 
        keyword: '网红宠物用品', 
        heat: 88, 
        competition: 75, 
        isSelected: false, 
        priority: 4,
        attributes: {
          audience: ['年轻宠物主', '社交媒体用户'],
          season: ['四季通用'],
          size: ['标准规格', '迷你小巧'],
          material: ['环保材料', '时尚材质'],
          style: ['时尚潮流', '可爱风']
        },
        tags: ['网红推荐', '拍照神器', '时尚设计', '社交分享'],
        strategy: 'trend',
        reason: '宠物网红经济，晒宠物成为风尚'
      }
    ],
    blueOcean: [
      { 
        keyword: '狗狗训练零食收纳盒', 
        heat: 76, 
        competition: 42, 
        isSelected: false, 
        priority: 1,
        attributes: {
          audience: ['宠物主人', '家庭用户'],
          season: ['四季通用'],
          size: ['便携式', '标准规格'],
          material: ['食品级塑料', '硅胶'],
          style: ['简约现代', '可爱风']
        },
        tags: ['密封保鲜', '便携训练', '分格设计', '狗狗专用'],
        strategy: 'blueOcean',
        reason: '宠物训练用品细分市场'
      },
      { 
        keyword: '宠物外出便携包', 
        heat: 72, 
        competition: 38, 
        isSelected: false, 
        priority: 2,
        attributes: {
          audience: ['宠物主人', '出行族'],
          season: ['四季通用'],
          size: ['便携式', '大容量'],
          material: ['牛津布', '透气网布'],
          style: ['实用风', '可爱风']
        },
        tags: ['外出便携', '透气舒适', '安全固定', '多功能'],
        strategy: 'blueOcean',
        reason: '宠物外出用品细分需求'
      },
      { 
        keyword: '宠物美容工具', 
        heat: 68, 
        competition: 45, 
        isSelected: false, 
        priority: 3,
        attributes: {
          audience: ['精致宠物主', '美容爱好者'],
          season: ['四季通用'],
          size: ['标准规格', '便携式'],
          material: ['不锈钢', '硅胶'],
          style: ['专业风', '简约现代']
        },
        tags: ['专业美容', '护毛工具', '清洁卫生', '宠物护理'],
        strategy: 'blueOcean',
        reason: '宠物美容护理专业化需求'
      },
      { 
        keyword: '水族箱清洁用品', 
        heat: 65, 
        competition: 35, 
        isSelected: false, 
        priority: 4,
        attributes: {
          audience: ['水族爱好者', '观赏鱼主人'],
          season: ['四季通用'],
          size: ['标准规格', '便携式'],
          material: ['环保塑料', '专用材料'],
          style: ['专业风', '实用风']
        },
        tags: ['水质清洁', '专业工具', '生态维护', '鱼类健康'],
        strategy: 'blueOcean',
        reason: '水族养护细分市场，专业工具需求'
      }
    ],
    premium: [
      { 
        keyword: '高端猫砂盆全套', 
        heat: 82, 
        competition: 68, 
        isSelected: false, 
        priority: 1,
        attributes: {
          audience: ['宠物主人', '高端用户'],
          season: ['四季通用'],
          size: ['大容量', '加大款'],
          material: ['环保塑料', '不锈钢'],
          style: ['简约现代', '高端设计']
        },
        tags: ['全封闭设计', '除臭抗菌', '易清理', '高端品质'],
        strategy: 'premium',
        reason: '高端宠物用品，注重品质和体验'
      },
      { 
        keyword: '宠物智能监控', 
        heat: 88, 
        competition: 78, 
        isSelected: false, 
        priority: 2,
        attributes: {
          audience: ['忙碌宠物主', '科技爱好者'],
          season: ['四季通用'],
          size: ['标准规格'],
          material: ['电子产品', '高端塑料'],
          style: ['科技风', '简约现代']
        },
        tags: ['远程监控', '语音对讲', '智能抓拍', '宠物安全'],
        strategy: 'premium',
        reason: '智能宠物监控，远程关爱需求'
      },
      { 
        keyword: '进口宠物食品', 
        heat: 85, 
        competition: 72, 
        isSelected: false, 
        priority: 3,
        attributes: {
          audience: ['高端宠物主', '品质重视者'],
          season: ['四季通用'],
          size: ['标准规格', '大容量'],
          material: ['天然食材', '进口原料'],
          style: ['高端品质', '自然风']
        },
        tags: ['进口品质', '天然营养', '宠物健康', '高端配方'],
        strategy: 'premium',
        reason: '高端宠物食品，营养健康为先'
      },
      { 
        keyword: '专业宠物护理', 
        heat: 80, 
        competition: 65, 
        isSelected: false, 
        priority: 4,
        attributes: {
          audience: ['专业宠物主', '护理重视者'],
          season: ['四季通用'],
          size: ['成套组合', '专业规格'],
          material: ['专业材料', '医用级'],
          style: ['专业风', '简约现代']
        },
        tags: ['专业护理', '医用级别', '健康管理', '疾病预防'],
        strategy: 'premium',
        reason: '专业宠物护理，健康管理需求'
      }
    ]
  },
  'cat-10': { // 美妆护肤
    trend: [
      { 
        keyword: '便携LED化妆镜', 
        heat: 88, 
        competition: 72, 
        isSelected: false, 
        priority: 1,
        attributes: {
          audience: ['年轻女性', '职场女性'],
          season: ['四季通用'],
          size: ['便携式', '迷你小巧'],
          material: ['钢化玻璃', '环保塑料'],
          style: ['时尚潮流', '简约现代']
        },
        tags: ['便携出行', '美妆必备', '高清镜面', 'LED补光'],
        strategy: 'trend',
        reason: '便携美妆工具热门，职场女性刚需'
      },
      { 
        keyword: '网红美妆工具', 
        heat: 92, 
        competition: 78, 
        isSelected: false, 
        priority: 2,
        attributes: {
          audience: ['美妆爱好者', '年轻女性'],
          season: ['四季通用'],
          size: ['标准规格', '便携式'],
          material: ['合成纤维', '金属'],
          style: ['时尚潮流', '可爱风']
        },
        tags: ['网红推荐', '美妆神器', '上妆工具', '颜值担当'],
        strategy: 'trend',
        reason: '网红美妆工具火爆，种草效应强'
      },
      { 
        keyword: '美妆蛋收纳盒', 
        heat: 85, 
        competition: 68, 
        isSelected: false, 
        priority: 3,
        attributes: {
          audience: ['美妆爱好者', '年轻女性'],
          season: ['四季通用'],
          size: ['迷你小巧', '标准规格'],
          material: ['环保塑料', '硅胶'],
          style: ['时尚潮流', '简约现代']
        },
        tags: ['美妆蛋专用', '通风干燥', '卫生收纳', '便携设计'],
        strategy: 'trend',
        reason: '美妆蛋普及，专用收纳成需求'
      },
      { 
        keyword: '化妆品收纳神器', 
        heat: 90, 
        competition: 75, 
        isSelected: false, 
        priority: 4,
        attributes: {
          audience: ['美妆爱好者', '化妆品收集者'],
          season: ['四季通用'],
          size: ['大容量', '标准规格'],
          material: ['亚克力', '环保塑料'],
          style: ['时尚潮流', '简约现代']
        },
        tags: ['大容量收纳', '分类整理', '透明可视', '美妆专用'],
        strategy: 'trend',
        reason: '化妆品收纳需求旺盛，整理成风尚'
      }
    ],
    blueOcean: [
      { 
        keyword: '化妆刷清洁收纳盒', 
        heat: 75, 
        competition: 48, 
        isSelected: false, 
        priority: 1,
        attributes: {
          audience: ['美妆爱好者', '年轻女性'],
          season: ['四季通用'],
          size: ['标准规格', '大容量'],
          material: ['环保塑料', '硅胶'],
          style: ['时尚潮流', '简约现代']
        },
        tags: ['刷具清洁', '分格收纳', '快速晾干', '美妆工具'],
        strategy: 'blueOcean',
        reason: '化妆刷护理细分需求'
      },
      { 
        keyword: '美甲工具收纳', 
        heat: 68, 
        competition: 42, 
        isSelected: false, 
        priority: 2,
        attributes: {
          audience: ['美甲爱好者', '年轻女性'],
          season: ['四季通用'],
          size: ['标准规格', '便携式'],
          material: ['环保塑料', '皮革'],
          style: ['时尚潮流', '精致风']
        },
        tags: ['美甲专用', '工具分类', '便携收纳', '专业整理'],
        strategy: 'blueOcean',
        reason: '美甲工具专业化收纳需求'
      },
      { 
        keyword: '护肤品分装瓶', 
        heat: 70, 
        competition: 38, 
        isSelected: false, 
        priority: 3,
        attributes: {
          audience: ['护肤爱好者', '旅行族'],
          season: ['四季通用'],
          size: ['迷你小巧', '便携式'],
          material: ['食品级塑料', '玻璃'],
          style: ['简约现代', '时尚潮流']
        },
        tags: ['旅行分装', '便携护肤', '密封防漏', '卫生安全'],
        strategy: 'blueOcean',
        reason: '护肤品分装细分需求，旅行便携'
      },
      { 
        keyword: '面膜收纳展示架', 
        heat: 72, 
        competition: 45, 
        isSelected: false, 
        priority: 4,
        attributes: {
          audience: ['面膜爱好者', '护肤达人'],
          season: ['四季通用'],
          size: ['大容量', '标准规格'],
          material: ['亚克力', '金属'],
          style: ['简约现代', '展示风']
        },
        tags: ['面膜专用', '展示收纳', '分类整理', '护肤仪式感'],
        strategy: 'blueOcean',
        reason: '面膜收纳展示细分需求，仪式感护肤'
      }
    ],
    premium: [
      { 
        keyword: '智能护肤品冰箱', 
        heat: 82, 
        competition: 78, 
        isSelected: false, 
        priority: 1,
        attributes: {
          audience: ['护肤达人', '高端用户'],
          season: ['四季通用'],
          size: ['迷你小巧', '标准规格'],
          material: ['环保塑料', '金属'],
          style: ['时尚潮流', '科技风']
        },
        tags: ['恒温保鲜', '护肤专用', '静音设计', '智能控温'],
        strategy: 'premium',
        reason: '高端护肤设备，精致护肤理念'
      },
      { 
        keyword: '高端化妆镜台', 
        heat: 85, 
        competition: 72, 
        isSelected: false, 
        priority: 2,
        attributes: {
          audience: ['高端用户', '美妆达人'],
          season: ['四季通用'],
          size: ['大尺寸', '可定制'],
          material: ['实木', '钢化玻璃', '金属'],
          style: ['奢华风', '简约现代']
        },
        tags: ['专业级别', '好莱坞灯光', '大尺寸镜面', '高端材质'],
        strategy: 'premium',
        reason: '专业化妆台，高端美妆体验'
      },
      { 
        keyword: '专业美妆工具套装', 
        heat: 80, 
        competition: 65, 
        isSelected: false, 
        priority: 3,
        attributes: {
          audience: ['专业美妆师', '美妆达人'],
          season: ['四季通用'],
          size: ['成套组合', '专业规格'],
          material: ['天然毛发', '高端金属'],
          style: ['专业风', '高端设计']
        },
        tags: ['专业级别', '天然材质', '精密工艺', '成套配置'],
        strategy: 'premium',
        reason: '专业美妆工具，追求极致效果'
      },
      { 
        keyword: '奢华护肤收纳', 
        heat: 78, 
        competition: 68, 
        isSelected: false, 
        priority: 4,
        attributes: {
          audience: ['奢侈品用户', '高端护肤达人'],
          season: ['四季通用'],
          size: ['大容量', '可定制'],
          material: ['真皮', '高端木材', '水晶'],
          style: ['奢华风', '典雅风']
        },
        tags: ['奢华材质', '手工工艺', '定制服务', '艺术收藏'],
        strategy: 'premium',
        reason: '奢华护肤收纳，彰显品味和地位'
      }
    ]
  }
}

// 根据类目生成关键词
export function generateKeywords(categoryIds: string[], strategy?: string): KeywordData[] {
  const keywords: KeywordData[] = []
  
  categoryIds.forEach(catId => {
    const categoryKeywords = CATEGORY_KEYWORDS_DATABASE[catId]
    if (categoryKeywords) {
      if (strategy && categoryKeywords[strategy]) {
        // 如果指定了策略，返回对应策略的关键词
        keywords.push(...categoryKeywords[strategy])
      } else {
        // 否则返回所有策略的关键词
        Object.values(categoryKeywords).forEach(strategyKeywords => {
          keywords.push(...strategyKeywords)
        })
      }
    }
  })

  // 如果没有找到对应的关键词，生成一些通用关键词
  if (keywords.length === 0) {
    const fallbackKeywords = [
      {
        keyword: '创意家居',
        heat: 65,
        competition: 45,
        isSelected: false,
        priority: 1,
        attributes: {
          audience: ['家庭用户'],
          season: ['四季通用'],
          size: ['标准规格'],
          material: ['环保塑料'],
          style: ['简约现代']
        },
        tags: ['创意设计', '家居装饰', '实用美观', '品质生活'],
        strategy: 'trend',
        reason: '创意家居热门趋势'
      },
      {
        keyword: '北欧风格',
        heat: 62,
        competition: 42,
        isSelected: false,
        priority: 2,
        attributes: {
          audience: ['年轻女性', '家庭用户'],
          season: ['四季通用'],
          size: ['标准规格'],
          material: ['实木', '环保塑料'],
          style: ['北欧风情', '简约现代']
        },
        tags: ['北欧风格', '简约设计', '自然风格', '时尚美观'],
        strategy: 'blueOcean',
        reason: '北欧风格持续受欢迎'
      },
      {
        keyword: '简约设计',
        heat: 68,
        competition: 38,
        isSelected: false,
        priority: 3,
        attributes: {
          audience: ['职场女性', '上班族'],
          season: ['四季通用'],
          size: ['标准规格'],
          material: ['不锈钢', '环保塑料'],
          style: ['简约现代', '工业风格']
        },
        tags: ['简约设计', '现代风格', '实用功能', '高品质'],
        strategy: 'premium',
        reason: '简约设计理念流行'
      }
    ]

    keywords.push(...fallbackKeywords.slice(0, 10))
  }

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

// 根据类目和策略动态获取推荐关键词
export function getRecommendedKeywordsByCategory(categoryIds: string[], strategyId: string): KeywordData[] {
  const keywords: KeywordData[] = []
  
  categoryIds.forEach(catId => {
    const categoryKeywords = CATEGORY_KEYWORDS_DATABASE[catId]
    if (categoryKeywords && categoryKeywords[strategyId]) {
      // 获取该类目下该策略的前4个关键词作为推荐
      const strategyKeywords = categoryKeywords[strategyId].slice(0, 4).map((kw, index) => ({
        ...kw,
        type: strategyId === 'trend' ? '热搜词' : 
              strategyId === 'blueOcean' ? '长尾词' : '高端词',
        priority: index + 1
      }))
      keywords.push(...strategyKeywords)
    }
  })
  
  // 如果没有找到对应的关键词，返回策略默认示例
  if (keywords.length === 0) {
    const strategy = mockStrategies.find(s => s.id === strategyId)
    if (strategy) {
      return strategy.recommendedKeywords.slice(0, 6).map((kw, index) => ({
        keyword: kw.keyword,
        heat: kw.heat,
        competition: kw.competition,
        isSelected: false,
        priority: index + 1,
        type: kw.type,
        reason: kw.reason
      }))
    }
  }
  
  return keywords.slice(0, 6) // 最多返回6个推荐关键词
}