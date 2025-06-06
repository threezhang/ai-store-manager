'use client'

import { useState } from 'react'
import { 
  Package, Search, Filter, Eye, Edit, Trash2, 
  TrendingUp, TrendingDown, Plus, Download,
  ShoppingCart, DollarSign, BarChart3, AlertTriangle, Star,
  Target, Zap, Brain, Award, ChevronRight, Activity
} from 'lucide-react'

export default function Products() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [platformFilter, setPlatformFilter] = useState('all')

  // 优化后的商品数据 - 突出选品成果和销售表现
  const products = [
    {
      id: 1,
      name: '无线蓝牙耳机 Pro版',
      image: '/api/placeholder/80/80',
      category: '数码配件',
      price: 299,
      cost: 180,
      profit: 119,
      profitRate: 39.8,
      stock: 245,
      sales: 1247,
      orders: 247,
      dailyOrders: 12,
      status: 'active',
      platform: '淘宝',
      trend: 'up',
      salesChange: 15.2,
      conversionRate: 4.8,
      aiScore: 94,
      isPotentialHit: true,
      createdAt: '2024-01-15',
      revenue: 73753,
      avgDailyRevenue: 2458
    },
    {
      id: 2,
      name: '智能手表运动版',
      image: '/api/placeholder/80/80',
      category: '数码配件',
      price: 899,
      cost: 540,
      profit: 359,
      profitRate: 39.9,
      stock: 89,
      sales: 892,
      orders: 156,
      dailyOrders: 8,
      status: 'active',
      platform: '拼多多',
      trend: 'up',
      salesChange: 8.7,
      conversionRate: 3.2,
      aiScore: 89,
      isPotentialHit: true,
      createdAt: '2024-01-12',
      revenue: 140244,
      avgDailyRevenue: 4674
    },
    {
      id: 3,
      name: '便携充电宝10000mAh',
      image: '/api/placeholder/80/80',
      category: '数码配件',
      price: 159,
      cost: 95,
      profit: 64,
      profitRate: 40.3,
      stock: 156,
      sales: 456,
      orders: 89,
      dailyOrders: 3,
      status: 'paused',
      platform: '京东',
      trend: 'down',
      salesChange: -2.1,
      conversionRate: 2.8,
      aiScore: 67,
      isPotentialHit: false,
      createdAt: '2024-01-10',
      revenue: 14151,
      avgDailyRevenue: 471
    },
    {
      id: 4,
      name: '护肤精华套装',
      image: '/api/placeholder/80/80',
      category: '美妆护肤',
      price: 299,
      cost: 179,
      profit: 120,
      profitRate: 40.1,
      stock: 67,
      sales: 234,
      orders: 134,
      dailyOrders: 6,
      status: 'active',
      platform: '天猫',
      trend: 'up',
      salesChange: 12.3,
      conversionRate: 5.4,
      aiScore: 82,
      isPotentialHit: false,
      createdAt: '2024-01-08',
      revenue: 40066,
      avgDailyRevenue: 1335
    },
    {
      id: 5,
      name: '瑜伽垫防滑加厚',
      image: '/api/placeholder/80/80',
      category: '运动健身',
      price: 89,
      cost: 53,
      profit: 36,
      profitRate: 40.4,
      stock: 234,
      sales: 178,
      orders: 78,
      dailyOrders: 4,
      status: 'active',
      platform: '淘宝',
      trend: 'up',
      salesChange: 8.9,
      conversionRate: 3.6,
      aiScore: 75,
      isPotentialHit: false,
      createdAt: '2024-01-05',
      revenue: 6942,
      avgDailyRevenue: 231
    },
    {
      id: 6,
      name: '智能体重秤',
      image: '/api/placeholder/80/80',
      category: '智能家居',
      price: 199,
      cost: 119,
      profit: 80,
      profitRate: 40.2,
      stock: 89,
      sales: 145,
      orders: 56,
      dailyOrders: 2,
      status: 'draft',
      platform: '拼多多',
      trend: 'up',
      salesChange: 5.4,
      conversionRate: 2.1,
      aiScore: 72,
      isPotentialHit: false,
      createdAt: '2024-01-03',
      revenue: 11144,
      avgDailyRevenue: 371
    }
  ]

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter
    const matchesPlatform = platformFilter === 'all' || product.platform === platformFilter
    return matchesSearch && matchesStatus && matchesPlatform
  })

  // 智能化统计数据
  const intelligentStats = {
    total: products.length,
    active: products.filter(p => p.status === 'active').length,
    potentialHits: products.filter(p => p.isPotentialHit).length,
    totalRevenue: products.reduce((sum, p) => sum + p.revenue, 0),
    totalProfit: products.reduce((sum, p) => sum + (p.profit * p.orders), 0),
    avgAiScore: Math.round(products.reduce((sum, p) => sum + p.aiScore, 0) / products.length),
    totalDailyOrders: products.reduce((sum, p) => sum + (p.status === 'active' ? p.dailyOrders : 0), 0),
    avgConversion: (products.reduce((sum, p) => sum + p.conversionRate, 0) / products.length).toFixed(1)
  }

  // AI智能洞察
  const aiInsights = [
    {
      type: 'opportunity',
      title: '爆款潜力商品',
      content: `${intelligentStats.potentialHits}个商品具备爆款潜力，建议加大推广投入`,
      action: '优化推广',
      icon: Star,
      color: 'bg-orange-50 border-orange-200',
      textColor: 'text-orange-700'
    },
    {
      type: 'optimization',
      title: '利润率优化',
      content: '数码配件类目利润率较高，建议扩充此类商品',
      action: '查看建议',
      icon: TrendingUp,
      color: 'bg-green-50 border-green-200',
      textColor: 'text-green-700'
    },
    {
      type: 'warning',
      title: '库存预警',
      content: '3个商品库存偏低，可能影响销售连续性',
      action: '立即补货',
      icon: AlertTriangle,
      color: 'bg-red-50 border-red-200',
      textColor: 'text-red-700'
    }
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { text: '热销中', color: 'bg-green-100 text-green-800 border border-green-200' },
      paused: { text: '暂停销售', color: 'bg-yellow-100 text-yellow-800 border border-yellow-200' },
      draft: { text: '准备上架', color: 'bg-blue-100 text-blue-800 border border-blue-200' },
      archived: { text: '已下架', color: 'bg-gray-100 text-gray-800 border border-gray-200' }
    }
    const config = statusConfig[status] || statusConfig.draft
    return (
      <span className={`px-3 py-1 text-xs font-medium rounded-full ${config.color}`}>
        {config.text}
      </span>
    )
  }

  const getTrendIcon = (trend: string, change: number) => {
    if (trend === 'up' && change > 0) {
      return <TrendingUp className="w-4 h-4 text-green-500" />
    } else if (trend === 'down' || change < 0) {
      return <TrendingDown className="w-4 h-4 text-red-500" />
    }
    return <Activity className="w-4 h-4 text-gray-500" />
  }

  const getTrendColor = (trend: string, change: number) => {
    if (trend === 'up' && change > 0) return 'text-green-600'
    if (trend === 'down' || change < 0) return 'text-red-600'
    return 'text-gray-600'
  }

  const getAiScoreBadge = (score: number) => {
    if (score >= 90) return { text: '优秀', color: 'bg-green-100 text-green-700 border border-green-200' }
    if (score >= 80) return { text: '良好', color: 'bg-blue-100 text-blue-700 border border-blue-200' }
    if (score >= 70) return { text: '一般', color: 'bg-yellow-100 text-yellow-700 border border-yellow-200' }
    return { text: '待优化', color: 'bg-red-100 text-red-700 border border-red-200' }
  }

  return (
    <div className="page-layout page-enter">
      {/* 页面标题 */}
      <div className="page-header">
        <h1 className="page-title">智能商品库</h1>
        <p className="page-description">全链路跟踪选品成果，AI驱动销售优化，让每次选择都变现最大化</p>
        
        {/* 价值亮点 */}
        <div className="flex items-center gap-6 mt-4">
          <div className="flex items-center gap-2 bg-purple-50 px-3 py-1 rounded-full">
            <Brain className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">AI评分实时优化</span>
          </div>
          <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
            <Target className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">多平台销售监控</span>
          </div>
          <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
            <Award className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">选品ROI可视化</span>
          </div>
        </div>
      </div>

      <div className="page-content">
        {/* 核心业绩指标 */}
        <div className="content-section">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">选品成果总览</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{intelligentStats.total}</div>
                <div className="text-xs text-gray-600">在库商品</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{intelligentStats.active}</div>
                <div className="text-xs text-gray-600">热销中</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">{intelligentStats.potentialHits}</div>
                <div className="text-xs text-gray-600">爆款潜力</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{formatCurrency(intelligentStats.totalRevenue)}</div>
                <div className="text-xs text-gray-600">总收入</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{formatCurrency(intelligentStats.totalProfit)}</div>
                <div className="text-xs text-gray-600">总利润</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{intelligentStats.avgAiScore}</div>
                <div className="text-xs text-gray-600">AI平均分</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-red-600">{intelligentStats.totalDailyOrders}</div>
                <div className="text-xs text-gray-600">日均订单</div>
              </div>
            </div>
          </div>
        </div>

        {/* AI智能洞察 */}
        <div className="content-section">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-semibold text-gray-900">AI智能洞察</h2>
            <span className="text-sm text-gray-500">基于销售数据的智能分析</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {aiInsights.map((insight, index) => {
              const Icon = insight.icon
              return (
                <div key={index} className={`${insight.color} rounded-xl p-4 border`}>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <Icon className={`w-5 h-5 ${insight.textColor}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold text-sm mb-1 ${insight.textColor}`}>{insight.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{insight.content}</p>
                      <button className={`text-xs font-medium ${insight.textColor} flex items-center gap-1 hover:underline`}>
                        {insight.action} <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 搜索和筛选 */}
        <div className="content-section">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="搜索商品名称、类目..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="all">全部状态</option>
                  <option value="active">热销中</option>
                  <option value="paused">暂停销售</option>
                  <option value="draft">准备上架</option>
                </select>
                
                <select
                  value={platformFilter}
                  onChange={(e) => setPlatformFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="all">全部平台</option>
                  <option value="淘宝">淘宝</option>
                  <option value="拼多多">拼多多</option>
                  <option value="京东">京东</option>
                  <option value="天猫">天猫</option>
                </select>
                
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
                  <Plus className="w-4 h-4" />
                  选品上架
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 商品表格 */}
        <div className="content-section">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">商品信息</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">销售表现</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">盈利能力</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">AI评分</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">库存状态</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProducts.map((product) => {
                    const aiScoreBadge = getAiScoreBadge(product.aiScore)
                    return (
                      <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center relative">
                              {product.isPotentialHit && (
                                <Star className="absolute -top-1 -right-1 w-4 h-4 text-orange-500 fill-orange-500" />
                              )}
                              <Package className="w-6 h-6 text-gray-400" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 text-sm flex items-center gap-2">
                                {product.name}
                                {product.isPotentialHit && (
                                  <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full font-medium">
                                    爆款潜力
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-gray-500">{product.category} · {product.platform}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-900 text-sm">{product.orders}单</span>
                              <div className="flex items-center gap-1">
                                {getTrendIcon(product.trend, product.salesChange)}
                                <span className={`text-xs font-medium ${getTrendColor(product.trend, product.salesChange)}`}>
                                  {product.salesChange > 0 ? '+' : ''}{product.salesChange.toFixed(1)}%
                                </span>
                              </div>
                            </div>
                            <div className="text-xs text-gray-500">
                              日均{product.dailyOrders}单 · 转化率{product.conversionRate}%
                            </div>
                            <div className="text-xs font-medium text-green-600">
                              {formatCurrency(product.revenue)}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="space-y-1">
                            <div className="font-medium text-green-600 text-sm">
                              {formatCurrency(product.profit * product.orders)}
                            </div>
                            <div className="text-xs text-gray-500">
                              单品利润 {formatCurrency(product.profit)}
                            </div>
                            <div className="text-xs font-medium text-green-600">
                              利润率 {product.profitRate.toFixed(1)}%
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="space-y-2">
                            <div className="text-lg font-bold text-purple-600">{product.aiScore}</div>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${aiScoreBadge.color}`}>
                              {aiScoreBadge.text}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="space-y-2">
                            {getStatusBadge(product.status)}
                            <div className="text-sm font-medium text-gray-900">{product.stock}</div>
                            {product.stock < 100 && (
                              <div className="flex items-center gap-1 text-xs text-orange-600">
                                <AlertTriangle className="w-3 h-3" />
                                库存偏低
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-green-600 transition-colors rounded-lg hover:bg-green-50">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            
            {/* 分页 */}
            <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500">
                  显示 {filteredProducts.length} 个商品中的 1-{Math.min(filteredProducts.length, 10)} 个
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-xs text-gray-700 hover:bg-gray-50 transition-colors">
                    上一页
                  </button>
                  <span className="px-3 py-1 bg-blue-600 text-white rounded-md text-xs">1</span>
                  <button className="px-3 py-1 border border-gray-300 rounded-md text-xs text-gray-700 hover:bg-gray-50 transition-colors">
                    下一页
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 智能操作建议 */}
        <div className="content-section">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-600" />
                <h3 className="text-base font-semibold text-gray-900">智能操作建议</h3>
              </div>
              <button className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-50 transition-colors text-sm">
                <Download className="w-4 h-4" />
                导出分析报告
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-3 border border-green-200">
                <h4 className="font-medium text-green-700 text-sm mb-1">推广优化</h4>
                <p className="text-xs text-gray-600 mb-2">无线蓝牙耳机表现优异，建议增加推广预算</p>
                <button className="text-xs text-green-600 font-medium hover:underline">立即优化</button>
              </div>
              
              <div className="bg-white rounded-lg p-3 border border-blue-200">
                <h4 className="font-medium text-blue-700 text-sm mb-1">选品扩展</h4>
                <p className="text-xs text-gray-600 mb-2">数码配件类目表现良好，建议选择相关商品</p>
                <button className="text-xs text-blue-600 font-medium hover:underline">去选品</button>
              </div>
              
              <div className="bg-white rounded-lg p-3 border border-orange-200">
                <h4 className="font-medium text-orange-700 text-sm mb-1">库存管理</h4>
                <p className="text-xs text-gray-600 mb-2">护肤套装库存偏低，建议及时补货</p>
                <button className="text-xs text-orange-600 font-medium hover:underline">查看详情</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 