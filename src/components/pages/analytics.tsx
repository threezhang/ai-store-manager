'use client'

import { useState } from 'react'
import { 
  BarChart3, TrendingUp, TrendingDown, DollarSign, 
  ShoppingCart, Users, Package, Calendar,
  ArrowUp, ArrowDown, Filter, Download, Target, Eye,
  Radar, AlertTriangle, Lightbulb, Zap, Star,
  Activity, Clock, ChevronRight, Award, Brain,
  Cpu, Heart, Headphones, Coffee, Camera, Watch
} from 'lucide-react'

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('7d')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // 模拟用户的选品配置和当前商品
  const userProfile = {
    // 用户选品偏好配置
    preferences: {
      budget: '100-500元',
      targetMarkets: ['年轻人', '上班族'],
      selectedCategories: ['数码配件', '智能家居', '健康美容'],
      riskTolerance: 'medium',
      profitTarget: '30%+',
      timeHorizon: '3-6个月'
    },
    
    // 用户当前选中/在售的商品
    currentProducts: [
      { name: '无线蓝牙耳机', category: '数码配件', price: 129, performance: 'excellent' },
      { name: '智能手表', category: '数码配件', price: 299, performance: 'good' },
      { name: '筋膜枪', category: '健康美容', price: 199, performance: 'average' },
      { name: '空气净化器', category: '智能家居', price: 399, performance: 'good' }
    ],

    // 用户偏好分析
    insights: {
      strongCategories: ['数码配件'],
      preferredPriceRange: '100-400元',
      successfulTraits: ['科技感', '实用性', '性价比'],
      improvementAreas: ['健康美容类目表现一般']
    }
  }

  // 基于用户画像的个性化商机雷达
  const personalizedOpportunities = {
    // 基于用户现有商品的关联商机
    relatedOpportunities: [
      {
        category: '数码配件升级',
        baseProduct: '无线蓝牙耳机',
        opportunity: '降噪耳机',
        reasoning: '您的蓝牙耳机表现优异，可升级至更高端的降噪产品',
        hotScore: 92,
        expectedProfit: '35%',
        investment: '200-400元',
        timeToMarket: '2周',
        riskLevel: 'low',
        marketSignals: ['降噪需求增长40%', '价格接受度提升'],
        recommendation: '基于现有成功经验，风险低收益稳定'
      },
      {
        category: '配套商品',
        baseProduct: '智能手表',
        opportunity: '运动耳机',
        reasoning: '智能手表用户常需配套运动耳机，形成产品组合',
        hotScore: 88,
        expectedProfit: '32%',
        investment: '150-300元',
        timeToMarket: '3周',
        riskLevel: 'low',
        marketSignals: ['运动热潮持续', '组合购买率65%'],
        recommendation: '与现有商品形成完美搭配，提升客单价'
      },
      {
        category: '健康类目优化',
        baseProduct: '筋膜枪',
        opportunity: '按摩椅垫',
        reasoning: '筋膜枪表现一般，可尝试相关但差异化的按摩产品',
        hotScore: 85,
        expectedProfit: '28%',
        investment: '300-600元',
        timeToMarket: '4周',
        riskLevel: 'medium',
        marketSignals: ['居家按摩需求上升', '价格段空缺'],
        recommendation: '改善健康类目表现的机会'
      }
    ],

    // 基于用户偏好的新兴趋势
    trendingForUser: [
      {
        type: 'category_expansion',
        title: '智能穿戴设备热度激增',
        description: '基于您在数码配件的成功，智能戒指、智能眼镜等新品类值得关注',
        relevance: '与您的强势类目高度相关',
        timeframe: '未来1个月',
        confidence: 91,
        action: '考虑布局智能穿戴新品类',
        impact: 'high',
        personalizedInsight: '符合您偏好的科技感+实用性特征'
      },
      {
        type: 'price_opportunity',
        title: '200-400元价位段机会增大',
        description: '您擅长的价格区间在春季消费中表现突出，建议加大投入',
        relevance: '完全符合您的成功价格区间',
        timeframe: '当前时机',
        confidence: 94,
        action: '在熟悉价位段寻找新品',
        impact: 'high',
        personalizedInsight: '基于您成功商品的价格分析'
      },
      {
        type: 'target_market',
        title: '上班族居家办公需求上升',
        description: '您的目标用户群体对办公设备需求增强，是拓展机会',
        relevance: '精准匹配您的目标用户',
        timeframe: '持续性趋势',
        confidence: 87,
        action: '考虑办公设备类目',
        impact: 'medium',
        personalizedInsight: '利用现有用户群体的新需求'
      }
    ],

    // 基于用户商品的竞品分析
    competitorAnalysisForUser: [
      {
        category: '数码配件（您的强势领域）',
        yourPosition: 'leading',
        competitorActivity: 'increasing',
        threats: [
          '3个新竞品进入蓝牙耳机市场',
          '价格战风险增加15%'
        ],
        opportunities: [
          '高端化趋势明显，可升级产品线',
          '配件市场细分化，可发展利基产品'
        ],
        recommendation: '保持优势，向高端和细分市场发展',
        urgency: 'medium'
      },
      {
        category: '健康美容（您的薄弱环节）',
        yourPosition: 'developing',
        competitorActivity: 'stable',
        insights: [
          '您的筋膜枪在中等价位竞争激烈',
          '但高端按摩设备竞争较少'
        ],
        opportunities: [
          '向高端按摩设备升级',
          '或转向美容仪器等细分市场'
        ],
        recommendation: '优化产品选择或考虑退出重新定位',
        urgency: 'high'
      }
    ],

    // 个性化风险预警
    personalizedRisks: [
      {
        type: 'portfolio_concentration',
        title: '数码配件依赖度过高',
        description: '您70%的商品集中在数码配件，存在类目风险',
        severity: 'medium',
        suggestion: '建议在智能家居或其他类目增加比重',
        basedOn: '您的商品组合分析',
        actionPriority: 'medium'
      },
      {
        type: 'price_competition',
        title: '蓝牙耳机价格战预警',
        description: '您的明星产品面临激烈价格竞争',
        severity: 'high',
        suggestion: '考虑向降噪耳机等高端产品升级',
        basedOn: '您的蓝牙耳机表现分析',
        actionPriority: 'high'
      },
      {
        type: 'performance_warning',
        title: '筋膜枪表现低于预期',
        description: '该产品可能不符合您的商业模式',
        severity: 'medium',
        suggestion: '考虑替换为按摩椅垫或其他健康类产品',
        basedOn: '您的产品表现数据',
        actionPriority: 'medium'
      }
    ],

    // 基于成功经验的AI推荐
    aiRecommendationsForUser: [
      {
        direction: '数码配件扩展',
        score: 96,
        reasoning: '基于您在数码配件的成功经验和用户群体特征',
        suggestedProducts: ['无线充电器', '蓝牙音箱', '智能插座'],
        successProbability: '85%',
        expectedROI: '35%+',
        basedOn: '您的蓝牙耳机和智能手表成功经验',
        personalizedInsight: '完全符合您的成功模式：科技感+实用性+合理价位'
      },
      {
        direction: '智能家居深化',
        score: 89,
        reasoning: '您的空气净化器表现良好，可在此类目深化',
        suggestedProducts: ['智能加湿器', '智能风扇', '空气检测仪'],
        successProbability: '78%',
        expectedROI: '30%+',
        basedOn: '您的空气净化器成功经验',
        personalizedInsight: '利用现有类目优势，形成产品矩阵'
      },
      {
        direction: '健康类目重新定位',
        score: 73,
        reasoning: '基于筋膜枪的学习，重新选择更适合的健康产品',
        suggestedProducts: ['血氧仪', '电动牙刷', '按摩仪'],
        successProbability: '65%',
        expectedROI: '25%+',
        basedOn: '您的健康类目改进需求',
        personalizedInsight: '吸取经验教训，选择更符合您特长的健康产品'
      }
    ]
  }

  const getHotScoreColor = (score: number) => {
    if (score >= 90) return 'text-red-600 bg-red-100'
    if (score >= 80) return 'text-orange-600 bg-orange-100'
    if (score >= 70) return 'text-yellow-600 bg-yellow-100'
    return 'text-gray-600 bg-gray-100'
  }

  const getRiskLevelColor = (level: string) => {
    const config = {
      low: 'text-green-600',
      medium: 'text-yellow-600', 
      high: 'text-red-600',
      critical: 'text-red-700 font-bold'
    }
    return config[level] || config.medium
  }

  const getPriorityColor = (priority: string) => {
    const config = {
      low: 'bg-gray-100 text-gray-700',
      medium: 'bg-yellow-100 text-yellow-700',
      high: 'bg-red-100 text-red-700'
    }
    return config[priority] || config.medium
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'category_expansion': return <TrendingUp className="w-4 h-4 text-green-600" />
      case 'price_opportunity': return <DollarSign className="w-4 h-4 text-blue-600" />
      case 'target_market': return <Users className="w-4 h-4 text-purple-600" />
      default: return <Activity className="w-4 h-4 text-gray-600" />
    }
  }

  const getProductIcon = (category: string) => {
    switch (category) {
      case '数码配件': return <Headphones className="w-4 h-4" />
      case '智能家居': return <Cpu className="w-4 h-4" />
      case '健康美容': return <Heart className="w-4 h-4" />
      default: return <Package className="w-4 h-4" />
    }
  }

  return (
    <div className="page-layout page-enter">
      {/* 页面标题 */}
      <div className="page-header">
        <h1 className="page-title">个人商机雷达</h1>
        <p className="page-description">基于您的选品偏好和商品组合，AI为您定制专属商机洞察</p>
        
        {/* 个性化价值亮点 */}
        <div className="flex items-center gap-6 mt-4">
          <div className="flex items-center gap-2 bg-purple-50 px-3 py-1 rounded-full">
            <Target className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">基于您的{userProfile.currentProducts.length}个商品分析</span>
          </div>
          <div className="flex items-center gap-2 bg-cyan-50 px-3 py-1 rounded-full">
            <Brain className="w-4 h-4 text-cyan-600" />
            <span className="text-sm font-medium text-cyan-700">匹配您的{userProfile.preferences.selectedCategories.join('+')}偏好</span>
          </div>
          <div className="flex items-center gap-2 bg-indigo-50 px-3 py-1 rounded-full">
            <Radar className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-700">个性化成功率 85%+</span>
          </div>
        </div>
      </div>

      <div className="page-content">
        {/* 用户画像概览 */}
        <div className="content-section">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">您的选品画像</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="text-sm font-medium text-blue-700 mb-1">强势类目</div>
                <div className="text-lg font-bold text-blue-900">{userProfile.insights.strongCategories[0]}</div>
                <div className="text-xs text-blue-600">成功率最高</div>
              </div>
              
              <div className="bg-green-50 rounded-lg p-3">
                <div className="text-sm font-medium text-green-700 mb-1">最佳价位</div>
                <div className="text-lg font-bold text-green-900">{userProfile.insights.preferredPriceRange}</div>
                <div className="text-xs text-green-600">利润最稳定</div>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-3">
                <div className="text-sm font-medium text-purple-700 mb-1">成功特征</div>
                <div className="text-sm font-bold text-purple-900">科技感+实用</div>
                <div className="text-xs text-purple-600">用户偏好明确</div>
              </div>
              
              <div className="bg-orange-50 rounded-lg p-3">
                <div className="text-sm font-medium text-orange-700 mb-1">改进方向</div>
                <div className="text-sm font-bold text-orange-900">健康美容</div>
                <div className="text-xs text-orange-600">有提升空间</div>
              </div>
            </div>
          </div>
        </div>

        {/* 基于现有商品的关联商机 */}
        <div className="content-section">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-orange-600" />
            <h2 className="text-lg font-semibold text-gray-900">基于您商品的关联商机</h2>
            <span className="text-sm text-gray-500">AI分析您的成功经验，发现相关机会</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {personalizedOpportunities.relatedOpportunities.map((opportunity, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {getProductIcon(opportunity.category)}
                      <h3 className="font-semibold text-gray-900 text-sm">{opportunity.opportunity}</h3>
                    </div>
                    <div className="text-xs text-blue-600 mb-2">
                      基于您的 <span className="font-medium">{opportunity.baseProduct}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 text-xs font-bold rounded-full ${getHotScoreColor(opportunity.hotScore)}`}>
                        🔥 {opportunity.hotScore}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskLevelColor(opportunity.riskLevel) === 'text-green-600' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {opportunity.riskLevel === 'low' ? '低风险' : '中风险'}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">预期利润</div>
                    <div className="text-sm font-bold text-green-600">{opportunity.expectedProfit}</div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{opportunity.reasoning}</p>
                
                <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                  <div>
                    <span className="text-gray-500">投资范围: </span>
                    <span className="font-medium">{opportunity.investment}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">上市时间: </span>
                    <span className="font-medium">{opportunity.timeToMarket}</span>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="text-xs font-medium text-gray-700 mb-1">市场信号</div>
                  <div className="flex flex-wrap gap-1">
                    {opportunity.marketSignals.map((signal, i) => (
                      <span key={i} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                        {signal}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-2">
                  <div className="text-xs font-medium text-green-700 mb-1">个性化建议</div>
                  <div className="text-xs text-gray-600">{opportunity.recommendation}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 个性化趋势预警与AI推荐 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 为您定制的趋势 */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <h3 className="text-lg font-semibold text-gray-900">为您定制的趋势预警</h3>
            </div>
            
            <div className="space-y-3">
              {personalizedOpportunities.trendingForUser.map((trend, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {getAlertIcon(trend.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-gray-900 text-sm">{trend.title}</h4>
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                          置信度 {trend.confidence}%
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{trend.description}</p>
                      
                      <div className="bg-blue-50 border border-blue-200 rounded p-2 mb-2">
                        <div className="text-xs font-medium text-blue-700">个性化洞察</div>
                        <div className="text-xs text-blue-600">{trend.personalizedInsight}</div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{trend.timeframe}</span>
                        <button className="text-xs text-blue-600 font-medium hover:underline flex items-center gap-1">
                          {trend.action} <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 基于成功经验的AI推荐 */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">基于您成功经验的AI推荐</h3>
            </div>
            
            <div className="space-y-3">
              {personalizedOpportunities.aiRecommendationsForUser.map((rec, index) => (
                <div key={index} className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900 text-sm">{rec.direction}</h4>
                    <div className="text-right">
                      <div className="text-lg font-bold text-purple-600">{rec.score}</div>
                      <div className="text-xs text-gray-500">匹配度</div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{rec.reasoning}</p>
                  
                  <div className="grid grid-cols-2 gap-2 mb-2 text-xs">
                    <div>
                      <span className="text-gray-500">成功概率: </span>
                      <span className="font-medium text-green-600">{rec.successProbability}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">预期回报: </span>
                      <span className="font-medium text-green-600">{rec.expectedROI}</span>
                    </div>
                  </div>

                  <div className="bg-white rounded border border-purple-200 p-2 mb-2">
                    <div className="text-xs font-medium text-purple-700 mb-1">基于经验: {rec.basedOn}</div>
                    <div className="text-xs text-gray-600">{rec.personalizedInsight}</div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {rec.suggestedProducts.map((product, i) => (
                      <span key={i} className="bg-white text-purple-700 text-xs px-2 py-1 rounded border border-purple-200">
                        {product}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 个性化竞品分析与风险预警 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 您的竞品态势 */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">您的竞品态势分析</h3>
            </div>
            
            <div className="space-y-4">
              {personalizedOpportunities.competitorAnalysisForUser.map((analysis, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900 text-sm">{analysis.category}</h4>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        analysis.yourPosition === 'leading' ? 'bg-green-100 text-green-700' : 
                        analysis.yourPosition === 'developing' ? 'bg-yellow-100 text-yellow-700' : 
                        'bg-red-100 text-red-700'
                      }`}>
                        您的位置: {analysis.yourPosition === 'leading' ? '领先' : '发展中'}
                      </span>
                    </div>
                  </div>
                  
                  {analysis.threats && (
                    <div className="mb-3">
                      <div className="text-xs font-medium text-red-700 mb-1">⚠️ 威胁</div>
                      <div className="space-y-1">
                        {analysis.threats.map((threat, i) => (
                          <div key={i} className="text-xs text-gray-600 bg-red-50 p-1 rounded">{threat}</div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="mb-3">
                    <div className="text-xs font-medium text-green-700 mb-1">💡 机会</div>
                    <div className="space-y-1">
                      {analysis.opportunities.map((opp, i) => (
                        <div key={i} className="text-xs text-gray-600 bg-green-50 p-1 rounded">{opp}</div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">{analysis.recommendation}</span>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getPriorityColor(analysis.urgency)}`}>
                      {analysis.urgency === 'high' ? '高优先级' : '中优先级'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 个性化风险预警 */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <h3 className="text-lg font-semibold text-gray-900">您的专属风险预警</h3>
            </div>
            
            <div className="space-y-3">
              {personalizedOpportunities.personalizedRisks.map((risk, index) => (
                <div key={index} className={`border rounded-lg p-3 ${
                  risk.severity === 'high' ? 'border-red-300 bg-red-50' :
                  'border-yellow-300 bg-yellow-50'
                }`}>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className={`w-4 h-4 mt-0.5 ${getRiskLevelColor(risk.severity)}`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-gray-900 text-sm">{risk.title}</h4>
                        <span className={`text-xs font-bold ${getRiskLevelColor(risk.severity)}`}>
                          {risk.severity === 'high' ? '高风险' : '中风险'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{risk.description}</p>
                      
                      <div className="bg-blue-50 border border-blue-200 rounded p-2 mb-2">
                        <div className="text-xs font-medium text-blue-700">基于数据: {risk.basedOn}</div>
                      </div>
                      
                      <div className="bg-white rounded border p-2">
                        <div className="text-xs font-medium text-gray-700 mb-1">建议措施</div>
                        <div className="text-xs text-gray-600">{risk.suggestion}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 个性化雷达总结 */}
        <div className="content-section">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Radar className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">您的专属商机总结</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{personalizedOpportunities.relatedOpportunities.length}</div>
                <div className="text-xs text-gray-600">关联商机</div>
                <div className="text-xs text-orange-600">基于现有商品</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{personalizedOpportunities.trendingForUser.length}</div>
                <div className="text-xs text-gray-600">定制趋势</div>
                <div className="text-xs text-yellow-600">匹配您的偏好</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{personalizedOpportunities.aiRecommendationsForUser.length}</div>
                <div className="text-xs text-gray-600">AI推荐</div>
                <div className="text-xs text-purple-600">基于成功经验</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{personalizedOpportunities.personalizedRisks.length}</div>
                <div className="text-xs text-gray-600">专属风险</div>
                <div className="text-xs text-red-600">针对您的组合</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 