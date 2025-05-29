'use client'

import { useStore } from '@/lib/store'
import { 
  Home, TrendingUp, Package, LineChart, 
  ShoppingBag, FileText, HelpCircle, Settings,
  ChevronRight
} from 'lucide-react'

const menuItems = [
  { id: 'overview', name: '数据概览', icon: Home, disabled: true },
  { id: 'ai-selection', name: 'AI智能选品', icon: TrendingUp, active: true },
  { id: 'products', name: '商品管理', icon: Package, disabled: true },
  { id: 'analytics', name: '数据分析', icon: LineChart, disabled: true },
  { id: 'orders', name: '订单管理', icon: ShoppingBag, disabled: true },
  { id: 'reports', name: '报表中心', icon: FileText, disabled: true },
]

const bottomItems = [
  { id: 'help', name: '帮助中心', icon: HelpCircle },
  { id: 'settings', name: '系统设置', icon: Settings },
]

export default function Sidebar() {
  const { resetFlow } = useStore()

  return (
    <aside style={{
      width: '260px',
      backgroundColor: 'var(--card)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      boxShadow: 'var(--shadow)',
      position: 'relative',
      zIndex: 10
    }}>
      {/* Logo区域 */}
      <div style={{
        padding: '1.5rem',
        borderBottom: '1px solid var(--border)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{
            width: '2.5rem',
            height: '2.5rem',
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
            borderRadius: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.125rem',
            boxShadow: 'var(--shadow-md)'
          }}>
            AI
          </div>
          <div style={{ marginLeft: '0.75rem' }}>
            <h2 style={{ fontWeight: 'bold', fontSize: '1.125rem', margin: 0 }}>AI店长</h2>
            <p style={{ fontSize: '0.75rem', color: 'var(--muted)', margin: 0 }}>智能分销管理平台</p>
          </div>
        </div>
      </div>

      {/* 主菜单 */}
      <nav style={{ flex: 1, padding: '1.25rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {menuItems.map(item => {
            const Icon = item.icon
            const isActive = item.active
            const isDisabled = item.disabled
            
            return (
              <button
                key={item.id}
                disabled={isDisabled}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.75rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  transition: 'all 0.2s',
                  border: 'none',
                  cursor: isDisabled ? 'not-allowed' : 'pointer',
                  backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
                  color: isActive ? 'var(--primary-dark)' : isDisabled ? 'var(--muted)' : 'var(--foreground)',
                  opacity: isDisabled ? 0.6 : 1,
                  boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isDisabled && !isActive) {
                    e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.04)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isDisabled && !isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                <Icon style={{ 
                  width: '1.25rem', 
                  height: '1.25rem', 
                  marginRight: '0.75rem',
                  color: isActive ? 'var(--primary)' : 'currentColor'
                }} />
                {item.name}
                {isActive && (
                  <ChevronRight style={{ 
                    width: '1rem', 
                    height: '1rem', 
                    marginLeft: 'auto',
                    color: 'var(--primary)'
                  }} />
                )}
              </button>
            )
          })}
        </div>
      </nav>

      {/* 底部菜单 */}
      <div style={{
        padding: '1.25rem',
        borderTop: '1px solid var(--border)'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {bottomItems.map(item => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.75rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  transition: 'all 0.2s',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: 'transparent',
                  color: 'var(--foreground)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.04)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Icon style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.75rem' }} />
                {item.name}
              </button>
            )
          })}
        </div>
      </div>

      {/* 用户信息 */}
      <div style={{
        padding: '1.25rem',
        borderTop: '1px solid var(--border)',
        backgroundColor: 'rgba(0, 0, 0, 0.02)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{
            width: '2.25rem',
            height: '2.25rem',
            backgroundColor: 'var(--primary-light)',
            borderRadius: '50%',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary)',
            fontWeight: 'bold',
            fontSize: '0.875rem',
            boxShadow: 'var(--shadow-sm)'
          }}>DS</div>
          <div style={{ marginLeft: '0.75rem', flex: 1, minWidth: 0 }}>
            <p style={{ 
              fontSize: '0.875rem', 
              fontWeight: '500', 
              margin: 0, 
              overflow: 'hidden', 
              textOverflow: 'ellipsis', 
              whiteSpace: 'nowrap' 
            }}>
              演示账号
            </p>
            <p style={{ 
              fontSize: '0.75rem', 
              color: 'var(--muted)', 
              margin: 0, 
              overflow: 'hidden', 
              textOverflow: 'ellipsis', 
              whiteSpace: 'nowrap' 
            }}>
              demo@aistore.com
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
} 