'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { 
  Home, TrendingUp, Package, BarChart3, Settings, 
  History, HelpCircle, ChevronLeft, ChevronRight,
  Bell, User, Database, Download, Upload, Target,
  PlayCircle, CheckCircle, Clock, AlertTriangle
} from 'lucide-react'

// 重新设计的导航项目
const navigationItems = [
  {
    id: 'dashboard',
    name: '智能决策中心',
    icon: Home,
    description: '数据驱动决策，抢占先机',
    path: '/dashboard'
  },
  {
    id: 'products',
    name: '智能商品库',
    icon: Package,
    description: 'AI优化选品，打造爆款',
    path: '/products',
    badge: '128'
  },
  {
    id: 'analytics',
    name: '商机洞察雷达',
    icon: BarChart3,
    description: '预测趋势，发现蓝海',
    path: '/analytics'
  },
  {
    id: 'history',
    name: '经营复盘中心',
    description: '记录每一次决策足迹，AI学习成功经验，持续优化您的商业策略',
    icon: History,
    badge: null
  }
]

// 工具和设置
const toolsItems = [
  {
    id: 'import',
    name: '批量导入',
    icon: Upload,
    description: '导入商品链接'
  },
  {
    id: 'export',
    name: '数据导出',
    icon: Download,
    description: '导出商品数据'
  },
  {
    id: 'settings',
    name: '系统设置',
    icon: Settings,
    description: '账号和偏好设置'
  }
]

export default function Sidebar() {
  const { currentStep, acceptedProducts, selectedCategories, currentPage, setCurrentPage } = useStore()
  const [isCollapsed, setIsCollapsed] = useState(false)

  // 处理导航点击
  const handleNavClick = (itemId: string) => {
    if (itemId === 'dashboard' || itemId === 'products' || itemId === 'analytics' || itemId === 'history') {
      setCurrentPage(itemId as any)
    }
  }

  // 处理选品任务点击
  const handleSelectionClick = () => {
    setCurrentPage('selection')
  }

  // 获取当前步骤状态
  const getStepStatus = () => {
    if (currentStep === 5) return { text: '正在上架', color: 'text-green-600', bgColor: 'bg-green-50', icon: CheckCircle }
    if (currentStep >= 4) return { text: '配置中', color: 'text-blue-600', bgColor: 'bg-blue-50', icon: Clock }
    if (selectedCategories.length > 0) return { text: '进行中', color: 'text-orange-600', bgColor: 'bg-orange-50', icon: PlayCircle }
    return { text: '待开始', color: 'text-gray-600', bgColor: 'bg-gray-50', icon: Target }
  }

  const stepStatus = getStepStatus()
  const StatusIcon = stepStatus.icon

  // 快速状态信息
  const quickStats = {
    todayProducts: 12,
    weeklyRevenue: '¥28,439',
    successRate: '94%',
    totalProducts: 128
  }

  if (isCollapsed) {
  return (
      <div className="w-16 bg-white border-r border-gray-200 flex flex-col">
        {/* 折叠状态的Logo */}
        <div className="h-16 flex items-center justify-center border-b border-gray-200">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">AI</span>
          </div>
        </div>

        {/* 选品任务快速入口 */}
        <div className="p-2 border-b border-gray-200">
          <button
            onClick={handleSelectionClick}
            className={cn(
              'w-12 h-12 rounded-lg flex items-center justify-center transition-colors relative group',
              currentPage === 'selection'
                ? 'bg-primary text-white'
                : 'text-orange-600 bg-orange-50 hover:bg-orange-100'
            )}
            title="AI选品任务"
          >
            <Target className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {currentStep}
            </span>
          </button>
      </div>

        {/* 折叠状态的导航 */}
        <nav className="flex-1 py-4">
          <div className="space-y-2 px-2">
            {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={cn(
                    'w-12 h-12 rounded-lg flex items-center justify-center transition-colors relative group',
                    currentPage === item.id
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  )}
                  title={item.name}
                >
                  <Icon className="w-5 h-5" />
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {item.badge}
                    </span>
                )}
              </button>
            )
          })}
        </div>
      </nav>

        {/* 展开按钮 */}
        <div className="p-2 border-t border-gray-200">
          <button
            onClick={() => setIsCollapsed(false)}
            className="w-12 h-12 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
            title="展开侧边栏"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-72 bg-white border-r border-gray-200 flex flex-col">
      {/* 头部Logo和用户信息 */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">AI</span>
          </div>
          <div>
            <h1 className="font-bold text-gray-900">AI店长</h1>
            <p className="text-xs text-gray-500">智能分销管理平台</p>
          </div>
        </div>
        <button
          onClick={() => setIsCollapsed(true)}
          className="p-1 rounded-md text-gray-400 hover:text-gray-600 transition-colors"
          title="收起侧边栏"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* 选品任务状态 - 重点突出 */}
      <div className="p-4 border-b border-gray-200">
        <div className="bg-gradient-to-r from-orange-50 to-blue-50 rounded-xl p-4 border border-orange-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-orange-600" />
              <h3 className="font-semibold text-gray-900 text-sm">AI选品任务</h3>
            </div>
            <div className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
              stepStatus.bgColor,
              stepStatus.color
            )}>
              <StatusIcon className="w-3 h-3" />
              {stepStatus.text}
            </div>
          </div>
          
          <div className="space-y-2 mb-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">当前步骤</span>
              <span className="font-medium text-gray-900">{currentStep}/5</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">已选类目</span>
              <span className="font-medium text-gray-900">{selectedCategories.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">待铺商品</span>
              <span className="font-medium text-gray-900">{acceptedProducts.length}</span>
            </div>
          </div>

          <button
            onClick={handleSelectionClick}
            className={cn(
              "w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-medium transition-all text-sm",
              currentPage === 'selection'
                ? "bg-primary text-white shadow-md"
                : "bg-white text-orange-600 border border-orange-200 hover:bg-orange-50 hover:shadow-md"
            )}
          >
            {currentPage === 'selection' ? (
              <>
                <CheckCircle className="w-4 h-4" />
                当前页面
              </>
            ) : (
              <>
                <PlayCircle className="w-4 h-4" />
                {currentStep <= 3 ? '继续选品' : '查看进度'}
              </>
            )}
          </button>
        </div>
      </div>

      {/* 主要导航 */}
      <nav className="flex-1 py-4 custom-scrollbar overflow-y-auto">
        <div className="px-4 mb-4">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">主要功能</h4>
          <div className="space-y-1">
            {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-all duration-200 group nav-item',
                    currentPage === item.id
                      ? 'bg-primary text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{item.name}</div>
                    <div className={cn(
                      'text-xs mt-0.5',
                      currentPage === item.id ? 'text-blue-100' : 'text-gray-500'
                    )}>
                      {item.description}
                    </div>
                  </div>
                  {item.badge && (
                    <span className={cn(
                      'px-2 py-1 text-xs font-medium rounded-full status-badge',
                      currentPage === item.id 
                        ? 'bg-white bg-opacity-20 text-white' 
                        : 'bg-red-100 text-red-700'
                    )}>
                      {item.badge}
                    </span>
                  )}
              </button>
            )
          })}
        </div>
      </div>

        {/* 快速统计 */}
        <div className="px-4 mb-4">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">今日概览</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-green-50 p-3 rounded-lg stats-card">
              <div className="text-xs text-green-600 font-medium">新增商品</div>
              <div className="text-lg font-bold text-green-700">{quickStats.todayProducts}</div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg stats-card">
              <div className="text-xs text-blue-600 font-medium">成功率</div>
              <div className="text-lg font-bold text-blue-700">{quickStats.successRate}</div>
            </div>
          </div>
        </div>

        {/* 工具和设置 */}
        <div className="px-4">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">工具</h4>
          <div className="space-y-1">
            {toolsItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors text-sm nav-item"
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* 底部用户信息 */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-gray-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-gray-900">演示账号</div>
            <div className="text-xs text-gray-500">demo@aistore.com</div>
          </div>
          <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
            <Bell className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
} 