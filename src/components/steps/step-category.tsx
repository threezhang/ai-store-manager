'use client'

import { useState, useEffect } from 'react'
import { useStore } from '@/lib/store'
import { mockCategories } from '@/lib/mock-data'
import { cn, formatPercentage, getMetricColor } from '@/lib/utils'
import { Star, TrendingUp, DollarSign, Package } from 'lucide-react'
import type { CategoryData } from '@/lib/types'

export default function StepCategory() {
  const { selectedCategories, updateCategories, setCurrentStep, canProceedToNextStep } = useStore()
  const [categories, setCategories] = useState<CategoryData[]>(mockCategories)

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

  // 获取指标颜色
  const getMetricColorStyle = (value: number, type: 'growth' | 'profit' | 'competition'): React.CSSProperties => {
    let color = '#4b5563'; // 默认灰色
    
    switch (type) {
      case 'growth':
      case 'profit':
        if (value >= 50) color = '#16a34a'; // 绿色
        else if (value >= 20) color = '#ca8a04'; // 黄色
        else color = '#dc2626'; // 红色
        break;
      case 'competition':
        if (value <= 30) color = '#16a34a'; // 绿色
        else if (value <= 60) color = '#ca8a04'; // 黄色
        else color = '#dc2626'; // 红色
        break;
    }
    
    return { color };
  }

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
      {/* 页面标题 */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>选择经营类目</h1>
        <p style={{ color: '#4b5563' }}>基于市场数据分析，为您推荐最具潜力的经营类目</p>
      </div>

      {/* 类目卡片网格 */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '1.5rem', 
        marginBottom: '2rem' 
      }}>
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => handleCategoryToggle(category.id)}
            style={{
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: category.isSelected ? '#eff6ff' : 'var(--card)',
              borderRadius: '0.75rem',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
              border: category.isSelected 
                ? '2px solid var(--primary)' 
                : category.isRecommended 
                  ? '2px solid var(--accent)' 
                  : '1px solid var(--border)',
              padding: '1.5rem',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              if (!category.isSelected) {
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              if (!category.isSelected) {
                e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
          >
            {/* 推荐标签 */}
            {category.isRecommended && (
              <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                <Star style={{ width: '1.5rem', height: '1.5rem', color: 'var(--accent)', fill: 'var(--accent)' }} />
              </div>
            )}

            {/* 类目名称 */}
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>{category.name}</h3>

            {/* 指标展示 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.25rem' }}>
                  <TrendingUp style={{ width: '1rem', height: '1rem', color: '#6b7280', marginRight: '0.25rem' }} />
                </div>
                <div style={{ 
                  fontWeight: '600', 
                  fontSize: '1rem',
                  ...getMetricColorStyle(category.metrics.salesGrowth, 'growth')
                }}>
                  {formatPercentage(category.metrics.salesGrowth)}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>销量环比</div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.25rem' }}>
                  <Package style={{ width: '1rem', height: '1rem', color: '#6b7280', marginRight: '0.25rem' }} />
                </div>
                <div style={{ 
                  fontWeight: '600', 
                  fontSize: '1rem',
                  ...getMetricColorStyle(category.metrics.industryGrowth, 'growth')
                }}>
                  {formatPercentage(category.metrics.industryGrowth)}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>行业增速</div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.25rem' }}>
                  <DollarSign style={{ width: '1rem', height: '1rem', color: '#6b7280', marginRight: '0.25rem' }} />
                </div>
                <div style={{ 
                  fontWeight: '600', 
                  fontSize: '1rem',
                  ...getMetricColorStyle(category.metrics.profitMargin, 'profit')
                }}>
                  {formatPercentage(category.metrics.profitMargin)}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>利润率</div>
              </div>
            </div>

            {/* 选中状态指示 */}
            {category.isSelected && (
              <div style={{ position: 'absolute', bottom: '1rem', right: '1rem' }}>
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
        ))}
      </div>

      {/* 提示信息 */}
      <div style={{ 
        backgroundColor: '#eff6ff', 
        borderLeft: '4px solid var(--primary)', 
        padding: '1rem', 
        marginBottom: '1.5rem' 
      }}>
        <p style={{ fontSize: '0.875rem', color: '#374151' }}>
          <strong>提示：</strong>
          <span style={{ display: 'inline-flex', alignItems: 'center', marginLeft: '0.25rem', marginRight: '0.25rem' }}>
            <Star style={{ width: '1rem', height: '1rem', color: 'var(--accent)', fill: 'var(--accent)' }} />
          </span>
          标记的类目为系统强烈推荐，建议优先选择。您可以选择1-3个类目进行经营。
        </p>
      </div>

      {/* 操作按钮 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '0.875rem', color: '#4b5563' }}>
          已选择 <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{selectedCategories.length}</span> 个类目
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
            fontWeight: 500,
            borderRadius: '0.5rem',
            transition: 'all 0.2s ease',
            cursor: canProceedToNextStep() ? 'pointer' : 'not-allowed',
            border: 'none',
            backgroundColor: 'var(--primary)',
            color: 'white',
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
          下一步：选择策略
        </button>
      </div>
    </div>
  )
} 