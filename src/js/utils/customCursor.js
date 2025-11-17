// 自定义鼠标样式控制
export function initCustomCursor() {
  // 检查是否为移动设备
  if (window.matchMedia("(pointer: coarse)").matches) {
    return; // 移动设备不显示自定义鼠标
  }

  // 创建鼠标元素
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  
  // 创建SVG箭头
  cursor.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- 外边框 -->
      <path d="M 2 2 L 2 18 L 7 13 L 10 22 L 12 21.5 L 9 12.5 L 16 12 Z" 
            fill="#E85D3F" 
            stroke="#E85D3F" 
            stroke-width="0.3"/>
      <!-- 内部高光 -->
      <path d="M 3.5 3.5 L 3.5 16 L 7.5 12 L 10 19.5 L 11 19.2 L 8.5 11.5 L 14.5 11.2 Z" 
            fill="#EBD9B4"/>
    </svg>
  `;
  
  document.body.appendChild(cursor);

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  // 鼠标移动事件（使用 passive 优化）
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  // 平滑跟随动画（使用 transform 优化性能）
  function animate() {
    // 箭头延迟跟随
    const delay = 0.2;
    cursorX += (mouseX - cursorX) * delay;
    cursorY += (mouseY - cursorY) * delay;

    // 使用 transform 代替 left/top，GPU 加速
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;

    requestAnimationFrame(animate);
  }
  animate();

  // 可点击元素的悬停效果
  const clickableElements = document.querySelectorAll('a, button, input, select, textarea, [role="button"]');
  
  clickableElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover');
    });
    
    element.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
    });
  });

  // 点击效果
  document.addEventListener('mousedown', () => {
    document.body.classList.add('cursor-active');
  });

  document.addEventListener('mouseup', () => {
    document.body.classList.remove('cursor-active');
  });

  // 鼠标离开窗口时隐藏
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
  });

  console.log('✅ 自定义鼠标已初始化');
}

