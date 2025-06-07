'use client'

import React, { useState } from 'react'
import { StrategyConfig } from '@/lib/types'
import { cn } from '@/lib/utils'
import { 
  Settings,
  Zap,
  Target,
  Shield,
  Clock,
  DollarSign,
  TrendingUp,
  Users,
  Package
} from 'lucide-react'

interface StrategyConfiguratorProps {
  strategy: StrategyConfig
  onConfigChange: (config: StrategyConfig) => void
}

export default function StrategyConfigurator({ strategy, onConfigChange }: StrategyConfiguratorProps) {
  
  // 爆款追踪策略专属参数
  const renderTrendParams = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* 热点响应速度 */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-orange-600" />
          <label className="font-medium text-gray-900">热点响应速度</label>
        </div>
        <div className="bg-orange-50 p-3 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">最快响应时间</span>
            <span className="font-semibold text-orange-600">2小时内</span>
          </div>
          <div className="text-xs text-gray-500">
            💡 热点爆发2小时内上架，抢占流量红利期
          </div>
        </div>
      </div>

      {/* 供应商跟进能力 */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Package className="w-4 h-4 text-blue-600" />
          <label className="font-medium text-gray-900">供应商跟进能力</label>
        </div>
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">供应商响应</span>
            <span className="font-semibold text-blue-600">24小时内</span>
          </div>
          <div className="text-xs text-gray-500">
            💡 确保供应商能快速跟进热点商品生产
          </div>
        </div>
      </div>

      {/* 流量获取成本 */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-green-600" />
          <label className="font-medium text-gray-900">流量获取成本</label>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">推广成本</span>
            <span className="font-semibold text-green-600">≤20%营收</span>
          </div>
          <div className="text-xs text-gray-500">
            💡 热点期流量成本相对较低，性价比高
          </div>
        </div>
      </div>
    </div>
  )

  // 蓝海挖掘策略专属参数
  const renderBlueOceanParams = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* 市场空白度 */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-blue-600" />
          <label className="font-medium text-gray-900">市场空白度</label>
        </div>
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">需求空白率</span>
            <span className="font-semibold text-blue-600">≥70%</span>
          </div>
          <div className="text-xs text-gray-500">
            💡 70%以上需求未被满足，市场机会巨大
          </div>
        </div>
      </div>

      {/* 供应商稀缺度 */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-purple-600" />
          <label className="font-medium text-gray-900">供应商稀缺度</label>
        </div>
        <div className="bg-purple-50 p-3 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">竞争店铺密度</span>
            <span className="font-semibold text-purple-600">≤0.3家/万搜索</span>
          </div>
          <div className="text-xs text-gray-500">
            💡 竞争店铺稀少，容易获得市场份额
          </div>
        </div>
      </div>

      {/* 利润保护期 */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-green-600" />
          <label className="font-medium text-gray-900">利润保护期</label>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">低竞争维持期</span>
            <span className="font-semibold text-green-600">≥90天</span>
          </div>
          <div className="text-xs text-gray-500">
            💡 至少3个月的利润保护期，回本有保障
          </div>
        </div>
      </div>
    </div>
  )

  // 长尾稳定策略专属参数
  const renderPremiumParams = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* 需求稳定性 */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-green-600" />
          <label className="font-medium text-gray-900">需求稳定性</label>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">稳定系数</span>
            <span className="font-semibold text-green-600">≥0.85</span>
          </div>
          <div className="text-xs text-gray-500">
            💡 需求波动小，销量可预期，适合稳健经营
          </div>
        </div>
      </div>

      {/* 复购率要求 */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-600" />
          <label className="font-medium text-gray-900">复购率要求</label>
        </div>
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">客户复购率</span>
            <span className="font-semibold text-blue-600">≥35%</span>
          </div>
          <div className="text-xs text-gray-500">
            💡 高复购率确保长期稳定收益
          </div>
        </div>
      </div>

      {/* 操作难度 */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-orange-600" />
          <label className="font-medium text-gray-900">操作难度</label>
        </div>
        <div className="bg-orange-50 p-3 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">新手友好度</span>
            <span className="font-semibold text-orange-600">简单易上手</span>
          </div>
          <div className="text-xs text-gray-500">
            💡 操作简单，新手分销商也能快速掌握
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 rounded-full p-2">
          <Settings className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{strategy.name} - 专属参数</h3>
          <p className="text-sm text-gray-600">基于{strategy.dataSupport.dataSource}的实时数据</p>
        </div>
      </div>

      {/* 根据策略类型渲染不同的参数 */}
      {strategy.id === 'trend' && renderTrendParams()}
      {strategy.id === 'blueOcean' && renderBlueOceanParams()}
      {strategy.id === 'premium' && renderPremiumParams()}

      {/* 策略价值说明 */}
      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <div className="text-sm text-gray-700">
          <p className="font-medium mb-2">🎯 {strategy.name}策略价值：</p>
          {strategy.id === 'trend' && (
            <div className="space-y-1">
              <p>• <strong>快速响应</strong>：2小时内上架热点商品，抢占流量红利</p>
              <p>• <strong>供应保障</strong>：确保供应商能快速跟进生产，不断货</p>
              <p>• <strong>成本控制</strong>：热点期自然流量多，推广成本相对较低</p>
            </div>
          )}
          {strategy.id === 'blueOcean' && (
            <div className="space-y-1">
              <p>• <strong>市场空白</strong>：70%+需求未满足，竞争少利润高</p>
              <p>• <strong>供应稀缺</strong>：竞争店铺稀少，容易获得市场份额</p>
              <p>• <strong>利润保护</strong>：90天+低竞争期，确保回本和持续盈利</p>
            </div>
          )}
          {strategy.id === 'premium' && (
            <div className="space-y-1">
              <p>• <strong>需求稳定</strong>：四季热销，需求波动小，收益可预期</p>
              <p>• <strong>客户忠诚</strong>：35%+复购率，建立稳定客户群体</p>
              <p>• <strong>新手友好</strong>：操作简单，降低试错成本和学习门槛</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 