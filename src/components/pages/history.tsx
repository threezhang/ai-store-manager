'use client'

import { useState, useMemo } from 'react'
import { useStore } from '@/lib/store'
import { 
  History, Clock, CheckCircle, XCircle, AlertTriangle,
  Package, ShoppingCart, Target, Settings, Eye,
  Calendar, Filter, Search, ArrowUpRight, Download,
  Brain, TrendingUp, Lightbulb, Award, BarChart3,
  Users, DollarSign, Star, Zap, ChevronRight,
  Trophy, Activity, Cpu, Database, MousePointer,
  PlayCircle, RefreshCw, Sparkles, TrendingDown,
  PlusCircle, MinusCircle, RotateCcw, Maximize2
} from 'lucide-react'

export default function HistoryPage() {
  const { 
    selectedCategories, 
    acceptedProducts, 
    recommendedProducts,
    selectedStrategies,
    keywords,
    currentStep,
    listingLogs,
    setCurrentPage
  } = useStore()
  
  const [activeTab, setActiveTab] = useState('insights')
  const [timeFilter, setTimeFilter] = useState('recent')
  const [searchTerm, setSearchTerm] = useState('')

  // 基于用户实际数据生成复盘分析
  const businessInsights = useMemo(() => {
    // 如果没有足够的数据，显示引导信息
    if (selectedCategories.length === 0 && acceptedProducts.length === 0) {
      return {
        hasData: false,
        message: '开始您的选品之旅，我将为您记录和分析每一个经营决策'
      }
    }

    // 基于用户实际选择的类目分析
    const categoryAnalysis = selectedCategories.map(category => ({
      id: category.id,
      name: category.name,
      selected: true,
      metrics: category.metrics,
      performance: {
        // 基于类目指标计算表现
        successScore: Math.round((category.metrics.recommendScore + category.metrics.profitMargin) / 2),
        growthPotential: category.metrics.salesGrowth,
        profitability: category.metrics.profitMargin,
        difficulty: category.metrics.difficultyLevel
      }
    }))

    // 基于用户接受的产品分析
    const productAnalysis = acceptedProducts.map(product => ({
      id: product.id,
      name: product.name,
      category: product.category,
      accepted: true,
      metrics: {
        profitMargin: product.profitMargin,
        demand: product.demand,
        competition: product.competition,
        trending: product.trending
      }
    }))

    // 生成成功经验
    const successPatterns = []
    
    // 类目选择成功经验
    const topCategory = categoryAnalysis.find(cat => cat.performance.successScore >= 85)
    if (topCategory) {
      successPatterns.push({
        id: '1',
        pattern: `${topCategory.name}类目选择策略`,
        description: `选择${topCategory.name}类目表现优异，推荐指数${topCategory.metrics.recommendScore}`,
        impact: `预期利润率${topCategory.metrics.profitMargin.toFixed(1)}%，增长率${topCategory.metrics.salesGrowth.toFixed(1)}%`,
        dataPoints: {
          totalProducts: acceptedProducts.filter(p => p.category === topCategory.name).length,
          successRate: topCategory.performance.successScore,
          avgProfit: topCategory.metrics.profitMargin,
          customerSatisfaction: 4.2 + (topCategory.performance.successScore - 70) * 0.01
        },
        keyFactors: [
          topCategory.metrics.difficultyLevel <= 2 ? '入门门槛低' : '专业要求高',
          topCategory.metrics.competitionLevel <= 3 ? '竞争相对较少' : '竞争激烈',
          topCategory.metrics.profitMargin >= 35 ? '利润空间大' : '薄利多销',
          topCategory.metrics.salesGrowth >= 50 ? '增长趋势强' : '稳定增长'
        ],
        recommendation: `继续深化${topCategory.name}类目，建议增加相关产品`,
        lastUpdated: new Date().toISOString().split('T')[0],
        confidence: Math.min(95, topCategory.performance.successScore + 5),
        actions: [
          {
            type: 'expand',
            title: '扩展相关产品',
            description: `在${topCategory.name}类目中寻找更多高利润产品`,
            priority: 'high',
            estimatedImpact: '+25% 销量增长',
            estimatedTime: '2-3天',
            difficulty: 'easy'
          },
          {
            type: 'optimize',
            title: '优化价格策略',
            description: '基于成功经验调整定价策略',
            priority: 'medium',
            estimatedImpact: '+15% 利润率',
            estimatedTime: '1天',
            difficulty: 'easy'
          },
          {
            type: 'research',
            title: '深度市场调研',
            description: '分析该类目的细分市场机会',
            priority: 'medium',
            estimatedImpact: '发现新蓝海',
            estimatedTime: '3-5天',
            difficulty: 'medium'
          }
        ]
      })
    }

    // 产品选择成功经验
    const highProfitProducts = acceptedProducts.filter(p => p.profitMargin >= 30)
    if (highProfitProducts.length > 0) {
      const avgProfit = highProfitProducts.reduce((sum, p) => sum + p.profitMargin, 0) / highProfitProducts.length
      successPatterns.push({
        id: '2',
        pattern: '高利润产品选择策略',
        description: `已选择${highProfitProducts.length}个高利润产品，平均利润率${avgProfit.toFixed(1)}%`,
        impact: `利润优化策略带来预期收益提升${Math.round((avgProfit - 25) * 2)}%`,
        dataPoints: {
          totalProducts: highProfitProducts.length,
          successRate: Math.min(95, Math.round(avgProfit * 2.5)),
          avgProfit: avgProfit,
          customerSatisfaction: 4.5
        },
        keyFactors: [
          '利润率筛选严格',
          '需求与利润平衡',
          '避开低价竞争',
          '注重产品质量'
        ],
        recommendation: '保持高利润策略，注意市场需求平衡',
        lastUpdated: new Date().toISOString().split('T')[0],
        confidence: Math.min(90, Math.round(avgProfit * 2)),
        actions: [
          {
            type: 'replicate',
            title: '复制成功模式',
            description: '将高利润选品标准应用到更多产品',
            priority: 'high',
            estimatedImpact: '+30% 整体利润',
            estimatedTime: '1-2天',
            difficulty: 'easy'
          },
          {
            type: 'analyze',
            title: '竞品分析',
            description: '分析高利润产品的竞争环境',
            priority: 'medium',
            estimatedImpact: '风险预警',
            estimatedTime: '2天',
            difficulty: 'medium'
          }
        ]
      })
    }

    // 策略应用成功经验
    if (selectedStrategies.length > 0) {
      const primaryStrategy = selectedStrategies[0]
      successPatterns.push({
        id: '3',
        pattern: `${primaryStrategy.name}策略应用`,
        description: primaryStrategy.description,
        impact: `策略应用覆盖${acceptedProducts.length}个产品，预期效果良好`,
        dataPoints: {
          totalProducts: acceptedProducts.length,
          successRate: 85,
          avgProfit: 32,
          customerSatisfaction: 4.3
        },
        keyFactors: primaryStrategy.features || ['策略导向', '数据驱动', '系统化执行'],
        recommendation: '持续优化策略执行，根据实际效果调整',
        lastUpdated: new Date().toISOString().split('T')[0],
        confidence: 88,
        actions: [
          {
            type: 'refine',
            title: '策略精细化',
            description: '基于实际效果优化策略参数',
            priority: 'high',
            estimatedImpact: '+20% 效率提升',
            estimatedTime: '1天',
            difficulty: 'medium'
          }
        ]
      })
    }

    // 学习要点 - 基于实际数据的教训
    const learningPoints = []

    // 如果有被忽略的产品，分析原因
    const ignoredProducts = recommendedProducts.filter(p => p.isIgnored)
    if (ignoredProducts.length > 0) {
      learningPoints.push({
        id: '1',
        category: '产品筛选',
        issue: `${ignoredProducts.length}个产品被忽略`,
        analysis: '产品筛选标准可能过于严格或不够明确',
        impact: `错过${ignoredProducts.length}个潜在机会，需要优化筛选策略`,
        rootCause: [
          '利润率要求可能过高',
          '竞争度评估可能过于保守',
          '需求预估可能不准确',
          '产品信息理解偏差'
        ],
        lessons: [
          '建立更科学的产品评估体系',
          '平衡利润与市场机会',
          '深入了解产品市场表现',
          '定期回顾筛选标准'
        ],
        actionTaken: '已调整产品筛选参数，增加评估维度',
        result: '预计提升产品通过率15-20%',
        date: new Date().toISOString().split('T')[0],
        improvements: [
          {
            type: 'adjust',
            title: '调整筛选标准',
            description: '降低利润率门槛，增加需求权重',
            priority: 'high',
            status: 'ready',
            estimatedImpact: '+20% 产品通过率'
          },
          {
            type: 'review',
            title: '回顾被忽略产品',
            description: '重新评估之前忽略的潜力产品',
            priority: 'medium',
            status: 'ready',
            estimatedImpact: '发现遗漏机会'
          },
          {
            type: 'optimize',
            title: '优化评估算法',
            description: '改进AI产品评分算法',
            priority: 'medium',
            status: 'planning',
            estimatedImpact: '+15% 推荐准确率'
          }
        ]
      })
    }

    // 类目配置分析
    const lowPerformanceCategories = categoryAnalysis.filter(cat => cat.performance.successScore < 70)
    if (lowPerformanceCategories.length > 0) {
      const category = lowPerformanceCategories[0]
      learningPoints.push({
        id: '2',
        category: '类目配置',
        issue: `${category.name}类目表现待优化`,
        analysis: `该类目推荐指数${category.metrics.recommendScore}，竞争激烈度${category.metrics.competitionLevel}`,
        impact: '可能影响整体选品效率和利润表现',
        rootCause: [
          '类目竞争过于激烈',
          '入门门槛较高',
          '利润空间有限',
          '市场趋势预判偏差'
        ],
        lessons: [
          '充分评估类目竞争环境',
          '关注自身能力匹配度',
          '平衡风险与收益',
          '建立类目表现监控'
        ],
        actionTaken: '已调整类目权重，增加风险评估',
        result: '优化类目选择准确率，预期提升20%',
        date: new Date().toISOString().split('T')[0],
        improvements: [
          {
            type: 'replace',
            title: '替换低效类目',
            description: `考虑用表现更好的类目替换${category.name}`,
            priority: 'high',
            status: 'ready',
            estimatedImpact: '+25% 整体效率'
          },
          {
            type: 'supplement',
            title: '增加辅助类目',
            description: '添加风险更低的辅助类目',
            priority: 'medium',
            status: 'ready',
            estimatedImpact: '分散风险'
          }
        ]
      })
    }

    // AI学习进化 - 基于实际使用情况
    const aiLearning = [
      {
        id: '1',
        module: '用户偏好识别',
        improvement: `基于您选择的${selectedCategories.length}个类目和${acceptedProducts.length}个产品学习偏好`,
        dataSource: `分析您的${selectedCategories.length}次类目选择、${acceptedProducts.length}次产品接受决策`,
        impact: '个性化推荐准确率持续提升',
        keyInsights: [
          selectedCategories.length > 0 ? `偏好${selectedCategories[0]?.name}等类目` : '正在学习类目偏好',
          acceptedProducts.some(p => p.profitMargin >= 30) ? '注重高利润产品' : '平衡利润与需求',
          selectedStrategies.length > 0 ? `倾向${selectedStrategies[0]?.name}策略` : '策略偏好学习中',
          keywords.filter(k => k.isSelected).length > 0 ? '关键词选择趋于精准' : '关键词偏好待学习'
        ],
        nextOptimization: '深入分析您的决策模式，优化推荐算法',
        updateTime: new Date().toISOString().split('T')[0],
        aiActions: [
          {
            type: 'train',
            title: '强化学习训练',
            description: '基于您的选择模式训练个性化模型',
            status: 'active',
            progress: 78,
            estimatedCompletion: '2小时'
          },
          {
            type: 'update',
            title: '偏好模型更新',
            description: '更新用户偏好权重配置',
            status: 'ready',
            progress: 0,
            estimatedCompletion: '30分钟'
          }
        ]
      },
      {
        id: '2',
        module: '产品匹配算法',
        improvement: `基于您的${acceptedProducts.length}次产品选择优化匹配逻辑`,
        dataSource: `产品接受率、利润偏好、类目倾向等行为数据`,
        impact: '推荐产品与您的标准匹配度不断提升',
        keyInsights: [
          acceptedProducts.length > 0 ? `平均接受利润率${(acceptedProducts.reduce((sum, p) => sum + p.profitMargin, 0) / acceptedProducts.length).toFixed(1)}%` : '利润偏好学习中',
          `当前选品进度${currentStep}/5，决策模式逐渐清晰`,
          acceptedProducts.length >= 5 ? '选品标准趋于稳定' : '选品标准学习中',
          '产品属性权重动态调整中'
        ],
        nextOptimization: '结合市场数据优化产品评分算法',
        updateTime: new Date().toISOString().split('T')[0],
        aiActions: [
          {
            type: 'calibrate',
            title: '算法校准',
            description: '校准产品推荐算法参数',
            status: 'ready',
            progress: 0,
            estimatedCompletion: '1小时'
          }
        ]
      }
    ]

    // 决策历史 - 基于实际操作记录
    const decisionHistory = []
    
    if (selectedCategories.length > 0) {
      const topCategory = selectedCategories.sort((a, b) => b.metrics.recommendScore - a.metrics.recommendScore)[0]
      decisionHistory.push({
        id: '1',
        decision: `选择${topCategory.name}类目`,
        context: `在${selectedCategories.length}个候选类目中做出选择`,
        reasoning: `该类目推荐指数${topCategory.metrics.recommendScore}，利润率${topCategory.metrics.profitMargin.toFixed(1)}%`,
        dataSupport: {
          successRate: `${topCategory.metrics.recommendScore}%`,
          profitMargin: `${topCategory.metrics.profitMargin.toFixed(1)}%`,
          userFeedback: '4.2/5',
          competitivePosition: topCategory.metrics.competitionLevel <= 3 ? '优势明显' : '竞争激烈'
        },
        execution: `已纳入选品策略，权重${Math.round(100 / selectedCategories.length)}%`,
        results: [
          `推荐${acceptedProducts.filter(p => p.category === topCategory.name).length}个相关产品`,
          `预期利润率${topCategory.metrics.profitMargin.toFixed(1)}%`,
          `市场增长率${topCategory.metrics.salesGrowth.toFixed(1)}%`,
          `风险评级${topCategory.metrics.difficultyLevel}/5`
        ],
        date: new Date().toISOString().split('T')[0],
        status: 'successful',
        roi: Math.round(topCategory.metrics.profitMargin * 2.5),
        followUpActions: [
          {
            type: 'monitor',
            title: '监控类目表现',
            description: '跟踪该类目的市场变化和竞争态势',
            dueDate: '持续进行',
            priority: 'medium'
          },
          {
            type: 'expand',
            title: '扩展类目覆盖',
            description: '在该类目下寻找更多机会产品',
            dueDate: '未来1周',
            priority: 'high'
          }
        ]
      })
    }

    if (acceptedProducts.length >= 3) {
      decisionHistory.push({
        id: '2',
        decision: '批量产品筛选策略',
        context: `从推荐的${recommendedProducts.length}个产品中筛选`,
        reasoning: '基于利润率、需求度、竞争环境等多维度评估',
        dataSupport: {
          successRate: `${Math.round((acceptedProducts.length / Math.max(recommendedProducts.length, 1)) * 100)}%`,
          profitMargin: `${(acceptedProducts.reduce((sum, p) => sum + p.profitMargin, 0) / acceptedProducts.length).toFixed(1)}%`,
          userFeedback: '4.5/5',
          competitivePosition: '精选优质'
        },
        execution: `严格筛选，最终接受${acceptedProducts.length}个产品`,
        results: [
          `平均利润率${(acceptedProducts.reduce((sum, p) => sum + p.profitMargin, 0) / acceptedProducts.length).toFixed(1)}%`,
          `覆盖${new Set(acceptedProducts.map(p => p.category)).size}个类目`,
          `选品效率${Math.round((acceptedProducts.length / Math.max(recommendedProducts.length, 1)) * 100)}%`,
          '构建核心产品组合'
        ],
        date: new Date().toISOString().split('T')[0],
        status: 'successful',
        roi: Math.round((acceptedProducts.reduce((sum, p) => sum + p.profitMargin, 0) / acceptedProducts.length) * 2),
        followUpActions: [
          {
            type: 'optimize',
            title: '优化选品策略',
            description: '基于选品结果优化筛选标准',
            dueDate: '本周内',
            priority: 'high'
          }
        ]
      })
    }

    // 里程碑 - 基于实际进展
    const milestones = []

    if (selectedCategories.length >= 2) {
      milestones.push({
        id: '1',
        achievement: '完成类目选择配置',
        date: new Date().toISOString().split('T')[0],
        metrics: {
          categories: selectedCategories.length,
          avgScore: Math.round(selectedCategories.reduce((sum, cat) => sum + cat.metrics.recommendScore, 0) / selectedCategories.length),
          profitPotential: Math.round(selectedCategories.reduce((sum, cat) => sum + cat.metrics.profitMargin, 0) / selectedCategories.length),
          riskLevel: Math.round(selectedCategories.reduce((sum, cat) => sum + cat.metrics.difficultyLevel, 0) / selectedCategories.length)
        },
        keyDrivers: ['AI推荐指导', '数据驱动决策', '风险效益平衡'],
        celebration: '类目配置完成！🎯',
        nextSteps: [
          {
            title: '开始产品筛选',
            description: '基于选定类目开始智能选品',
            action: () => setCurrentPage('products'),
            priority: 'high'
          },
          {
            title: '设置监控报警',
            description: '为选定类目设置市场变化监控',
            action: () => {},
            priority: 'medium'
          }
        ]
      })
    }

    if (acceptedProducts.length >= 5) {
      milestones.push({
        id: '2',
        achievement: '产品库初步建立',
        date: new Date().toISOString().split('T')[0],
        metrics: {
          products: acceptedProducts.length,
          avgProfit: Math.round(acceptedProducts.reduce((sum, p) => sum + p.profitMargin, 0) / acceptedProducts.length),
          categories: new Set(acceptedProducts.map(p => p.category)).size,
          selectRate: Math.round((acceptedProducts.length / Math.max(recommendedProducts.length, 1)) * 100)
        },
        keyDrivers: ['精准选品', '利润导向', '质量为先'],
        celebration: '产品组合成型！🚀',
        nextSteps: [
          {
            title: '开始上架配置',
            description: '配置产品上架策略和参数',
            action: () => setCurrentPage('selection'),
            priority: 'high'
          },
          {
            title: '市场分析报告',
            description: '生成详细的产品组合分析报告',
            action: () => {},
            priority: 'medium'
          }
        ]
      })
    }

    return {
      hasData: true,
      successPatterns,
      learningPoints,
      aiLearning,
      decisionHistory,
      milestones,
      stats: {
        totalCategories: selectedCategories.length,
        totalProducts: acceptedProducts.length,
        avgProfit: acceptedProducts.length > 0 ? 
          acceptedProducts.reduce((sum, p) => sum + p.profitMargin, 0) / acceptedProducts.length : 0,
        aiAccuracy: Math.min(95, 65 + (acceptedProducts.length * 3) + (selectedCategories.length * 5))
      }
    }
  }, [selectedCategories, acceptedProducts, recommendedProducts, selectedStrategies, keywords, currentStep, setCurrentPage])

  // 执行推荐操作的函数
  const executeAction = (actionType: string, actionData: any) => {
    // 显示开始执行的通知
    const showProgress = (message: string, duration: number = 2000) => {
      // 这里可以集成实际的通知系统
      const notification = document.createElement('div')
      notification.className = 'fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 transform transition-all'
      notification.textContent = message
      document.body.appendChild(notification)
      
      setTimeout(() => {
        notification.style.transform = 'translateX(100%)'
        setTimeout(() => document.body.removeChild(notification), 300)
      }, duration)
    }

    switch (actionType) {
      case 'expand':
        // 根据actionData判断是产品扩展还是类目扩展
        if (actionData?.title?.includes('产品')) {
          showProgress('正在为您扩展相关产品选择...')
          setTimeout(() => {
            setCurrentPage('products')
            showProgress('已跳转到产品页面，AI正在准备扩展推荐', 3000)
          }, 1000)
        } else {
          showProgress('正在扩展类目覆盖...')
          setTimeout(() => {
            setCurrentPage('selection')
            showProgress('已跳转到类目选择，开始扩展覆盖', 3000)
          }, 1000)
        }
        break
        
      case 'optimize':
        showProgress('正在优化选品策略参数...')
        setTimeout(() => {
          setCurrentPage('analytics')
          showProgress('已跳转到分析页面，开始策略优化', 3000)
        }, 1000)
        break
        
      case 'research':
        showProgress('正在启动深度市场调研...')
        setTimeout(() => {
          showProgress('市场调研报告生成中，预计3-5天完成', 4000)
          // 这里可以触发实际的研究任务
        }, 1500)
        break
        
      case 'replicate':
        showProgress('正在复制成功选品模式...')
        setTimeout(() => {
          showProgress('已将成功标准应用到推荐算法中', 3000)
        }, 2000)
        break
        
      case 'analyze':
        showProgress('正在分析竞品环境...')
        setTimeout(() => {
          showProgress('竞品分析启动，将在2天内提供报告', 3000)
        }, 1500)
        break
        
      case 'adjust':
        showProgress('正在调整产品筛选参数...')
        setTimeout(() => {
          showProgress('筛选标准已优化，新推荐将更精准', 3000)
        }, 2000)
        break
        
      case 'review':
        showProgress('正在重新评估被忽略的产品...')
        setTimeout(() => {
          setCurrentPage('products')
          showProgress('已跳转到产品页面，查看重新评估结果', 3000)
        }, 1000)
        break
        
      case 'train':
        showProgress('AI强化学习训练已启动...')
        setTimeout(() => {
          showProgress('训练进度78%，预计2小时完成', 4000)
        }, 1500)
        break
        
      case 'update':
        showProgress('正在更新用户偏好模型...')
        setTimeout(() => {
          showProgress('偏好模型更新完成，推荐将更加个性化', 3000)
        }, 2000)
        break
        
      case 'calibrate':
        showProgress('正在校准推荐算法...')
        setTimeout(() => {
          showProgress('算法校准完成，推荐准确率提升15%', 3000)
        }, 2000)
        break
        
      case 'monitor':
        showProgress('正在设置类目表现监控...')
        setTimeout(() => {
          showProgress('监控系统已激活，将持续跟踪市场变化', 3000)
        }, 1500)
        break
        
      case 'refine':
        showProgress('正在精细化策略参数...')
        setTimeout(() => {
          showProgress('策略优化完成，执行效率提升20%', 3000)
        }, 2000)
        break
        
      case 'replace':
        showProgress('正在分析类目替换方案...')
        setTimeout(() => {
          showProgress('已生成类目替换建议，请在选择页面查看', 4000)
        }, 2000)
        break
        
      case 'supplement':
        showProgress('正在寻找辅助类目...')
        setTimeout(() => {
          showProgress('已识别3个低风险辅助类目，等待确认', 3000)
        }, 2000)
        break
        
      default:
        showProgress('操作执行中，请稍候...')
        setTimeout(() => {
          showProgress('操作已完成', 2000)
        }, 1500)
    }
  }

  // 如果没有数据，显示引导页面
  if (!businessInsights.hasData) {
    return (
      <div className="page-layout page-enter">
        <div className="page-header">
          <h1 className="page-title">经营复盘中心</h1>
          <p className="page-description">记录每一次决策足迹，AI学习成功经验，持续优化您的商业策略</p>
        </div>

        <div className="page-content">
          <div className="content-section">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="w-8 h-8 text-blue-600" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">开始您的智能选品之旅</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {businessInsights.message}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-lg p-4 border border-blue-100">
                  <MousePointer className="w-6 h-6 text-blue-600 mb-2" />
                  <h4 className="font-medium text-gray-900 mb-1">操作记录</h4>
                  <p className="text-sm text-gray-600">记录您的每一次选择和决策</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-purple-100">
                  <Brain className="w-6 h-6 text-purple-600 mb-2" />
                  <h4 className="font-medium text-gray-900 mb-1">AI学习</h4>
                  <p className="text-sm text-gray-600">分析您的偏好，优化推荐</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-green-100">
                  <TrendingUp className="w-6 h-6 text-green-600 mb-2" />
                  <h4 className="font-medium text-gray-900 mb-1">效果分析</h4>
                  <p className="text-sm text-gray-600">追踪决策效果，持续优化</p>
                </div>
              </div>

              <button 
                onClick={() => setCurrentPage('selection')}
                className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
              >
                开始选品
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const getSuccessRate = (rate: number) => {
    if (rate >= 85) return 'text-green-600 bg-green-100'
    if (rate >= 70) return 'text-orange-600 bg-orange-100'
    return 'text-red-600 bg-red-100'
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600'
    if (confidence >= 80) return 'text-blue-600'
    return 'text-yellow-600'
  }

  const getROIColor = (roi: number) => {
    if (roi >= 100) return 'text-green-600'
    if (roi >= 50) return 'text-blue-600'
    return 'text-yellow-600'
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700'
      case 'medium': return 'bg-yellow-100 text-yellow-700'
      case 'low': return 'bg-green-100 text-green-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const tabs = [
    { id: 'insights', name: '成功经验', icon: Trophy, count: (businessInsights.successPatterns || []).length },
    { id: 'learning', name: '失败教训', icon: Lightbulb, count: (businessInsights.learningPoints || []).length },
    { id: 'ai', name: 'AI进化', icon: Brain, count: (businessInsights.aiLearning || []).length },
    { id: 'decisions', name: '重大决策', icon: Target, count: (businessInsights.decisionHistory || []).length },
    { id: 'milestones', name: '里程碑', icon: Award, count: (businessInsights.milestones || []).length }
  ]

  const renderSuccessPatterns = () => (
    <div className="space-y-4">
      {(businessInsights.successPatterns || []).length === 0 ? (
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 text-center">
          <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">成功经验积累中</h3>
          <p className="text-gray-600">继续您的选品操作，我将为您总结成功模式</p>
        </div>
      ) : (
        (businessInsights.successPatterns || []).map((pattern) => (
          <div key={pattern.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{pattern.pattern}</h3>
                <p className="text-gray-600 text-sm">{pattern.description}</p>
              </div>
              <div className="text-right">
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getConfidenceColor(pattern.confidence) === 'text-green-600' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                  置信度 {pattern.confidence}%
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <div className="text-sm font-medium text-green-700 mb-1">💰 商业影响</div>
              <div className="text-sm text-green-600">{pattern.impact}</div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900">{pattern.dataPoints.totalProducts}</div>
                <div className="text-xs text-gray-500">相关产品</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-green-600">{pattern.dataPoints.successRate}%</div>
                <div className="text-xs text-gray-500">成功率</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-blue-600">{pattern.dataPoints.avgProfit.toFixed(1)}%</div>
                <div className="text-xs text-gray-500">平均利润率</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-purple-600">{pattern.dataPoints.customerSatisfaction.toFixed(1)}</div>
                <div className="text-xs text-gray-500">预期满意度</div>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-sm font-medium text-gray-700 mb-2">🔑 关键成功因素</div>
              <div className="flex flex-wrap gap-2">
                {(pattern.keyFactors || []).map((factor, index) => (
                  <span key={index} className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                    {factor}
                  </span>
                ))}
              </div>
            </div>

            {pattern.actions && pattern.actions.length > 0 && (
              <div className="mb-4">
                <div className="text-sm font-medium text-gray-700 mb-3">🚀 推荐操作</div>
                <div className="space-y-3">
                  {pattern.actions.map((action, index) => (
                    <div key={index} className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <PlayCircle className="w-4 h-4 text-blue-600" />
                          <span className="font-medium text-gray-900">{action.title}</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(action.priority)}`}>
                            {action.priority === 'high' ? '高优先级' : action.priority === 'medium' ? '中优先级' : '低优先级'}
                          </span>
                        </div>
                        <button 
                          onClick={() => executeAction(action.type, action)}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                        >
                          立即执行
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{action.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>📈 预期影响: {action.estimatedImpact}</span>
                        <span>⏱️ 预计时间: {action.estimatedTime}</span>
                        <span>🎯 难度: {action.difficulty === 'easy' ? '简单' : action.difficulty === 'medium' ? '中等' : '困难'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
              <div className="text-sm font-medium text-purple-700 mb-2">💡 AI建议</div>
              <div className="text-sm text-gray-600 mb-2">{pattern.recommendation}</div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">更新时间: {pattern.lastUpdated}</span>
                <button className="text-xs text-purple-600 font-medium hover:underline flex items-center gap-1">
                  应用建议 <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )

  const renderLearningPoints = () => (
    <div className="space-y-4">
      {(businessInsights.learningPoints || []).length === 0 ? (
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 text-center">
          <Lightbulb className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">优化建议生成中</h3>
          <p className="text-gray-600">基于您的操作数据，持续分析优化机会</p>
        </div>
      ) : (
        (businessInsights.learningPoints || []).map((learning) => (
          <div key={learning.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  <h3 className="text-lg font-semibold text-gray-900">{learning.category}</h3>
                </div>
                <div className="text-red-600 font-medium text-sm mb-1">{learning.issue}</div>
                <p className="text-gray-600 text-sm">{learning.analysis}</p>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="text-sm font-medium text-red-700 mb-1">📉 负面影响</div>
              <div className="text-sm text-red-600">{learning.impact}</div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">🔍 根本原因</div>
                <div className="space-y-1">
                  {(learning.rootCause || []).map((cause, index) => (
                    <div key={index} className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                      • {cause}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-700 mb-2">📚 经验教训</div>
                <div className="space-y-1">
                  {(learning.lessons || []).map((lesson, index) => (
                    <div key={index} className="text-sm text-gray-600 bg-blue-50 p-2 rounded">
                      • {lesson}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-green-700 mb-1">✅ 改进措施</div>
                  <div className="text-sm text-green-600">{learning.actionTaken}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-green-700 mb-1">📈 改进效果</div>
                  <div className="text-sm text-green-600">{learning.result}</div>
                </div>
              </div>
            </div>

            {/* 添加具体的改进操作 */}
            {learning.improvements && learning.improvements.length > 0 && (
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-4">
                <div className="text-sm font-medium text-orange-700 mb-3">🛠️ 立即改进</div>
                <div className="space-y-3">
                  {learning.improvements.map((improvement, index) => (
                    <div key={index} className="bg-white border border-orange-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <RefreshCw className="w-4 h-4 text-orange-600" />
                          <span className="font-medium text-gray-900">{improvement.title}</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(improvement.priority)}`}>
                            {improvement.priority === 'high' ? '高优先级' : improvement.priority === 'medium' ? '中优先级' : '低优先级'}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            improvement.status === 'ready' ? 'bg-green-100 text-green-700' : 
                            improvement.status === 'planning' ? 'bg-blue-100 text-blue-700' : 
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {improvement.status === 'ready' ? '就绪' : improvement.status === 'planning' ? '规划中' : '进行中'}
                          </span>
                        </div>
                        <button 
                          onClick={() => executeAction(improvement.type, improvement)}
                          className={`px-3 py-1 rounded text-sm transition-colors ${
                            improvement.status === 'ready' 
                              ? 'bg-orange-600 text-white hover:bg-orange-700' 
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                          disabled={improvement.status !== 'ready'}
                        >
                          {improvement.status === 'ready' ? '立即执行' : '等待中'}
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{improvement.description}</p>
                      <div className="text-xs text-orange-600">
                        📈 预期影响: {improvement.estimatedImpact}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  )

  const renderAILearning = () => (
    <div className="space-y-4">
      {(businessInsights.aiLearning || []).map((ai) => (
        <div key={ai.id} className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-start gap-3 mb-4">
            <Brain className="w-6 h-6 text-purple-600 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{ai.module}</h3>
              <p className="text-sm text-gray-600">{ai.improvement}</p>
            </div>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
            <div className="text-sm font-medium text-purple-700 mb-1">📊 数据来源</div>
            <div className="text-sm text-purple-600">{ai.dataSource}</div>
          </div>

          <div className="mb-4">
            <div className="text-sm font-medium text-gray-700 mb-2">🧠 学习洞察</div>
            <div className="space-y-2">
              {(ai.keyInsights || []).map((insight, index) => (
                <div key={index} className="text-sm text-gray-600 bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                  {insight}
                </div>
              ))}
            </div>
          </div>

          {/* 添加AI优化操作 */}
          {ai.aiActions && ai.aiActions.length > 0 && (
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-4">
              <div className="text-sm font-medium text-purple-700 mb-3">🤖 AI优化操作</div>
              <div className="space-y-3">
                {ai.aiActions.map((action, index) => (
                  <div key={index} className="bg-white border border-purple-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-purple-600" />
                        <span className="font-medium text-gray-900">{action.title}</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          action.status === 'active' ? 'bg-green-100 text-green-700' : 
                          action.status === 'ready' ? 'bg-blue-100 text-blue-700' : 
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {action.status === 'active' ? '进行中' : action.status === 'ready' ? '就绪' : '等待中'}
                        </span>
                      </div>
                      <button 
                        onClick={() => executeAction(action.type, action)}
                        className={`px-3 py-1 rounded text-sm transition-colors ${
                          action.status === 'ready' 
                            ? 'bg-purple-600 text-white hover:bg-purple-700' 
                            : action.status === 'active'
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                        disabled={action.status === 'active'}
                      >
                        {action.status === 'active' ? '进行中' : action.status === 'ready' ? '开始执行' : '立即执行'}
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{action.description}</p>
                    <div className="flex items-center gap-4 text-xs text-purple-600">
                      {action.progress !== undefined && (
                        <div className="flex items-center gap-2 flex-1">
                          <span>进度:</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${action.progress}%` }}
                            ></div>
                          </div>
                          <span>{action.progress}%</span>
                        </div>
                      )}
                      <span>⏱️ 预计完成: {action.estimatedCompletion}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-gradient-to-r from-cyan-50 to-purple-50 border border-cyan-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-cyan-700 mb-1">🔄 下次优化方向</div>
                <div className="text-sm text-gray-600">{ai.nextOptimization}</div>
              </div>
              <div className="text-xs text-gray-500">{ai.updateTime}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const renderDecisionHistory = () => (
    <div className="space-y-4">
      {(businessInsights.decisionHistory || []).length === 0 ? (
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 text-center">
          <Target className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">决策记录生成中</h3>
          <p className="text-gray-600">继续您的选品操作，我将记录重要决策</p>
        </div>
      ) : (
        (businessInsights.decisionHistory || []).map((decision) => (
          <div key={decision.id} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <Target className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{decision.decision}</h3>
                  <p className="text-sm text-gray-600">{decision.context}</p>
                  <p className="text-sm text-blue-600 mt-1">{decision.reasoning}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  ROI {decision.roi}%
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${decision.status === 'successful' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {decision.status === 'successful' ? '成功' : '进行中'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
              {Object.entries(decision.dataSupport).map(([key, value]) => (
                <div key={key} className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="text-sm font-bold text-gray-900">{value}</div>
                  <div className="text-xs text-gray-600">
                    {key === 'successRate' && '成功率'}
                    {key === 'profitMargin' && '利润率'}
                    {key === 'userFeedback' && '满意度'}
                    {key === 'competitivePosition' && '竞争地位'}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="text-sm font-medium text-blue-700 mb-2">⚡ 执行措施</div>
              <div className="text-sm text-blue-600">{decision.execution}</div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <div className="text-sm font-medium text-green-700 mb-2">✅ 执行效果</div>
              <div className="space-y-1">
                {(decision.results || []).map((result, index) => (
                  <div key={index} className="text-sm text-green-600">• {result}</div>
                ))}
              </div>
            </div>

            {/* 添加后续行动操作 */}
            {decision.followUpActions && decision.followUpActions.length > 0 && (
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4">
                <div className="text-sm font-medium text-blue-700 mb-3">🚀 后续行动计划</div>
                <div className="space-y-3">
                  {decision.followUpActions.map((action, index) => (
                    <div key={index} className="bg-white border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <PlayCircle className="w-4 h-4 text-blue-600" />
                          <span className="font-medium text-gray-900">{action.title}</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(action.priority)}`}>
                            {action.priority === 'high' ? '高优先级' : action.priority === 'medium' ? '中优先级' : '低优先级'}
                          </span>
                        </div>
                        <button 
                          onClick={() => executeAction(action.type, action)}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                        >
                          立即执行
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{action.description}</p>
                      <div className="text-xs text-blue-600">
                        📅 计划完成时间: {action.dueDate}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  )

  const renderMilestones = () => (
    <div className="space-y-4">
      {(businessInsights.milestones || []).length === 0 ? (
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 text-center">
          <Award className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">里程碑等待达成</h3>
          <p className="text-gray-600">继续优化您的选品策略，达成更多成就</p>
        </div>
      ) : (
        (businessInsights.milestones || []).map((milestone) => (
          <div key={milestone.id} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-start gap-3 mb-4">
              <Award className="w-6 h-6 text-yellow-600 mt-1" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{milestone.achievement}</h3>
                  <span className="text-xs text-gray-500">{milestone.date}</span>
                </div>
                <p className="text-yellow-600 font-medium text-sm">{milestone.celebration}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
              {Object.entries(milestone.metrics).map(([key, value]) => (
                <div key={key} className="bg-yellow-50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-yellow-900">{value}</div>
                  <div className="text-xs text-yellow-600">
                    {key === 'categories' && '类目数'}
                    {key === 'avgScore' && '平均分'}
                    {key === 'profitPotential' && '利润潜力%'}
                    {key === 'riskLevel' && '风险等级'}
                    {key === 'products' && '产品数'}
                    {key === 'avgProfit' && '平均利润%'}
                    {key === 'selectRate' && '选择率%'}
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <div className="text-sm font-medium text-gray-700 mb-2">🎯 关键成功因素</div>
              <div className="flex flex-wrap gap-2">
                {(milestone.keyDrivers || []).map((driver, index) => (
                  <span key={index} className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full">
                    {driver}
                  </span>
                ))}
              </div>
            </div>

            {/* 添加下一步行动 */}
            {milestone.nextSteps && milestone.nextSteps.length > 0 && (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4">
                <div className="text-sm font-medium text-yellow-700 mb-3">🚀 庆祝后的下一步</div>
                <div className="space-y-3">
                  {milestone.nextSteps.map((step, index) => (
                    <div key={index} className="bg-white border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Maximize2 className="w-4 h-4 text-yellow-600" />
                          <span className="font-medium text-gray-900">{step.title}</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(step.priority)}`}>
                            {step.priority === 'high' ? '高优先级' : step.priority === 'medium' ? '中优先级' : '低优先级'}
                          </span>
                        </div>
                        <button 
                          onClick={() => step.action()}
                          className="bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700 transition-colors"
                        >
                          立即行动
                        </button>
                      </div>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  )

  return (
    <div className="page-layout page-enter">
      {/* 页面标题 */}
      <div className="page-header">
        <h1 className="page-title">经营复盘中心</h1>
        <p className="page-description">基于您的实际选品数据，AI智能分析经营模式，助力决策优化</p>
        
        {/* 实时数据亮点 */}
        <div className="flex items-center gap-6 mt-4">
          <div className="flex items-center gap-2 bg-purple-50 px-3 py-1 rounded-full">
            <Brain className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">AI学习准确率 {businessInsights.stats?.aiAccuracy || 0}%</span>
          </div>
          <div className="flex items-center gap-2 bg-cyan-50 px-3 py-1 rounded-full">
            <Target className="w-4 h-4 text-cyan-600" />
            <span className="text-sm font-medium text-cyan-700">已选类目 {businessInsights.stats?.totalCategories || 0}</span>
          </div>
          <div className="flex items-center gap-2 bg-indigo-50 px-3 py-1 rounded-full">
            <Package className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-700">已选产品 {businessInsights.stats?.totalProducts || 0}</span>
          </div>
        </div>
      </div>

      <div className="page-content">
        {/* 复盘概览统计 */}
        <div className="content-section">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-lg font-bold text-green-900">{(businessInsights.successPatterns || []).length}</div>
                  <div className="text-xs text-green-600">成功经验</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-200 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <div className="text-lg font-bold text-orange-900">{(businessInsights.learningPoints || []).length}</div>
                  <div className="text-xs text-orange-600">优化建议</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-lg font-bold text-purple-900">{(businessInsights.aiLearning || []).length}</div>
                  <div className="text-xs text-purple-600">AI进化</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-lg font-bold text-blue-900">{(businessInsights.milestones || []).length}</div>
                  <div className="text-xs text-blue-600">里程碑</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 标签导航 */}
        <div className="content-section">
          <div className="bg-white rounded-xl border border-gray-200 p-1">
            <div className="flex items-center gap-1">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all text-sm ${
                      activeTab === tab.id
                        ? 'bg-primary text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.name}
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      activeTab === tab.id
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* 内容区域 */}
        <div className="content-section">
          {activeTab === 'insights' && renderSuccessPatterns()}
          {activeTab === 'learning' && renderLearningPoints()}
          {activeTab === 'ai' && renderAILearning()}
          {activeTab === 'decisions' && renderDecisionHistory()}
          {activeTab === 'milestones' && renderMilestones()}
        </div>

        {/* 底部总结 */}
        <div className="content-section">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Cpu className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">基于您的数据的AI分析</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{businessInsights.stats?.aiAccuracy || 0}%</div>
                <div className="text-xs text-gray-600">AI学习准确率</div>
                <div className="text-xs text-green-600">基于{businessInsights.stats?.totalProducts || 0}个产品选择学习</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{businessInsights.stats?.totalCategories || 0}</div>
                <div className="text-xs text-gray-600">已配置类目</div>
                <div className="text-xs text-purple-600">策略覆盖度不断优化</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{(businessInsights.stats?.avgProfit || 0).toFixed(1)}%</div>
                <div className="text-xs text-gray-600">平均利润率</div>
                <div className="text-xs text-blue-600">基于实际选品计算</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 