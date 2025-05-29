'use client'

import { useState, useEffect } from 'react'
import { useStore } from '@/lib/store'
import { generateKeywords } from '@/lib/mock-data'
import { cn, formatPercentage, delay } from '@/lib/utils'
import { X, Plus, Upload, Sparkles, Eye, ChevronRight } from 'lucide-react'
import type { KeywordData } from '@/lib/types'

export default function StepKeywords() {
  const { 
    selectedCategories, 
    selectedStrategies,
    keywords: storedKeywords,
    params,
    updateKeywords,
    updateParams,
    setCurrentStep,
    canProceedToNextStep
  } = useStore()

  const [keywords, setKeywords] = useState<KeywordData[]>([])
  const [newKeyword, setNewKeyword] = useState('')
  const [showPreview, setShowPreview] = useState(false)
  const [previewCount, setPreviewCount] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)

  // 初始化关键词
  useEffect(() => {
    if (storedKeywords.length > 0) {
      setKeywords(storedKeywords)
    } else {
      const categoryIds = selectedCategories.map(cat => cat.id)
      const generatedKeywords = generateKeywords(categoryIds)
      setKeywords(generatedKeywords)
      updateKeywords(generatedKeywords)
    }
  }, [])

  // 处理关键词选择
  const handleKeywordToggle = (keyword: string) => {
    const updatedKeywords = keywords.map(kw => {
      if (kw.keyword === keyword) {
        return { ...kw, isSelected: !kw.isSelected }
      }
      return kw
    })
    setKeywords(updatedKeywords)
    updateKeywords(updatedKeywords)
  }

  // 删除关键词
  const handleKeywordDelete = (keyword: string) => {
    const updatedKeywords = keywords.filter(kw => kw.keyword !== keyword)
    setKeywords(updatedKeywords)
    updateKeywords(updatedKeywords)
  }

  // 添加关键词
  const handleAddKeyword = () => {
    if (newKeyword.trim() && keywords.length < 30) {
      const newKw: KeywordData = {
        keyword: newKeyword.trim(),
        heat: Math.floor(Math.random() * 30) + 50,
        competition: Math.floor(Math.random() * 30) + 30,
        isSelected: true,
        priority: keywords.length + 1
      }
      const updatedKeywords = [...keywords, newKw]
      setKeywords(updatedKeywords)
      updateKeywords(updatedKeywords)
      setNewKeyword('')
    }
  }

  // 模拟图片上传识别
  const handleImageUpload = async () => {
    setIsGenerating(true)
    await delay(1500)
    
    const imageKeywords = ['ins风格', '网红款', '极简设计', '高颜值']
    const newKeywords: KeywordData[] = imageKeywords.map((kw, index) => ({
      keyword: kw,
      heat: Math.floor(Math.random() * 30) + 60,
      competition: Math.floor(Math.random() * 30) + 30,
      isSelected: true,
      priority: keywords.length + index + 1
    }))
    
    const updatedKeywords = [...keywords, ...newKeywords]
    setKeywords(updatedKeywords)
    updateKeywords(updatedKeywords)
    setIsGenerating(false)
  }

  // 预览效果
  const handlePreview = async () => {
    setShowPreview(true)
    // 模拟计算
    await delay(800)
    const selectedKeywords = keywords.filter(kw => kw.isSelected)
    const estimatedCount = Math.floor(selectedKeywords.length * 8 + Math.random() * 20)
    setPreviewCount(estimatedCount)
  }

  // 处理参数变化
  const handleParamChange = (paramName: string, value: number) => {
    updateParams({
      ...params,
      [paramName]: value
    })
  }

  // 处理下一步
  const handleNext = () => {
    if (canProceedToNextStep()) {
      setCurrentStep(4)
    }
  }

  // 处理上一步
  const handlePrev = () => {
    setCurrentStep(2)
  }

  const selectedCount = keywords.filter(kw => kw.isSelected).length

  return (
    <div className="animate-fade-in">
      {/* 页面标题 */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">配置选品参数</h1>
        <p className="text-gray-600">选择关键词并调整筛选参数，AI将基于这些条件为您推荐商品</p>
      </div>

      {/* 关键词池 */}
      <div className="card mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">关键词池</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleImageUpload}
              disabled={isGenerating}
              className="text-sm text-primary hover:underline flex items-center"
            >
              <Upload className="w-4 h-4 mr-1" />
              {isGenerating ? '识别中...' : '上传图片'}
            </button>
            <span className="text-sm text-gray-500">
              已选 {selectedCount}/20
            </span>
          </div>
        </div>

        {/* 关键词标签 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {keywords.map((kw) => (
            <div
              key={kw.keyword}
              className={cn(
                "group relative inline-flex items-center px-3 py-1.5 rounded-full text-sm transition-all cursor-pointer",
                kw.isSelected 
                  ? "bg-primary text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
              onClick={() => handleKeywordToggle(kw.keyword)}
            >
              <span>{kw.keyword}</span>
              <span className="ml-2 text-xs opacity-75">
                热度{kw.heat}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleKeywordDelete(kw.keyword)
                }}
                className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>

        {/* 添加关键词 */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddKeyword()}
            placeholder="输入自定义关键词"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handleAddKeyword}
            className="btn btn-secondary"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 参数配置 */}
      <div className="card mb-6">
        <h3 className="text-lg font-semibold mb-4">筛选参数</h3>
        
        <div className="space-y-6">
          {/* 增长率 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">
                最低增长率
              </label>
              <span className="text-sm text-gray-600">
                {params.growthRate}% (行业均值: 35%)
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={params.growthRate}
              onChange={(e) => handleParamChange('growthRate', Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* 竞争度 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">
                最高竞争度
              </label>
              <span className="text-sm text-gray-600">
                {params.competition} (行业均值: 65)
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={params.competition}
              onChange={(e) => handleParamChange('competition', Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* 利润率 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">
                最低利润率
              </label>
              <span className="text-sm text-gray-600">
                {params.profitMargin}% (行业均值: 25%)
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={params.profitMargin}
              onChange={(e) => handleParamChange('profitMargin', Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        {/* 预览按钮 */}
        <button
          onClick={handlePreview}
          className="mt-4 text-primary text-sm font-medium flex items-center hover:underline"
        >
          <Eye className="w-4 h-4 mr-1" />
          预览选品效果
        </button>

        {/* 预览结果 */}
        {showPreview && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg animate-slide-up">
            <div className="flex items-center text-sm text-gray-700">
              <Sparkles className="w-4 h-4 mr-2 text-primary" />
              预计为您找到约 <span className="font-bold text-primary mx-1">{previewCount}</span> 款商品
            </div>
            <div className="text-xs text-gray-600 mt-1">
              平均利润率 {(params.profitMargin * 1.2).toFixed(1)}%，平均竞争度 {(params.competition * 0.8).toFixed(0)}
            </div>
          </div>
        )}
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
          执行选品
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  )
} 