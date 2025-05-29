# AI店长 0.2 版本 Demo

基于 Next.js + TypeScript + TailwindCSS + Zustand 构建的AI店长0.2版本智能选品五步闭环流程Demo。

## 功能特性

- 🎯 **五步闭环流程**：推荐类目 → 推荐策略 → 关键词配置 → AI推荐 → 铺货队列
- 🤖 **人机协同设计**：AI提供数据支撑，用户保持决策控制权
- 💡 **智能推荐算法**：基于多维度评分的商品推荐系统
- 🎨 **现代化UI设计**：响应式布局，流畅动画效果
- 📊 **数据可视化**：直观展示关键业务指标

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看效果。

## 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # 主页面
│   └── layout.tsx         # 根布局
├── components/            
│   ├── business/          # 业务组件
│   │   ├── step-navigation.tsx  # 步骤导航
│   │   └── sidebar.tsx          # 侧边栏
│   └── steps/             # 五步流程组件
│       ├── step-category.tsx      # 步骤1: 推荐类目
│       ├── step-strategy.tsx      # 步骤2: 推荐策略
│       ├── step-keywords.tsx      # 步骤3: 关键词配置
│       ├── step-recommendation.tsx # 步骤4: AI推荐
│       └── step-listing.tsx       # 步骤5: 铺货队列
├── lib/                   
│   ├── store.ts          # Zustand状态管理
│   ├── mock-data.ts      # Mock数据
│   ├── types.ts          # TypeScript类型定义
│   └── utils.ts          # 工具函数
└── constants/            # 常量定义
```

## 核心功能说明

### 1. 推荐类目
- 展示系统推荐的TOP5类目
- 显示销量环比、行业增速、利润率等关键指标
- 支持多选和优先级调整

### 2. 推荐策略
- 提供趋势爆款、蓝海细分、高利润三种策略模板
- 支持策略组合和参数微调
- 根据选择的策略影响后续推荐逻辑

### 3. 关键词配置
- 智能推荐20个高潜力关键词
- 支持手动添加和图片识别
- 可调整增长率、竞争度、利润率等筛选参数

### 4. AI推荐商品
- 基于配置参数筛选和评分商品
- 展示商品详情、预测销量等信息
- 支持采纳/忽略操作，收集用户反馈

### 5. 铺货队列
- 自动将采纳商品加入铺货任务
- 实时展示铺货状态和进度
- 支持失败重试和批量操作

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: TailwindCSS
- **状态管理**: Zustand
- **动画**: CSS Transitions
- **图标**: Lucide React

## 开发指南

### 添加新功能

1. 在 `src/lib/types.ts` 中定义相关类型
2. 在 `src/lib/store.ts` 中添加状态管理逻辑
3. 创建对应的组件文件
4. 更新Mock数据以支持新功能

### 样式定制

- 全局样式在 `src/app/globals.css`
- 使用TailwindCSS utility classes
- 自定义颜色已配置在 `tailwind.config.ts`

## 部署

```bash
npm run build
npm start
```

## 注意事项

- 本项目为Demo演示，使用Mock数据模拟后端API
- 数据存储使用LocalStorage，刷新页面会保留状态
- 响应式设计支持桌面端和平板端

## License

MIT
