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

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // 流程控制
      currentStep: 1,
      isLoading: false,
      
      // 业务数据
      selectedCategories: mockCategories.filter(cat => cat.isSelected),
      selectedStrategies: [],
      keywords: [],
      params: initialParams,
      recommendedProducts: [],
      acceptedProducts: [],
      listingLogs: [],
      
      // 操作方法
      setCurrentStep: (step: number) => set({ currentStep: step }),
      
      updateCategories: (categories: CategoryData[]) => {
        set({ selectedCategories: categories })
      },
      
      updateStrategies: (strategies: StrategyConfig[]) => {
        set({ selectedStrategies: strategies })
        
        // 根据选中的策略更新默认参数
        if (strategies.length > 0) {
          const avgParams = strategies.reduce((acc, strategy) => ({
            growthRate: acc.growthRate + strategy.params.growthThreshold / strategies.length,
            competition: acc.competition + strategy.params.competitionThreshold / strategies.length,
            profitMargin: acc.profitMargin + strategy.params.profitThreshold / strategies.length
          }), { growthRate: 0, competition: 0, profitMargin: 0 })
          
          set({ params: avgParams })
        }
      },
      
      updateKeywords: (keywords: KeywordData[]) => {
        set({ keywords })
      },
      
      updateParams: (params: SelectionParams) => {
        set({ params })
      },
      
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
      
      resetFlow: () => {
        set({
          currentStep: 1,
          isLoading: false,
          selectedCategories: mockCategories.filter(cat => cat.isSelected),
          selectedStrategies: [],
          keywords: [],
          params: initialParams,
          recommendedProducts: [],
          acceptedProducts: [],
          listingLogs: []
        })
      },
      
      // 计算属性
      canProceedToNextStep: () => {
        const state = get()
        switch (state.currentStep) {
          case 1:
            return state.selectedCategories.length > 0 && state.selectedCategories.length <= 3
          case 2:
            return state.selectedStrategies.length > 0 && state.selectedStrategies.length <= 3
          case 3:
            return state.keywords.filter(k => k.isSelected).length > 0
          case 4:
            return state.acceptedProducts.length > 0
          case 5:
            return true
          default:
            return false
        }
      }
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