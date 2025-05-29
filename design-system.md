# AI店长 0.2 设计规范 (Design System)

## 一、设计原则

### 1.1 核心设计理念
- **智能化交互**：体现AI辅助的智能感，通过动态数据展示和智能推荐突出AI能力
- **人机协同**：强调用户控制权，AI提供建议但用户做最终决策
- **流程化体验**：五步闭环清晰可见，用户始终知道自己在哪一步
- **数据驱动**：通过可视化数据增强用户信任感和决策依据
- **效率导向**：减少认知负担，快速完成选品任务

### 1.2 设计目标
- **专业可信**：体现数据分析的专业性和AI推荐的可靠性
- **易用高效**：降低操作门槛，提升决策效率
- **体验一致**：五步流程中保持一致的交互模式和视觉语言
- **适配灵活**：适应iframe嵌入场景，与0.1版本界面和谐共存

## 二、视觉设计系统

### 2.1 色彩系统

#### 主色调 (Primary Colors)
```css
:root {
  /* 主品牌色 - 智能蓝 */
  --primary: #2563eb;           /* 用于CTA按钮、重要操作 */
  --primary-hover: #1d4ed8;     /* 悬停状态 */
  --primary-light: #dbeafe;     /* 浅色背景、选中状态 */
  --primary-dark: #1e40af;      /* 按下状态 */
  
  /* 辅助色 - 智能紫 */
  --secondary: #7c3aed;         /* 用于AI相关功能 */
  --secondary-hover: #6d28d9;
  --secondary-light: #ede9fe;
  
  /* 强调色 - 推荐金 */
  --accent: #f59e0b;           /* 用于推荐标记、重要提示 */
  --accent-hover: #d97706;
  --accent-light: #fef3c7;
}
```

#### 语义色彩 (Semantic Colors)
```css
:root {
  /* 成功色 - 增长绿 */
  --success: #10b981;          /* 正向指标、成功状态 */
  --success-light: #d1fae5;
  --success-dark: #059669;
  
  /* 警告色 - 注意橙 */
  --warning: #f59e0b;          /* 中性指标、警告信息 */
  --warning-light: #fef3c7;
  
  /* 危险色 - 风险红 */
  --danger: #ef4444;           /* 负向指标、错误状态 */
  --danger-light: #fecaca;
  
  /* 信息色 - 中性蓝 */
  --info: #3b82f6;             /* 信息提示、帮助文本 */
  --info-light: #dbeafe;
}
```

#### 中性色彩 (Neutral Colors)
```css
:root {
  /* 文本色彩层级 */
  --text-primary: #111827;     /* 主要文本 */
  --text-secondary: #374151;   /* 次要文本 */
  --text-tertiary: #6b7280;    /* 辅助文本 */
  --text-disabled: #9ca3af;    /* 禁用文本 */
  
  /* 背景色彩层级 */
  --bg-primary: #ffffff;       /* 主背景 */
  --bg-secondary: #f9fafb;     /* 次级背景 */
  --bg-tertiary: #f3f4f6;      /* 三级背景 */
  --bg-disabled: #e5e7eb;      /* 禁用背景 */
  
  /* 边框色彩 */
  --border-primary: #e5e7eb;   /* 主要边框 */
  --border-secondary: #d1d5db; /* 次要边框 */
  --border-focus: #2563eb;     /* 聚焦边框 */
}
```

### 2.2 字体系统

#### 字体层级
```css
:root {
  /* 大标题 - 页面主标题 */
  --text-4xl: 2.25rem;        /* 36px - 步骤页面标题 */
  --text-3xl: 1.875rem;       /* 30px - 区块标题 */
  --text-2xl: 1.5rem;         /* 24px - 卡片标题 */
  --text-xl: 1.25rem;         /* 20px - 子标题 */
  
  /* 正文字体 */
  --text-base: 1rem;          /* 16px - 正文内容 */
  --text-sm: 0.875rem;        /* 14px - 辅助信息 */
  --text-xs: 0.75rem;         /* 12px - 标签、状态 */
  
  /* 字重 */
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  
  /* 行高 */
  --leading-tight: 1.25;      /* 标题行高 */
  --leading-normal: 1.5;      /* 正文行高 */
  --leading-relaxed: 1.625;   /* 长文本行高 */
}
```

### 2.3 间距系统

#### 标准间距
```css
:root {
  /* 基础间距单位 */
  --space-1: 0.25rem;         /* 4px */
  --space-2: 0.5rem;          /* 8px */
  --space-3: 0.75rem;         /* 12px */
  --space-4: 1rem;            /* 16px */
  --space-5: 1.25rem;         /* 20px */
  --space-6: 1.5rem;          /* 24px */
  --space-8: 2rem;            /* 32px */
  --space-10: 2.5rem;         /* 40px */
  --space-12: 3rem;           /* 48px */
  --space-16: 4rem;           /* 64px */
  
  /* 组件内部间距 */
  --padding-xs: var(--space-2);
  --padding-sm: var(--space-3);
  --padding-md: var(--space-4);
  --padding-lg: var(--space-6);
  --padding-xl: var(--space-8);
  
  /* 组件间距 */
  --margin-xs: var(--space-3);
  --margin-sm: var(--space-4);
  --margin-md: var(--space-6);
  --margin-lg: var(--space-8);
  --margin-xl: var(--space-12);
}
```

### 2.4 圆角系统
```css
:root {
  --radius-sm: 0.25rem;       /* 4px - 小元素 */
  --radius-md: 0.5rem;        /* 8px - 按钮、输入框 */
  --radius-lg: 0.75rem;       /* 12px - 卡片 */
  --radius-xl: 1rem;          /* 16px - 大卡片 */
  --radius-2xl: 1.5rem;       /* 24px - 模态框 */
  --radius-full: 9999px;      /* 圆形 */
}
```

### 2.5 阴影系统
```css
:root {
  /* 卡片阴影层级 */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  
  /* 特殊阴影 */
  --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
  --shadow-outline: 0 0 0 3px rgba(37, 99, 235, 0.1);
}
```

## 三、布局规范

### 3.1 网格系统

#### 主容器规范
```css
/* 页面主容器 */
.main-container {
  max-width: 1200px;          /* 最大宽度限制 */
  margin: 0 auto;             /* 居中对齐 */
  padding: 0 var(--space-8);  /* 左右边距 */
}

/* 内容区域 */
.content-area {
  padding: var(--space-8) 0;  /* 上下边距 */
}

/* 卡片网格 */
.card-grid {
  display: grid;
  gap: var(--space-6);
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
}

/* 响应式调整 */
@media (max-width: 768px) {
  .main-container { padding: 0 var(--space-4); }
  .card-grid { gap: var(--space-4); }
}
```

#### 侧边栏规范
```css
.sidebar {
  width: 240px;                /* 固定宽度 */
  background: var(--bg-primary);
  border-right: 1px solid var(--border-primary);
  box-shadow: var(--shadow-sm);
}

.sidebar-nav {
  padding: var(--space-6) var(--space-4);
}

.sidebar-item {
  padding: var(--space-3) var(--space-4);
  margin-bottom: var(--space-2);
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
}
```

### 3.2 页面布局结构

#### 标准页面模板
```html
<div class="page-layout">
  <!-- 页面头部 -->
  <header class="page-header">
    <h1 class="page-title">步骤标题</h1>
    <p class="page-description">步骤描述</p>
  </header>
  
  <!-- 主内容区 -->
  <main class="page-content">
    <div class="content-grid">
      <!-- 内容区域 -->
    </div>
  </main>
  
  <!-- 页面底部操作区 -->
  <footer class="page-footer">
    <div class="footer-info">状态信息</div>
    <div class="footer-actions">操作按钮</div>
  </footer>
</div>
```

#### 页面尺寸规范
```css
.page-layout {
  min-height: calc(100vh - 140px); /* 减去导航高度 */
  display: flex;
  flex-direction: column;
}

.page-header {
  text-align: center;
  padding: var(--space-8) 0 var(--space-6);
}

.page-content {
  flex: 1;
  padding-bottom: var(--space-8);
}

.page-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-6) 0;
  border-top: 1px solid var(--border-primary);
  margin-top: var(--space-8);
}
```

## 四、组件设计规范

### 4.1 卡片组件

#### 基础卡片规范
```css
.card {
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  transition: all 0.2s ease;
  overflow: hidden;
}

.card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.card-header {
  padding: var(--space-6) var(--space-6) var(--space-4);
  border-bottom: 1px solid var(--border-primary);
}

.card-body {
  padding: var(--space-6);
}

.card-footer {
  padding: var(--space-4) var(--space-6);
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-primary);
}
```

#### 类目卡片专用规范
```css
.category-card {
  position: relative;
  min-height: 200px;
  padding: var(--space-6);
  cursor: pointer;
  transition: all 0.2s ease;
}

.category-card.recommended {
  border: 2px solid var(--accent);
  background: var(--accent-light);
}

.category-card.selected {
  border: 2px solid var(--primary);
  background: var(--primary-light);
  box-shadow: var(--shadow-outline);
}

.category-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
  margin-top: var(--space-4);
}

.metric-item {
  text-align: center;
}

.metric-icon {
  width: 16px;
  height: 16px;
  margin: 0 auto var(--space-2);
  color: var(--text-tertiary);
}

.metric-value {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  margin-bottom: var(--space-1);
}

.metric-label {
  font-size: var(--text-xs);
  color: var(--text-tertiary);
}
```

#### 商品卡片专用规范
```css
.product-card {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all 0.2s ease;
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  background: var(--bg-tertiary);
}

.product-info {
  padding: var(--space-4);
}

.product-title {
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  color: var(--text-primary);
  line-height: var(--leading-tight);
  margin-bottom: var(--space-2);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-metrics {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-3);
  margin: var(--space-3) 0;
}

.product-actions {
  display: flex;
  gap: var(--space-2);
  padding: var(--space-3);
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-primary);
}
```

### 4.2 按钮组件

#### 按钮尺寸规范
```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--font-medium);
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
  text-decoration: none;
}

/* 尺寸变体 */
.btn-xs {
  padding: var(--space-1) var(--space-2);
  font-size: var(--text-xs);
  line-height: 1.25;
}

.btn-sm {
  padding: var(--space-2) var(--space-3);
  font-size: var(--text-sm);
  line-height: 1.25;
}

.btn-md {
  padding: var(--space-3) var(--space-4);
  font-size: var(--text-base);
  line-height: 1.25;
}

.btn-lg {
  padding: var(--space-4) var(--space-6);
  font-size: var(--text-lg);
  line-height: 1.25;
}
```

#### 按钮样式变体
```css
/* 主要按钮 */
.btn-primary {
  background: var(--primary);
  color: white;
}

.btn-primary:hover {
  background: var(--primary-hover);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

/* 次要按钮 */
.btn-secondary {
  background: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-primary);
}

.btn-secondary:hover {
  background: var(--bg-secondary);
  border-color: var(--border-secondary);
}

/* 强调按钮 */
.btn-accent {
  background: var(--accent);
  color: white;
}

.btn-accent:hover {
  background: var(--accent-hover);
}

/* 危险按钮 */
.btn-danger {
  background: var(--danger);
  color: white;
}

/* 文本按钮 */
.btn-text {
  background: transparent;
  color: var(--primary);
  padding: var(--space-2) var(--space-3);
}

.btn-text:hover {
  background: var(--primary-light);
}
```

### 4.3 表单组件

#### 输入框规范
```css
.form-field {
  margin-bottom: var(--space-4);
}

.form-label {
  display: block;
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--text-secondary);
  margin-bottom: var(--space-2);
}

.form-input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  font-size: var(--text-base);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  background: var(--bg-primary);
  transition: all 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--border-focus);
  box-shadow: var(--shadow-outline);
}

.form-input:disabled {
  background: var(--bg-disabled);
  color: var(--text-disabled);
  cursor: not-allowed;
}
```

#### 滑块组件规范
```css
.slider-container {
  padding: var(--space-4) 0;
}

.slider-track {
  width: 100%;
  height: 4px;
  background: var(--bg-tertiary);
  border-radius: var(--radius-full);
  position: relative;
}

.slider-fill {
  height: 100%;
  background: var(--primary);
  border-radius: var(--radius-full);
  transition: width 0.2s ease;
}

.slider-thumb {
  width: 20px;
  height: 20px;
  background: var(--primary);
  border: 2px solid white;
  border-radius: 50%;
  box-shadow: var(--shadow-md);
  cursor: pointer;
  transition: all 0.2s ease;
}

.slider-thumb:hover {
  transform: scale(1.1);
  box-shadow: var(--shadow-lg);
}
```

### 4.4 标签和状态组件

#### 标签规范
```css
.tag {
  display: inline-flex;
  align-items: center;
  padding: var(--space-1) var(--space-3);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  border-radius: var(--radius-full);
  white-space: nowrap;
}

.tag-primary {
  background: var(--primary-light);
  color: var(--primary);
}

.tag-success {
  background: var(--success-light);
  color: var(--success);
}

.tag-warning {
  background: var(--warning-light);
  color: var(--warning);
}

.tag-danger {
  background: var(--danger-light);
  color: var(--danger);
}

.tag-removable {
  padding-right: var(--space-2);
}

.tag-remove {
  margin-left: var(--space-1);
  width: 14px;
  height: 14px;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.tag-remove:hover {
  opacity: 1;
}
```

#### 状态指示器
```css
.status-indicator {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.status-processing {
  background: var(--info);
  animation: pulse 1.5s infinite;
}

.status-success {
  background: var(--success);
}

.status-error {
  background: var(--danger);
}

.status-warning {
  background: var(--warning);
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

## 五、步骤专用组件规范

### 5.1 步骤导航组件
```css
.step-navigation {
  display: flex;
  justify-content: center;
  padding: var(--space-6) 0;
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-primary);
}

.step-nav-list {
  display: flex;
  align-items: center;
  gap: var(--space-8);
  max-width: 800px;
  width: 100%;
}

.step-nav-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  flex: 1;
  position: relative;
}

.step-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--font-semibold);
  font-size: var(--text-sm);
  border: 2px solid var(--border-primary);
  background: var(--bg-primary);
  color: var(--text-tertiary);
  transition: all 0.2s ease;
}

.step-nav-item.active .step-number {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
}

.step-nav-item.completed .step-number {
  background: var(--success);
  border-color: var(--success);
  color: white;
}

.step-label {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--text-secondary);
}

.step-nav-item.active .step-label {
  color: var(--primary);
}

.step-connector {
  position: absolute;
  top: 50%;
  left: 100%;
  width: var(--space-8);
  height: 2px;
  background: var(--border-primary);
  transform: translateY(-50%);
  z-index: -1;
}

.step-nav-item.completed .step-connector {
  background: var(--success);
}
```

### 5.2 指标展示组件
```css
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: var(--space-4);
}

.metric-card {
  text-align: center;
  padding: var(--space-4);
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-primary);
}

.metric-icon-wrapper {
  width: 40px;
  height: 40px;
  margin: 0 auto var(--space-2);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary-light);
}

.metric-value {
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  margin-bottom: var(--space-1);
}

.metric-value.positive {
  color: var(--success);
}

.metric-value.negative {
  color: var(--danger);
}

.metric-value.neutral {
  color: var(--warning);
}

.metric-label {
  font-size: var(--text-xs);
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.metric-trend {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--text-xs);
  margin-top: var(--space-1);
}
```

### 5.3 关键词管理组件
```css
.keyword-pool {
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  background: var(--bg-primary);
}

.keyword-pool-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-4);
}

.keyword-pool-title {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
}

.keyword-pool-actions {
  display: flex;
  gap: var(--space-2);
}

.keyword-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
}

.keyword-tag {
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-full);
  padding: var(--space-2) var(--space-3);
  font-size: var(--text-sm);
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.keyword-tag:hover {
  border-color: var(--primary);
  transform: translateY(-1px);
}

.keyword-tag.selected {
  background: var(--primary-light);
  border-color: var(--primary);
  color: var(--primary);
}

.keyword-tag.recommended {
  border-color: var(--accent);
  background: var(--accent-light);
}

.keyword-tag-metrics {
  display: flex;
  gap: var(--space-2);
  margin-top: var(--space-1);
  font-size: var(--text-xs);
  color: var(--text-tertiary);
}

.keyword-input-area {
  display: flex;
  gap: var(--space-2);
  align-items: center;
  padding: var(--space-4);
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  margin-top: var(--space-4);
}
```

### 5.4 AI推荐区域组件
```css
.ai-recommendation-section {
  background: linear-gradient(135deg, var(--primary-light) 0%, var(--secondary-light) 100%);
  border: 1px solid var(--primary);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  margin: var(--space-6) 0;
  position: relative;
  overflow: hidden;
}

.ai-recommendation-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%);
}

.ai-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  background: var(--primary);
  color: white;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--space-4);
}

.ai-recommendation-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--space-6);
}

.ai-recommendation-title {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.ai-recommendation-subtitle {
  font-size: var(--text-base);
  color: var(--text-secondary);
  line-height: var(--leading-relaxed);
}

.ai-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  padding: var(--space-8);
  text-align: center;
}

.ai-loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--primary-light);
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

## 六、交互规范

### 6.1 动画和过渡效果

#### 页面切换动画
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.page-enter {
  animation: fadeInUp 0.4s ease-out;
}

.card-enter {
  animation: fadeInScale 0.3s ease-out;
}

.modal-enter {
  animation: fadeInScale 0.2s ease-out;
}
```

#### 悬停效果标准
```css
.interactive-element {
  transition: all 0.2s ease;
  cursor: pointer;
}

.interactive-element:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.button-hover:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}
```

#### 加载状态动画
```css
.loading-dots {
  display: inline-flex;
  gap: var(--space-1);
}

.loading-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--primary);
  animation: loadingDots 1.4s infinite ease-in-out;
}

.loading-dot:nth-child(1) { animation-delay: -0.32s; }
.loading-dot:nth-child(2) { animation-delay: -0.16s; }
.loading-dot:nth-child(3) { animation-delay: 0s; }

@keyframes loadingDots {
  0%, 80%, 100% {
    transform: scale(0.7);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}
```

### 6.2 状态反馈规范

#### 选中状态反馈
```css
.selectable-item {
  position: relative;
  transition: all 0.2s ease;
}

.selectable-item.selected::after {
  content: '✓';
  position: absolute;
  top: var(--space-2);
  right: var(--space-2);
  width: 24px;
  height: 24px;
  background: var(--success);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-xs);
  font-weight: var(--font-bold);
  animation: checkmark 0.3s ease;
}

@keyframes checkmark {
  from {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
```

#### 成功/错误反馈
```css
.feedback-message {
  padding: var(--space-4);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  gap: var(--space-3);
  animation: slideInDown 0.3s ease;
}

.feedback-success {
  background: var(--success-light);
  border: 1px solid var(--success);
  color: var(--success-dark);
}

.feedback-error {
  background: var(--danger-light);
  border: 1px solid var(--danger);
  color: var(--danger-dark);
}

.feedback-warning {
  background: var(--warning-light);
  border: 1px solid var(--warning);
  color: var(--warning-dark);
}

@keyframes slideInDown {
  from {
    transform: translateY(-10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
```

### 6.3 响应式设计规范

#### 断点系统
```css
/* 移动设备优先的断点 */
@media (min-width: 640px) {  /* sm */
  .responsive-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 768px) {  /* md */
  .responsive-grid { grid-template-columns: repeat(3, 1fr); }
  .sidebar { width: 240px; }
}

@media (min-width: 1024px) { /* lg */
  .responsive-grid { grid-template-columns: repeat(4, 1fr); }
  .main-container { padding: 0 var(--space-8); }
}

@media (min-width: 1280px) { /* xl */
  .responsive-grid { grid-template-columns: repeat(5, 1fr); }
}
```

#### 移动端适配
```css
@media (max-width: 767px) {
  .mobile-stack {
    flex-direction: column;
    gap: var(--space-4);
  }
  
  .mobile-full-width {
    width: 100%;
  }
  
  .mobile-hide {
    display: none;
  }
  
  .card-grid {
    grid-template-columns: 1fr;
  }
  
  .page-footer {
    flex-direction: column;
    gap: var(--space-4);
    text-align: center;
  }
}
```

## 七、使用指南

### 7.1 设计原则应用

1. **一致性优先**：所有组件使用统一的设计标记和间距规范
2. **渐进增强**：基础功能优先，逐步添加高级交互效果
3. **可访问性**：确保颜色对比度、键盘导航和屏幕阅读器支持
4. **性能考虑**：动画使用transform和opacity，避免重布局

### 7.2 组件使用优先级

1. **核心组件**：按钮、卡片、表单组件 - 必须严格遵循规范
2. **业务组件**：五步流程专用组件 - 在核心组件基础上扩展
3. **装饰组件**：动画、特效 - 在保证性能前提下使用

### 7.3 定制指南

当需要扩展或修改组件时：
1. 继承基础样式，在其基础上添加特定样式
2. 保持设计标记的一致性
3. 确保在不同尺寸设备上的适配效果
4. 添加适当的过渡动画提升用户体验

这套设计规范为AI店长0.2版本提供了完整的视觉和交互指导，确保产品具有专业、一致、高效的用户体验。 