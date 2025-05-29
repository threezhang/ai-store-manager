'use client'

import { useStore } from '@/lib/store'
import StepNavigation from '@/components/business/step-navigation'
import StepCategory from '@/components/steps/step-category'
import StepStrategy from '@/components/steps/step-strategy'
import StepKeywords from '@/components/steps/step-keywords'
import StepRecommendation from '@/components/steps/step-recommendation'
import StepListing from '@/components/steps/step-listing'
import Sidebar from '@/components/business/sidebar'

export default function Home() {
  const { currentStep, isLoading } = useStore()

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
        {/* 顶部导航栏 */}
        <header style={{ 
          backgroundColor: 'var(--card)', 
          borderBottom: '1px solid var(--border)',
          padding: '1.5rem 2rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <h1 style={{ 
              fontSize: '1.875rem', 
              fontWeight: 'bold', 
              color: 'var(--foreground)', 
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              AI店长 
              <span style={{ 
                fontSize: '0.75rem', 
                fontWeight: 'normal', 
                color: 'white',
                backgroundColor: 'var(--primary)',
                padding: '0.125rem 0.5rem',
                borderRadius: '9999px'
              }}>v0.2</span>
            </h1>
            <p style={{ 
              fontSize: '0.875rem', 
              color: 'var(--muted)', 
              marginTop: '0.375rem',
              maxWidth: '36rem'
            }}>
              智能选品，精准营销，提升分销效率
            </p>
          </div>
        </header>
        
        {/* 步骤导航 */}
        <StepNavigation />
        
        {/* 主内容区 */}
        <main style={{ 
          flex: 1, 
          overflowY: 'auto', 
          padding: '2rem',
          backgroundColor: 'var(--background)'
        }}>
          <div style={{ 
            maxWidth: '1200px', 
            margin: '0 auto',
            animation: 'fadeIn 0.3s ease-out'
          }}>
            {/* 根据当前步骤渲染对应组件 */}
            {currentStep === 1 && <StepCategory />}
            {currentStep === 2 && <StepStrategy />}
            {currentStep === 3 && <StepKeywords />}
            {currentStep === 4 && <StepRecommendation />}
            {currentStep === 5 && <StepListing />}
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
