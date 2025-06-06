'use client'

import { useStore } from '@/lib/store'
import StepNavigation from '@/components/business/step-navigation'
import StepCategory from '@/components/steps/step-category'
import StepStrategy from '@/components/steps/step-strategy'
import StepRecommendation from '@/components/steps/step-recommendation'
import StepListingConfig from '@/components/steps/step-listing-config'
import StepListing from '@/components/steps/step-listing'
import Sidebar from '@/components/business/sidebar'
import Dashboard from '@/components/pages/dashboard'
import Products from '@/components/pages/products'
import Analytics from '@/components/pages/analytics'
import HistoryPage from '@/components/pages/history'

export default function Home() {
  const { currentStep, currentPage, isLoading } = useStore()

  // 渲染当前页面内容
  const renderPageContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'products':
        return <Products />
      case 'analytics':
        return <Analytics />
      case 'history':
        return <HistoryPage />
      case 'selection':
      default:
        // 5步流程页面
        switch (currentStep) {
          case 1:
            return <StepCategory />
          case 2:
            return <StepStrategy />
          case 3:
            return <StepRecommendation />
          case 4:
            return <StepListingConfig />
          case 5:
            return <StepListing />
          default:
            return <StepCategory />
        }
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--background)', display: 'flex' }}>
      {/* 侧边栏 */}
      <Sidebar />
      
      {/* 主内容区 */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* 只在选品流程页面显示步骤导航 */}
        {currentPage === 'selection' && <StepNavigation />}
        
        {/* 主内容区 */}
        <main style={{ 
          flex: 1, 
          overflowY: 'auto', 
          padding: currentPage === 'selection' ? '1.5rem' : '0',
          backgroundColor: 'var(--background)'
        }}>
          <div style={{ 
            maxWidth: currentPage === 'selection' ? '1200px' : '100%', 
            margin: currentPage === 'selection' ? '0 auto' : '0',
            animation: 'fadeIn 0.3s ease-out'
          }}>
            {renderPageContent()}
          </div>
        </main>
      </div>
      
      {/* 全局加载状态 */}
      {isLoading && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50
        }}>
          <div style={{ 
            backgroundColor: 'var(--card)',
            borderRadius: '1rem',
            padding: '1.5rem',
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem',
            boxShadow: 'var(--shadow-xl)'
          }}>
            <div style={{
              width: '2.25rem',
              height: '2.25rem',
              border: '3px solid var(--primary)',
              borderTopColor: 'transparent',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite'
            }}></div>
            <span style={{ 
              color: 'var(--foreground)',
              fontSize: '1rem',
              fontWeight: '500'
            }}>AI正在处理中...</span>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
