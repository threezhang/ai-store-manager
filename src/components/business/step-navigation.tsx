'use client'

import { useStore } from '@/lib/store'
import { Check, Zap } from 'lucide-react'

const steps = [
  { id: 1, name: '选择类目', description: '确定经营类目方向' },
  { id: 2, name: '策略配置', description: '选择策略并配置关键词' },
  { id: 3, name: 'AI推荐', description: '智能商品推荐' }
]

export default function StepNavigation() {
  const { currentStep, setCurrentStep, canProceedToNextStep } = useStore()

  const handleStepClick = (stepId: number) => {
    // 只允许返回到之前的步骤，或者在满足条件时前进一步
    if (stepId < currentStep || (stepId === currentStep + 1 && canProceedToNextStep())) {
      setCurrentStep(stepId)
    }
  }

  return (
    <div className="bg-card border-b border-border shadow-sm">
      <div className="px-6 py-4">
        {/* 顶部信息行 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">AI智能选品</span>
              <span className="bg-primary text-white px-2 py-0.5 rounded text-xs font-medium">v0.3</span>
            </div>
            <div className="text-sm text-muted">三步闭环，精准营销</div>
          </div>
          
          <div className="flex items-center text-sm text-muted">
            <span>步骤 {currentStep}/3</span>
          </div>
        </div>

        {/* 步骤导航 */}
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <button
                onClick={() => handleStepClick(step.id)}
                className={`
                  flex items-center gap-3 text-left transition-all duration-300 group
                  ${step.id > currentStep ? 'opacity-50 hover:opacity-70' : 'opacity-100'}
                  ${(step.id < currentStep || (step.id === currentStep + 1 && canProceedToNextStep())) 
                    ? 'cursor-pointer' 
                    : step.id > currentStep + 1 ? 'cursor-not-allowed' : 'cursor-default'}
                `}
                disabled={step.id > currentStep + 1 || (step.id === currentStep + 1 && !canProceedToNextStep())}
              >
                <div 
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm transition-all duration-300
                    ${currentStep === step.id 
                      ? 'bg-primary text-white shadow-md transform scale-110' 
                      : step.id < currentStep 
                        ? 'bg-success text-white' 
                        : 'bg-border text-muted'}
                    ${step.id === currentStep && 'shadow-lg'}
                  `}
                >
                  {step.id < currentStep ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    step.id
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div 
                    className={`
                      text-sm font-medium
                      ${currentStep === step.id 
                        ? 'text-primary' 
                        : step.id < currentStep 
                          ? 'text-success-dark' 
                          : 'text-muted'}
                    `}
                  >
                    {step.name}
                  </div>
                  <div 
                    className={`
                      text-xs mt-0.5 step-description
                      ${currentStep === step.id ? 'text-foreground' : 'text-muted'}
                    `}
                  >
                    {step.description}
                  </div>
                </div>
              </button>
              
              {/* 连接线 */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-4 step-connector">
                  <div 
                    className={`
                      h-0.5 rounded-full transition-all duration-500
                      ${step.id < currentStep ? 'bg-success' : 'bg-border'}
                    `} 
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .step-description {
            display: none !important;
          }
        }
        
        @media (max-width: 640px) {
          .step-connector {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
} 