'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { 
  Settings, Package, DollarSign, Truck, FileText, Filter,
  ChevronRight, ChevronLeft, Save, AlertTriangle, Info
} from 'lucide-react'

// 配置分类
const configSections = [
  {
    id: 'attributes',
    name: '属性设置',
    icon: Settings,
    description: '商品属性和尺码配置'
  },
  {
    id: 'pricing',
    name: '价格信息',
    icon: DollarSign,
    description: '定价策略和库存管理'
  },
  {
    id: 'service',
    name: '服务承诺',
    icon: Truck,
    description: '发货和售后服务设置'
  },
  {
    id: 'content',
    name: '图文信息',
    icon: FileText,
    description: '标题和关键词优化'
  },
  {
    id: 'filter',
    name: '跳过设置',
    icon: Filter,
    description: '自动过滤和跳过规则'
  }
]

// 默认配置
const defaultConfig = {
  attributes: {
    usePreset: true,
    presetName: '通用模板',
    customAttributes: [],
    forceUse: false
  },
  pricing: {
    priceFormula: 'source_price * 1.5 + 9.90',
    priceMode: 'percentage', // percentage | fixed | formula
    percentage: 150,
    fixedAmount: 9.90,
    keepDecimals: true,
    addShipping: true,
    shippingRate: 100,
    shippingFixed: 0,
    stockSync: true,
    stockMode: 'source', // source | fixed
    fixedStock: 0,
    buyerReduceStock: true
  },
  service: {
    deliveryMode: 'dropship', // dropship | stock
    deliveryTime: '48h', // same_day | next_day | 48h
    returnPolicy: true,
    customerPhone: '15394234332'
  },
  content: {
    titlePrefix: '',
    titleSuffix: '',
    replaceKeywords: [],
    removeKeywords: [],
    autoOptimize: true,
    removeImages: {
      before: 1,
      after: 1,
      specific: []
    }
  },
  filter: {
    skipDuplicate: true,
    skipByCategory: [],
    skipByPriceRange: {
      enabled: false,
      min: 0,
      max: 0
    },
    skipByKeywords: [],
    skipBySkuKeywords: []
  }
}

export default function StepListingConfig() {
  const { 
    acceptedProducts,
    setCurrentStep,
    canProceedToNextStep
  } = useStore()

  const [activeSection, setActiveSection] = useState('attributes')
  const [config, setConfig] = useState(defaultConfig)
  const [isSaved, setIsSaved] = useState(false)

  // 更新配置
  const updateConfig = (section: string, updates: any) => {
    setConfig(prev => ({
      ...prev,
      [section]: { ...prev[section], ...updates }
    }))
    setIsSaved(false)
  }

  // 保存配置
  const handleSave = () => {
    // 这里可以保存到store或API
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }

  // 下一步
  const handleNext = () => {
    setCurrentStep(5) // 跳转到铺货页面
  }

  // 上一步
  const handlePrev = () => {
    setCurrentStep(3) // 返回到商品推荐页面
  }

  const renderAttributesConfig = () => (
    <div className="space-y-6">
      <div className="form-field">
        <label className="form-label">属性预设</label>
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={config.attributes.presetName}
            onChange={(e) => updateConfig('attributes', { presetName: e.target.value })}
            className="form-input flex-1"
            placeholder="输入属性名称"
          />
          <button className="btn btn-secondary">添加为</button>
        </div>
      </div>

      <div className="form-field">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={config.attributes.forceUse}
            onChange={(e) => updateConfig('attributes', { forceUse: e.target.checked })}
            className="mr-2"
          />
          <span className="form-label">强制使用该项设置</span>
        </label>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900">洗发水通用模板</h4>
            <p className="text-sm text-blue-700 mt-1">
              已预设洗发水类目常用属性，包括适用发质、容量规格、主要成分等
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderPricingConfig = () => (
    <div className="space-y-6">
      <div className="form-field">
        <label className="form-label">价格设置</label>
        <div className="flex items-center gap-4">
          <span>售价 = 货源商品</span>
          <select 
            value={config.pricing.priceMode}
            onChange={(e) => updateConfig('pricing', { priceMode: e.target.value })}
            className="form-input"
          >
            <option value="percentage">代发价</option>
            <option value="fixed">固定加价</option>
            <option value="formula">自定义公式</option>
          </select>
          <span>X</span>
          <input
            type="number"
            value={config.pricing.percentage}
            onChange={(e) => updateConfig('pricing', { percentage: parseInt(e.target.value) })}
            className="form-input w-20"
          />
          <span>% +</span>
          <input
            type="number"
            value={config.pricing.fixedAmount}
            onChange={(e) => updateConfig('pricing', { fixedAmount: parseFloat(e.target.value) })}
            className="form-input w-20"
          />
          <span>元</span>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          例：源价格为1000元，则最终价格为：1000 * 150% + 10 = 1510 元
        </p>
      </div>

      <div className="form-field">
        <label className="form-label">小数处理</label>
        <div className="flex items-center gap-6">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="decimals"
              checked={config.pricing.keepDecimals}
              onChange={() => updateConfig('pricing', { keepDecimals: true })}
              className="mr-2"
            />
            <span>保留角分</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="decimals"
              checked={!config.pricing.keepDecimals}
              onChange={() => updateConfig('pricing', { keepDecimals: false })}
              className="mr-2"
            />
            <span>直接去掉小数</span>
          </label>
        </div>
      </div>

      <div className="form-field">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={config.pricing.addShipping}
            onChange={(e) => updateConfig('pricing', { addShipping: e.target.checked })}
            className="mr-2"
          />
          <span className="form-label">追加运费：售卖价额外追加：货源运费 * </span>
          <input
            type="number"
            value={config.pricing.shippingRate}
            onChange={(e) => updateConfig('pricing', { shippingRate: parseInt(e.target.value) })}
            className="form-input w-20 mx-2"
          />
          <span>% + </span>
          <input
            type="number"
            value={config.pricing.shippingFixed}
            onChange={(e) => updateConfig('pricing', { shippingFixed: parseFloat(e.target.value) })}
            className="form-input w-20 mx-2"
          />
          <span>元</span>
        </label>
      </div>

      <div className="form-field">
        <label className="form-label">库存计数</label>
        <div className="flex items-center gap-6">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="stock"
              checked={config.pricing.stockMode === 'source'}
              onChange={() => updateConfig('pricing', { stockMode: 'source' })}
              className="mr-2"
            />
            <span>使用商品来源</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="stock"
              checked={config.pricing.stockMode === 'fixed'}
              onChange={() => updateConfig('pricing', { stockMode: 'fixed' })}
              className="mr-2"
            />
            <span>统一修改库存</span>
            <input
              type="number"
              value={config.pricing.fixedStock}
              onChange={(e) => updateConfig('pricing', { fixedStock: parseInt(e.target.value) })}
              className="form-input w-20 ml-2"
              disabled={config.pricing.stockMode !== 'fixed'}
            />
          </label>
        </div>
      </div>

      <div className="form-field">
        <label className="form-label">库存设置</label>
        <div className="flex items-center gap-6">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="stockReduce"
              checked={config.pricing.buyerReduceStock}
              onChange={() => updateConfig('pricing', { buyerReduceStock: true })}
              className="mr-2"
            />
            <span>买家拍下减库存</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="stockReduce"
              checked={!config.pricing.buyerReduceStock}
              onChange={() => updateConfig('pricing', { buyerReduceStock: false })}
              className="mr-2"
            />
            <span>买家付款减库存</span>
          </label>
        </div>
      </div>
    </div>
  )

  const renderServiceConfig = () => (
    <div className="space-y-6">
      <div className="form-field">
        <label className="form-label">发货模式</label>
        <div className="flex items-center gap-6">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="delivery"
              checked={config.service.deliveryMode === 'dropship'}
              onChange={() => updateConfig('service', { deliveryMode: 'dropship' })}
              className="mr-2"
            />
            <span>现货发货模式</span>
          </label>
        </div>
      </div>

      <div className="form-field">
        <label className="form-label">发货时间</label>
        <div className="flex items-center gap-6">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="deliveryTime"
              checked={config.service.deliveryTime === 'same_day'}
              onChange={() => updateConfig('service', { deliveryTime: 'same_day' })}
              className="mr-2"
            />
            <span>当日发货</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="deliveryTime"
              checked={config.service.deliveryTime === 'next_day'}
              onChange={() => updateConfig('service', { deliveryTime: 'next_day' })}
              className="mr-2"
            />
            <span>次日发货</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="deliveryTime"
              checked={config.service.deliveryTime === '48h'}
              onChange={() => updateConfig('service', { deliveryTime: '48h' })}
              className="mr-2"
            />
            <span>48小时发货</span>
          </label>
        </div>
      </div>

      <div className="form-field">
        <label className="form-label">7天无理由退货</label>
        <div className="flex items-center gap-6">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="returnPolicy"
              checked={!config.service.returnPolicy}
              onChange={() => updateConfig('service', { returnPolicy: false })}
              className="mr-2"
            />
            <span>不支持</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="returnPolicy"
              checked={config.service.returnPolicy}
              onChange={() => updateConfig('service', { returnPolicy: true })}
              className="mr-2"
            />
            <span>支持</span>
          </label>
        </div>
      </div>

      <div className="form-field">
        <label className="form-label">客服电话</label>
        <input
          type="text"
          value={config.service.customerPhone}
          onChange={(e) => updateConfig('service', { customerPhone: e.target.value })}
          className="form-input max-w-xs"
        />
      </div>
    </div>
  )

  const renderContentConfig = () => (
    <div className="space-y-6">
      <div className="form-field">
        <label className="form-label">标题设置</label>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            value={config.content.titlePrefix}
            onChange={(e) => updateConfig('content', { titlePrefix: e.target.value })}
            placeholder="添加前后缀："
            className="form-input"
          />
          <input
            type="text"
            value={config.content.titleSuffix}
            onChange={(e) => updateConfig('content', { titleSuffix: e.target.value })}
            placeholder="+原标题+"
            className="form-input"
          />
        </div>
      </div>

      <div className="form-field">
        <label className="form-label">替换关键词</label>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="替换关键词："
            className="form-input"
          />
          <input
            type="text"
            placeholder="替换成"
            className="form-input"
          />
        </div>
      </div>

      <div className="form-field">
        <label className="form-label">删除关键字</label>
        <textarea
          placeholder="请输入关键词，多个关键词用，或者换行隔开"
          className="form-input min-h-[100px]"
          rows={4}
        />
      </div>

      <div className="form-field">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={config.content.autoOptimize}
            onChange={(e) => updateConfig('content', { autoOptimize: e.target.checked })}
            className="mr-2"
          />
          <span className="form-label">审核失败后自动整改并重新提交审核</span>
        </label>
      </div>

      <div className="form-field">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="mr-2"
          />
          <span className="form-label">删除货源商品第</span>
          <input
            type="number"
            value={config.content.removeImages.before}
            onChange={(e) => updateConfig('content', { 
              removeImages: { ...config.content.removeImages, before: parseInt(e.target.value) }
            })}
            className="form-input w-16 mx-2"
          />
          <span>张主图</span>
        </label>
      </div>
    </div>
  )

  const renderFilterConfig = () => (
    <div className="space-y-6">
      <div className="form-field">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={config.filter.skipDuplicate}
            onChange={(e) => updateConfig('filter', { skipDuplicate: e.target.checked })}
            className="mr-2"
          />
          <span className="form-label">跳过重复铺货链接</span>
        </label>
      </div>

      <div className="form-field">
        <label className="form-label">按类目跳过商品</label>
        <select className="form-input max-w-xs">
          <option>请选择商品类目</option>
        </select>
      </div>

      <div className="form-field">
        <label className="form-label">按价格跳过商品</label>
        <div className="flex items-center gap-4">
          <span>货源价格低于</span>
          <input
            type="number"
            className="form-input w-24"
            placeholder="0"
          />
          <span>元跳过，价格高于</span>
          <input
            type="number"
            className="form-input w-24"
            placeholder="0"
          />
          <span>元跳过</span>
        </div>
        <p className="text-sm text-gray-500 mt-1">取货源代发价计算</p>
      </div>

      <div className="form-field">
        <label className="form-label">按关键字跳过商品</label>
        <textarea
          placeholder="请输入关键词，多个关键词用，或者换行隔开"
          className="form-input min-h-[100px]"
          rows={4}
        />
      </div>

      <div className="form-field">
        <label className="form-label">按关键字跳过sku</label>
        <textarea
          placeholder="请输入关键词，多个关键词用，或者换行隔开"
          className="form-input min-h-[100px]"
          rows={4}
        />
      </div>
    </div>
  )

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'attributes': return renderAttributesConfig()
      case 'pricing': return renderPricingConfig()
      case 'service': return renderServiceConfig()
      case 'content': return renderContentConfig()
      case 'filter': return renderFilterConfig()
      default: return null
    }
  }

  return (
    <div className="page-layout page-enter">
      {/* 页面标题 */}
      <div className="page-header">
        <h1 className="page-title">上货配置</h1>
        <p className="page-description">
          配置 <span className="font-bold text-primary">{acceptedProducts.length}</span> 款商品的上架参数和规则
        </p>
      </div>

      <div className="page-content">
        {/* 配置导航和内容 */}
        <div className="content-section">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* 左侧配置分类导航 */}
            <div className="lg:col-span-1">
              <div className="card card-body p-0">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">配置分类</h3>
                </div>
                <nav className="space-y-1 p-2">
                  {configSections.map((section) => {
                    const Icon = section.icon
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={cn(
                          'w-full flex items-center gap-3 px-3 py-3 text-left text-sm rounded-lg transition-colors',
                          activeSection === section.id
                            ? 'bg-primary text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                        )}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium">{section.name}</div>
                          <div className={cn(
                            'text-xs mt-0.5',
                            activeSection === section.id ? 'text-blue-100' : 'text-gray-500'
                          )}>
                            {section.description}
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </nav>
              </div>
            </div>

            {/* 右侧配置内容 */}
            <div className="lg:col-span-3">
              <div className="card card-body">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {configSections.find(s => s.id === activeSection)?.name}
                  </h3>
                  <button
                    onClick={handleSave}
                    className={cn(
                      'btn btn-sm',
                      isSaved ? 'btn-success' : 'btn-secondary'
                    )}
                  >
                    <Save className="w-4 h-4 mr-1" />
                    {isSaved ? '已保存' : '保存配置'}
                  </button>
                </div>

                <div className="min-h-[400px]">
                  {renderSectionContent()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 预览信息 */}
        <div className="content-section">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-900">配置提醒</h4>
                <p className="text-sm text-amber-700 mt-1">
                  请仔细检查配置参数，这些设置将应用到所有选中的商品。配置完成后点击"开始铺货"执行上架操作。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部操作栏 */}
      <div className="page-footer">
        <button
          onClick={handlePrev}
          className="btn btn-secondary btn-lg"
        >
          <ChevronLeft className="w-4 h-4" />
          上一步
        </button>
        
        <div className="status-indicator">
          <div className="status-dot status-success"></div>
          <span className="text-sm">
            配置 <span className="font-semibold text-primary">{acceptedProducts.length}</span> 款商品
          </span>
        </div>

        <button
          onClick={handleNext}
          className="btn btn-primary btn-lg inline-flex items-center gap-2"
        >
          <Package className="w-4 h-4" />
          开始铺货
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
} 