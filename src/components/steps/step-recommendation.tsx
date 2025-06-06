'use client'

import { useState, useEffect } from 'react'
import { useStore } from '@/lib/store'
import { generateProducts } from '@/lib/mock-data'
import { cn, formatCurrency, formatPercentage, calculateProductScore, delay } from '@/lib/utils'
import { Check, X, Edit, Filter, ArrowUpDown, ShoppingCart, ChevronRight, Lightbulb, Star, Package } from 'lucide-react'
import type { ProductData } from '@/lib/types'

export default function StepRecommendation() {
  const { 
    keywords,
    params,
    recommendedProducts,
    acceptedProducts,
    setRecommendedProducts,
    acceptProduct,
    ignoreProduct,
    setCurrentStep,
    canProceedToNextStep
  } = useStore()

  const [products, setProducts] = useState<ProductData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [sortBy, setSortBy] = useState<'score' | 'profit' | 'competition'>('score')
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
  const handleSort = (type: 'score' | 'profit' | 'competition') => {
    setSortBy(type)
    const sorted = [...products].sort((a, b) => {
      switch (type) {
        case 'score':
          return b.score - a.score
        case 'profit':
          return b.profit - a.profit
        case 'competition':
          return a.competition - b.competition
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

  if (isLoading) {
    return (
      <div className="page-layout">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-gray-600">AI正在为您筛选优质商品...</p>
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
          基于您的配置，AI为您精选了 <span className="font-bold text-primary">{products.length}</span> 款优质商品
        </p>
      </div>

      <div className="page-content">
        {/* AI推荐说明 */}
        <div className="ai-recommendation-simple content-section">
          <Lightbulb className="ai-icon" />
          <div className="ai-recommendation-content">
            <span className="ai-badge">AI 智能选品</span>
            综合分析关键词匹配度、利润空间和竞争程度，为您精准推荐具有潜力的商品
          </div>
        </div>

        {/* 工具栏 */}
        <div className="content-section">
          <div className="card card-body">
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
                    <option value="profit">利润率</option>
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
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className={cn(
                  "card card-body relative transition-all hover:shadow-lg",
                  product.isAccepted && "ring-2 ring-green-500 bg-green-50",
                  product.isIgnored && "opacity-50 grayscale"
                )}
              >
                {/* 商品图片 */}
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 relative overflow-hidden flex items-center justify-center">
                  <Package className="w-12 h-12 text-gray-400" />
                  
                  {/* 评分标签 */}
                  <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-md font-medium">
                    {(product.score * 100).toFixed(0)}分
                  </div>
                  
                  {/* 推荐标记 */}
                  {product.score > 0.8 && (
                    <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                      <Star className="w-3 h-3" fill="currentColor" />
                      优选
                    </div>
                  )}

                  {/* 状态标记 */}
                  {product.isAccepted && (
                    <div className="absolute inset-0 bg-green-500 bg-opacity-20 flex items-center justify-center">
                      <Check className="w-8 h-8 text-green-600 bg-white rounded-full p-1" />
                    </div>
                  )}
                  
                  {product.isIgnored && (
                    <div className="absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
                      <X className="w-8 h-8 text-red-600 bg-white rounded-full p-1" />
                    </div>
                  )}
                </div>

                {/* 商品信息 */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900 line-clamp-2 leading-tight">{product.title}</h4>
                  
                  {/* 关键词标签 */}
                  <div className="flex items-center gap-1">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium">
                      #{product.matchedKeyword}
                    </span>
                  </div>

                  {/* 核心指标 */}
                  <div className="grid grid-cols-3 gap-3 text-center bg-gray-50 rounded-lg p-3">
                    <div>
                      <div className="text-lg font-bold text-gray-900">
                        {formatCurrency(product.price)}
                      </div>
                      <div className="text-xs text-gray-500">售价</div>
                    </div>
                    <div>
                      <div className={cn(
                        "text-lg font-bold",
                        product.profit >= 40 ? "text-green-600" : 
                        product.profit >= 25 ? "text-amber-600" : "text-gray-600"
                      )}>
                        {formatPercentage(product.profit)}
                      </div>
                      <div className="text-xs text-gray-500">利润率</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-blue-600">
                        {product.predictedSales}
                      </div>
                      <div className="text-xs text-gray-500">预测销量</div>
                    </div>
                  </div>

                  {/* 操作按钮 */}
                  {!product.isIgnored && (
                    <div className="flex space-x-2 pt-2">
                      {!product.isAccepted ? (
                        <>
                          <button
                            onClick={() => handleAcceptProduct(product.id)}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1"
                          >
                            <Check className="w-4 h-4" />
                            采纳
                          </button>
                          <button
                            onClick={() => handleIgnoreProduct(product.id)}
                            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1"
                          >
                            <X className="w-4 h-4" />
                            忽略
                          </button>
                        </>
                      ) : (
                        <div className="flex-1 text-center text-green-600 text-sm font-medium py-2 bg-green-100 rounded-lg">
                          ✓ 已采纳
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* 无数据提示 */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
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