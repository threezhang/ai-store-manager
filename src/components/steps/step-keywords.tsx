'use client'

import { useState, useEffect } from 'react'
import { useStore } from '@/lib/store'
import { generateKeywords, getRecommendedKeywordsByCategory } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { 
  X, Search, Lightbulb, TrendingUp, Shield, Target, 
  Sparkles, Plus, ChevronRight, Hash, Flame, 
  Star, Eye, BarChart3, Users, Clock, Package,
  Palette, Shirt, Home, Baby, GraduationCap, DollarSign,
  CheckCircle2, AlertCircle, ArrowRight, Edit3, ChevronDown,
  Tag, Loader2, Check
} from 'lucide-react'
import type { KeywordData } from '@/lib/types'

// 商品属性配置（支持多选）
const ATTRIBUTE_OPTIONS = {
  audience: [
    { label: '家庭用户', icon: Users },
    { label: '年轻女性', icon: Users },
    { label: '上班族', icon: Users },
    { label: '学生群体', icon: GraduationCap },
    { label: '新手妈妈', icon: Baby },
    { label: '中老年人', icon: Users },
    { label: '青少年', icon: Users },
    { label: '单身人士', icon: Users },
    { label: '职场女性', icon: Users }
  ],
  season: [
    { label: '春季', icon: Clock },
    { label: '夏季', icon: Clock },
    { label: '秋季', icon: Clock },
    { label: '冬季', icon: Clock },
    { label: '四季通用', icon: Clock }
  ],
  size: [
    { label: '迷你小巧', icon: Target },
    { label: '中等尺寸', icon: Target },
    { label: '大容量', icon: Target },
    { label: '便携式', icon: Target },
    { label: '可调节', icon: Target },
    { label: '标准规格', icon: Target },
    { label: '加大款', icon: Target }
  ],
  material: [
    { label: '环保塑料', icon: Package },
    { label: '不锈钢', icon: Package },
    { label: '实木', icon: Package },
    { label: '钢化玻璃', icon: Package },
    { label: '纯棉布料', icon: Package },
    { label: '食品级硅胶', icon: Package },
    { label: '高档陶瓷', icon: Package },
    { label: '竹纤维', icon: Package }
  ],
  style: [
    { label: '简约现代', icon: Palette },
    { label: '时尚潮流', icon: Palette },
    { label: '复古典雅', icon: Palette },
    { label: '日式极简', icon: Palette },
    { label: '北欧风情', icon: Palette },
    { label: '工业风格', icon: Palette },
    { label: '田园清新', icon: Palette }
  ]
}

// 丰富的关键词模拟数据 - 按类目和策略组织
const COMPREHENSIVE_KEYWORDS_POOL = [
  // 日用餐厨类目
  {
    categoryId: 'cat-1',
    categoryName: '日用餐厨',
    keywords: [
      // 热点爆款策略关键词
      {
        keyword: '厨房收纳神器',
        heat: 95, competition: 68,
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
        heat: 88, competition: 72,
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
        keyword: '密封保鲜盒套装',
        heat: 85, competition: 45,
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
        keyword: '不锈钢调料架',
        heat: 72, competition: 38,
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
        heat: 78, competition: 55,
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
        keyword: '沥水碗架组合',
        heat: 68, competition: 42,
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
      }
    ]
  },
  
  // 居家收纳类目
  {
    categoryId: 'cat-2',
    categoryName: '居家收纳',
    keywords: [
      {
        keyword: 'ins风桌面收纳盒',
        heat: 92, competition: 75,
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
        heat: 88, competition: 62,
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
        keyword: '旋转化妆品收纳架',
        heat: 85, competition: 58,
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
        keyword: '床底收纳整理箱',
        heat: 76, competition: 45,
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
        heat: 72, competition: 38,
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
        keyword: '透明鞋盒收纳神器',
        heat: 68, competition: 52,
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
      }
    ]
  },
  
  // 个护清洁类目
  {
    categoryId: 'cat-3',
    categoryName: '个护清洁',
    keywords: [
      {
        keyword: '免打孔浴室置物架',
        heat: 89, competition: 65,
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
        keyword: '电动牙刷收纳架',
        heat: 82, competition: 58,
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
        keyword: '洗衣液收纳盒',
        heat: 75, competition: 42,
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
        keyword: '毛巾加热架',
        heat: 78, competition: 68,
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
      }
    ]
  },
  
  // 运动户外类目
  {
    categoryId: 'cat-4',
    categoryName: '运动户外',
    keywords: [
      {
        keyword: '便携瑜伽垫',
        heat: 91, competition: 72,
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
        heat: 85, competition: 68,
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
        keyword: '户外多功能腰包',
        heat: 78, competition: 55,
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
        keyword: '高端瑜伽砖套装',
        heat: 72, competition: 45,
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
      }
    ]
  },
  
  // 母婴用品类目
  {
    categoryId: 'cat-5',
    categoryName: '母婴用品',
    keywords: [
      {
        keyword: '儿童安全餐具套装',
        heat: 87, competition: 52,
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
        keyword: '婴儿床收纳挂袋',
        heat: 82, competition: 48,
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
        keyword: '智能奶瓶消毒器',
        heat: 85, competition: 75,
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
        keyword: '宝宝爬行垫拼接',
        heat: 79, competition: 58,
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
      }
    ]
  },
  
  // 宠物用品类目
  {
    categoryId: 'cat-6',
    categoryName: '宠物用品',
    keywords: [
      {
        keyword: '猫咪自动饮水器',
        heat: 89, competition: 65,
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
        keyword: '狗狗训练零食收纳盒',
        heat: 76, competition: 42,
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
        keyword: '高端猫砂盆全套',
        heat: 82, competition: 68,
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
      }
    ]
  },
  
  // 美妆护肤类目
  {
    categoryId: 'cat-10',
    categoryName: '美妆护肤',
    keywords: [
      {
        keyword: '便携LED化妆镜',
        heat: 88, competition: 72,
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
        keyword: '化妆刷清洁收纳盒',
        heat: 75, competition: 48,
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
        keyword: '智能护肤品冰箱',
        heat: 82, competition: 78,
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
      }
    ]
  }
]

// 根据关键词和类目生成真实标签
const generateRealisticTags = (keyword: string, category: string) => {
  const lowerKeyword = keyword.toLowerCase()
  const lowerCategory = category.toLowerCase()
  
  const baseTags = {
    storage: ['收纳整理', '分类储存', '节省空间', '防尘防潮', '透明可视'],
    kitchen: ['厨房专用', '易清洁', '耐高温', '食品级材质', '防滑底座'],
    clothing: ['时尚百搭', '舒适透气', '防皱免烫', '四季适穿', '修身显瘦'],
    beauty: ['温和护肤', '深层滋润', '天然成分', '持久保湿', '敏感肌可用'],
    baby: ['婴儿专用', '安全无毒', '柔软亲肤', '抗菌防螨', '易清洗'],
    digital: ['智能便携', '快速充电', '防水防摔', '兼容性强', '长效续航'],
    home: ['家居装饰', '实用美观', '多功能', '环保材质', '耐用持久']
  }
  
  let tags = []
  
  // 根据关键词匹配基础标签
  if (lowerKeyword.includes('收纳') || lowerKeyword.includes('整理')) {
    tags.push(...baseTags.storage.slice(0, 3))
  } else if (lowerKeyword.includes('厨房') || lowerKeyword.includes('餐具')) {
    tags.push(...baseTags.kitchen.slice(0, 3))
  } else if (lowerKeyword.includes('衣') || lowerKeyword.includes('服装')) {
    tags.push(...baseTags.clothing.slice(0, 3))
  } else if (lowerKeyword.includes('美妆') || lowerKeyword.includes('护肤')) {
    tags.push(...baseTags.beauty.slice(0, 3))
  } else if (lowerKeyword.includes('婴') || lowerKeyword.includes('儿童')) {
    tags.push(...baseTags.baby.slice(0, 3))
  } else if (lowerKeyword.includes('数码') || lowerKeyword.includes('充电') || lowerKeyword.includes('台灯')) {
    tags.push(...baseTags.digital.slice(0, 3))
  } else {
    tags.push(...baseTags.home.slice(0, 3))
  }
  
  // 根据类目补充标签
  if (lowerCategory.includes('家居') || lowerCategory.includes('收纳')) {
    tags.push('家居必备')
  } else if (lowerCategory.includes('母婴')) {
    tags.push('母婴专用')
  } else if (lowerCategory.includes('服装')) {
    tags.push('潮流单品')
  }
  
  return [...new Set(tags)].slice(0, 4)
}

// 智能匹配产品属性
const getProductAttributes = (kw: KeywordData, categories: any[]) => {
  const keyword = kw.keyword.toLowerCase()
  const categoryName = categories.length > 0 ? categories[0].name : '家居收纳'
  
  // 先检查是否在丰富数据池中
  const allKeywords = COMPREHENSIVE_KEYWORDS_POOL.flatMap(cat => cat.keywords)
  const richData = allKeywords.find(item => 
    item.keyword.toLowerCase().includes(keyword.toLowerCase().slice(0, 2)) ||
    keyword.toLowerCase().includes(item.keyword.toLowerCase().slice(0, 2))
  )
  
  if (richData) {
    return {
      ...richData.attributes,
      tags: richData.tags
    }
  }
  
  // 默认智能匹配
  const attributes = {
    audience: [],
    season: [],
    size: [],
    material: [],
    style: [],
    tags: []
  }
  
  // 基于关键词智能匹配
  if (keyword.includes('收纳') || keyword.includes('整理') || keyword.includes('家居')) {
    attributes.audience = ['家庭用户']
    attributes.season = ['四季通用']
    attributes.size = ['中等尺寸', '大容量']
    attributes.material = ['环保塑料']
    attributes.style = ['简约现代']
  } else if (keyword.includes('服装') || keyword.includes('衣服') || keyword.includes('包')) {
    attributes.audience = ['年轻女性']
    attributes.season = ['四季通用']
    attributes.size = ['标准规格']
    attributes.material = ['纯棉布料']
    attributes.style = ['时尚潮流']
  } else if (keyword.includes('母婴') || keyword.includes('宝宝') || keyword.includes('儿童')) {
    attributes.audience = ['新手妈妈']
    attributes.season = ['四季通用']
    attributes.size = ['标准规格']
    attributes.material = ['食品级硅胶']
    attributes.style = ['田园清新']
  } else {
    // 默认配置
    attributes.audience = ['家庭用户']
    attributes.season = ['四季通用']
    attributes.size = ['标准规格']
    attributes.material = ['环保塑料']
    attributes.style = ['简约现代']
  }
  
  // 生成真实标签
  attributes.tags = generateRealisticTags(keyword, categoryName)
  
  return attributes
}

// 多选属性编辑组件
const MultiSelectEditor = ({ label, values, options, onChange, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false)
  
  const handleToggle = (optionLabel) => {
    const newValues = values.includes(optionLabel)
      ? values.filter(v => v !== optionLabel)
      : [...values, optionLabel]
    onChange(newValues)
  }
  
  return (
    <div className="relative">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between p-2 border border-gray-300 rounded text-sm cursor-pointer hover:border-blue-400 transition-colors min-h-[36px]"
      >
        <div className="flex items-center gap-2 flex-1">
          <Icon className="w-3 h-3 text-gray-500 flex-shrink-0" />
          <div className="flex flex-wrap gap-1 flex-1">
            {values.length === 0 ? (
              <span className="text-gray-400">请选择</span>
            ) : values.length <= 2 ? (
              values.map(value => (
                <span key={value} className="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">
                  {value}
                </span>
              ))
            ) : (
              <>
                {values.slice(0, 1).map(value => (
                  <span key={value} className="bg-blue-100 text-blue-700 px-1 py-0.5 rounded text-xs">
                    {value}
                  </span>
                ))}
                <span className="text-gray-500 text-xs">+{values.length - 1}</span>
              </>
            )}
          </div>
        </div>
        <ChevronDown className={cn("w-3 h-3 text-gray-400 transition-transform flex-shrink-0", isOpen && "rotate-180")} />
      </div>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-10 bg-white border border-gray-300 rounded shadow-lg mt-1 max-h-40 overflow-y-auto">
          {options.map((option) => {
            const OptionIcon = option.icon
            const isSelected = values.includes(option.label)
            return (
              <div
                key={option.label}
                onClick={() => handleToggle(option.label)}
                className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer text-sm"
              >
                <div className={cn(
                  "w-4 h-4 border rounded flex items-center justify-center",
                  isSelected ? "bg-blue-600 border-blue-600" : "border-gray-300"
                )}>
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                </div>
                <OptionIcon className="w-3 h-3 text-gray-500" />
                <span>{option.label}</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// 标签编辑组件
const TagEditor = ({ tags, onChange }) => {
  const [isAdding, setIsAdding] = useState(false)
  const [newTag, setNewTag] = useState('')
  
  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      onChange([...tags, newTag.trim()])
      setNewTag('')
      setIsAdding(false)
    }
  }
  
  const handleRemoveTag = (tagToRemove) => {
    onChange(tags.filter(tag => tag !== tagToRemove))
  }
  
  return (
    <div>
      <label className="block text-xs text-gray-600 mb-2">标签</label>
      <div className="flex flex-wrap gap-1">
        {tags.map((tag, index) => (
          <span 
            key={index}
            className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs flex items-center gap-1 group"
          >
            {tag}
            <X 
              className="w-3 h-3 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity" 
              onClick={() => handleRemoveTag(tag)}
            />
          </span>
        ))}
        
        {isAdding ? (
          <div className="flex items-center gap-1">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
              onBlur={handleAddTag}
              className="w-16 px-1 py-0.5 text-xs border border-gray-300 rounded"
              placeholder="标签"
              autoFocus
            />
          </div>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs hover:bg-gray-200 transition-colors flex items-center gap-1"
          >
            <Plus className="w-3 h-3" />
            添加
          </button>
        )}
      </div>
    </div>
  )
}

// 根据类目和策略筛选关键词
const getKeywordsByCategory = (categoryId: string, strategy?: string) => {
  const categoryData = COMPREHENSIVE_KEYWORDS_POOL.find(cat => cat.categoryId === categoryId)
  if (!categoryData) return []
  
  if (strategy) {
    return categoryData.keywords.filter(kw => kw.strategy === strategy)
  }
  
  return categoryData.keywords
}

// 智能搜索关键词
const searchKeywords = (searchTerm: string) => {
  const allKeywords = COMPREHENSIVE_KEYWORDS_POOL.flatMap(cat => cat.keywords)
  
  return allKeywords.filter(item =>
    item.keyword.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
    item.attributes.audience.some(audience => audience.toLowerCase().includes(searchTerm.toLowerCase()))
  )
}

export default function StepKeywords() {
  const { 
    selectedCategories, 
    selectedStrategies,
    keywords: storedKeywords,
    updateKeywords,
    setCurrentStep,
    canProceedToNextStep
  } = useStore()

  const [keywords, setKeywords] = useState<KeywordData[]>([])
  const [keywordAttributes, setKeywordAttributes] = useState<{[key: string]: any}>({})
  const [newKeyword, setNewKeyword] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  const selectedStrategy = selectedStrategies[0]

  // 初始化关键词数据
  useEffect(() => {
    console.log('关键词初始化:', { selectedStrategy, selectedCategories })
    
    // 强制刷新 - 每次都重新生成关键词
    if (selectedStrategy && selectedCategories.length > 0) {
      // 根据选中的类目和策略动态生成推荐关键词
      const categoryIds = selectedCategories.map(cat => cat.id)
      console.log('类目IDs:', categoryIds, '策略:', selectedStrategy.id)
      
      const recommendedKeywords = getRecommendedKeywordsByCategory(categoryIds, selectedStrategy.id)
      console.log('推荐关键词:', recommendedKeywords)
      
      const strategyKeywords: KeywordData[] = recommendedKeywords.slice(0, 6).map((kw, index) => ({
        keyword: kw.keyword,
        heat: kw.heat,
        competition: kw.competition,
        isSelected: true,
        priority: index + 1,
        type: 'strategy',
        attributes: kw.attributes,
        tags: kw.tags,
        strategy: kw.strategy,
        reason: kw.reason
      }))
      
      // 从类目数据库中获取补充关键词（选择其他策略的关键词作为备选）
      const additionalKeywords = generateKeywords(categoryIds).filter(kw => 
        !strategyKeywords.some(sk => sk.keyword === kw.keyword)
      ).slice(0, 8)
      
      const supplementKeywords: KeywordData[] = additionalKeywords.map((kw, index) => ({
        ...kw,
        isSelected: false,
        priority: strategyKeywords.length + index + 1,
        type: 'supplement'
      }))
      
      const allKeywords = [...strategyKeywords, ...supplementKeywords]
      console.log('最终关键词:', allKeywords)
      
      setKeywords(allKeywords)
      updateKeywords(allKeywords)
      
      // 初始化属性数据
      const attributesMap = {}
      strategyKeywords.forEach(kw => {
        if (kw.attributes) {
          attributesMap[kw.keyword] = {
            audience: kw.attributes.audience || ['家庭用户'],
            season: kw.attributes.season || ['四季通用'],
            size: kw.attributes.size || ['标准规格'],
            material: kw.attributes.material || ['环保塑料'],
            style: kw.attributes.style || ['简约现代'],
            tags: kw.tags || ['实用', '优质']
          }
        } else {
          attributesMap[kw.keyword] = getProductAttributes(kw, selectedCategories)
        }
      })
      setKeywordAttributes(attributesMap)
    } else if (storedKeywords.length > 0) {
      // 如果有存储的关键词，则使用存储的
      setKeywords(storedKeywords)
      // 初始化属性数据
      const attributesMap = {}
      storedKeywords.forEach(kw => {
        if (kw.isSelected) {
          attributesMap[kw.keyword] = getProductAttributes(kw, selectedCategories)
        }
      })
      setKeywordAttributes(attributesMap)
    }
  }, [selectedStrategy, selectedCategories, storedKeywords.length])

  const selectedKeywords = keywords.filter(kw => kw.isSelected)
  const availableKeywords = keywords.filter(kw => !kw.isSelected)

  // 搜索功能 - 使用新的搜索函数
  useEffect(() => {
    if (searchTerm.trim()) {
      setIsSearching(true)
      
      // 模拟搜索延迟
      const timer = setTimeout(() => {
        const results = searchKeywords(searchTerm)
        setSearchResults(results)
        setIsSearching(false)
      }, 800)
      
      return () => clearTimeout(timer)
    } else {
      setSearchResults([])
      setIsSearching(false)
    }
  }, [searchTerm])

  const handleKeywordSelect = (keyword: string, attributes?: any, fromSearch = false) => {
    const existingKw = keywords.find(kw => kw.keyword === keyword)
    
    if (existingKw) {
      // 如果关键词已存在，只是选中它
      const updatedKeywords = keywords.map(kw => {
        if (kw.keyword === keyword) {
          return { ...kw, isSelected: true }
        }
        return kw
      })
      setKeywords(updatedKeywords)
      updateKeywords(updatedKeywords)
    } else {
      // 新关键词
      const newKw: KeywordData = {
        keyword,
        heat: attributes?.heat || Math.floor(Math.random() * 40) + 40,
        competition: attributes?.competition || Math.floor(Math.random() * 40) + 30,
        isSelected: true,
        priority: keywords.length + 1,
        type: fromSearch ? 'search' : 'custom'
      }
      const updatedKeywords = [...keywords, newKw]
      setKeywords(updatedKeywords)
      updateKeywords(updatedKeywords)
    }
    
    // 设置属性数据
    if (attributes) {
      setKeywordAttributes(prev => ({
        ...prev,
        [keyword]: {
          audience: attributes.audience || ['家庭用户'],
          season: attributes.season || ['四季通用'],
          size: attributes.size || ['标准规格'],
          material: attributes.material || ['环保塑料'],
          style: attributes.style || ['简约现代'],
          tags: attributes.tags || ['实用', '优质']
        }
      }))
    } else {
      const selectedKw = keywords.find(kw => kw.keyword === keyword) || { keyword }
      setKeywordAttributes(prev => ({
        ...prev,
        [keyword]: getProductAttributes(selectedKw, selectedCategories)
      }))
    }
  }

  const handleKeywordRemove = (keyword: string) => {
    const updatedKeywords = keywords.map(kw => {
      if (kw.keyword === keyword) {
        return { ...kw, isSelected: false }
      }
      return kw
    })
    setKeywords(updatedKeywords)
    updateKeywords(updatedKeywords)
    
    // 移除属性数据
    setKeywordAttributes(prev => {
      const newAttrs = { ...prev }
      delete newAttrs[keyword]
      return newAttrs
    })
  }

  const handleAddKeyword = () => {
    if (newKeyword.trim() && !keywords.some(kw => kw.keyword === newKeyword.trim())) {
      const newKw: KeywordData = {
        keyword: newKeyword.trim(),
        heat: Math.floor(Math.random() * 40) + 40,
        competition: Math.floor(Math.random() * 40) + 30,
        isSelected: true,
        priority: keywords.length + 1,
        type: 'custom'
      }
      const updatedKeywords = [...keywords, newKw]
      setKeywords(updatedKeywords)
      updateKeywords(updatedKeywords)
      
      // 为新关键词生成基础属性（无详细多维度数据）
      setKeywordAttributes(prev => ({
        ...prev,
        [newKeyword.trim()]: {
          audience: ['家庭用户'],
          season: ['四季通用'],
          size: ['标准规格'],
          material: ['环保塑料'],
          style: ['简约现代'],
          tags: ['实用', '性价比']
        }
      }))
      
      setNewKeyword('')
    }
  }

  const handleAttributeChange = (keyword: string, attributeType: string, values: string[]) => {
    setKeywordAttributes(prev => ({
      ...prev,
      [keyword]: {
        ...prev[keyword],
        [attributeType]: values
      }
    }))
  }

  const handleTagsChange = (keyword: string, tags: string[]) => {
    setKeywordAttributes(prev => ({
      ...prev,
      [keyword]: {
        ...prev[keyword],
        tags
      }
    }))
  }

  const handleNext = () => {
    if (canProceedToNextStep()) {
      setCurrentStep(4)
    }
  }

  const handlePrev = () => {
    setCurrentStep(2)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-6">
        {/* 页面标题 */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">关键词智能配置</h1>
          <p className="text-gray-600">
            基于 <span className="font-semibold text-blue-600">{selectedStrategy?.name}</span> 策略，
            精准配置关键词以获得最佳选品效果
          </p>
          <div className="text-sm text-gray-500 mt-2">
            当前类目：{selectedCategories.map(cat => cat.name).join('、')}
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* 左侧：已选关键词 */}
          <div className="col-span-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">已选关键词 ({selectedKeywords.length})</h2>
                {selectedKeywords.length > 0 && (
                  <div className="text-xs text-gray-500">
                    策略推荐: {selectedKeywords.filter(kw => kw.type === 'strategy').length} | 
                    搜索添加: {selectedKeywords.filter(kw => kw.type === 'search').length} |
                    自定义: {selectedKeywords.filter(kw => kw.type === 'custom').length}
                  </div>
                )}
              </div>

              {selectedKeywords.length === 0 ? (
                <div className="text-center py-12">
                  <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">还未选择任何关键词</p>
                  <p className="text-sm text-gray-400 mt-1">从右侧关键词库中搜索选择，或直接添加自定义关键词</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedKeywords.map((kw) => {
                    const attributes = keywordAttributes[kw.keyword] || getProductAttributes(kw, selectedCategories)
                    return (
                      <div
                        key={kw.keyword}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">{kw.keyword}</span>
                            {kw.type === 'strategy' && (
                              <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-medium">策略推荐</span>
                            )}
                            {kw.type === 'search' && (
                              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium">搜索添加</span>
                            )}
                            {kw.type === 'custom' && (
                              <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs font-medium">自定义</span>
                            )}
                          </div>
                          
                          <button
                            onClick={() => handleKeywordRemove(kw.keyword)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        
                        {/* 多维度属性 */}
                        <div className="bg-gray-50 rounded p-3">
                          <div className="flex items-center gap-2 mb-3">
                            <Package className="w-3 h-3 text-gray-600" />
                            <span className="text-xs font-medium text-gray-800">多维度属性</span>
                          </div>
                          
                          <div className="grid grid-cols-5 gap-3 mb-3">
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">目标人群</label>
                              <MultiSelectEditor
                                label="目标人群"
                                values={attributes.audience || []}
                                options={ATTRIBUTE_OPTIONS.audience}
                                onChange={(values) => handleAttributeChange(kw.keyword, 'audience', values)}
                                icon={Users}
                              />
                            </div>
                            
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">季节</label>
                              <MultiSelectEditor
                                label="季节"
                                values={attributes.season || []}
                                options={ATTRIBUTE_OPTIONS.season}
                                onChange={(values) => handleAttributeChange(kw.keyword, 'season', values)}
                                icon={Clock}
                              />
                            </div>
                            
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">尺寸</label>
                              <MultiSelectEditor
                                label="尺寸"
                                values={attributes.size || []}
                                options={ATTRIBUTE_OPTIONS.size}
                                onChange={(values) => handleAttributeChange(kw.keyword, 'size', values)}
                                icon={Target}
                              />
                            </div>
                            
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">材质</label>
                              <MultiSelectEditor
                                label="材质"
                                values={attributes.material || []}
                                options={ATTRIBUTE_OPTIONS.material}
                                onChange={(values) => handleAttributeChange(kw.keyword, 'material', values)}
                                icon={Package}
                              />
                            </div>
                            
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">风格</label>
                              <MultiSelectEditor
                                label="风格"
                                values={attributes.style || []}
                                options={ATTRIBUTE_OPTIONS.style}
                                onChange={(values) => handleAttributeChange(kw.keyword, 'style', values)}
                                icon={Palette}
                              />
                            </div>
                          </div>
                          
                          {/* 可编辑标签 */}
                          <TagEditor
                            tags={attributes.tags || []}
                            onChange={(tags) => handleTagsChange(kw.keyword, tags)}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          {/* 右侧：关键词库 */}
          <div className="col-span-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">关键词库</h2>
              
              {/* 搜索框 */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="搜索关键词..."
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* 搜索结果 */}
              {searchTerm && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Search className="w-3 h-3" />
                    搜索结果
                  </div>
                  
                  {isSearching ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                      <span className="ml-2 text-sm text-gray-500">搜索中...</span>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {searchResults.map((item) => (
                        <div
                          key={item.keyword}
                          onClick={() => handleKeywordSelect(item.keyword, item.attributes, true)}
                          className="border border-gray-200 rounded p-3 cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-all"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-900 text-sm">{item.keyword}</span>
                            <Plus className="w-3 h-3 text-blue-600" />
                          </div>
                          <div className="text-xs text-gray-500 mb-2">
                            热度 {item.heat} • 竞争 {item.competition}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.tags.slice(0, 3).map(tag => (
                              <span key={tag} className="bg-gray-100 text-gray-600 px-1 py-0.5 rounded text-xs">
                                {tag}
                              </span>
                            ))}
                            <span className="bg-blue-100 text-blue-600 px-1 py-0.5 rounded text-xs">
                              {item.strategy}策略
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <AlertCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">暂无相关数据</p>
                      <p className="text-xs text-gray-400 mt-1">等待收录中，您可以直接添加</p>
                    </div>
                  )}
                </div>
              )}

              {/* 直接添加关键词 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">直接添加关键词</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddKeyword()}
                    placeholder="输入关键词..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    onClick={handleAddKeyword}
                    disabled={!newKeyword.trim()}
                    className="px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:bg-gray-300 flex items-center"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  直接添加的关键词将使用基础属性配置
                </p>
              </div>

              {/* AI推荐关键词 */}
              {!searchTerm && (
                <div>
                  <div className="flex items-center gap-2 text-sm text-blue-600 mb-3 p-2 bg-blue-50 rounded">
                    <Lightbulb className="w-3 h-3" />
                    <span>AI策略推荐</span>
                  </div>
                  
                  <div className="space-y-2 max-h-80 overflow-y-auto">
                    {availableKeywords.map((kw) => (
                      <div
                        key={kw.keyword}
                        onClick={() => handleKeywordSelect(kw.keyword)}
                        className="flex items-center justify-between p-2 border border-gray-200 rounded cursor-pointer hover:bg-gray-50 hover:border-blue-300 transition-all group"
                      >
                        <div>
                          <div className="font-medium text-gray-900 text-sm">{kw.keyword}</div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            热度 {kw.heat} • 竞争 {kw.competition}
                          </div>
                        </div>
                        <Plus className="w-3 h-3 text-gray-400 group-hover:text-blue-600" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 底部操作栏 */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button
              onClick={handlePrev}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 flex items-center gap-2 text-sm"
            >
              上一步：选择策略
            </button>
            
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                已配置 <span className="font-semibold text-blue-600">{selectedKeywords.length}</span> 个关键词
              </div>
              
              <button
                onClick={handleNext}
                disabled={!canProceedToNextStep()}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 font-medium text-sm"
              >
                开始AI选品
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 