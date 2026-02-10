# 10btc.top - 比特币技术原理与稀缺性

优雅的币圈风格网站，深入解析比特币技术原理。使用 Next.js 14、Tailwind CSS 和 Framer Motion 构建。

## ✨ 新增特性

### 🎬 动画效果
使用 Framer Motion 添加流畅的滚动动画：
- **FadeInUp** - 元素从下方淡入
- **FadeIn** - 淡入效果
- **SlideInLeft/Right** - 左右滑入
- **ScaleIn** - 缩放进入
- **StaggerContainer** - 子元素依次动画

### 🔍 SEO 优化
- ✅ 完整的 Meta 标签
- ✅ Open Graph 协议
- ✅ Twitter Cards
- ✅ 结构化数据 (JSON-LD)
- ✅ Robots.txt
- ✅ Sitemap.xml
- ✅ 语义化 HTML
- ✅ 关键词优化

## 🎨 主要板块

### 1. Hero 区域
- 10 BTC 浮动动画标识
- "十币称侯"主题徽章
- 四个核心特性卡片（渐进动画）

### 2. 区块链原理
- 三个连续区块可视化
- 链式结构说明
- 全网共识机制

### 3. 挖矿机制
- SHA-256 哈希计算演示
- 5步挖矿流程
- 难度调整机制

### 4. 密码学基础
- 地址生成过程（私钥→公钥→地址）
- 数字签名验证
- 安全特性说明

### 5. 减半机制
- 历史减半记录（2009-2028）
- 区块奖励变化
- 21,000,000 供应上限

### 6. 稀缺性分析 ⭐
- **SF值模型对比**（比特币 108 vs 黄金 62）
- **持有者分布**（155,000个地址持有≥10 BTC）
- **十币称侯逻辑**：数学保证 + 时间稀释 + 全球竞争

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
npm start
```

访问 [http://localhost:3000](http://localhost:3000)

## 📦 技术栈

- **Next.js 14** - App Router
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **Framer Motion** - 动画库
- **React Hooks** - 状态管理

## 📱 响应式设计

- 移动端优先
- 平板适配 (md: breakpoint)
- 桌面优化 (lg: breakpoint)

## 🎯 SEO 关键词

比特币、Bitcoin、BTC、区块链、加密货币、挖矿、SHA-256、工作量证明、PoW、减半、稀缺性、SF值、十币称侯、数字货币、去中心化、密码学、公钥加密、私钥

## 📄 项目结构

```
10btctotop/
├── app/
│   ├── components/
│   │   └── Animations.tsx    # 动画组件
│   ├── layout.tsx            # SEO 配置
│   ├── page.tsx              # 主页面
│   ├── sitemap.ts            # 站点地图
│   └── globals.css           # 全局样式
├── public/
│   └── robots.txt            # 搜索引擎配置
└── package.json
```

## 🎨 动画使用示例

```tsx
import { FadeInUp, StaggerContainer, StaggerItem } from './components/Animations';

// 单个元素淡入
<FadeInUp delay={0.2}>
  <h1>标题</h1>
</FadeInUp>

// 列表依次动画
<StaggerContainer className="grid">
  <StaggerItem>
    <div>项目1</div>
  </StaggerItem>
  <StaggerItem>
    <div>项目2</div>
  </StaggerItem>
</StaggerContainer>
```

## 🔍 SEO 优化清单

- [x] 语义化 HTML5 标签
- [x] Meta description (155字内)
- [x] Meta keywords (20+关键词)
- [x] Open Graph 标签
- [x] Twitter Cards
- [x] Canonical URL
- [x] 结构化数据 (Schema.org)
- [x] Robots.txt
- [x] Sitemap.xml
- [x] Alt 文本（如有图片）
- [x] 响应式设计
- [x] 页面加载速度优化

## 🌐 部署

### Vercel (推荐)
```bash
npm install -g vercel
vercel
```

### 其他平台
```bash
npm run build
# 部署 .next 目录和 public 文件夹
```

## 📝 内容特点

- ✅ 技术科普向，非营销
- ✅ 数据驱动，用数字说话
- ✅ 可视化展示（进度条、流程图）
- ✅ 交互式动画
- ✅ 融入"十币称侯"概念

## ⚠️ 免责声明

本网站内容仅供学习参考和技术交流，不构成任何投资建议。

## 📄 许可证

MIT License

---

**10btc.top** - 理解比特币，把握未来 🚀
