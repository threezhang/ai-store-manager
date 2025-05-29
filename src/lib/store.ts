import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AppState, CategoryData, StrategyConfig, KeywordData, SelectionParams, ProductData, ListingLog } from './types'
import { mockCategories, mockStrategies } from './mock-data'
import { storage } from './utils'

const initialParams: SelectionParams = {
  growthRate: 30,
  competition: 50,
  profitMargin: 30
}

interface StoreState {
  // 当前步骤 (1-3)
  currentStep: number
  setCurrentStep: (step: number) => void
  
  // 步骤1：类目选择
  selectedCategories: CategoryData[]
  updateCategories: (categories: CategoryData[]) => void
  
  // 步骤2：策略选择和关键词配置（合并）
  selectedStrategies: StrategyConfig[]
  updateStrategies: (strategies: StrategyConfig[]) => void
  
  keywords: KeywordData[]
  updateKeywords: (keywords: KeywordData[]) => void
  
  // 步骤3：AI推荐
  recommendations: ProductData[]
  updateRecommendations: (recommendations: ProductData[]) => void
  
  // 业务数据
  params: SelectionParams
  recommendedProducts: ProductData[]
  acceptedProducts: ProductData[]
  listingLogs: ListingLog[]
  
  // 工具函数
  canProceedToNextStep: () => boolean
  resetStore: () => void
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // 当前步骤
      currentStep: 1,
      setCurrentStep: (step) => set({ currentStep: step }),
      
      // 类目选择
      selectedCategories: mockCategories.filter(cat => cat.isSelected),
      updateCategories: (categories) => set({ selectedCategories: categories }),
      
      // 策略选择
      selectedStrategies: [],
      updateStrategies: (strategies) => set({ selectedStrategies: strategies }),
      
      // 关键词
      keywords: [],
      updateKeywords: (keywords) => set({ keywords }),
      
      // AI推荐
      recommendations: [],
      updateRecommendations: (recommendations) => set({ recommendations }),
      
      // 业务数据
      params: initialParams,
      recommendedProducts: [],
      acceptedProducts: [],
      listingLogs: [],
      
      // 操作方法
      updateParams: (params: SelectionParams) => set({ params }),
      
      setRecommendedProducts: (products: ProductData[]) => {
        set({ recommendedProducts: products })
      },
      
      acceptProduct: (productId: string) => {
        const { recommendedProducts, acceptedProducts } = get()
        const product = recommendedProducts.find(p => p.id === productId)
        if (product && !acceptedProducts.find(p => p.id === productId)) {
          set({ 
            recommendedProducts: recommendedProducts.map(p => 
              p.id === productId ? { ...p, isAccepted: true } : p
            ),
            acceptedProducts: [...acceptedProducts, { ...product, isAccepted: true }]
          })
        }
      },
      
      ignoreProduct: (productId: string) => {
        const { recommendedProducts } = get()
        set({ 
          recommendedProducts: recommendedProducts.map(p => 
            p.id === productId ? { ...p, isIgnored: true } : p
          )
        })
      },
      
      updateListingLogs: (logs: ListingLog[]) => {
        set({ listingLogs: logs })
      },
      
      // 检查是否可以进入下一步
      canProceedToNextStep: () => {
        const state = get()
        switch (state.currentStep) {
          case 1:
            return state.selectedCategories.length > 0
          case 2:
            return state.selectedStrategies.length > 0 && state.keywords.some(kw => kw.isSelected)
          case 3:
            return true
          default:
            return false
        }
      },
      
      // 重置状态
      resetStore: () => set({
        currentStep: 1,
        selectedCategories: mockCategories.filter(cat => cat.isSelected),
        selectedStrategies: [],
        keywords: [],
        recommendations: [],
        params: initialParams,
        recommendedProducts: [],
        acceptedProducts: [],
        listingLogs: []
      })
    }),
    {
      name: 'ai-store-manager',
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name)
          if (!str) return null
          return JSON.parse(str)
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value))
        },
        removeItem: (name) => {
          localStorage.removeItem(name)
        }
      }
    }
  )
) 