'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'
import { mockStrategies } from '@/lib/mock-data'
import { TrendingUp, Search, DollarSign, ChevronRight, Settings } from 'lucide-react'
import type { StrategyConfig } from '@/lib/types'

const strategyIcons = {
  trend: TrendingUp,
  blueOcean: Search,
  highProfit: DollarSign
}

const strategyColors = {
  trend: '#ef4444', // 红色
  blueOcean: '#3b82f6', // 蓝色
  highProfit: '#10b981' // 绿色
}

export default function StepStrategy() {
  const { selectedCategories, selectedStrategies, updateStrategies, setCurrentStep, canProceedToNextStep } = useStore()
  const [strategies, setStrategies] = useState<StrategyConfig[]>(mockStrategies)
  const [showAdvanced, setShowAdvanced] = useState<string | null>(null)

  // 处理策略选择
  const handleStrategyToggle = (strategyId: string) => {
    const updatedStrategies = strategies.map(strategy => {
      if (strategy.id === strategyId) {
        return { ...strategy, isSelected: !strategy.isSelected }
      }
      return strategy
    })
    
    // 限制最多选择3个策略
    const selectedCount = updatedStrategies.filter(s => s.isSelected).length
    if (selectedCount > 3) {
      alert('最多可选择3个策略')
      return
    }
    
    setStrategies(updatedStrategies)
    updateStrategies(updatedStrategies.filter(s => s.isSelected))
  }

  // 处理参数调整
  const handleParamChange = (strategyId: string, paramName: string, value: number) => {
    const updatedStrategies = strategies.map(strategy => {
      if (strategy.id === strategyId) {
        return {
          ...strategy,
          params: {
            ...strategy.params,
            [paramName]: value
          }
        }
      }
      return strategy
    })
    setStrategies(updatedStrategies)
    updateStrategies(updatedStrategies.filter(s => s.isSelected))
  }

  // 处理下一步
  const handleNext = () => {
    if (canProceedToNextStep()) {
      setCurrentStep(3)
    }
  }

  // 处理上一步
  const handlePrev = () => {
    setCurrentStep(1)
  }

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
      {/* 页面标题 */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>选择经营策略</h1>
        <p style={{ color: '#4b5563' }}>
          针对您选择的
          <span style={{ fontWeight: '600', color: 'var(--primary)', marginLeft: '0.25rem', marginRight: '0.25rem' }}>
            {selectedCategories.map(cat => cat.name).join('、')}
          </span>
          类目，推荐以下策略
        </p>
      </div>

      {/* 策略卡片 */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '1.5rem', 
        marginBottom: '2rem' 
      }}>
        {strategies.map((strategy) => {
          const Icon = strategyIcons[strategy.id]
          const colorValue = strategyColors[strategy.id]
          
          return (
            <div key={strategy.id}>
              <div
                onClick={() => handleStrategyToggle(strategy.id)}
                style={{
                  position: 'relative',
                  backgroundColor: strategy.isSelected ? '#eff6ff' : 'var(--card)',
                  borderRadius: '0.75rem',
                  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                  border: strategy.isSelected ? '2px solid var(--primary)' : '1px solid var(--border)',
                  padding: '1.5rem',
                  height: '100%',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  if (!strategy.isSelected) {
                    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!strategy.isSelected) {
                    e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                {/* 图标和标题 */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ 
                    padding: '0.75rem', 
                    borderRadius: '0.5rem', 
                    backgroundColor: '#f9fafb', 
                    marginRight: '0.75rem',
                    color: colorValue
                  }}>
                    <Icon style={{ width: '1.5rem', height: '1.5rem' }} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827' }}>{strategy.name}</h3>
                </div>

                {/* 描述 */}
                <p style={{ color: '#4b5563', marginBottom: '1rem' }}>{strategy.description}</p>

                {/* 默认参数预览 */}
                <div style={{ 
                  backgroundColor: '#f9fafb', 
                  borderRadius: '0.5rem', 
                  padding: '0.75rem', 
                  marginBottom: '1rem' 
                }}>
                  <div style={{ fontSize: '0.875rem', color: '#4b5563' }}>
                    <div style={{ marginBottom: '0.25rem' }}>增长率阈值：≥{strategy.params.growthThreshold}%</div>
                    <div style={{ marginBottom: '0.25rem' }}>竞争度阈值：≤{strategy.params.competitionThreshold}</div>
                    <div>利润率阈值：≥{strategy.params.profitThreshold}%</div>
                  </div>
                </div>

                {/* 高级设置按钮 */}
                {strategy.isSelected && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowAdvanced(showAdvanced === strategy.id ? null : strategy.id)
                    }}
                    style={{
                      color: 'var(--primary)',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.textDecoration = 'underline';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.textDecoration = 'none';
                    }}
                  >
                    <Settings style={{ width: '1rem', height: '1rem', marginRight: '0.25rem' }} />
                    高级设置
                  </button>
                )}

                {/* 选中状态指示 */}
                {strategy.isSelected && (
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                    <div style={{ 
                      width: '1.5rem', 
                      height: '1.5rem', 
                      backgroundColor: 'var(--primary)', 
                      borderRadius: '9999px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center' 
                    }}>
                      <span style={{ color: 'white', fontSize: '0.875rem' }}>✓</span>
                    </div>
                  </div>
                )}
              </div>

              {/* 高级设置面板 */}
              {showAdvanced === strategy.id && strategy.isSelected && (
                <div style={{ 
                  marginTop: '1rem', 
                  backgroundColor: 'var(--card)',
                  borderRadius: '0.75rem',
                  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                  border: '1px solid var(--border)',
                  padding: '1.5rem',
                  animation: 'slideUp 0.3s ease-out'
                }}>
                  <h4 style={{ fontWeight: '600', color: '#111827', marginBottom: '0.75rem' }}>参数微调</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.875rem', color: '#4b5563', display: 'block', marginBottom: '0.25rem' }}>
                        最低增长率 ({strategy.params.growthThreshold}%)
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={strategy.params.growthThreshold}
                        onChange={(e) => handleParamChange(strategy.id, 'growthThreshold', Number(e.target.value))}
                        style={{ width: '100%' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.875rem', color: '#4b5563', display: 'block', marginBottom: '0.25rem' }}>
                        最高竞争度 ({strategy.params.competitionThreshold})
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={strategy.params.competitionThreshold}
                        onChange={(e) => handleParamChange(strategy.id, 'competitionThreshold', Number(e.target.value))}
                        style={{ width: '100%' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.875rem', color: '#4b5563', display: 'block', marginBottom: '0.25rem' }}>
                        最低利润率 ({strategy.params.profitThreshold}%)
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={strategy.params.profitThreshold}
                        onChange={(e) => handleParamChange(strategy.id, 'profitThreshold', Number(e.target.value))}
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* 提示信息 */}
      <div style={{ 
        backgroundColor: '#eff6ff', 
        borderLeft: '4px solid var(--primary)', 
        padding: '1rem', 
        marginBottom: '1.5rem' 
      }}>
        <p style={{ fontSize: '0.875rem', color: '#374151' }}>
          <strong>提示：</strong>您可以选择1-3个策略组合使用。不同策略会影响后续的关键词推荐和商品筛选逻辑。
        </p>
      </div>

      {/* 操作按钮 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          onClick={handlePrev}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.5rem 1rem',
            fontSize: '0.875rem',
            fontWeight: '500',
            borderRadius: '0.5rem',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
            backgroundColor: 'white',
            color: '#374151',
            border: '1px solid var(--border)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f9fafb';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
          }}
        >
          上一步
        </button>
        <div style={{ fontSize: '0.875rem', color: '#4b5563' }}>
          已选择 <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{selectedStrategies.length}</span> 个策略
        </div>
        <button
          onClick={handleNext}
          disabled={!canProceedToNextStep()}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.5rem 1rem',
            fontSize: '0.875rem',
            fontWeight: '500',
            borderRadius: '0.5rem',
            transition: 'all 0.2s ease',
            cursor: canProceedToNextStep() ? 'pointer' : 'not-allowed',
            backgroundColor: 'var(--primary)',
            color: 'white',
            border: 'none',
            opacity: canProceedToNextStep() ? 1 : 0.5
          }}
          onMouseEnter={(e) => {
            if (canProceedToNextStep()) {
              e.currentTarget.style.backgroundColor = 'var(--primary-dark)';
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            }
          }}
          onMouseLeave={(e) => {
            if (canProceedToNextStep()) {
              e.currentTarget.style.backgroundColor = 'var(--primary)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }
          }}
        >
          下一步：配置关键词
          <ChevronRight style={{ width: '1rem', height: '1rem', marginLeft: '0.25rem' }} />
        </button>
      </div>
    </div>
  )
} 