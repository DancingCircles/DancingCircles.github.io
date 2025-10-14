# X OBERON - 个人作品集网站

## 📋 项目简介

X OBERON 是一个现代化的个人作品集网站，展示了创意设计和前端开发技能。项目采用模块化设计，包含多个独立的滚动动画项目，打造了流畅的用户体验。

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
├── index.html                  # 主HTML入口文件
├── package.json               # 项目依赖和脚本配置
├── vite.config.js            # Vite构建配置
│
├── src/                      # 源代码目录
│   ├── assets/              # 静态资源文件
│   │   ├── *.glb           # 3D模型文件 (GLTF格式)
│   │   └── *.svg           # SVG图标文件
│   │
│   ├── js/                  # JavaScript/JSX组件和逻辑
│   │   ├── script.js       # 主脚本 - 项目入口和动画控制
│   │   ├── navbar.js       # 导航栏功能
│   │   ├── customCursor.js # 自定义鼠标光标效果
│   │   │
│   │   ├── initThree.jsx   # Three.js场景初始化
│   │   ├── ThreeScene.jsx  # 3D跳跃动画场景组件
│   │   │
│   │   ├── initQuote.jsx   # 引言旋转文字初始化
│   │   ├── QuoteScene.jsx  # 引言场景组件
│   │   ├── RotatingText.jsx # 旋转文字组件
│   │   │
│   │   ├── initWaves.jsx   # 波浪效果初始化
│   │   ├── Waves.jsx       # 波浪动画组件
│   │   │
│   │   └── scenes/         # 3D场景组件目录
│   │       ├── initX1.jsx  # 球体场景初始化
│   │       └── X1Scene.jsx # 浮动球体3D场景
│   │
│   └── styles/             # CSS样式文件
│       ├── main.css        # 全局样式和CSS变量定义
│       ├── cursor.css      # 自定义光标样式
│       ├── navbar.css      # 导航栏样式
│       ├── waves-hero.css  # 波浪英雄区样式
│       ├── brand-hero.css  # 品牌英雄区样式
│       ├── marquee.css     # 跑马灯效果样式
│       ├── about.css       # 关于区域样式
│       ├── quote.css       # 引言区域样式
│       ├── faq.css         # FAQ区域样式
│       ├── final.css       # 结束页样式
│       └── Waves.css       # 波浪动画样式
│
└── node_modules/           # 依赖包目录 (自动生成)
```

## 🎨 主要功能模块

### 1. Waves Hero (波浪英雄区)
- 使用OGL库实现的流体波浪动画
- Perlin噪声生成的自然波动效果
- 响应式大标题展示

### 2. Project A1 - WonJYou Scroll Animation
- **文字渐显动画**: 基于滚动的文字遮罩效果
- **3D跳跃动画**: GLTF模型的滚动驱动动画
- **跑马灯效果**: 水平滚动的关键词展示
- **WHOAMI动画**: 多层SVG的滑入和缩放效果

### 3. Project A2 - Phive Text Scroll Animation  
- **旋转文字**: 3D旋转展示的引言文字
- **粘性文字动画**: 三段文字的动态缩放效果
- **背景渐隐**: 复杂的滚动触发的视觉转换

### 4. Project A3 - FAQ Page
- 交互式FAQ列表
- CSS Hover效果
- 响应式布局设计

### 5. Final Page
- 滑动覆盖效果
- 结束页面展示
- 社交媒体链接

### 6. 全局功能
- **自定义光标**: 跟随鼠标的自定义光标效果
- **平滑滚动**: Lenis实现的流畅滚动体验
- **响应式导航**: 固定顶部导航栏

## 🎯 代码规范

### 命名约定

1. **文件命名**:
   - React组件: `PascalCase.jsx` (如: `ThreeScene.jsx`)
   - 普通JS文件: `camelCase.js` (如: `customCursor.js`)
   - 初始化文件: `initXxx.jsx` (如: `initThree.jsx`)
   - CSS文件: `kebab-case.css` (如: `waves-hero.css`)

2. **目录命名**:
   - 小写字母: `assets/`, `styles/`, `js/`
   - 语义化: `scenes/` (3D场景组件)

3. **变量命名**:
   - 变量和函数: `camelCase`
   - 常量: `UPPER_SNAKE_CASE`
   - React组件: `PascalCase`

### 文件组织原则

- **关注点分离**: JS逻辑、CSS样式、静态资源分别存放
- **模块化设计**: 每个功能模块独立封装
- **清晰的导入层次**: 
  - 第三方库导入
  - 本地模块导入
  - 样式文件导入

## 🚀 开发指南

### 安装依赖

```bash
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



