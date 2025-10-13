import React from 'react'
import { createRoot } from 'react-dom/client'
import { QuoteScene } from './QuoteScene'

// 初始化引用场景
function initQuoteScene() {
  const container = document.getElementById('quote-rotating-container')
  if (container) {
    console.log('Quote rotating container found, initializing...')
    const root = createRoot(container)
    root.render(<QuoteScene />)
  } else {
    console.error('Quote rotating container not found!')
  }
}

// 确保在 DOM 加载后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initQuoteScene)
} else {
  initQuoteScene()
}

