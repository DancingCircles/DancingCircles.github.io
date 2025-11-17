# X OBERON - 个人作品集

现代化交互式作品集网站，展示创意设计与前端开发技能。

## 在线预览

**[访问网站](https://dancingcircles.github.io/)**

[![在线演示](https://img.shields.io/badge/demo-online-green.svg)](https://dancingcircles.github.io/)
[![许可证](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 主要特性

- 复古加载动画，年份计数器（1950-2025）
- 基于 OGL 的交互式流体波浪效果
- GSAP ScrollTrigger 驱动的滚动动画
- Three.js 驱动的 3D 模型与场景
- 自定义光标交互体验
- 完全响应式设计

## 技术栈

- **构建工具**: Vite 5.x
- **前端框架**: React 18.x
- **3D 渲染**: Three.js + React Three Fiber
- **动画库**: GSAP (GreenSock Animation Platform)
- **平滑滚动**: Lenis
- **UI 动画**: Framer Motion
- **开发语言**: JavaScript/JSX, HTML5, CSS3

## 项目结构

```
DancingCircles.github.io/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── models/
│   ├── js/
│   │   ├── components/
│   │   ├── init/
│   │   ├── utils/
│   │   └── script.js
│   └── styles/
│       ├── layout/
│       └── sections/
└── node_modules/
```

## 安装

```bash
# 克隆仓库
git clone https://github.com/DancingCircles/DancingCircles.github.io.git

# 进入项目目录
cd DancingCircles.github.io

# 安装依赖（使用 legacy-peer-deps 解决依赖冲突）
npm install --legacy-peer-deps
```

## 开发

```bash
# 启动开发服务器
npm run dev
```

服务器将在 `http://localhost:5173` 启动

## 构建

```bash
# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 主要依赖

| 依赖包 | 版本 | 用途 |
|--------|------|------|
| react | ^18.2.0 | UI 框架 |
| three | ^0.152.2 | 3D 渲染引擎 |
| @react-three/fiber | ^8.13.0 | React Three.js 渲染器 |
| @react-three/drei | ^9.68.3 | Three.js 辅助工具 |
| gsap | ^3.12.5 | 高性能动画库 |
| lenis | ^1.0.42 | 平滑滚动 |
| framer-motion | ^12.23.24 | React 动画库 |
| ogl | ^1.0.11 | 轻量级 WebGL 库 |

## 作者

**X OBERON**

专注于 Golang 后端开发，热衷于前端设计与架构。

- 邮箱: xoberon@foxmail.com
- GitHub: [@DancingCircles](https://github.com/DancingCircles)

## 许可证

© 2025 X OBERON Portfolio. All rights reserved.

---

*本项目使用 Cursor AI 和 ChatGPT 辅助开发*
