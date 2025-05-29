'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'
import { mockStrategies, getRecommendedKeywordsByCategory } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { 
  TrendingUp, Search, Crown, ArrowRight, 
  Lightbulb, Target, Shield, CheckCircle2, Clock,
  BarChart3, Users, Settings, Zap
} from 'lucide-react'
import type { StrategyConfig } from '@/lib/types'

const strategyIcons = {
  trend: TrendingUp,
  blueOcean: Search,
  premium: Crown
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

export default function StepStrategy() {
  const { selectedCategories, selectedStrategies, updateStrategies, setCurrentStep, canProceedToNextStep } = useStore()
  const [strategies, setStrategies] = useState<StrategyConfig[]>(mockStrategies)
  const [selectedStrategyId, setSelectedStrategyId] = useState<string | null>(
    selectedStrategies.length > 0 ? selectedStrategies[0].id : null
  )

  // 处理策略选择
  const handleStrategySelect = (strategyId: string) => {
    const updatedStrategies = strategies.map(strategy => ({
      ...strategy,
      isSelected: strategy.id === strategyId
    }))
    
    setStrategies(updatedStrategies)
    setSelectedStrategyId(strategyId)
    updateStrategies(updatedStrategies.filter(s => s.isSelected))
  }

  // 处理下一步 - 优化产品流程
  const handleNext = () => {
    if (canProceedToNextStep()) {
      setCurrentStep(3) // 进入关键词精细化配置
    }
  }

  // 快速启动选品 - 跳过关键词配置
  const handleQuickStart = () => {
    if (canProceedToNextStep()) {
      setCurrentStep(4) // 直接进入AI推荐
    }
  }

  // 处理上一步
  const handlePrev = () => {
    setCurrentStep(1)
  }

  const selectedStrategy = strategies.find(s => s.id === selectedStrategyId)

  return (
    <div className="page-layout page-enter">
      {/* 保持统一的页面标题 */}
      <div className="page-header">
        <h1 className="page-title">选择经营策略</h1>
        <p className="page-description">
          针对您选择的
          <span className="font-semibold text-primary mx-1">
            {selectedCategories.map(cat => cat.name).join('、')}
          </span>
          类目，为您推荐3种精准策略，每种策略包含专属关键词
        </p>
      </div>

      <div className="page-content">
        {/* 保持一致的AI推荐样式 */}
        <div className="ai-recommendation-simple content-section">
          <Lightbulb className="ai-icon" />
          <div className="ai-recommendation-content">
            <span className="ai-badge">AI 策略工场</span>
            每种策略都有独特的关键词推荐逻辑，选择策略后可直接查看对应的精准关键词，
            让您的选品决策更加明确和高效。
          </div>
        </div>

        {/* 统一的策略卡片网格 */}
        <div className="strategy-cards-consistent-grid content-section">
          {strategies.map((strategy, index) => {
            const Icon = strategyIcons[strategy.id]
            const colors = strategyColors[strategy.id]
            const isSelected = selectedStrategyId === strategy.id
            
            return (
              <div
                key={strategy.id}
                className={cn(
                  'strategy-card-consistent card-enter',
                  isSelected && 'selected'
                )}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => handleStrategySelect(strategy.id)}
              >
                {/* 策略卡片头部 */}
                <div className="strategy-card-consistent-header">
                  <div className="strategy-title-row-consistent">
                    <div 
                      className="strategy-icon-consistent"
                      style={{ 
                        backgroundColor: colors.light,
                        color: colors.primary 
                      }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="strategy-info-consistent">
                      <h3 className="strategy-name-consistent">{strategy.name}</h3>
                      <p className="strategy-tagline-consistent" style={{ color: colors.primary }}>
                        {strategy.tagline}
                      </p>
                    </div>
                    {isSelected && (
                      <div className="selected-indicator-consistent">
                        <CheckCircle2 className="w-6 h-6" style={{ color: colors.primary }} />
                      </div>
                    )}
                  </div>

                  <p className="strategy-description-consistent">{strategy.description}</p>

                  {/* 策略特征 */}
                  <div className="strategy-characteristics-consistent">
                    <div className="characteristic-item-consistent">
                      <Clock className="w-4 h-4" />
                      <span>{strategy.characteristics.timeframe}</span>
                    </div>
                    <div className="characteristic-item-consistent">
                      <BarChart3 className="w-4 h-4" />
                      <span>{strategy.characteristics.profitLevel}</span>
                    </div>
                    <div className="characteristic-item-consistent">
                      <Shield className="w-4 h-4" />
                      <span>{strategy.characteristics.difficulty}</span>
                    </div>
                  </div>

                  {/* 核心优势标签 */}
                  <div className="core-advantages-consistent">
                    {strategy.coreAdvantages.map((advantage, idx) => (
                      <span 
                        key={idx}
                        className="advantage-tag-consistent"
                        style={{ 
                          backgroundColor: colors.light,
                          color: colors.primary,
                          border: `1px solid ${colors.border}`
                        }}
                      >
                        {advantage}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* 统一风格的策略详情展示区域 */}
        {selectedStrategy && (
          <div className="strategy-detail-consistent-section content-section">
            <div className="strategy-detail-consistent-card">
              <div className="strategy-detail-consistent-header">
                <div className="flex items-center gap-3">
                  <div 
                    className="strategy-detail-consistent-icon"
                    style={{ 
                      backgroundColor: strategyColors[selectedStrategy.id].light,
                      color: strategyColors[selectedStrategy.id].primary
                    }}
                  >
                    {(() => {
                      const Icon = strategyIcons[selectedStrategy.id]
                      return <Icon className="w-6 h-6" />
                    })()}
                  </div>
                  <div>
                    <h3 className="strategy-detail-consistent-title">{selectedStrategy.name} 策略详情</h3>
                    <p className="strategy-detail-consistent-subtitle">查看完整的策略配置和推荐关键词</p>
                  </div>
                </div>
              </div>

              <div className="strategy-detail-consistent-content">
                {/* 关键词预览区 */}
                <div className="detail-section-consistent">
                  <div className="detail-section-consistent-header">
                    <Target className="w-5 h-5 text-primary" />
                    <h4 className="detail-section-consistent-title">推荐关键词 ({(() => {
                      const categoryIds = selectedCategories.map(cat => cat.id)
                      const dynamicKeywords = getRecommendedKeywordsByCategory(categoryIds, selectedStrategy.id)
                      return dynamicKeywords.length > 0 ? dynamicKeywords.length : selectedStrategy.recommendedKeywords.length
                    })()}个)</h4>
                  </div>
                  <div className="keywords-consistent-grid">
                    {(() => {
                      const categoryIds = selectedCategories.map(cat => cat.id)
                      const dynamicKeywords = getRecommendedKeywordsByCategory(categoryIds, selectedStrategy.id)
                      const keywordsToShow = dynamicKeywords.length > 0 ? dynamicKeywords : selectedStrategy.recommendedKeywords
                      
                      return keywordsToShow.map((kw, idx) => (
                        <div key={idx} className="keyword-consistent-card">
                          <div className="keyword-consistent-header">
                            <span className="keyword-consistent-name">{kw.keyword}</span>
                            <span 
                              className="keyword-consistent-type"
                              style={{ 
                                backgroundColor: strategyColors[selectedStrategy.id].light,
                                color: strategyColors[selectedStrategy.id].primary 
                              }}
                            >
                              {kw.type || (selectedStrategy.id === 'trend' ? '热搜词' : selectedStrategy.id === 'blueOcean' ? '长尾词' : '高端词')}
                            </span>
                          </div>
                          <div className="keyword-consistent-metrics">
                            <div className="keyword-metric-consistent">
                              <TrendingUp className="w-3 h-3" />
                              <span>热度 {kw.heat}</span>
                            </div>
                            <div className="keyword-metric-consistent">
                              <Shield className="w-3 h-3" />
                              <span>竞争 {kw.competition}</span>
                            </div>
                          </div>
                          <div className="keyword-consistent-reason">{kw.reason}</div>
                        </div>
                      ))
                    })()}
                  </div>
                </div>

                {/* 两列布局：适用人群和策略参数 */}
                <div className="detail-sections-consistent-row">
                  <div className="detail-section-consistent">
                    <div className="detail-section-consistent-header">
                      <Users className="w-5 h-5 text-secondary" />
                      <h4 className="detail-section-consistent-title">适用人群</h4>
                    </div>
                    <div className="detail-tags-consistent">
                      {selectedStrategy.targetUsers.map((user, idx) => (
                        <span key={idx} className="detail-tag-consistent">
                          {user}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="detail-section-consistent">
                    <div className="detail-section-consistent-header">
                      <Settings className="w-5 h-5 text-tertiary" />
                      <h4 className="detail-section-consistent-title">策略参数</h4>
                    </div>
                    <div className="strategy-params-consistent-grid">
                      <div className="param-consistent-item">
                        <div className="param-consistent-label">最低增长率</div>
                        <div className="param-consistent-value">≥{selectedStrategy.params.growthThreshold}%</div>
                      </div>
                      <div className="param-consistent-item">
                        <div className="param-consistent-label">最高竞争度</div>
                        <div className="param-consistent-value">≤{selectedStrategy.params.competitionThreshold}</div>
                      </div>
                      <div className="param-consistent-item">
                        <div className="param-consistent-label">最低利润率</div>
                        <div className="param-consistent-value">≥{selectedStrategy.params.profitThreshold}%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 统一的策略说明 */}
        <div className="info-banner content-section">
          <p className="info-banner-text">
            <span className="font-semibold">选择说明：</span>
            建议选择一种最适合的策略深度执行。每种策略的关键词推荐逻辑不同，
            确定策略后，AI将基于该策略为您推荐精准商品。
          </p>
        </div>
      </div>

      {/* 统一的页面底部操作区 */}
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
            selectedStrategy ? 'status-success' : 'status-warning'
          )}></div>
          <span className="text-sm">
            {selectedStrategy ? (
              <>
                已选择 <span className="font-semibold text-primary">{selectedStrategy.name}</span> 策略
              </>
            ) : (
              <span className="text-tertiary">请选择一种经营策略</span>
            )}
          </span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleQuickStart}
            disabled={!canProceedToNextStep()}
            className={cn(
              'btn btn-accent btn-lg',
              'inline-flex items-center gap-2'
            )}
          >
            <Zap className="w-4 h-4" />
            快速启动
          </button>
          <button
            onClick={handleNext}
            disabled={!canProceedToNextStep()}
            className={cn(
              'btn btn-primary btn-lg',
              'inline-flex items-center gap-2'
            )}
          >
            精细配置
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
} 