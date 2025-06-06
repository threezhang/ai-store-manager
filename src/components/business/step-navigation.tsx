'use client'

import { useStore } from '@/lib/store'
import { Check } from 'lucide-react'

const steps = [
  { id: 1, name: '选择类目', description: '确定经营类目方向' },
  { id: 2, name: '策略配置', description: '选择策略并配置关键词' },
  { id: 3, name: 'AI推荐', description: '智能商品推荐' },
  { id: 4, name: '上货配置', description: '配置商品上架参数' },
  { id: 5, name: '一键铺货', description: '快速上架到各平台' }
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
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4">
        {/* 步骤导航 */}
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <button
                onClick={() => handleStepClick(step.id)}
                className={`
                  flex items-center gap-3 text-left transition-all duration-300 group w-full
                  ${step.id > currentStep ? 'opacity-50 hover:opacity-70' : 'opacity-100'}
                  ${(step.id < currentStep || (step.id === currentStep + 1 && canProceedToNextStep())) 
                    ? 'cursor-pointer' 
                    : step.id > currentStep + 1 ? 'cursor-not-allowed' : 'cursor-default'}
                `}
                disabled={step.id > currentStep + 1 || (step.id === currentStep + 1 && !canProceedToNextStep())}
              >
                <div 
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 flex-shrink-0
                    ${currentStep === step.id 
                      ? 'bg-primary text-white shadow-lg transform scale-110' 
                      : step.id < currentStep 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 text-gray-500'}
                    ${step.id === currentStep && 'shadow-primary/25'}
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
                      text-sm font-semibold whitespace-nowrap
                      ${currentStep === step.id 
                        ? 'text-primary' 
                        : step.id < currentStep 
                          ? 'text-green-600' 
                          : 'text-gray-500'}
                    `}
                  >
                    {step.name}
                  </div>
                  <div 
                    className={`
                      text-xs mt-0.5 step-description whitespace-nowrap
                      ${currentStep === step.id ? 'text-gray-700' : 'text-gray-500'}
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
                      ${step.id < currentStep ? 'bg-green-500' : 'bg-gray-200'}
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
          
          .flex-1.mx-4 {
            margin: 0 0.5rem !important;
          }
        }
      `}</style>
    </div>
  )
} 