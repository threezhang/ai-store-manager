'use client'

import { useState, useEffect, useMemo } from 'react'
import { useStore } from '@/lib/store'
import { mockCategories } from '@/lib/mock-data'
import { cn, formatPercentage } from '@/lib/utils'
import { Star, TrendingUp, DollarSign, Package, ArrowRight, Lightbulb, CheckCircle2, Search, Filter, Zap, Shield, Target, BarChart3 } from 'lucide-react'
import type { CategoryData } from '@/lib/types'

export default function StepCategory() {
  const { selectedCategories, updateCategories, setCurrentStep, canProceedToNextStep } = useStore()
  const [categories, setCategories] = useState<CategoryData[]>(mockCategories)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState<'all' | 'hot' | 'potential' | 'other'>('all')

  // 筛选和搜索逻辑
  const filteredCategories = useMemo(() => {
    let filtered = categories

    // 分类筛选
    if (filterCategory !== 'all') {
      filtered = filtered.filter(cat => cat.category === filterCategory)
    }

    // 搜索筛选
    if (searchQuery.trim()) {
      filtered = filtered.filter(cat => 
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // 排序：推荐的在前，按推荐指数排序
    return filtered.sort((a, b) => {
      if (a.isRecommended && !b.isRecommended) return -1
      if (!a.isRecommended && b.isRecommended) return 1
      return b.metrics.recommendScore - a.metrics.recommendScore
    })
  }, [categories, searchQuery, filterCategory])

  // 处理类目选择
  const handleCategoryToggle = (categoryId: string) => {
    const updatedCategories = categories.map(cat => {
      if (cat.id === categoryId) {
        return { ...cat, isSelected: !cat.isSelected }
      }
      return cat
    })
    setCategories(updatedCategories)
    updateCategories(updatedCategories.filter(cat => cat.isSelected))
  }

  // 处理下一步
  const handleNext = () => {
    if (canProceedToNextStep()) {
      setCurrentStep(2)
    }
  }

  // 移除选中类目
  const removeSelectedCategory = (categoryId: string) => {
    handleCategoryToggle(categoryId)
  }

  // 获取竞争激烈度文本
  const getCompetitionText = (level: number): string => {
    const levels = ['', '竞争较小', '竞争一般', '竞争激烈', '竞争很激烈', '竞争极激烈']
    return levels[level] || ''
  }

  // 获取难度文本  
  const getDifficultyText = (level: number): string => {
    const levels = ['', '容易上手', '稍有难度', '中等难度', '较难上手', '门槛很高']
    return levels[level] || ''
  }

  // 获取推荐指数颜色
  const getScoreColor = (score: number): string => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-blue-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-gray-600'
  }

  return (
    <div className="page-layout page-enter">
      {/* 页面标题 */}
      <div className="page-header">
        <h1 className="page-title">选择经营类目</h1>
        <p className="page-description">基于市场数据分析，为您推荐最具潜力的经营类目</p>
      </div>

      <div className="page-content">
        {/* 优化的AI推荐说明 */}
        <div className="ai-recommendation-simple content-section">
          <Lightbulb className="ai-icon" />
          <div className="ai-recommendation-content">
            <span className="ai-badge">AI 推荐</span>
            基于市场趋势、竞争分析和利润空间综合评估，
            <Star className="inline w-4 h-4 mx-1 text-accent" fill="currentColor" />
            标记为AI推荐，建议优先选择高分类目。
          </div>
        </div>

        {/* 优化的搜索和筛选栏 */}
        <div className="search-filter-section content-section">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* 搜索框 */}
            <div className="search-input-wrapper">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="搜索类目名称或描述..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input pl-10"
              />
            </div>
            
            {/* 分类筛选 */}
            <div className="filter-buttons-group">
              {[
                { key: 'all', label: '全部类目', count: categories.length },
                { key: 'hot', label: '热门推荐', count: categories.filter(c => c.category === 'hot').length },
                { key: 'potential', label: '高潜力', count: categories.filter(c => c.category === 'potential').length },
                { key: 'other', label: '其他类目', count: categories.filter(c => c.category === 'other').length }
              ].map(({ key, label, count }) => (
                <button
                  key={key}
                  onClick={() => setFilterCategory(key as any)}
                  className={cn(
                    'btn btn-sm transition-all',
                    filterCategory === key ? 'btn-primary' : 'btn-secondary'
                  )}
                >
                  {label} ({count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 已选类目预览 */}
        {selectedCategories.length > 0 && (
          <div className="selected-categories-preview content-section">
            <div className="selected-categories-title">
              <CheckCircle2 className="w-5 h-5 text-success" />
              已选择的类目 ({selectedCategories.length}/3)
            </div>
            <div className="flex flex-wrap gap-3">
              {selectedCategories.map((category) => (
                <div
                  key={category.id}
                  className="selected-category-tag"
                >
                  {category.name}
                  <div
                    onClick={() => removeSelectedCategory(category.id)}
                    className="selected-category-remove"
                  >
                    ×
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 类目卡片网格 */}
        <div className="card-grid content-section">
          {filteredCategories.map((category, index) => (
            <div
              key={category.id}
              className={cn(
                'category-card card-enter',
                category.isRecommended && 'recommended',
                category.isSelected && 'selected'
              )}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => handleCategoryToggle(category.id)}
            >
              {/* 推荐标记或选中标记 */}
              {category.isSelected ? (
                <div className="selected-indicator">
                  ✓
                </div>
              ) : category.isRecommended ? (
                <div className="recommended-badge">
                  <Star className="w-4 h-4" fill="currentColor" />
                </div>
              ) : null}

              {/* 类目名称和描述 */}
              <div className="category-title">{category.name}</div>
              <p className="text-xs text-tertiary mb-4 line-clamp-2">{category.description}</p>

              {/* 核心指标展示 */}
              <div className="space-y-3">
                {/* AI推荐指数 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary" />
                    <span className="text-sm text-secondary">AI推荐指数</span>
                  </div>
                  <div className={cn('font-semibold', getScoreColor(category.metrics.recommendScore))}>
                    {category.metrics.recommendScore}分
                  </div>
                </div>

                {/* 竞争激烈度 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-orange-500" />
                    <span className="text-sm text-secondary">竞争激烈度</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={cn(
                          'w-2 h-2 rounded-full',
                          level <= category.metrics.competitionLevel
                            ? 'bg-orange-500'
                            : 'bg-gray-200'
                        )}
                      />
                    ))}
                    <span className="text-xs text-tertiary ml-1">
                      {getCompetitionText(category.metrics.competitionLevel)}
                    </span>
                  </div>
                </div>

                {/* 入门难度 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-secondary">入门难度</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={cn(
                          'w-2 h-2 rounded-full',
                          level <= category.metrics.difficultyLevel
                            ? 'bg-green-500'
                            : 'bg-gray-200'
                        )}
                      />
                    ))}
                    <span className="text-xs text-tertiary ml-1">
                      {getDifficultyText(category.metrics.difficultyLevel)}
                    </span>
                  </div>
                </div>

                {/* 平均利润率 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-secondary">平均利润率</span>
                  </div>
                  <div className="font-semibold text-blue-600">
                    {formatPercentage(category.metrics.avgProfit)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 无搜索结果提示 */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-12 content-section">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">没有找到匹配的类目</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setFilterCategory('all')
              }}
              className="btn btn-text mt-2"
            >
              重置筛选条件
            </button>
          </div>
        )}

        {/* 提示信息 */}
        <div className="info-banner content-section">
          <p className="info-banner-text">
            <span className="font-semibold">选择建议：</span>
            推荐选择1-3个类目，优先考虑AI推荐指数高、竞争适中、符合自身能力的类目。
          </p>
        </div>
      </div>

      {/* 页面底部操作区 */}
      <div className="page-footer">
        <div className="flex items-center gap-4">
          <div className="status-indicator">
            <div className={cn(
              'status-dot',
              selectedCategories.length > 0 ? 'status-success' : 'status-warning'
            )}></div>
            <span className="text-sm">
              已选择 <span className="font-semibold text-primary">{selectedCategories.length}</span> 个类目
              {selectedCategories.length === 0 && <span className="text-tertiary">（至少选择1个）</span>}
              {selectedCategories.length > 3 && <span className="text-danger">（最多选择3个）</span>}
            </span>
          </div>
        </div>
        
        <button
          onClick={handleNext}
          disabled={!canProceedToNextStep() || selectedCategories.length > 3}
          className={cn(
            'btn btn-primary btn-lg',
            'inline-flex items-center gap-2'
          )}
        >
          下一步：选择策略
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
} 