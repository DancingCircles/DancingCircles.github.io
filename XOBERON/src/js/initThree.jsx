import React from 'react'
import { createRoot } from 'react-dom/client'
import { ThreeScene } from './ThreeScene'

// 初始化 Three.js 场景
function initThreeScene() {
  const container = document.getElementById('three-container')
  if (container) {
    console.log('Three.js container found, initializing...')
    const root = createRoot(container)
    root.render(<ThreeScene />)
  } else {
    console.error('Three.js container not found!')
  }
}

// 确保在 DOM 加载后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initThreeScene)
} else {
  // DOM 已经加载完成，直接初始化
  initThreeScene()
}

