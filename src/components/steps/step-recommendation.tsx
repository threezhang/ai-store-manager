'use client'

import { useState, useEffect } from 'react'
import { useStore } from '@/lib/store'
import { generateProducts } from '@/lib/mock-data'
import { cn, formatCurrency, formatPercentage, calculateProductScore, delay } from '@/lib/utils'
import { 
  Check, X, Edit, Filter, ArrowUpDown, ChevronRight, Lightbulb, Star, Package, 
  Users, Tag, AlertTriangle, DollarSign, Percent, ShoppingBag, 
  Truck, ThumbsDown, FileText, ShoppingCart 
} from 'lucide-react'
// 单独导入Fire图标，避免barrel优化问题
import { Flame as Fire } from 'lucide-react'
import type { ProductData } from '@/lib/types'

export default function StepRecommendation() {
  const { 
    keywords = [],
    params = { profitMargin: 25, competition: 70, growthRate: 30 },
    recommendedProducts = [],
    acceptedProducts = [],
    setRecommendedProducts = () => {},
    acceptProduct = () => {},
    ignoreProduct = () => {},
    setCurrentStep = () => {},
    canProceedToNextStep = () => true,
    selectedStrategies = [],
    selectedCategories = []
  } = useStore() || {};

  // 组件状态
  const [products, setProducts] = useState<ProductData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [sortBy, setSortBy] = useState<'score' | 'profit' | 'competition' | 'popularity'>('score')
  const [filterKeyword, setFilterKeyword] = useState<string>('')

  // 生成并评分商品
  useEffect(() => {
    const generateAndScoreProducts = async () => {
      setIsLoading(true)
      await delay(1500) // 模拟AI计算时间
      
      const selectedKeywords = keywords.filter(kw => kw.isSelected).map(kw => kw.keyword)
      let generatedProducts = generateProducts(keywords, 50)
      
      // 计算评分并排序
      generatedProducts = generatedProducts.map(product => ({
        ...product,
        score: calculateProductScore(product, selectedKeywords, params)
      }))
      
      // 根据参数筛选
      generatedProducts = generatedProducts.filter(product => 
        product.profit >= params.profitMargin &&
        product.competition <= params.competition
      )
      
      // 按评分排序
      generatedProducts.sort((a, b) => b.score - a.score)
      
      const topProducts = generatedProducts.slice(0, 30)
      setProducts(topProducts)
      setRecommendedProducts(topProducts)
      setIsLoading(false)
    }

    if (recommendedProducts.length === 0) {
      generateAndScoreProducts()
    } else {
      setProducts(recommendedProducts)
      setIsLoading(false)
    }
  }, [])

  // 监听状态变化，同步更新本地products状态
  useEffect(() => {
    setProducts(recommendedProducts)
  }, [recommendedProducts])

  // 排序处理
  const handleSort = (type: 'score' | 'profit' | 'competition' | 'popularity') => {
    setSortBy(type)
    const sorted = [...products].sort((a, b) => {
      switch (type) {
        case 'score':
          return b.score - a.score
        case 'profit':
          return getDistributionProfit(b).rate - getDistributionProfit(a).rate
        case 'competition':
          return a.competition - b.competition
        case 'popularity':
          return getPopularityScore(b) - getPopularityScore(a)
        default:
          return 0
      }
    })
    setProducts(sorted)
  }

  // 筛选处理
  const filteredProducts = filterKeyword
    ? products.filter(p => p.matchedKeyword === filterKeyword)
    : products

  // 处理商品采纳
  const handleAcceptProduct = (productId: string) => {
    acceptProduct(productId)
  }

  // 处理商品忽略
  const handleIgnoreProduct = (productId: string) => {
    ignoreProduct(productId)
  }

  // 批量操作
  const handleSelectAll = () => {
    filteredProducts.forEach(product => {
      if (!product.isAccepted && !product.isIgnored) {
        acceptProduct(product.id)
      }
    })
  }

  const handleIgnoreAll = () => {
    filteredProducts.forEach(product => {
      if (!product.isAccepted && !product.isIgnored) {
        ignoreProduct(product.id)
      }
    })
  }

  // 处理下一步
  const handleNext = () => {
    if (canProceedToNextStep()) {
      setCurrentStep(4) // 跳转到上货配置页面
    }
  }

  // 处理上一步
  const handlePrev = () => {
    setCurrentStep(2) // 返回到策略配置页面
  }

  // 计算分销利润（可售价 - 进货价）
  const getDistributionProfit = (product: ProductData) => {
    // 估算市场可售价（基于供货价加成）
    const minMarkup = 1.15; // 最低加价15%
    const maxMarkup = 1.35; // 最高加价35%
    
    // 根据竞争度调整加价比例：竞争越低，加价空间越大
    const competitionFactor = 1 - (product.competition / 100);
    const markup = minMarkup + (competitionFactor * (maxMarkup - minMarkup));
    
    const marketPrice = product.price * markup;
    const profitAmount = marketPrice - product.price;
    const profitRate = ((marketPrice - product.price) / product.price) * 100;
    
    return {
      supplierPrice: product.price,
      marketPrice: marketPrice,
      amount: profitAmount,
      rate: profitRate
    };
  }

  // 计算爆款潜力分数
  const getPopularityScore = (product: ProductData) => {
    // 基于多种因素评估爆款潜力
    const lowCompetition = Math.max(0, 100 - product.competition); // 竞争度越低分越高
    const priceAppeal = product.price <= 100 ? 30 : product.price <= 200 ? 20 : 10; // 低价商品更有吸引力
    const profitAppeal = product.profit >= 40 ? 30 : product.profit >= 30 ? 20 : 10; // 高利润商品更受欢迎
    
    // 综合评分
    return (lowCompetition * 0.4) + priceAppeal + profitAppeal;
  }

  // 获取爆款潜力评级
  const getPopularityRating = (product: ProductData) => {
    const score = getPopularityScore(product);
    
    if (score >= 70) return { level: "爆款潜力", value: "高", color: "text-red-600" };
    if (score >= 50) return { level: "畅销", value: "中", color: "text-orange-600" };
    return { level: "一般", value: "低", color: "text-blue-600" };
  }

  // 获取同行竞争度评级
  const getCompetitionRating = (product: ProductData) => {
    if (product.competition <= 30) return { level: "低竞争", value: "少量", color: "text-green-600" };
    if (product.competition <= 50) return { level: "中等", value: "适中", color: "text-blue-600" };
    return { level: "高竞争", value: "激烈", color: "text-red-600" };
  }

  // 获取供应商评级
  const getSupplierRating = (product: ProductData) => {
    // 基于商品ID生成一个稳定的随机评分（实际应来自真实数据）
    const hash = product.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const baseScore = 70 + (hash % 30); // 70-99之间的分数
    
    if (baseScore >= 90) return { level: "优质", score: baseScore, color: "text-green-600", ship: "24h发货" };
    if (baseScore >= 80) return { level: "良好", score: baseScore, color: "text-blue-600", ship: "48h发货" };
    return { level: "一般", score: baseScore, color: "text-amber-600", ship: "72h发货" };
  }

  // 获取售后风险评级
  const getAfterSaleRisk = (product: ProductData) => {
    // 基于产品类型和价格估算售后风险
    const isElectronic = product.title.includes('电子') || product.title.includes('数码') || product.title.includes('电器');
    const isClothing = product.title.includes('服装') || product.title.includes('鞋') || product.title.includes('穿戴');
    const isFragile = product.title.includes('玻璃') || product.title.includes('陶瓷') || product.title.includes('易碎');
    
    // 风险因素评分
    let riskScore = 0;
    if (isElectronic) riskScore += 30; // 电子产品风险高
    if (isClothing) riskScore += 25;   // 服装退换货率高
    if (isFragile) riskScore += 35;    // 易碎品风险高
    if (product.price > 100) riskScore += 20; // 高价商品风险高
    
    // 基础风险分（所有商品都有基础风险）
    riskScore += 10;
    
    if (riskScore <= 25) return { level: "低风险", value: "5%以下", color: "text-green-600" };
    if (riskScore <= 50) return { level: "中风险", value: "5-15%", color: "text-amber-600" };
    return { level: "高风险", value: "15%以上", color: "text-red-600" };
  }

  // 获取商品的主要标签
  const getProductMainTag = (product: ProductData) => {
    const profit = getDistributionProfit(product);
    const popularity = getPopularityRating(product);
    const competition = getCompetitionRating(product);
    const risk = getAfterSaleRisk(product);
    
    // 优先选择最突出的特点作为主标签
    if (profit.rate >= 30 && competition.level === "低竞争") {
      return "高利润低竞争";
    }
    
    if (popularity.level === "爆款潜力") {
      return "爆款潜力";
    }
    
    if (profit.rate >= 30) {
      return "高利润";
    }
    
    if (competition.level === "低竞争") {
      return "竞争少";
    }
    
    if (risk.level === "低风险") {
      return "低风险";
    }
    
    return "综合推荐";
  }

  if (isLoading) {
    return (
      <div className="page-layout">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-gray-600">AI正在筛选适合分销的优质商品...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="page-layout page-enter">
      {/* 页面标题 */}
      <div className="page-header">
        <h1 className="page-title">AI推荐商品</h1>
        <p className="page-description">
          为您精选了 <span className="font-bold text-primary">{products.length}</span> 款适合无货源分销的优质商品
        </p>
      </div>

      <div className="page-content">
        {/* AI推荐说明 */}
        <div className="content-section">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 rounded-full p-3">
                <Lightbulb className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded font-medium">分销优选</span>
                  <span className="text-blue-700 font-medium">智能筛选适合无货源分销的优质商品</span>
                </div>
                <p className="text-sm text-blue-800">系统从以下方面评估商品分销潜力：</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
                  <div className="flex items-center gap-2 text-sm text-blue-700 bg-white bg-opacity-70 p-2 rounded border border-blue-100">
                    <DollarSign className="w-4 h-4 text-green-500" />
                    <span>分销利润空间</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-blue-700 bg-white bg-opacity-70 p-2 rounded border border-blue-100">
                    <Fire className="w-4 h-4 text-red-500" />
                    <span>市场热度与爆款潜力</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-blue-700 bg-white bg-opacity-70 p-2 rounded border border-blue-100">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <span>售后风险评估</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 工具栏 */}
        <div className="content-section">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* 筛选和排序 */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <select
                    value={filterKeyword}
                    onChange={(e) => setFilterKeyword(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="">全部关键词</option>
                    {keywords.filter(kw => kw.isSelected).map(kw => (
                      <option key={kw.keyword} value={kw.keyword}>{kw.keyword}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <ArrowUpDown className="w-4 h-4 text-gray-500" />
                  <select
                    value={sortBy}
                    onChange={(e) => handleSort(e.target.value as any)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="score">综合评分</option>
                    <option value="profit">分销利润</option>
                    <option value="popularity">爆款潜力</option>
                    <option value="competition">竞争度</option>
                  </select>
                </div>
              </div>

              {/* 批量操作和统计 */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleSelectAll}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    全选
                  </button>
                  <span className="text-gray-300">|</span>
                  <button
                    onClick={handleIgnoreAll}
                    className="text-sm text-gray-600 hover:text-gray-800"
                  >
                    全部忽略
                  </button>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-gray-600">
                    已采纳 <span className="font-semibold text-green-600">{acceptedProducts.length}</span> 款
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 商品网格 */}
        <div className="content-section">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const profitInfo = getDistributionProfit(product);
              const popularityRating = getPopularityRating(product);
              const competitionRating = getCompetitionRating(product);
              const supplierRating = getSupplierRating(product);
              const riskRating = getAfterSaleRisk(product);
              const mainTag = getProductMainTag(product);
              
              return (
                <div
                  key={product.id}
                  className={cn(
                    "bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all hover:shadow-md",
                    product.isAccepted && "ring-2 ring-green-500 bg-green-50",
                    product.isIgnored && "opacity-60 grayscale"
                  )}
                >
                  {/* 商品图片区域 */}
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden flex items-center justify-center">
                    <Package className="w-16 h-16 text-gray-400" />
                    
                    {/* 右上角评分标签 */}
                    <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded font-medium">
                      {(product.score * 100).toFixed(0)}分
                    </div>
                    
                    {/* 左上角主要标签 */}
                    <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded font-medium flex items-center gap-1">
                      <Star className="w-3 h-3" fill="currentColor" />
                      {mainTag}
                    </div>
                    
                    {/* 左下角爆款潜力标签 */}
                    <div className="absolute bottom-2 left-2 bg-white text-xs px-2 py-1 rounded shadow-sm border border-gray-100">
                      <div className="flex items-center gap-1">
                        <Fire className="w-3 h-3 text-red-600" />
                        <span className={popularityRating.color}>{popularityRating.level}</span>
                      </div>
                    </div>
                    
                    {/* 右下角售后风险标签 */}
                    <div className="absolute bottom-2 right-2 bg-white text-xs px-2 py-1 rounded shadow-sm border border-gray-100">
                      <div className="flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-amber-600" />
                        <span className={riskRating.color}>{riskRating.level}</span>
                      </div>
                    </div>

                    {/* 状态标记 */}
                    {product.isAccepted && (
                      <div className="absolute inset-0 bg-green-500 bg-opacity-20 flex items-center justify-center">
                        <Check className="w-10 h-10 text-green-600 bg-white rounded-full p-2 shadow" />
                      </div>
                    )}
                    
                    {product.isIgnored && (
                      <div className="absolute inset-0 bg-gray-500 bg-opacity-30 flex items-center justify-center">
                        <X className="w-10 h-10 text-red-600 bg-white rounded-full p-2 shadow" />
                      </div>
                    )}
                  </div>

                  {/* 商品信息区域 */}
                  <div className="p-3">
                    {/* 标题和关键词 */}
                    <div className="mb-2">
                      <h4 className="font-medium text-gray-900 line-clamp-1 text-sm">{product.title}</h4>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-xs bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded-sm">
                          #{product.matchedKeyword}
                        </span>
                      </div>
                    </div>

                    {/* 分销价格信息 */}
                    <div className="bg-gray-50 rounded p-2 mb-2">
                      <div className="grid grid-cols-2 gap-1">
                        <div>
                          <div className="text-xs text-gray-500">进货价</div>
                          <div className="text-sm font-bold text-gray-800">
                            ¥{formatCurrency(profitInfo.supplierPrice)}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">建议售价</div>
                          <div className="text-sm font-bold text-gray-800">
                            ¥{formatCurrency(profitInfo.marketPrice)}
                          </div>
                        </div>
                      </div>
                      <div className="mt-1 border-t border-gray-100 pt-1 flex items-center justify-between">
                        <div className="text-xs text-gray-500">预计利润</div>
                        <div className="text-sm font-bold text-green-600">
                          ¥{formatCurrency(profitInfo.amount)} ({profitInfo.rate.toFixed(1)}%)
                        </div>
                      </div>
                    </div>
                    
                    {/* 分销核心指标 */}
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      {/* 竞争情况 */}
                      <div className="bg-gray-50 rounded p-1.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3 text-gray-600" />
                            <span className="text-xs text-gray-600">同行竞争</span>
                          </div>
                          <span className={`text-xs font-medium ${competitionRating.color}`}>
                            {competitionRating.value}
                          </span>
                        </div>
                      </div>
                      
                      {/* 供应商评级 */}
                      <div className="bg-gray-50 rounded p-1.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Truck className="w-3 h-3 text-gray-600" />
                            <span className="text-xs text-gray-600">供应商</span>
                          </div>
                          <span className={`text-xs font-medium ${supplierRating.color}`}>
                            {supplierRating.level}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 其他信息 */}
                    <div className="border-t border-gray-100 pt-2 mb-2">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <div className="flex items-center gap-1">
                          <Truck className="w-3 h-3 text-gray-500" />
                          <span className="text-gray-600">发货时效</span>
                        </div>
                        <span className="text-gray-800">{supplierRating.ship}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1">
                          <ThumbsDown className="w-3 h-3 text-gray-500" />
                          <span className="text-gray-600">退款率</span>
                        </div>
                        <span className={riskRating.color}>{riskRating.value}</span>
                      </div>
                    </div>

                    {/* 操作按钮 */}
                    {!product.isIgnored && (
                      <div className="flex space-x-2">
                        {!product.isAccepted ? (
                          <>
                            <button
                              onClick={() => handleAcceptProduct(product.id)}
                              className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs font-medium py-1.5 px-2 rounded transition-colors flex items-center justify-center gap-1"
                            >
                              <ShoppingCart className="w-3 h-3" />
                              采纳
                            </button>
                            <button
                              onClick={() => handleIgnoreProduct(product.id)}
                              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-medium py-1.5 px-2 rounded transition-colors flex items-center justify-center gap-1"
                            >
                              <X className="w-3 h-3" />
                              忽略
                            </button>
                          </>
                        ) : (
                          <div className="flex-1 text-center text-green-600 text-xs font-medium py-1.5 bg-green-100 rounded flex items-center justify-center gap-1">
                            <Check className="w-3 h-3" />
                            已采纳
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* 无数据提示 */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">暂无符合条件的商品</p>
              <p className="text-gray-400 text-sm mt-2">请调整筛选条件或返回上一步修改配置</p>
            </div>
          )}
        </div>
      </div>

      {/* 底部操作栏 */}
      <div className="page-footer">
        <button
          onClick={handlePrev}
          className="btn btn-secondary btn-lg"
        >
          上一步
        </button>
        
        <div className="status-indicator">
          <div className={cn(
            'status-dot',
            acceptedProducts.length > 0 ? 'status-success' : 'status-warning'
          )}></div>
          <span className="text-sm">
            {acceptedProducts.length > 0 ? (
              <>已选择 <span className="font-semibold text-primary">{acceptedProducts.length}</span> 款商品</>
            ) : (
              <span className="text-tertiary">请选择要采纳的商品</span>
            )}
          </span>
        </div>

        <button
          onClick={handleNext}
          disabled={acceptedProducts.length === 0}
          className={cn(
            'btn btn-primary btn-lg',
            'inline-flex items-center gap-2'
          )}
        >
          <Edit className="w-4 h-4" />
          配置上货 ({acceptedProducts.length})
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
} 