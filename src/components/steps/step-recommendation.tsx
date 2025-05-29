'use client'

import { useState, useEffect } from 'react'
import { useStore } from '@/lib/store'
import { generateProducts } from '@/lib/mock-data'
import { cn, formatCurrency, formatPercentage, calculateProductScore, delay } from '@/lib/utils'
import { Check, X, Edit, Filter, ArrowUpDown, ShoppingCart, ChevronRight } from 'lucide-react'
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
      
      setProducts(generatedProducts.slice(0, 30)) // 只显示Top 30
      setRecommendedProducts(generatedProducts.slice(0, 30))
      setIsLoading(false)
    }

    if (recommendedProducts.length === 0) {
      generateAndScoreProducts()
    } else {
      setProducts(recommendedProducts)
      setIsLoading(false)
    }
  }, [])

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
      setCurrentStep(5)
    }
  }

  // 处理上一步
  const handlePrev = () => {
    setCurrentStep(3)
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <p className="text-gray-600">AI正在为您筛选优质商品...</p>
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      {/* 页面标题 */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI推荐商品</h1>
        <p className="text-gray-600">
          基于您的配置，AI为您精选了 <span className="font-bold text-primary">{products.length}</span> 款潜力商品
        </p>
      </div>

      {/* 工具栏 */}
      <div className="card mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* 筛选 */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={filterKeyword}
                onChange={(e) => setFilterKeyword(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">全部关键词</option>
                {keywords.filter(kw => kw.isSelected).map(kw => (
                  <option key={kw.keyword} value={kw.keyword}>{kw.keyword}</option>
                ))}
              </select>
            </div>

            {/* 排序 */}
            <div className="flex items-center space-x-2">
              <ArrowUpDown className="w-4 h-4 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => handleSort(e.target.value as any)}
                className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="score">综合评分</option>
                <option value="profit">利润率</option>
                <option value="competition">竞争度</option>
              </select>
            </div>
          </div>

          {/* 批量操作 */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleSelectAll}
              className="text-sm text-primary hover:underline"
            >
              全选
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={handleIgnoreAll}
              className="text-sm text-gray-600 hover:underline"
            >
              全部忽略
            </button>
            <span className="text-gray-300">|</span>
            <span className="text-sm text-gray-600">
              已采纳 <span className="font-bold text-primary">{acceptedProducts.length}</span> 款
            </span>
          </div>
        </div>
      </div>

      {/* 商品列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className={cn(
              "card p-4 relative transition-all",
              product.isAccepted && "ring-2 ring-green-500 bg-green-50",
              product.isIgnored && "opacity-50"
            )}
          >
            {/* 商品图片 */}
            <div className="aspect-square bg-gray-100 rounded-lg mb-3 relative overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              {/* 评分标签 */}
              <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded">
                评分 {(product.score * 100).toFixed(0)}
              </div>
            </div>

            {/* 商品信息 */}
            <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">{product.title}</h4>
            
            {/* 关键词标签 */}
            <div className="text-xs text-primary mb-3">
              #{product.matchedKeyword}
            </div>

            {/* 指标展示 */}
            <div className="grid grid-cols-3 gap-2 text-center mb-3">
              <div>
                <div className="text-sm font-bold text-gray-900">
                  {formatCurrency(product.price)}
                </div>
                <div className="text-xs text-gray-500">售价</div>
              </div>
              <div>
                <div className="text-sm font-bold text-green-600">
                  {formatPercentage(product.profit)}
                </div>
                <div className="text-xs text-gray-500">利润率</div>
              </div>
              <div>
                <div className="text-sm font-bold text-blue-600">
                  {product.predictedSales}
                </div>
                <div className="text-xs text-gray-500">预测销量</div>
              </div>
            </div>

            {/* 操作按钮 */}
            {!product.isIgnored && (
              <div className="flex space-x-2">
                {!product.isAccepted ? (
                  <>
                    <button
                      onClick={() => acceptProduct(product.id)}
                      className="flex-1 btn btn-primary text-sm"
                    >
                      <Check className="w-4 h-4 mr-1" />
                      采纳
                    </button>
                    <button
                      onClick={() => ignoreProduct(product.id)}
                      className="flex-1 btn btn-secondary text-sm"
                    >
                      <X className="w-4 h-4 mr-1" />
                      忽略
                    </button>
                  </>
                ) : (
                  <div className="flex-1 text-center text-green-600 text-sm font-medium py-2">
                    ✓ 已采纳
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 操作按钮 */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrev}
          className="btn btn-secondary"
        >
          上一步
        </button>
        <button
          onClick={handleNext}
          disabled={!canProceedToNextStep()}
          className="btn btn-primary flex items-center"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          一键铺货 ({acceptedProducts.length})
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  )
} 