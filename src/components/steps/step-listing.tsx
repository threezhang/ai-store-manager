'use client'

import { useState, useEffect } from 'react'
import { useStore } from '@/lib/store'
import { simulateListingStatus } from '@/lib/mock-data'
import { cn, formatCurrency, generateId, delay } from '@/lib/utils'
import { 
  Package, Clock, CheckCircle, XCircle, 
  RefreshCw, Pause, Play, AlertCircle,
  Home
} from 'lucide-react'
import type { ListingLog } from '@/lib/types'

const platformColors = {
  taobao: 'bg-orange-100 text-orange-700',
  douyin: 'bg-pink-100 text-pink-700',
  wechat: 'bg-green-100 text-green-700'
}

const statusIcons = {
  pending: Clock,
  processing: RefreshCw,
  success: CheckCircle,
  failed: XCircle
}

const statusColors = {
  pending: 'text-gray-500',
  processing: 'text-blue-500',
  success: 'text-green-500',
  failed: 'text-red-500'
}

export default function StepListing() {
  const { 
    acceptedProducts,
    listingLogs,
    updateListingLogs,
    resetFlow
  } = useStore()

  const [logs, setLogs] = useState<ListingLog[]>([])
  const [isAutoRetry, setIsAutoRetry] = useState(true)
  const [isPaused, setIsPaused] = useState(false)

  // 初始化铺货任务
  useEffect(() => {
    if (listingLogs.length === 0 && acceptedProducts.length > 0) {
      const initialLogs: ListingLog[] = acceptedProducts.map(product => ({
        id: generateId(),
        productId: product.id,
        product,
        platform: ['taobao', 'douyin', 'wechat'][Math.floor(Math.random() * 3)] as any,
        status: 'pending',
        createdAt: new Date().toISOString()
      }))
      setLogs(initialLogs)
      updateListingLogs(initialLogs)
    } else {
      setLogs(listingLogs)
    }
  }, [])

  // 模拟状态更新
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      const updatedLogs = simulateListingStatus(logs)
      setLogs(updatedLogs)
      updateListingLogs(updatedLogs)
      
      // 自动重试失败的任务
      if (isAutoRetry) {
        const failedLogs = updatedLogs.filter(log => log.status === 'failed')
        if (failedLogs.length > 0) {
          setTimeout(() => {
            const retryLogs = updatedLogs.map(log => 
              log.status === 'failed' 
                ? { ...log, status: 'pending' as const, errorMsg: null } 
                : log
            )
            setLogs(retryLogs)
            updateListingLogs(retryLogs)
          }, 3000)
        }
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [logs, isPaused, isAutoRetry])

  // 统计信息
  const stats = {
    total: logs.length,
    pending: logs.filter(l => l.status === 'pending').length,
    processing: logs.filter(l => l.status === 'processing').length,
    success: logs.filter(l => l.status === 'success').length,
    failed: logs.filter(l => l.status === 'failed').length
  }

  // 手动重试
  const handleRetry = (logId: string) => {
    const updatedLogs = logs.map(log => 
      log.id === logId 
        ? { ...log, status: 'pending' as const, errorMsg: null } 
        : log
    )
    setLogs(updatedLogs)
    updateListingLogs(updatedLogs)
  }

  // 暂停/继续
  const togglePause = () => {
    setIsPaused(!isPaused)
  }

  return (
    <div className="animate-fade-in">
      {/* 页面标题 */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">铺货队列</h1>
        <p className="text-gray-600">
          正在将您采纳的 <span className="font-bold text-primary">{acceptedProducts.length}</span> 款商品上架到各平台
        </p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="card text-center">
          <Package className="w-8 h-8 text-gray-500 mx-auto mb-2" />
          <div className="text-2xl font-bold">{stats.total}</div>
          <div className="text-sm text-gray-600">总任务</div>
        </div>
        <div className="card text-center">
          <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-blue-600">
            {stats.pending + stats.processing}
          </div>
          <div className="text-sm text-gray-600">进行中</div>
        </div>
        <div className="card text-center">
          <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-green-600">{stats.success}</div>
          <div className="text-sm text-gray-600">已成功</div>
        </div>
        <div className="card text-center">
          <XCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
          <div className="text-sm text-gray-600">失败</div>
        </div>
      </div>

      {/* 控制面板 */}
      <div className="card mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={togglePause}
              className="btn btn-secondary flex items-center"
            >
              {isPaused ? (
                <>
                  <Play className="w-4 h-4 mr-1" />
                  继续
                </>
              ) : (
                <>
                  <Pause className="w-4 h-4 mr-1" />
                  暂停
                </>
              )}
            </button>
            
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isAutoRetry}
                onChange={(e) => setIsAutoRetry(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">自动重试失败任务</span>
            </label>
          </div>

          <div className="text-sm text-gray-600">
            成功率: {stats.total > 0 ? ((stats.success / stats.total) * 100).toFixed(0) : 0}%
          </div>
        </div>
      </div>

      {/* 任务列表 */}
      <div className="space-y-3 mb-8">
        {logs.map((log) => {
          const StatusIcon = statusIcons[log.status]
          const statusColor = statusColors[log.status]
          
          return (
            <div key={log.id} className="card p-4">
              <div className="flex items-center space-x-4">
                {/* 商品图片 */}
                <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  {log.product && (
                    <img
                      src={log.product.image}
                      alt={log.product.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* 商品信息 */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 truncate">
                    {log.product?.title || '未知商品'}
                  </h4>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className={cn("text-xs px-2 py-1 rounded", platformColors[log.platform])}>
                      {log.platform === 'taobao' ? '淘宝' : log.platform === 'douyin' ? '抖音' : '微信'}
                    </span>
                    <span className="text-sm text-gray-600">
                      {formatCurrency(log.product?.price || 0)}
                    </span>
                  </div>
                </div>

                {/* 状态信息 */}
                <div className="flex items-center space-x-3">
                  <div className={cn("flex items-center", statusColor)}>
                    <StatusIcon className={cn(
                      "w-5 h-5 mr-1",
                      log.status === 'processing' && "animate-spin"
                    )} />
                    <span className="text-sm">
                      {log.status === 'pending' && '等待中'}
                      {log.status === 'processing' && '上架中'}
                      {log.status === 'success' && '已成功'}
                      {log.status === 'failed' && '失败'}
                    </span>
                  </div>

                  {/* 操作按钮 */}
                  {log.status === 'failed' && (
                    <button
                      onClick={() => handleRetry(log.id)}
                      className="text-sm text-primary hover:underline flex items-center"
                    >
                      <RefreshCw className="w-4 h-4 mr-1" />
                      重试
                    </button>
                  )}
                </div>
              </div>

              {/* 错误信息 */}
              {log.errorMsg && (
                <div className="mt-2 flex items-start text-sm text-red-600">
                  <AlertCircle className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" />
                  <span>{log.errorMsg}</span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* 操作按钮 */}
      <div className="flex justify-center">
        <button
          onClick={() => {
            if (window.confirm('确定要开始新一轮选品吗？当前数据将被清空。')) {
              resetFlow()
            }
          }}
          className="btn btn-primary flex items-center"
        >
          <Home className="w-4 h-4 mr-2" />
          新一轮选品
        </button>
      </div>
    </div>
  )
} 