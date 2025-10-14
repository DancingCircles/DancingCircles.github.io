# X OBERON - 个人作品集网站

> 一个现代化的交互式个人作品集，展示创意设计和前端开发技能。

[![在线演示](https://img.shields.io/badge/demo-online-green.svg)](https://dancingcircles.github.io/MyDesign/)
[![许可证](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## ✨ 主要特性

- 🎨 **复古加载动画** - 1950至2025年代计数器
- 🌊 **流体波浪效果** - 使用OGL的交互式波浪动画
- 🎬 **滚动驱动动画** - 基于GSAP ScrollTrigger的流畅效果
- 🎯 **3D元素** - Three.js驱动的3D模型和场景
- 💫 **自定义光标** - 增强的用户交互体验
- 📱 **完全响应式** - 适配所有设备

## 🛠️ 技术栈

- **构建工具**: Vite 5.x
- **前端框架**: React 18.x
- **3D渲染**: Three.js + React Three Fiber
- **动画库**: GSAP (GreenSock Animation Platform)
- **平滑滚动**: Lenis
- **UI动画**: Framer Motion
- **开发语言**: JavaScript/JSX, HTML5, CSS3

## 📁 项目结构

```
XOBERON/
├── index.html                      # 主HTML入口文件
├── package.json                   # 项目依赖和脚本配置
├── vite.config.js                # Vite构建配置
│
├── src/
│   ├── assets/                    # 静态资源文件
│   │   ├── images/               # 图片文件
│   │   │   └── whoami.svg        # SVG图标
│   │   └── models/               # 3D模型文件
│   │       ├── jump-transformed.glb
│   │       └── s2wt_kamdo_industrial_divinities-transformed.glb
│   │
│   ├── js/
│   │   ├── script.js             # 主脚本入口
│   │   │
│   │   ├── components/           # React组件
│   │   │   ├── QuoteScene.jsx    # 引言场景组件
│   │   │   ├── RotatingText.jsx  # 旋转文字组件
│   │   │   ├── ThreeScene.jsx    # 3D场景组件
│   │   │   ├── Waves.jsx         # 波浪动画组件
│   │   │   └── Waves.css         # 波浪样式
│   │   │
│   │   ├── init/                 # 初始化模块
│   │   │   ├── initQuote.jsx     # 引言场景初始化
│   │   │   ├── initThree.jsx     # Three.js初始化
│   │   │   └── initWaves.jsx     # 波浪初始化
│   │   │
│   │   └── utils/                # 工具函数
│   │       ├── customCursor.js   # 自定义光标效果
│   │       └── navbar.js         # 导航栏功能
│   │
│   └── styles/
│       ├── layout/               # 布局样式
│       │   ├── main.css          # 全局样式和CSS变量
│       │   ├── cursor.css        # 自定义光标样式
│       │   ├── navbar.css        # 导航栏样式
│       │   └── loader.css        # 加载动画样式
│       │
│       └── sections/             # 各区域样式
│           ├── waves-hero.css    # 波浪英雄区
│           ├── brand-hero.css    # 品牌英雄区
│           ├── marquee.css       # 跑马灯效果
│           ├── about.css         # 关于区域
│           ├── quote.css         # 引言区域
│           ├── faq.css           # FAQ区域
│           └── final.css         # 结束页
│
└── node_modules/                 # 依赖包目录（自动生成）
```

## 🎯 核心功能

### 🎬 加载动画
- 复古年代计数器（1950 → 2025）
- 流畅的自定义缓动曲线动画
- 符合主题的配色方案

### 🌊 波浪英雄区
- 使用OGL库实现的流体波浪动画
- Perlin噪声生成的自然波动效果
- 交互式鼠标追踪
- 响应式大标题

### 🎨 项目 A1 - 关于区域
- **文字渐显动画**: 基于滚动的文字遮罩效果
- **3D跳跃动画**: GLTF模型的滚动驱动动画
- **水平跑马灯**: 无缝滚动的关键词展示
- **WHOAMI动画**: 多层SVG的滑入和缩放效果
- **红色卡片区**: "A LEARNER"展示与3D元素

### 💬 项目 A2 - 引言区域
- **旋转文字**: 紫色胶囊中的动态文字旋转
- **粘性文字动画**: 三阶段文字缩放效果
- **背景渐隐**: 复杂的滚动触发视觉转换
- **设计理念**: 交互式引言展示

### ❓ 项目 A3 - FAQ区域
- 带悬停效果的交互式FAQ列表
- 纯CSS动画
- 响应式网格布局
- 流畅的展开/折叠过渡

### 🎭 结束页
- 滑入覆盖效果
- 优雅的结束页展示
- 社交媒体链接（GitHub）
- 版权信息

### 🔧 全局功能
- **自定义光标**: 平滑跟随鼠标的光标效果
- **平滑滚动**: Lenis驱动的滚动体验
- **固定导航**: 顶部固定导航栏
- **响应式设计**: 移动优先的设计方法

## 💡 代码规范

### 命名约定

1. **文件命名**:
   - React组件: `PascalCase.jsx` (如: `ThreeScene.jsx`)
   - 普通JS文件: `camelCase.js` (如: `customCursor.js`)
   - 初始化文件: `initXxx.jsx` (如: `initThree.jsx`)
   - CSS文件: `kebab-case.css` (如: `waves-hero.css`)

2. **目录命名**:
   - 小写字母: `assets/`, `styles/`, `js/`
   - 语义化: `components/`, `init/`, `utils/`

3. **变量命名**:
   - 变量和函数: `camelCase`
   - 常量: `UPPER_SNAKE_CASE`
   - React组件: `PascalCase`

### 组织原则

- **关注点分离**: JS、CSS和静态资源分别存放在专用文件夹
- **模块化设计**: 每个功能模块独立封装
- **清晰的导入层次**: 第三方库 → 本地模块 → 样式文件

## 🚀 快速开始

### 安装

```bash
# 克隆仓库
git clone https://github.com/DancingCircles/MyDesign.git

# 进入项目目录
cd MyDesign/XOBERON

# 安装依赖
npm install
```

### 开发模式

```bash
npm run dev
```

服务器将在 `http://localhost:5173` 启动

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 📦 主要依赖

| 依赖包 | 版本 | 用途 |
|--------|------|------|
| react | ^18.2.0 | UI框架 |
| three | ^0.152.2 | 3D渲染引擎 |
| @react-three/fiber | ^8.13.0 | React Three.js渲染器 |
| @react-three/drei | ^9.68.3 | Three.js辅助工具 |
| gsap | ^3.12.5 | 高性能动画库 |
| lenis | ^1.0.42 | 平滑滚动 |
| framer-motion | ^12.23.24 | React动画库 |
| ogl | ^1.0.11 | 轻量级WebGL库 |

## 🎨 设计理念

- **简约优先**: 清晰胜于复杂，功能胜于装饰
- **性能优化**: 使用requestAnimationFrame和硬件加速
- **响应式设计**: 适配各种屏幕尺寸
- **用户体验**: 流畅的动画过渡和交互反馈

## 📝 开发注意事项

1. **3D模型优化**: 使用GLTF格式并进行压缩转换
2. **动画性能**: 优先使用CSS transform和opacity属性
3. **滚动性能**: 使用ScrollTrigger的scrub参数实现流畅动画
4. **资源加载**: 合理使用懒加载和预加载策略

## 👤 作者信息

**X OBERON**
- 专注于Golang后端开发和前端设计
- 致力于创建优雅的代码架构和美观的用户界面
- Email: xoberon@foxmail.com
- GitHub: [@DancingCircles](https://github.com/DancingCircles)

## 📄 许可证

© 2025 X OBERON Portfolio. All rights reserved.

---

*本项目使用 Cursor AI 和 ChatGPT 辅助开发*



