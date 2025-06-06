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

type PageType = 'selection' | 'dashboard' | 'products' | 'analytics' | 'history'

interface StoreState {
  // 当前页面状态
  currentPage: PageType
  setCurrentPage: (page: PageType) => void
  
  // 当前步骤 (1-5)
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
  updateParams: (params: SelectionParams) => void
  recommendedProducts: ProductData[]
  setRecommendedProducts: (products: ProductData[]) => void
  acceptedProducts: ProductData[]
  acceptProduct: (productId: string) => void
  ignoreProduct: (productId: string) => void
  listingLogs: ListingLog[]
  updateListingLogs: (logs: ListingLog[]) => void
  
  // 工具函数
  canProceedToNextStep: () => boolean
  resetStore: () => void
  resetFlow: () => void
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // 当前页面
      currentPage: 'selection',
      setCurrentPage: (page) => set({ currentPage: page }),
      
      // 当前步骤
      currentStep: 1,
      setCurrentStep: (step) => set({ currentStep: step }),
      
      // 类目选择
      selectedCategories: mockCategories.filter(cat => cat.isSelected),
      updateCategories: (categories) => set({ selectedCategories: categories }),
      
      // 策略选择
      selectedStrategies: mockStrategies.filter(strategy => strategy.isSelected),
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
            return state.acceptedProducts.length > 0
          case 4:
            return true // 上货配置完成即可进入下一步
          case 5:
            return true
          default:
            return false
        }
      },
      
      // 重置状态
      resetStore: () => set({
        currentPage: 'selection',
        currentStep: 1,
        selectedCategories: mockCategories.filter(cat => cat.isSelected),
        selectedStrategies: mockStrategies.filter(strategy => strategy.isSelected),
        keywords: [],
        recommendations: [],
        params: initialParams,
        recommendedProducts: [],
        acceptedProducts: [],
        listingLogs: []
      }),
      
      resetFlow: () => set({
        currentStep: 1,
        selectedCategories: mockCategories.filter(cat => cat.isSelected),
        selectedStrategies: mockStrategies.filter(strategy => strategy.isSelected),
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