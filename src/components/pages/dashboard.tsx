'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'
import { 
  TrendingUp, Package, DollarSign, Users, 
  Target, Zap, Activity, BarChart3,
  Calendar, Clock, CheckCircle, AlertTriangle,
  ShoppingCart, Star, Filter, Search, ArrowUpRight,
  Eye, Heart, MessageSquare, Share2, Brain,
  Lightbulb, TrendingDown, ChevronRight, PlayCircle
} from 'lucide-react'

export default function Dashboard() {
  const { acceptedProducts, selectedCategories, currentStep, setCurrentPage } = useStore()

  // 基于用户当前状态的智能数据
  const intelligentData = {
    currentTask: {
      step: currentStep,
      selectedCategories: selectedCategories.length,
      acceptedProducts: acceptedProducts.length,
      estimatedRevenue: acceptedProducts.length * 2580, // 预估收入
      nextAction: currentStep <= 2 ? '继续选择商品类目' : 
                  currentStep === 3 ? '查看AI推荐商品' :
                  currentStep === 4 ? '配置上架参数' : '执行批量上架'
    },
    
    // 基于用户选品的智能推荐
    smartRecommendations: [
      {
        type: 'category',
        title: '推荐新类目',
        content: '基于您已选的数码配件类目，美妆护肤类目有67%的交叉购买率',
        action: '查看美妆类目',
        impact: '+32% 预期收入',
        confidence: 89,
        icon: Target
      },
      {
        type: 'product',
        title: '热门商品预警',
        content: '无线耳机品类在您的目标类目中需求激增，建议优先选品',
        action: '立即选品',
        impact: '黄金机会期',
        confidence: 94,
        icon: TrendingUp
      },
      {
        type: 'pricing',
        title: '定价策略优化',
        content: '您选择的商品建议定价区间：299-599元，利润率可达45%',
        action: '优化定价',
        impact: '+15% 利润率',
        confidence: 78,
        icon: DollarSign
      }
    ],

    // 与当前选品相关的市场洞察
    marketInsights: [
      {
        title: '数码配件市场趋势',
        trend: 'up',
        change: '+28%',
        description: '您选择的数码配件类目本周销量增长28%，市场热度持续上升',
        timeframe: '本周数据'
      },
      {
        title: '竞争对手动态',
        trend: 'neutral',
        change: '5个',
        description: '您的目标品类新增5个竞争对手，建议加快选品节奏',
        timeframe: '最近3天'
      },
      {
        title: '消费者偏好',
        trend: 'up',
        change: '+12%',
        description: '无线充电功能商品偏好度提升12%，符合您的选品方向',
        timeframe: '本月趋势'
      }
    ],

    // 个性化任务建议
    actionSuggestions: [
      {
        priority: 'high',
        title: '完成当前选品',
        description: `您还有${5 - currentStep}个步骤未完成，预计${acceptedProducts.length * 15}分钟完成`,
        action: '继续选品',
        icon: PlayCircle,
        color: 'bg-red-500'
      },
      {
        priority: 'medium', 
        title: '扩展商品类目',
        description: '基于AI分析，家居生活类目与您的选择有很高匹配度',
        action: '探索类目',
        icon: Target,
        color: 'bg-blue-500'
      },
      {
        priority: 'low',
        title: '分析竞品策略',
        description: '查看同类商家的成功案例，优化您的选品策略',
        action: '查看分析',
        icon: BarChart3,
        color: 'bg-green-500'
      }
    ],

    // 基于当前状态的实时统计
    personalizedStats: {
      potentialRevenue: acceptedProducts.length * 2580,
      estimatedProfit: acceptedProducts.length * 890,
      timeToLaunch: Math.max(0, 5 - currentStep) * 15, // 距离上架的预估时间(分钟)
      successRate: 85 + selectedCategories.length * 2 // 基于选择的成功率
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50'
      case 'medium': return 'border-blue-200 bg-blue-50'
      case 'low': return 'border-green-200 bg-green-50'
      default: return 'border-gray-200 bg-gray-50'
    }
  }

  const getPriorityBadge = (priority: string) => {
    const config = {
      high: { text: '紧急', color: 'bg-red-100 text-red-700' },
      medium: { text: '重要', color: 'bg-blue-100 text-blue-700' },
      low: { text: '建议', color: 'bg-green-100 text-green-700' }
    }
    const { text, color } = config[priority] || config.low
    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${color}`}>{text}</span>
  }

  return (
    <div className="page-layout page-enter">
      {/* 页面标题 */}
      <div className="page-header">
        <h1 className="page-title">智能决策中心</h1>
        <p className="page-description">基于您的选品进度，AI为您量身定制决策建议和市场洞察</p>
        
        {/* 价值亮点 */}
        <div className="flex items-center gap-6 mt-4">
          <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
            <Brain className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">个性化推荐准确率 94%</span>
          </div>
          <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
            <Target className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">基于您的选品偏好分析</span>
          </div>
          <div className="flex items-center gap-2 bg-purple-50 px-3 py-1 rounded-full">
            <Zap className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">实时市场机会预警</span>
          </div>
        </div>
      </div>

      <div className="page-content">
        {/* 当前任务状态 */}
        <div className="content-section">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Target className="w-6 h-6 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">当前选品任务</h2>
              </div>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                进行中 {intelligentData.currentTask.step}/5
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{intelligentData.currentTask.selectedCategories}</div>
                <div className="text-sm text-gray-600">已选类目</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{intelligentData.currentTask.acceptedProducts}</div>
                <div className="text-sm text-gray-600">确认商品</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{formatCurrency(intelligentData.personalizedStats.potentialRevenue)}</div>
                <div className="text-sm text-gray-600">预期收入</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">{intelligentData.personalizedStats.successRate}%</div>
                <div className="text-sm text-gray-600">成功率预测</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">下一步行动</div>
                <div className="font-medium text-gray-900">{intelligentData.currentTask.nextAction}</div>
              </div>
              <button 
                onClick={() => setCurrentPage('selection')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                继续任务 <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* AI智能推荐 */}
        <div className="content-section">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-600" />
              AI智能推荐
            </h2>
            <span className="text-sm text-gray-500">基于您的选品偏好</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {intelligentData.smartRecommendations.map((rec, index) => {
              const Icon = rec.icon
              return (
                <div key={index} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500">置信度</div>
                      <div className="text-sm font-semibold text-purple-600">{rec.confidence}%</div>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2">{rec.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-height-relaxed">{rec.content}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      {rec.impact}
                    </span>
                    <button className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center gap-1">
                      {rec.action} <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 市场洞察与行动建议 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 市场洞察 */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">相关市场洞察</h3>
            </div>
            
            <div className="space-y-3">
              {intelligentData.marketInsights.map((insight, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900 text-sm">{insight.title}</h4>
                    <div className="flex items-center gap-1">
                      {insight.trend === 'up' ? (
                        <TrendingUp className="w-3 h-3 text-green-500" />
                      ) : insight.trend === 'down' ? (
                        <TrendingDown className="w-3 h-3 text-red-500" />
                      ) : (
                        <Activity className="w-3 h-3 text-blue-500" />
                      )}
                      <span className={`text-xs font-medium ${
                        insight.trend === 'up' ? 'text-green-600' : 
                        insight.trend === 'down' ? 'text-red-600' : 'text-blue-600'
                      }`}>
                        {insight.change}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">{insight.description}</p>
                  <div className="text-xs text-gray-500">{insight.timeframe}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 行动建议 */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-orange-600" />
              <h3 className="text-lg font-semibold text-gray-900">个性化行动建议</h3>
            </div>
            
            <div className="space-y-3">
              {intelligentData.actionSuggestions.map((suggestion, index) => {
                const Icon = suggestion.icon
                return (
                  <div key={index} className={`border rounded-lg p-3 ${getPriorityColor(suggestion.priority)}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 ${suggestion.color} rounded-lg flex items-center justify-center`}>
                          <Icon className="w-3 h-3 text-white" />
                        </div>
                        <h4 className="font-medium text-gray-900 text-sm">{suggestion.title}</h4>
                      </div>
                      {getPriorityBadge(suggestion.priority)}
                    </div>
                    <p className="text-xs text-gray-600 mb-2 pl-8">{suggestion.description}</p>
                    <button className="text-blue-600 hover:text-blue-800 text-xs font-medium flex items-center gap-1 pl-8">
                      {suggestion.action} <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* 快速入口 */}
        <div className="content-section">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">快速操作</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => setCurrentPage('selection')}
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all text-left"
            >
              <Target className="w-8 h-8 text-blue-600" />
              <div>
                <div className="font-medium text-gray-900 text-sm">继续选品</div>
                <div className="text-xs text-gray-600">完成剩余{5 - currentStep}个步骤</div>
              </div>
            </button>
            
            <button
              onClick={() => setCurrentPage('analytics')}
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200 rounded-xl hover:from-green-100 hover:to-green-200 transition-all text-left"
            >
              <BarChart3 className="w-8 h-8 text-green-600" />
              <div>
                <div className="font-medium text-gray-900 text-sm">查看洞察</div>
                <div className="text-xs text-gray-600">深度分析市场机会</div>
              </div>
            </button>
            
            <button
              onClick={() => setCurrentPage('products')}
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-purple-100 border-2 border-purple-200 rounded-xl hover:from-purple-100 hover:to-purple-200 transition-all text-left"
            >
              <Package className="w-8 h-8 text-purple-600" />
              <div>
                <div className="font-medium text-gray-900 text-sm">管理商品</div>
                <div className="text-xs text-gray-600">优化已选商品</div>
              </div>
            </button>
            
            <button
              onClick={() => setCurrentPage('history')}
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-orange-50 to-orange-100 border-2 border-orange-200 rounded-xl hover:from-orange-100 hover:to-orange-200 transition-all text-left"
            >
              <Clock className="w-8 h-8 text-orange-600" />
              <div>
                <div className="font-medium text-gray-900 text-sm">查看历史</div>
                <div className="text-xs text-gray-600">回顾决策轨迹</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 