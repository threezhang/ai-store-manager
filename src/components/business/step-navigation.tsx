'use client'

import { useStore } from '@/lib/store'
import { Check } from 'lucide-react'

const steps = [
  { id: 1, name: '推荐类目', description: '选择经营类目' },
  { id: 2, name: '推荐策略', description: '确定选品策略' },
  { id: 3, name: '关键词配置', description: '设置筛选条件' },
  { id: 4, name: 'AI推荐', description: '智能商品推荐' },
  { id: 5, name: '铺货队列', description: '批量上架商品' }
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
      <div className="px-8 py-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <button
                onClick={() => handleStepClick(step.id)}
                className={`
                  flex flex-col items-center text-center transition-all duration-300
                  ${step.id > currentStep ? 'opacity-50 hover:opacity-70' : 'opacity-100'}
                  ${(step.id < currentStep || (step.id === currentStep + 1 && canProceedToNextStep())) 
                    ? 'cursor-pointer' 
                    : step.id > currentStep + 1 ? 'cursor-not-allowed' : 'cursor-default'}
                `}
                disabled={step.id > currentStep + 1 || (step.id === currentStep + 1 && !canProceedToNextStep())}
              >
                <div 
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 mb-2
                    ${currentStep === step.id 
                      ? 'bg-primary text-white shadow-md transform scale-110' 
                      : step.id < currentStep 
                        ? 'bg-success text-white' 
                        : 'bg-border text-muted'}
                    ${step.id === currentStep && 'shadow-lg'}
                  `}
                >
                  {step.id < currentStep ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    step.id
                  )}
                </div>
                <div>
                  <span 
                    className={`
                      text-sm font-medium block
                      ${currentStep === step.id 
                        ? 'text-primary' 
                        : step.id < currentStep 
                          ? 'text-success-dark' 
                          : 'text-muted'}
                    `}
                  >
                    {step.name}
                  </span>
                  <span 
                    className={`
                      text-xs mt-0.5 block
                      ${currentStep === step.id ? 'text-foreground' : 'text-muted'}
                      step-description
                    `}
                  >
                    {step.description}
                  </span>
                </div>
              </button>
              
              {/* 连接线 */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-4 step-connector">
                  <div 
                    className={`
                      h-1 rounded-full transition-all duration-500
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