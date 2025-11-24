# Xoberon 个人主页

一个充满创意的个人展示空间，融合现代前端技术与视觉艺术，打造沉浸式的网页浏览体验。

## 在线预览

**访问地址**: [https://DancingCircles.github.io](https://DancingCircles.github.io)

---

## 项目简介

这不仅仅是一个传统的个人主页，更是一个探索交互设计、动画效果和视觉美学的实验场。项目采用长页面滚动设计，每个区块都经过精心设计，通过流畅的动画过渡和独特的视觉元素，为访客带来令人难忘的浏览体验。

### 主要板块

*   **Hero Section (首屏)**  
    开场即惊艳，动态的图片揭示和笔触签名动画，配合精心设计的标题排版。

*   **Planning Section (规划区)**  
    融入漂浮动画图标，展示个人理念与生活态度。

*   **Agency Section (理念区)**  
    通过创意排版传达设计哲学。

*   **Collage Pages (拼贴页)**  
    两个独特的拼贴风格页面，展示个人信息与概念设计，融合复古元素与现代审美。

*   **Video Section (视频展示)**  
    互动式视频播放器，展示个人喜爱的音乐视频片段，配合自定义播放控件和装饰元素。

*   **FAQ Section (常见问题)**  
    创意的悬停交互效果，问题与答案的流畅切换动画。

---

## 核心特性

### 沉浸式视觉体验
*   全屏滚动布局，摒弃传统网页的条框限制
*   精心设计的配色方案和复古美学
*   动态背景与装饰元素，营造独特氛围

### 流畅的交互动画
*   深度整合 GSAP 动画库，实现丝滑的元素过渡
*   滚动触发动画（ScrollTrigger），内容随滚动优雅呈现
*   自定义鼠标跟随效果（Custom Cursor）
*   悬停动画和微交互，增强用户参与感

### 极致性能优化
*   基于 Vite 构建，开发体验快如闪电
*   Lenis 平滑滚动，告别浏览器原生滚动的生硬感
*   资源懒加载和代码分割，确保首屏快速加载

### 响应式设计
*   适配桌面端和移动端
*   流畅的触摸交互体验

---

## 技术栈

| 技术 | 用途 |
|------|------|
| **React 19** | 核心框架，组件化开发 |
| **Vite** | 构建工具，极速开发体验 |
| **GSAP** | 专业级动画引擎，实现复杂动画效果 |
| **Lenis** | 平滑滚动库，提升滚动体验 |
| **Vanilla CSS** | 样式编写，完全掌控设计细节 |

---

## 项目结构

```
xoberon/
├── public/
│   └── assets/           # 静态资源（图片、视频）
├── src/
│   ├── components/       # React 组件
│   │   ├── HeroSection.jsx
│   │   ├── PlanningSection.jsx
│   │   ├── AgencySection.jsx
│   │   ├── CollagePage1.jsx
│   │   ├── CollagePage2.jsx
│   │   ├── BlankPage.jsx       # 视频展示区
│   │   ├── EmptyPage.jsx       # FAQ 区
│   │   ├── Header.jsx
│   │   ├── CustomCursor.jsx
│   │   ├── SmoothScroll.jsx
│   │   └── ScrollReveal.jsx
│   ├── data/
│   │   └── faqs.js       # FAQ 数据
│   ├── App.jsx           # 主应用组件
│   ├── main.jsx          # 入口文件
│   └── index.css         # 全局样式
├── .github/
│   └── workflows/
│       └── deploy.yml    # GitHub Actions 自动部署
├── package.json
├── vite.config.js
└── README.md
```

---

## 本地开发

### 环境要求
*   Node.js >= 16
*   npm 或 yarn

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

访问 `http://localhost:5173` 查看效果。

### 构建生产版本
```bash
npm run build
```

构建产物将输出到 `dist/` 目录。

---

## 部署

项目已配置 GitHub Actions 自动部署流程。每次推送代码到 `main` 分支，将自动触发构建并部署到 GitHub Pages。

**部署配置文件**: `.github/workflows/deploy.yml`

---

## 设计理念

这个项目的设计灵感来源于：
*   **数字拼贴美学** - 融合复古元素与现代网页设计
*   **动态叙事** - 通过滚动和动画，讲述一个连贯的故事
*   **细节至上** - 每一个微交互都经过精心打磨
*   **个性表达** - 不拘泥于常规，勇于尝试独特的视觉语言

---

## 许可证

本项目仅供个人学习和展示使用。

---

*Designed & Built by Xoberon*
