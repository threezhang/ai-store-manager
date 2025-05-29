import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// 样式合并
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 数字格式化
export function formatNumber(num: number, decimals: number = 1): string {
  return num.toFixed(decimals)
}

// 货币格式化
export function formatCurrency(amount: number): string {
  return `¥${amount.toFixed(2)}`
}

// 百分比格式化
export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`
}

// 防抖函数
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// 生成唯一ID
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}

// 计算商品评分
export function calculateProductScore(
  product: { profit: number; competition: number; title: string },
  keywords: string[],
  params: { profitMargin: number; competition: number }
): number {
  // 关键词匹配度计算
  const keywordMatch = keywords.reduce((score, keyword) => {
    return product.title.toLowerCase().includes(keyword.toLowerCase()) ? score + 1 : score
  }, 0) / keywords.length

  // 利润率得分
  const profitScore = Math.min(product.profit / params.profitMargin, 1)
  
  // 竞争度得分（竞争度越低得分越高）
  const competitionScore = Math.max(0, (100 - product.competition) / 100)
  
  // 综合评分：关键词匹配30% + 利润率40% + 竞争度30%
  return keywordMatch * 0.3 + profitScore * 0.4 + competitionScore * 0.3
}

// 延迟函数
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// 获取指标颜色
export function getMetricColor(value: number, type: 'growth' | 'profit' | 'competition'): string {
  switch (type) {
    case 'growth':
    case 'profit':
      if (value >= 50) return 'text-green-600'
      if (value >= 20) return 'text-yellow-600'
      return 'text-red-600'
    case 'competition':
      if (value <= 30) return 'text-green-600'
      if (value <= 60) return 'text-yellow-600'
      return 'text-red-600'
    default:
      return 'text-gray-600'
  }
}

// LocalStorage 操作
export const storage = {
  get<T>(key: string): T | null {
    if (typeof window === 'undefined') return null
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error(`Error getting ${key} from localStorage:`, error)
      return null
    }
  },
  
  set<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Error setting ${key} in localStorage:`, error)
    }
  },
  
  remove(key: string): void {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.removeItem(key)
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error)
    }
  }
} 