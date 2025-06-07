'use client'

import { useState, useEffect } from 'react'
import { useStore } from '@/lib/store'
import { mockStrategies, getRecommendedKeywordsByCategory, generateKeywords } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { 
  ChevronRight, Target, Lightbulb, Star, 
  BarChart3, Users, Settings, Zap, X, Plus,
  Package, Palette, Edit3, ChevronDown, Tag,
  Loader2, Check, AlertCircle, Hash, Filter, TrendingUp, Clock, ArrowRight
} from 'lucide-react'
import type { StrategyConfig, KeywordData } from '@/lib/types'
import StrategyConfigurator from '@/components/strategy-configurator'

const strategyIcons = {
  trend: TrendingUp,
  blueOcean: ChevronRight,
  premium: Star
}

const strategyColors = {
  trend: {
    primary: '#ef4444',
    light: '#fef2f2',
    border: '#fca5a5'
  },
  blueOcean: {
    primary: '#3b82f6',
    light: '#eff6ff',
    border: '#93c5fd'
  },
  premium: {
    primary: '#10b981',
    light: '#f0fdf4',
    border: '#86efac'
  }
}

// 商品属性配置（支持多选）
const ATTRIBUTE_OPTIONS = {
  audience: [
    { label: '家庭用户', icon: Users },
    { label: '年轻女性', icon: Users },
    { label: '上班族', icon: Users },
    { label: '学生群体', icon: Users },
    { label: '新手妈妈', icon: Users },
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

export default function StepStrategy() {
  const { selectedCategories, selectedStrategies, keywords, updateStrategies, updateKeywords, setCurrentStep, canProceedToNextStep } = useStore()
  const [strategies, setStrategies] = useState<StrategyConfig[]>(mockStrategies)
  const [selectedStrategyId, setSelectedStrategyId] = useState<string | null>(
    selectedStrategies.length > 0 ? selectedStrategies[0].id : null
  )
  
  // 关键词相关状态
  const [keywordList, setKeywordList] = useState<KeywordData[]>([])
  const [keywordAttributes, setKeywordAttributes] = useState<{[key: string]: any}>({})
  const [newKeyword, setNewKeyword] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  // 初始化检查：如果有选中策略但没有关键词，则自动生成
  useEffect(() => {
    // 如果有选中的策略但没有关键词，自动生成关键词
    if (selectedStrategyId && keywordList.length === 0 && selectedCategories.length > 0) {
      generateKeywordsForStrategy(selectedStrategyId)
    }
    
    // 如果store中有选中的策略，同步到本地状态
    if (selectedStrategies.length > 0) {
      const updatedStrategies = strategies.map(strategy => ({
        ...strategy,
        isSelected: selectedStrategies.some(s => s.id === strategy.id)
      }))
      setStrategies(updatedStrategies)
      
      if (!selectedStrategyId) {
        setSelectedStrategyId(selectedStrategies[0].id)
      }
    }
  }, [selectedStrategyId, keywordList.length, selectedCategories, selectedStrategies])

  // 组件挂载时的初始化检查
  useEffect(() => {
    // 如果有默认选中的策略但还没有设置selectedStrategyId，则设置它
    const defaultStrategy = strategies.find(s => s.isSelected)
    if (defaultStrategy && !selectedStrategyId && selectedCategories.length > 0) {
      setSelectedStrategyId(defaultStrategy.id)
      // 同步到store
      updateStrategies([defaultStrategy])
      // 生成关键词
      generateKeywordsForStrategy(defaultStrategy.id)
    }
  }, [strategies, selectedStrategyId, selectedCategories])

  // 同步keywords到本地状态
  useEffect(() => {
    if (keywords.length > 0 && keywordList.length === 0) {
      setKeywordList(keywords)
      
      // 初始化属性数据
      const attributesMap = {}
      keywords.filter(kw => kw.isSelected).forEach(kw => {
        if (kw.attributes) {
          attributesMap[kw.keyword] = {
            audience: kw.attributes.audience || ['家庭用户'],
            season: kw.attributes.season || ['四季通用'],
            size: kw.attributes.size || ['标准规格'],
            material: kw.attributes.material || ['环保塑料'],
            style: kw.attributes.style || ['简约现代'],
            tags: kw.tags || ['实用', '优质']
          }
        }
      })
      setKeywordAttributes(attributesMap)
    }
  }, [keywords, keywordList.length])

  // 处理策略选择
  const handleStrategySelect = (strategyId: string) => {
    const updatedStrategies = strategies.map(strategy => ({
      ...strategy,
      isSelected: strategy.id === strategyId
    }))
    
    setStrategies(updatedStrategies)
    setSelectedStrategyId(strategyId)
    updateStrategies(updatedStrategies.filter(s => s.isSelected))
    
    // 选择策略后自动生成关键词
    generateKeywordsForStrategy(strategyId)
  }

  // 根据策略生成关键词
  const generateKeywordsForStrategy = (strategyId: string) => {
    if (selectedCategories.length > 0) {
      const categoryIds = selectedCategories.map(cat => cat.id)
      const recommendedKeywords = getRecommendedKeywordsByCategory(categoryIds, strategyId)
      
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
      
      // 获取补充关键词
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
      setKeywordList(allKeywords)
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
        }
      })
      setKeywordAttributes(attributesMap)
    }
  }

  // 关键词操作函数
  const handleKeywordSelect = (keyword: string) => {
    const updatedKeywords = keywordList.map(kw => {
      if (kw.keyword === keyword) {
        return { ...kw, isSelected: true }
      }
      return kw
    })
    setKeywordList(updatedKeywords)
    updateKeywords(updatedKeywords)
  }

  const handleKeywordRemove = (keyword: string) => {
    const updatedKeywords = keywordList.map(kw => {
      if (kw.keyword === keyword) {
        return { ...kw, isSelected: false }
      }
      return kw
    })
    setKeywordList(updatedKeywords)
    updateKeywords(updatedKeywords)
    
    // 移除属性数据
    setKeywordAttributes(prev => {
      const newAttrs = { ...prev }
      delete newAttrs[keyword]
      return newAttrs
    })
  }

  const handleAddKeyword = () => {
    if (newKeyword.trim() && !keywordList.some(kw => kw.keyword === newKeyword.trim())) {
      const newKw: KeywordData = {
        keyword: newKeyword.trim(),
        heat: Math.floor(Math.random() * 40) + 40,
        competition: Math.floor(Math.random() * 40) + 30,
        isSelected: true,
        priority: keywordList.length + 1,
        type: 'custom'
      }
      const updatedKeywords = [...keywordList, newKw]
      setKeywordList(updatedKeywords)
      updateKeywords(updatedKeywords)
      
      // 为新关键词生成基础属性
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
      setCurrentStep(3) // 直接跳到AI推荐
    }
  }

  const handlePrev = () => {
    setCurrentStep(1)
  }

  const selectedStrategy = strategies.find(s => s.id === selectedStrategyId)
  const selectedKeywords = keywordList.filter(kw => kw.isSelected)
  const availableKeywords = keywordList.filter(kw => !kw.isSelected)

  return (
    <div className="page-layout page-enter">
      {/* 页面标题 */}
      <div className="page-header">
        <h1 className="page-title">选择经营策略</h1>
        <p className="page-description">基于您选择的类目，AI为您推荐合适的经营策略和关键词</p>
      </div>

      <div className="page-content">
        {/* AI推荐说明 - 为无货源分销添加特别提示 */}
        <div className="content-section">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 mb-6">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 rounded-full p-3">
                <Lightbulb className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded font-medium">分销策略</span>
                  <span className="text-blue-700 font-medium">为无货源分销卖家推荐最佳经营策略</span>
                </div>
                <p className="text-sm text-blue-800 mb-2">
                  针对无货源分销模式，选择正确的策略能够帮助您:<br/>
                  1. 找到高利润率、低竞争的优质商品<br/>
                  2. 确保供应商可靠，发货及时，售后风险低<br/>
                  3. 实现快速周转，无需囤货
                </p>
                <div className="bg-white bg-opacity-70 p-2 rounded border border-blue-100 text-sm text-blue-700">
                  <div className="flex items-center gap-2 mb-1">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="font-medium">推荐策略: 蓝海挖掘</span>
                  </div>
                  <p>特别适合无货源分销的商家，能够帮助您找到竞争度低、利润空间大、供应稳定的优质货源</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 策略选择卡片 - 简化版 */}
        <div className="content-section">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {strategies.map((strategy) => {
              const StrategyIcon = strategyIcons[strategy.id]
              const colors = strategyColors[strategy.id]
              const isSelected = strategy.id === selectedStrategyId
              
              return (
                <div
                  key={strategy.id}
                  className={cn(
                    "strategy-card border rounded-xl overflow-hidden transition-all duration-300 cursor-pointer h-fit",
                    isSelected 
                      ? `border-2 shadow-lg` 
                      : "border-gray-200 hover:border-gray-300 hover:shadow-sm",
                    strategy.id === 'blueOcean' && "relative"
                  )}
                  onClick={() => handleStrategySelect(strategy.id)}
                  style={{ 
                    backgroundColor: isSelected ? colors.light : 'white',
                    borderColor: isSelected ? colors.primary : undefined
                  }}
                >
                  {/* 分销商推荐标签 */}
                  {strategy.id === 'blueOcean' && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs px-2 py-1 rounded-full shadow-sm z-10">
                      分销商首选
                    </div>
                  )}

                  <div className="p-5">
                    {/* 策略头部 */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="rounded-full p-2" style={{ backgroundColor: colors.light }}>
                        <StrategyIcon className="w-5 h-5" style={{ color: colors.primary }} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{strategy.name}</h3>
                        <p className="text-sm text-gray-600">{strategy.tagline}</p>
                      </div>
                    </div>
                    
                    {/* 核心数据 - 突出无货源分销关键指标 */}
                    <div className="bg-gray-50 p-3 rounded-lg mb-4">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-gray-500">预期利润率:</span>
                          <span className="ml-1 font-semibold text-green-600">
                            {strategy.filterRules.profitMargin.value}%+
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">竞争店铺:</span>
                          <span className="ml-1 font-semibold text-blue-600">
                            ≤{strategy.filterRules.competitionLevel.value}家
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">增长要求:</span>
                          <span className="ml-1 font-semibold text-orange-600">
                            {strategy.filterRules.salesGrowth.value}%+
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">数据更新:</span>
                          <span className="ml-1 font-semibold text-gray-600">
                            {strategy.dataSupport.analysisFrequency}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 无货源分销优势 */}
                    <div className="space-y-2 mb-4">
                      {strategy.coreAdvantages.slice(0, 3).map((advantage, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span className="text-gray-700">{advantage}</span>
                        </div>
                      ))}
                    </div>

                    {/* 蓝海策略特殊优势 */}
                    {strategy.id === 'blueOcean' && strategy.distributionAdvantages && (
                      <div className="bg-blue-50 p-3 rounded-lg mb-4 border border-blue-100">
                        <div className="text-xs text-blue-600 mb-2 font-medium">无货源分销专属优势</div>
                        <div className="space-y-1">
                          {strategy.distributionAdvantages.slice(0, 2).map((advantage, index) => (
                            <div key={index} className="flex items-center gap-2 text-xs text-blue-700">
                              <Check className="w-3 h-3 text-blue-500 flex-shrink-0" />
                              <span>{advantage}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* 适用场景 */}
                    <div className="text-xs text-gray-500 mb-4">
                      适合: {strategy.targetUsers.slice(0, 2).join('、')}
                    </div>
                  </div>
                  
                  {/* 选择按钮 */}
                  <div 
                    className={cn(
                      "p-3 text-center border-t text-sm font-medium transition-all",
                      isSelected 
                        ? `text-white border-opacity-20` 
                        : "bg-gray-50 text-gray-700 border-gray-100 hover:bg-gray-100"
                    )}
                    style={{
                      backgroundColor: isSelected ? colors.primary : undefined,
                      borderColor: isSelected ? colors.primary : undefined
                    }}
                  >
                    {isSelected ? '✓ 当前选中' : '选择此策略'}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 策略个性化配置器 - 仅在选择策略后显示 */}
        {selectedStrategy && (
          <div className="content-section">
            <StrategyConfigurator 
              strategy={selectedStrategy}
              onConfigChange={(updatedStrategy) => {
                const updatedStrategies = strategies.map(s => 
                  s.id === updatedStrategy.id ? updatedStrategy : s
                )
                setStrategies(updatedStrategies)
                updateStrategies([updatedStrategy])
                
                // 重新生成关键词以反映策略调整
                generateKeywordsForStrategy(updatedStrategy.id)
              }}
            />
          </div>
        )}

        {/* 分隔线 */}
        <div className="content-section">
          <div className="border-t border-gray-200 my-6"></div>
        </div>

        {/* 关键词配置区域 */}
        {selectedStrategy && (
          <div className="content-section">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">第二步：配置关键词属性</h2>
            
            <div className="grid grid-cols-12 gap-6">
              {/* 左侧：已选关键词 */}
              <div className="col-span-8">
                <div className="bg-white rounded-lg border border-gray-200 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">已选关键词 ({selectedKeywords.length})</h3>
                    {selectedKeywords.length > 0 && (
                      <div className="text-xs text-gray-500">
                        策略推荐: {selectedKeywords.filter(kw => kw.type === 'strategy').length} | 
                        自定义: {selectedKeywords.filter(kw => kw.type === 'custom').length}
                      </div>
                    )}
                  </div>

                  {selectedKeywords.length === 0 ? (
                    <div className="text-center py-8">
                      <AlertCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                      <p className="text-gray-500">请先选择经营策略</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {selectedKeywords.map((kw) => {
                        const attributes = keywordAttributes[kw.keyword] || {}
                        return (
                          <div
                            key={kw.keyword}
                            className="border border-gray-200 rounded-lg p-4"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-gray-900">{kw.keyword}</span>
                                {kw.type === 'strategy' && (
                                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-medium">策略推荐</span>
                                )}
                                {kw.type === 'custom' && (
                                  <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs font-medium">自定义</span>
                                )}
                              </div>
                              
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleKeywordRemove(kw.keyword)
                                }}
                                className="text-gray-400 hover:text-red-500 transition-colors p-1"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                            
                            {/* 多维度属性配置 */}
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
                <div className="bg-white rounded-lg border border-gray-200 p-5 sticky top-6">
                  <h3 className="font-semibold text-gray-900 mb-4">关键词库</h3>
                  
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
                  </div>

                  {/* 可选关键词 */}
                  {availableKeywords.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 text-sm text-blue-600 mb-3 p-2 bg-blue-50 rounded">
                        <Lightbulb className="w-3 h-3" />
                        <span>推荐补充</span>
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
          </div>
        )}
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
            selectedStrategy && selectedKeywords.length > 0 ? 'status-success' : 'status-warning'
          )}></div>
          <span className="text-sm">
            {selectedStrategy ? (
              selectedKeywords.length > 0 ? (
                <>已配置 <span className="font-semibold text-primary">{selectedKeywords.length}</span> 个关键词</>
              ) : (
                <span className="text-tertiary">请配置关键词</span>
              )
            ) : (
              <span className="text-tertiary">请选择策略</span>
            )}
          </span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleNext}
            disabled={!canProceedToNextStep()}
            className={cn(
              'btn btn-primary btn-lg',
              'inline-flex items-center gap-2'
            )}
          >
            开始AI选品
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
} 